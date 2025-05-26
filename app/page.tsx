"use client"

import type React from "react"

import { useState } from "react"
import { Leaf } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/components/ui/use-toast"
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function WelcomePage() {
  const router = useRouter()

  const handleWelcomeClick = () => {
    router.push('/login')
  }

  return (
    <div
      className="relative flex flex-col items-center justify-center h-screen bg-white cursor-pointer overflow-hidden"
    >
      {/* Background image and elements */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src="/inicio.png"
          alt="Welcome Image"
          layout="fill"
          objectFit="contain"
        />
      </div>

      {/* Text elements positioned absolutely relative to the container */}
      <div className="absolute top-[30%] text-center left-1/2 transform -translate-x-1/2">
        <h1 className="text-[30px] font-light text-[#D71334] drop-shadow-sm">Àṣẹ</h1>
      </div>

      <div className="absolute bottom-[28%] text-center left-1/2 transform -translate-x-1/2">
        <p className="text-[20px] font-medium text-[#D71334]">BEM VINDO</p>
        <p className="text-[15px] font-medium text-black mt-0.9 cursor-pointer" onClick={handleWelcomeClick}>CLIQUE AQUI</p>
      </div>
    </div>
  )
}
