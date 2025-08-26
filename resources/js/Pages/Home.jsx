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

import {
  Phone,
  Mail,
  MapPin,
  Star,
  Users,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Clock,
  Heart,
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
  const containerRef = useRef(null)

  const visibleElements = useScrollAnimation()

  const heroSlides = []

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(3)
      } else if (window.innerWidth >= 768) {
        setCardsPerView(2)
      } else {
        setCardsPerView(1)
      }
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)
    handleResize()

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

  const features = [
    {
      icon: <Users className="h-8 w-8 text-orange-600" />,
      title: "Pembimbing Berpengalaman",
      description: "Tim pembimbing yang terdiri dari para ustadz dan doktor agama berpengalaman",
    },
    {
      icon: <Star className="h-8 w-8 text-orange-600" />,
      title: "Pelayanan Terbaik",
      description: "Memberikan pelayanan terbaik untuk perjalanan ibadah yang khusyuk",
    },
    {
      icon: <Calendar className="h-8 w-8 text-orange-600" />,
      title: "Jadwal Fleksibel",
      description: "Berbagai pilihan jadwal keberangkatan sesuai kebutuhan Anda",
    },
  ]

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

  const nextSlide = () => {
    setHeroIndex((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setHeroIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const defaultPackages = [
    {
      id: 1,
      name: "Umrah Premium",
      description: "Paket umrah dengan fasilitas premium dan pembimbing terpercaya",
      duration: "12 Hari",
      rating: 4.8,
      price: "Rp 25.000.000",
      image: "/images/kaaba-pilgrims.png",
      features: ["Hotel Bintang 5", "Pembimbing Berpengalaman", "Transportasi AC", "Makan 3x Sehari"],
    },
    {
      id: 2,
      name: "Haji Plus",
      description: "Paket haji plus dengan pelayanan eksklusif dan kenyamanan maksimal",
      duration: "40 Hari",
      rating: 4.9,
      price: "Rp 85.000.000",
      image: "/images/golden-dome-sunset-mosque.png",
      features: ["Hotel Dekat Haram", "Pembimbing 24 Jam", "Catering Halal", "Layanan Kesehatan"],
    },
  ]

  const defaultArticles = [
    {
      id: 1,
      title: "Panduan Lengkap Persiapan Haji dan Umrah",
      excerpt: "Tips dan panduan lengkap untuk mempersiapkan diri sebelum berangkat haji dan umrah",
      category: "Panduan",
      date: "15 Januari 2024",
      image: "/images/islamic-pilgrimage-preparation.png",
    },
    {
      id: 2,
      title: "Doa-Doa Penting Selama Umrah",
      excerpt: "Kumpulan doa-doa yang perlu dibaca selama menjalankan ibadah umrah",
      category: "Spiritual",
      date: "10 Januari 2024",
      image: "/images/islamic-prayers-kaaba.png",
    },
    {
      id: 3,
      title: "Tips Menjaga Kesehatan Selama Haji",
      excerpt: "Panduan menjaga kesehatan dan stamina selama menjalankan ibadah haji",
      category: "Kesehatan",
      date: "5 Januari 2024",
      image: "/images/pilgrimage-health-tips.png",
    },
  ]
  const displayPackages = packages.length > 0 ? packages : defaultPackages
  const displayArticles = articles.length > 0 ? articles : defaultArticles

  return (
    <>
      <Head title="TAHLIYAH Tours & Travel - Pembimbing Haji dan Umrah Terpercaya" />

      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
        {/* Header */}
        <Navbar scrollToSection={scrollToSection} handleContactClick={handleContactClick} />
        {/* Hero Carousel */}
        <Carousel slides={heroSlides} />
       
        <section id="services" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div
              id="features-title"
              data-animate
              className={`text-center mb-16 transition-all duration-1000 ${
                visibleElements.has("features-title") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Mengapa Memilih Kami?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Kami berkomitmen memberikan pelayanan terbaik untuk perjalanan ibadah Anda
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  id={`feature-${index}`}
                  data-animate
                  className={`text-center p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 transition-all duration-1000 hover:scale-105 hover:shadow-xl ${
                    visibleElements.has(`feature-${index}`) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-6 shadow-lg">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Cards Section */}
        <section id="booking" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-white">
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

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {displayPackages.map((pkg, index) => (
                <div
                  key={pkg.id}
                  id={`package-${index}`}
                  data-animate
                  className={`relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-1000 hover:scale-105 group ${
                    visibleElements.has(`package-${index}`) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="aspect-[4/3] relative">
                    <img
                      src={pkg.image || "/placeholder.svg"}
                      alt={pkg.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                    <div className="absolute top-4 right-4 flex items-center space-x-2">
                      <Heart className="h-5 w-5 text-white/80" />
                      <span className="text-white/80 text-sm font-medium">Favorit</span>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{pkg.name}</h3>
                      <p className="text-white/90 mb-4 leading-relaxed">{pkg.description}</p>

                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4 text-white/80" />
                            <span className="text-white/80 text-sm">{pkg.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-white font-medium">{pkg.rating}/5</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-orange-300 text-lg font-bold">{pkg.price}</p>
                        </div>
                      </div>

                      <Button className="w-full bg-white text-gray-900 hover:bg-gray-100 font-semibold py-3 rounded-full transition-all duration-300 hover:scale-105">
                        Reserve now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div
              id="articles-title"
              data-animate
              className={`text-center mb-16 transition-all duration-1000 ${
                visibleElements.has("articles-title") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
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
                      src={article.image || "/placeholder.svg"}
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
                    <p className="text-gray-500 text-sm mb-2">{article.date}</p>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{article.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                    <Button
                      variant="outline"
                      className="w-full border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white bg-transparent"
                    >
                      Baca Selengkapnya
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Guides Carousel Section */}
        <MentorSection/>
        
        <EquipmentSection isVisible={isVisible} />
        {/* Footer */}
          <Footer />
      </div>
    </>
  )
}
