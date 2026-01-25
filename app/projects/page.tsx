"use client";
import Link from "next/link";
import type React from "react";
import { ScrambleText } from "../../components/ui/scramble-text";
import { ArrowUpRight, GithubIcon } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import projectsData from "./projects.json"; // Adjust path as needed

interface Project {
  name: string;
  description: string;
  date: string;
  content: {
    longDescription: string | string[];
    mediaSrc1?: string;
    url1?: string;
    btnText1?: string;
    mediaSrc2?: string;
    url2?: string;
    btnText2?: string;
  };
}

const page = () => {
  const [isLoadedWithDelay, setIsLoadedWithDelay] = useState(false);
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
  const [visibleItems, setVisibleItems] = useState(new Set<number>());
  const [expandedLines, setExpandedLines] = useState(new Set<number>());
  const [bgTransitioned, setBgTransitioned] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const projects: Project[] = projectsData; // Type assertion

  // Function to update dot position for current active item
  const updateDotPosition = () => {
    if (activeItem !== null && containerRef.current) {
      const activeRef = itemRefs.current[activeItem];
      if (activeRef) {
        const rect = activeRef.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();

        setDotPosition({
          x: rect.left - containerRect.left - 16,
          y: rect.top - containerRect.top + rect.height / 2,
        });
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadedWithDelay(true);
    }, 250);

    return () => clearTimeout(timer);
  }, []);

  // Background transition effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setBgTransitioned(true);
    }, 100); // Start transition after 100ms

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      // Update dot position when window is resized
      updateDotPosition();
    };

    const handleScroll = () => {
      // Update dot position when scrolling
      updateDotPosition();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeItem]);

  // Update dot position whenever activeItem changes
  useEffect(() => {
    updateDotPosition();
  }, [activeItem]);

  // Initialize dot position after component mounts
  useEffect(() => {
    if (isLoadedWithDelay) {
      const timer = setTimeout(() => {
        updateDotPosition();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoadedWithDelay]);

  // Staggered item visibility effect
  useEffect(() => {
    if (isLoadedWithDelay) {
      const timers: NodeJS.Timeout[] = [];

      for (let index = 0; index < 9; index++) {
        const timer = setTimeout(() => {
          setVisibleItems((prev) => new Set([...prev, index]));
        }, index * 150); // 150ms delay between each item

        timers.push(timer);
      }

      return () => {
        timers.forEach((timer) => clearTimeout(timer));
      };
    }
  }, [isLoadedWithDelay]);

  // Staggered line expansion effect (with additional delay)
  useEffect(() => {
    if (isLoadedWithDelay) {
      const timers: NodeJS.Timeout[] = [];

      for (let index = 0; index < 9; index++) {
        const timer = setTimeout(
          () => {
            setExpandedLines((prev) => new Set([...prev, index]));
          },
          index * 150 + 500,
        ); // Same stagger + 300ms additional delay for lines

        timers.push(timer);
      }

      return () => {
        timers.forEach((timer) => clearTimeout(timer));
      };
    }
  }, [isLoadedWithDelay]);

  const toggleExpanded = (index: any) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLDivElement>,
    itemIndex: number,
  ) => {
    setActiveItem(itemIndex);

    // Store the ref for this item
    itemRefs.current[itemIndex] = event.currentTarget;

    const rect = event.currentTarget.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();

    if (containerRect) {
      setDotPosition({
        x: rect.left - containerRect.left - 16,
        y: rect.top - containerRect.top + rect.height / 2,
      });
    }
  };

  // Helper to render content
  const renderDescription = (content: Project["content"]) => {
    const paragraphs = Array.isArray(content.longDescription)
      ? content.longDescription
      : [content.longDescription];

    return paragraphs.map((para, idx) => (
      <p key={idx} className="mb-3 last:mb-0">
        {para}
      </p>
    ));
  };

  return (
    <div
      ref={containerRef}
      className={`w-full min-h-screen py-[calc(20vh+21.875px)] text-[#0a0a0a] text-sm selection:bg-purple-600 selection:text-white relative transition-all duration-1000 ease-out ${
        bgTransitioned ? "bg-neutral-100" : "bg-neutral-200"
      }`}
    >
      {/* Dot indicator */}
      <div
        className={`absolute hidden md:block w-[14px] h-[14px] left-0 bg-purple-600 rounded-full pointer-events-none transition-all duration-300 ease-out transform -translate-x-1/2 -translate-y-1/2 z-50 ${
          activeItem !== null ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
        style={{
          left: `${dotPosition.x}px`,
          top: `${dotPosition.y}px`,
        }}
      />

      <div className="flex flex-col items-center justify-center pt-20 "></div>

      {projects.map((project, index) => (
        <div
          className={`max-w-4xl mx-auto flex flex-col gap-0 px-6 md:px-8 lg:px-10 space-y-2 transition-all duration-300 ease-out ${
            visibleItems.has(index) ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`py-4 px-4 flex justify-between items-center hover:bg-neutral-200 rounded-xl cursor-pointer transition-colors duration-200
            ${expandedItems.has(index) && "bg-neutral-200"}`}
            onClick={() => toggleExpanded(index)}
            onMouseEnter={(e) => handleMouseEnter(e, index)}
          >
            <div className="flex">
              <ScrambleText
                text1={`${project.name}`}
                text2={`${project.description}`}
                delay={index*150}
                speed1={40}
                speed2={25}
                className1="font-medium"
                className2="text-neutral-500 hidden lg:block"
              />
            </div>
            <div className="flex-1 mx-4">
              <div
                className={`transition-all duration-1400 ease-out ${
                  expandedLines.has(index)
                    ? "w-full bg-neutral-300 h-[0.8px]"
                    : "w-0 bg-neutral-500 h-[1.1px]"
                }`}
              ></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-neutral-500 font-medium">{project.date}</div>
            </div>
          </div>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              expandedItems.has(index)
                ? "max-h-full opacity-100 blur-none"
                : "max-h-0 opacity-50 blur-[3px]"
            }`}
          >
            <div className="px-4 pt-4 pb-12">
              <div className="rounded-lg space-y-2">
                <div className="text-neutral-700 leading-loose">
                  <p className="mb-3 last:mb-0">
                    {renderDescription(project.content)}
                  </p>
                </div>
                {project.content.mediaSrc1 && project.content.url1 && (
                  <Link
                    href={`${project.content.url1}`}
                    target="_blank"
                    className="block rounded-xl bg-white p-1 border-[1px] border-neutral-200/80"
                  >
                    <video
                      width="100%"
                      height="auto"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="rounded-[8px]"
                    >
                      <source
                        src={`${project.content.mediaSrc1}`}
                        type="video/mp4"
                      />
                    </video>
                    <div className="block w-full bg-neutral-200/80 text-center p-2 rounded-lg mt-1 font-medium text-[14px]">
                      {project.content.btnText1}
                    </div>
                  </Link>
                )}
                {project.content.mediaSrc2 && project.content.url2 && (
                  <Link
                    href={`${project.content.url2}`}
                    target="_blank"
                    className="block rounded-xl bg-white p-1 border-[1px] border-neutral-200/80"
                  >
                    <video
                      width="100%"
                      height="auto"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="rounded-[8px]"
                    >
                      <source
                        src={`${project.content.mediaSrc2}`}
                        type="video/mp4"
                      />
                    </video>
                    <div className="block w-full bg-neutral-200/80 text-center p-2 rounded-lg mt-1 font-medium text-[14px]">
                      {project.content.btnText2}
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default page;
