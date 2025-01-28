import React, { useState, useEffect } from "react";

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const handleImageMouseEnter = () => setIsHoveringImage(true);
    const handleImageMouseLeave = () => setIsHoveringImage(false);

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    const interactiveElements = document.querySelectorAll('button, a, [role="button"]');
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    const imageElements = document.querySelectorAll("img");
    imageElements.forEach((img) => {
      img.addEventListener("mouseenter", handleImageMouseEnter);
      img.addEventListener("mouseleave", handleImageMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });

      imageElements.forEach((img) => {
        img.removeEventListener("mouseenter", handleImageMouseEnter);
        img.removeEventListener("mouseleave", handleImageMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Main Cursor */}
      <div
        className="fixed pointer-events-none z-50 rounded-full bg-black w-4 h-4 transition-all duration-150 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Hover Effect */}
      <div
        className={`fixed pointer-events-none z-50 rounded-full border transition-all duration-300 ease-out ${
          isHoveringImage
            ? "w-20 h-20 border-red-500 opacity-100"
            : isHovering
            ? "w-12 h-12 border-black opacity-100"
            : "w-10 h-10 opacity-0"
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Click Effect */}
      <div
        className={`fixed pointer-events-none z-50 rounded-full bg-black opacity-50 transition-all duration-150 ease-out ${
          isClicking ? "w-6 h-6" : "w-4 h-4"
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)", }} /> </> ); };

export default CustomCursor;
