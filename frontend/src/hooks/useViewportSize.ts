import { useState, useEffect } from 'react';

type ViewportSize = 'mobile' | 'tablet' | 'midDesktop' | 'desktop';

const useViewportSize = () => {
  const [viewportSize, setViewportSize] = useState<ViewportSize>('desktop');

  useEffect(() => {
    const checkViewportSize = () => {
      const width = window.innerWidth;
      
      if (width <= 730) {
        setViewportSize('mobile');
      } else if (width <= 1024) {
        setViewportSize('tablet');
      } else if (width <= 1420) {
        setViewportSize('midDesktop');
      } else {
        setViewportSize('desktop');
      }
    };

    // Initial check
    checkViewportSize();

    // Add event listener
    window.addEventListener('resize', checkViewportSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkViewportSize);
  }, []);

  return viewportSize;
};

export default useViewportSize; 