import { getBlogPosts } from '@/lib/api'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Calendar } from 'lucide-react'


export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'בלוג',
  description: 'טיפים לסטיילינג, אופנה, ועיצוב אישי מאת לימור בכר.',
}

export default async function BlogPage() {
  const { data: posts } = await getBlogPosts()

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="font-frank mb-4 text-4xl font-bold text-charcoal">בלוג</h1>
      <p className="mb-10 text-gray-600">טיפים, רעיונות, והשראה לסטיילינג יומיומי.</p>

      {posts.length === 0 ? (
        <p className="text-gray-400">אין פוסטים עדיין. חזרי בקרוב!</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {post.coverImage && (
                <img
                  src={post.coverImage}
                  alt={post.titleHe}
                  className="h-48 w-full object-cover"
                />
              )}
              <div className="p-6">
                <h2 className="font-frank mb-2 text-xl font-bold text-charcoal group-hover:text-gold-600 transition-colors">
                  {post.titleHe}
                </h2>
                {post.excerptHe && (
                  <p className="mb-3 text-sm leading-relaxed text-gray-600 line-clamp-2">
                    {post.excerptHe}
                  </p>
                )}
                {post.publishedAt && (
                  <p className="flex items-center gap-1 text-xs text-gray-400">
                    <Calendar size={12} />
                    {new Date(post.publishedAt).toLocaleDateString('he-IL')}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
