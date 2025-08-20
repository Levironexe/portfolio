"use client";
import Link from "next/link";
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
      className="bg-neutral-200 w-full min-h-screen py-[calc(20vh+21.875px)] text-[#0a0a0a] selection:bg-orange-500 selection:text-white px-6 md:px-8 lg:px-10 relative"
    >
      <div
        className={`absolute hidden md:block w-4 h-4 bg-orange-500 rounded-full pointer-events-none transition-all duration-300 ease-out z-50 ${
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
            } duration-350 transition-all ease-out`}
          >
            {/* Section 1: Technical Skills */}
            <div className="space-y-3 md:space-y-4 pb-12 md:pb-16">
              <h2
                ref={(el) => {
                  headerRefs.current[0] = el;
                }}
                className="text-xl md:text-2xl font-medium"
              >
                Technical Skills
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-orange-500 mb-2">Languages</h3>
                  <p>JavaScript/TypeScript, PHP, HTML/CSS, Solidity (Basic), MOVE, Python, SQL</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-orange-500 mb-2">Frameworks</h3>
                  <p>Next.js, Express.js, React, Anchor</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-orange-500 mb-2">Libraries and SDKs</h3>
                  <p>Web3.js, Sui SDK/Sui Development Kit, Lazorkit Wallet, Solana Wallet Adapter, Lucide Icons, Tailwind CSS</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-orange-500 mb-2">Developer Tools</h3>
                  <p>Git, VS Code, Android Studio, AWS, Firebase, Supabase</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-orange-500 mb-2">Runtime Environment</h3>
                  <p>Node.js</p>
                </div>
              </div>
            </div>

            {/* Section 2: Achievements */}
            <div className="space-y-3 md:space-y-4 pb-12 md:pb-16">
              <h2
                ref={(el) => {
                  headerRefs.current[1] = el;
                }}
                className="text-xl md:text-2xl font-medium"
              >
                Achievements
              </h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-semibold text-orange-600">48-hour Hackathon: Smart Contract Security</h3>
                  <p className="text-orange-500 font-medium">First Place</p>
                  <p className="text-neutral-600 text-sm">Outstanding performance in blockchain security and smart contract auditing</p>
                </div>
                
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-semibold text-orange-600">Solana x Swinburne Hackathon 2025</h3>
                  <p className="text-orange-500 font-medium">Second Prize & Category Prize</p>
                  <p className="text-neutral-600 text-sm">Recognized for innovative blockchain solutions and technical excellence</p>
                </div>
                
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-semibold text-orange-600">Certificate of Participation - Chống Lừa Đảo</h3>
                  <p className="text-orange-500 font-medium">Outstanding Support Recognition</p>
                  <p className="text-neutral-600 text-sm">Recognized for constructive contribution and outstanding support in anti-fraud initiatives</p>
                </div>
              </div>
            </div>

            {/* Section 3: Core Competencies */}
            <div className="space-y-3 md:space-y-4 pb-6 md:pb-8">
              <h2
                ref={(el) => {
                  headerRefs.current[2] = el;
                }}
                className="text-xl md:text-2xl font-medium"
              >
                Core Competencies
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-medium text-orange-600 mb-2">Blockchain Development</h3>
                  <p className="text-sm text-neutral-700">Smart contracts, Web3 integration, Solana & Sui ecosystems</p>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-medium text-orange-600 mb-2">Full-Stack Development</h3>
                  <p className="text-sm text-neutral-700">Modern web applications, API development, database design</p>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-medium text-orange-600 mb-2">Mobile Development</h3>
                  <p className="text-sm text-neutral-700">Android applications, Firebase integration, Material Design</p>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-medium text-orange-600 mb-2">Security & Auditing</h3>
                  <p className="text-sm text-neutral-700">Smart contract security, vulnerability assessment, static analysis</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;