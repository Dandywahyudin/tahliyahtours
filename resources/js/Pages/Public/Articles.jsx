import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Calendar, User, Tag, ArrowRight, Search } from 'lucide-react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

export default function Articles({ articles }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleContactClick = () => {
        scrollToSection("contact");
    };

    return (
        <>
            <Head title="Artikel - TAHLIYAH Tours & Travel" />
            
            <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
                {/* Header */}
                <Navbar scrollToSection={scrollToSection} handleContactClick={handleContactClick} />
                
                {/* Hero Section */}
                <section
                    id="artikel"
                    className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-600 to-orange-800"
                >
                    <div className="max-w-7xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Artikel & Tips
                        </h1>
                        <p className="text-xl text-orange-100 max-w-3xl mx-auto">
                            Baca artikel dan tips berguna untuk persiapan ibadah haji dan umrah Anda
                        </p>
                    </div>
                </section>
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        {articles.data && articles.data.length > 0 ? (
                            <>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {articles.data.map((article) => (
                                        <article
                                            key={article.id}
                                            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
                                        >
                                            {/* Article Image */}
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

                                            {/* Article Content */}
                                            <div className="p-6">
                                                {/* Meta Information */}
                                                <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                                                    <div className="flex items-center">
                                                        <Calendar className="w-4 h-4 mr-1" />
                                                        <span>{formatDate(article.published_at || article.created_at)}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <User className="w-4 h-4 mr-1" />
                                                        <span>{article.author?.name || 'Admin'}</span>
                                                    </div>
                                                </div>

                                                {/* Article Title */}
                                                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-orange-600 transition-colors">
                                                    <Link href={route('public.article.show', article.slug)}>
                                                        {article.title}
                                                    </Link>
                                                </h3>

                                                {/* Article Excerpt */}
                                                <p className="text-gray-600 mb-4 line-clamp-3">
                                                    {article.excerpt}
                                                </p>

                                                {/* Read More Button */}
                                                <Link
                                                    href={route('public.article.show', article.slug)}
                                                    className="inline-flex items-center text-orange-600 hover:text-orange-800 font-semibold transition-colors duration-200"
                                                >
                                                    Baca Selengkapnya
                                                    <ArrowRight className="w-4 h-4 ml-2" />
                                                </Link>
                                            </div>
                                        </article>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {articles.links && (
                                    <div className="mt-12 flex justify-center">
                                        <div className="flex items-center space-x-2">
                                            {articles.links.map((link, index) => (
                                                <Link
                                                    key={index}
                                                    href={link.url || '#'}
                                                    className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                                                        link.active
                                                            ? 'bg-orange-600 text-white'
                                                            : link.url
                                                            ? 'bg-white text-orange-600 border border-orange-600 hover:bg-orange-600 hover:text-white'
                                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                    }`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-16">
                                <div className="mx-auto w-24 h-24 text-gray-400 mb-6">
                                    <Search className="w-full h-full" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-600 mb-4">
                                    Belum Ada Artikel
                                </h3>
                                <p className="text-gray-500 mb-8">
                                    Artikel akan ditampilkan di sini setelah dipublikasikan
                                </p>
                                <Link
                                    href={route('/')}
                                    className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors duration-200"
                                >
                                    Kembali ke Beranda
                                </Link>
                            </div>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <Footer />
            </div>
        </>
    );
}
