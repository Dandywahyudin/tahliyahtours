import { useRef, useState, useEffect, memo, useCallback, useMemo } from "react";
import { motion, useMotionValue, useSpring, useInView, useTransform } from "motion/react";

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

// Optimized TiltedCard with memoization
const TiltedCard = memo(function TiltedCard({
  imageSrc,
  altText = "Tilted card image", 
  captionText = "",
  containerHeight = "300px",
  containerWidth = "100%",
  imageHeight = "300px",
  imageWidth = "300px",
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  });

  const [lastY, setLastY] = useState(0);

  function handleMouse(e) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  return (
    <figure
      ref={ref}
      className="relative w-full h-full [perspective:800px] flex flex-col items-center justify-center"
      style={{
        height: containerHeight,
        width: containerWidth,
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="absolute top-4 text-center text-sm block sm:hidden">
          This effect is not optimized for mobile. Check on desktop.
        </div>
      )}

      <motion.div
        className="relative [transform-style:preserve-3d]"
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX,
          rotateY,
          scale,
        }}
      >
        <motion.img
          src={imageSrc}
          alt={altText}
          className="absolute top-0 left-0 object-cover rounded-[15px] will-change-transform [transform:translateZ(0)]"
          style={{
            width: imageWidth,
            height: imageHeight,
          }}
        />

        {displayOverlayContent && overlayContent && (
          <motion.div
            className="absolute top-0 left-0 z-[2] will-change-transform [transform:translateZ(30px)]"
          >
            {overlayContent}
          </motion.div>
        )}
      </motion.div>

      {showTooltip && (
        <motion.figcaption
          className="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-white px-[10px] py-[4px] text-[10px] text-[#2d2d2d] opacity-0 z-[3] hidden sm:block"
          style={{
            x,
            y,
            opacity,
            rotate: rotateFigcaption,
          }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
});

// Optimized animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

// Main AboutMe component with performance optimizations
export default function AboutMe() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardRef = useRef(null);
  const textRef = useRef(null);
  const featuresRef = useRef(null);

  const sectionInView = useInView(sectionRef, { once: false, threshold: 0.1 });
  const titleInView = useInView(titleRef, { once: false, threshold: 0.3 });
  const cardInView = useInView(cardRef, { once: false, threshold: 0.3 });
  const textInView = useInView(textRef, { once: false, threshold: 0.3 });
  const featuresInView = useInView(featuresRef, { once: false, threshold: 0.1 });

  // Memoized feature data to prevent re-renders
  const featureItems = useMemo(() => [
    {
      title: "Pembimbing Tersertifikasi", 
      desc: "Tim pembimbing yang telah tersertifikasi dan berpengalaman"
    },
    {
      title: "Fasilitas Optimal", 
      desc: "Hotel berbintang dan transportasi yang nyaman"
    },
    {
      title: "Harga Terjangkau", 
      desc: "Paket yang kami tawarkan disusun dengan efisiensi maksimal tanpa mengurangi kualitas pelayanan"
    },
    {
      title: "Kemudahan Pembayaran", 
      desc: "Berbagai metode pembayaran yang memudahkan Anda"
    },
    {
      title: "Konsultasi Gratis", 
      desc: "Kami menyediakan layanan konsultasi gratis untuk membantu Anda merencanakan perjalanan ibadah"
    }
  ], []);

  // Memoized TiltedCard to prevent re-renders
  const tiltedCard = useMemo(() => (
    <TiltedCard
      imageSrc="/images/tahliyahtour.jpg"
      altText="TAHLIYAH Tours & Travel"
      captionText="Tahliyah Tours & Travel"
      containerHeight="450px"
      containerWidth="350px"
      imageHeight="400px"
      imageWidth="350px"
      scaleOnHover={1.05}
      rotateAmplitude={12}
      showMobileWarning={false}
      showTooltip={true}
    />
  ), []);

  return (
    <motion.section 
    id="about"
      ref={sectionRef}
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white"
      initial={{ opacity: 0 }}
      animate={sectionInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          ref={titleRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            Tentang Kami
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            Tahliyah Tours & Travel adalah perusahaan yang berpengalaman dalam menyelenggarakan perjalanan ibadah haji dan umrah
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 items-center">
          {/* Left Content - Tilted Card (pindah ke kiri) */}
          <motion.div 
            ref={cardRef}
            className="flex justify-center order-2 md:order-1"
            initial={{ opacity: 0, x: -80 }}
            animate={cardInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -80 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {tiltedCard}
          </motion.div>

          {/* Right Content - Text (pindah ke kanan) */}
          <motion.div 
            ref={textRef}
            className="order-1 md:order-2"
            initial={{ opacity: 0, x: 80 }}
            animate={textInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 80 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.h3 
              className="text-2xl font-bold text-black-500 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={textInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            >
              PT. Mumtaaz Cahaya Abadi (Tahliyah Tours)
            </motion.h3>
            <motion.p 
              className="text-black-600 font-semi-bold mb-6"
              initial={{ opacity: 0, y: 15 }}
              animate={textInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            >
              Kami adalah perusahaan Biro Perjalanan Wisata yang telah resmi mendapatkan izin sebagai Penyelenggara Perjalanan Ibadah Umrah (PPIU) dari Kementerian Agama Republik Indonesia.
            </motion.p>
            
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={textInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div 
                className="flex items-start space-x-3"
                initial={{ opacity: 0, x: -60, scale: 0.7, rotateY: 45 }}
                animate={textInView ? { opacity: 1, x: 0, scale: 1, rotateY: 0 } : { opacity: 0, x: -60, scale: 0.7, rotateY: 45 }}
                transition={{ duration: 0.8, delay: 0.8, type: "spring", stiffness: 120 }}
              >
                <motion.div 
                  className="w-2 h-2 bg-orange-600 rounded-full mt-2"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={textInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                  transition={{ duration: 0.6, delay: 1.0, type: "spring", stiffness: 200 }}
                ></motion.div>
                <div>
                  <h4 className="font-semibold text-gray-900">Pembimbing Tersertifikasi</h4>
                  <p className="text-gray-600 text-sm">Tim pembimbing yang telah tersertifikasi dan berpengalaman</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start space-x-3"
                initial={{ opacity: 0, x: -60, scale: 0.7, rotateY: 45 }}
                animate={textInView ? { opacity: 1, x: 0, scale: 1, rotateY: 0 } : { opacity: 0, x: -60, scale: 0.7, rotateY: 45 }}
                transition={{ duration: 0.8, delay: 1.0, type: "spring", stiffness: 120 }}
              >
                <motion.div 
                  className="w-2 h-2 bg-orange-600 rounded-full mt-2"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={textInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                  transition={{ duration: 0.6, delay: 1.2, type: "spring", stiffness: 200 }}
                ></motion.div>
                <div>
                  <h4 className="font-semibold text-gray-900">Fasilitas Optimal</h4>
                  <p className="text-gray-600 text-sm">Hotel dan transportasi yang aman dan nyaman</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start space-x-3"
                initial={{ opacity: 0, x: -60, scale: 0.7, rotateY: 45 }}
                animate={textInView ? { opacity: 1, x: 0, scale: 1, rotateY: 0 } : { opacity: 0, x: -60, scale: 0.7, rotateY: 45 }}
                transition={{ duration: 0.8, delay: 1.0, type: "spring", stiffness: 120 }}
              >
                <motion.div 
                  className="w-2 h-2 bg-orange-600 rounded-full mt-2"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={textInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                  transition={{ duration: 0.6, delay: 1.2, type: "spring", stiffness: 200 }}
                ></motion.div>
                <div>
                  <h4 className="font-semibold text-gray-900">Manajement By Khalifah Group</h4>
                  <p className="text-gray-600 text-sm">Program umrah kami dikelola oleh Khalifah Tour, Khalifah Tour adalah Induk Perusahaan dari Tahliyah Tour.</p>
                </div>
              </motion.div>
              







              <motion.div 
                className="flex items-start space-x-3"
                initial={{ opacity: 0, x: -60, scale: 0.7, rotateY: 45 }}
                animate={textInView ? { opacity: 1, x: 0, scale: 1, rotateY: 0 } : { opacity: 0, x: -60, scale: 0.7, rotateY: 45 }}
                transition={{ duration: 0.8, delay: 1.2, type: "spring", stiffness: 120 }}
              >
                <motion.div 
                  className="w-2 h-2 bg-orange-600 rounded-full mt-2"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={textInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                  transition={{ duration: 0.6, delay: 1.4, type: "spring", stiffness: 200 }}
                ></motion.div>
                <div>
                  <h4 className="font-semibold text-gray-900">Harga Terjangkau</h4>
                  <p className="text-gray-600 text-sm">Paket yang kami tawarkan disusun dengan efisiensi maksimal tanpa mengurangi kualitas pelayanan</p>
                </div>
              </motion.div>
              <motion.div 
                className="flex items-start space-x-3"
                initial={{ opacity: 0, x: -60, scale: 0.7, rotateY: 45 }}
                animate={textInView ? { opacity: 1, x: 0, scale: 1, rotateY: 0 } : { opacity: 0, x: -60, scale: 0.7, rotateY: 45 }}
                transition={{ duration: 0.8, delay: 1.4, type: "spring", stiffness: 120 }}
              >
                <motion.div 
                  className="w-2 h-2 bg-orange-600 rounded-full mt-2"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={textInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                  transition={{ duration: 0.6, delay: 1.6, type: "spring", stiffness: 200 }}
                ></motion.div>
                <div>
                  <h4 className="font-semibold text-gray-900">Kemudahan Pembayaran</h4>
                  <p className="text-gray-600 text-sm">Berbagai metode pembayaran ( Tabungan ) yang memudahkan Anda</p>
                </div>
              </motion.div>
              <motion.div 
                className="flex items-start space-x-3"
                initial={{ opacity: 0, x: -60, scale: 0.7, rotateY: 45 }}
                animate={textInView ? { opacity: 1, x: 0, scale: 1, rotateY: 0 } : { opacity: 0, x: -60, scale: 0.7, rotateY: 45 }}
                transition={{ duration: 0.8, delay: 1.6, type: "spring", stiffness: 120 }}
              >
                <motion.div 
                  className="w-2 h-2 bg-orange-600 rounded-full mt-2"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={textInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                  transition={{ duration: 0.6, delay: 1.8, type: "spring", stiffness: 200 }}
                ></motion.div>
                <div>
                  <h4 className="font-semibold text-gray-900">Konsultasi Gratis</h4>
                  <p className="text-gray-600 text-sm">Kami menyediakan layanan konsultasi gratis untuk membantu Anda merencanakan perjalanan ibadah</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
          <motion.div 
            ref={featuresRef}
            className="grid md:grid-cols-3 gap-8 mt-8"
            initial={{ opacity: 0, y: 60 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <motion.div 
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 transition-all duration-500 hover:scale-105 hover:shadow-xl"
              initial={{ opacity: 0, y: 40 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.03 }}
            >
              <motion.div 
                className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-6 shadow-lg"
                initial={{ scale: 0, opacity: 0 }}
                animate={featuresInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <svg className="h-8 w-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </motion.div>
              <motion.h3 
                className="text-2xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: 0.15 }}
              >
                Pembimbing Berpengalaman
              </motion.h3>
              <motion.p 
                className="text-gray-600 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                Tim pembimbing terdiri dari para ustadz yang berpengalaman
              </motion.p>
            </motion.div>

            <motion.div 
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 transition-all duration-500 hover:scale-105 hover:shadow-xl"
              initial={{ opacity: 0, y: 40 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              whileHover={{ scale: 1.03 }}
            >
              <motion.div 
                className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-6 shadow-lg"
                initial={{ scale: 0, opacity: 0 }}
                animate={featuresInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <svg className="h-8 w-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </motion.div>
              <motion.h3 
                className="text-2xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: 0.25 }}
              >
                Pelayanan Terbaik
              </motion.h3>
              <motion.p 
                className="text-gray-600 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                Memberikan pelayanan terbaik untuk perjalanan ibadah yang khusyuk
              </motion.p>
            </motion.div>

            <motion.div 
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 transition-all duration-500 hover:scale-105 hover:shadow-xl"
              initial={{ opacity: 0, y: 40 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              whileHover={{ scale: 1.03 }}
            >
              <motion.div 
                className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-6 shadow-lg"
                initial={{ scale: 0, opacity: 0 }}
                animate={featuresInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <svg className="h-8 w-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
              </motion.div>
              <motion.h3 
                className="text-2xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: 0.35 }}
              >
                Kepastian Tanggal Keberangkatan
              </motion.h3>
              <motion.p 
                className="text-gray-600 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                Berbagai pilihan jadwal keberangkatan sesuai kebutuhan Anda
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
    </motion.section>
  );
}