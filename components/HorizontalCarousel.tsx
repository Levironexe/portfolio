"use client";
import {
  motion,
  useTransform,
  useScroll,
  useMotionValue,
  useVelocity,
  useSpring,
} from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

const HorizontalScrollCarousel = () => {
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);
const [isLoadedWithDelay, setIsLoadedWithDelay] = useState(false);
const [isLoadedWithMoreDelay, setIsLoadedWithMoreDelay] = useState(false);
const [isLoadedImmediate, setIsLoadedImmediate] = useState(false);
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  useEffect(() => {
    console.log("rerendered");
  })
  useEffect(() => {
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    
    window.onbeforeunload = handleBeforeUnload;
    
    return () => {
      window.onbeforeunload = null;
    };
  }, []);
  const x = useTransform(scrollYProgress, [0, 1], ["-10.416%", "-64.9%"]);
  const xIndicator = useTransform(scrollYProgress, [0, 1], ["0%", "425%"]);


  const scale = useTransform(scrollYProgress, [0, 0.15], [0.7, 0.6]); // Scale based on scroll

  // Dynamic flex values
  const flexBlack = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const flexRed = useTransform(scrollYProgress, [0, 1], [1, 2]);

  // Smooth scroll-based text movement - random patterns
  const textMoveX = useTransform(scrollYProgress, [0, 1], ["200px", "-200px"]);
  const textMoveX2 = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    ["-200px", "300px", "-50px", "-180px"]
  );
  const textMoveX3 = useTransform(
    scrollYProgress,
    [0, 0.4, 0.8, 1],
    ["350px", "-100px", "200px", "-320px"]
  );
  const textMoveX4 = useTransform(
    scrollYProgress,
    [0, 0.2, 0.6, 1],
    ["50px", "-200px", "150px", "-400px"]
  );
  // Add velocity tracking
  const scrollVelocity = useVelocity(scrollYProgress);

  // Create spring-based transforms with momentum
  const textMoveX5Base = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    ["60vw", "10vw", "-20vw", "-20vw"]
  );
  const textMoveX6Base = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    ["120vw", "-30vw", "40vw", "-10vw", "-10vw"]
  );

  // Add velocity-influenced offset
  const velocityOffset = useTransform(
    scrollVelocity,
    [-5, 0, 5],
    ["-50px", "0px", "50px"]
  );

  // Use springs for smooth, momentum-based movement
  const textMoveX5 = useSpring(textMoveX5Base, {
    stiffness: 100,
    damping: 30,
    mass: 1,
  });

  const textMoveX6 = useSpring(textMoveX6Base, {
    stiffness: 80,
    damping: 25,
    mass: 1.2,
  });

  // Combine base movement with velocity offset
  const textMoveX5WithVelocity = useTransform(
    [textMoveX5, velocityOffset],
    ([base, offset]) => `calc(${base} + ${offset})`
  );

  const textMoveX7 = useTransform(scrollYProgress, [0, 1], ["110vw", "-150vw"]); // const sectionColor = [

  useEffect(() => {
  // Animation with 500ms delay
  const timer = setTimeout(() => {
    setIsLoadedWithDelay(true);
  }, 250);
  
  return () => clearTimeout(timer);
}, []);  
useEffect(() => {
  // Animation with 500ms delay
  const timer = setTimeout(() => {
    setIsLoadedWithMoreDelay(true);
  }, 1000);
  
  return () => clearTimeout(timer);
}, []);

useEffect(() => {
  // Animation with no delay
  const timer = setTimeout(() => {
    setIsLoadedImmediate(true);
  }, 0);
  
  return () => clearTimeout(timer);
}, []);
  return (
    <section
      ref={targetRef}
      className="relative h-[500vh] bg-neutral-200 scrollbar-hide"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden scrollbar-hide">
        <motion.div style={{ x, scale }} className="flex gap-[2vw]">
          {/* Card 1 - Me */}
          <div
            className={`text-[#0a0a0a] relative overflow-hidden selection:bg-neutral-400 duration-600 transition-all ease-out ${isLoadedImmediate ? "scale-100" : "scale-20"}`}
            style={{ fontSize: "5vw" }}
          >
            <div className="text-2xl text-neutral-500 pb-4">Me</div>
            {/* main card */}
            <div
              className="group relative h-[50vw] w-[80vw]  bg-white flex flex-col justify-between "
              style={{ padding: "clamp(1rem, 4vw, 5rem)" }}
            >
              <div className="z-10">
{/* Animated text lines */}
              <div className="relative mb-2 overflow-hidden">
                <span
                  className={`block transition-transform duration-650 ease-out ${
                    isLoadedWithDelay ? "translate-y-0" : "translate-y-full"
                  }`}
                  style={{ transitionDelay: "0ms" }}
                >
                  Nguyen Thien Phuoc
                </span>
              </div>

              <div className="relative mb-2 overflow-hidden">
                <span
                  className={`block transition-transform duration-700 ease-out ${
                    isLoadedWithDelay ? "translate-y-0" : "translate-y-full"
                  }`}
                  style={{ transitionDelay: "130ms" }}
                >
                  or Leviron
                </span>
              </div>

              <div className="relative mb-2 overflow-hidden">
                <span
                  className={`block transition-transform duration-700 ease-out ${
                    isLoadedWithDelay ? "translate-y-0" : "translate-y-full"
                  }`}
                  style={{ transitionDelay: "260ms" }}
                >
                  is a Software Developer
                </span>
              </div>

              <div className="relative mb-2 overflow-hidden">
                <span
                  className={`block transition-transform duration-700 ease-out ${
                    isLoadedWithDelay ? "translate-y-0" : "translate-y-full"
                  }`}
                  style={{ transitionDelay: "390ms" }}
                >
                  building AI-powered
                </span>
              </div>

              <div className="relative mb-2 overflow-hidden">
                <span
                  className={`block transition-transform duration-700 ease-out ${
                    isLoadedWithDelay ? "translate-y-0" : "translate-y-full"
                  }`}
                  style={{ transitionDelay: "520ms" }}
                >
                  applications
                </span>
              </div>

              </div>
              
              <div 
              className={`absolute bottom-0 right-0  bg-red-600 h-[50vw] w-[50vw] rounded-full 
                transition-all duration-700 ease-in-out
                ${isLoadedWithDelay ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
                                style={{ transitionDelay: "520ms" }}
></div>
            </div>
          </div>

          {/* Card 2 - Background */}
          <div
            style={{ fontSize: "5vw" }}
            className={`text-[#0a0a0a] relative cursor-pointer ${isLoadedWithMoreDelay ? "opacity-100" : "opacity-0"} transition-opacity duration-1100`}
          >
            <div className="text-2xl text-neutral-500 pb-4">Background</div>
            {/* main card */}
            <Link
              href={"/background"}
              className="relative h-[50vw] w-[80vw] bg-white flex flex-col justify-center z-10"
            >
              <div className="overflow-hidden flex flex-col justify-center items-center z-20">
                <motion.p
                  style={{ x: textMoveX, fontSize: "12vw" }}
                  className="uppercase leading-none"
                >
                  Swinburne
                </motion.p>
                <motion.p
                  style={{ x: textMoveX2, fontSize: "12vw" }}
                  className="uppercase leading-none"
                >
                  Swinburne
                </motion.p>
                <motion.p
                  style={{ x: textMoveX, fontSize: "12vw" }}
                  className="text-[250px] uppercase leading-none"
                >
                  Swinburne
                </motion.p>
                <motion.p
                  style={{ x: textMoveX2, fontSize: "12vw" }}
                  className="text-[250px] uppercase leading-none"
                >
                  Swinburne
                </motion.p>
              </div>

              {/* Colored divs outside main card */}
              <div className="absolute right-0 top-0 h-[60vw] w-[20vw] flex flex-col">
                <motion.div
                  style={{ flex: flexBlack, zIndex: "20" }}
                  className="bg-[#0a0a0a] backdrop-invert mix-blend-difference"
                ></motion.div>
                <motion.div
                  style={{ flex: flexRed }}
                  className="bg-red-600 relative z-0"
                >
                  {/* Triangle cutout at bottom */}
                  <div
                    className="absolute -bottom-px left-0 w-full h-16 bg-neutral-200"
                    style={{ clipPath: "polygon(0% 100%, 100% 100%, 50% 0%)" }}
                  ></div>
                </motion.div>
              </div>
            </Link>
          </div>

          {/* Card 3 - Skills */}
          <div className="relative overflow-hidden">
            <div className="text-2xl text-neutral-500 pb-4">
              Skills & achievements
            </div>
            <Link
              href={"/skills-and-achievements"}
              className="group relative h-[50vw] w-[80vw] bg-white text-[#0a0a0a] leading-none flex flex-col items-center justify-center"
              style={{ overflowX: "clip" }}
            >
              <motion.p
                style={{
                  x: textMoveX5WithVelocity,
                  fontSize: "40vw",
                }}
                className="block"
              >
                Skills
              </motion.p>
              <motion.p
                style={{
                  x: textMoveX6,
                  fontSize: "15vw",
                }}
                className="block"
              >
                Achievements
              </motion.p>
            </Link>
          </div>

          {/* Card 4 - Projects */}
          <div className="">
            <div className="text-2xl text-neutral-500 pb-4">Projects</div>
            <Link
              href={"/projects"}
              className="group relative h-[50vw] w-[80vw] bg-white text-[#0a0a0a] leading-none flex items-center overflow-x-clip"
              style={{
                fontSize: "45vw",
                // overflowX: 'clip',
              }}
            >
              <motion.p style={{ x: textMoveX7}}>Projects</motion.p>
            </Link>
          </div>

          {/* Card 5 - Decor */}
          <div
            className="text-white relative overflow-hidden"
            style={{ fontSize: "4vw" }}
          >
            <div className="text-2xl text-transparent cursor-default pb-4">
              Hehe
            </div>{" "}
            {/* main card */}
            <div
              className="group relative h-[50vw] w-[80vw] overflow bg-red-600 selection:bg-[#0a0a0a] selection:text-white flex flex-col justify-center leading-tight"
              style={{ padding: "clamp(1rem, 4vw, 5rem)" }}
            >
              <p className="mb-2">Make it fast.</p>
              <p className="mb-2">Make it beautiful</p>
              <p className="mb-2">Make it consistent.</p>
              <p className="mb-2">Make it carefully.</p>
              <p className="mb-2">Make it timeless.</p>
              <p className="mb-2">Make it soulful.</p>
              <p className="mb-2">Make it.</p>
              <p className="text-[#0a0a0a]">- Rauno</p>
            </div>
          </div>

          {/* Card 6 - Contact */}
          <div>
            <div className="text-2xl text-transparent cursor-default pb-4">
              Hehe
            </div>
            <div
              className="group relative h-[50vw] w-[80vw] overflow-hidden bg-white text-[#0a0a0a] cursor-default"
              style={{ fontSize: "5vw" }}
            >
              <Link
                href={"https://github.com/levironexe"}
                target="_blank"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                GitHub
              </Link>
              <Link
                href={"https://github.com/levironexe"}
                target="_blank"
                className="absolute top-[4vw] left-[4vw]"
              >
                Facebook
              </Link>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("levironforwork@gmail.com");
                  setEmailCopied(true);
                  setTimeout(() => setEmailCopied(false), 2000); // Reset after 2 seconds
                }}
                className="absolute top-[4vw] right-[4vw] cursor-copy group/email inline-block text-right"
              >
                <div className="relative overflow-hidden w-[40vw]">
                  <span
                    className={`block transition-transform duration-300 ${
                      emailCopied ? "-translate-y-full" : "translate-y-0"
                    }`}
                  >
                    Email
                  </span>
                  <span
                    className={`absolute top-full right-0 transition-transform duration-300 w-fit ${
                      emailCopied ? "-translate-y-full" : "translate-y-0"
                    }`}
                  >
                    Copied
                  </span>
                </div>
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("+84798896946");
                  setPhoneCopied(true);
                  setTimeout(() => setPhoneCopied(false), 2000); // Reset after 2 seconds
                }}
                className="absolute bottom-[4vw] left-[4vw] group/phone inline-block cursor-copy"
              >
                <div className="relative overflow-hidden w-[40vw]">
                  <span
                    className={`block transition-transform duration-300 text-left ${
                      phoneCopied
                        ? "-translate-y-full"
                        : "group-hover/phone:-translate-y-full"
                    }`}
                  >
                    Phone
                  </span>
                  <span
                    className={`absolute top-full left-0 transition-transform duration-300 w-fit ${
                      phoneCopied
                        ? "-translate-y-[200%]"
                        : "group-hover/phone:-translate-y-full"
                    }`}
                  >
                    +84 798896946
                  </span>
                  <span
                    className={`absolute top-full left-0 transition-transform duration-300 w-fit ${
                      phoneCopied ? "-translate-y-full" : "translate-y-0"
                    }`}
                  >
                    Copied
                  </span>
                </div>
              </button>
              <Link
                href={"/"}
                target="_blank"
                className="absolute bottom-[4vw] right-[4vw]"
              >
                LinkedIn
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="absolute bottom-0 left-0 w-full text-center text-sm text-neutral-500 p-4">
          Design inspired by{" "}
          <Link
            href={"https://x.com/raunofreiberg"}
            target="_blank"
            className="hover:underline hover:cursor-pointer"
          >
            Rauno
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HorizontalScrollCarousel;
