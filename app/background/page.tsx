"use client";
import Link from "next/link";
import { Smile } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const Page = () => {
  const [isLoadedImmediate, setIsLoadedImmediate] = useState(false);
  const [isLoadedWithDelay, setIsLoadedWithDelay] = useState(false);
  const [isLoadedWithMoreDelay, setIsLoadedWithMoreDelay] = useState(false);
  const [activeHeader, setActiveHeader] = useState<number | null>(0);
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadedImmediate(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadedWithDelay(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadedWithMoreDelay(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // Function to update dot position for current active header
  const updateDotPosition = () => {
    if (activeHeader !== null && containerRef.current) {
      const activeRef = headerRefs.current[activeHeader];
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
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const triggerPoint = scrollTop + viewportHeight * 0.3;

      let currentActiveHeader = null;
      let minDistance = Number.POSITIVE_INFINITY;

      headerRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const headerTop = rect.top + scrollTop;
          const distance = Math.abs(triggerPoint - headerTop);

          if (distance < minDistance) {
            minDistance = distance;
            currentActiveHeader = index;
          }
        }
      });

      if (scrollTop < 100) {
        currentActiveHeader = 0;
      }

      if (
        currentActiveHeader !== null &&
        currentActiveHeader !== activeHeader
      ) {
        setActiveHeader(currentActiveHeader);
      }
    };

    const handleResize = () => {
      // Update dot position when window is resized
      updateDotPosition();
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [activeHeader]);

  // Update dot position whenever activeHeader changes
  useEffect(() => {
    updateDotPosition();
  }, [activeHeader]);

  // Initialize dot position after component mounts and refs are ready
  useEffect(() => {
    if (isLoadedImmediate) {
      // Small delay to ensure refs are set and DOM is ready
      const timer = setTimeout(() => {
        updateDotPosition();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isLoadedImmediate]);

  return (
    <div
      ref={containerRef}
      className="bg-neutral-200 w-full min-h-screen py-[calc(20vh+21.875px)] text-[#0a0a0a] selection:bg-red-600 selection:text-white px-6 md:px-8 lg:px-10 relative"
    >
      <div
        className={`absolute hidden md:block w-4 h-4 bg-red-600 rounded-full pointer-events-none transition-all duration-300 ease-out z-50 ${
          isLoadedWithMoreDelay ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: `${dotPosition.x}px`,
          top: `${dotPosition.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="max-w-5xl mx-auto">
        <div
          className={`bg-white p-8 md:p-16 flex flex-col justify-center text-base md:text-[18px] leading-relaxed md:leading-loose ${
            isLoadedImmediate ? "scale-100 opacity-100" : "scale-20 opacity-0"
          } duration-600 transition-all ease-out`}
        >
          <div
            className={`${
              isLoadedWithDelay ? "opacity-100 blur-none" : "opacity-0 blur-3xl"
            } duration-250 transition-all ease-out`}
          >
            {/* Section 1: Hello */}
            <div className="space-y-3 md:space-y-4 pb-12 md:pb-16">
              <h2
                ref={(el) => {
                  headerRefs.current[0] = el;
                }}
                className="text-xl md:text-2xl font-medium"
              >
                Hello
              </h2>
              <p>My name is Nguyen Thien Phuoc or Leviron.</p>
            </div>

            {/* Section 2: Recent Background */}
            <div className="space-y-3 md:space-y-4 pb-12 md:pb-16">
              <h2
                ref={(el) => {
                  headerRefs.current[1] = el;
                }}
                className="text-xl md:text-2xl font-medium"
              >
                Recent - Bachelor of Computer Science, Swinburne University of
                Technology
              </h2>
              <p>
                I am an undergraduate student at{" "}
                <span className="text-neutral-500">
                  <Link href={"https://www.swinburne.edu.au/"} target="_blank">
                    Swinburne University of Technology
                  </Link>
                </span>{" "}
                pursuing a{" "}
                <span className="text-neutral-500">Computer Science</span>{" "}
                major.
              </p>
              <p>
                At first, I was not really interested in coding as I thought it
                was quite "boring". I only chose this major because it was the
                only one I was confident I could be good at. It wasn't until my
                second year that my mindset about coding changed. I was super
                worried that I might not find employment with this kind of
                studying, scared that I would not end up with a superbike, a
                nice house, or at least a good workplace.
              </p>
              <p>
                But then, everything changed. I rolled up my sleeves, started
                building stuff, and... stopped selling my soul to video games (I
                missed quite numerous opportunities because of that).
              </p>
              <p>
                And boom, my GPA improved, more invaluable knowledge was
                learned, plenty of products were built, a few prizes were
                earned, and multiple research papers were completed.{" "}
              </p>
              <p className="text-neutral-500 flex items-center gap-1">
                Me feel good.<Smile className="h-5 w-5 md:h-6 md:w-6"></Smile>
              </p>
            </div>

            {/* Section 3: High School */}
            <div className="space-y-3 md:space-y-4 pb-6 md:pb-8">
              <h2
                ref={(el) => {
                  headerRefs.current[2] = el;
                }}
                className="text-xl md:text-2xl font-medium"
              >
                Back in 2023 - Lac Hong Bilingual School
              </h2>
              <p>
                I was studying at{" "}
                <span className="text-neutral-500">
                  <Link href={"https://lhbs.edu.vn/"} target="_blank">
                    Lac Hong Bilingual School
                  </Link>
                </span>{" "}
                back in my beautiful town. I was an outstanding student with a
                GPA of{" "}
                <span className="text-neutral-500">
                  8.8, 9.5, and 9.3 out of 10
                </span>{" "}
                respectively for my three years of high school there.
              </p>
              <p>
                Not just those GPAs—as some people say they don't matter—I also
                earned <span className="text-neutral-500">certificates</span>{" "}
                for academic and social events and received many{" "}
                <span className="text-neutral-500">prizes</span> for outstanding
                performances. And trust me, they are worth it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
