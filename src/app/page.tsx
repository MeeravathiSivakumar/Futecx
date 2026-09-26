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

      {/* ANNIVERSARY HIGHLIGHT */}
      <section className="py-5 bg-white position-relative" style={{ zIndex: 10, borderBottom: "1px solid #f1f5f9" }}>
        <div className="container py-3">
          <div className="row align-items-center g-4 g-lg-5">

            {/* LEFT: Year number */}
            <div className="col-lg-2 col-md-3 text-center" data-aos="fade-right" data-aos-duration="800">
              <div className="d-inline-flex flex-column align-items-center justify-content-center rounded-4" style={{ width: "100px", height: "100px", background: "linear-gradient(135deg, #0b1220 0%, #1e3a5f 100%)", boxShadow: "0 8px 30px rgba(0,0,0,0.15)" }}>
                <div style={{ fontSize: "2.8rem", fontWeight: "900", color: "#38bdf8", lineHeight: 1 }}>3</div>
                <div style={{ fontSize: "0.65rem", fontWeight: "700", color: "rgba(255,255,255,0.6)", letterSpacing: "3px", textTransform: "uppercase" }}>Years</div>
              </div>
            </div>

            {/* CENTER: Text */}
            <div className="col-lg-7 col-md-6" data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
              <div className="d-flex align-items-center gap-2 mb-1">
                <div style={{ width: "32px", height: "3px", background: "linear-gradient(90deg, #38bdf8, #6366f1)", borderRadius: "2px" }}></div>
                <span style={{ fontSize: "0.75rem", fontWeight: "700", letterSpacing: "3px", textTransform: "uppercase", color: "#6366f1" }}>Milestone</span>
              </div>
              <h3 className="fw-black text-dark mb-1" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", letterSpacing: "-0.5px" }}>
                FUTECX <span style={{ color: "#0ea5e9" }}>Anniversary</span>
              </h3>
              <p className="text-muted mb-0" style={{ fontSize: "1rem", maxWidth: "500px", lineHeight: 1.6 }}>
                Celebrating three years of relentless innovation and global growth.
              </p>
            </div>

            {/* RIGHT: Date + CTA */}
            <div className="col-lg-3 col-md-3 text-center text-md-end" data-aos="fade-left" data-aos-duration="800" data-aos-delay="200">
              <div className="mb-2" style={{ fontSize: "0.75rem", fontWeight: "700", color: "#94a3b8", letterSpacing: "2px", textTransform: "uppercase" }}>
                <i className="fas fa-calendar-alt me-1"></i> 27th Sep 2026
              </div>
              <Link href="/about" className="btn fw-bold rounded-pill px-4 py-2" style={{ background: "linear-gradient(90deg, #0ea5e9, #6366f1)", color: "#fff", border: "none", fontSize: "0.9rem" }}>
                Our Journey →
              </Link>
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
      <section id="stats" className="py-5 position-relative overflow-hidden" style={{ background: "#0b1220" }} data-aos="fade-up" data-aos-duration="1000">
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
            ].map((stat, i) => {
              const gradients = [
                'linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(14, 165, 233, 0.02) 100%)',
                'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.02) 100%)',
                'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0.02) 100%)',
                'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(245, 158, 11, 0.02) 100%)'
              ];
              const borders = ['#0ea5e9', '#10b981', '#8b5cf6', '#f59e0b'];
              const bgGradient = gradients[i % gradients.length];
              const borderColor = borders[i % borders.length];

              return (
              <div key={i} className="col-6 col-md-3">
                <div className="kpi-card p-4 p-xl-5 rounded-4 h-100 d-flex flex-column align-items-center justify-content-center transition-all position-relative overflow-hidden" 
                     style={{ 
                       background: bgGradient, 
                       backdropFilter: "blur(20px)", 
                       border: "1px solid rgba(255,255,255,0.05)",
                       borderTop: `3px solid ${borderColor}`, 
                       boxShadow: "0 15px 35px rgba(0,0,0,0.3)" 
                     }}>
                  
                  {/* Glowing Icon Container */}
                  <div className="mb-4 rounded-circle d-flex align-items-center justify-content-center position-relative" style={{ width: "70px", height: "70px", background: `rgba(255,255,255,0.05)`, border: `1px solid ${borderColor}` }}>
                     <i className={`${stat.icon} fs-3 position-relative z-index-2`} style={{ color: borderColor }}></i>
                     <div className="position-absolute w-100 h-100 rounded-circle opacity-25" style={{ filter: "blur(15px)", background: borderColor }}></div>
                  </div>
                  
                  {/* Gradient Number */}
                  <h2 className="display-4 fw-black mb-0 d-flex justify-content-center align-items-center">
                    <span ref={(el) => { countersRef.current[i] = el; }} data-count={stat.count} style={{ background: "linear-gradient(90deg, #ffffff 0%, #e2e8f0 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>0</span>
                    <span className="ms-1" style={{ color: borderColor, textShadow: `0 0 20px ${borderColor}` }}>+</span>
                  </h2>
                  
                  {/* Label */}
                  <p className="mb-0 text-light opacity-75 mt-3 fw-bold text-uppercase" style={{ letterSpacing: "1.5px", fontSize: "0.8rem" }}>{stat.label}</p>
                </div>
              </div>
            )})}
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
                  <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-2 mb-3 fw-bold shadow-sm" style={{ letterSpacing: "1px" }}>Now Recruiting</span>
                  <h2 className="display-5 fw-black text-dark mb-3">Join the FUTECX Team</h2>
                  <p className="lead text-muted mx-auto mb-5" style={{ maxWidth: "700px" }}>
                    We are actively building a world-class team of engineers, designers, AI researchers, and leaders. Pick your path below.
                  </p>
                  <div className="d-flex flex-wrap gap-3 justify-content-center">
                    <Link href="/apply/core-team" className="btn btn-lg rounded-pill px-4 py-2 fw-bold shadow-sm" style={{ background: "linear-gradient(90deg, #7c3aed, #4f46e5)", color: "#fff", border: "none" }}>
                      <i className="fas fa-users-gear me-2"></i> Join Core Team
                    </Link>
                    <Link href="/apply/intern" className="btn btn-lg rounded-pill px-4 py-2 fw-bold shadow-sm" style={{ background: "linear-gradient(90deg, #f59e0b, #ef4444)", color: "#fff", border: "none" }}>
                      <i className="fas fa-graduation-cap me-2"></i> Apply as Intern
                    </Link>
                    <Link href="/apply/agentos" className="btn btn-lg rounded-pill px-4 py-2 fw-bold shadow-sm" style={{ background: "linear-gradient(90deg, #059669, #0ea5e9)", color: "#fff", border: "none" }}>
                      <i className="fas fa-robot me-2"></i> Build AgentOS
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
