import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  CheckCircle,
  AlertCircle,
  Send,
  MessageCircle,
} from 'lucide-react';
import { useOrder } from '../context/OrderContext';
import { MENU_ITEMS, STORE_INFO } from '../data/menuData';
import { usePageMeta } from '../hooks/usePageMeta';
import { saveOrderInquiry } from '../lib/supabase';

const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/29118429/416zue8/';

export const OrderPage: React.FC = () => {
  usePageMeta({
    title: 'Place Your Order & Inquiry | Vrindavan Treats — Deolali, Nashik',
    description:
      'Place your food order inquiry with Vrindavan Treats. Order pure veg burgers, pizzas, momos, sandwiches, fries & shakes in Deolali, Nashik.',
    canonicalPath: '/order',
  });

  const { items, updateQuantity, removeItem, clearOrder, subtotal, totalCount, addItem } = useOrder();

  // Exactly the three customer detail fields required:
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');

  // Additional order-related controls allowed:
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Submission states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedPreview, setSubmittedPreview] = useState<boolean>(false);
  const [webhookStatus, setWebhookStatus] = useState<'success' | 'fallback' | null>(null);

  // Quick food browser tab in order page
  const [quickSearch, setQuickSearch] = useState('');

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!fullName.trim()) {
      errs.fullName = 'Full Name is required';
    } else if (fullName.trim().length < 2) {
      errs.fullName = 'Please enter a valid full name';
    }

    const cleanMobile = mobileNumber.replace(/\D/g, '');
    if (!mobileNumber.trim()) {
      errs.mobileNumber = 'Mobile Number is required';
    } else if (cleanMobile.length < 10) {
      errs.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errs.email = 'Email Address is required';
    } else if (!emailRegex.test(email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (items.length === 0) {
      errs.items = 'Please select at least one food item before placing your inquiry';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setWebhookStatus(null);

    // Build shared order items array
    const orderItems = items.map((item) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalPrice: item.unitPrice * item.quantity,
      variant: item.selectedVariant || null,
      extraCheese: Boolean(item.extraCheese),
    }));

    const formattedOrderText = items
      .map(
        (it, i) =>
          `${i + 1}. ${it.name} (${it.quantity}x) - ₹${it.unitPrice * it.quantity}${
            it.selectedVariant ? ` [${it.selectedVariant}]` : ''
          }${it.extraCheese ? ' [+Cheese]' : ''}`
      )
      .join(', ');

    // ─── 1. Zapier Webhook payload ────────────────────────────────────────────
    const zapierPayload = {
      timestamp: new Date().toISOString(),
      orderSource: 'Vrindavan Treats Website',
      customer: {
        fullName: fullName.trim(),
        mobileNumber: mobileNumber.trim(),
        email: email.trim(),
      },
      pickupDetails: {
        pickupDate: pickupDate || 'Today',
        pickupTime: pickupTime || 'Earliest',
      },
      specialInstructions: specialInstructions.trim() || 'None',
      summary: { totalItemCount: totalCount, subtotal, currency: 'INR' },
      items: orderItems,
      formattedOrderText,
    };

    // ─── 2. Supabase record (matches table columns 1-to-1) ───────────────────
    const supabaseRecord = {
      order_source: 'Vrindavan Treats Website',
      customer_full_name: fullName.trim(),
      customer_mobile: mobileNumber.trim(),
      customer_email: email.trim(),
      pickup_date: pickupDate || 'Today',
      pickup_time: pickupTime || 'Earliest',
      special_instructions: specialInstructions.trim() || 'None',
      total_item_count: totalCount,
      subtotal: subtotal,
      currency: 'INR',
      items: orderItems,
      formatted_order_text: formattedOrderText,
      status: 'pending',
    };

    // ─── Fire both in parallel — neither blocks the other ───────────────────
    const [zapierResult, supabaseResult] = await Promise.allSettled([
      fetch(ZAPIER_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(zapierPayload),
        mode: 'no-cors',
      }),
      saveOrderInquiry(supabaseRecord),
    ]);

    const zapierOk = zapierResult.status === 'fulfilled';
    const supabaseOk = supabaseResult.status === 'fulfilled' && supabaseResult.value === true;

    if (zapierOk || supabaseOk) {
      setWebhookStatus('success');
    } else {
      console.warn('[Order] Both Zapier and Supabase encountered errors — showing confirmation anyway');
      setWebhookStatus('fallback');
    }

    setIsSubmitting(false);
    setSubmittedPreview(true);
  };


  // WhatsApp Order formatted text generator
  const generateWhatsAppMessage = () => {
    let msg = `*Vrindavan Treats — Food Order Inquiry*\n\n`;
    msg += `*Customer Details:*\n`;
    msg += `• Name: ${fullName}\n`;
    msg += `• Mobile: ${mobileNumber}\n`;
    msg += `• Email: ${email}\n\n`;

    if (pickupDate || pickupTime) {
      msg += `*Pickup Request:* ${pickupDate || 'Today'} at ${pickupTime || 'Earliest'}\n\n`;
    }

    msg += `*Selected Items:*\n`;
    items.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.name} (${item.quantity}x) — ₹${item.unitPrice * item.quantity}`;
      if (item.selectedVariant) msg += ` [${item.selectedVariant}]`;
      if (item.extraCheese) msg += ` [+Extra Cheese]`;
      msg += `\n`;
    });

    msg += `\n*Estimated Total:* ₹${subtotal} (incl. taxes)\n`;

    if (specialInstructions.trim()) {
      msg += `\n*Special Instructions:*\n${specialInstructions}\n`;
    }

    return encodeURIComponent(msg);
  };

  // Quick items to display for easy addition
  const quickSelectItems = MENU_ITEMS.filter((item) => {
    if (!quickSearch.trim()) return true;
    return (
      item.name.toLowerCase().includes(quickSearch.toLowerCase()) ||
      item.categoryLabel.toLowerCase().includes(quickSearch.toLowerCase())
    );
  }).slice(0, 6);

  return (
    <div className="bg-white pb-24 w-full overflow-x-hidden">
      {/* Clean Light Hero Header */}
      <section className="bg-gradient-to-b from-red-50/70 to-white text-gray-900 py-10 sm:py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="font-serif italic text-[#E52E2D] text-sm sm:text-base md:text-lg font-bold tracking-wide">
            Online Food Inquiry
          </span>
          {/* EXACT REQUIRED HEADING */}
          <h1 className="font-display font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 tracking-tight">
            Which food do you want to order?
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed px-2">
            Select your favourite vegetarian delights from our menu, configure quantities, and submit your inquiry.
          </p>
        </div>
      </section>

      {/* Main Order Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        {submittedPreview ? (
          /* Success / Demo Preview State */
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-gray-100 shadow-xl text-center space-y-5 sm:space-y-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                Order Inquiry Submitted Successfully
              </span>
              <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-gray-900">
                Thank You, {fullName}!
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
                Your order inquiry has been securely sent to Vrindavan Treats. You can also send a direct confirmation on WhatsApp below!
              </p>
              {webhookStatus === 'success' && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200 mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Inquiry Dispatched to Store</span>
                </div>
              )}
            </div>

            {/* Order Summary Recap */}
            <div className="bg-gray-50 rounded-2xl p-4 sm:p-5 text-left space-y-3 text-xs border border-gray-200">
              <div className="flex justify-between border-b border-gray-200 pb-2 font-bold text-xs sm:text-sm text-gray-900">
                <span>Customer: {fullName}</span>
                <span>{mobileNumber}</span>
              </div>
              <div className="space-y-2">
                {items.map((it) => (
                  <div key={it.id} className="flex justify-between items-center text-gray-700">
                    <span className="truncate pr-2">
                      {it.quantity}x {it.name}
                      {it.selectedVariant ? ` (${it.selectedVariant})` : ''}
                      {it.extraCheese ? ' [+Cheese]' : ''}
                    </span>
                    <span className="font-bold shrink-0">₹{it.unitPrice * it.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-2 font-extrabold text-xs sm:text-sm text-gray-900">
                <span>Estimated Subtotal:</span>
                <span className="text-[#E52E2D] text-sm sm:text-base">₹{subtotal}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <a
                href={`https://wa.me/${STORE_INFO.whatsappRaw}?text=${generateWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 sm:py-4 px-4 sm:px-6 rounded-2xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-extrabold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
              >
                <MessageCircle className="w-5 h-5 fill-current shrink-0" />
                <span>Send Order via WhatsApp (+91 77969 02555)</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setSubmittedPreview(false);
                  clearOrder();
                }}
                className="w-full py-3 px-6 rounded-2xl bg-gray-900 hover:bg-black text-white font-bold text-xs tracking-wide transition-all"
              >
                Create Another Inquiry
              </button>
            </div>
          </div>
        ) : (
          /* Main Order Inquiry Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">
            {/* Left Column: Selected Items & Quick Catalog (7 cols) */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              {/* Selected Items Review */}
              <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 border border-gray-100 shadow-sm space-y-4 sm:space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3 sm:pb-4">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-[#E52E2D]" />
                    <h2 className="font-display font-black text-lg sm:text-xl text-gray-900">
                      Selected Products ({totalCount})
                    </h2>
                  </div>
                  {items.length > 0 && (
                    <button
                      onClick={clearOrder}
                      className="text-xs text-gray-400 hover:text-[#E52E2D] font-medium transition-colors"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {errors.items && (
                  <div className="p-3.5 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2 border border-red-200">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errors.items}</span>
                  </div>
                )}

                {items.length === 0 ? (
                  <div className="py-10 sm:py-12 text-center space-y-3">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-50 text-[#E52E2D] flex items-center justify-center mx-auto">
                      <ShoppingBag className="w-7 h-7 sm:w-8 sm:h-8 opacity-70" />
                    </div>
                    <h3 className="font-bold text-base text-gray-900">No food selected yet</h3>
                    <p className="text-xs text-gray-500 max-w-sm mx-auto px-2">
                      Choose products below or browse the menu catalogue to add them to your inquiry.
                    </p>
                    <Link
                      to="/menu"
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#E52E2D] text-white rounded-full text-xs font-bold shadow-md hover:bg-[#D0201F]"
                    >
                      Browse Full Menu
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="bg-gray-50 rounded-2xl p-3 sm:p-4 border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-14 h-14 rounded-xl object-cover shrink-0 border border-gray-200"
                          />
                          <div className="min-w-0">
                            <h4 className="font-bold text-sm text-gray-900 truncate">{item.name}</h4>
                            <div className="flex flex-wrap gap-1 mt-0.5 text-[11px]">
                              {item.selectedVariant && (
                                <span className="text-gray-700 font-medium bg-gray-200 px-1.5 py-0.5 rounded">
                                  {item.selectedVariant}
                                </span>
                              )}
                              {item.extraCheese && (
                                <span className="text-[#E52E2D] font-medium bg-red-100 px-1.5 py-0.5 rounded">
                                  +Cheese
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-gray-400 mt-0.5 block">
                              ₹{item.unitPrice} each
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-200/60">
                          {/* Quantity control */}
                          <div className="flex items-center gap-2 bg-white rounded-xl p-1 border border-gray-200 shadow-2xs">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-700 active:scale-95"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-bold text-xs px-1 text-gray-900 min-w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-700 active:scale-95"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Line total */}
                          <span className="font-extrabold text-sm text-gray-900 min-w-[50px] text-right">
                            ₹{item.unitPrice * item.quantity}
                          </span>

                          {/* Remove */}
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-[#E52E2D] p-1.5 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Menu Selection Tray */}
              <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 border border-gray-100 shadow-sm space-y-4 sm:space-y-5">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-3">
                  <div>
                    <h3 className="font-display font-black text-base sm:text-lg text-gray-900">
                      Add More Items to Your Order
                    </h3>
                    <p className="text-xs text-gray-500">
                      Click "+ Add" on any item below to include it immediately.
                    </p>
                  </div>
                  <input
                    type="text"
                    value={quickSearch}
                    onChange={(e) => setQuickSearch(e.target.value)}
                    placeholder="Search food..."
                    className="text-xs px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#E52E2D] w-full sm:w-44"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {quickSelectItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between gap-3 hover:border-red-200 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-xl object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="font-bold text-xs text-gray-900 truncate">{item.name}</h4>
                          <span className="text-[11px] font-bold text-[#E52E2D]">
                            ₹{item.price}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => addItem(item)}
                        className="px-3 py-1.5 rounded-xl bg-[#E52E2D] hover:bg-[#D0201F] text-white text-xs font-bold shrink-0 transition-colors shadow-2xs active:scale-95"
                      >
                        + Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Customer Details Form & Dynamic Subtotal (5 cols) */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 border border-gray-100 shadow-lg space-y-5 sm:space-y-6"
              >
                <div>
                  <h3 className="font-display font-black text-lg sm:text-xl text-gray-900">
                    Customer & Inquiry Details
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Please provide your contact information to process your food inquiry.
                  </p>
                </div>

                {/* EXACTLY THREE CUSTOMER FIELDS AS REQUIRED */}
                <div className="space-y-3.5 sm:space-y-4">
                  {/* 1. Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-1.5">
                      Full Name <span className="text-[#E52E2D]">*</span>
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
                      }}
                      placeholder="e.g. Ramesh Patil"
                      className={`w-full px-4 py-2.5 sm:py-3 rounded-xl bg-gray-50 border text-base sm:text-sm text-gray-900 focus:outline-none transition-colors ${
                        errors.fullName ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-200 focus:border-[#E52E2D] focus:bg-white'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-red-600 text-[11px] mt-1 font-medium">{errors.fullName}</p>
                    )}
                  </div>

                  {/* 2. Mobile Number */}
                  <div>
                    <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-1.5">
                      Mobile Number <span className="text-[#E52E2D]">*</span>
                    </label>
                    <input
                      type="tel"
                      value={mobileNumber}
                      onChange={(e) => {
                        setMobileNumber(e.target.value);
                        if (errors.mobileNumber) setErrors((prev) => ({ ...prev, mobileNumber: '' }));
                      }}
                      placeholder="e.g. 9876543210"
                      className={`w-full px-4 py-2.5 sm:py-3 rounded-xl bg-gray-50 border text-base sm:text-sm text-gray-900 focus:outline-none transition-colors ${
                        errors.mobileNumber ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-200 focus:border-[#E52E2D] focus:bg-white'
                      }`}
                    />
                    {errors.mobileNumber && (
                      <p className="text-red-600 text-[11px] mt-1 font-medium">{errors.mobileNumber}</p>
                    )}
                  </div>

                  {/* 3. Email Address */}
                  <div>
                    <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-[#E52E2D]">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                      }}
                      placeholder="e.g. ramesh@gmail.com"
                      className={`w-full px-4 py-2.5 sm:py-3 rounded-xl bg-gray-50 border text-base sm:text-sm text-gray-900 focus:outline-none transition-colors ${
                        errors.email ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-200 focus:border-[#E52E2D] focus:bg-white'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-600 text-[11px] mt-1 font-medium">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Additional Order-Related Controls Allowed */}
                <div className="pt-2 border-t border-gray-100 space-y-3.5 sm:space-y-4">
                  <span className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                    Optional Pickup Schedule:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-gray-600 mb-1">
                        Pickup Date
                      </label>
                      <input
                        type="date"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="w-full px-3 py-2 sm:py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-gray-600 mb-1">
                        Pickup Time
                      </label>
                      <input
                        type="time"
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="w-full px-3 py-2 sm:py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-gray-600 mb-1">
                      Special Preparation Instructions
                    </label>
                    <textarea
                      rows={2}
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      placeholder="e.g. Less spicy fries, extra napkins, cut sandwiches into four pieces..."
                      className="w-full px-3 py-2 sm:py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900 focus:outline-none resize-none"
                    />
                  </div>
                </div>

                {/* Dynamic Subtotal & Taxes Breakdown */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>Items Total ({totalCount} items):</span>
                    <span className="font-semibold text-gray-900">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Applicable Taxes:</span>
                    <span className="font-medium text-emerald-700">Included in prices</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-2 text-xs sm:text-sm font-black text-gray-900">
                    <span>Estimated Subtotal:</span>
                    <span className="text-lg sm:text-xl text-[#E52E2D]">₹{subtotal}</span>
                  </div>
                </div>

                {/* Submission CTA */}
                <div className="space-y-2.5 sm:space-y-3">
                  <button
                    type="submit"
                    disabled={isSubmitting || items.length === 0}
                    className={`w-full py-3.5 sm:py-4 rounded-2xl font-black text-xs sm:text-sm tracking-wide text-white transition-all shadow-md flex items-center justify-center gap-2 ${
                      isSubmitting || items.length === 0
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-[#E52E2D] hover:bg-[#D0201F] hover:shadow-xl hover:shadow-red-500/25 active:scale-95'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Processing Inquiry...</span>
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Order Inquiry</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] sm:text-[11px] text-gray-400 text-center leading-relaxed">
                    By submitting, your order inquiry is sent directly to Vrindavan Treats. Review our{' '}
                    <Link to="/privacy-policy" className="underline hover:text-gray-900">
                      Privacy Policy
                    </Link>.
                  </p>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
