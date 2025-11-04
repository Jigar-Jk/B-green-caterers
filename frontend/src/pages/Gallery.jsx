import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play, Volume2, VolumeX, Youtube } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';

const Gallery = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [carouselPaused, setCarouselPaused] = useState(false);
  const playerRef = useRef(null);
  const carouselIntervalRef = useRef(null);

  const API_KEY = 'AIzaSyCfMUKRuBAcHUwqW6n4K_o1exGG0SApyZc';

  useEffect(() => {
    fetchYouTubeVideos();
  }, []);

  // Auto-carousel effect
  useEffect(() => {
    if (videos.length > 0 && !carouselPaused && !isPlaying) {
      carouselIntervalRef.current = setInterval(() => {
        setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
      }, 5000);
    }

    return () => {
      if (carouselIntervalRef.current) {
        clearInterval(carouselIntervalRef.current);
      }
    };
  }, [videos.length, carouselPaused, isPlaying]);

  const fetchYouTubeVideos = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check cache first (1 hour expiry)
      const CACHE_KEY = 'bgreen_youtube_videos';
      const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds
      
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const { videos: cachedVideos, timestamp } = JSON.parse(cachedData);
        const now = Date.now();
        
        // Use cached data if less than 1 hour old
        if (now - timestamp < CACHE_DURATION) {
          console.log('Using cached videos');
          setVideos(cachedVideos);
          setLoading(false);
          return;
        }
      }

      const CHANNEL_HANDLE = 'bgreencaterers';
      
      // Step 1: Search for channel by handle
      const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${CHANNEL_HANDLE}&key=${API_KEY}`;
      const searchResponse = await fetch(searchUrl);
      
      if (!searchResponse.ok) {
        const errorData = await searchResponse.json();
        throw new Error(errorData.error?.message || 'Failed to search for channel');
      }
      
      const searchData = await searchResponse.json();
      
      if (!searchData.items || searchData.items.length === 0) {
        throw new Error('Channel not found');
      }
      
      const channelId = searchData.items[0].id.channelId;
      
      // Step 2: Get channel's uploads playlist ID
      const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${API_KEY}`;
      const channelResponse = await fetch(channelUrl);
      
      if (!channelResponse.ok) {
        const errorData = await channelResponse.json();
        throw new Error(errorData.error?.message || 'Failed to get channel details');
      }
      
      const channelData = await channelResponse.json();
      const uploadsPlaylistId = channelData.items[0]?.contentDetails?.relatedPlaylists?.uploads;
      
      if (!uploadsPlaylistId) {
        throw new Error('Could not find uploads playlist');
      }
      
      // Step 3: Get videos from uploads playlist
      const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=50&key=${API_KEY}`;
      const playlistResponse = await fetch(playlistUrl);
      
      if (!playlistResponse.ok) {
        const errorData = await playlistResponse.json();
        throw new Error(errorData.error?.message || 'Failed to fetch videos');
      }
      
      const playlistData = await playlistResponse.json();
      
      if (!playlistData.items || playlistData.items.length === 0) {
        throw new Error('No videos found in channel');
      }
      
      // Convert to consistent format
      const formattedVideos = playlistData.items.map(item => ({
        id: { videoId: item.snippet.resourceId.videoId },
        snippet: item.snippet
      }));
      
      // Save to cache
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        videos: formattedVideos,
        timestamp: Date.now()
      }));
      
      console.log('Fetched and cached fresh videos');
      setVideos(formattedVideos);
      setError(null);
      
    } catch (err) {
      console.error('Error fetching YouTube videos:', err);
      setError(err.message || 'Unable to load videos');
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    setCarouselPaused(!carouselPaused);
  };

  const handlePrevious = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
    setIsPlaying(false);
    setCarouselPaused(false);
  };

  const handleNext = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    setIsPlaying(false);
    setCarouselPaused(false);
  };

  const handleVideoSelect = (index) => {
    setCurrentVideoIndex(index);
    setIsPlaying(false);
    setCarouselPaused(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Video Gallery - B Green Caterers</title>
          <meta name="description" content="Watch our delicious cooking videos and recipes" />
        </Helmet>

        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
          <div className="text-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-forest border-t-transparent mx-auto mb-6"></div>
              <div className="absolute inset-0 rounded-full bg-forest/20 animate-pulse"></div>
            </div>
            <p className="text-forest text-xl font-semibold">Loading Cinema...</p>
          </div>
        </div>
      </>
    );
  }

  if (error || !videos.length) {
    return (
      <>
        <Helmet>
          <title>Video Gallery - B Green Caterers</title>
          <meta name="description" content="Watch our delicious cooking videos and recipes" />
        </Helmet>

        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
          <div className="text-center">
            <Youtube className="w-20 h-20 text-forest mx-auto mb-6" />
            <p className="text-red-400 text-xl mb-4">Unable to load videos</p>
            <p className="text-gray-300">Please try again later</p>
          </div>
        </div>
      </>
    );
  }

  const currentVideo = videos[currentVideoIndex];

  return (
    <>
      <Helmet>
        <title>Video Gallery - B Green Caterers</title>
        <meta name="description" content="Watch our delicious cooking videos and recipes" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pt-20 relative overflow-hidden">
        {/* Dark Cinema Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #0b5b2b 1px, transparent 1px),
                             radial-gradient(circle at 75% 75%, #2d8659 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        {/* Cinema Header */}
        <div className="text-center py-16 px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-forest via-light-green to-forest bg-clip-text text-transparent mb-6 tracking-wider">
              CINEMA
            </h1>
            <div className="text-3xl md:text-4xl font-light text-forest mb-4 tracking-widest">
              B GREEN CATERERS
            </div>
            <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-forest to-transparent mx-auto"></div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-400 font-light tracking-wide"
          >
            CULINARY EXPERIENCES IN MOTION
          </motion.p>
        </div>

        {/* Responsive Video Container */}
        <div className="max-w-5xl mx-auto px-4 py-6 relative z-10">
          <div className="relative">
            {/* Compact Cinema Frame */}
            <div className="bg-gradient-to-b from-gray-900/50 via-black/80 to-gray-900/50 p-4 md:p-6 lg:p-8 rounded-xl shadow-2xl border border-forest/30 relative overflow-hidden backdrop-blur-sm">
              {/* Responsive corner lights */}
              <div className="absolute top-3 left-3 md:top-4 md:left-4 w-2 h-2 md:w-3 md:h-3 bg-forest rounded-full shadow-lg shadow-forest/50 animate-pulse"></div>
              <div className="absolute top-3 right-3 md:top-4 md:right-4 w-2 h-2 md:w-3 md:h-3 bg-forest rounded-full shadow-lg shadow-forest/50 animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 w-2 h-2 md:w-3 md:h-3 bg-forest rounded-full shadow-lg shadow-forest/50 animate-pulse" style={{ animationDelay: '2s' }}></div>
              <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 w-2 h-2 md:w-3 md:h-3 bg-forest rounded-full shadow-lg shadow-forest/50 animate-pulse" style={{ animationDelay: '3s' }}></div>
              {/* Dark Cinema Screen */}
              <div className="relative bg-black rounded-xl overflow-hidden shadow-inner border border-forest/20" style={{ aspectRatio: '16/9' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentVideoIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    {isPlaying ? (
                      <iframe
                        ref={playerRef}
                        src={`https://www.youtube.com/embed/${currentVideo.id.videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=1&modestbranding=1&rel=0&showinfo=0`}
                        title={currentVideo.snippet.title}
                        className="w-full h-full"
                        style={{ border: 'none' }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div className="relative w-full h-full group cursor-pointer" onClick={handlePlayPause}>
                        <img
                          src={currentVideo.snippet.thumbnails.maxres?.url || currentVideo.snippet.thumbnails.high.url}
                          alt={currentVideo.snippet.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>

                        {/* Responsive Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-forest via-light-green to-forest hover:from-light-green hover:via-forest hover:to-light-green text-white p-4 md:p-6 lg:p-8 rounded-full shadow-2xl shadow-forest/50 backdrop-blur-sm border-2 border-forest/60 group-hover:scale-110 transition-all relative"
                          >
                            <Play className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 ml-1 md:ml-2" fill="currentColor" />
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-forest/20 to-transparent animate-pulse"></div>
                          </motion.div>
                        </div>

                        {/* Responsive Video Title Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 lg:p-6 bg-gradient-to-t from-black/90 to-transparent">
                          <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-white mb-1 md:mb-2 line-clamp-2">
                            {currentVideo.snippet.title}
                          </h2>
                          <p className="text-gray-300 text-xs md:text-sm lg:text-base line-clamp-2">
                            {currentVideo.snippet.description}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Responsive Navigation Controls */}
                <div className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2">
                  <motion.button
                    whileHover={{ scale: 1.1, x: -3 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePrevious}
                    className="bg-black/80 hover:bg-forest/80 text-forest hover:text-white p-2 md:p-3 lg:p-4 rounded-full backdrop-blur-sm border border-forest/40 shadow-xl shadow-forest/20 transition-all duration-300"
                  >
                    <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                  </motion.button>
                </div>

                <div className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2">
                  <motion.button
                    whileHover={{ scale: 1.1, x: 3 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNext}
                    className="bg-black/80 hover:bg-forest/80 text-forest hover:text-white p-2 md:p-3 lg:p-4 rounded-full backdrop-blur-sm border border-forest/40 shadow-xl shadow-forest/20 transition-all duration-300"
                  >
                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                  </motion.button>
                </div>

                {/* Responsive Top Controls */}
                {isPlaying && (
                  <div className="absolute top-2 right-2 md:top-4 md:right-4 flex space-x-1 md:space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={toggleMute}
                      className="bg-black/80 hover:bg-forest/80 text-forest hover:text-white p-2 md:p-3 rounded-full backdrop-blur-sm border border-forest/40 shadow-lg shadow-forest/20 transition-all duration-300"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 md:w-5 md:h-5" /> : <Volume2 className="w-4 h-4 md:w-5 md:h-5" />}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handlePlayPause}
                      className="bg-black/80 hover:bg-forest/80 text-forest hover:text-white p-2 md:p-3 rounded-full backdrop-blur-sm border border-forest/40 shadow-lg shadow-forest/20 transition-all duration-300"
                    >
                      <Pause className="w-4 h-4 md:w-5 md:h-5" />
                    </motion.button>
                  </div>
                )}
              </div>

              {/* Responsive Info Panel */}
              <div className="mt-6 md:mt-8 lg:mt-10 text-center">
                <div className="bg-gradient-to-r from-gray-900/80 via-black/90 to-gray-900/80 rounded-lg md:rounded-xl p-4 md:p-6 lg:p-8 border border-forest/30 backdrop-blur-sm shadow-xl shadow-forest/10">
                  <div className="mb-3 md:mb-4">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-forest via-light-green to-forest bg-clip-text text-transparent mb-2 tracking-wide">
                      NOW PLAYING
                    </h3>
                    <div className="w-16 md:w-20 h-0.5 bg-gradient-to-r from-transparent via-forest to-transparent mx-auto"></div>
                  </div>
                  <p className="text-white font-light text-base md:text-lg lg:text-xl line-clamp-1 mb-4 md:mb-6 tracking-wide">{currentVideo.snippet.title}</p>
                  <div className="flex items-center justify-center space-x-4 md:space-x-6 lg:space-x-8 text-xs md:text-sm text-gray-400">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-forest rounded-full animate-pulse"></div>
                      <span className="tracking-wider">
                        {new Date(currentVideo.snippet.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="w-1 h-1 bg-forest rounded-full"></div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-light-green rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                      <span className="tracking-wider">EPISODE {currentVideoIndex + 1} OF {videos.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Responsive Video Collection */}
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 lg:py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12 lg:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-forest via-light-green to-forest bg-clip-text text-transparent mb-4 md:mb-6 tracking-widest">
              COLLECTION
            </h2>
            <div className="w-24 md:w-32 h-0.5 bg-gradient-to-r from-transparent via-forest to-transparent mx-auto mb-4 md:mb-6"></div>
            <p className="text-gray-400 text-lg md:text-xl font-light tracking-wide">
              SELECT YOUR EXPERIENCE
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
            {videos.map((video, index) => (
              <motion.div
                key={video.id.videoId}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleVideoSelect(index)}
                className={`cursor-pointer transition-all duration-500 rounded-lg overflow-hidden relative backdrop-blur-sm ${index === currentVideoIndex
                  ? 'ring-2 ring-forest shadow-2xl shadow-forest/30 bg-gradient-to-b from-forest/20 via-black/80 to-forest/20 transform scale-105'
                  : 'ring-1 ring-gray-700 hover:ring-2 hover:ring-forest/60 bg-gradient-to-b from-gray-900/50 to-black/80 hover:shadow-xl hover:shadow-forest/20 hover:transform hover:scale-102'
                  }`}
              >
                <div className="relative aspect-video">
                  <img
                    src={video.snippet.thumbnails.medium.url}
                    alt={video.snippet.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                  {/* Dark Cinema Play Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-gradient-to-r from-forest to-light-green text-white p-3 rounded-full shadow-lg shadow-forest/50 backdrop-blur-sm">
                      <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                    </div>
                  </div>

                  {/* Current Playing Indicator */}
                  {index === currentVideoIndex && (
                    <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-gradient-to-r from-forest to-light-green text-white px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs font-bold shadow-lg shadow-forest/50 animate-pulse">
                      PLAYING
                    </div>
                  )}

                  {/* Episode Number Badge */}
                  <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-black/90 text-forest px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs font-bold backdrop-blur-sm border border-forest/30">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                <div className="p-2 md:p-3 lg:p-4">
                  <h3 className="text-xs md:text-sm font-medium text-white line-clamp-2 mb-1 md:mb-2 tracking-wide">
                    {video.snippet.title}
                  </h3>
                  <p className="text-xs text-gray-500 tracking-wider">
                    {new Date(video.snippet.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dark Cinema Subscription Section */}
        <div className="text-center py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto bg-gradient-to-r from-gray-900/60 via-black/80 to-gray-900/60 p-12 rounded-2xl border border-forest/30 backdrop-blur-sm relative overflow-hidden shadow-2xl shadow-forest/20"
          >
            {/* Cinema corner lights */}
            <div className="absolute top-8 left-8 w-4 h-4 bg-forest rounded-full shadow-lg shadow-forest/50 animate-pulse"></div>
            <div className="absolute top-8 right-8 w-4 h-4 bg-light-green rounded-full shadow-lg shadow-light-green/50 animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-8 left-8 w-4 h-4 bg-light-green rounded-full shadow-lg shadow-light-green/50 animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-8 right-8 w-4 h-4 bg-forest rounded-full shadow-lg shadow-forest/50 animate-pulse" style={{ animationDelay: '3s' }}></div>

            <h3 className="text-4xl font-bold bg-gradient-to-r from-forest via-light-green to-forest bg-clip-text text-transparent mb-4 tracking-widest">
              SUBSCRIBE
            </h3>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-forest to-transparent mx-auto mb-8"></div>
            <p className="text-gray-400 text-lg font-light mb-10 tracking-wide leading-relaxed">
              Join our culinary cinema experience.<br />
              Exclusive recipes, techniques, and behind-the-scenes content.
            </p>
            <a
              href="https://www.youtube.com/@bgreencaterers"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-4 bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-500 hover:via-red-600 hover:to-red-700 text-white px-12 py-5 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl shadow-red-600/30 tracking-wide"
            >
              <Youtube className="w-7 h-7" />
              <span>SUBSCRIBE NOW</span>
            </a>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Gallery;