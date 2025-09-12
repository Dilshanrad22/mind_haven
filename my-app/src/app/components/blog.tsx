'use client'
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, User, ArrowRight } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  category: string;
}

const MentalHealthBlog: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sample blog data - in real app, this would come from database
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Understanding Anxiety in Modern Life",
      excerpt: "Explore effective strategies to manage anxiety and build resilience in today's fast-paced world.",
      author: "Dr. Sarah Johnson",
      date: "2025-09-10",
      image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=250&fit=crop",
      category: "Anxiety"
    },
    {
      id: 2,
      title: "The Power of Mindfulness Meditation",
      excerpt: "Discover how mindfulness practices can transform your mental wellbeing and daily life.",
      author: "Dr. Michael Chen",
      date: "2025-09-08",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
      category: "Mindfulness"
    },
    {
      id: 3,
      title: "Building Healthy Relationships",
      excerpt: "Learn the foundations of creating and maintaining meaningful connections with others.",
      author: "Dr. Emily Rodriguez",
      date: "2025-09-05",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=250&fit=crop",
      category: "Relationships"
    },
    {
      id: 4,
      title: "Coping with Depression",
      excerpt: "Understanding depression and practical steps toward healing and recovery.",
      author: "Dr. James Wilson",
      date: "2025-09-03",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
      category: "Depression"
    },
    {
      id: 5,
      title: "Stress Management Techniques",
      excerpt: "Effective methods to reduce stress and improve your overall quality of life.",
      author: "Dr. Lisa Thompson",
      date: "2025-09-01",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
      category: "Stress"
    },
    {
      id: 6,
      title: "Sleep and Mental Health",
      excerpt: "The crucial connection between quality sleep and psychological wellbeing.",
      author: "Dr. Robert Kim",
      date: "2025-08-29",
      image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=250&fit=crop",
      category: "Sleep"
    }
  ];

  const itemsPerPage = 3;
  const totalPages = Math.ceil(blogPosts.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const getCurrentPosts = () => {
    const start = currentIndex * itemsPerPage;
    return blogPosts.slice(start, start + itemsPerPage);
  };

  return (
    <div className="min-h-screen bg-[#D5FFE3] ">
      {/* Header */}
      <div className="text-center py-16 px-4 ml-9">
        <h1 className="text-5xl md:text-5xl font-bold text-[#16320d] mb-4">
          Empowering Minds Our Mental Health Consulting Services
        </h1>
        
          
        
        
        {/* Navigation Controls */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <button
            onClick={prevSlide}
            className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-green-50 group"
          >
            <ChevronLeft className="w-6 h-6 text-green-600 group-hover:text-green-700" />
          </button>
          
          {/* Page Indicators */}
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <div
                key={index}
                className={`w-4 h-8 rounded transition-all duration-300 cursor-pointer ${
                  index === currentIndex 
                    ? 'bg-green-600 w-6' 
                    : 'bg-gray-300 hover:bg-green-300'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
          
          <button
            onClick={nextSlide}
            className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-green-50 group"
          >
            <ChevronRight className="w-6 h-6 text-green-600 group-hover:text-green-700" />
          </button>
        </div>
      </div>

      {/* Blog Cards Container */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {getCurrentPosts().map((post, index) => (
            <div
              key={post.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
              style={{
                animationDelay: `${index * 150}ms`
              }}
            >
              {/* Green Rectangle Image */}
              <div className="relative overflow-hidden">
                <div className="w-full h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-110 transform transition-transform duration-700"
                  />
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white bg-opacity-90 text-green-700 text-sm font-semibold rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-700 transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                
                {/* Author and Date */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Read More Button */}
                <button className="group/btn w-full flex items-center justify-center gap-2 py-3 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105">
                  Read More
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Animation Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-green-300 rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: '4s'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MentalHealthBlog;