import { useEffect } from 'react';

interface PageMetaOptions {
  title: string;
  description: string;
  /** Optional canonical path e.g. "/menu" — defaults to current pathname */
  canonicalPath?: string;
}

const BASE_TITLE = 'Vrindavan Treats';
const BASE_DOMAIN = 'https://vrindavantreats.in';

/**
 * Sets per-page <title> and <meta name="description"> dynamically.
 * Also keeps og:title, og:description, og:url and the canonical link in sync.
 */
export function usePageMeta({ title, description, canonicalPath }: PageMetaOptions): void {
  useEffect(() => {
    const fullTitle = title === BASE_TITLE
      ? title
      : `${title} | ${BASE_TITLE}`;

    // Page title
    document.title = fullTitle;

    // Meta description
    let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Canonical
    const path = canonicalPath ?? window.location.pathname;
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${BASE_DOMAIN}${path}`);

    // OG title
    let ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', fullTitle);

    // OG description
    let ogDesc = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', description);

    // OG URL
    let ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', `${BASE_DOMAIN}${path}`);

    // Restore base title on unmount
    return () => {
      document.title = `${BASE_TITLE} | Amul Franchise & Pure Veg Quick Bites | Deolali, Nashik`;
    };
  }, [title, description, canonicalPath]);
}
