'use client'

import React from 'react'
import { FaGitAlt, FaGithub, FaHome } from 'react-icons/fa'
import { SiSourcetree, SiVercel, SiFirebase } from 'react-icons/si'
import { BiCodeCurly } from 'react-icons/bi'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6f8fc] to-[#e9edf5] dark:from-[#0a0a0f] dark:to-[#1a1a2f]">
      {/* Home Icon */}
      <div className="fixed top-6 left-6 z-50">
        <Link href="/" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
          <FaHome className="w-6 h-6" />
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl font-bold text-gray-700 dark:text-gray-200 mb-6">
              개발자 매뉴얼
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-light">
              효율적인 개발 워크플로우를 위한 모든 것을 담았습니다.
            </p>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Cursor Card */}
          <Link href="/cursor" className="group">
            <div className="relative h-[240px] bg-white/70 dark:bg-[#1f2937]/70 backdrop-blur-lg rounded-3xl shadow-lg transition-all duration-300 overflow-hidden hover:scale-[1.02] hover:shadow-xl border border-white/20">
              <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-90 transition-all duration-300">
                <BiCodeCurly className="w-36 h-36 text-purple-500" />
              </div>
              <div className="relative h-full p-6 flex flex-col justify-end bg-gradient-to-t from-white/95 via-white/80 to-transparent dark:from-[#1f2937]/95 dark:via-[#1f2937]/80 dark:to-transparent">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Cursor</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">AI 기반 코드 에디터로 생산성을 높여보세요.</p>
              </div>
            </div>
          </Link>

          {/* Vercel Card */}
          <Link href="/vercel" className="group">
            <div className="relative h-[240px] bg-white/70 dark:bg-[#1f2937]/70 backdrop-blur-lg rounded-3xl shadow-lg transition-all duration-300 overflow-hidden hover:scale-[1.02] hover:shadow-xl border border-white/20">
              <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-90 transition-all duration-300">
                <SiVercel className="w-36 h-36 text-gray-900 dark:text-white" />
              </div>
              <div className="relative h-full p-6 flex flex-col justify-end bg-gradient-to-t from-white/95 via-white/80 to-transparent dark:from-[#1f2937]/95 dark:via-[#1f2937]/80 dark:to-transparent">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Vercel</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">웹 애플리케이션을 손쉽게 배포하고 관리하세요.</p>
              </div>
            </div>
          </Link>

          {/* Firebase Card */}
          <Link href="/firebase" className="group">
            <div className="relative h-[240px] bg-white/70 dark:bg-[#1f2937]/70 backdrop-blur-lg rounded-3xl shadow-lg transition-all duration-300 overflow-hidden hover:scale-[1.02] hover:shadow-xl border border-white/20">
              <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-90 transition-all duration-300">
                <SiFirebase className="w-36 h-36 text-yellow-500" />
              </div>
              <div className="relative h-full p-6 flex flex-col justify-end bg-gradient-to-t from-white/95 via-white/80 to-transparent dark:from-[#1f2937]/95 dark:via-[#1f2937]/80 dark:to-transparent">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Firebase</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">강력한 백엔드 서비스로 앱을 구축하세요.</p>
              </div>
            </div>
          </Link>

          {/* SourceTree Card */}
          <Link href="/sourcetree" className="group">
            <div className="relative h-[240px] bg-white/70 dark:bg-[#1f2937]/70 backdrop-blur-lg rounded-3xl shadow-lg transition-all duration-300 overflow-hidden hover:scale-[1.02] hover:shadow-xl border border-white/20">
              <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-90 transition-all duration-300">
                <SiSourcetree className="w-36 h-36 text-blue-500" />
              </div>
              <div className="relative h-full p-6 flex flex-col justify-end bg-gradient-to-t from-white/95 via-white/80 to-transparent dark:from-[#1f2937]/95 dark:via-[#1f2937]/80 dark:to-transparent">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">SourceTree</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">Git GUI 클라이언트로 시각적인 버전 관리를 경험해보세요.</p>
              </div>
            </div>
          </Link>

          {/* GitHub Card */}
          <Link href="/github" className="group">
            <div className="relative h-[240px] bg-white/70 dark:bg-[#1f2937]/70 backdrop-blur-lg rounded-3xl shadow-lg transition-all duration-300 overflow-hidden hover:scale-[1.02] hover:shadow-xl border border-white/20">
              <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-90 transition-all duration-300">
                <FaGithub className="w-36 h-36 text-gray-900 dark:text-white" />
              </div>
              <div className="relative h-full p-6 flex flex-col justify-end bg-gradient-to-t from-white/95 via-white/80 to-transparent dark:from-[#1f2937]/95 dark:via-[#1f2937]/80 dark:to-transparent">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">GitHub</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">효과적인 팀 협업을 위한 GitHub 사용법을 배워보세요.</p>
              </div>
            </div>
          </Link>

          {/* Git Card */}
          <Link href="/git" className="group">
            <div className="relative h-[240px] bg-white/70 dark:bg-[#1f2937]/70 backdrop-blur-lg rounded-3xl shadow-lg transition-all duration-300 overflow-hidden hover:scale-[1.02] hover:shadow-xl border border-white/20">
              <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-90 transition-all duration-300">
                <FaGitAlt className="w-36 h-36 text-orange-500" />
              </div>
              <div className="relative h-full p-6 flex flex-col justify-end bg-gradient-to-t from-white/95 via-white/80 to-transparent dark:from-[#1f2937]/95 dark:via-[#1f2937]/80 dark:to-transparent">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Git</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">버전 관리 시스템의 기본 사용법과 고급 기능을 알아봅니다.</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
} 