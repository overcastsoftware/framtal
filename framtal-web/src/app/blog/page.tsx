"use client";

import Link from 'next/link';
import Navigation from '../components/Navigation';

export default function Blog() {
  const blogPosts = [
    {
      id: '1',
      title: 'Getting Started with Next.js',
      excerpt: 'Learn the basics of Next.js and how to set up your first project.',
      date: 'May 1, 2025',
      readTime: '5 min read'
    },
    {
      id: '2',
      title: 'Understanding the App Router',
      excerpt: 'A deep dive into Next.js 13+ App Router and its features.',
      date: 'May 3, 2025',
      readTime: '7 min read'
    },
    {
      id: '3',
      title: 'Server Components vs Client Components',
      excerpt: 'When and how to use server and client components in Next.js.',
      date: 'May 5, 2025',
      readTime: '8 min read'
    },
    {
      id: '4',
      title: 'Data Fetching in Next.js',
      excerpt: 'Learn different ways to fetch data in a Next.js application.',
      date: 'May 6, 2025',
      readTime: '6 min read'
    }
  ];

  return (
    <div className="min-h-screen p-8 sm:p-20">
      <Navigation />
      <main className="max-w-4xl mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-6">Blog</h1>
        <p className="mb-8 text-lg">
          Read our latest articles and stay up to date with new technology trends.
        </p>
        
        <div className="space-y-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="border p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Link href={`/blog/${post.id}`} className="block">
                <h2 className="text-xl font-bold mb-2 text-blue-600 hover:underline">{post.title}</h2>
              </Link>
              <div className="flex text-sm text-gray-500 mb-3 space-x-4">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
              <p>{post.excerpt}</p>
              <Link href={`/blog/${post.id}`} className="mt-4 inline-block text-blue-600 hover:underline">
                Read more →
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}