import posthog from "posthog-js";

export function initPH() {
  // Don't initialize on server-side
  if (typeof window === "undefined") return;

  // Only initialize once
  if (process.env.NEXT_PUBLIC_POSTHOG_KEY && !posthog.isFeatureEnabled) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: "https://app.posthog.com",
      loaded: (posthog) => {
        if (process.env.NODE_ENV === "development") {
          // Disable capturing in development
          posthog.opt_out_capturing();
        }
      },
      autocapture: false, // Keep tracking explicit and clean
      capture_pageview: false, // Handle pageviews manually
      persistence: "localStorage",
    });
  }
}

export const ph = posthog;
