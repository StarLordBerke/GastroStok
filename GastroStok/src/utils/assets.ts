import React from 'react';

/**
 * GastroStok Asset URL Resolver
 * Ensures images resolve correctly on all deployment targets:
 * - GitHub Pages (subpaths like https://username.github.io/reponame/)
 * - Vercel / Netlify / Cloud Run (domain root like https://example.com/)
 * - Local development (http://localhost:3000/)
 */

export function getAssetUrl(path: string | undefined | null): string {
  if (!path) return '';
  
  // External or inline base64 images
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }

  // Strip leading slashes and redundant prefixes
  let clean = path.replace(/^\/+/, '');
  if (clean.startsWith('src/assets/')) {
    clean = clean.replace('src/assets/', 'assets/');
  } else if (!clean.startsWith('assets/')) {
    clean = `assets/${clean}`;
  }

  // Use Vite's BASE_URL (configured as './' or custom subpath)
  const base = import.meta.env.BASE_URL || './';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  
  return `${normalizedBase}${clean}`;
}

/**
 * Robust image fallback handler
 * If an image fails to load (e.g. strict origin or subpath mismatch),
 * tries alternate relative/absolute paths before gracefully degrading.
 */
export function handleImageFallback(e: React.SyntheticEvent<HTMLImageElement, Event>): void {
  const target = e.currentTarget;
  const attempts = Number(target.dataset.fallbackAttempt || 0);

  if (attempts === 0) {
    target.dataset.fallbackAttempt = '1';
    const currentSrc = target.getAttribute('src') || '';
    if (currentSrc.startsWith('/')) {
      target.src = '.' + currentSrc;
      return;
    } else if (currentSrc.startsWith('./')) {
      target.src = currentSrc.slice(2);
      return;
    } else {
      target.src = '/' + currentSrc;
      return;
    }
  } else if (attempts === 1) {
    target.dataset.fallbackAttempt = '2';
    const currentSrc = target.getAttribute('src') || '';
    const filename = currentSrc.split('/').pop() || '';
    if (filename) {
      target.src = `./assets/images/${filename}`;
    }
  }
}
