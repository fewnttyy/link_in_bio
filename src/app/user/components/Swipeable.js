import React, { useState, useRef, useEffect } from 'react';

const SwipeableEditor = ({ children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const editorRef = useRef(null);

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    setCurrentY(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    setCurrentY(e.touches[0].clientY);
    
    const deltaY = currentY - startY;
    const editorElement = editorRef.current;
    
    if (editorElement) {
      const maxTranslate = window.innerHeight * 0.8;
      const minTranslate = window.innerHeight * 0.2;
      let newTranslate = isExpanded 
        ? maxTranslate + deltaY 
        : window.innerHeight - 60 + deltaY;
      
      newTranslate = Math.max(minTranslate, Math.min(newTranslate, window.innerHeight - 60));
      editorElement.style.transform = `translateY(${newTranslate}px)`;
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const deltaY = currentY - startY;
    const threshold = 50;
    
    if (Math.abs(deltaY) > threshold) {
      setIsExpanded(deltaY < 0);
    }
  };

  useEffect(() => {
    const editorElement = editorRef.current;
    if (editorElement) {
      editorElement.style.transform = `translateY(${
        isExpanded ? '20%' : 'calc(100% - 60px)'
      })`;
    }
  }, [isExpanded]);

  return (
    <div 
      className={`editorSection ${isExpanded ? 'editorExpanded' : 'editorCollapsed'}`}
      ref={editorRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="editorHandle" />
      {children}
    </div>
  );
};

export default SwipeableEditor;