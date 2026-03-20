import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FiSearch, FiFilter } from 'react-icons/fi'
import supabase from '../lib/supabase'
import ArticleCard from '../components/ArticleCard'

const ArticlesPage = () => {
  const [articles, setArticles] = useState([])
  const [filteredArticles, setFilteredArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [showTags, setShowTags] = useState(false) // Filter dropdown toggle

  // English Tags
  const tags = [
    'React', 'JavaScript', 'CSS', 'Tailwind', 'Web Development',
    'Backend', 'Frontend', 'UI Design', 'Performance', 'Supabase',
    'Real-time', 'API', 'Testing', 'TypeScript', 'Future Tech'
  ]

  useEffect(() => {
    fetchArticles()
  }, [])

  useEffect(() => {
    const filtered = articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredArticles(filtered)
  }, [searchTerm, articles])

  const fetchArticles = async () => {
    try {
      setLoading(true)
      // Waan ka saaray comment_count halkan si uusan qalad u bixin
      const { data, error } = await supabase
        .from('articles')
        .select(`*, author:author_id (username, avatar_url)`)
        .eq('published', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      setArticles(data || [])
      setFilteredArticles(data || [])
    } catch (error) {
      toast.error('Failed to load articles')
    } finally {
      setLoading(false)
    }
  }

  // Shaqada sifeynta Tags-ka (Filtering Logic)
  const handleTagFilter = (tag) => {
    const filtered = articles.filter(article =>
      article.tags && article.tags.includes(tag)
    )
    setFilteredArticles(filtered)
    setShowTags(false)
  }

  return (
    <div className="min-h-screen bg-[#FFF8F1]">
      <div className="bg-[#FF6B00] pt-20 pb-32 px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          Explore Articles
        </h1>
        <p className="text-white/90 text-lg">
          Discover insights, tutorials, and stories from our community
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-10 relative">
        <div className="bg-white p-3 rounded-2xl shadow-lg flex items-center gap-4 border border-gray-100">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-blue-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            onClick={() => setShowTags(!showTags)}
            className="flex items-center gap-2 px-6 py-4 text-gray-600 font-medium hover:bg-gray-50 rounded-xl transition-colors border-l border-gray-100"
          >
            <FiFilter className="text-orange-500" />
            <span>Filter by Tags</span>
          </button>
        </div>

        {/* Tags Dropdown Menu - English Labels */}
        {showTags && (
          <div className="absolute right-0 mt-3 w-full max-w-md bg-white rounded-2xl shadow-xl p-6 border border-gray-100 z-50">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h3 className="font-bold text-gray-800">Categories</h3>
              <button
                onClick={() => { setFilteredArticles(articles); setShowTags(false); }}
                className="text-xs text-orange-600 font-bold hover:underline"
              >
                Show All
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagFilter(tag)}
                  className="text-[11px] font-medium py-2 px-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-orange-500 hover:text-white transition-all border border-gray-100 text-left"
                >
                  # {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}

        {!loading && filteredArticles.length === 0 && (
          <div className="text-center text-gray-500 py-20 text-xl">
            No articles found.
          </div>
        )}
      </div>
    </div>
  )
}

export default ArticlesPage