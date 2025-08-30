import React, { useState, useEffect, useRef } from "react";
import { Link } from "@inertiajs/react";
import { Button } from "../components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar({ scrollToSection, handleContactClick }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLayananDropdownOpen, setIsLayananDropdownOpen] = useState(false);
    const [isMobileLayananOpen, setIsMobileLayananOpen] = useState(false);
    const dropdownRef = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLayananDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const layananItems = [
    { href: "guides", label: "Pembimbing" },
    { href: "contact", label: "Kontak" },
    { href: "katalog", label: "Katalog" }
  ]; 
  
return (
    <header
        className={`fixed w-full top-0 z-50 transition-all duration-500 ${
            isScrolled ? "bg-white shadow-md backdrop-blur-sm" : "bg-transparent"
        }`}
    >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-2">
            <div className="flex justify-between items-center">
                <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                    <div className="w-16 h-16 sm:w-16 sm:h-16 flex items-center justify-center">
                        <img src="/images/logo.png" alt="TAHLIYAH Tours & Travel" className="object-contain w-full h-full scale-150" />
                    </div>
                    <div>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-8 items-center">
                    {[
                        { href: "home", label: "Beranda" },
                        { href: "about", label: "Tentang Kami" },
                        { href: "paketperjalanan", label: "Paket Perjalanan" },
                        { href: "artikel", label: "Artikel" }
                    ].map((item) => (
                        <Link
                            key={item.href}
                            href={item.href === "artikel" ? "/artikel" : "/"}
                            onClick={(e) => {
                                if (item.href === "artikel") {
                                    // Let Inertia handle the navigation to articles page
                                    return;
                                }
                                
                                // For other sections, check if we're on the home page
                                if (window.location.pathname !== '/') {
                                    // If not on home page, navigate to home first
                                    window.location.href = `/#${item.href}`;
                                    return;
                                }
                                
                                // If on home page, scroll to section
                                e.preventDefault();
                                scrollToSection(item.href);
                            }}
                            className={`font-medium transition-colors duration-300 hover:scale-105 ${
                                isScrolled
                                    ? "text-gray-700 hover:text-orange-600"
                                    : "text-white hover:text-orange-200 drop-shadow-lg"
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                    
                    {/* Layanan Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsLayananDropdownOpen(!isLayananDropdownOpen)}
                            className={`font-medium transition-colors duration-300 hover:scale-105 flex items-center space-x-1 ${
                                isScrolled
                                    ? "text-gray-700 hover:text-orange-600"
                                    : "text-white hover:text-orange-200 drop-shadow-lg"
                            }`}
                        >
                            <span>Layanan</span>
                            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isLayananDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {/* Dropdown Menu */}
                        {isLayananDropdownOpen && (
                            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-50">
                                {layananItems.map((item) => (
                                    <button
                                        key={item.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setIsLayananDropdownOpen(false);
                                            
                                            // Check if we're on the home page
                                            if (window.location.pathname !== '/') {
                                                // If not on home page, navigate to home first
                                                window.location.href = `/#${item.href}`;
                                                return;
                                            }
                                            
                                            // If on home page, scroll to section
                                            scrollToSection(item.href);
                                        }}
                                        className="w-full text-left px-4 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </nav>

                <Button
                    asChild
                    className={`hidden md:block transition-all duration-300 hover:scale-105 ${
                        isScrolled
                            ? "bg-orange-600 hover:bg-orange-700 text-white"
                            : "bg-white text-orange-600 hover:bg-orange-50 drop-shadow-lg"
                    }`}
                >
                    <Link href={route('login')}>
                        Login
                    </Link>
                </Button>
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
                            { href: "about", label: "Tentang Kami" },
                            { href: "paketperjalanan", label: "Paket Perjalanan" },
                            { href: "artikel", label: "Artikel" }
                        ].map((item) => (
                            <button
                                key={item.href}
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    
                                    if (item.href === "artikel") {
                                        // Navigate to articles page using standard navigation
                                        window.location.href = "/artikel";
                                        return;
                                    }
                                    
                                    // Check if we're on the home page
                                    if (window.location.pathname !== '/') {
                                        // If not on home page, navigate to home first
                                        window.location.href = `/#${item.href}`;
                                        return;
                                    }
                                    
                                    // If on home page, scroll to section
                                    scrollToSection(item.href);
                                }}
                                className="text-left px-4 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                            >
                                {item.label}
                            </button>
                        ))}
                        
                        {/* Mobile Layanan Dropdown */}
                        <div>
                            <button
                                onClick={() => setIsMobileLayananOpen(!isMobileLayananOpen)}
                                className="w-full text-left px-4 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors flex items-center justify-between"
                            >
                                <span>Layanan</span>
                                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isMobileLayananOpen ? 'rotate-180' : ''}`} />
                            </button>
                            
                            {/* Mobile Submenu */}
                            {isMobileLayananOpen && (
                                <div className="pl-4 space-y-1">
                                    {layananItems.map((item) => (
                                        <button
                                            key={item.href}
                                            onClick={() => {
                                                setIsMobileMenuOpen(false);
                                                setIsMobileLayananOpen(false);
                                                
                                                // Check if we're on the home page
                                                if (window.location.pathname !== '/') {
                                                    // If not on home page, navigate to home first
                                                    window.location.href = `/#${item.href}`;
                                                    return;
                                                }
                                                
                                                // If on home page, scroll to section
                                                scrollToSection(item.href);
                                            }}
                                            className="w-full text-left px-4 py-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors text-sm"
                                        >
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        
                        <div className="px-4 pt-2">
                            <Button
                                asChild
                                onClick={handleContactClick}
                                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                            >
                                <Link href={route('login')}>
                                    Login
                                </Link>
                            </Button>
                        </div>
                    </nav>
                </div>
            )}
        </div>
    </header>
)}