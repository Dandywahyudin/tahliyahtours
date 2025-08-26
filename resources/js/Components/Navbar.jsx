import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { Button } from "../components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar({ scrollToSection, handleContactClick }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); 
  
  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-white shadow-md backdrop-blur-sm" : "bg-transparent"
      }`}
    >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
    <div className="flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-16 h-16 sm:w-16 sm:h-16 flex items-center justify-center">
                <img src="/images/logo.png" alt="TAHLIYAH Tours & Travel" className="object-contain w-full h-full scale-110" />
            </div>
        <div>
        </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
        {[
            { href: "home", label: "Beranda", type: "scroll" },
            { href: "services", label: "Layanan", type: "scroll" },
            { href: "guides", label: "Pembimbing", type: "scroll" },
            { href: "contact", label: "Kontak", type: "scroll" },
        ].map((item) => (
            <button
            key={item.href}
            onClick={() => scrollToSection(item.href)}
            className={`font-medium transition-colors duration-300 hover:scale-105 ${
                isScrolled
                ? "text-gray-700 hover:text-orange-600"
                : "text-white hover:text-orange-200 drop-shadow-lg"
            }`}
            >
            {item.label}
            </button>
        ))}
        </nav>

        <Button
        asChild // 2. Tambahkan prop ini, ini adalah kuncinya!
        className={`hidden md:block transition-all duration-300 hover:scale-105 ${
            isScrolled
            ? "bg-orange-600 hover:bg-orange-700 text-white"
            : "bg-white text-orange-600 hover:bg-orange-50 drop-shadow-lg"
        }`}
        >
        {/* 3. Gunakan Link dari Inertia dengan prop href di dalamnya */}
        <Link href={route('login')}>
            Login
        </Link>
        </Button>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? (
            <X
            className={`h-6 w-6 transition-colors duration-300 ${
                isScrolled ? "text-gray-900" : "text-white drop-shadow-lg"
            }`}
            />
        ) : (
            <Menu
            className={`h-6 w-6 transition-colors duration-300 ${
                isScrolled ? "text-gray-900" : "text-white drop-shadow-lg"
            }`}
            />
        )}
        </button>
    </div>

    {/* Mobile Menu */}
    {isMobileMenuOpen && (
        <div className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg">
        <nav className="flex flex-col space-y-2">
            {[
            { href: "home", label: "Beranda" },
            { href: "services", label: "Layanan" },
            { href: "guides", label: "Pembimbing" },
            { href: "contact", label: "Kontak" },
            ].map((item) => (
            <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-left px-4 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors"
            >
                {item.label}
            </button>
            ))}
            <div className="px-4 pt-2">
            <Button
                onClick={handleContactClick}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
            >
                Login
            </Button>
            </div>
        </nav>
        </div>
    )}
    </div>
</header>
)}
