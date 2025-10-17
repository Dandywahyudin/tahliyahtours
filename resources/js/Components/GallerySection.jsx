import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const GallerySection = () => {
  const [displayImages, setDisplayImages] = useState([]);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [showAllMobile, setShowAllMobile] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Gallery data
  const galleryData = [
    {
      id: 1,
      category: 'haji',
      title: 'Ibadah Haji 2023',
      image: '/images/gallery/gallery.jpeg',
      thumb: '/images/gallery/gallery.jpeg',
    },
    {
      id: 2,
      category: 'umrah',
      title: 'Umrah Spiritual',
      image: '/images/gallery/gallery2.jpeg',
      thumb: '/images/gallery/gallery2.jpeg',
    },
    {
      id: 3,
      category: 'haji',
      title: 'Pelayanan Haji',
      image: '/images/gallery/gallery3.jpeg',
      thumb: '/images/gallery/gallery3.jpeg',
    },
    {
      id: 4,
      category: 'umrah',
      title: 'Pengalaman Umrah',
      image: '/images/gallery/gallery4.jpeg',
      thumb: '/images/gallery/gallery4.jpeg',
    },
    {
      id: 5,
      category: 'kegiatan',
      title: 'Kegiatan Persiapan',
      image: '/images/gallery/gallery5.jpeg',
      thumb: '/images/gallery/gallery5.jpeg',
    },
    {
      id: 6,
      category: 'kegiatan',
      title: 'Bimbingan Calon Jemaah',
      image: '/images/gallery/gallery7.jpeg',
      thumb: '/images/gallery/gallery7.jpeg',
    },
    {
      id: 7,
      category: 'kegiatan',
      title: 'Bimbingan Calon Jemaah',
      image: '/images/gallery/gallery8.jpeg',
      thumb: '/images/gallery/gallery8.jpeg',
    },
    {
      id: 8,
      category: 'kegiatan',
      title: 'Bimbingan Calon Jemaah',
      image: '/images/gallery/gallery9.jpeg',
      thumb: '/images/gallery/gallery9.jpeg',
    },
    {
      id: 9,
      category: 'kegiatan',
      title: 'Bimbingan Calon Jemaah',
      image: '/images/gallery/gallery10.jpeg',
      thumb: '/images/gallery/gallery10.jpeg',
    },
    {
      id: 10,
      category: 'kegiatan',
      title: 'Bimbingan Calon Jemaah',
      image: '/images/gallery/gallery11.jpeg',
      thumb: '/images/gallery/gallery11.jpeg',
    },
  ];

  useEffect(() => {
    setDisplayImages(galleryData);

    // Check if mobile on mount
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const featuredImage = displayImages[featuredIndex];
  
  // Show 4 items on mobile if not expanded, otherwise show all
  const visibleThumbnails = isMobile && !showAllMobile 
    ? displayImages.slice(0, 4) 
    : displayImages;
  
  const hasMoreItems = isMobile && displayImages.length > 4;

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-orange-50/20 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-10 sm:mb-12 lg:mb-14"
        >

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-orange-600 to-orange-500 bg-clip-text text-transparent mb-3 sm:mb-4">
            Momen Berharga Perjalanan
          </h2>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-block px-3 py-1.5 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full text-orange-700 font-semibold text-xs sm:text-sm mb-3"
          >
            Galeri Kami
          </motion.span>
        </motion.div>

        {/* Gallery Container */}
        <div className="grid gap-4 sm:gap-5">
          {/* Featured Image */}
          {featuredImage && (
            <motion.div
              key={`featured-${featuredIndex}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-500"
            >
              <div className="relative h-80 sm:h-96 lg:h-[400px] overflow-hidden rounded-xl sm:rounded-2xl bg-gray-200">
                <motion.img
                  key={featuredImage.id}
                  src={featuredImage.thumb}
                  alt={featuredImage.title}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-xl sm:rounded-2xl"
              />
            </motion.div>
          )}

          {/* Thumbnail Grid */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {visibleThumbnails.map((image, index) => {
                // Find actual index in displayImages for ring check
                const actualIndex = displayImages.findIndex(img => img.id === image.id);
                
                return (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    onClick={() => {
                      setFeaturedIndex(actualIndex);
                    }}
                    className={`group relative overflow-hidden rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-500 cursor-pointer ${
                      featuredIndex === actualIndex ? 'ring-2 ring-orange-500 shadow-lg' : ''
                    }`}
                  >
                    <div className="relative h-32 sm:h-40 lg:h-48 overflow-hidden rounded-lg sm:rounded-xl bg-gray-200">
                      <motion.img
                        src={image.thumb}
                        alt={image.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    {/* Overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-lg sm:rounded-xl"
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* Lihat Semua Button - Mobile Only */}
            {hasMoreItems && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex justify-center pt-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAllMobile(!showAllMobile)}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                >
                  {showAllMobile ? (
                    <>
                      <span>Tutup</span>
                      <svg className="w-5 h-5 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </>
                  ) : (
                    <>
                      <span>Lihat Semua</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </>
                  )}
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
