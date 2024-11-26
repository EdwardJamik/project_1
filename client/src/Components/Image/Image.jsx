import React, { useEffect, useRef } from 'react';

export const LazyImage = ({ src, alt, placeholder }) => {
    const imageRef = useRef(null);

    const handleIntersection = (entries) => {
        if (entries[0].isIntersecting) {
            imageRef.current.src = src;
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection, {
            // Adjust threshold and rootMargin as needed
            threshold: 0.1, // Trigger loading earlier
            rootMargin: '0px 0px 100px 0px' // Load image when it's 100px from the viewport
        });
        observer.observe(imageRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <img
            ref={imageRef}
            src={placeholder} // Use a smaller placeholder image
            alt={alt}
            loading="lazy"
        />
    );
};