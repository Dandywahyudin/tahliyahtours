export const createWebPImage = (src, alt, className = '', width, height) => {
  return (
    <picture>
      <source srcSet={src.replace(/\.(jpg|jpeg|png)$/i, '.webp')} type="image/webp" />
      <img 
        src={src} 
        alt={alt} 
        className={className}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
};

export const preloadImage = (src) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  document.head.appendChild(link);
};

export const preloadCriticalImages = () => {
  // Preload hero images
  preloadImage('/images/caraousel1.png');
  preloadImage('/images/logo.png');
};
