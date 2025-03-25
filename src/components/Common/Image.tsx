import React, { useState, useEffect, CSSProperties } from 'react';

export interface ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

export interface ImageProps {
  src: string;
  width?: number;
  height?: number;
  alt: string;
  loader?: (props: ImageLoaderProps) => string;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  style?: CSSProperties;
  onLoadingComplete?: (img: HTMLImageElement) => void;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  loading?: 'lazy' | 'eager';
  blurDataURL?: string;
  overrideSrc?: string;
  className?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

export const Image: React.FC<ImageProps> = ({
  src,
  width,
  height,
  alt,
  loader,
  fill = false,
  sizes,
  quality = 75,
  priority = false,
  placeholder = 'empty',
  style = {},
  onLoadingComplete,
  onLoad,
  onError,
  loading = 'lazy',
  blurDataURL,
  overrideSrc,
  className = '',
  objectFit = 'cover'
}) => {
  const [imageSrc, setImageSrc] = useState(overrideSrc || src);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Use custom loader if provided
  const finalSrc = loader 
    ? loader({ 
        src: imageSrc, 
        width: width || 0, 
        quality 
      }) 
    : imageSrc;

  useEffect(() => {
    // Update image source if prop changes
    setImageSrc(overrideSrc || src);
  }, [src, overrideSrc]);

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Fallback to blur or empty placeholder
    if (placeholder === 'blur' && blurDataURL) {
      setImageSrc(blurDataURL);
    }
    
    // Call custom error handler if provided
    onError && onError(event);
  };

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setImageLoaded(true);
    
    // Call loading complete if provided
    if (onLoadingComplete) {
      const img = event.currentTarget as HTMLImageElement;
      onLoadingComplete(img);
    }
    
    // Call custom load handler if provided
    onLoad && onLoad(event);
  };

  // Determine container and image styles based on fill prop
  const containerStyle: CSSProperties = fill 
    ? {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: '100%',
        height: '100%'
      }
    : {
        position: 'relative',
        width: width || '100%',
        height: height || 'auto'
      };

  const imageStyle: CSSProperties = {
    ...style,
    width: fill ? '100%' : width,
    height: fill ? '100%' : height,
    objectFit: objectFit,
    opacity: imageLoaded ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out',
    position: fill ? 'absolute' : 'static'
  };

  // Construct class names
  const combinedClassName = `${className} ${priority ? 'priority-image' : ''}`;

  return (
    <div style={containerStyle}>
      {!imageLoaded && placeholder !== 'empty' && (
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#f0f0f0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1
          }}
        >
          {placeholder === 'blur' && blurDataURL ? (
            <img 
              src={blurDataURL} 
              alt="Blur placeholder" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'blur(10px)'
              }}
            />
          ) : (
            <svg 
              width="50" 
              height="50" 
              viewBox="0 0 38 38" 
              xmlns="http://www.w3.org/2000/svg" 
              stroke="#a0a0a0"
            >
              <g fill="none" fillRule="evenodd">
                <g transform="translate(1 1)" strokeWidth="2">
                  <circle strokeOpacity=".5" cx="18" cy="18" r="18"/>
                  <path d="M36 18c0-9.94-8.06-18-18-18">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 18 18"
                      to="360 18 18"
                      dur="1s"
                      repeatCount="indefinite"/>
                  </path>
                </g>
              </g>
            </svg>
          )}
        </div>
      )}
      <img
        src={finalSrc}
        alt={alt}
        style={imageStyle}
        className={combinedClassName}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading={priority ? 'eager' : loading}
        sizes={sizes}
        width={width}
        height={height}
      />
    </div>
  );
};

export default Image;