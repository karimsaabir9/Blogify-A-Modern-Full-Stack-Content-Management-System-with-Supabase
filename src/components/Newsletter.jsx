import React, { useState } from 'react'
import { FiSend } from 'react-icons/fi'
import toast from 'react-hot-toast'

const Newsletter = () => {
    const [email, setEmail] = useState('')

    const handleSubscribe = (e) => {
        e.preventDefault()
        if (!email) return toast.error('Please enter your email address')

        // Add your backend logic here (e.g., Supabase insert)
        toast.success('Thank you for subscribing!')
        setEmail('')
    }

    return (
        <section className="bg-orange-600 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-orange-500 rounded-3xl p-8 md:p-16 relative overflow-hidden shadow-2xl">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-orange-400 rounded-full opacity-50"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="max-w-xl text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Never Miss an Update!
                            </h2>
                            <p className="text-orange-100 text-lg">
                                Join our community of developers to receive the latest tutorials, insights, and technology news directly in your inbox.
                            </p>
                        </div>

                        <form onSubmit={handleSubscribe} className="w-full max-w-md flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email..."
                                className="flex-1 px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-900"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-black transition-all flex items-center justify-center gap-2"
                            >
                                Subscribe <FiSend />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Newsletter