import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";

export default function Footer() {
// Helper function for smooth scroll
const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: "smooth" });
    }
};

return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                <div className="md:col-span-1">
                    <Link href="/" className="flex items-center space-x-2 mb-4 hover:opacity-80 transition-opacity">
                        <img src="/images/logo2.webp" alt="TAHLIYAH Tours & Travel" className="object-contain w-24 h-auto" />
                    </Link>
                    <p className="text-gray-400 text-sm">
                        Bimbingan Maksimal Fasilitas Optimal.
                    </p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">Layanan</h4>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        {["Umrah Reguler", "Umrah Plus", "Halal Tours", "Haji Plus"].map((item, idx) => (
                            <li key={item}>
                                <button
                                    onClick={() => scrollToSection("services")}
                                    className="hover:text-orange-400 transition-colors"
                                >
                                    {item}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">Kontak</h4>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li>
                            <a href="tel:+628966468999" className="hover:text-orange-400 transition-colors">
                                +62 896 646 8999
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://instagram.com/tahliyahtours"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-orange-400 transition-colors"
                            >
                                Ig : @tahliyahtours
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.tiktok.com/@tahliyahtours"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-orange-400 transition-colors"
                            >
                                Tiktok : @tahliyahtours
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.facebook.com/tahliyahtours"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-orange-400 transition-colors"
                            >
                                Fb : tahliyahtours
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">Perusahaan</h4>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li>
                            <button onClick={() => scrollToSection("home")} className="hover:text-orange-400 transition-colors">
                                Tentang Kami
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => scrollToSection("guides")}
                                className="hover:text-orange-400 transition-colors"
                            >
                                Tim Pembimbing
                            </button>
                        </li>
                        <li>
                            <button onClick={() => scrollToSection("testimonials")} className="hover:text-orange-400 transition-colors">
                                Testimoni
                            </button>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">Lokasi</h4>
                    <p className="text-gray-500 text-sm">Transmart Buahbatu, Ruko Blok A20. Cipagalo, Kec.Bojongsoang Kabupaten Bandung</p>
                    <div className="mb-4 rounded-lg overflow-hidden border border-gray-700">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d990.0905733864488!2d107.6386073272461!3d-6.966517109694449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4c5bcd5ccd3e0b01%3A0x472de57d8839a7e4!2sTahliyah%20Tours%20%26%20Travel%20(%20PT.%20Mumtaaz%20Cahaya%20Abadi)!5e0!3m2!1sid!2sid!4v1756100758254!5m2!1sid!2sid"
                            width="100%"
                            height="120"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            sandbox="allow-same-origin allow-scripts allow-popups"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Lokasi Tahliyah Tours & Travel"
                        ></iframe>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-xs">
                <p>&copy; 2025 Tahliyah Tours & Travel. All rights reserved.</p>
            </div>
        </div>
    </footer>
);}
