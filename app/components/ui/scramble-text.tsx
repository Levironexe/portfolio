"use client"

import { useEffect, useState } from "react"

interface ScrambleTextProps {
  text1: string
  text2: string
  speed?: number
  scrambleSpeed?: number
  characters?: string
  className1?: string
  className2?: string
  onComplete?: () => void
  delay?: number
}

export function ScrambleText({
  text1,
  text2,
  speed = 16,
  scrambleSpeed = 10,
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
  const halfLength = Math.floor(totalLength / 5) //make it 4 cuz i want it

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

    const scrambleInterval = setInterval(() => {
      let newText1 = ""
      let newText2 = ""

      // Handle text1
      for (let i = 0; i < text1.length; i++) {
        if (i < halfLength) {
          // First half - show immediately without scrambling
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
        if (globalIndex < halfLength) {
          // First half - show immediately without scrambling
          newText2 += text2[i]
        } else if (globalIndex < currentIndex) {
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
    }, scrambleSpeed)

    const progressTimeout = setTimeout(() => {
      setCurrentIndex((prev) => prev + 1)
    }, speed)

    return () => {
      clearInterval(scrambleInterval)
      clearTimeout(progressTimeout)
    }
  }, [text1, text2, speed, scrambleSpeed, characters, currentIndex, onComplete, shouldStart, totalLength, halfLength])

  useEffect(() => {
    if (isComplete) {
      setDisplayText1(text1)
      setDisplayText2(text2)
    }
  }, [isComplete, text1, text2])

  // Initialize with first half of text immediately
  useEffect(() => {
    if (shouldStart) {
      setCurrentIndex(halfLength)
    }
  }, [shouldStart, halfLength])

  return (
    <span className="text-left">
      <span className={`flex gap-2 ${className1}`}>{displayText1} <span className={`font-normal ${className2}`}>{displayText2}</span></span>
    </span>
  )
}