"use client"
import Link from "next/link"
import type React from "react"

import { useEffect, useState, useRef } from "react"

const page = () => {
  const [isLoadedWithDelay, setIsLoadedWithDelay] = useState(false)
  const [expandedItems, setExpandedItems] = useState(new Set())
  const [activeItem, setActiveItem] = useState<number | null>(null)
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadedWithDelay(true)
    }, 250)

    return () => clearTimeout(timer)
  }, [])

  const toggleExpanded = (index: any) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>, itemIndex: number) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const containerRect = containerRef.current?.getBoundingClientRect()

    if (containerRect) {
      setDotPosition({
        x: rect.left - containerRect.left - 16,
        y: rect.top - containerRect.top + rect.height / 2,
      })
    }

    setActiveItem(itemIndex)
  }

  const contents = [
    {
      name: "itealab.vercel.com",
      subtitle: "The homepage for Itea Lab - a coding community",
      description:
        "The Itea Lab homepage is also a modern and responsive website built with Next.js and Tailwind CSS to showcase the activities of the Itea Lab coding community. It highlights community projects, event listings, and member profiles while leveraging server-side rendering for improved performance and SEO. Designed as both an information hub and a community portal, it provides a sleek, accessible platform for developers to connect and collaborate.",
      link: "https://github.com/Levironexe/itealab-static-web",
      webUrl: "https://itealab.vercel.app",
      year: "2025",
    },
    {
      name: "SentinelAI",
      subtitle: "An AI-powered tool for auditing PCI DSS compliance",
      description:
        "SentinelAI is an AI-powered compliance automation framework designed to streamline PCI DSS v4.0 audits for financial institutions, built during the VPBank Hackathon 2025. By integrating Amazon Bedrock AI (Claude 3.5 Sonnet), AWS Config, CloudTrail, Security Hub, and Aurora PostgreSQL, it automates evidence collection, compliance evaluation, and report generation across 200+ AWS accounts. \nThe framework eliminates manual auditing by offering real-time dashboards, AI audit agents, cross-framework mapping, intelligent risk prioritization, and multi-format reporting. Its modular architecture includes an AI agent orchestrator, evidence collector, RAG-based knowledge base, and frontend compliance portal. With up to 90% faster evidence collection and 80% less prep time, SentinelAI demonstrates enterprise scalability, cost savings, and adaptive learning for long-term compliance management.",
      link: "https://github.com/ngna3007/sentinelai-audit-framework",
      webUrl: "",
      year: "2025",
    },
    {
      name: "LongChau-PMS",
      subtitle: "A management system solution for Long Chau Pharmacy supply chain",
      description:
        "A proof-of-concept full-stack pharmacy platform built with Next.js, Django, and PostgreSQL, designed to mimic real-world pharmacy chain operations. It provides multi-role access (staff, pharmacists, customers, managers) with features for orders, prescriptions, inventory, deliveries, reporting, and loyalty programs, all optimized for Vietnamese business workflows.",
      link: "https://github.com/Levironexe/LongChau-PMS",
      webUrl: "",
      year: "2025",
    },
    {
      name: "carbonio",
      subtitle: "A project for SOLANA x SWINBURNE Hackathon 2025",
      description:
        "Carbonio is a decentralized application for recording and verifying carbon emissions on the Solana blockchain, promoting transparency and accountability in sustainability efforts. It enables companies to register, upload carbon data, and undergo verification by third-party auditors, while consumers can scan QR codes to view verified footprints. Built with Next.js, TypeScript, Express, and Anchor smart contracts, Carbonio also uses IPFS (Pinata) and Supabase for storage and supports NFT creation via Metaplex. By offering portals for consumers, companies, and auditors, it fosters a multi-user ecosystem that tracks and incentivizes emission reduction.",
      link: "https://github.com/Levironexe/carbonio",
      webUrl: "https://carbonio.vercel.app",
      year: "2025",
    },
    {
      name: "ArtChainAI",
      subtitle: "An AI-powered platform for Sui Agent Typhoon Hackathon 2025",
      description:
        "ArtChain AI combines AI art generation with blockchain technology to empower artists and collectors in creating, trading, and owning unique digital artwork. Users can connect their wallets, choose from curated artistic styles, generate images using AI models, and mint NFTs on the SUI blockchain with automatic royalty distribution for contributing artists. The platform emphasizes artist-driven creation, blockchain verification, and fair compensation, while offering a gallery, studio tools, and NFT minting for seamless participation in the digital art economy. It positions itself as a future-forward ecosystem for creativity, ownership, and monetization of AI-assisted art.",
      link: "https://github.com/Levironexe/carbonio",
      webUrl: "https://art-chain-ai-delta.vercel.app/",
      year: "2025",
    },
    {
      name: "GoBuy",
      subtitle: "An SPA e-commercial web app in Vue3",
      description:
        "GoBuy is a modern, multilingual marketplace built with Vue.js, Express.js, Supabase, and Tailwind CSS, designed for global accessibility with real-time language switching (English, Spanish, Vietnamese) and multi-currency support (10 currencies with live FastForex API integration). \nThe platform provides full e-commerce functionality, including product listings with filtering, shopping cart management, checkout, and seller dashboards. It features user authentication via email/password, magic links, and Google OAuth, along with customizable user profiles. \nA strong emphasis on modern UI/UX ensures a responsive, polished experience with animations, loading skeletons, and instant translations. The backend REST API supports secure JWT authentication, Supabase-managed data, and smart caching for performance. \nDeployed on Vercel (frontend) and Render (backend), GoBuy demonstrates a scalable architecture for international online marketplaces, balancing accessibility, performance, and security.",
      link: "https://github.com/Levironexe/carbonio",
      year: "2025",
    },
    {
      name: "BlockScan",
      subtitle: "A platform for auditing Solidity smart contracts",
      description:
        "BlockScan is a web-based platform focused on strengthening blockchain security by providing automated smart contract auditing tools. It leverages the Slither static analysis framework to detect vulnerabilities such as reentrancy, unchecked calls, and integer overflow. The system translates raw Slither output into user-friendly audit reports, complete with severity ratings and remediation guidance. \nThe platform features a dashboard interface that gives users contract overviews, risk assessments, token details, and downloadable PDF reports. It also provides historical audit tracking, making it easy to compare improvements over time. Built with Next.js, Node.js, Supabase, and TailwindCSS, BlockScan offers both beginner-friendly usability and professional-grade analysis for developers and businesses deploying Solidity contracts.",
      link: "https://github.com/Levironexe/carbonio",
      webUrl: "https://blockscan-sooty.vercel.app",
      year: "2024",
    },
  ]

  return (
    <div
      ref={containerRef}
      className="bg-neutral-100 w-full min-h-screen py-[calc(20vh+21.875px)] text-[#0a0a0a] text-sm selection:bg-purple-600 selection:text-white relative"
    >
      <div
        className={`absolute w-3 h-3 left-0 bg-purple-600 rounded-full pointer-events-none transition-all duration-300 ease-out transform -translate-x-1/2 -translate-y-1/2 z-50 ${
          activeItem !== null ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
        style={{
          left: `${dotPosition.x}px`,
          top: `${dotPosition.y}px`,
        }}
      />

      <div className="flex flex-col items-center justify-center pt-20 md:pt-0"></div>
      {contents.map((content, index) => (
        <div key={index} className="max-w-5xl mx-auto flex flex-col gap-2 px-6 md:px-8 lg:px-10">
          <div
            className={`py-4 px-4 flex justify-between items-center hover:bg-neutral-200 rounded-xl cursor-pointer transition-colors duration-200
                            ${expandedItems.has(index) && "bg-neutral-200"}`}
            onClick={() => toggleExpanded(index)}
            onMouseEnter={(e) => handleMouseEnter(e, index)}
          >
            <div className="flex gap-2">
              <div className="font-semibold">{content.name}</div>
              <div className="text-neutral-500 hidden lg:block">{content.subtitle}</div>
            </div>
            <div className="flex-1 mx-4">
              <div className="w-full bg-neutral-300" style={{ height: "0.7px" }}></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-neutral-500">{content.year}</div>
            </div>
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              expandedItems.has(index) ? "max-h-96 opacity-100 blur-none" : "max-h-0 opacity-50 blur-[3px]"
            }`}
          >
            <div className="px-4 pt-4 pb-12">
              <div className="rounded-lg ">
                <div className="text-neutral-700 leading-loose mb-4">
                  {content.description.split("\n").map((paragraph, idx) => (
                    <p key={idx} className="mb-3 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="flex flex-col gap-3 flex-wrap">
                  {content.link && (
                    <Link href={content.link} target="_blank" className="inline-flex items-center py-1.5">
                      <span className="hover:underline duration-200 transition-all ease-in-out">{content.link}</span>
                    </Link>
                  )}
                  {content.webUrl && (
                    <Link
                      href={content.webUrl.startsWith("http") ? content.webUrl : `https://${content.webUrl}`}
                      target="_blank"
                      className="inline-flex items-center py-1.5"
                    >
                      <span className="hover:underline duration-200 transition-all ease-in-out">{content.webUrl}</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default page
