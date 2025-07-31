import { useEffect } from 'react';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const GA_MEASUREMENT_ID = 'G-VTQHVVV5GB';

export const useAnalytics = () => {
  const trackPageView = (page_path: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path,
      });
    }
  };

  const trackEvent = (action: string, category: string, label?: string, value?: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  };

  const trackCustomEvent = (eventName: string, parameters?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, parameters);
    }
  };

  return {
    trackPageView,
    trackEvent,
    trackCustomEvent,
  };
};

export const usePageTracking = () => {
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    // Track initial page view
    trackPageView(window.location.pathname);

    // Track page views on route changes
    const handleRouteChange = () => {
      trackPageView(window.location.pathname);
    };

    // Listen for popstate events (back/forward navigation)
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [trackPageView]);
}; 