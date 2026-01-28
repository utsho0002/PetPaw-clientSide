import React from "react";

const Blog = () => {
  // Dummy Data for Blog Posts
  const posts = [
    {
      id: 1,
      title: "5 Tips for Grooming Your Dog at Home",
      date: "Jan 24, 2026",
      desc: "Learn the basics of keeping your furry friend clean and happy without leaving the house.",
      img: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=2071&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Best Nutrition for Senior Cats",
      date: "Jan 20, 2026",
      desc: "As your cat ages, their dietary needs change. Here is what you need to know.",
      img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Understanding Your Pet's Body Language",
      date: "Jan 15, 2026",
      desc: "Is your dog happy or stressed? Learn to read the signs.",
      img: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=2069&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-base-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-2">Our Blog</h1>
            <p className="opacity-60">Latest news, tips, and tricks from the PawMart team.</p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
                <div key={post.id} className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-300">
                    <figure>
                        <img src={post.img} alt={post.title} className="h-48 w-full object-cover" />
                    </figure>
                    <div className="card-body">
                        <div className="badge badge-outline mb-2">{post.date}</div>
                        <h2 className="card-title">{post.title}</h2>
                        <p className="text-sm opacity-70">{post.desc}</p>
                       
                    </div>
                </div>
            ))}
        </div>

      </div>
    </div>
  );
};

export default Blog;