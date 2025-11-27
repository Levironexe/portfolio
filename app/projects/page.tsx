"use client";
import Link from "next/link";
import type React from "react";
import { ScrambleText } from "../../components/ui/scramble-text";
import { ArrowUpRight, GithubIcon } from "lucide-react";
import { useEffect, useState, useRef } from "react";

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

      for (let index = 0; index < 7; index++) {
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

      for (let index = 0; index < 7; index++) {
        const timer = setTimeout(() => {
          setExpandedLines((prev) => new Set([...prev, index]));
        }, index * 150 + 500); // Same stagger + 300ms additional delay for lines

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
    itemIndex: number
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


  return (
    <div
      ref={containerRef}
      className={`w-full min-h-screen py-[calc(20vh+21.875px)] text-[#0a0a0a] text-sm selection:bg-purple-600 selection:text-white relative transition-all duration-1000 ease-out ${
        bgTransitioned ? "bg-neutral-100" : "bg-neutral-200"
      }`}
    >
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
      
      {/* Project 1: itealab.vercel.com */}
      <div
        className={`max-w-4xl mx-auto flex flex-col gap-0 px-6 md:px-8 lg:px-10 space-y-2 transition-all duration-300 ease-out ${
          visibleItems.has(0) ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`py-4 px-4 flex justify-between items-center hover:bg-neutral-200 rounded-xl cursor-pointer transition-colors duration-200
                          ${expandedItems.has(0) && "bg-neutral-200"}`}
          onClick={() => toggleExpanded(0)}
          onMouseEnter={(e) => handleMouseEnter(e, 0)}
        >
          <div className="flex">
            <ScrambleText
              text1="itealab.vercel.com"
              text2="The homepage for Itea Lab - a coding community"
              delay={0}
              speed1={40}
              speed2={25}
              className1="font-medium"
              className2="text-neutral-500 hidden lg:block"
            />
          </div>
          <div className="flex-1 mx-4">
            <div
              className={`transition-all duration-1400 ease-out ${
                expandedLines.has(0)
                  ? "w-full bg-neutral-300 h-[0.8px]"
                  : "w-0 bg-neutral-500 h-[1.1px]"
              }`}
            ></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-neutral-500 font-medium">2025</div>
          </div>
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            expandedItems.has(0)
              ? "max-h-full opacity-100 blur-none"
              : "max-h-0 opacity-50 blur-[3px]"
          }`}
        >
          <div className="px-4 pt-4 pb-12">
            <div className="rounded-lg space-y-2">
              <div className="text-neutral-700 leading-loose">
                <p className="mb-3 last:mb-0">
                  The Itea Lab homepage is also a modern and responsive website built with Next.js and Tailwind CSS to showcase the activities of the Itea Lab coding community. It highlights community projects, event listings, and member profiles while leveraging server-side rendering for improved performance and SEO. Designed as both an information hub and a community portal, it provides a sleek, accessible platform for developers to connect and collaborate.
                  Visit my <span><Link href="https://github.com/levironexe/itealab" target='_blank' className="text-neutral-500 hover:underline">GitHub</Link> </span> to learn more. 

                </p>
              </div>
              <Link href="https://itealab.vercel.app" target="_blank" className="block rounded-xl bg-white p-1 border-[1px] border-neutral-200/80">
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
                  <source src="/videos/itealab-demo-compressed.mp4" type="video/mp4" />
                </video>
                <div className="block w-full bg-neutral-200/80 text-center p-2 rounded-lg mt-1 font-medium text-[14px]">
                    View website
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Project 2: SentinelAI */}
      <div
        className={`max-w-4xl mx-auto flex flex-col gap-0 px-6 md:px-8 lg:px-10 space-y-2 transition-all duration-300 ease-out ${
          visibleItems.has(1) ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`py-4 px-4 flex justify-between items-center hover:bg-neutral-200 rounded-xl cursor-pointer transition-colors duration-200
                          ${expandedItems.has(1) && "bg-neutral-200"}`}
          onClick={() => toggleExpanded(1)}
          onMouseEnter={(e) => handleMouseEnter(e, 1)}
        >
          <div className="flex">
            <ScrambleText
              text1="SentinelAI"
              text2="An AI-powered tool for auditing PCI DSS compliance"
              delay={150}
              speed1={40}
              speed2={25}
              className1="font-medium"
              className2="text-neutral-500 hidden lg:block"
            />
          </div>
          <div className="flex-1 mx-4">
            <div
              className={`transition-all duration-1400 ease-out ${
                expandedLines.has(1)
                  ? "w-full bg-neutral-300 h-[0.8px]"
                  : "w-0 bg-neutral-500 h-[1.1px]"
              }`}
            ></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-neutral-500 font-medium">2025</div>
          </div>
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            expandedItems.has(1)
              ? "max-h-full opacity-100 blur-none"
              : "max-h-0 opacity-50 blur-[3px]"
          }`}
        >
          <div className="px-4 pt-4 pb-12">
            <div className="rounded-lg space-y-2">
              <div className="text-neutral-700 leading-loose">
                <p className="mb-3 last:mb-0">
                  SentinelAI is an AI-powered compliance automation framework designed to streamline PCI DSS v4.0 audits for financial institutions, built during the VPBank Hackathon 2025. By integrating Amazon Bedrock AI (Claude 3.5 Sonnet), AWS Config, CloudTrail, Security Hub, and Aurora PostgreSQL, it automates evidence collection, compliance evaluation, and report generation across 200+ AWS accounts.
                </p>
                <p className="mb-3 last:mb-0">
                  The framework eliminates manual auditing by offering real-time dashboards, AI audit agents, cross-framework mapping, intelligent risk prioritization, and multi-format reporting. Its modular architecture includes an AI agent orchestrator, evidence collector, RAG-based knowledge base, and frontend compliance portal. With up to 90% faster evidence collection and 80% less prep time, SentinelAI demonstrates enterprise scalability, cost savings, and adaptive learning for long-term compliance management.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project 3: LongChau-PMS */}
      <div
        className={`max-w-4xl mx-auto flex flex-col gap-0 px-6 md:px-8 lg:px-10 space-y-2 transition-all duration-300 ease-out ${
          visibleItems.has(2) ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`py-4 px-4 flex justify-between items-center hover:bg-neutral-200 rounded-xl cursor-pointer transition-colors duration-200
                          ${expandedItems.has(2) && "bg-neutral-200"}`}
          onClick={() => toggleExpanded(2)}
          onMouseEnter={(e) => handleMouseEnter(e, 2)}
        >
          <div className="flex">
            <ScrambleText
              text1="LongChau-PMS"
              text2="A management system solution for Long Chau Pharmacy"
              delay={300}
              speed1={40}
              speed2={25}
              className1="font-medium"
              className2="text-neutral-500 hidden lg:block"
            />
          </div>
          <div className="flex-1 mx-4">
            <div
              className={`transition-all duration-1400 ease-out ${
                expandedLines.has(2)
                  ? "w-full bg-neutral-300 h-[0.8px]"
                  : "w-0 bg-neutral-500 h-[1.1px]"
              }`}
            ></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-neutral-500 font-medium">2025</div>
          </div>
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            expandedItems.has(2)
              ? "max-h-full opacity-100 blur-none"
              : "max-h-0 opacity-50 blur-[3px]"
          }`}
        >
          <div className="px-4 pt-4 pb-12">
            <div className="rounded-lg space-y-2">
              <div className="text-neutral-700 leading-loose">
                <p className="mb-3 last:mb-0">
                  A proof-of-concept full-stack pharmacy platform built with Next.js, Django, and PostgreSQL, designed to mimic real-world pharmacy chain operations. It provides multi-role access (staff, pharmacists, customers, managers) with features for orders, prescriptions, inventory, deliveries, reporting, and loyalty programs, all optimized for Vietnamese business workflows.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project 4: carbonio */}
      <div
        className={`max-w-4xl mx-auto flex flex-col gap-0 px-6 md:px-8 lg:px-10 space-y-2 transition-all duration-300 ease-out ${
          visibleItems.has(3) ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`py-4 px-4 flex justify-between items-center hover:bg-neutral-200 rounded-xl cursor-pointer transition-colors duration-200
                          ${expandedItems.has(3) && "bg-neutral-200"}`}
          onClick={() => toggleExpanded(3)}
          onMouseEnter={(e) => handleMouseEnter(e, 3)}
        >
          <div className="flex">
            <ScrambleText
              text1="carbonio"
              text2="A project for BREAKOUT Hackathon by Colosseum, 2025"
              delay={450}
              speed1={40}
              speed2={25}
              className1="font-medium"
              className2="text-neutral-500 hidden lg:block"
            />
          </div>
          <div className="flex-1 mx-4">
            <div
              className={`transition-all duration-1400 ease-out ${
                expandedLines.has(3)
                  ? "w-full bg-neutral-300 h-[0.8px]"
                  : "w-0 bg-neutral-500 h-[1.1px]"
              }`}
            ></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-neutral-500 font-medium">2025</div>
          </div>
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            expandedItems.has(3)
              ? "max-h-full opacity-100 blur-none"
              : "max-h-0 opacity-50 blur-[3px]"
          }`}
        >
          <div className="px-4 pt-4 pb-12">
            <div className="rounded-lg space-y-2">
              <div className="text-neutral-700 leading-loose">
                <p className="mb-4 last:mb-0">
                  Carbonio is a decentralized application for recording and verifying carbon emissions on the Solana blockchain, promoting transparency and accountability in sustainability efforts. It enables companies to register, upload carbon data, and undergo verification by third-party auditors, 
                  while consumers can scan QR codes to view verified footprints. 
                  Built with Next.js, TypeScript, Express, and Anchor smart contracts, 
                  Carbonio also uses IPFS (Pinata) and Supabase for storage and supports NFT creation via Metaplex. 
                  By offering portals for consumers, companies, and auditors, it fosters a multi-user ecosystem that tracks and incentivizes emission reduction.
                  You can see the <span><Link href="https://www.youtube.com/watch?v=zw4Lvjk2zxQ&t=13s" target='_blank' className="text-neutral-500 hover:underline">Demo Video</Link> </span> or visit 
                  my <span><Link href="https://github.com/levironexe/carbonio" target='_blank' className="text-neutral-500 hover:underline">GitHub</Link> to learn about the project.</span>
                </p>
                </div>
              <div  className="block rounded-xl bg-white p-1 border-[1px] border-neutral-200/80">
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
                  <source src="/videos/carbonio-demo-compressed.mp4" type="video/mp4" />
                </video>
                <Link href="https://carbonio.vercel.app" target="_blank" className="block w-full bg-neutral-200/80 text-center p-2 rounded-lg mt-1 font-medium text-[14px]">
                    View website
                </Link>
              </div>
              <Link href="https://www.youtube.com/watch?v=8x4Tx45qDmI" target="_blank" className="block rounded-xl bg-white p-1 border-[1px] border-neutral-200/80">
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
                  <source src="/videos/carbonio-pitch-compressed.mp4" type="video/mp4" />
                </video>
                <div className="block w-full bg-neutral-200/80 text-center p-2 rounded-lg mt-1 font-medium text-[14px]">
                    Learn more
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Project 5: ArtChainAI */}
      <div
        className={`max-w-4xl mx-auto flex flex-col gap-0 px-6 md:px-8 lg:px-10 space-y-2 transition-all duration-300 ease-out ${
          visibleItems.has(4) ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`py-4 px-4 flex justify-between items-center hover:bg-neutral-200 rounded-xl cursor-pointer transition-colors duration-200
                          ${expandedItems.has(4) && "bg-neutral-200"}`}
          onClick={() => toggleExpanded(4)}
          onMouseEnter={(e) => handleMouseEnter(e, 4)}
        >
          <div className="flex">
            <ScrambleText
              text1="ArtChainAI"
              text2="An AI-powered platform for Sui Agent Typhoon Hackathon 2025"
              delay={600}
              speed1={40}
              speed2={25}
              className1="font-medium"
              className2="text-neutral-500 hidden lg:block"
            />
          </div>
          <div className="flex-1 mx-4">
            <div
              className={`transition-all duration-1400 ease-out ${
                expandedLines.has(4)
                  ? "w-full bg-neutral-300 h-[0.8px]"
                  : "w-0 bg-neutral-500 h-[1.1px]"
              }`}
            ></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-neutral-500 font-medium">2025</div>
          </div>
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            expandedItems.has(4)
              ? "max-h-full opacity-100 blur-none"
              : "max-h-0 opacity-50 blur-[3px]"
          }`}
        >
          <div className="px-4 pt-4 pb-12">
            <div className="rounded-lg space-y-2">
              <div className="text-neutral-700 leading-loose">
                <p className="mb-3 last:mb-0">
                  ArtChain AI combines AI art generation with blockchain technology to empower artists and collectors in creating, trading, and owning unique digital artwork. Users can connect their wallets, choose from curated artistic styles, generate images using AI models, and mint NFTs on the SUI blockchain with automatic royalty distribution for contributing artists. The platform emphasizes artist-driven creation, blockchain verification, and fair compensation, while offering a gallery, studio tools, and NFT minting for seamless participation in the digital art economy. It positions itself as a future-forward ecosystem for creativity, ownership, and monetization of AI-assisted art.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project 6: GoBuy */}
      <div
        className={`max-w-4xl mx-auto flex flex-col gap-0 px-6 md:px-8 lg:px-10 space-y-2 transition-all duration-300 ease-out ${
          visibleItems.has(5) ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`py-4 px-4 flex justify-between items-center hover:bg-neutral-200 rounded-xl cursor-pointer transition-colors duration-200
                          ${expandedItems.has(5) && "bg-neutral-200"}`}
          onClick={() => toggleExpanded(5)}
          onMouseEnter={(e) => handleMouseEnter(e, 5)}
        >
          <div className="flex">
            <ScrambleText
              text1="GoBuy"
              text2="An SPA e-commercial web app in Vue3"
              delay={750}
              speed1={40}
              speed2={25}
              className1="font-medium"
              className2="text-neutral-500 hidden lg:block"
            />
          </div>
          <div className="flex-1 mx-4">
            <div
              className={`transition-all duration-1400 ease-out ${
                expandedLines.has(5)
                  ? "w-full bg-neutral-300 h-[0.8px]"
                  : "w-0 bg-neutral-500 h-[1.1px]"
              }`}
            ></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-neutral-500 font-medium">2025</div>
          </div>
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            expandedItems.has(5)
              ? "max-h-full opacity-100 blur-none"
              : "max-h-0 opacity-50 blur-[3px]"
          }`}
        >
          <div className="px-4 pt-4 pb-12">
            <div className="rounded-lg space-y-2">
              <div className="text-neutral-700 leading-loose">
                <p className="mb-3 last:mb-0">
                  GoBuy is a modern, multilingual marketplace built with Vue.js, Express.js, Supabase, and Tailwind CSS, designed for global accessibility with real-time language switching (English, Spanish, Vietnamese) and multi-currency support (10 currencies with live FastForex API integration).
                </p>
                <p className="mb-3 last:mb-0">
                  The platform provides full e-commerce functionality, including product listings with filtering, shopping cart management, checkout, and seller dashboards. It features user authentication via email/password, magic links, and Google OAuth, along with customizable user profiles.
                </p>
                <p className="mb-3 last:mb-0">
                  A strong emphasis on modern UI/UX ensures a responsive, polished experience with animations, loading skeletons, and instant translations. The backend REST API supports secure JWT authentication, Supabase-managed data, and smart caching for performance.
                </p>
                <p className="mb-3 last:mb-0">
                  Deployed on Vercel (frontend) and Render (backend), GoBuy demonstrates a scalable architecture for international online marketplaces, balancing accessibility, performance, and security.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project 7: BlockScan */}
      <div
        className={`max-w-4xl mx-auto flex flex-col gap-0 px-6 md:px-8 lg:px-10 space-y-2 transition-all duration-300 ease-out ${
          visibleItems.has(6) ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`py-4 px-4 flex justify-between items-center hover:bg-neutral-200 rounded-xl cursor-pointer transition-colors duration-200
                          ${expandedItems.has(6) && "bg-neutral-200"}`}
          onClick={() => toggleExpanded(6)}
          onMouseEnter={(e) => handleMouseEnter(e, 6)}
        >
          <div className="flex">
            <ScrambleText
              text1="BlockScan"
              text2="A platform for auditing Solidity smart contracts"
              delay={900}
              speed1={40}
              speed2={25}
              className1="font-medium"
              className2="text-neutral-500 hidden lg:block"
            />
          </div>
          <div className="flex-1 mx-4">
            <div
              className={`transition-all duration-1400 ease-out ${
                expandedLines.has(6)
                  ? "w-full bg-neutral-300 h-[0.8px]"
                  : "w-0 bg-neutral-500 h-[1.1px]"
              }`}
            ></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-neutral-500 font-medium">2024</div>
          </div>
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            expandedItems.has(6)
              ? "max-h-full opacity-100 blur-none"
              : "max-h-0 opacity-50 blur-[3px]"
          }`}
        >
          <div className="px-4 pt-4 pb-12">
            <div className="rounded-lg space-y-2">
              <div className="text-neutral-700 leading-loose">
                <p className="mb-3 last:mb-0">
                  BlockScan is a web-based platform focused on strengthening blockchain security by providing automated smart contract auditing tools. It leverages the Slither static analysis framework to detect vulnerabilities such as reentrancy, unchecked calls, and integer overflow. The system translates raw Slither output into user-friendly audit reports, complete with severity ratings and remediation guidance.
                </p>
                <p className="mb-3 last:mb-0">
                  The platform features a dashboard interface that gives users contract overviews, risk assessments, token details, and downloadable PDF reports. It also provides historical audit tracking, making it easy to compare improvements over time. Built with Next.js, Node.js, Supabase, and TailwindCSS, BlockScan offers both beginner-friendly usability and professional-grade analysis for developers and businesses deploying Solidity contracts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
