const ScrollingMarquee = () => {
  return (
    <div className="fixed top-16 sm:top-20 left-0 right-0 z-40 overflow-hidden bg-gradient-to-r from-[#8B0000] via-[#A52A2A] to-[#8B0000] py-3">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee-container {
          display: flex;
          width: fit-content;
          animation: marquee-scroll 25s linear infinite;
        }
        .marquee-content {
          display: flex;
          align-items: center;
          white-space: nowrap;
        }
      `}} />
      <div className="marquee-container">
        <div className="marquee-content">
          <span className="text-white text-sm sm:text-base md:text-lg font-bold px-6">⭐ Prices are Negotiable - Contact Us for Best Deals!</span>
          <span className="text-white text-sm sm:text-base md:text-lg font-bold px-6">🍽️ Fresh Ingredients, Bold Flavors, Every Single Time</span>
          <span className="text-white text-sm sm:text-base md:text-lg font-bold px-6">👨‍🍳 14 Years of Culinary Excellence</span>
          <span className="text-white text-sm sm:text-base md:text-lg font-bold px-6">🎉 Perfect for Weddings, Parties & Corporate Events</span>
          <span className="text-white text-sm sm:text-base md:text-lg font-bold px-6">📞 Call Now for Special Pricing on Bulk Orders!</span>
          <span className="text-white text-sm sm:text-base md:text-lg font-bold px-6">💚 Authentic Taste, Unforgettable Experience</span>
        </div>
        <div className="marquee-content" aria-hidden="true">
          <span className="text-white text-sm sm:text-base md:text-lg font-bold px-6">⭐ Prices are Negotiable - Contact Us for Best Deals!</span>
          <span className="text-white text-sm sm:text-base md:text-lg font-bold px-6">🍽️ Fresh Ingredients, Bold Flavors, Every Single Time</span>
          <span className="text-white text-sm sm:text-base md:text-lg font-bold px-6">👨‍🍳 14 Years of Culinary Excellence</span>
          <span className="text-white text-sm sm:text-base md:text-lg font-bold px-6">🎉 Perfect for Weddings, Parties & Corporate Events</span>
          <span className="text-white text-sm sm:text-base md:text-lg font-bold px-6">📞 Call Now for Special Pricing on Bulk Orders!</span>
          <span className="text-white text-sm sm:text-base md:text-lg font-bold px-6">💚 Authentic Taste, Unforgettable Experience</span>
        </div>
      </div>
    </div>
  );
};

export default ScrollingMarquee;
