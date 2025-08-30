// Performance monitoring utility
export const performanceMonitor = {
  // Measure page load time
  measurePageLoad() {
    if (typeof window !== 'undefined' && window.performance) {
      const perfData = window.performance.timing;
      const loadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log(`Page load time: ${loadTime}ms`);
      return loadTime;
    }
  },

  // Measure component render time
  measureRender(componentName, startTime) {
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    console.log(`${componentName} render time: ${renderTime}ms`);
    return renderTime;
  },

  // Monitor Core Web Vitals
  observeWebVitals() {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // Largest Contentful Paint (LCP)
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          console.log(`LCP: ${entry.startTime}ms`);
        });
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay (FID)
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          console.log(`FID: ${entry.processingStart - entry.startTime}ms`);
        });
      }).observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift (CLS)
      new PerformanceObserver((list) => {
        let clsValue = 0;
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        console.log(`CLS: ${clsValue}`);
      }).observe({ entryTypes: ['layout-shift'] });
    }
  },

  // Monitor resource loading
  monitorResources() {
    if (typeof window !== 'undefined' && window.performance) {
      const resources = window.performance.getEntriesByType('resource');
      resources.forEach((resource) => {
        if (resource.duration > 1000) { // Log slow resources (>1s)
          console.warn(`Slow resource: ${resource.name} took ${resource.duration}ms`);
        }
      });
    }
  },

  // Initialize all monitoring
  init() {
    this.measurePageLoad();
    this.observeWebVitals();
    this.monitorResources();
  }
};
