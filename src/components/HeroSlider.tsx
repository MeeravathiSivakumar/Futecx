"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import "../app/home.css";
import React from "react";

type ButtonType = { text: string; href: string; icon?: string; className: string } | null;

type SlideType = {
  image: string;
  badgeIcon: string;
  badgeText: string;
  title: React.ReactNode;
  type: React.ReactNode;
  desc: React.ReactNode;
  button1: ButtonType;
  button2: ButtonType;
};

const SLIDES: SlideType[] = [
  {
    image: "/image/agent_os_new.jpg",
    badgeIcon: "fas fa-robot",
    badgeText: "Innovation",
    title: <>FUTECX <span className="text-info">AgentOS</span></>,
    type: "Autonomous Workflows",
    desc: "An advanced multi-model AI workspace for generative analytics.",
    button1: { text: "Discover AgentOS", href: "/products", icon: "fas fa-rocket", className: "btn-primary rounded-pill py-3 px-4 shadow" },
    button2: null
  },
  {
    image: "/image/home/slide-2-anniversary-new.jpg",
    badgeIcon: "fas fa-calendar-check",
    badgeText: "Event",
    title: <>3rd <span className="text-info">FUTECX</span><br />Anniversary</>,
    type: "27 Sep 2026 - 2027 • Thanjavur",
    desc: "Join us for the biggest tech meetup of the year.",
    button1: { text: "Get Updates", href: "#newsletter", icon: "fas fa-envelope-open-text", className: "btn-primary rounded-pill py-3 px-4 shadow" },
    button2: null
  },
  {
    image: "/image/home/slide-2.jpg",
    badgeIcon: "fas fa-users",
    badgeText: "Community",
    title: <><span className="text-info">200+</span> Intern Contributors</>,
    type: "Learning • Building • Shipping",
    desc: "Join an active tech community scaling skills globally.",
    button1: { text: "Join as Intern", href: "#join", icon: "fas fa-user-plus", className: "btn-primary rounded-pill py-3 px-4 shadow" },
    button2: null
  },
  {
    image: "/image/home/slide-4.png",
    badgeIcon: "fas fa-id-badge",
    badgeText: "Hiring",
    title: <>Join <span className="text-info">Core Team</span></>,
    type: "Interest Form Open",
    desc: "Looking for leaders in Dev, Cloud, and Design.",
    button1: { text: "Meet the Team", href: "/team", icon: "fas fa-users", className: "btn-primary rounded-pill py-3 px-4 shadow" },
    button2: null
  },
  {
    image: "/image/home/slide-5-achievements.jpg",
    badgeIcon: "fas fa-trophy",
    badgeText: "Highlights",
    title: <>Award-Winning <span className="text-info">Solutions</span></>,
    type: "Recognized for Excellence",
    desc: "Delivering real-time impact through AI-driven architecture.",
    button1: { text: "View Achievements", href: "/achievements", icon: "fas fa-award", className: "btn-primary rounded-pill py-3 px-4 shadow" },
    button2: null
  }
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  const go = useCallback((step: number) => {
    setIndex((prevIndex) => (prevIndex + step + SLIDES.length) % SLIDES.length);
  }, []);

  const setActive = (i: number) => {
    setIndex(i);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      go(1);
    }, 8000);
    return () => clearInterval(timer);
  }, [go, index]);

  return (
    <header>
      <div className="slider" id="heroSlider">
        <div className="list">
          {SLIDES.map((slide, i) => (
            <div key={i} className={`item ${i === index ? "active" : ""}`}>
              <img src={slide.image} alt="Slide Image" style={{ filter: "brightness(60%)" }} />
              
              {/* Watermark Obscurer */}
              <div style={{ position: "absolute", bottom: 0, right: 0, width: "120px", height: "80px", background: "inherit", backdropFilter: "blur(10px)", zIndex: 1 }}></div>

              <div className="overlay" style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%), linear-gradient(0deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0) 35%)", zIndex: 1 }}></div>
              <div className="content" style={{ position: "absolute", left: "90px", right: "auto", padding: "0 5vw", margin: 0, maxWidth: "750px", textAlign: "left", zIndex: 2, top: "45%", transform: "translateY(-50%)" }}>
                {slide.badgeText && (
                  <span className="badge mb-3 shadow-sm">
                    <i className={`${slide.badgeIcon} me-2`}></i>{slide.badgeText}
                  </span>
                )}
                <h1 className="title display-2 fw-black"  style={{ fontSize: "clamp(34px, 4.5vw, 56px)", lineHeight: "1.1", wordBreak: "break-word" }}>{slide.title}</h1>
                <div className="type" style={{ fontSize: "1.1rem", marginTop: "10px" }}>{slide.type}</div>
                <div className="description" style={{ fontSize: "1.1rem", marginTop: "10px", marginBottom: "25px", opacity: 0.85 }}>{slide.desc}</div>
                <div className="hero-buttons mt-4">
                  {slide.button1 && (
                    <Link href={slide.button1.href} className={`btn ${slide.button1.className}`}>
                      {slide.button1.icon && <i className={`${slide.button1.icon} me-2`}></i>}
                      {slide.button1.text}
                    </Link>
                  )}
                  {slide.button2 && (
                    <Link href={slide.button2.href} className={`btn ${slide.button2.className}`}>
                      {(slide.button2 as any).icon && <i className={`${(slide.button2 as any).icon} me-2`}></i>}
                      {slide.button2.text}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modern Indicators with Images */}
        <div className="slider-indicators">
          {SLIDES.map((slide, i) => (
            <div 
              key={i} 
              className={`indicator-item ${i === index ? "active" : ""}`} 
              onClick={() => setActive(i)}
            >
              {/* Image Box */}
              <div className="indicator-img-box mb-3">
                <img src={slide.image} alt={slide.badgeText} />
                <div className="indicator-img-overlay"></div>
                <div className="indicator-number-overlay">0{i + 1}</div>
              </div>
              
              <div className="indicator-title text-truncate">{slide.badgeText || "Slide"}</div>
              
              <div className="indicator-bar mt-2">
                 <div className="indicator-progress"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <div className="nextPrevArrows">
          <button className="prev" onClick={() => go(-1)} aria-label="Previous">
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button className="next" onClick={() => go(1)} aria-label="Next">
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </header>
  );
}


