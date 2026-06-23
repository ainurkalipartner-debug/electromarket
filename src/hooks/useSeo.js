import { useEffect } from 'react';

const SEO_MARKER = 'data-seo-managed';

function upsertMeta(attr, attrValue, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${attrValue}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, attrValue);
    el.setAttribute(SEO_MARKER, 'true');
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  if (!href) return;
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    el.setAttribute(SEO_MARKER, 'true');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function upsertJsonLd(jsonLd) {
  const existing = document.head.querySelectorAll('script[data-seo-jsonld]');
  existing.forEach((el) => el.remove());
  if (!jsonLd) return;
  const items = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
  for (const item of items) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo-jsonld', 'true');
    script.textContent = JSON.stringify(item);
    document.head.appendChild(script);
  }
}

/**
 * Lightweight client-side SEO manager for this CSR/Vite SPA — sets title,
 * meta description/OG tags, canonical link, and JSON-LD per route.
 *
 * Known limitation: social-preview bots (WhatsApp/Telegram/Facebook link
 * unfurling) fetch raw HTML and don't execute JS, so they will only ever see
 * the static tags in index.html, not these per-route values. Real fix would
 * require a prerender/SSG step — intentionally out of scope for now.
 */
export function useSeo({ title, description, canonical, ogImage, jsonLd }) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ЭЛЕКТРОМАРКЕТ` : 'ЭЛЕКТРОМАРКЕТ';
    document.title = fullTitle;

    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:image', ogImage || '/favicon.jpg');
    if (canonical) {
      upsertMeta('property', 'og:url', canonical);
      upsertLink('canonical', canonical);
    }
    upsertJsonLd(jsonLd);
  }, [title, description, canonical, ogImage, jsonLd]);
}
