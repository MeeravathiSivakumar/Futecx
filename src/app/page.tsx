"use client";

import React, { useEffect, useRef } from "react";
import HeroSlider from "@/components/HeroSlider";
import Link from "next/link";
import confetti from "canvas-confetti";
import "./home.css";

export default function Home() {
  const countersRef = useRef<(HTMLElement | null)[]>([]);

  // Counter Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const countTo = parseInt(target.getAttribute("data-count") || "0", 10);
            let current = 0;
            const increment = Math.ceil(countTo / 50);
            const updateCounter = () => {
              current += increment;
              if (current > countTo) {
                target.innerText = countTo.toString() + (target.innerText.includes('+') ? '+' : '');
              } else {
                target.innerText = current.toString() + (target.innerText.includes('+') ? '+' : '');
                requestAnimationFrame(updateCounter);
              }
            };
            updateCounter();
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.5 }
    );

    countersRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Celebration Confetti
  useEffect(() => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <HeroSlider />

      {/* ANNIVERSARY HIGHLIGHT - Cosmic Star Visuals */}
      <section className="py-4 shadow-lg position-relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0f172a 0%, #083344 50%, #0f766e 100%)", borderTop: "1px solid rgba(6, 182, 212, 0.3)", borderBottom: "1px solid rgba(6, 182, 212, 0.3)", zIndex: 10 }} data-aos="zoom-in-up" data-aos-duration="1500" data-aos-delay="200">
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: "url('https://www.transparenttextures.com/patterns/stardust.png')", opacity: 0.9 }}></div>
        <div className="position-absolute top-50 start-50 translate-middle w-100 h-100" style={{ background: "radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, rgba(0,0,0,0) 70%)", animation: "pulse 4s infinite alternate" }}></div>
        <div className="container position-relative z-index-2">
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-between text-white">
            <div className="d-flex align-items-center gap-4 mb-3 mb-md-0">
              <div className="display-1 fw-bold anniversary-text" style={{ letterSpacing: "-2px" }}>
                 3<span className="fs-1 align-top fw-bold" style={{ marginLeft: "2px" }}>rd</span>
              </div>
              <div>
                <h4 className="fw-bolder mb-1 fs-2 text-uppercase" style={{ color: "#f8fafc", letterSpacing: "3px", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>FUTECX Anniversary</h4>
                <p className="mb-2 fs-5 text-light opacity-85 fw-medium">Celebrating three years of relentless innovation and global growth.</p>
                <span className="badge rounded-pill text-white" style={{ background: "rgba(255, 255, 255, 0.15)", backdropFilter: "blur(5px)", border: "1px solid rgba(255, 255, 255, 0.3)", padding: "8px 16px", fontSize: "0.95rem", fontWeight: "600" }}>
                  <i className="fas fa-calendar-alt me-2"></i> 27th Sep 2026 to 2027
                </span>
              </div>
            </div>
            <div data-aos="fade-left" data-aos-delay="600">
              <Link href="/about" className="btn btn-lg rounded-pill px-5 fw-bold text-dark shadow hover-lift" style={{ background: "linear-gradient(90deg, #06b6d4 0%, #14b8a6 100%)", border: "none" }}>Discover Our Journey</Link>
            </div>
          </div>
        </div>
      </section>

      {/* UPCOMING */}
      <section id="upcoming" className="py-5" data-aos="fade-up" data-aos-duration="1000">
        <div className="container py-4">
          <div className="row mb-5">
            <div className="col text-center">
              <h2 className="section-title display-6 fw-bold">Upcoming Innovations</h2>
              <p className="text-muted fs-5">What's actively being engineered at FUTECX for 2026.</p>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                <img src="/image/home/upcoming-agentos.jpg" alt="AgentOS Studio" className="img-fluid" style={{ height: "240px", objectFit: "cover" }} />
                <div className="card-body p-4 bg-white">
                  <h4 className="fw-bold mb-3">FUTECX AgentOS Studio</h4>
                  <p className="text-muted mb-4 lh-lg">A highly advanced multi-model AI agent workspace engineered for complex evidence evaluation and autonomous workflow handling across enterprise systems.</p>
                  <Link href="/products" className="btn btn-primary rounded-pill px-4">
                    <i className="fas fa-rocket me-2"></i>Explore Platform
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                <img src="/image/home/upcoming-chess.jpg" alt="FUTECX CHESS V4" className="img-fluid" style={{ height: "240px", objectFit: "cover" }} />
                <div className="card-body p-4 bg-white">
                  <h4 className="fw-bold mb-3">FUTECX CHESS V4</h4>
                  <p className="text-muted mb-4 lh-lg">The fourth iteration of our flagship AI chess engine. V4 integrates advanced reinforcement learning algorithms for highly adaptive, grandmaster-level gameplay and analysis.</p>
                  <Link href="/products" className="btn btn-primary rounded-pill px-4">
                    <i className="fa-solid fa-chess-knight me-2"></i>View Roadmap
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements" className="bg-light py-5" data-aos="fade-up" data-aos-duration="1000">
        <div className="container py-4">
          <div className="row mb-5">
            <div className="col text-center">
              <h2 className="section-title display-6 fw-bold">Latest Achievements</h2>
              <p className="text-muted fs-5">A proven track record of successful deliveries.</p>
            </div>
          </div>
          <div className="row" id="achGrid">
            {[
              { img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80", title: "Hackathon Win — Vision AI", desc: "Secured top placement at a major campus-wide buildathon for developing real-time defect detection prototypes.", link: "/events" },
              { img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80", title: "Tech Event — AI Showcase", desc: "Showcased FUTECX AgentOS and custom LLM workflows at a prestigious state-level technology symposium.", link: "/events" },
              { img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80", title: "Workshop — Hands-on RAG", desc: "Hosted an intensive interactive workshop training over 150+ students on prompt engineering and RAG development.", link: "/community" },
              { img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80", title: "Collab — Local SME App", desc: "Successfully developed and launched SAI MEERA Digital, a complete platform for a major business client.", link: "/services" }
            ].map((ach, i) => (
              <div key={i} className="col-md-6 col-lg-3 mb-3">
                <div className="ach-card h-100 border-0 shadow-sm rounded-4 overflow-hidden bg-white">
                  <img src={ach.img} alt={ach.title} className="img-fluid" style={{ width: "100%", height: "180px", objectFit: "cover" }} />
                  <div className="body p-4">
                    <h5 className="mb-2 fw-bold text-dark">{ach.title}</h5>
                    <p className="text-muted small mb-4 lh-lg">{ach.desc}</p>
                    <Link href={ach.link} className="btn btn-sm btn-outline-primary rounded-pill px-3 fw-bold">View Details</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT STATS */}
      <section id="stats" className="py-5 position-relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0b1220 0%, #1e293b 100%)" }} data-aos="fade-up" data-aos-duration="1000">
        <div className="position-absolute top-50 start-50 translate-middle w-100 h-100" style={{ background: "url('https://www.transparenttextures.com/patterns/connected.png')", opacity: 0.1 }}></div>
        <div className="container py-5 position-relative z-index-2">
          <div className="row mb-5">
            <div className="col text-center">
              <span className="badge bg-primary bg-opacity-25 text-info border border-info border-opacity-50 rounded-pill px-4 py-2 mb-3 shadow" style={{ letterSpacing: "2px" }}>Our Impact</span>
              <h2 className="section-title display-4 fw-black text-white" style={{ textShadow: "0 5px 15px rgba(0,0,0,0.5)" }}>Scale & Reach</h2>
              <p className="text-light fs-5 opacity-75">Growing community, massive shipping, real impact.</p>
            </div>
          </div>
          <div className="row g-4 justify-content-center text-center">
            {[
              { count: 200, label: "Active Interns", icon: "fa-solid fa-users" },
              { count: 24, label: "Projects Delivered", icon: "fa-solid fa-rocket" },
              { count: 15, label: "Workshops Hosted", icon: "fa-solid fa-chalkboard-user" },
              { count: 8, label: "Industry Partners", icon: "fa-solid fa-handshake" },
            ].map((stat, i) => (
              <div key={i} className="col-6 col-md-3">
                <div className="kpi-card p-4 rounded-4 h-100 d-flex flex-column justify-content-center transition-all hover-lift" style={{ background: "rgba(255, 255, 255, 0.05)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)", boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}>
                  <div className="mb-3 text-info display-5"><i className={stat.icon}></i></div>
                  <h2 className="display-4 fw-black text-white mb-0 d-flex justify-content-center align-items-center">
                    <span ref={(el) => { countersRef.current[i] = el; }} data-count={stat.count}>0</span>
                    <span className="text-primary ms-1">+</span>
                  </h2>
                  <p className="mb-0 text-light opacity-75 mt-3 fw-semibold text-uppercase" style={{ letterSpacing: "2px", fontSize: "0.85rem" }}>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOIN / APPLY */}
      <section id="join" className="py-5 bg-white border-top border-light" data-aos="fade-up" data-aos-duration="1000">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <div className="p-5 rounded-5 shadow-lg position-relative overflow-hidden" style={{ background: "linear-gradient(145deg, #ffffff, #f8f9fa)", border: "1px solid rgba(0,0,0,0.05)" }}>
                <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: "url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')", opacity: 0.4 }}></div>
                <div className="position-relative z-index-2">
                  <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-2 mb-3 fw-bold shadow-sm" style={{ letterSpacing: "1px" }}>Hiring Now</span>
                  <h2 className="display-5 fw-black text-dark mb-3">Join the New Core Team</h2>
                  <p className="lead text-muted mx-auto mb-4" style={{ maxWidth: "700px" }}>
                    We're actively recruiting talented leaders across AI/ML, Full-Stack Development, DevOps, UI/UX Design, and Community Management. Shape the future with us.
                  </p>
                  <a id="applyBtn" href="#" className="btn btn-primary btn-lg rounded-pill px-5 py-3 fw-bold shadow hover-lift transition-all">
                    <i className="fas fa-paper-plane me-2"></i>Apply via Interest Form
                  </a>
                  <p className="text-muted small mt-4 mb-0">
                    <i className="fas fa-info-circle me-1"></i> Replace the button link with your actual Google Form URL.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
