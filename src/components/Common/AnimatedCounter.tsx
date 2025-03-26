import { useState, useRef, useEffect } from "react";

const AnimatedCounter = ({
  end,
  duration = 2000,
}: {
  end: string;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLHeadingElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Extract the numeric part from the end value (e.g., "5,000+" -> 5000)
  const numericValue = Number.parseInt(
    end.replace(/,/g, "").replace(/\+/g, "").replace(/%/g, "")
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const startTime = performance.now();
          const updateCount = (currentTime: number) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);

            // Easing function for smoother animation
            const easeOutQuad = (t: number) => t * (2 - t);
            const easedProgress = easeOutQuad(progress);

            setCount(Math.floor(easedProgress * numericValue));

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            }
          };

          requestAnimationFrame(updateCount);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, [numericValue, duration, hasAnimated]);

  // Format the count with commas and add any suffix from the original end value
  const formattedCount = count.toLocaleString();
  const suffix = end.match(/[+%]/) ? end.match(/[+%]/)![0] : "";

  return (
 
      <h3
        ref={countRef}
        className="text-2xl font-semibold truncate text-primary transition-all duration-300"
      >
        {formattedCount}
        {suffix}
      </h3>
   
  );
};

export default AnimatedCounter;
