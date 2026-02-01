import { useRef, useEffect } from 'react';

export const RenderCounter = () => {
  const renderCount = useRef(0);
  const ref = useRef<HTMLSpanElement>(null);

  renderCount.current++;

  useEffect(() => {
    if (ref.current) {
      // Flash animation
      ref.current.classList.remove('text-slate-500', 'bg-transparent', 'border-transparent');
      ref.current.classList.add('bg-pink-500/20', 'text-pink-300', 'border-pink-500/50');
      
      const timer = setTimeout(() => {
        if (ref.current) {
          ref.current.classList.remove('bg-pink-500/20', 'text-pink-300', 'border-pink-500/50');
          ref.current.classList.add('text-slate-500', 'bg-transparent', 'border-transparent');
        }
      }, 300); // Slightly longer flash for visibility
      return () => clearTimeout(timer);
    }
  });

  return (
    <span 
      ref={ref} 
      className="inline-flex items-center justify-center px-1.5 py-0.5 rounded text-[10px] font-mono transition-all duration-200 ml-1 text-slate-500 border border-transparent min-w-[20px]"
    >
      {renderCount.current}
    </span>
  );
};
