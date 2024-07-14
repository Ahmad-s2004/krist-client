import React, { useEffect, useRef } from 'react';

function NumberCounter({ value }) {
  const ref = useRef(null);

  useEffect(() => {
    function updateNumber() {
      const element = ref.current;
      const startValue = 0;
      const endValue = value;
      const duration = 3000; // 3 seconds
      let currentTime = 0;
      const increment = 100; // adjust this value to increase or decrease the animation speed

      const animate = () => {
        currentTime += increment;
        const progress = currentTime / duration;
        const currentValue = startValue + (endValue - startValue) * progress;
        element.textContent = Math.round(currentValue);
        element.style.setProperty('--num', currentValue);

        if (currentTime < duration) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }

    updateNumber();
  }, [value]);

  return (
    <div className="animate-number">
      <span ref={ref} />
    </div>
  );
}

export default NumberCounter;