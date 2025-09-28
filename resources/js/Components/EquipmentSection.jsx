import { useState, useRef, useEffect } from "react";

export default function EquipmentSection({ katalogs = [] }) {
  const [selectedIndex, setSelectedIndex] = useState(null); // simpan index
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scrollToNext = () => {
    if (scrollContainerRef.current) {
      const itemWidth = scrollContainerRef.current.firstChild.offsetWidth;
      const gap = 24;
      scrollContainerRef.current.scrollBy({ left: itemWidth + gap, behavior: "smooth" });
    }
  };

  const scrollToPrev = () => {
    if (scrollContainerRef.current) {
      const itemWidth = scrollContainerRef.current.firstChild.offsetWidth;
      const gap = 24;
      scrollContainerRef.current.scrollBy({ left: -(itemWidth + gap), behavior: "smooth" });
    }
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      .hide-scrollbar::-webkit-scrollbar { display: none; }
      .gallery-container { scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; }
      .gallery-item { scroll-snap-align: start; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleImageClick = (index) => {
    if (!isDragging) setSelectedIndex(index);
  };

  const closeModal = () => setSelectedIndex(null);

  // drag handlers
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
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchMove = (e) => {
    if (startX === 0) return;
    setIsDragging(true);
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
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

  // data item yang sedang dipreview
  const selectedItem = selectedIndex !== null ? katalogs[selectedIndex] : null;

  return (
    <section
      id="katalog"
      className="py-10 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-full">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Katalog
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Temukan berbagai perlengkapan perjalanan sesuai kebutuhan Anda.
          </p>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            *klik untuk melihat detail.
          </p>
        </div>

        {/* Navigasi */}
        <div className="w-full overflow-hidden relative group">
          <button
            onClick={scrollToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 
                      bg-white/80 hover:bg-white text-gray-800 p-2 
                      rounded-r-lg shadow-lg opacity-0 group-hover:opacity-100 
                      transition-opacity duration-300 
                      focus:outline-none focus:ring-0"
          >
            ‹
          </button>

          <button
            onClick={scrollToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 
                      bg-white/80 hover:bg-white text-gray-800 p-2 
                      rounded-l-lg shadow-lg opacity-0 group-hover:opacity-100 
                      transition-opacity duration-300 
                      focus:outline-none focus:ring-0"
          >
            ›
          </button>

          {/* Gallery */}
          <div
            ref={scrollContainerRef}
            className="hide-scrollbar gallery-container flex gap-3 md:gap-6 overflow-x-auto pb-4 px-4 cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {katalogs.length > 0 ? (
              katalogs.map((item, index) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 w-48 h-64 sm:w-56 sm:h-72 md:w-64 md:h-80 bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group gallery-item"
                  onClick={() => handleImageClick(index)}
                >
                  <img
                    src={`/storage/${item.gambar}`}
                    alt={item.nama}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">Belum ada katalog</p>
            )}
          </div>
        </div>

        {/* Modal */}
        {selectedItem && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <div
              className="relative max-w-sm sm:max-w-md md:max-w-lg max-h-[85vh] w-full h-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={`/storage/${selectedItem.gambar}`}
                alt={selectedItem.nama}
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 bg-black bg-opacity-40 hover:bg-opacity-60 text-white rounded-full w-8 h-8 flex items-center justify-center"
              >
                ×
              </button>

              {/* Tombol Prev/Next */}
              <button
                onClick={() =>
                  setSelectedIndex((prev) =>
                    prev > 0 ? prev - 1 : katalogs.length - 1
                  )
                }
                className="absolute left-2 top-1/2 -translate-y-1/2 
                          bg-black/50 text-white p-2 rounded-full 
                          hover:bg-black/70 
                          focus:outline-none focus:ring-0"
              >
                ‹
              </button>

              <button
                onClick={() =>
                  setSelectedIndex((prev) =>
                    prev < katalogs.length - 1 ? prev + 1 : 0
                  )
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 
                          bg-black/50 text-white p-2 rounded-full 
                          hover:bg-black/70 
                          focus:outline-none focus:ring-0"
              >
                ›
              </button>


              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-lg">
                <h3 className="text-white font-semibold text-lg">
                  {selectedItem.nama}
                </h3>
                <p className="text-white/80 text-sm">{selectedItem.deskripsi}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
