/**
 * Accurately determines if Vrindavan Treats is currently open
 * based on India Standard Time (IST = UTC+05:30).
 * Opening hours: 9:00 AM to 11:00 PM IST every day.
 */
export function getStoreStatusIST(): {
  isOpen: boolean;
  statusText: string;
  timeStringIST: string;
  closingInMinutes?: number;
} {
  // Current UTC time
  const now = new Date();
  
  // Calculate IST (UTC + 5 hours 30 minutes)
  const istOffsetMs = 5.5 * 60 * 60 * 1000;
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const istDate = new Date(utcMs + istOffsetMs);

  const hours = istDate.getHours();
  const minutes = istDate.getMinutes();
  const currentMinuteOfDay = hours * 60 + minutes;

  const openMinute = 9 * 60; // 9:00 AM
  const closeMinute = 23 * 60; // 11:00 PM (23:00)

  const isOpen = currentMinuteOfDay >= openMinute && currentMinuteOfDay < closeMinute;

  // Format IST time display
  const hours12 = hours % 12 || 12;
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const paddedMins = minutes < 10 ? `0${minutes}` : minutes;
  const timeStringIST = `${hours12}:${paddedMins} ${ampm} IST`;

  if (isOpen) {
    const minsUntilClose = closeMinute - currentMinuteOfDay;
    if (minsUntilClose <= 60) {
      return {
        isOpen: true,
        statusText: `Open Now · Closes in ${minsUntilClose} mins (11:00 PM)`,
        timeStringIST,
        closingInMinutes: minsUntilClose,
      };
    }
    return {
      isOpen: true,
      statusText: 'Open Now · Closes at 11:00 PM IST',
      timeStringIST,
    };
  } else {
    return {
      isOpen: false,
      statusText: 'Closed Now · Opens at 9:00 AM IST',
      timeStringIST,
    };
  }
}
