// Simple performance monitoring utility
export const performanceMonitor = {
  // Measure page load time
  measurePageLoad() {
    if (typeof window !== 'undefined' && window.performance) {
      window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
        return loadTime;
      });
    }
  },

  // Monitor Core Web Vitals (simplified)
  observeWebVitals() {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      try {
        // Largest Contentful Paint (LCP)
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            console.log(`LCP: ${entry.startTime}ms`);
          });
        }).observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (error) {
        console.log('Performance monitoring not fully supported');
      }
    }
  },

  // Initialize monitoring
  init() {
    this.measurePageLoad();
    this.observeWebVitals();
  }
};
