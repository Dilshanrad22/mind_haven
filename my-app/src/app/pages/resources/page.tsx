'use client';
import { useState, useEffect } from 'react';
import { Search, Clock, Eye, BookOpen, FileText, ExternalLink, Download } from 'lucide-react';
import Navbar from '../../components/navbar';
import ApiService from '@/services/api';
import type { Article } from '@/types';

const categories = ['all', 'anxiety', 'depression', 'stress', 'relationships', 'self-care', 'mindfulness', 'general'];

const pdfResources = [
  {
    id: '9789241503648_eng',
    title: 'WHO Guidance on Mental Health and Psychosocial Support',
    file: '/blogs/9789241503648_eng.pdf',
  },
  {
    id: '9789241548069_eng',
    title: 'WHO Mental Health Policy and Service Guide',
    file: '/blogs/9789241548069_eng.pdf',
  },
  {
    id: 'adolescent-guidelines',
    title: 'Guidelines on Mental Health Interventions for Adolescents',
    file: '/blogs/guidelines-on-mental-health-promotive-and-preventive-interventions-for-adolescents-hat.pdf',
  },
  {
    id: 'children-young-people',
    title: 'Mental Health of Children and Young People Report',
    file: '/blogs/Mental_health_of_children_and_young_people_1737384104.pdf',
  },
  {
    id: 'sogiesc-study',
    title: 'Study Report: Mental Health and Well-being of Children and Youth with Diverse SOGIESC',
    file: '/blogs/PDF-Study-report-mental-health-and-well-being-of-childrean-and-youth-with-diverse-sogiesc-2023.pdf',
  },
];

export default function ResourcesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await ApiService.getArticles({
        category: activeCategory === 'all' ? undefined : activeCategory,
        search: search || undefined,
        limit: 20,
      });
      if (res.success && res.data) {
        setArticles(res.data);
      }
    } catch {
      console.error('Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchArticles();
  };

  const categoryColors: Record<string, string> = {
    anxiety: 'bg-purple-100 text-purple-700',
    depression: 'bg-blue-100 text-blue-700',
    stress: 'bg-orange-100 text-orange-700',
    relationships: 'bg-pink-100 text-pink-700',
    'self-care': 'bg-green-100 text-green-700',
    mindfulness: 'bg-teal-100 text-teal-700',
    general: 'bg-gray-100 text-gray-700',
  };

  return (
    <div className="min-h-screen bg-[#D5FFE3]">
      <Navbar />
      <section className="pt-24 pb-16 bg-gradient-to-br from-[#00610B] to-[#16320D] text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Mental Health Resources</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
            Expert-written articles and guides to support your mental wellness journey.
          </p>
          <form onSubmit={handleSearch} className="max-w-xl mx-auto relative">
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search articles..." className="w-full px-5 py-3 pl-12 rounded-full text-gray-800 outline-none" />
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
          </form>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-[#16320D] mb-4">PDF Resources</h2>
          <p className="text-gray-600 mb-5">Download or open research-backed mental health guides and reports.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pdfResources.map((pdf) => (
              <div key={pdf.id} className="bg-white border border-green-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-[#00610B]" />
                  </div>
                  <h3 className="font-semibold text-[#16320D] leading-snug">{pdf.title}</h3>
                </div>

                <div className="flex gap-2">
                  <a
                    href={pdf.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#00610B] text-white text-sm font-medium hover:bg-[#16320D] transition-colors"
                  >
                    Open <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href={pdf.file}
                    download
                    aria-label={`Download ${pdf.title}`}
                    title={`Download ${pdf.title}`}
                    className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${activeCategory === cat ? 'bg-[#00610B] text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border'}`}>
              {cat === 'all' ? 'All Topics' : cat.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Articles grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
                <div className="h-6 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-400 mb-2">No articles found</h3>
            <p className="text-gray-400">Check back soon for new content!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <div key={article._id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="h-40 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-[#00610B] opacity-50" />
                </div>
                <div className="p-5">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${categoryColors[article.category] || 'bg-gray-100 text-gray-700'}`}>
                    {article.category}
                  </span>
                  <h3 className="font-bold text-[#16320D] mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.summary}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime} min read</span>
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{article.views} views</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
