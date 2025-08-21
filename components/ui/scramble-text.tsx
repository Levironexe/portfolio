"use client"

import { useEffect, useState } from "react"

interface ScrambleTextProps {
  text1: string
  text2: string
  speed1?: number
  speed2?: number
  scrambleSpeed1?: number
  scrambleSpeed2?: number
  characters?: string
  className1?: string
  className2?: string
  onComplete?: () => void
  delay?: number
}

export function ScrambleText({
  text1,
  text2,
  speed1 = 60 * 0.4,     // 2x faster: was 0.8, now 0.4
  speed2 = 30 * 0.25,    // 2x faster: was 0.5, now 0.25
  scrambleSpeed1 = 20 * 0.4,   // 2x faster: was 0.8, now 0.4
  scrambleSpeed2 = 10 * 0.25,  // 2x faster: was 0.5, now 0.25
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?",
  className1 = "",
  className2 = "",
  onComplete,
  delay = 0,
}: ScrambleTextProps) {
  const [displayText1, setDisplayText1] = useState("")
  const [displayText2, setDisplayText2] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [shouldStart, setShouldStart] = useState(false)

  const totalLength = text1.length + text2.length
  const text1HalfLength = Math.floor(text1.length / 2)
  const startIndex = text1HalfLength

  // Delayed easing - stays fast until 70% through, then slows dramatically
  const easeOut = (t: number) => {
    if (t < 0.7) return 0 // Stay at fast speed for first 70%
    const adjustedT = (t - 0.7) / 0.3 // Map 0.7-1.0 to 0-1
    return Math.pow(adjustedT, 2) // Quadratic curve for final 30%
  }

  // Get eased speed based on current position and base speeds
  const getEasedSpeed = (baseSpeedFast: number, baseSpeedSlow: number, progress: number) => {
    const easedProgress = easeOut(progress)
    return baseSpeedFast + (baseSpeedSlow - baseSpeedFast) * easedProgress
  }

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      setShouldStart(true)
    }, delay)

    return () => clearTimeout(delayTimeout)
  }, [delay])

  useEffect(() => {
    if (!shouldStart) return

    if (currentIndex >= totalLength) {
      setIsComplete(true)
      onComplete?.()
      return
    }

    // Calculate progress within current text section
    let progress = 0
    let currentScrambleSpeed = scrambleSpeed1
    let currentProgressSpeed = speed1

    if (currentIndex < text1.length) {
      // Text1 section
      const text1Progress = Math.max(0, (currentIndex - startIndex) / (text1.length - startIndex))
      progress = Math.min(1, text1Progress)
      currentScrambleSpeed = getEasedSpeed(scrambleSpeed1, scrambleSpeed1 * 4, progress) // 4x slower at end
      currentProgressSpeed = getEasedSpeed(speed1, speed1 * 4, progress)
    } else {
      // Text2 section
      const text2Progress = (currentIndex - text1.length) / text2.length
      progress = Math.min(1, text2Progress)
      currentScrambleSpeed = getEasedSpeed(scrambleSpeed2, scrambleSpeed2 * 4, progress)
      currentProgressSpeed = getEasedSpeed(speed2, speed2 * 4, progress)
    }

    const scrambleInterval = setInterval(() => {
      let newText1 = ""
      let newText2 = ""

      // Handle text1
      for (let i = 0; i < text1.length; i++) {
        if (i < text1HalfLength) {
          // First half of text1 - show immediately
          newText1 += text1[i]
        } else if (i < currentIndex) {
          // Character is settled
          newText1 += text1[i]
        } else if (i === currentIndex) {
          // Character is being scrambled
          if (text1[i] === " ") {
            newText1 += " "
          } else {
            newText1 += characters[Math.floor(Math.random() * characters.length)]
          }
          break
        }
      }

      // Handle text2
      const text2StartIndex = text1.length
      for (let i = 0; i < text2.length; i++) {
        const globalIndex = text2StartIndex + i
        if (globalIndex < currentIndex) {
          // Character is settled
          newText2 += text2[i]
        } else if (globalIndex === currentIndex) {
          // Character is being scrambled
          if (text2[i] === " ") {
            newText2 += " "
          } else {
            newText2 += characters[Math.floor(Math.random() * characters.length)]
          }
          break
        }
      }

      setDisplayText1(newText1)
      setDisplayText2(newText2)
    }, currentScrambleSpeed)

    const progressTimeout = setTimeout(() => {
      setCurrentIndex((prev) => prev + 1)
    }, currentProgressSpeed)

    return () => {
      clearInterval(scrambleInterval)
      clearTimeout(progressTimeout)
    }
  }, [text1, text2, speed1, speed2, scrambleSpeed1, scrambleSpeed2, characters, currentIndex, onComplete, shouldStart, totalLength, startIndex])

  useEffect(() => {
    if (isComplete) {
      setDisplayText1(text1)
      setDisplayText2(text2)
    }
  }, [isComplete, text1, text2])

  // Initialize with first half of text1 and start from half point
  useEffect(() => {
    if (shouldStart) {
      // Show first half of text1 immediately, text2 starts empty
      setDisplayText1(text1.slice(0, text1HalfLength))
      setDisplayText2("")
      setCurrentIndex(startIndex)
    }
  }, [shouldStart, text1HalfLength, startIndex, text1])

  return (
    <span className="text-left">
      <span className={`flex gap-2 ${className1}`}>
        {displayText1} 
        <span className={`font-normal ${className2}`}>{displayText2}</span>
      </span>
    </span>
  )
}