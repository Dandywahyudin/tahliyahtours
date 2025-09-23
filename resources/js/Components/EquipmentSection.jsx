import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Button } from '../Components/ui/Button';

const galleryItems = [
  {
    image: '/images/catalog (7).jpg',
    text: 'Pemandangan Makkah',
    description: 'Kota suci Makkah dari ketinggian dengan pemandangan yang menakjubkan dan penuh makna.'
  },
  {
    image: '/images/catalog (1).jpg',
    text: 'paket',
    description: 'Pemandangan suci Kaaba di Masjidil Haram yang menjadi kiblat umat Islam di seluruh dunia.'
  },
  {
    image: '/images/catalog (2).jpg',
    text: 'Tahliyah Tours',
    description: 'Logo resmi Tahliyah Tours & Travel, partner terpercaya untuk perjalanan ibadah Anda.'
    },
    {
    image: '/images/perlengkapan.jpg',
    text: 'Perlengkapan Haji',
    description: 'Semua perlengkapan yang dibutuhkan untuk perjalanan haji dan umrah yang lengkap dan berkualitas tinggi.'
    },
  {
    image: '/images/catalog (3).jpg',
    text: 'Masjid Nabawi',
    description: 'Masjid Nabawi di Madinah, tempat Rasulullah SAW dimakamkan dan pusat spiritualitas Islam.'
  },
  {
    image: '/images/catalog (4).jpg',
    text: 'Jamaah Haji',
    description: 'Dokumentasi jamaah haji dalam melaksanakan rukun Islam yang kelima dengan khusyuk.'
  },
  {
    image: '/images/catalog (5).jpg',
    text: 'Pemandangan Makkah',
    description: 'Kota suci Makkah dari ketinggian dengan pemandangan yang menakjubkan dan penuh makna.'
  },
  {
    image: '/images/catalog (6).jpg',
    text: 'Pemandangan Makkah',
    description: 'Kota suci Makkah dari ketinggian dengan pemandangan yang menakjubkan dan penuh makna.'
  },    
];

export default function EquipmentSection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scrollToNext = () => {
    if (scrollContainerRef.current) {
      const itemWidth = scrollContainerRef.current.firstChild.offsetWidth;
      const gap = 24; // gap-6 = 1.5rem = 24px
      scrollContainerRef.current.scrollBy({ left: itemWidth + gap, behavior: 'smooth' });
    }
  };

  const scrollToPrev = () => {
    if (scrollContainerRef.current) {
      const itemWidth = scrollContainerRef.current.firstChild.offsetWidth;
      const gap = 24; // gap-6 = 1.5rem = 24px
      scrollContainerRef.current.scrollBy({ left: -(itemWidth + gap), behavior: 'smooth' });
    }
  };

  const nextImage = () => {
    if (selectedImage) {
      const currentIndex = galleryItems.findIndex(item => item === selectedImage);
      const nextIndex = (currentIndex + 1) % galleryItems.length;
      setSelectedImage(galleryItems[nextIndex]);
    }
  };

  const prevImage = () => {
    if (selectedImage) {
      const currentIndex = galleryItems.findIndex(item => item === selectedImage);
      const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
      setSelectedImage(galleryItems[prevIndex]);
    }
  };
  
  // Add custom CSS for hiding scrollbar
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .hide-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
        -webkit-overflow-scrolling: touch;
      }
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .gallery-container {
        scroll-snap-type: x mandatory;
        -webkit-overflow-scrolling: touch;
        overscroll-behavior-x: contain;
        max-width: 100vw;
      }
      .gallery-item {
        scroll-snap-align: start;
      }
      /* Prevent horizontal page scroll */
      body {
        overflow-x: hidden;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
      document.body.style.overflowX = 'auto';
    };
  }, []);
  
  const handleImageClick = (item) => {
    if (!isDragging) {
      setSelectedImage(item);
    }
  };

  const closeModal = () => {
    setSelectedImage(null);
  };
  const handleMouseDown = (e) => {
    setIsDragging(false);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchStart = (e) => {
    setIsDragging(false);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (startX === 0) return;
    e.preventDefault();
    setIsDragging(true);
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchMove = (e) => {
    if (startX === 0) return;
    setIsDragging(true);
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setStartX(0);
    setTimeout(() => setIsDragging(false), 100);
  };

  const handleTouchEnd = () => {
    setStartX(0);
    setTimeout(() => setIsDragging(false), 100);
  };

  return (
    <section id="katalog" className="py-10 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">Katalog</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Temukan berbagai paket perjalanan yang menarik dan sesuai dengan kebutuhan Anda.</p>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">*klik untuk melihat detail.</p>
        </motion.div>

        {/* Horizontal Gallery */}
        <div className="w-full overflow-hidden relative group">
          {/* Navigation Buttons */}
          <button
            onClick={scrollToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-r-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Previous"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={scrollToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-l-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Next"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Gallery Container */}
          <div
            ref={scrollContainerRef}
            className="hide-scrollbar gallery-container flex gap-3 md:gap-6 overflow-x-auto pb-4 px-4 cursor-grab active:cursor-grabbing select-none"
            style={{ 
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch',
              width: '100%'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {galleryItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.03 }}
                className="flex-shrink-0 w-48 h-64 sm:w-56 sm:h-72 md:w-64 md:h-80 bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden cursor-pointer group gallery-item"
                onClick={() => handleImageClick(item)}
                style={{ userSelect: 'none' }}
              >
                <img
                  src={item.image}
                  alt={item.text}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 pointer-events-none"
                  draggable="false"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Image Preview Modal */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-sm sm:max-w-md md:max-w-lg max-h-[85vh] w-full h-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.image}
                alt={selectedImage.text}
                className="w-full h-full object-cover rounded-lg"
                style={{ aspectRatio: '4/6' }}
              />
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black bg-opacity-50 hover:bg-opacity-30 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-lg sm:text-xl font-bold transition-all duration-200"
              >
                ×
              </button>

              {/* Navigation buttons */}
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
                aria-label="Next image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Image info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-lg">
                <h3 className="text-white font-semibold text-lg">{selectedImage.text}</h3>
                <p className="text-white/80 text-sm">{selectedImage.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
        
        {/* Call to Action */}
      </div>
    </section>
  );
}
