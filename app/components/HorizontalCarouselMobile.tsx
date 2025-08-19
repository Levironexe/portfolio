"use client";
import {
  motion,
  useTransform,
  useScroll,
  useVelocity,
  useSpring,
} from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

const HorizontalScrollCarouselMobile = () => {
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);
  const [isLoadedWithDelay, setIsLoadedWithDelay] = useState(false);
  const [isLoadedWithMoreDelay, setIsLoadedWithMoreDelay] = useState(false);
  const [isLoadedImmediate, setIsLoadedImmediate] = useState(false);
  
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Scroll-based animations for text movement
  const textMoveX = useTransform(scrollYProgress, [0, 1], ["100px", "-100px"]);
  const textMoveX2 = useTransform(scrollYProgress, [0, 0.5, 1], ["-100px", "50px", "-80px"]);
  const textMoveX3 = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], ["80px", "-30px", "60px", "-120px"]);
  const textMoveX4 = useTransform(scrollYProgress, [0, 0.2, 0.6, 1], ["50px", "-200px", "150px", "-400px"]);
  
  const scrollVelocity = useVelocity(scrollYProgress);
  const textMoveX5Base = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], ["60vw", "10vw", "-20vw", "-20vw"]);
  const textMoveX6Base = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], ["120vw", "-30vw", "40vw", "-10vw", "-10vw"]);
  
  const velocityOffset = useTransform(scrollVelocity, [-5, 0, 5], ["-50px", "0px", "50px"]);
  
  const textMoveX5 = useSpring(textMoveX5Base, { stiffness: 100, damping: 30, mass: 1 });
  const textMoveX6 = useSpring(textMoveX6Base, { stiffness: 80, damping: 25, mass: 1.2 });
  
  const textMoveX5WithVelocity = useTransform([textMoveX5, velocityOffset], ([base, offset]) => `calc(${base} + ${offset})`);
  const textMoveX7 = useTransform(scrollYProgress, [0, 1], ["110vw", "-150vw"]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoadedWithDelay(true), 250);
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoadedWithMoreDelay(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoadedImmediate(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={targetRef} className="bg-neutral-200 min-h-screen">
      <div className="space-y-6 px-4 flex flex-col items-center">
        {/* Card 1 - Me */}
        <div className="relative" style={{ paddingTop: "calc(20vh + 21.875px)" }}>
          <div className="text-base text-neutral-500 mb-3">Me</div>
          
          <div className={`text-[#0a0a0a] relative overflow-hidden selection:bg-neutral-400 duration-600 transition-all ease-out ${isLoadedImmediate ? "scale-100" : "scale-20"}`} style={{ width: "80vw" }}>
            <div 
              className="group relative bg-white flex flex-col justify-center leading-tight overflow-hidden"
              style={{ 
                padding: "clamp(1rem, 8vw, 3rem)",
                height: "80vw",
                fontSize: "clamp(1.5rem, 6vw, 3rem)"
              }}
            >
              <div className="space-y-1">
                <div className="relative mb-2 overflow-hidden">
                  <span className={`block transition-transform duration-650 ease-out ${isLoadedWithDelay ? "translate-y-0" : "translate-y-full"}`}>
                    Nguyen Thien Phuoc
                  </span>
                </div>
                <div className="relative mb-2 overflow-hidden">
                  <span className={`block transition-transform duration-700 ease-out ${isLoadedWithDelay ? "translate-y-0" : "translate-y-full"}`} style={{ transitionDelay: "130ms" }}>
                    or Leviron
                  </span>
                </div>
                <div className="relative mb-2 overflow-hidden">
                  <span className={`block transition-transform duration-700 ease-out ${isLoadedWithDelay ? "translate-y-0" : "translate-y-full"}`} style={{ transitionDelay: "260ms" }}>
                    is a Software Developer
                  </span>
                </div>
                <div className="relative mb-2 overflow-hidden">
                  <span className={`block transition-transform duration-700 ease-out ${isLoadedWithDelay ? "translate-y-0" : "translate-y-full"}`} style={{ transitionDelay: "390ms" }}>
                    building AI-powered
                  </span>
                </div>
                <div className="relative mb-2 overflow-hidden">
                  <span className={`block transition-transform duration-700 ease-out ${isLoadedWithDelay ? "translate-y-0" : "translate-y-full"}`} style={{ transitionDelay: "520ms" }}>
                    applications
                  </span>
                </div>
              </div>
              
              <div className={`absolute bottom-0 right-0 translate-y-2/3 translate-x-1/5 bg-red-600 border-4 rounded-full transition-all duration-600 ease-out ${isLoadedWithDelay ? "h-[40vw] w-[40vw]" : "h-[0vw] w-[0vw]"}`} style={{ transitionDelay: "520ms" }}></div>
            </div>
          </div>
        </div>

        {/* Card 2 - Education */}
        <div className={`relative transition-opacity duration-1100 ${isLoadedWithMoreDelay ? "opacity-100" : "opacity-0"}`}>
          <div className="text-base text-neutral-500 mb-3">Education</div>
          
          <Link href="/education" className="text-[#0a0a0a] relative cursor-pointer block" style={{ width: "80vw" }}>
            <div 
              className="relative bg-white flex flex-col justify-center z-10 overflow-hidden"
              style={{ height: "80vw" }}
            >
              <div className="overflow-hidden flex flex-col justify-center items-center z-20">
                <motion.p style={{ x: textMoveX, fontSize: "clamp(2rem, 20vw, 4rem)" }} className="uppercase leading-none">
                  Swinburne
                </motion.p>
                <motion.p style={{ x: textMoveX2, fontSize: "clamp(2rem, 20vw, 4rem)" }} className="uppercase leading-none">
                  Swinburne
                </motion.p>
                <motion.p style={{ x: textMoveX, fontSize: "clamp(2rem, 20vw, 4rem)" }} className="uppercase leading-none">
                  Swinburne
                </motion.p>
                <motion.p style={{ x: textMoveX2, fontSize: "clamp(2rem, 20vw, 4rem)" }} className="uppercase leading-none">
                  Swinburne
                </motion.p>
              </div>

              <div className="absolute right-0 top-0 w-[15vw] h-full flex flex-col">
                <div className="flex-1 bg-[#0a0a0a] backdrop-invert mix-blend-difference"></div>
                <div className="flex-1 bg-red-600 relative z-0">
                  <div className="absolute -bottom-px left-0 w-full h-8 bg-neutral-200" style={{ clipPath: "polygon(0% 100%, 100% 100%, 50% 0%)" }}></div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Card 3 - Skills */}
        <div className="relative">
          <div className="text-base text-neutral-500 mb-3">Skills & achievements</div>
          
          <Link href="/skills-and-achievements" className="group relative bg-white text-[#0a0a0a] leading-none flex flex-col items-center justify-center overflow-hidden block" style={{ height: "80vw", width: "80vw" }}>
            <motion.p style={{ x: textMoveX5WithVelocity, fontSize: "clamp(3rem, 25vw, 8rem)" }} className="block">
              Skills
            </motion.p>
            <motion.p style={{ x: textMoveX6, fontSize: "clamp(1.5rem, 10vw, 3rem)" }} className="block">
              Achievements
            </motion.p>
          </Link>
        </div>

        {/* Card 4 - Projects */}
        <div className="relative">
          <div className="text-base text-neutral-500 mb-3">Projects</div>
          
          <Link href="/projects" className="group relative bg-white text-[#0a0a0a] leading-none flex items-center overflow-x-clip block" style={{ height: "80vw", width: "80vw", fontSize: "clamp(3rem, 30vw, 10rem)" }}>
            <motion.p style={{ x: textMoveX7 }}>Projects</motion.p>
          </Link>
        </div>

        {/* Card 5 - Decor */}
        <div className="relative">
          <div className="text-base text-transparent cursor-default mb-3">Hehe</div>
          
          <div 
            className="group relative bg-red-600 selection:bg-[#0a0a0a] selection:text-white flex flex-col justify-center leading-tight text-white"
            style={{ 
              padding: "clamp(1rem, 8vw, 3rem)",
              height: "80vw",
              width: "80vw",
              fontSize: "clamp(1rem, 4vw, 1.5rem)"
            }}
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
        <div className="relative">
          <div className="text-base text-transparent cursor-default mb-3">Hehe</div>
          
          <div 
            className="group relative bg-white text-[#0a0a0a] cursor-default"
            style={{ 
              height: "80vw",
              width: "80vw",
              fontSize: "clamp(1rem, 5vw, 2rem)"
            }}
          >
            <Link href="https://github.com/levironexe" target="_blank" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              Github
            </Link>
            <Link href="https://github.com/levironexe" target="_blank" className="absolute top-[8vw] left-[8vw]">
              Facebook
            </Link>
            <button
              onClick={() => {
                navigator.clipboard.writeText("levironforwork@gmail.com");
                setEmailCopied(true);
                setTimeout(() => setEmailCopied(false), 2000);
              }}
              className="absolute top-[8vw] right-[8vw] cursor-copy group/email inline-block text-right"
            >
              <div className="relative overflow-hidden w-[30vw]">
                <span className={`block transition-transform duration-300 ${emailCopied ? "-translate-y-full" : "translate-y-0"}`}>
                  Email
                </span>
                <span className={`absolute top-full right-0 transition-transform duration-300 w-fit ${emailCopied ? "-translate-y-full" : "translate-y-0"}`}>
                  Copied
                </span>
              </div>
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText("+84798896946");
                setPhoneCopied(true);
                setTimeout(() => setPhoneCopied(false), 2000);
              }}
              className="absolute bottom-[8vw] left-[8vw] group/phone inline-block cursor-copy"
            >
              <div className="relative overflow-hidden w-[30vw]">
                <span className={`block transition-transform duration-300 text-left ${phoneCopied ? "-translate-y-full" : "group-hover/phone:-translate-y-full"}`}>
                  Phone
                </span>
                <span className={`absolute top-full left-0 transition-transform duration-300 w-fit ${phoneCopied ? "-translate-y-[200%]" : "group-hover/phone:-translate-y-full"}`}>
                  +84 798896946
                </span>
                <span className={`absolute top-full left-0 transition-transform duration-300 w-fit ${phoneCopied ? "-translate-y-full" : "translate-y-0"}`}>
                  Copied
                </span>
              </div>
            </button>
            <Link href="/" target="_blank" className="absolute bottom-[8vw] right-[8vw]">
              LinkedIn
            </Link>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-neutral-500 p-4 mt-8">
        Design inspired by{" "}
        <Link href="https://x.com/raunofreiberg" target="_blank" className="hover:underline hover:cursor-pointer">
          Rauno
        </Link>
      </div>
    </section>
  );
};

export default HorizontalScrollCarouselMobile;