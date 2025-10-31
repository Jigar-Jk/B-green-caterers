import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Flame, Star, Plus, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/use-toast';
import ImageLightbox from '@/components/ImageLightbox';
import { api, API_ENDPOINTS } from '@/config/api';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [lightboxImage, setLightboxImage] = useState(null);

  // Highlight search terms in text
  const highlightText = (text, query) => {
    if (!query || !query.trim()) return text;
    
    const parts = text.split(new RegExp(`(${query.trim()})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) => 
          part.toLowerCase() === query.trim().toLowerCase() ? (
            <mark key={index} className="bg-yellow-300 text-forest font-semibold px-0.5 rounded">
              {part}
            </mark>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </span>
    );
  };

  // Fetch menu items and categories from API
  useEffect(() => {
    loadMenuData();
  }, []);

  const loadMenuData = async () => {
    try {
      setLoading(true);
      const [itemsData, categoriesData] = await Promise.all([
        api.get(API_ENDPOINTS.GET_MENU),
        api.get(API_ENDPOINTS.GET_CATEGORIES),
      ]);
      
      // Set menu items
      setMenuItems(itemsData.map(item => ({
        id: item.id,
        name: item.name,
        category: item.category_name,
        price: parseFloat(item.price),
        description: item.description || '',
        spiceLevel: 2, // Default spice level
        popular: item.is_popular === 1,
        chefsPick: item.is_chefs_pick === 1,
        image: item.image_url,
        is_available: item.is_available === 1
      })).filter(item => item.is_available)); // Only show available items
      
      // Set categories
      const categoryNames = categoriesData.map(cat => cat.name);
      setCategories(['All', ...categoryNames]);
      
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load menu items',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Old hardcoded data removed
  const oldMenuItems = [
    {
      id: 1,
      name: 'Tandoori Chicken',
      category: 'Chicken',
      price: 250,
      description: 'Marinated in yogurt and spices, grilled to perfection',
      spiceLevel: 3,
      popular: true,
      image: 'Juicy tandoori chicken with charred edges and vibrant red marinade'
    },
    {
      id: 2,
      name: 'Mutton Biryani',
      category: 'Mutton',
      price: 300,
      description: 'Aromatic basmati rice with tender mutton pieces',
      spiceLevel: 2,
      chefsPick: true,
      image: 'Fragrant mutton biryani with saffron rice and tender meat pieces in a traditional pot'
    },
    {
      id: 3,
      name: 'Grilled Prawns',
      category: 'Seafood',
      price: 280,
      description: 'Fresh prawns marinated with herbs and grilled',
      spiceLevel: 2,
      popular: true,
      image: 'Succulent grilled prawns with lemon wedges and fresh herbs on a white plate'
    },
    {
      id: 4,
      name: 'Chicken Tikka',
      category: 'Starters',
      price: 220,
      description: 'Boneless chicken chunks in spicy marinade',
      spiceLevel: 3,
      image: 'Colorful chicken tikka skewers with bell peppers and onions'
    },
    {
      id: 5,
      name: 'Fish Curry',
      category: 'Seafood',
      price: 230,
      description: 'Fresh fish in coconut-based curry sauce',
      spiceLevel: 2,
      image: 'Rich fish curry with coconut milk and aromatic spices in a traditional bowl'
    },
    {
      id: 6,
      name: 'Mutton Seekh Kebab',
      category: 'Mutton',
      price: 260,
      description: 'Minced mutton with spices, grilled on skewers',
      spiceLevel: 3,
      chefsPick: true,
      image: 'Golden brown seekh kebabs on skewers with mint chutney'
    },
    {
      id: 7,
      name: 'Chicken Wings',
      category: 'Starters',
      price: 200,
      description: 'Crispy wings tossed in special sauce',
      spiceLevel: 2,
      popular: true,
      image: 'Crispy chicken wings with spicy glaze and sesame seeds'
    },
    {
      id: 8,
      name: 'Seafood Platter',
      category: 'Combos',
      price: 300,
      description: 'Assorted seafood with sides',
      spiceLevel: 2,
      chefsPick: true,
      image: 'Luxurious seafood platter with prawns, fish, and calamari on ice'
    },
    {
      id: 9,
      name: 'Gulab Jamun',
      category: 'Desserts',
      price: 200,
      description: 'Sweet dumplings in rose-flavored syrup',
      spiceLevel: 0,
      image: 'Golden gulab jamun balls in sweet syrup garnished with pistachios'
    },
    {
      id: 10,
      name: 'Butter Chicken',
      category: 'Chicken',
      price: 270,
      description: 'Creamy tomato-based curry with tender chicken',
      spiceLevel: 1,
      popular: true,
      image: 'Creamy butter chicken in rich tomato gravy with naan bread'
    },
    {
      id: 11,
      name: 'Lamb Chops',
      category: 'Mutton',
      price: 290,
      description: 'Premium lamb chops grilled with herbs',
      spiceLevel: 2,
      chefsPick: true,
      image: 'Perfectly grilled lamb chops with rosemary and garlic'
    },
    {
      id: 12,
      name: 'Kheer',
      category: 'Desserts',
      price: 200,
      description: 'Traditional rice pudding with cardamom',
      spiceLevel: 0,
      image: 'Creamy rice pudding topped with nuts and saffron strands'
    }
  ];

  // Map menu item IDs to images stored in public/images
  const publicImageMap = {
    1: 'DSC_0548.JPG', // Tandoori Chicken
    2: 'DSC_0450.JPG', // Mutton Biryani
    3: 'IMG_20240317_180326858.jpg', // Grilled Prawns
    4: 'IMG_20240317_180050763.jpg', // Chicken Tikka
    5: 'IMG_20240318_174053677_HDR.jpg', // Fish Curry
    6: 'DSC_0428.JPG', // Mutton Seekh Kebab
    7: 'IMG_20240319_173008270_HDR.jpg', // Chicken Wings
    8: 'IMG_20240314_175426288_HDR.jpg', // Seafood Platter
    9: '02 Tava Fry Menu.jpg', // Gulab Jamun (placeholder)
    10: 'DSC_0083.JPG', // Butter Chicken
    11: 'IMG_20240317_180326858.jpg', // Lamb Chops (reuse)
    12: 'logo_bgreen_-removebg-preview.png', // Kheer (placeholder)
  };

  const getImageSrc = (item) => {
    // Use image from database
    if (item.image) {
      return `/images/${item.image}`;
    }
    // Fallback to old mapping for backward compatibility
    const filename = publicImageMap[item.id];
    if (filename) return encodeURI(`/images/${filename}`);
    // Final fallback
    return '/images/logo_bgreen_-removebg-preview.png';
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [autoExpanded, setAutoExpanded] = useState(false);
  const autoRef = useRef(null);

  // Auto-loop expand/collapse when search is idle (not focused and empty)
  useEffect(() => {
    // If user is interacting or there's a query, stop auto-loop and keep expanded
    if (isSearchFocused || (searchQuery && searchQuery.trim() !== '')) {
      if (autoRef.current) {
        clearInterval(autoRef.current);
        autoRef.current = null;
      }
      setAutoExpanded(true);
      return;
    }

    // Start looping: toggle expanded state every 1.8s
    setAutoExpanded(false);
    autoRef.current = setInterval(() => {
      setAutoExpanded((v) => !v);
    }, 1800);

    return () => {
      if (autoRef.current) {
        clearInterval(autoRef.current);
        autoRef.current = null;
      }
    };
  }, [isSearchFocused, searchQuery]);

  // Filter by category first, then by search query (name/description/category)
  let filteredItems = menuItems.filter(item => activeCategory === 'All' || item.category === activeCategory);
  if (searchQuery && searchQuery.trim() !== '') {
    const q = searchQuery.trim().toLowerCase();
    filteredItems = filteredItems.filter(item => (
      (item.name || '') + ' ' + (item.description || '') + ' ' + (item.category || '')
    ).toLowerCase().includes(q));
  }

  const handleAddToCart = (item) => {
    addToCart(item);
    toast({
      title: "Added to cart!",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const getSpiceIndicator = (level) => {
    return Array(level).fill(0).map((_, i) => (
      <Flame key={i} className="w-4 h-4 text-red-500 fill-red-500" />
    ));
  };

  return (
    <>
      <Helmet>
        <title>Menu -B Green caterers | Explore Our Premium Non-Veg Dishes</title>
        <meta name="description" content="Browse our extensive menu of premium non-veg dishes including tandoori, biryani, seafood, and more. Fresh ingredients, bold flavors." />
      </Helmet>

      <div className="pt-24 pb-16 bg-cream min-h-screen">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-forest mb-4">Our Menu</h1>
            <p className="text-xl text-gray-600">Discover bold flavors crafted with passion</p>
          </motion.div>

          {/* Animated search bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="flex justify-center mb-8 px-4"
          >
              <motion.div
              className="relative mx-auto"
              style={{ width: '360px' }}
              // Only animate width to avoid adding a rectangle-like background (no scale/boxShadow)
              animate={(isSearchFocused || (searchQuery && searchQuery.trim() !== ''))
                ? { width: '520px' }
                : (autoExpanded ? { width: '520px' } : { width: '360px' })
              }
              transition={{ type: 'spring', stiffness: 300, damping: 25, duration: 0.25 }}
            >
              {/* left search icon */}
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <Search className="w-5 h-5" />
              </div>

              <motion.input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Search dishes, e.g. biryani, tandoori, prawns..."
                aria-label="Search menu items"
                className="w-full pl-11 pr-10 py-2 text-sm rounded-full border border-gray-200 bg-white text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-0"
              />

              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-forest"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : null}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setActiveCategory(category)}
                variant={activeCategory === category ? 'default' : 'outline'}
                className={`${
                  activeCategory === category
                    ? 'bg-forest text-white hover:bg-forest/90'
                    : 'border-forest text-forest hover:bg-forest hover:text-white'
                } transition-all transform hover:scale-105`}
              >
                {category}
              </Button>
            ))}
          </motion.div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-forest mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading menu...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-12 col-span-full">
              <p className="text-gray-600 text-lg">
                {searchQuery ? 'No items found matching your search.' : 'No menu items available.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-transparent hover:border-gold transition-all group"
              >
                <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => setLightboxImage({ src: getImageSrc(item), alt: item.name })}>
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={item.name}
                    src={getImageSrc(item)}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    style={{ willChange: 'transform' }}
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    {item.popular && (
                      <span className="bg-gold text-forest px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                        <Star className="w-4 h-4 fill-forest" /> Popular
                      </span>
                    )}
                    {item.chefsPick && (
                      <span className="bg-forest text-gold px-3 py-1 rounded-full text-sm font-semibold">
                        Chef's Pick
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold text-forest">{highlightText(item.name, searchQuery)}</h3>
                    <span className="text-2xl font-bold text-gold">₹{item.price.toFixed ? item.price.toFixed(2) : item.price}</span>
                  </div>

                  <p className="text-gray-600 mb-4">{highlightText(item.description, searchQuery)}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {item.spiceLevel > 0 && getSpiceIndicator(item.spiceLevel)}
                      {item.spiceLevel === 0 && <span className="text-sm text-gray-500">No spice</span>}
                    </div>

                    <Button
                      onClick={() => handleAddToCart(item)}
                      className="bg-forest text-white hover:bg-forest/90 transform hover:scale-105 transition-all"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Image Lightbox */}
      <ImageLightbox
        src={lightboxImage?.src}
        alt={lightboxImage?.alt}
        isOpen={!!lightboxImage}
        onClose={() => setLightboxImage(null)}
      />
    </>
  );
};

export default Menu;