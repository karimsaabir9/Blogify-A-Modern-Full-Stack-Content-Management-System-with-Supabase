import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FiArrowRight, FiTrendingUp, FiClock } from 'react-icons/fi'
import { Link } from 'react-router'
import supabase from '../lib/supabase'
import ArticleCard from '../components/ArticleCard'
import Newsletter from '../components/Newsletter'

const HomePage = () => {
    const [featuredArticles, setFeaturedArticles] = useState([])
    const [latestArticles, setLatestArticles] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchArticles();
    }, [])

    const fetchArticles = async () => {
        try {
            setLoading(true)

            // 1. Fetch featured articles (Top 3)
            const { data: featured, error: featuredError } = await supabase
                .from('articles')
                .select(`*, author:author_id (username, avatar_url)`)
                .eq('published', true)
                .limit(3)

            if (featuredError) throw featuredError

            // 2. Fetch latest articles (Top 9)
            const { data: latest, error: latestError } = await supabase
                .from('articles')
                .select(`*, author:author_id (username, avatar_url)`)
                .eq('published', true)
                .order('created_at', { ascending: false })
                .limit(9)

            if (latestError) throw latestError

            setFeaturedArticles(featured || [])
            setLatestArticles(latest || [])
        } catch (error) {
            console.error('Error fetching articles:', error)
            toast.error('Failed to load articles')
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-orange-600 to-orange-400 overflow-hidden">
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Explore Fresh Perspectives
                        </h1>
                        <p className="text-xl md:text-2xl text-orange-100 max-w-2xl mx-auto mb-8">
                            Discover high-quality articles, in-depth tutorials, and inspiring stories from our global community.
                        </p>
                        <Link
                            to="/articles"
                            className="inline-flex items-center px-8 py-4 rounded-full bg-white text-orange-600 font-semibold hover:bg-orange-50 transition-colors duration-200 shadow-lg"
                        >
                            Browse All Articles
                            <FiArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Featured Articles Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center space-x-2">
                        <FiTrendingUp className="h-6 w-6 text-orange-500" />
                        <h2 className="text-3xl font-bold text-gray-900">Featured Stories</h2>
                    </div>
                    <Link to="/articles" className="text-orange-600 hover:text-orange-700 font-bold flex items-center group">
                        View All
                        <FiArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {featuredArticles.map(article => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>
            </div>

            {/* Newsletter Section */}
            <Newsletter />

            {/* Latest Articles Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="flex items-center space-x-2 mb-10">
                    <FiClock className="h-6 w-6 text-orange-500" />
                    <h2 className="text-3xl font-bold text-gray-900">Latest Updates</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {latestArticles.map(article => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Link
                        to="/articles"
                        className="inline-flex items-center px-10 py-4 border-2 border-gray-200 rounded-full text-gray-600 font-bold hover:border-orange-500 hover:text-orange-600 transition-all shadow-sm"
                    >
                        Load More Articles
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HomePage