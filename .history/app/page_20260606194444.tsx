"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, PlayCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Text Animation
      gsap.from(".hero-word", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.2,
      });

      // Floating Cards Parallax
      gsap.to(".float-card-1", {
        y: -15,
        duration: 2.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(".float-card-2", {
        y: 10,
        duration: 3.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-surface overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full h-16 backdrop-blur-xl bg-surface/80 z-50 border-b border-border-soft flex items-center justify-between px-8">
        <div className="font-display font-bold text-xl tracking-tight text-text-primary">
          FlowSphere
        </div>
        <div className="flex items-center gap-6 text-sm font-medium text-text-secondary">
          <span className="hover:text-text-primary cursor-pointer transition-colors">Features</span>
          <span className="hover:text-text-primary cursor-pointer transition-colors">Pricing</span>
          <div className="w-[1px] h-4 bg-border"></div>
          <Link href="/login" className="text-text-primary hover:text-brand-500 transition-colors">Log in</Link>
          <Link href="/login" className="px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors shadow-sm">
            Get Started Free
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 h-screen">
        <div className="flex-1 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold uppercase tracking-wider mb-6">
            🚀 Now in Public Beta
          </div>
          <h1 className="text-display-2xl text-text-primary mb-6 overflow-hidden">
            <span className="hero-word inline-block">Ship</span>{" "}
            <span className="hero-word inline-block">projects</span>{" "}
            <span className="hero-word inline-block">faster,</span><br/>
            <span className="hero-word inline-block text-brand-500">together.</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-lg mb-8 leading-relaxed">
            FlowSphere combines task management, team chat, and real-time collaboration into one workspace your team will actually use.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/login" className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-medium transition-transform active:scale-95 shadow-md flex items-center gap-2">
              Start Free — No Credit Card <ArrowRight size={18} />
            </Link>
            <button className="px-6 py-3 bg-transparent text-text-primary hover:text-brand-500 font-medium transition-colors flex items-center gap-2 group">
              <PlayCircle size={20} className="group-hover:translate-x-1 transition-transform" />
              Watch 2-min Demo
            </button>
          </div>
        </div>

        {/* Mockup Right Side */}
        <div className="flex-1 relative w-full aspect-square max-w-[600px] hero-mockup">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-100 to-transparent rounded-full blur-3xl opacity-50"></div>
          
          {/* Main App Window Mockup */}
          <div className="relative z-10 w-full h-[400px] bg-surface border border-border shadow-float rounded-2xl overflow-hidden mt-12 flex flex-col">
            <div className="h-10 border-b border-border-soft bg-surface-raise flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-danger/80"></div>
              <div className="w-3 h-3 rounded-full bg-warning/80"></div>
              <div className="w-3 h-3 rounded-full bg-success/80"></div>
            </div>
            <div className="flex-1 p-6 bg-[url('/grid-pattern.svg')] opacity-20"></div> {/* Replace with actual image in production */}
          </div>

          {/* Floating UI Cards */}
          <div className="float-card-1 absolute top-4 -left-8 bg-surface border border-border-soft p-4 rounded-xl shadow-lg z-20 flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-success/20 text-success flex items-center justify-center">✓</div>
             <div>
               <p className="text-sm font-medium">API Integration</p>
               <p className="text-xs text-text-muted">Completed 2m ago</p>
             </div>
          </div>

          <div className="float-card-2 absolute bottom-24 -right-6 bg-surface border border-border-soft p-4 rounded-xl shadow-lg z-20 flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-danger animate-pulse"></div>
             <div>
               <p className="text-sm font-medium">Deadline in 2 hours</p>
               <p className="text-xs text-text-muted">Review UI Design</p>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}