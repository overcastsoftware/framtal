"use client";

import Navigation from '../components/Navigation';

export default function Services() {
  const services = [
    {
      id: 1,
      title: 'Web Development',
      description: 'Custom websites and web applications built with the latest technologies.',
      icon: '💻'
    },
    {
      id: 2,
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      icon: '📱'
    },
    {
      id: 3,
      title: 'UI/UX Design',
      description: 'Beautiful and intuitive user interfaces designed with the user in mind.',
      icon: '🎨'
    },
    {
      id: 4,
      title: 'Consulting',
      description: 'Expert advice on technology strategy and implementation.',
      icon: '🤝'
    }
  ];

  return (
    <div className="min-h-screen p-8 sm:p-20">
      <Navigation />
      <main className="max-w-4xl mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-6">Our Services</h1>
        <p className="mb-8 text-lg">
          Explore our range of professional services designed to help your business succeed in the digital world.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div key={service.id} className="border p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h2 className="text-xl font-bold mb-2">{service.title}</h2>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}