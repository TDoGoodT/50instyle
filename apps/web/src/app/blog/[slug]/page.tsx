import { getBlogPost } from '@/lib/api'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const { data: post } = await getBlogPost(slug)
    return { title: post.titleHe, description: post.excerptHe ?? undefined }
  } catch { return {} }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  let post
  try {
    const res = await getBlogPost(slug)
    post = res.data
  } catch { notFound() }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-gold-600 hover:underline">
        <ArrowRight size={14} /> חזרה לבלוג
      </Link>

      <h1 className="font-frank mb-4 text-3xl font-bold text-charcoal md:text-4xl">{post.titleHe}</h1>

      {post.publishedAt && (
        <p className="mb-6 flex items-center gap-1.5 text-sm text-gray-400">
          <Calendar size={13} />
          {new Date(post.publishedAt).toLocaleDateString('he-IL')}
        </p>
      )}

      {post.coverImage && (
        <img src={post.coverImage} alt={post.titleHe} className="mb-8 w-full rounded-2xl object-cover max-h-80" />
      )}

      <div className="prose prose-lg max-w-none leading-relaxed text-gray-700">
        {post.contentHe.split('\n').map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </div>
  )
}
