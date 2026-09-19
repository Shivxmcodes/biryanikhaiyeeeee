"use client"

import { useEffect, useState } from "react"
import { Star, MessageSquare, Quote, Loader2, Sparkles, Send } from "lucide-react"

type Review = {
  id: string
  rating: number
  comment: string
  customerName: string
  createdAt: string
}

export function RestaurantReviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    customerName: "",
    rating: 5,
    comment: ""
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/reviews')
      const data = await res.json()
      setReviews(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Failed to fetch reviews:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.comment) return

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        const newReview = await res.json()
        setReviews([newReview, ...reviews])
        setFormData({ ...formData, comment: "", rating: 5 })
      }
    } catch (error) {
      console.error("Failed to submit review:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative mt-8 rounded-[2rem] border border-white/10 bg-black/40 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden">
      {/* Decorative gradient backgrounds */}
      <div className="absolute top-0 -left-1/4 w-1/2 h-full bg-gradient-to-br from-amber-500/10 via-transparent to-transparent blur-3xl rounded-full" />
      <div className="absolute bottom-0 -right-1/4 w-1/2 h-full bg-gradient-to-tl from-emerald-500/10 via-transparent to-transparent blur-3xl rounded-full" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between border-b border-white/5 px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500">
              <Sparkles className="size-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white drop-shadow-sm">Customer Experiences</h2>
              <p className="text-sm font-medium text-white/50 mt-0.5">What our guests are saying</p>
            </div>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Form Section */}
          <div className="lg:col-span-4">
            <div className="rounded-[1.5rem] border border-white/5 bg-white/[0.02] p-6 shadow-inner backdrop-blur-md transition-all hover:bg-white/[0.03]">
              <h3 className="font-semibold text-lg text-white mb-6 flex items-center gap-2">
                <MessageSquare className="size-4 text-emerald-400" /> Share your experience
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-white/50">Your Name (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. John Doe"
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white placeholder:text-white/20 transition-colors focus:border-amber-500/50 focus:bg-black/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                    value={formData.customerName}
                    onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-white/50">Rating</label>
                  <div className="flex gap-2 p-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="group relative focus:outline-none transition-transform hover:scale-110 active:scale-95"
                      >
                        <Star 
                          className={`size-7 transition-all duration-300 ${
                            star <= formData.rating 
                              ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]' 
                              : 'fill-transparent text-white/10'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-white/50">Your Thoughts</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about the food, service, and atmosphere..."
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/20 transition-colors focus:border-amber-500/50 focus:bg-black/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50 resize-none"
                    value={formData.comment}
                    onChange={e => setFormData({ ...formData, comment: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !formData.comment}
                  className="group relative w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-3 text-sm font-bold text-white shadow-lg transition-all hover:from-amber-400 hover:to-amber-500 hover:shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <>Submit Feedback <Send className="size-4 transition-transform group-hover:translate-x-1" /></>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Reviews Grid Section */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between px-1">
              <span className="text-sm font-medium text-white/60">Recent Reviews</span>
              <span className="text-xs font-semibold tracking-wider text-amber-500/80 uppercase">{reviews.length} total</span>
            </div>
            
            <div className="max-h-[460px] overflow-y-auto pr-3 custom-scrollbar space-y-4 pb-4">
              {isLoading ? (
                <div className="flex justify-center py-20">
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 className="size-8 animate-spin text-amber-500" />
                    <span className="text-sm font-medium text-white/40">Loading experiences...</span>
                  </div>
                </div>
              ) : reviews.length === 0 ? (
                <div className="text-center py-20 rounded-[1.5rem] border border-dashed border-white/10 bg-white/[0.01]">
                  <Quote className="size-10 text-white/10 mx-auto mb-3" />
                  <p className="text-base font-medium text-white/50">No reviews yet</p>
                  <p className="text-sm text-white/30 mt-1">Be the very first to share your thoughts!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reviews.map((review, i) => (
                    <div 
                      key={review.id} 
                      className="group relative rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-5 shadow-sm transition-all duration-300 hover:border-amber-500/30 hover:bg-white/[0.05] hover:shadow-[0_8px_30px_rgba(251,191,36,0.05)] hover:-translate-y-1"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <Quote className="absolute top-4 right-4 size-16 text-white/[0.02] transition-colors group-hover:text-amber-500/5 -rotate-6" />
                      
                      <div className="relative z-10 flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-full bg-gradient-to-br from-amber-500/20 to-emerald-500/20 flex items-center justify-center text-amber-400 font-bold shadow-inner ring-1 ring-white/10">
                            {(review.customerName || 'A').charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white/90 group-hover:text-amber-400 transition-colors">
                              {review.customerName || 'Anonymous'}
                            </h4>
                            <p className="text-xs font-medium text-white/40">
                              {new Date(review.createdAt).toLocaleDateString(undefined, { 
                                month: 'short', day: 'numeric', year: 'numeric' 
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-0.5 mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star}
                            className={`size-3.5 ${star <= review.rating ? 'fill-amber-400 text-amber-400' : 'fill-white/5 text-white/10'}`}
                          />
                        ))}
                      </div>
                      
                      <p className="text-sm leading-relaxed text-white/70 font-medium">"{review.comment}"</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
