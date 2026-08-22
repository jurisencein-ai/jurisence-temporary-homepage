"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AbsorptionAnimation } from "@/components/absorption-animation"

export default function WaitlistHero() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const words = [
    "Next-Gen",
    "future-ready",
    "intelligent",
    "digital",
    "innovative",
  ]

  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const currentWord = words[currentWordIndex]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      setStatus("error")
      setMessage("Please enter a valid email address")
      return
    }

    setStatus("loading")

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          source: "landing",
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage("You're on the Jurisence list.")
        setEmail("")

        setTimeout(() => {
          setStatus("idle")
          setMessage("")
        }, 5000)
      } else {
        setStatus("error")
        setMessage(data.error || "Something went wrong. Please try again.")
      }
    } catch (error) {
      setStatus("error")
      setMessage("Something went wrong. Please try again.")
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-visible">

      {/* Background Space Scene */}
      <div className="absolute inset-0 bg-[var(--color-bg-0)]">

        {/* Animated glow orbs */}
        <div
          className="glow-orb absolute top-1/4 left-1/2 w-[600px] h-[600px] rounded-full blur-[120px]"
          style={{
            transform: "translate(-50%, -50%)",
            backgroundColor: "var(--color-glow-1)",
          }}
        />

        <div
          className="glow-orb absolute bottom-1/3 left-1/3 w-[500px] h-[500px] rounded-full blur-[100px]"
          style={{
            animationDelay: "-7s",
            backgroundColor: "var(--color-glow-2)",
          }}
        />

        {/* Planet horizon */}
        <div className="absolute -bottom-[40%] left-1/2 -translate-x-1/2 w-[140%] h-[60%]">
          <div className="relative w-full h-full">

            {/* Planet body */}
            <div
              className="absolute inset-0 rounded-[50%] bg-gradient-to-b"
              style={{
                backgroundImage:
                  `linear-gradient(to bottom, var(--color-bg-1), var(--color-bg-0))`,
              }}
            />

            {/* Atmospheric rim light */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-white to-transparent opacity-30 blur-sm" />

            <div
              className="absolute top-0 left-0 right-0 h-[40px] bg-gradient-to-b from-transparent to-transparent opacity-20 blur-xl"
              style={{
                backgroundImage:
                  `linear-gradient(to bottom, var(--color-glow-2), transparent)`,
              }}
            />
          </div>
        </div>

        {/* Orb */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-[2250px] h-[2250px]"
          style={{ bottom: "calc(-50% - 900px)" }}
        >
          <img
            src="/images/orb.png"
            alt=""
            className="w-full h-full object-contain animate-orb-rotate"
          />
        </div>

        {/* Absorption Animation */}
        <div className="absolute inset-0 opacity-30">
          <AbsorptionAnimation shape="circle" />
        </div>

        {/* Grain overlay */}
        <div
          className="grain absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage:
              `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              `radial-gradient(circle, transparent, transparent, var(--color-bg-0))`,
          }}
        />
      </div>

      {/* Content Stage */}
      <div className="relative z-10 w-full max-w-[680px]">

        <div className="flex flex-col items-center text-center space-y-6">

          {/* Jurisence Logo */}
          <div className="flex justify-center mb-1">
            <img
              src="/images/jurisence-logo.png"
              alt="Jurisence"
              className="w-[280px] sm:w-[340px] md:w-[400px] h-auto object-contain"
            />
          </div>

          {/* Launching Soon Badge */}
          <div
            className="inline-flex items-center h-[28px] px-3 rounded-full border backdrop-blur-sm"
            style={{
              borderColor: "var(--color-stroke)",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
            }}
          >
            <span
              className="text-[13px] font-medium"
              style={{ color: "var(--color-text-1)" }}
            >
              JURISENCE • LAUNCHING SOON
            </span>
          </div>

          {/* Main Heading */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[84px] font-bold leading-[1.05] tracking-tight"
            style={{
              color: "var(--color-text-0)",
              textShadow: "0 1px 18px var(--color-shadow)",
            }}
          >
            The Algorithm for{" "}

            <span
              className="font-serif italic font-normal inline-block"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              <AnimatePresence mode="wait">

                <motion.span
                  key={currentWord}
                  className="inline-block"
                >
                  {currentWord.split("").map((char, index) => (
                    <motion.span
                      key={`${currentWord}-${index}`}
                      initial={{
                        opacity: 0,
                        y: 20,
                        filter: "blur(8px)",
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                      }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.03,
                        ease: [0.21, 0.47, 0.32, 0.98],
                      }}
                      style={{
                        display: "inline-block",
                      }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </motion.span>

              </AnimatePresence>
            </span>

            <br />

            Legal Minds.
          </h1>

          {/* Supporting Copy */}
          <p
            className="text-[15px] sm:text-base max-w-[520px] leading-relaxed"
            style={{ color: "var(--color-text-1)" }}
          >
            A new generation of legal technology is taking shape at the
            intersection of Law × AI × Technology.
          </p>
{/* Queries / Contact */}
<a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=jurisence.in@gmail.com"
  target="_blank"
  rel="noopener noreferrer"
  className="w-full max-w-[480px] rounded-xl border p-4 sm:p-5 text-left transition-all hover:-translate-y-[1px] hover:bg-white/5 hover:shadow-lg"
  style={{
    borderColor: "var(--color-stroke)",
    backgroundColor: "rgba(0, 0, 0, 0.55)",
  }}
>
  <div className="flex items-center justify-between gap-4">

    <div>
      <p
        className="text-base sm:text-lg font-semibold"
        style={{ color: "var(--color-text-0)" }}
      >
        Have any queries?
      </p>

      <p
        className="mt-1 text-sm"
        style={{ color: "var(--color-text-1)" }}
      >
        Mail us at jurisence.in@gmail.com
      </p>
    </div>

    <span
      className="shrink-0 text-xl"
      style={{ color: "var(--color-text-0)" }}
    >
      ↗
    </span>

  </div>
</a>
          {/* Waitlist Form */}
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-[480px] mt-2 flex justify-center"
          >
            <div className="relative w-full -translate-y-1">

              {/* Mobile Layout */}
              <div className="flex flex-col gap-3 sm:hidden">

                <Input
                  type="email"
                  placeholder="Enter your email for launch updates"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={
                    status === "loading" ||
                    status === "success"
                  }
                  className="w-full pr-4 text-white placeholder:opacity-100 h-14 rounded-xl"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 1)",
                    borderColor: "var(--color-stroke)",
                    color: "white",
                  }}
                />

                <Button
                  type="submit"
                  disabled={
                    status === "loading" ||
                    status === "success"
                  }
                  className="w-full px-6 bg-white hover:bg-gray-100 text-[#0B0B0F] font-semibold transition-all hover:-translate-y-[1px] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed h-12 rounded-xl"
                >
                  {status === "loading"
                    ? "Joining..."
                    : status === "success"
                      ? "Joined!"
                      : "Notify Me"}
                </Button>

              </div>

              {/* Desktop Layout */}
              <motion.div
                className="relative hidden sm:block"
                animate={{
                  width:
                    status === "success"
                      ? "200px"
                      : "100%",
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                style={{
                  margin: "0 auto",
                }}
              >

                <AnimatePresence>

                  {status !== "success" && (
                    <motion.div
                      initial={{
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.8,
                        width: 0,
                      }}
                      transition={{
                        duration: 0.4,
                        ease: [0.21, 0.47, 0.32, 0.98],
                      }}
                    >

                      <Input
                        type="email"
                        placeholder="Enter your email for launch updates"
                        value={email}
                        onChange={(e) =>
                          setEmail(e.target.value)
                        }
                        disabled={
                          status === "loading" ||
                          status === "success"
                        }
                        className="w-full pr-[140px] text-white placeholder:opacity-100 h-14 rounded-xl"
                        style={{
                          backgroundColor: "rgba(0, 0, 0, 1)",
                          borderColor: "var(--color-stroke)",
                          color: "white",
                        }}
                      />

                    </motion.div>
                  )}

                </AnimatePresence>

                <motion.div
                  className="absolute top-1"
                  animate={{
                    right:
                      status === "success"
                        ? "0"
                        : "4px",

                    left:
                      status === "success"
                        ? "0"
                        : "auto",

                    width:
                      status === "success"
                        ? "100%"
                        : "auto",
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                >

                  <Button
                    type="submit"
                    disabled={
                      status === "loading" ||
                      status === "success"
                    }
                    className="w-full px-6 bg-white hover:bg-gray-100 text-[#0B0B0F] font-semibold transition-all hover:-translate-y-[1px] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed h-12 rounded-xl"
                  >
                    {status === "loading"
                      ? "Joining..."
                      : status === "success"
                        ? "Joined!"
                        : "Notify Me"}
                  </Button>

                </motion.div>

              </motion.div>

            </div>
          </form>

          {/* Form Status Message */}
          {message && (
            <p
              className="text-sm -mt-3"
              style={{
                color:
                  status === "error"
                    ? "#ff6b6b"
                    : "var(--color-text-1)",
              }}
            >
              {message}
            </p>
          )}

          {/* Social Links */}
          {/* Social Links */}
<div className="pt-5 flex flex-wrap items-center justify-center gap-3 text-sm">

  {/* Instagram */}
  <a
    href="https://www.instagram.com/jurisence/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
    className="flex items-center gap-2 px-4 py-2 rounded-full border transition-all hover:bg-white/10 hover:-translate-y-[1px]"
    style={{
      borderColor: "var(--color-stroke)",
      color: "var(--color-text-1)",
    }}
  >
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="17.5"
        cy="6.5"
        r="1"
        fill="currentColor"
      />
    </svg>

    Instagram
  </a>


  {/* LinkedIn */}
  <a
    href="https://www.linkedin.com/company/jurisence/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn"
    className="flex items-center gap-2 px-4 py-2 rounded-full border transition-all hover:bg-white/10 hover:-translate-y-[1px]"
    style={{
      borderColor: "var(--color-stroke)",
      color: "var(--color-text-1)",
    }}
  >
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6.5 8.5H3V21h3.5V8.5ZM4.75 3C3.65 3 3 3.75 3 4.75S3.65 6.5 4.75 6.5 6.5 5.75 6.5 4.75 5.85 3 4.75 3ZM21 13.85C21 10.2 19.05 8.5 16.45 8.5c-1.75 0-2.85.95-3.35 1.6v-1.6H9.6V21h3.5v-6.2c0-1.65.3-3.25 2.35-3.25 2.05 0 2.05 1.9 2.05 3.35V21H21v-7.15Z" />
    </svg>

    LinkedIn
  </a>


  {/* YouTube */}
  <a
    href="https://youtube.com/@jurisence-in"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="YouTube"
    className="flex items-center gap-2 px-4 py-2 rounded-full border transition-all hover:bg-white/10 hover:-translate-y-[1px]"
    style={{
      borderColor: "var(--color-stroke)",
      color: "var(--color-text-1)",
    }}
  >
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.55 3.5 12 3.5 12 3.5s-7.55 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.85.6 9.4.6 9.4.6s7.55 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.9V8.1l6.8 3.9-6.8 3.9Z" />
    </svg>

    YouTube
  </a>

</div>

          

          {/* Email */}
          <a
            href="mailto:jurisence.in@gmail.com"
            className="text-xs transition-opacity hover:opacity-70"
            style={{
              color: "var(--color-text-1)",
            }}
          >
           
          </a>

          {/* Tagline */}
          <p
            className="text-xs"
            style={{
              color: "var(--color-text-1)",
            }}
          >
            Law × AI × Technology
          </p>

        </div>
      </div>
    </div>
  )
}