import { useEffect } from 'react';

function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

// This is a single-page index.html now, but the original site was two
// separate HTML files with their own <title>/description/og:type. This
// restores that per-page distinction by overwriting the shared defaults
// (set in index.html) on mount — a lightweight alternative to pulling in
// a head-management library for what's only two routes.
export default function usePageMeta({ title, description, ogTitle, ogType = 'website' }) {
  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', ogTitle ?? title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:type"]', 'content', ogType);
  }, [title, description, ogTitle, ogType]);
}
