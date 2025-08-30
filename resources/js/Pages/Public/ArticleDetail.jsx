import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Calendar, User, Tag, ArrowLeft, Share2, Facebook, Twitter} from 'lucide-react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

export default function ArticleDetail({ artikel, otherArticles }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatDateShort = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
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

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareText = `${artikel.title} - ${artikel.excerpt}`;

    const handleShare = (platform) => {
        const encodedUrl = encodeURIComponent(shareUrl);
        const encodedText = encodeURIComponent(shareText);
        
        const shareUrls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
            Share2: `https://wa.me/?text=${encodedText} ${encodedUrl}`
        };
        
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    };

    return (
        <>
            <Head title={artikel.title} />
            
            <div className="min-h-screen bg-white">
                {/* Header */}
                <Navbar scrollToSection={scrollToSection} handleContactClick={handleContactClick} />
                
                {/* Hero Section */}
                <div className="relative">
                    {artikel.thumbnail && (
                        <div className="relative h-[70vh] overflow-hidden">
                            <img
                                src={`/storage/${artikel.thumbnail}`}
                                alt={artikel.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                        </div>
                    )}
                    
                    {/* Hero Content */}
                    <div className={`${artikel.thumbnail ? 'absolute inset-0 flex items-end' : 'pt-24 pb-12 bg-gradient-to-br from-orange-50 to-orange-100'}`}>
                        <div className="w-full px-4 sm:px-6 lg:px-8 pb-16">
                            <div className="max-w-6xl mx-auto">
                                {/* Back Button */}
                                <div className="mb-10">
                                    <Link
                                        href={route('public.articles')}
                                        className={`inline-flex items-center transition-all duration-200 px-4 py-2 rounded-full font-medium ${
                                            artikel.thumbnail 
                                                ? 'text-white/90 hover:text-white bg-white/20 backdrop-blur-sm hover:bg-white/30' 
                                                : 'text-orange-700 hover:text-orange-600 bg-white hover:bg-orange-50 shadow-sm border border-orange-200'
                                        }`}
                                    >
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Kembali ke Artikel
                                    </Link>
                                </div>

                                {/* Category Badge */}
                                <div className="mb-6">
                                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-orange-500 text-white shadow-lg">
                                        <Tag className="w-4 h-4 mr-2" />
                                        {artikel.category}
                                    </span>
                                </div>

                                {/* Title */}
                                <h1 className={`text-4xl md:text-6xl font-bold mb-6 leading-tight ${
                                    artikel.thumbnail ? 'text-white' : 'text-gray-900'
                                }`}>
                                    {artikel.title}
                                </h1>

                                {/* Meta Information */}
                                <div className="flex flex-wrap items-center space-x-6">
                                    <div className={`flex items-center px-4 py-2 rounded-full ${
                                        artikel.thumbnail 
                                            ? 'bg-white/20 backdrop-blur-sm text-white/90' 
                                            : 'bg-white shadow-sm text-gray-600 border border-gray-200'
                                    }`}>
                                        <User className="w-4 h-4 mr-2" />
                                        <span className="text-sm font-medium">
                                            {artikel.author?.name || 'Admin TAHLIYAH Tours'}
                                        </span>
                                    </div>
                                    <div className={`flex items-center px-4 py-2 rounded-full ${
                                        artikel.thumbnail 
                                            ? 'bg-white/20 backdrop-blur-sm text-white/90' 
                                            : 'bg-white shadow-sm text-gray-600 border border-gray-200'
                                    }`}>
                                        <Calendar className="w-4 h-4 mr-2" />
                                        <span className="text-sm">
                                            {formatDate(artikel.published_at || artikel.created_at)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Article Content */}
                <div className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                            {/* Main Article Content */}
                            <article className="lg:col-span-8">
                                {/* Excerpt */}
                                {artikel.excerpt && (
                                    <div className="mb-12">
                                        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-8 border-l-4 border-orange-500">
                                            <blockquote className="text-xl text-gray-700 font-light italic leading-relaxed">
                                                "{artikel.excerpt}"
                                            </blockquote>
                                        </div>
                                    </div>
                                )}

                                {/* Share Buttons */}
                                <div className="mb-12">
                                    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                        <div className="flex items-center space-x-4">
                                            <span className="text-gray-700 font-semibold flex items-center">
                                                <Share2 className="w-5 h-5 mr-3 text-orange-500" />
                                                Bagikan artikel ini:
                                            </span>
                                            <div className="flex space-x-3">
                                                <button
                                                    onClick={() => handleShare('facebook')}
                                                    className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-200 hover:scale-110 shadow-md"
                                                    title="Share on Facebook"
                                                >
                                                    <Facebook className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleShare('twitter')}
                                                    className="p-3 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-all duration-200 hover:scale-110 shadow-md"
                                                    title="Share on Twitter"
                                                >
                                                    <Twitter className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleShare('whatsapp')}
                                                    className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-200 hover:scale-110 shadow-md"
                                                    title="Share on WhatsApp"
                                                >
                                                    <Share2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Article Body - Enhanced Typography */}
                                <div className="prose prose-xl max-w-none mb-16">
                                    <div 
                                        className="text-gray-800 leading-loose text-lg space-y-6"
                                        style={{ 
                                            whiteSpace: 'pre-wrap',
                                            lineHeight: '1.8'
                                        }}
                                    >
                                        {artikel.content}
                                    </div>
                                </div>
                    </article>

                            {/* Modern Sidebar */}
                            <aside className="lg:col-span-4">
                                <div className="sticky top-24 space-y-8">
                                    {/* Other Articles Section */}
                                    <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
                                        <div className="flex items-center mb-8">
                                            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center mr-4 shadow-md">
                                                <Tag className="w-6 h-6 text-white" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900">
                                                Artikel Terkait
                                            </h3>
                                        </div>
                                        
                                        {otherArticles && otherArticles.length > 0 ? (
                                            <div className="space-y-6">
                                                {otherArticles.map((otherArticle, index) => (
                                                    <Link
                                                        key={otherArticle.id}
                                                        href={route('public.article.show', otherArticle.slug)}
                                                        className="block group"
                                                    >
                                                        <article className="bg-gray-50 hover:bg-orange-50 rounded-2xl p-4 transition-all duration-300 hover:shadow-md border border-transparent hover:border-orange-200">
                                                            <div className="flex space-x-4">
                                                                {otherArticle.thumbnail && (
                                                                    <div className="relative flex-shrink-0">
                                                                        <img
                                                                            src={`/storage/${otherArticle.thumbnail}`}
                                                                            alt={otherArticle.title}
                                                                            className="w-20 h-20 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                                                                        />
                                                                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md">
                                                                            {index + 1}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                <div className="flex-1 min-w-0">
                                                                    <h4 className="text-sm font-semibold text-gray-900 group-hover:text-orange-600 line-clamp-3 transition-colors duration-200 leading-tight mb-3">
                                                                        {otherArticle.title}
                                                                    </h4>
                                                                    <div className="flex items-center mb-2 text-xs text-gray-500">
                                                                        <Calendar className="w-3 h-3 mr-1" />
                                                                        <span>{formatDateShort(otherArticle.published_at || otherArticle.created_at)}</span>
                                                                    </div>
                                                                    <span className="inline-block text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium">
                                                                        {otherArticle.category}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </article>
                                                    </Link>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-8">
                                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <Tag className="w-8 h-8 text-gray-400" />
                                                </div>
                                                <p className="text-gray-500 text-sm">
                                                    Belum ada artikel lain yang tersedia.
                                                </p>
                                            </div>
                                        )}
                                        
                                        <div className="mt-8 pt-6 border-t border-gray-200">
                                            <Link
                                                href={route('public.articles')}
                                                className="block w-full text-center bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-105"
                                            >
                                                Lihat Semua Artikel
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Tips Card */}
                                    <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
                                        <div className="text-center">
                                            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                                                <Calendar className="w-8 h-8 text-white" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                                Tips Perjalanan
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-6">
                                                Dapatkan tips dan panduan terbaru untuk perjalanan haji dan umrah yang nyaman.
                                            </p>
                                            <Link
                                                href={route('public.articles')}
                                                className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold text-sm transition-colors duration-200"
                                            >
                                                Baca Tips Lainnya
                                                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <Footer />
            </div>
        </>
    );
}
