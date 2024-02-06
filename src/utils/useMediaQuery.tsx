import { useState, useEffect } from 'react';

// Read env variables
const EnvVars = {
  sm: process.env.NEXT_PUBLIC_BREAKPOINT_SM,
  md: process.env.NEXT_PUBLIC_BREAKPOINT_MD,
  lg: process.env.NEXT_PUBLIC_BREAKPOINT_LG,
  xl: process.env.NEXT_PUBLIC_BREAKPOINT_XL,
};

// use env variables or default value for breakpoint pixel values
const BreakPointPixelValues = {
  sm: EnvVars.sm ? parseInt(EnvVars.sm) : 600,
  md: EnvVars.md ? parseInt(EnvVars.md) : 900,
  lg: EnvVars.lg ? parseInt(EnvVars.lg) : 1200,
  xl: EnvVars.xl ? parseInt(EnvVars.xl) : 1536,
};

// breakpoint media queries based on pixel values
export const BreakPoint = {
  sm: {
    up: `(min-width:${BreakPointPixelValues.sm}px)`,
    down: `(max-width:${BreakPointPixelValues.sm - 0.05}px)`,
  },
  md: {
    up: `(min-width:${BreakPointPixelValues.md}px)`,
    down: `(max-width:${BreakPointPixelValues.md - 0.05}px)`,
  },
  lg: {
    up: `(min-width:${BreakPointPixelValues.lg}px)`,
    down: `(max-width:${BreakPointPixelValues.lg - 0.05}px)`,
  },
  xl: {
    up: `(min-width:${BreakPointPixelValues.xl}px)`,
    down: `(max-width:${BreakPointPixelValues.xl - 0.05}px)`,
  },
};

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const resizeListener = () => {
      const media = window.matchMedia(query);
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
    };

    resizeListener();
    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, [matches, query]);

  return matches;
};

export default useMediaQuery;
