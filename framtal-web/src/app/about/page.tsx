"use client";

import Navigation from '../components/Navigation';

export default function About() {
  return (
    <div className="min-h-screen p-8 sm:p-20">
      <Navigation />
      <main className="max-w-4xl mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-6">About Us</h1>
        
        <div className="prose lg:prose-xl">
          <p className="mb-4">
            Welcome to our About page. This is an example page created to demonstrate routing in Next.js 13+ with the App Router.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Our Story</h2>
          <p className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur
            euismod, nisi nisl consectetur nisi, euismod nisi nisl euismod nisi. Nullam euismod, nisi vel consectetur
            euismod, nisi nisl consectetur nisi, euismod nisi nisl euismod nisi.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
          <p className="mb-4">
            Nullam euismod, nisi vel consectetur euismod, nisi nisl consectetur nisi, euismod nisi nisl
            euismod nisi. Nullam euismod, nisi vel consectetur euismod, nisi nisl consectetur nisi, euismod nisi nisl
            euismod nisi.
          </p>
        </div>
      </main>
    </div>
  );
}