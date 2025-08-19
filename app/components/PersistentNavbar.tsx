"use client";
import React from "react";
import { motion, useTransform, useScroll, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const PersistentNavbar = () => {
  const progressVal = useMotionValue("0");
  const pathname = usePathname();
  const currentRoute = pathname.split('/')[1] || '';
  const { scrollYProgress } = useScroll();
  const xIndicator = useTransform(scrollYProgress, [0, 1], ["0%", "425%"]);
    const router = useRouter();
    
  // Precise calculations based on 18 elements and 425% total range
  const totalElements = 18;
  const totalRange = 425; // 425%
  const redElementIndices = [0, 3, 6, 9, 15]; // Elements that are red (excluding 12)
  const cardPositions = {
    me: 0,           // Element 0: 0% of 425% = 0%
    education: 1,    // Element 3: 3/17 * 425% ≈ 75%
    skills: 2,       // Element 6: 6/17 * 425% ≈ 150%
    projects: 3,     // Element 9: 9/17 * 425% ≈ 225%
    quote: 4,        // Skip element 12 (not red)
    contact: 5       // Element 15: 15/17 * 425% ≈ 375%
  };

  // Calculate precise positions
  const calculatePosition = (cardIndex: number) => {
    const elementIndex = redElementIndices[cardIndex];
    return (elementIndex / (totalElements - 1)) * totalRange;
  };

  // Define static positions for routes
  const getXPosition = () => {
    if (currentRoute === '') {
      return xIndicator; // Use scroll-based position for root
    } else if (currentRoute === 'education') {
      return `${calculatePosition(1)}%`; // 75%
    } else if (currentRoute === 'skills-and-achievements') {
      return `${calculatePosition(2)}%`; // 150%
    } else if (currentRoute === 'projects') {
      return `${calculatePosition(3)}%`; // 225%
    } else if (currentRoute === 'contact') {
      return `${calculatePosition(5)}%`; // 375%
    } else {
      return "0%";
    }
  };

  // Calculate precise progress percentages
  const getProgressPercentage = (position: number) => {
    return ((position / totalRange) * 100).toFixed(1);
  };
  console.log('rerendered');
  // Handle progress value updates
  useEffect(() => {
    if (currentRoute === '') {
      // Root route: track scroll progress
      const unsubscribe = xIndicator.onChange((latest) => {
        const numericValue = parseFloat(latest.replace('%', ''));
        const percent = ((numericValue / totalRange) * 100).toFixed(1);
        progressVal.set(percent);
      });
      return unsubscribe;
    } else {
      // Static routes: set precise progress
      if (currentRoute === 'education') {
        progressVal.set(getProgressPercentage(calculatePosition(1))); // 17.6%
      } else if (currentRoute === 'skills-and-achievements') {
        progressVal.set(getProgressPercentage(calculatePosition(2))); // 35.3%
      } else if (currentRoute === 'projects') {
        progressVal.set(getProgressPercentage(calculatePosition(3))); // 52.9%
      } else if (currentRoute === 'contact') {
        progressVal.set(getProgressPercentage(calculatePosition(5))); // 88.2%
      } else {
        progressVal.set("0");
      }
    }
  }, [xIndicator, currentRoute]);

  return (
    <div className={`top-0 left-0 w-full z-50 ${currentRoute !== '' ? "relative" : "sticky"}`}>
      <div className={`w-[180px] mx-auto absolute top-[10vh] left-0 right-0 text-center text-2xl font-bold text-neutral-500`}>
        <div className="relative flex group">
          <div className="absolute -left-3 -top-3 h-[calc(24px+21.875px)] w-[204px] rounded-lg backdrop-blur-3xl"></div>
          <div className="absolute w-full flex justify-evenly text-neutral-500 font-light gap-2">
            {Array.from({ length: 18 }, (_, i) => {
              const isRed = i % 3 == 0 && i != 12;
              const cardNames = [
                "Me",
                "Education", 
                "Skills",
                "Projects",
                "Quote",
                "Contact",
              ];
              const cardIndex = Math.floor(i / 3);
              return (
                <div key={i} className="relative group/item">
                  <div
                    className={`h-[21.875px] w-[1px] relative duration-300 bg-neutral-500 transition-all ${
                      isRed && currentRoute === '' ? `group-hover:bg-red-600` : ""
                    }`}
                  ></div>
                  {isRed && currentRoute == '' && (
                    <div
                      className={`absolute ${
                        cardIndex % 2 == 0 ? "-top-8" : "top-[14px]"
                      } left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                    >
                      <span className="text-xs text-neutral-500 px-2 py-1 rounded whitespace-nowrap">
                        {cardNames[cardIndex]}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex gap-2">
            <motion.div
              style={{ x: getXPosition() }}
              className={`relative z-10 h-[21.875px] w-[34px] transition-all duration-300 ease-out border ${currentRoute === 'projects' ? " border-purple-600 bg-purple-600": currentRoute === 'skills-and-achievements' ? "border-orange-600 bg-orange-600" : currentRoute==='education' ? "border-red-600 bg-red-600" : "bg-neutral-200 border border-neutral-500"}`}
            ></motion.div>
            
            <motion.div onClick={() => router.push('/')}
              style={{ x: `${calculatePosition(0)}%` }}
              className={`absolute z-0  h-[21.875px] w-[34px] cursor-pointer transition-all duration-300 ease-in ${currentRoute === '' ? "opacity-0" : currentRoute === 'projects' ? "opacity-100 bg-neutral-100" : "opacity-100 bg-neutral-200 "}  border border-neutral-500`}
            ></motion.div>
            
          </div>
          {currentRoute === '' && (
            <div className="absolute left-full ml-2 text-sm font-light flex items-center h-[21.875px] text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {progressVal.get()}%
          </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default PersistentNavbar;