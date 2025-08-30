import { lazy, Suspense } from 'react';

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
  </div>
);

// HOC untuk lazy loading dengan suspense
export const withLazyLoading = (Component, fallback = <LoadingSpinner />) => {
  return function LazyComponent(props) {
    return (
      <Suspense fallback={fallback}>
        <Component {...props} />
      </Suspense>
    );
  };
};

// Export simple lazy components  
export const LazyAboutMe = lazy(() => import('./AboutMe'));

export default {
  LazyAboutMe: withLazyLoading(LazyAboutMe),
};
