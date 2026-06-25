import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const [cursorType, setCursorType] = useState<'default' | 'hover' | 'project' | 'close' | 'arrow-left' | 'arrow-right' | 'text'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 280, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseDown = () => {
      setIsClicked(true);
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Check text fields (fade out cursor)
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.isContentEditable ||
        target.closest('[contenteditable="true"]')
      ) {
        setCursorType('text');
        return;
      }

      // Check custom data attribute
      const cursorAttr = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      if (cursorAttr) {
        setCursorType(cursorAttr as any);
        return;
      }

      // Fallback detection for standard interactive elements
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.cursor-pointer') ||
        target.closest('[role="button"]')
      ) {
        setCursorType('hover');
        return;
      }

      setCursorType('default');
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible, mouseX, mouseY]);

  if (typeof window === 'undefined') return null;

  // Configuration for different cursor states
  let outerWidth = 32;
  let outerHeight = 32;
  let outerBg = 'rgba(232, 162, 58, 0)';
  let outerBorder = '1.5px solid var(--color-accent)';
  let outerText = '';
  let innerScale = isClicked ? 0.65 : 1;
  let innerOpacity = 1;
  let outerOpacity = isVisible ? 1 : 0;

  if (cursorType === 'hover') {
    outerWidth = 56;
    outerHeight = 56;
    outerBg = 'rgba(232, 162, 58, 0.08)';
    outerBorder = '1.5px solid var(--color-accent)';
    innerScale = 0; // hide inner dot on hover
  } else if (cursorType === 'project') {
    outerWidth = 76;
    outerHeight = 76;
    outerBg = 'rgba(232, 162, 58, 0.12)';
    outerBorder = '1.5px solid var(--color-accent)';
    outerText = 'VIEW';
    innerScale = 0;
  } else if (cursorType === 'close') {
    outerWidth = 64;
    outerHeight = 64;
    outerBg = 'rgba(220, 38, 38, 0.08)';
    outerBorder = '1.5px solid rgba(220, 38, 38, 0.5)';
    outerText = 'CLOSE';
    innerScale = 0;
  } else if (cursorType === 'arrow-left') {
    outerWidth = 64;
    outerHeight = 64;
    outerBg = 'rgba(232, 162, 58, 0.08)';
    outerBorder = '1.5px solid var(--color-accent)';
    outerText = '←';
    innerScale = 0;
  } else if (cursorType === 'arrow-right') {
    outerWidth = 64;
    outerHeight = 64;
    outerBg = 'rgba(232, 162, 58, 0.08)';
    outerBorder = '1.5px solid var(--color-accent)';
    outerText = '→';
    innerScale = 0;
  } else if (cursorType === 'text') {
    // Hide completely on inputs/textareas to let system cursor handle it properly
    outerOpacity = 0;
    innerOpacity = 0;
  }

  // Handle shrink effect on click
  if (isClicked && cursorType !== 'text') {
    outerWidth = Math.max(20, outerWidth - 12);
    outerHeight = Math.max(20, outerHeight - 12);
  }

  return (
    <>
      {/* Global CSS overrides when cursor is active */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (hover: hover) and (pointer: fine) {
          body, a, button, [role="button"], .cursor-pointer, select {
            cursor: none !important;
          }
          /* Let inputs/textareas show text caret but hide our custom cursor */
          input, textarea {
            cursor: text !important;
          }
        }
      `}} />

      <div className="hidden lg:block pointer-events-none fixed inset-0 z-[9999]">
        {/* Outer Ring */}
        <motion.div
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
            width: outerWidth,
            height: outerHeight,
            background: outerBg,
            border: outerBorder,
            opacity: outerOpacity,
          }}
          className="fixed left-0 top-0 rounded-full flex items-center justify-center text-[10px] font-bold tracking-widest text-accent uppercase select-none transition-[width,height,background-color,border,opacity] duration-300 ease-out"
        >
          {outerText && (
            <span className="font-heading text-accent text-[9px] tracking-[0.15em] select-none">
              {outerText}
            </span>
          )}
        </motion.div>

        {/* Inner Dot */}
        <motion.div
          style={{
            x: mouseX,
            y: mouseY,
            translateX: '-50%',
            translateY: '-50%',
            scale: innerScale,
            opacity: innerOpacity * (isVisible ? 1 : 0),
          }}
          className="fixed left-0 top-0 w-2 h-2 bg-accent rounded-full shadow-[0_0_10px_rgba(232,162,58,0.5)] transition-[scale,opacity] duration-200"
        />
      </div>
    </>
  );
};
