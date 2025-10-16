import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import pembimbing1 from "../../../public/images/Pembimbing1.jpg";
import pembimbing2 from "../../../public/images/Pembimbing2.jpg";
import pembimbing4 from "../../../public/images/Pembimbing4.jpg";
import pembimbing6 from "../../../public/images/Pembimbing6.jpg";
import pembimbing7 from "../../../public/images/Pembimbing7.jpg";

const defaultGuides = [
  {
    id: 1,
    name: "Ust. Nurjamil, S.H.I., M.H",
    title: "Pembimbing Senior",
    experience: "15 Tahun",
    rating: 4.9,
    image: pembimbing1,
  },
  {
    id: 2,
    name: "Ust. Mumtaz Nurtaqih, SQ.S.ud",
    title: "Ahli Quranic Studies",
    experience: "12 Tahun",
    rating: 4.8,
    image: pembimbing2,
  },
  {
    id: 3,
    name: "Ust. Gungun Syihabuddin, LC",
    title: "Doktor Agama",
    experience: "20 Tahun",
    rating: 5.0,
    image: pembimbing4,
  },
  {
    id: 4,
    name: "Hj. Yuyun Yuningsih, Sos.I., M.Ag",
    title: "Pembimbing Wanita",
    experience: "14 Tahun",
    rating: 4.8,
    image: pembimbing6,
  },
  {
    id: 5,
    name: "Dr. H. Rohmanur Aziz, M.Ag",
    title: "Ahli Hadits",
    experience: "25 Tahun",
    rating: 5.0,
    image: pembimbing7,
  },
];

export default function MentorSection({ guides }) {
  const displayGuides = guides || defaultGuides;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4);
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  
  const titleRef = useRef(null);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setCardsPerView(4);
      } else if (window.innerWidth >= 1024) {
        setCardsPerView(3);
      } else if (window.innerWidth >= 768) {
        setCardsPerView(2);
      } else {
        setCardsPerView(1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsTitleVisible(true);
          observer.unobserve(entries[0].target);
        }
      }, { threshold: 0.1 }
    );
    if (titleRef.current) observer.observe(titleRef.current);
    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
    };
  }, []);
  
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };
  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(displayGuides.length - cardsPerView, prevIndex + 1));
  };
  
  const totalPages = Math.ceil(displayGuides.length / cardsPerView);
  const currentPage = Math.floor(currentIndex / cardsPerView);

return (
    <section id="guides" className="py-20 px-4 sm:px-6 lg:px-8 bg-orange-50/50">
        <div className="max-w-6xl mx-auto">
            <div
                ref={titleRef}
                className={`text-center mb-16 transition-all duration-1000 ease-in-out ${
                    isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
            >
                <h2 className="text-4xl md:text-4xl font-bold text-gray-900 mb-6">Pembimbing Tahliyah Tours</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Dibimbing oleh para Ustadz/Ustadzah yang berpengalaman
                </p>
            </div>

            <div className="relative">
                <div className="overflow-hidden">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{
                            transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
                        }}
                    >
                        {displayGuides.map((guide) => (
                            <div
                                key={guide.id}
                                className="flex-shrink-0 p-3"
                                style={{ width: `${100 / cardsPerView}%` }}
                            >
                                <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-in-out border border-gray-100 flex flex-col h-full">
                                    {/* Foto diatur dari atas */}
                                    <div className="overflow-hidden aspect-[16/13] flex items-start">
                                        <img
                                            src={guide.image}
                                            alt={guide.name}
                                            className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500 ease-in-out"
                                        />
                                    </div>
                                    <div className="p-3 flex flex-col flex-grow">
                                        <h3 className="text-base font-bold text-orange-600 mt-1 mb-2">{guide.name}</h3>
                                        <div className="mt-auto pt-6">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tombol Navigasi Dikecilkan */}
                <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="absolute left-0 sm:-left-3 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110 z-10 border border-gray-200"
                >
                    <ChevronLeft className="h-4 w-4 text-gray-700" />
                </button>
                <button
                    onClick={handleNext}
                    disabled={currentIndex >= displayGuides.length - cardsPerView}
                    className="absolute right-0 sm:-right-3 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110 z-10 border border-gray-200"
                >
                    <ChevronRight className="h-4 w-4 text-gray-700" />
                </button>
            </div>

            {/* Indikator Titik */}
            <div className="flex justify-center mt-10 space-x-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index * cardsPerView)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            currentPage === index
                                ? "bg-orange-600 scale-125"
                                : "bg-gray-300 hover:bg-gray-400"
                        }`}
                        aria-label={`Go to page ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    </section>
);
}