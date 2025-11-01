import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useEffect, useState } from 'react';

const YouTubeSection = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = 'AIzaSyCvypX2_-vfY44UGTZjyElb_rAO5JArjvM';
  const CHANNEL_ID = 'UCyElb_rAO5JArjvM'; // We'll need to get the actual channel ID

  useEffect(() => {
    fetchYouTubeVideos();
  }, []);

  const fetchYouTubeVideos = async () => {
    try {
      setLoading(true);
      
      // First, get the channel ID from the custom URL handle
      const channelResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=@bgreencaterers&type=channel&key=${API_KEY}`
      );
      
      if (!channelResponse.ok) {
        throw new Error('Failed to fetch channel information');
      }
      
      const channelData = await channelResponse.json();
      
      if (channelData.items && channelData.items.length > 0) {
        const channelId = channelData.items[0].id.channelId;
        
        // Now fetch the latest videos from the channel
        const videosResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${channelId}&part=snippet,id&order=date&maxResults=3&type=video`
        );
        
        if (!videosResponse.ok) {
          throw new Error('Failed to fetch videos');
        }
        
        const videosData = await videosResponse.json();
        setVideos(videosData.items || []);
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching YouTube videos:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const openVideo = (videoId) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <section className="py-12 sm:py-16 md:py-20 bg-cream">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-forest mb-12">Watch Our Latest Videos</h2>
            <div className="flex justify-center items-center min-h-[300px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 sm:py-16 md:py-20 bg-cream">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-forest mb-12">Watch Our Latest Videos</h2>
            <p className="text-red-600">Unable to load videos. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-cream">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-forest mb-4">Watch Our Latest Videos</h2>
          <p className="text-lg sm:text-xl text-gray-600 px-4">See our delicious creations come to life</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.id.videoId}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-gold"
              onClick={() => openVideo(video.id.videoId)}
            >
              <div className="relative group">
                <img
                  src={video.snippet.thumbnails.high.url}
                  alt={video.snippet.title}
                  className="w-full h-48 sm:h-56 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                  <div className="bg-gold rounded-full p-4 transform group-hover:scale-110 transition-all duration-300">
                    <Play className="w-8 h-8 text-forest fill-forest" />
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg font-bold text-forest mb-2 line-clamp-2">
                  {video.snippet.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {video.snippet.description}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(video.snippet.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://youtube.com/@bgreencaterers"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-forest text-white hover:bg-forest/90 font-semibold text-lg px-8 py-4 rounded-lg transform hover:scale-105 transition-all"
          >
            Visit Our YouTube Channel
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default YouTubeSection;
