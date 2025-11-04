import ImageLightbox from '@/components/ImageLightbox';
import ScrollingMarquee from '@/components/ScrollingMarquee';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { api, API_ENDPOINTS } from '@/config/api';
import { motion } from 'framer-motion';
import { Flame, Search, Star, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('Degs');
  const [categories, setCategories] = useState(['All']);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
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
        price: item.price === 'WhatsApp' || isNaN(parseFloat(item.price)) ? 'WhatsApp' : parseFloat(item.price),
        description: item.description || '',
        spiceLevel: 2, // Default spice level
        popular: item.is_popular === 1,
        chefsPick: item.is_chefs_pick === 1,
        image: item.image_url,
        is_available: item.is_available === 1
      })).filter(item => item.is_available)); // Only show available items
      
      // Set categories in proper order (Degs first)
      const sortedCategories = categoriesData.sort((a, b) => a.display_order - b.display_order);
      const categoryNames = sortedCategories.map(cat => cat.name);
      setCategories(['All', ...categoryNames]);
      
      // Always set default active category to 'Degs' if it exists
      if (categoryNames.includes('Degs')) {
        setActiveCategory('Degs');
      }
      
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
    // Use image from database (check both image and image_url for backward compatibility)
    if (item.image_url && item.image_url !== '') {
      const imagePath = `/images/${item.image_url}`;
      // Check if it's a valid image name (not empty or undefined)
      if (item.image_url.length > 0) {
        return imagePath;
      }
    }
    if (item.image && item.image !== '') {
      const imagePath = `/images/${item.image}`;
      if (item.image.length > 0) {
        return imagePath;
      }
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

      <ScrollingMarquee />

      <div className="pt-32 sm:pt-36 pb-12 sm:pb-16 bg-cream min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-forest mb-4">Our Menu</h1>
            <p className="text-lg sm:text-xl text-gray-600 px-4">Discover bold flavors crafted with passion</p>
          </motion.div>

          {/* Animated search bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="flex justify-center mb-6 sm:mb-8 px-4"
          >
              <motion.div
              className="relative w-full max-w-md sm:max-w-lg md:max-w-xl"
              // Only animate width to avoid adding a rectangle-like background (no scale/boxShadow)
              animate={(isSearchFocused || (searchQuery && searchQuery.trim() !== ''))
                ? { maxWidth: '520px' }
                : (autoExpanded ? { maxWidth: '520px' } : { maxWidth: '360px' })
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
                className="w-full pl-11 pr-10 py-3 text-sm rounded-full border border-gray-200 bg-white text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-0"
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
            className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 px-2"
          >
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setActiveCategory(category)}
                variant={activeCategory === category ? 'default' : 'outline'}
                className={`text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-2 ${
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-transparent hover:border-gold transition-all group"
              >
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden cursor-pointer" onClick={() => setLightboxImage({ src: getImageSrc(item), alt: item.name })}>
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={item.name}
                    src={getImageSrc(item)}
                    onError={(e) => {
                      e.target.src = '/images/logo_bgreen_-removebg-preview.png';
                    }}
                    loading="lazy"
                    decoding="async"
                    fetchpriority="low"
                    style={{ willChange: 'transform' }}
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    {item.popular && (
                      <span className="bg-[#F4F1E8] text-forest px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 border border-forest/20">
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

                {/* Different layouts for WhatsApp vs Regular Price */}
                {item.price === 'WhatsApp' || isNaN(parseFloat(item.price)) ? (
                  // WhatsApp Price Layout
                  <div className="p-4 sm:p-6 bg-gray-50">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-forest uppercase tracking-wide">
                        {highlightText(item.name, searchQuery)}
                      </h3>
                      
                      <div className="flex items-center gap-1 sm:gap-2">
                        <span className="text-lg sm:text-xl font-bold text-[#D32F2F]">Price:</span>
                        <a
                          href="https://wa.me/917433033031?text=Hi,%20I%20would%20like%20to%20know%20the%20price%20for%20this%20item"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 sm:gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-bold transition-colors text-sm sm:text-base"
                        >
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                          </svg>
                          <span>Contact</span>
                        </a>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{highlightText(item.description, searchQuery)}</p>
                  </div>
                ) : (
                  // Regular Price Layout
                  <div className="p-4 sm:p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-forest pr-2">{highlightText(item.name, searchQuery)}</h3>
                      <span className="text-lg sm:text-xl md:text-2xl font-bold text-gold whitespace-nowrap">₹{item.price.toFixed ? item.price.toFixed(2) : item.price}</span>
                    </div>

                    <p className="text-gray-600 mb-4 text-sm sm:text-base">{highlightText(item.description, searchQuery)}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {item.spiceLevel > 0 && getSpiceIndicator(item.spiceLevel)}
                        {item.spiceLevel === 0 && <span className="text-xs sm:text-sm text-gray-500">No spice</span>}
                      </div>
                    </div>
                  </div>
                )}
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