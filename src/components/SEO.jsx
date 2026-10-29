import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Lightweight, zero-dependency SEO head manager for Latushya SPA.
 * Dynamically updates document title, meta descriptions, canonical URLs,
 * Open Graph, Twitter Cards, robots indexing directives, and route-level JSON-LD schema on navigation.
 */
export default function SEO({
  title,
  description,
  canonicalUrl,
  ogImage = 'https://www.latushya.com/projects/media__1784490387524.jpg',
  ogType = 'website',
  schemaData = null,
  noindex = false
}) {
  const location = useLocation();
  const currentUrl = canonicalUrl || `https://www.latushya.com${location.pathname === '/' ? '' : location.pathname}`;

  useEffect(() => {
    // 1. Document Title
    if (title) {
      document.title = title;
    }

    // Helper to create or update meta tags
    const setMeta = (attrName, attrValue, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 2. Primary Meta Description
    if (description) {
      setMeta('name', 'description', description);
      setMeta('property', 'og:description', description);
      setMeta('name', 'twitter:description', description);
    }

    // 3. Social Media Titles
    if (title) {
      setMeta('property', 'og:title', title);
      setMeta('name', 'twitter:title', title);
    }

    // 4. OpenGraph & Twitter Attributes
    setMeta('property', 'og:url', currentUrl);
    setMeta('property', 'og:type', ogType);
    if (ogImage) {
      setMeta('property', 'og:image', ogImage);
      setMeta('name', 'twitter:image', ogImage);
    }

    // 5. Robots indexing
    if (noindex) {
      setMeta('name', 'robots', 'noindex, follow');
    } else {
      setMeta('name', 'robots', 'index, follow');
    }

    // 6. Canonical Link Tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);

    // 7. Route-level Structured Data (JSON-LD)
    let scriptTag = document.getElementById('route-schema');
    if (schemaData) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'route-schema';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.text = JSON.stringify(schemaData);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [title, description, currentUrl, ogImage, ogType, schemaData, noindex]);

  return null;
}
