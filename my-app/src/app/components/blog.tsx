'use client';
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, User, ArrowRight, BookOpen } from 'lucide-react';
import ApiService from '@/services/api';
import type { Article } from '@/types';

// Fallback data used when no articles exist in DB
const fallbackPosts = [
  { id: '1', title: 'Understanding Anxiety in Modern Life', summary: 'Explore effective strategies to manage anxiety and build resilience in today\'s fast-paced world.', author: 'Dr. Sarah Johnson', category: 'anxiety', readTime: 5, createdAt: '2025-09-10' },
  { id: '2', title: 'The Power of Mindfulness Meditation', summary: 'Discover how mindfulness practices can transform your mental wellbeing and daily life.', author: 'Dr. Michael Chen', category: 'mindfulness', readTime: 8, createdAt: '2025-09-08' },
  { id: '3', title: 'Building Healthy Relationships', summary: 'Learn the foundations of creating and maintaining meaningful connections with others.', author: 'Dr. Emily Rodriguez', category: 'relationships', readTime: 6, createdAt: '2025-09-05' },
  { id: '4', title: 'Coping with Depression', summary: 'Understanding depression and practical steps toward healing and recovery.', author: 'Dr. James Wilson', category: 'depression', readTime: 7, createdAt: '2025-09-03' },
  { id: '5', title: 'Stress Management Techniques', summary: 'Effective methods to reduce stress and improve your overall quality of life.', author: 'Dr. Lisa Thompson', category: 'stress', readTime: 5, createdAt: '2025-09-01' },
  { id: '6', title: 'Sleep and Mental Health', summary: 'The crucial connection between quality sleep and psychological wellbeing.', author: 'Dr. Robert Kim', category: 'self-care', readTime: 6, createdAt: '2025-08-29' },
];

const MentalHealthBlog: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [posts, setPosts] = useState(fallbackPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await ApiService.getArticles({ limit: 6 });
        if (res.success && res.data && res.data.length > 0) {
          setPosts(res.data.map((a: Article) => ({
            id: a._id,
            title: a.title,
            summary: a.summary || a.content.substring(0, 150) + '...',
            author: a.author,
            category: a.category,
            readTime: a.readTime,
            createdAt: a.createdAt,
          })));
        }
      } catch {
        // Use fallback data
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(posts.length / itemsPerPage);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % totalPages);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);

  const getCurrentPosts = () => {
    const start = currentIndex * itemsPerPage;
    return posts.slice(start, start + itemsPerPage);
  };

  return (
    <div className="min-h-screen bg-[#D5FFE3]">
      {/* Header */}
      <div className="text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-[#16320d] mb-8">
          Empowering Minds: Our Mental Health Resources
        </h1>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <button onClick={prevSlide} aria-label="Previous blog posts" className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-green-50">
            <ChevronLeft className="w-6 h-6 text-green-600" />
          </button>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <div key={index} className={`w-4 h-8 rounded transition-all duration-300 cursor-pointer ${index === currentIndex ? 'bg-green-600 w-6' : 'bg-gray-300 hover:bg-green-300'}`} onClick={() => setCurrentIndex(index)} />
            ))}
          </div>
          <button onClick={nextSlide} aria-label="Next blog posts" className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-green-50">
            <ChevronRight className="w-6 h-6 text-green-600" />
          </button>
        </div>
      </div>

      {/* Blog Cards */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-xl mb-4" />
                <div className="h-6 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getCurrentPosts().map((post, index) => (
              <div key={post.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="relative w-full h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-white opacity-50" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white bg-opacity-90 text-green-700 text-sm font-semibold rounded-full capitalize">{post.category}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-700 transition-colors">{post.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2">{post.summary}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2"><User className="w-4 h-4" /><span>{post.author}</span></div>
                    <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /><span>{new Date(post.createdAt).toLocaleDateString()}</span></div>
                  </div>
                  <a href="/pages/resources" className="group/btn w-full flex items-center justify-center gap-2 py-3 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all">
                    Read More <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MentalHealthBlog;
