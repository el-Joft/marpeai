import React from 'react';

interface MarpeLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

const MarpeAiLogo: React.FC<MarpeLogoProps> = ({ 
  className, 
  width = 300, 
  height = 300 
}) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 300 300"
      width={width}
      height={height}
      className={className}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:'#2ecc71', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:'#27ae60', stopOpacity:1}} />
        </linearGradient>
      </defs>

      <circle cx="150" cy="150" r="140" fill="url(#logoGradient)"/>

      <path 
        d="M75 100 Q150 50, 225 100 L225 200 Q150 150, 75 200 Z" 
        fill="white" 
        opacity="0.9"
      />

      <path 
        d="M75 100 Q150 50, 225 100 L225 200 Q150 150, 75 200 Z" 
        fill="black" 
        opacity="0.1"
      />
    </svg>
  );
};

export default MarpeAiLogo;