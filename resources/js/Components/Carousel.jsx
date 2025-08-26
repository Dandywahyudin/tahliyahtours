import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import image1 from "../../../public/images/caraousel1.png";
import image2 from "../../../public/images/caraousel2.jpg"; // Make sure this file exists at the specified path
import image3 from "../../../public/images/caraousel3.png";

const heroSlides = [
  {
    title: "PEMBIMBING TERPERCAYA",
    subtitle: "TAHLIYAH Tours & Travel",
    description: "Wujudkan impian ibadah haji dan umrah Anda bersama pembimbing terpercaya dan berpengalaman",
    image: image1,
    cta: "Daftar Sekarang",
  },
  {
    title: "PERJALANAN SPIRITUAL",
    subtitle: "Yang Berkesan",
    description: "Rasakan pengalaman ibadah yang khusyuk dengan bimbingan para ustadz dan doktor agama berpengalaman",
    image: image2,
    cta: "Konsultasi Gratis",
  },
  {
    title: "LAYANAN TERBAIK",
    subtitle: "Untuk Ibadah Anda",
    description:
      "Nikmati pelayanan prima dengan fasilitas lengkap dan pembimbing yang siap mendampingi setiap langkah",
    image: image3,
    cta: "Lihat Paket",
  },
];

function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

const Carousel = () => {
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 5000); // 5 detik
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === heroIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70"></div>
          </div>

          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24">
              <div className="max-w-3xl">
                <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                  {slide.title}
                </h2>
                <h2 className="text-2xl md:text-4xl font-semibold text-orange-300 mb-8 drop-shadow-lg">
                  {slide.subtitle}
                </h2>
                <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed drop-shadow-lg">
                  {slide.description}
                </p>
                <Button
                  onClick={() => {
                    if (slide.cta === "Daftar Sekarang") {
                      scrollToSection("booking");
                    } else if (slide.cta === "Konsultasi Gratis") {
                      scrollToSection("contact");
                    } else {
                      scrollToSection("services");
                    }
                  }}
                  size="lg"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105"
                >
                  {slide.cta}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Carousel;