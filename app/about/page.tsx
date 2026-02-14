"use client";
import Link from "next/link";
import { Smile, SquareArrowOutUpRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import {
  WriteFlowNodes,
  CarbonioNodes,
  SentinelAINodes,
  GoBuyNodes,
} from "@/components/TechStackNodeSet/index";
import { motion, AnimatePresence } from "framer-motion";
import "./about.css";
import techStackData from "./techstack.json";

const Page = () => {
  const [isLoadedImmediate, setIsLoadedImmediate] = useState(false);
  const [isLoadedWithDelay, setIsLoadedWithDelay] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const [isLoadedWithMoreDelay, setIsLoadedWithMoreDelay] = useState(false);
  const [activeHeader, setActiveHeader] = useState<number | null>(0);
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const [projectChosen, setProjectChosen] = useState<string | null>(
    "WriteFlow",
  );
  
    const frontendStack = techStackData.frontend.map((stack) => ({
        label: stack.label,
        img: stack.img,
      }));
      const backendStack = techStackData.backend.map((stack) => ({
        label: stack.label,
        img: stack.img,
      }));
      const database = techStackData.database.map((stack) => ({
        label: stack.label,
        img: stack.img,
      }));
          const aiStack = techStackData.ai.map((stack) => ({
        label: stack.label,
        img: stack.img,
      }));
      const devopsStack = techStackData.devops.map((stack) => ({
        label: stack.label,
        img: stack.img,
      }));
      
    
  const projects = ["SentinelAI", "carbonio", "WriteFlow", "GoBuy"];
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
      className="bg-neutral-200 w-full min-h-screen py-[calc(20vh+21.875px)] text-[#0a0a0a] -tracking-[0.4px] selection:bg-red-600 selection:text-white px-6 md:px-8 lg:px-10 relative"
    >
      {/* <div
        className={`absolute hidden md:block w-4 h-4 bg-red-600 rounded-full pointer-events-none transition-all duration-300 ease-out z-50 ${
          isLoadedWithMoreDelay ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: `${dotPosition.x}px`,
          top: `${dotPosition.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      /> */}

      <div className="max-w-5xl mx-auto">
        <div
          className={`bg-white p-20 md:p-30 flex flex-col justify-center text-[20px] font-normal leading-loose  `}
          style={{ wordSpacing: "0.1em" }}
        >
          <div
            className={`${
              isLoadedWithDelay ? "opacity-100 blur-none" : "opacity-0 blur-3xl"
            } duration-250 transition-all ease-out`}
          >
            {/* Section 1: Hello */}
            <div className="pb-12 md:pb-16">
              <h2
                ref={(el) => {
                  headerRefs.current[0] = el;
                }}
                className="text-xl md:text-2xl font-medium mb-5"
              >
                Hi
              </h2>

              <div className="flex flex-col gap-5">
                <p className="font-normal">
                  I'm Nguyen Thien Phuoc, known as Leviron. I'm a Computer
                  Science student at Swinburne University of Technology with a
                  passion for building innovative software solutions.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-2 auto-rows-[250px] gallery-group">
                {/* Row 1 */}
                <div className="col-span-2">
                  <img
                    src="/images/self_portrait_1.webp"
                    alt="Portrait 1"
                    className="gallery-image w-full h-full object-cover rounded-xl cursor-pointer border-[1px] border-neutral-200/80"
                  />
                </div>
                <div className="col-span-1">
                  <img
                    src="/images/self_portrait_2.webp"
                    alt="Portrait 2"
                    className="gallery-image w-full h-full object-cover rounded-xl cursor-pointer border-[1px] border-neutral-200/80"
                  />
                </div>
                {/* Row 2 */}
                <div className="col-span-1">
                  <img
                    src="/images/self_portrait_4.webp"
                    alt="Portrait 4"
                    className="gallery-image w-full h-full object-cover rounded-xl cursor-pointer border-[1px] border-neutral-200/80"
                  />
                </div>
                <div className="col-span-2">
                  <img
                    src="/images/self_portrait_3.webp"
                    alt="Portrait 3"
                    className="gallery-image w-full h-full object-cover rounded-xl cursor-pointer border-[1px] border-neutral-200/80"
                  />
                </div>
              </div>
              <p className="text-neutral-500 text-[16px] py-2 text-center">
                Me
              </p>
            </div>
            {/* Section 2: Recent Background */}
            <div className="pb-12 md:pb-16">
              <h2
                ref={(el) => {
                  headerRefs.current[1] = el;
                }}
                className="text-xl md:text-2xl font-medium mb-5"
              >
                Academic Journey
              </h2>
              <div className="flex flex-col gap-5">
                <p className="font-normal">
                  I'm currently pursuing a{" "}
                  <span className="text-neutral-500 inline-flex items-center">
                    <Link
                      href={"https://www.swinburne.edu.au/"}
                      target="_blank"
                      className="inline-flex items-center"
                    >
                      Bachelor of Computer Science at Swinburne University of
                      Technology
                      <SquareArrowOutUpRight className="h-4 w-4 md:h-5 md:w-5 ml-1" />
                    </Link>
                  </span>
                  . My focus areas include software development and emerging
                  technologies.
                </p>
                <p className="font-normal">
                  Initially, I viewed programming as a practical choice rather
                  than a passion. However, during my second year, my perspective
                  shifted completely. I became deeply engaged with hands-on
                  projects and technical challenges, which transformed my
                  approach to computer science.
                </p>
                <p className="font-normal">
                  This commitment has yielded tangible results: improved
                  academic performance, multiple published research papers,
                  developed software products, and recognized achievements in
                  various competitions.
                </p>
                <p className="text-neutral-500 flex items-center gap-1 font-normal">
                  And I genuinely enjoy it.
                  <Smile className="h-4 w-4 md:h-5 md:w-5"></Smile>
                </p>
              </div>
            </div>

            {/* Section 3: High School
            <div className="pb-12 md:pb-16">
              <h2
                ref={(el) => {
                  headerRefs.current[2] = el;
                }}
                className="text-xl md:text-2xl font-medium mb-5"
              >
                Highschool
              </h2>
              <div className="flex flex-col gap-5">
                <p className="font-normal">
                  I completed my secondary education at{" "}
                  <span className="text-neutral-500 inline-flex items-center">
                    <Link
                      href={"https://lhbs.edu.vn/"}
                      target="_blank"
                      className="inline-flex items-center"
                    >
                      Lac Hong Bilingual School
                      <SquareArrowOutUpRight className="h-4 w-4 md:h-5 md:w-5 ml-1" />
                    </Link>
                  </span>
                  , where I maintained a consistent GPA of 8.8, 9.5, and 9.3
                  across my three years of study.
                </p>
                <p className="font-normal">
                  Beyond academics, I earned recognition through academic
                  excellence certificates and awards for outstanding
                  contributions to school events and initiatives. These
                  achievements reflect my commitment to both scholarly and
                  extracurricular pursuits.
                </p>
              </div>
            </div> */}

            {/* Section 4: Familiar techstack */}
            <div className="pb-12 md:pb-16">
              <h2
                ref={(el) => {
                  headerRefs.current[2] = el;
                }}
                className="text-xl md:text-2xl font-medium mb-5"
              >
                Familiar Technology Stacks
              </h2>

              <div className="flex flex-col gap-8">
                {/* Frontend */}
                <div>
                  <h3 className="text-lg font-medium mb-6 text-neutral-500">Frontend</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-12">
                    {frontendStack.map((tech, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-2">
                        <img src={tech.img} alt={tech.label} className="w-14 h-14 object-contain rounded-lg" />
                        <span className="text-sm text-center text-neutral-600">{tech.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Backend */}
                <div>
                  <h3 className="text-lg font-medium mb-6 text-neutral-500">Backend</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-12">
                    {backendStack.map((tech, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-2">
                        <img src={tech.img} alt={tech.label} className="w-14 h-14 object-contain rounded-lg" />
                        <span className="text-sm text-center text-neutral-600">{tech.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Database */}
                <div>
                  <h3 className="text-lg font-medium mb-6 text-neutral-500">Database</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-12">
                    {database.map((tech, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-2">
                        <img src={tech.img} alt={tech.label} className="w-14 h-14 object-contain rounded-lg" />
                        <span className="text-sm text-center text-neutral-600">{tech.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI & LLM */}
                <div>
                  <h3 className="text-lg font-medium mb-6 text-neutral-500">AI & LLM</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-12">
                    {aiStack.map((tech, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-2">
                        <img src={tech.img} alt={tech.label} className="w-14 h-14 object-contain rounded-lg" />
                        <span className="text-sm text-center text-neutral-600">{tech.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* DevOps & Cloud */}
                <div>
                  <h3 className="text-lg font-medium mb-6 text-neutral-500">DevOps & Cloud</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-12">
                    {devopsStack.map((tech, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-2">
                        <img src={tech.img} alt={tech.label} className="w-14 h-14 object-contain rounded-lg" />
                        <span className="text-sm text-center text-neutral-600">{tech.label}</span>
                      </div>
                    ))}
                  </div>
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
