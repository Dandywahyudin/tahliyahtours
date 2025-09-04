"use client"

import { useState, useRef, useEffect } from "react"
import { Head, Link } from "@inertiajs/react"
import { Button } from "../Components/ui/Button"
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import EquipmentSection from "../Components/EquipmentSection";
import Carousel from "../Components/Carousel";
import MentorSection from "../Components/MentorSection";
import AboutMe from "../Components/AboutMe";
import { Card, CardContent } from "../Components/ui/Card";

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
    scrollToSection("contact")
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const openImagePreview = (imageSrc, packageData) => {
    setPreviewImage({ 
      src: imageSrc, 
      title: packageData.title,
      description: packageData.description,
      price: packageData.price,
      duration: packageData.duration,
      rating: packageData.rating
    });
  };

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
    const maxIndex = Math.max(0, packages.length - cardsPerSlide);
    setPackageSliderIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevPackageSlide = () => {
    const cardsPerSlide = isMobile ? 1 : 4;
    const maxIndex = Math.max(0, packages.length - cardsPerSlide);
    setPackageSliderIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Auto slide for packages (optional)
  useEffect(() => {
    if (packages.length > 2) {
      const interval = setInterval(() => {
        nextPackageSlide();
      }, 5000); // Auto slide every 5 seconds
      return () => clearInterval(interval);
    }
  }, [packages.length, isMobile]);

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
              {packages.length > (isMobile ? 1 : 4) && (
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
                  {packages.map((pkg, index) => (
                    <div
                      key={pkg.id}
                      className="w-full md:w-1/4 flex-shrink-0 px-1.5 md:px-2"
                    >
                      <div
                        id={`package-${index}`}
                        data-animate
                        className={`bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] group transform-gpu cursor-pointer overflow-hidden ${
                          visibleElements.has(`package-${index}`) ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
                        }`}
                        style={{ 
                          transitionDelay: `${(index % 4) * 100}ms`,
                          willChange: 'transform, opacity',
                          minHeight: '480px' // Consistent height for all cards
                        }}
                        onClick={() => openImagePreview(
                          pkg.thumbnail ? `/storage/${pkg.thumbnail}` : "/placeholder.svg", 
                          pkg
                        )}
                      >
                        {/* Modern Card Layout */}
                        <div className="flex flex-col h-full">
                          {/* Image Section */}
                          <div className="relative h-100 overflow-hidden">
                            <img
                              src={pkg.thumbnail ? `/storage/${pkg.thumbnail}` : "/placeholder.svg"}
                              alt={pkg.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            
                            {/* Rating badge */}
                            {pkg.rating && (
                              <div className="absolute top-4 left-4">
                                <div className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1 shadow-lg">
                                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                  <span className="text-gray-900 font-semibold text-sm">{pkg.rating}/5</span>
                                </div>
                              </div>
                            )}
                            
                            {/* Preview hint */}
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="bg-orange-600/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium">
                                Klik untuk detail
                              </div>
                            </div>
                            
                            {/* Price overlay */}
                            <div className="absolute bottom-4 right-4">
                              <div className="bg-white/95 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg">
                                <p className="text-orange-600 font-bold text-lg leading-none">
                                  Rp {Number(pkg.price).toLocaleString('id-ID')}
                                </p>
                                <p className="text-gray-500 text-xs">per orang</p>
                              </div>
                            </div>
                          </div>
                          
                          {/* Content Section */}
                          <div className="flex-1 p-5 flex flex-col">
                            {/* Title */}
                            <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                              {pkg.title}
                            </h3>
                            
                            {/* Duration */}
                            <div className="flex items-center text-gray-500 mb-3">
                              <Clock className="h-4 w-4 mr-2" />
                              <span className="text-sm">{pkg.duration} Hari</span>
                            </div>
                            
                            {/* Description - Better spacing and truncation */}
                            <div className="flex-1 mb-4">
                              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                {pkg.description}
                              </p>
                              {pkg.description && pkg.description.length > 120 && (
                                <p className="text-orange-600 text-xs mt-2 font-medium">
                                  Klik untuk melihat detail lengkap
                                </p>
                              )}
                            </div>
                            
                            {/* CTA Button */}
                            <button 
                              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] flex items-center justify-center space-x-2 mt-auto"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(`https://wa.me/6289676468999?text=Halo%20TahliyahTour%2C%20saya%20tertarik%20dengan%20paket%20${encodeURIComponent(pkg.title)}`, '_blank');
                              }}
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                              </svg>
                              <span>Konsultasi Sekarang</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Slider Indicators */}
              {packages.length > (isMobile ? 1 : 4) && (
                <div className="flex justify-center space-x-2 mt-8">
                  {Array.from({ 
                    length: Math.max(1, packages.length - (isMobile ? 0 : 3)) 
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
              {articles.map((article, index) => (
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

      {/* Package Preview Modal - Enhanced */}
      {previewImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeImagePreview}
        >
          <div className="relative max-w-5xl w-full max-h-[95vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closeImagePreview}
              className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="flex flex-col lg:flex-row h-full max-h-[95vh]">
              {/* Image Section */}
              <div className="lg:w-2/3 relative">
                <img
                  src={previewImage.src}
                  alt={previewImage.title}
                  className="w-full h-64 lg:h-full object-cover"
                  onClick={(e) => e.stopPropagation()}
                />
                {/* Image Overlay for mobile */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden"></div>
              </div>
              
              {/* Content Section */}
              <div className="lg:w-1/3 p-6 lg:p-8 overflow-y-auto">
                {/* Title */}
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {previewImage.title}
                </h2>
                
                {/* Rating & Duration */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  {previewImage.rating && (
                    <div className="flex items-center bg-orange-100 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 text-orange-400 fill-current mr-1" />
                      <span className="text-orange-600 font-medium text-sm">
                        {previewImage.rating}/5
                      </span>
                    </div>
                  )}
                  {previewImage.duration && (
                    <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                      <Clock className="w-4 h-4 text-gray-600 mr-1" />
                      <span className="text-gray-600 font-medium text-sm">
                        {previewImage.duration} Hari
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Full Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Detail Paket</h3>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {previewImage.description}
                  </div>
                </div>
                
                {/* Price */}
                {previewImage.price && (
                  <div className="bg-orange-50 rounded-lg p-4 mb-6">
                    <div className="text-center">
                      <p className="text-gray-600 text-sm mb-1">Mulai dari</p>
                      <p className="text-3xl font-bold text-orange-600">
                        Rp {Number(previewImage.price).toLocaleString('id-ID')}
                      </p>
                      <p className="text-gray-500 text-sm">per orang</p>
                    </div>
                  </div>
                )}
                
                {/* CTA Button */}
                <div className="flex gap-3">
                  <button
                    onClick={() => window.open('https://wa.me/6289676468999?text=Halo%20TahliyahTour%2C%20saya%20tertarik%20dengan%20paket%20' + encodeURIComponent(previewImage.title), '_blank')}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    Chat WhatsApp
                  </button>
                  <button
                    onClick={closeImagePreview}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
