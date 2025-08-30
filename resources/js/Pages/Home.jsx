"use client"

import { useState, useRef, useEffect } from "react"
import { Head, Link } from "@inertiajs/react"
import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import Navbar from "../Components/Navbar";
import Footer from "../components/Footer";
import EquipmentSection from "../Components/EquipmentSection";
import Carousel from "../Components/Carousel";
import MentorSection from "../Components/MentorSection";
import AboutMe from "../Components/AboutMe";

import {
  Phone,
  Mail,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Clock,
  Heart,
  Star,
} from "lucide-react"

const isVisible = () => true;

const useScrollAnimation = () => {
  const [visibleElements, setVisibleElements] = useState(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set([...prev, entry.target.id]))
          } else {
            // Remove element from visible set when it goes out of view
            setVisibleElements((prev) => {
              const newSet = new Set(prev)
              newSet.delete(entry.target.id)
              return newSet
            })
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    )

    const elements = document.querySelectorAll("[data-animate]")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return visibleElements
}

export default function Home({ guides = [], packages = [], articles = [] }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [heroIndex, setHeroIndex] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [translateX, setTranslateX] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(1)
  const [previewImage, setPreviewImage] = useState(null)
  const [packageSliderIndex, setPackageSliderIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef(null)
  const packageSliderRef = useRef(null)

  const visibleElements = useScrollAnimation()

  const heroSlides = []

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      if (window.innerWidth >= 1024) {
        setCardsPerView(3)
      } else if (window.innerWidth >= 768) {
        setCardsPerView(2)
      } else {
        setCardsPerView(1)
      }
    }

    // Handle URL hash on page load
    const handleHashOnLoad = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        // Small delay to ensure elements are rendered
        setTimeout(() => {
          scrollToSection(hash);
        }, 100);
      }
    };

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)
    handleResize()
    handleHashOnLoad()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [heroSlides.length])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  const handleContactClick = () => {
    // For future implementation - could navigate to contact page or open modal
    scrollToSection("contact")
  }

  const displayPackages = packages.length > 0 ? packages : defaultPackages
  const displayArticles = articles.length > 0 ? articles : defaultArticles

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Function untuk membuka preview gambar
  const openImagePreview = (imageSrc, title) => {
    setPreviewImage({ src: imageSrc, title });
  };

  // Function untuk menutup preview gambar
  const closeImagePreview = () => {
    setPreviewImage(null);
  };

  // Handle keyboard events untuk menutup modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && previewImage) {
        closeImagePreview();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [previewImage]);

  // Package slider functions
  const nextPackageSlide = () => {
    const cardsPerSlide = isMobile ? 1 : 4; // 4 on desktop, 1 on mobile
    const maxIndex = Math.max(0, displayPackages.length - cardsPerSlide);
    setPackageSliderIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevPackageSlide = () => {
    const cardsPerSlide = isMobile ? 1 : 4;
    const maxIndex = Math.max(0, displayPackages.length - cardsPerSlide);
    setPackageSliderIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Auto slide for packages (optional)
  useEffect(() => {
    if (displayPackages.length > 2) {
      const interval = setInterval(() => {
        nextPackageSlide();
      }, 5000); // Auto slide every 5 seconds
      return () => clearInterval(interval);
    }
  }, [displayPackages.length, isMobile]);

  return (
    <>
      <Head title="TAHLIYAH Tours & Travel - Pembimbing Haji dan Umrah Terpercaya" />

      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white overflow-x-hidden">
        {/* Header */}
        <Navbar scrollToSection={scrollToSection} handleContactClick={handleContactClick} />
        {/* Hero Carousel */}
        <Carousel slides={heroSlides} />
        {/* About Me Section */}
        <AboutMe />

        {/* Booking Cards Section - Package Slider */}
        <section id="paketperjalanan" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div
              id="booking-title"
              data-animate
              className={`text-center mb-16 transition-all duration-1000 ${
                visibleElements.has("booking-title") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Paket Pilihan Terbaik</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Pilih paket yang sesuai dengan kebutuhan dan budget Anda
              </p>
            </div>

            {/* Package Slider Container */}
            <div className="relative max-w-6xl mx-auto">
              {/* Navigation Buttons */}
              {displayPackages.length > (isMobile ? 1 : 4) && (
                <>
                  <button
                    onClick={prevPackageSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-orange-600 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 -ml-6"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextPackageSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-orange-600 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 -mr-6"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Slider Content */}
              <div className="overflow-hidden rounded-2xl">
                <div 
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{ 
                    transform: `translateX(-${packageSliderIndex * (isMobile ? 100 : 25)}%)` // 4 cards on desktop
                  }}
                  ref={packageSliderRef}
                >
                  {displayPackages.map((pkg, index) => (
                    <div
                      key={pkg.id}
                      className="w-full md:w-1/4 flex-shrink-0 px-1.5 md:px-2" // 4 columns on desktop, smaller padding
                    >
                      <div
                        id={`package-${index}`}
                        data-animate
                        className={`relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 group h-full transform-gpu cursor-pointer ${
                          visibleElements.has(`package-${index}`) ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
                        }`}
                        style={{ 
                          transitionDelay: `${(index % 4) * 100}ms`,
                          willChange: 'transform, opacity'
                        }}
                        onClick={() => openImagePreview(
                          pkg.thumbnail ? `/storage/${pkg.thumbnail}` : "/placeholder.svg", 
                          pkg.title
                        )}
                      >
                        {/* Card content with portrait aspect ratio */}
                        <div className="aspect-[2/3] relative">
                          <img
                            src={pkg.thumbnail ? `/storage/${pkg.thumbnail}` : "/placeholder.svg"}
                            alt={pkg.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:from-black/80 group-hover:via-black/20 transition-all duration-300"></div>

                          {/* Preview Icon Overlay - shown on hover */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-white/20 backdrop-blur-sm text-white p-4 rounded-full border border-white/30">
                            </div>
                          </div>

                          {/* Preview hint text */}
                          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-black/50 text-white px-2 py-1 rounded text-xs">
                              Click to preview
                            </div>
                          </div>

                          <div className="absolute bottom-2 left-2 right-2">
                            <h3 className="text-xl font-bold text-white mb-1 line-clamp-2 leading-tight">{pkg.title}</h3>
                            <p className="text-white/90 mb-2 text-sm leading-relaxed line-clamp-2">{pkg.description}</p>

                            <div className="space-y-2 mb-3">
                              <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-3 w-3 text-white/80" />
                                  <span className="text-white/80">{pkg.duration} Hari</span>
                                </div>
                                {pkg.rating && (
                                  <div className="flex items-center space-x-1">
                                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                    <span className="text-white font-medium text-sm">{pkg.rating}/5</span>
                                  </div>
                                )}
                              </div>
                              <div className="text-right">
                                <p className="text-orange-300 text-xl font-bold">Rp. {new Intl.NumberFormat('id-ID').format(pkg.price)}</p>
                              </div>
                            </div>

                            <Button 
                              className="w-full bg-white text-gray-900 hover:bg-gray-100 font-semibold py-1.5 text-xs rounded-lg transition-all duration-300 hover:scale-105"
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent card click event
                                open("https://wa.me/6289676468999?text=Halo%20TahliyahTour%2C%20saya%20ingin%20reservasi%20");
                              }}
                            >
                              Reservasi
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Slider Indicators */}
              {displayPackages.length > (isMobile ? 1 : 4) && (
                <div className="flex justify-center space-x-2 mt-8">
                  {Array.from({ 
                    length: Math.max(1, displayPackages.length - (isMobile ? 0 : 3)) 
                  }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => setPackageSliderIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-110 ${
                        packageSliderIndex === index 
                          ? 'bg-orange-600 scale-110' 
                          : 'bg-orange-200 hover:bg-orange-400'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Articles Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div
              id="artikel"
              data-animate
              className={`text-center mb-16 transition-all duration-1000 ${
                visibleElements.has("artikel") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Artikel & Tips</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Baca artikel dan tips berguna untuk persiapan ibadah Anda
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {displayArticles.map((article, index) => (
                <Card
                  key={article.id}
                  id={`article-${index}`}
                  data-animate
                  className={`overflow-hidden hover:shadow-xl transition-all duration-1000 hover:scale-105 ${
                    visibleElements.has(`article-${index}`) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={article.thumbnail ? `/storage/${article.thumbnail}` : "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-gray-500 text-sm mb-2">
                      {formatDate(article.published_at || article.created_at)}
                    </p>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{article.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                    <Link
                      href={route('public.article.show', article.slug)}
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white bg-transparent rounded-md transition-colors duration-200"
                    >
                      Baca Selengkapnya
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* View All Articles Button */}
            {articles.length > 0 && (
              <div className="text-center mt-12">
                <Link  
                  href={route('public.articles')}
                  className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors duration-200"
                >
                  Lihat Semua Artikel
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Guides Carousel Section */}
        <MentorSection/>
        
        <EquipmentSection/>
        {/* Footer */}
          <Footer />
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeImagePreview}
        >
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closeImagePreview}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors duration-200 z-10"
            >
              <X className="w-8 h-8" />
            </button>
            
            {/* Image */}
            <img
              src={previewImage.src}
              alt={previewImage.title}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Title */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg">
              <h3 className="text-white text-xl font-bold text-center">
                {previewImage.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
