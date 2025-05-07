"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navigation from '../../components/Navigation';

export default function BlogPost() {
  const params = useParams();
  const postId = params.id as string;

  // In a real application, you would fetch the post data from an API based on the ID
  // This is just example data
  const blogPosts = {
    '1': {
      title: 'Getting Started with Next.js',
      date: 'May 1, 2025',
      readTime: '5 min read',
      content: `
        <p>Next.js is a powerful React framework that makes building web applications simple and efficient. In this post, we'll explore the basics of setting up your first Next.js project.</p>
        
        <h2>Installation</h2>
        <p>To create a new Next.js app, run the following command:</p>
        <pre><code>npx create-next-app@latest my-next-app</code></pre>
        
        <h2>App Structure</h2>
        <p>Next.js provides a file-based routing system. Each file in the pages directory automatically becomes a route.</p>
        
        <h2>Components</h2>
        <p>React components are the building blocks of your Next.js application. You can create reusable components and import them into your pages.</p>
        
        <h2>Conclusion</h2>
        <p>With these basics, you're ready to start building your Next.js application. The framework provides many more features like API routes, static site generation, and server-side rendering.</p>
      `
    },
    '2': {
      title: 'Understanding the App Router',
      date: 'May 3, 2025',
      readTime: '7 min read',
      content: `
        <p>Next.js 13 introduced the App Router, a new routing system that builds on React's Server Components. Let's explore how it works.</p>
        
        <h2>File-Based Routing</h2>
        <p>The App Router uses a file-based routing system where each folder represents a route segment.</p>
        
        <h2>Layouts</h2>
        <p>With the layout.tsx file, you can create UI that is shared between multiple pages.</p>
        
        <h2>Loading States</h2>
        <p>The loading.tsx file allows you to create loading UI that is shown while content is being loaded.</p>
        
        <h2>Conclusion</h2>
        <p>The App Router makes building complex applications with nested layouts and loading states much simpler.</p>
      `
    },
    '3': {
      title: 'Server Components vs Client Components',
      date: 'May 5, 2025',
      readTime: '8 min read',
      content: `
        <p>React Server Components are a new concept introduced in Next.js 13. Let's understand how they differ from Client Components.</p>
        
        <h2>Server Components</h2>
        <p>Server Components run only on the server. They can access server resources directly and are not sent to the client.</p>
        
        <h2>Client Components</h2>
        <p>Client Components run on both the server and the client. They can use hooks, event listeners, and other client-side APIs.</p>
        
        <h2>When to Use Each</h2>
        <p>Use Server Components when you need to access server resources directly or want to reduce the JavaScript sent to the client. Use Client Components when you need interactivity.</p>
        
        <h2>Conclusion</h2>
        <p>Understanding the differences between Server and Client Components helps you optimize your Next.js application.</p>
      `
    },
    '4': {
      title: 'Data Fetching in Next.js',
      date: 'May 6, 2025',
      readTime: '6 min read',
      content: `
        <p>Next.js provides several ways to fetch data for your pages. Let's explore them.</p>
        
        <h2>Server-Side Rendering (SSR)</h2>
        <p>With getServerSideProps, you can fetch data on each request.</p>
        
        <h2>Static Site Generation (SSG)</h2>
        <p>With getStaticProps, you can fetch data at build time.</p>
        
        <h2>Incremental Static Regeneration (ISR)</h2>
        <p>With revalidate, you can update static pages after they've been built.</p>
        
        <h2>React Server Components</h2>
        <p>With React Server Components, you can fetch data directly in your components.</p>
        
        <h2>Conclusion</h2>
        <p>Next.js offers flexible data fetching options to suit different use cases.</p>
      `
    }
  };

  const post = blogPosts[postId];

  if (!post) {
    return (
      <div className="min-h-screen p-8 sm:p-20">
        <Navigation />
        <main className="max-w-4xl mx-auto mt-8 text-center">
          <h1 className="text-3xl font-bold mb-6">Blog Post Not Found</h1>
          <p>The blog post you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/blog" className="mt-4 inline-block text-blue-600 hover:underline">
            ← Back to all posts
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 sm:p-20">
      <Navigation />
      <main className="max-w-4xl mx-auto mt-8">
        <Link href="/blog" className="text-blue-600 hover:underline mb-8 inline-block">
          ← Back to all posts
        </Link>
        
        <article>
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <div className="flex text-sm text-gray-500 mb-8 space-x-4">
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>
          
          <div 
            className="prose lg:prose-xl max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </div>
  );
}