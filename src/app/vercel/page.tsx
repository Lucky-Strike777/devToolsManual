'use client'

import React from 'react'
import { FaHome } from 'react-icons/fa'
import Link from 'next/link'

export default function VercelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6f8fc] to-[#e9edf5] dark:from-[#0a0a0f] dark:to-[#1a1a2f] p-8">
      <Link href="/" className="fixed top-6 left-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
        <FaHome className="w-6 h-6" />
      </Link>
      <div className="max-w-4xl mx-auto pt-20">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Vercel 배포 가이드</h1>
        <div className="prose prose-lg dark:prose-invert">
          <p>페이지 준비 중입니다.</p>
        </div>
      </div>
    </div>
  )
} 