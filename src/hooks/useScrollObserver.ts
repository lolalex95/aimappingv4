import { useEffect } from 'react';

/**
 * useScrollObserver
 * Attaches an IntersectionObserver to any DOM elements with [data-reveal].
 * Toggles the 'is-revealed' class both on entering and leaving the viewport,
 * ensuring animations continuously re-trigger whenever the user scrolls
 * up or down through the page.
 *
 * Prevents re-observing already observed elements to avoid layout reflow glitches
 * when interactive components (like accordions or form inputs) change state.
 */
export function useScrollObserver() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-reveal]').forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        const rect = entry.boundingClientRect;
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        // An element is currently in view if its top is above the bottom edge
        // and its bottom is below the top edge
        const isInView = rect.bottom > 0 && rect.top < windowHeight;

        if (entry.isIntersecting || isInView) {
          entry.target.classList.add('is-revealed');
        } else {
          // Only remove when the element is strictly outside the viewport
          entry.target.classList.remove('is-revealed');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px 0px -20px 0px',
      threshold: 0,
    });

    const observedSet = new WeakSet<Element>();

    const registerElements = () => {
      const elements = document.querySelectorAll('[data-reveal]');
      elements.forEach((el) => {
        if (!observedSet.has(el)) {
          observedSet.add(el);
          observer.observe(el);
        }
      });
    };

    // Initial observation
    registerElements();

    // Watch for newly added DOM elements only
    const mutationObserver = new MutationObserver((mutations) => {
      let hasNewDataReveal = false;
      for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
          hasNewDataReveal = true;
          break;
        }
      }
      if (hasNewDataReveal) {
        registerElements();
      }
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}

export default useScrollObserver;
