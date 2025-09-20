import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { 
  FaSearch, 
  FaCalendarAlt, 
  FaUser, 
  FaTag, 
  FaArrowRight, 
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaShare,
  FaBookmark,
  FaEye,
  FaComment
} from "react-icons/fa";

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const postsPerPage = 6;

  const categories = [
    { id: "all", name: "All Posts", count: 24 },
    { id: "sustainability", name: "Sustainability", count: 8 },
    { id: "technology", name: "Technology", count: 6 },
    { id: "safety", name: "Safety", count: 5 },
    { id: "urban-mobility", name: "Urban Mobility", count: 5 }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "The Future of Urban Mobility: How E-Scooters Are Transforming Cities",
      excerpt: "Discover how electric scooters are revolutionizing urban transportation and creating more sustainable cities for future generations.",
      content: "Electric scooters have emerged as a game-changer in urban mobility, offering a clean, efficient, and fun way to navigate city streets...",
      author: "Sarah Johnson",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "urban-mobility",
      tags: ["urban mobility", "e-scooters", "sustainability"],
      image: "/api/placeholder/600/400",
      featured: true,
      views: 1250,
      comments: 23,
      likes: 89
    },
    {
      id: 2,
      title: "Safety First: Essential Tips for Safe E-Scooter Riding",
      excerpt: "Learn the most important safety guidelines to ensure a secure and enjoyable e-scooter experience.",
      content: "Safety should always be your top priority when riding an e-scooter. Here are the essential guidelines...",
      author: "Mike Chen",
      date: "2024-01-12",
      readTime: "4 min read",
      category: "safety",
      tags: ["safety", "tips", "guidelines"],
      image: "/api/placeholder/600/400",
      featured: false,
      views: 890,
      comments: 15,
      likes: 67
    },
    {
      id: 3,
      title: "Green Transportation: The Environmental Impact of E-Scooters",
      excerpt: "Explore how e-scooters contribute to reducing carbon emissions and creating greener urban environments.",
      content: "As cities worldwide grapple with pollution and climate change, e-scooters offer a promising solution...",
      author: "Emma Rodriguez",
      date: "2024-01-10",
      readTime: "6 min read",
      category: "sustainability",
      tags: ["environment", "carbon footprint", "green transport"],
      image: "/api/placeholder/600/400",
      featured: true,
      views: 2100,
      comments: 34,
      likes: 156
    },
    {
      id: 4,
      title: "Smart Technology in E-Scooters: GPS, IoT, and Beyond",
      excerpt: "Dive into the advanced technology that powers modern e-scooters and enhances the riding experience.",
      content: "Modern e-scooters are equipped with cutting-edge technology that makes them smarter and safer...",
      author: "David Park",
      date: "2024-01-08",
      readTime: "7 min read",
      category: "technology",
      tags: ["technology", "GPS", "IoT", "smart features"],
      image: "/api/placeholder/600/400",
      featured: false,
      views: 1450,
      comments: 28,
      likes: 112
    },
    {
      id: 5,
      title: "City Regulations and E-Scooter Laws: What You Need to Know",
      excerpt: "Stay informed about the latest regulations and legal requirements for e-scooter usage in your city.",
      content: "As e-scooters become more popular, cities are implementing regulations to ensure safe and responsible usage...",
      author: "Lisa Thompson",
      date: "2024-01-05",
      readTime: "5 min read",
      category: "safety",
      tags: ["regulations", "laws", "legal", "compliance"],
      image: "/api/placeholder/600/400",
      featured: false,
      views: 980,
      comments: 19,
      likes: 74
    },
    {
      id: 6,
      title: "Battery Technology: Powering the Future of E-Scooters",
      excerpt: "Learn about the latest advancements in battery technology that are making e-scooters more efficient and reliable.",
      content: "Battery technology is at the heart of e-scooter performance, and recent advancements are revolutionizing...",
      author: "Alex Kumar",
      date: "2024-01-03",
      readTime: "6 min read",
      category: "technology",
      tags: ["battery", "technology", "performance", "efficiency"],
      image: "/api/placeholder/600/400",
      featured: false,
      views: 1200,
      comments: 22,
      likes: 95
    },
    {
      id: 7,
      title: "Reducing Traffic Congestion: E-Scooters as a Solution",
      excerpt: "Discover how e-scooters are helping to alleviate traffic congestion in major cities worldwide.",
      content: "Traffic congestion is a major problem in urban areas, and e-scooters are proving to be an effective solution...",
      author: "Maria Garcia",
      date: "2024-01-01",
      readTime: "4 min read",
      category: "urban-mobility",
      tags: ["traffic", "congestion", "urban planning", "transportation"],
      image: "/api/placeholder/600/400",
      featured: false,
      views: 1100,
      comments: 17,
      likes: 83
    },
    {
      id: 8,
      title: "Sustainable Materials in E-Scooter Manufacturing",
      excerpt: "Explore how manufacturers are using eco-friendly materials to create more sustainable e-scooters.",
      content: "The e-scooter industry is increasingly focusing on sustainability, not just in operation but also in manufacturing...",
      author: "James Wilson",
      date: "2023-12-28",
      readTime: "5 min read",
      category: "sustainability",
      tags: ["sustainability", "manufacturing", "materials", "eco-friendly"],
      image: "/api/placeholder/600/400",
      featured: false,
      views: 950,
      comments: 14,
      likes: 68
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  const featuredPosts = blogPosts.filter(post => post.featured);
  const recentPosts = blogPosts.slice(0, 4);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      alert("Thank you for subscribing to our newsletter!");
      setNewsletterEmail("");
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Guzo Blog
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Discover the latest insights on urban mobility, sustainability, and e-scooter technology
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-md" />
                <input
                  type="text"
                  placeholder="Search articles, topics, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-black pl-12 pr-4 py-4 rounded-lg text-white text-lg focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Category Filter */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Posts */}
            {selectedCategory === "all" && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Featured Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {featuredPosts.map(post => (
                    <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white text-lg font-semibold">Featured Article</span>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                            {categories.find(cat => cat.id === post.category)?.name}
                          </span>
                          <span className="text-gray-500 text-sm">•</span>
                          <span className="text-gray-500 text-sm">{post.readTime}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <FaEye /> {post.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <FaComment /> {post.comments}
                            </span>
                          </div>
                          <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
                            Read More <FaArrowRight className="text-xs" />
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* All Posts */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                {selectedCategory === "all" ? "All Articles" : categories.find(cat => cat.id === selectedCategory)?.name}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paginatedPosts.map(post => (
                  <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-40 bg-gradient-to-r from-gray-400 to-gray-600 flex items-center justify-center">
                      <span className="text-white font-semibold">Article Image</span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded">
                          {categories.find(cat => cat.id === post.category)?.name}
                        </span>
                        <span className="text-gray-500 text-sm">•</span>
                        <span className="text-gray-500 text-sm">{post.readTime}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <FaUser className="text-xs" />
                          <span>{post.author}</span>
                          <span>•</span>
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
                          Read More <FaArrowRight className="text-xs" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <FaChevronLeft />
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 rounded-lg ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <FaChevronRight />
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Newsletter Subscription */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-6 rounded-lg mb-8">
              <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
              <p className="text-blue-100 mb-4">
                Get the latest articles and insights delivered to your inbox.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-black px-4 py-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-white text-blue-600 font-semibold py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                >
                  <FaEnvelope />
                  Subscribe
                </button>
              </form>
            </div>

            {/* Recent Posts */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Posts</h3>
              <div className="space-y-4">
                {recentPosts.map(post => (
                  <div key={post.id} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 text-sm line-clamp-2 mb-1">
                        {post.title}
                      </h4>
                      <p className="text-gray-500 text-xs">
                        {new Date(post.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-100 text-blue-800'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{category.name}</span>
                      <span className="text-sm text-gray-500">({category.count})</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Follow Us</h3>
              <div className="flex gap-3">
                <button className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <FaFacebook />
                </button>
                <button className="w-10 h-10 bg-blue-400 text-white rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors">
                  <FaTwitter />
                </button>
                <button className="w-10 h-10 bg-blue-700 text-white rounded-lg flex items-center justify-center hover:bg-blue-800 transition-colors">
                  <FaLinkedin />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}