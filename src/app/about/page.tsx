"use client";

import React from "react";
import Link from "next/link";
import "./about.css"; // Ensure about.css handles standard styles

export default function AboutPage() {
  const BUSINESS_DIVISIONS = [
    { title: "AI & Intelligent Systems", icon: "fa-solid fa-brain" },
    { title: "Software & Product Engineering", icon: "fa-solid fa-laptop-code" },
    { title: "Smart Mobility & Location Tech", icon: "fa-solid fa-location-arrow" },
    { title: "Automation & Digital Platforms", icon: "fa-solid fa-gears" },
    { title: "Creative, Branding & Print", icon: "fa-solid fa-palette" },
    { title: "Interactive Commerce & Experiences", icon: "fa-solid fa-cart-shopping" },
  ];

  return (
    <>
      {/* HERO SECTION */}
      <section className="position-relative overflow-hidden text-white d-flex align-items-center" style={{ minHeight: "60vh", background: "url('/image/company/about-hero-bg.jpg') center/cover no-repeat" }}>
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: "linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(13, 110, 253, 0.6) 100%)" }}></div>
        <div className="container position-relative z-index-2 py-5 text-center">
          <span className="badge bg-primary bg-opacity-25 text-info border border-info border-opacity-50 rounded-pill px-4 py-2 mb-3 shadow" data-aos="fade-down">Who We Are</span>
          <h1 className="display-3 fw-bold text-white mb-3" data-aos="zoom-in" style={{ textShadow: "0 10px 30px rgba(0,0,0,0.8)" }}>
            The Vision Behind <span className="text-info fw-bolder">FUTECX</span>
          </h1>
          <p className="lead text-light opacity-75 mx-auto" style={{ maxWidth: "800px" }} data-aos="fade-up" data-aos-delay="200">
            FUTECX builds intelligent digital products, custom software, and complex AI systems designed for a rapidly changing world.
          </p>
        </div>
      </section>

      {/* STORY / TIMELINE SECTION */}
      <section className="py-5 bg-white">
        <div className="container py-5">
          {/* New Dramatic Opening */}
          <div className="row align-items-center mb-5 pb-5 border-bottom">
            <div className="col-lg-6 mb-4 mb-lg-0" data-aos="fade-right">
              <span className="text-primary fw-bold text-uppercase mb-2 d-block" style={{ letterSpacing: "2px" }}>The FUTECX Genesis</span>
              <h2 className="display-5 fw-bolder mt-2 mb-4 text-dark">From Ideas to Autonomous Systems.</h2>
              <p className="text-muted fs-5 lh-lg">
                What began in 2023 as a collective of passionate developers experimenting with responsive UI and simple chat interfaces has exploded into a premier technology ecosystem.
              </p>
              <p className="text-muted lh-lg">
                Today, FUTECX engineers complex multi-model AI agent workspaces (AgentOS), real-time smart mobility systems, and high-fidelity enterprise applications. Our story is one of relentless iteration, where we transform raw technological potential into shipping, production-ready impact.
              </p>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="position-relative rounded-4 overflow-hidden shadow-lg border border-4 border-light">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Team Collaboration" className="img-fluid w-100" style={{ height: "400px", objectFit: "cover" }} />
                <div className="position-absolute bottom-0 start-0 w-100 p-4" style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.9))" }}>
                  <h4 className="text-white fw-bold mb-0">Building the Next Generation</h4>
                </div>
              </div>
            </div>
          </div>
          
          {/* Timeline */}
          <div className="row mt-5">
            <div className="col text-center mb-5" data-aos="fade-up">
              <h3 className="fw-bolder h2">Our Technological Evolution</h3>
              <p className="text-muted">A timeline of our core technological breakthroughs.</p>
            </div>
          </div>
          
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="about-evolution-timeline position-relative">
                
                {/* 2023-24 */}
                <div className="d-flex mb-5 position-relative" data-aos="fade-up">
                  <div className="pe-4 text-end d-flex flex-column justify-content-center" style={{ width: "25%" }}>
                    <span className="badge bg-primary bg-opacity-10 text-primary fs-6 py-2 px-3 rounded-pill ms-auto">2023 - 2024</span>
                  </div>
                  <div className="ps-4 position-relative" style={{ width: "75%", borderLeft: "3px dashed rgba(13, 110, 253, 0.3)" }}>
                    <div className="position-absolute bg-primary rounded-circle" style={{ width: "16px", height: "16px", left: "-9px", top: "50%", transform: "translateY(-50%)", border: "3px solid white", boxShadow: "0 0 0 3px rgba(13,110,253,0.3)" }}></div>
                    <div className="bg-white p-4 rounded-4 shadow-sm border border-light hover-lift" style={{ transition: "all 0.3s ease" }}>
                      <h5 className="fw-bolder text-dark mb-2">Software Development Foundation</h5>
                      <p className="text-muted mb-0">
                        Our early phase was defined by foundational software projects, responsive UI experimentation, and API-connected applications. We shipped our initial portfolio, chat frontend experiments, and the AI XOX game prototype.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2025 */}
                <div className="d-flex mb-5 position-relative" data-aos="fade-up" data-aos-delay="100">
                  <div className="pe-4 text-end d-flex flex-column justify-content-center" style={{ width: "25%" }}>
                    <span className="badge bg-primary bg-opacity-10 text-primary fs-6 py-2 px-3 rounded-pill ms-auto">2025</span>
                  </div>
                  <div className="ps-4 position-relative" style={{ width: "75%", borderLeft: "3px dashed rgba(13, 110, 253, 0.3)" }}>
                    <div className="position-absolute bg-primary rounded-circle" style={{ width: "16px", height: "16px", left: "-9px", top: "50%", transform: "translateY(-50%)", border: "3px solid white", boxShadow: "0 0 0 3px rgba(13,110,253,0.3)" }}></div>
                    <div className="bg-white p-4 rounded-4 shadow-sm border border-light hover-lift" style={{ transition: "all 0.3s ease" }}>
                      <h5 className="fw-bolder text-dark mb-2">Python, Backend & Early Products</h5>
                      <p className="text-muted mb-0">
                        We transitioned from frontend experiments into full-stack backend development. This era saw the genesis of major product ideas like the Young Innovators platform, Meera AI chatbot foundations, and EduFlex platform conceptualization.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2026 */}
                <div className="d-flex mb-4 position-relative" data-aos="fade-up" data-aos-delay="200">
                  <div className="pe-4 text-end d-flex flex-column justify-content-center" style={{ width: "25%" }}>
                    <span className="badge bg-primary text-white fs-6 py-2 px-3 rounded-pill ms-auto shadow-sm">2026 - Present</span>
                  </div>
                  <div className="ps-4 position-relative" style={{ width: "75%", borderLeft: "3px solid rgba(13, 110, 253, 0.8)" }}>
                    <div className="position-absolute bg-info rounded-circle" style={{ width: "20px", height: "20px", left: "-11px", top: "50%", transform: "translateY(-50%)", border: "4px solid white", boxShadow: "0 0 15px rgba(13,110,253,0.6)" }}></div>
                    <div className="p-4 rounded-4 shadow border-0" style={{ background: "linear-gradient(145deg, #ffffff, #f0f7ff)", transition: "all 0.3s ease" }}>
                      <h5 className="fw-bolder text-primary mb-2">Enterprise Delivery & Agentic AI</h5>
                      <p className="text-muted mb-0">
                        Our current phase. We successfully completed and tested the <strong>AI Student Support Assistant</strong>, developed the <strong>FUTECX AgentOS Studio</strong>, delivered commissioned e-commerce platforms like the <strong>SAI MEERA Digital Business Website</strong>, and actively engineer complex mobility systems like <strong>AI Traffic Management</strong> and <strong>BUJJI Dream Route AI</strong>.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIVISIONS SECTION */}
      <section className="py-5" style={{ background: "linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)" }}>
        <div className="container py-5">
          <div className="row mb-5 text-center">
            <div className="col">
              <h2 className="section-title display-6 fw-bolder text-dark">Our 6 Business Divisions</h2>
              <p className="text-muted fs-5">The core operational sectors shaping our future.</p>
            </div>
          </div>
          
          <div className="row g-4 justify-content-center">
            {BUSINESS_DIVISIONS.map((div, idx) => (
              <div className="col-lg-4 col-md-6" key={idx} data-aos="zoom-in" data-aos-delay={idx * 50}>
                <div className="card h-100 border border-light shadow-sm rounded-4 text-center p-4 division-card position-relative overflow-hidden">
                  <div className="division-bg position-absolute top-0 start-0 w-100 h-100 opacity-0 transition-all"></div>
                  <div className="mb-4 position-relative z-index-2 mx-auto d-flex align-items-center justify-content-center bg-light rounded-circle shadow-sm" style={{ width: '80px', height: '80px' }}>
                    <i className={`${div.icon} fs-2 text-primary division-icon transition-all`}></i>
                  </div>
                  <h5 className="fw-bolder text-dark position-relative z-index-2">{div.title}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="py-5 bg-white">
        <div className="container py-5 border-top pt-5">
          <div className="row justify-content-center mb-5">
            <div className="col-12 text-center" data-aos="fade-up">
              <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-2 mb-3 fw-bold">Our Core Team</span>
              <h2 className="section-title display-6 fw-bolder text-dark">Leadership</h2>
              <p className="text-muted fs-5">The minds guiding our technology and teams.</p>
            </div>
          </div>

          <div className="row g-4 justify-content-center">
            {/* Ashwin Ramakrishnan */}
            <div className="col-lg-6" data-aos="fade-right">
              <div className="card h-100 border-0 shadow-sm rounded-5 overflow-hidden leadership-card">
                <div className="card-body p-0 d-flex flex-column flex-sm-row h-100">
                  <div className="p-4 d-flex align-items-center justify-content-center position-relative" style={{ minWidth: "220px", background: "linear-gradient(135deg, rgba(13, 110, 253, 0.05) 0%, rgba(13, 202, 240, 0.1) 100%)" }}>
                    <div className="position-relative">
                      <img src="/image/team/ashwin.png" alt="Ashwin Ramakrishnan" className="rounded-circle shadow-lg" style={{ width: "130px", height: "130px", objectFit: "cover", border: "5px solid #fff" }} onError={(e) => e.currentTarget.src = "https://ui-avatars.com/api/?name=Ashwin+Ramakrishnan&background=0D8ABC&color=fff"} />
                      <span className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle d-flex align-items-center justify-content-center shadow" style={{ width: "38px", height: "38px", border: "3px solid #fff" }}>
                        <i className="fa-solid fa-code small"></i>
                      </span>
                    </div>
                  </div>
                  <div className="p-4 p-sm-5 bg-white d-flex flex-column justify-content-center w-100">
                    <h4 className="fw-bolder mb-1 text-dark">Ashwin Ramakrishnan</h4>
                    <p className="text-info fw-bold mb-3 small text-uppercase" style={{ letterSpacing: "1px" }}>Project Lead &bull; Full-Stack</p>
                    <p className="text-muted small mb-4 lh-lg">
                      Guiding the technical architecture, AI integrations, and product development across FUTECX's core software portfolio.
                    </p>
                    <div className="d-flex gap-3 mt-auto">
                      <a href="https://github.com/AshwinRamakrishnan" className="btn btn-light rounded-circle shadow-sm d-flex align-items-center justify-content-center social-btn text-dark" style={{ width: "40px", height: "40px" }}><i className="fa-brands fa-github fs-5"></i></a>
                      <a href="https://www.linkedin.com/in/ashwin-ramakrishnan-b328a6298" className="btn btn-light rounded-circle shadow-sm d-flex align-items-center justify-content-center social-btn text-primary" style={{ width: "40px", height: "40px" }}><i className="fa-brands fa-linkedin fs-5"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Meeravathi Sivakumar */}
            <div className="col-lg-6" data-aos="fade-left">
              <div className="card h-100 border-0 shadow-sm rounded-5 overflow-hidden leadership-card">
                <div className="card-body p-0 d-flex flex-column flex-sm-row h-100">
                  <div className="p-4 d-flex align-items-center justify-content-center position-relative" style={{ minWidth: "220px", background: "linear-gradient(135deg, rgba(220, 53, 69, 0.05) 0%, rgba(253, 126, 20, 0.1) 100%)" }}>
                    <div className="position-relative">
                      <img src="/image/team/meeravathi.png" alt="Meeravathi Sivakumar" className="rounded-circle shadow-lg" style={{ width: "130px", height: "130px", objectFit: "cover", objectPosition: "top", border: "5px solid #fff" }} onError={(e) => e.currentTarget.src = "https://ui-avatars.com/api/?name=Meeravathi+Sivakumar&background=E53935&color=fff"} />
                      <span className="position-absolute bottom-0 end-0 bg-danger text-white rounded-circle d-flex align-items-center justify-content-center shadow" style={{ width: "38px", height: "38px", border: "3px solid #fff" }}>
                        <i className="fa-solid fa-paintbrush small"></i>
                      </span>
                    </div>
                  </div>
                  <div className="p-4 p-sm-5 bg-white d-flex flex-column justify-content-center w-100">
                    <h4 className="fw-bolder mb-1 text-dark">Meeravathi Sivakumar</h4>
                    <p className="text-danger fw-bold mb-3 small text-uppercase" style={{ letterSpacing: "1px" }}>Front-End Developer &bull; UI/UX</p>
                    <p className="text-muted small mb-4 lh-lg">
                      A talented frontend developer specializing in UI/UX. Her exceptional design skills and attention to detail make her an invaluable leader in the FUTECX team.
                    </p>
                    <div className="d-flex gap-3 mt-auto">
                      <a href="https://g.dev/MeeravathiSivakumar" className="btn btn-light rounded-circle shadow-sm d-flex align-items-center justify-content-center social-btn danger-hover text-danger" style={{ width: "40px", height: "40px" }}><i className="fa-brands fa-google fs-5"></i></a>
                      <a href="https://www.linkedin.com/in/meeravathi-sivakumar-5b1478325" className="btn btn-light rounded-circle shadow-sm d-flex align-items-center justify-content-center social-btn text-primary" style={{ width: "40px", height: "40px" }}><i className="fa-brands fa-linkedin fs-5"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-5 text-center bg-white">
        <div className="container py-4">
          <div className="bg-dark text-white rounded-5 py-5 px-4 shadow-lg position-relative overflow-hidden" data-aos="zoom-in" data-aos-duration="1000">
            <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: "radial-gradient(circle at center, rgba(13,110,253,0.15) 0%, rgba(0,0,0,0) 70%)" }}></div>
            <div className="position-relative z-index-2">
              <h3 className="fw-bold mb-3 display-6 text-white">Ready to Build With Us?</h3>
              <p className="opacity-75 mb-4 fs-5">Join FUTECX as a partner or client. Let's engineer the future.</p>
              <div className="d-flex justify-content-center gap-3 mt-4">
                <Link href="/contact" className="btn btn-primary rounded-pill px-5 py-3 fw-bold shadow hover-lift d-flex align-items-center">
                  <i className="fas fa-paper-plane me-2"></i> Contact Us Today
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <style jsx>{`
        .division-card {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
          background: #ffffff;
        }
        .division-bg {
          background: linear-gradient(135deg, rgba(13, 110, 253, 0.05) 0%, rgba(13, 202, 240, 0.1) 100%);
        }
        .division-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.1) !important;
          border-color: rgba(13, 110, 253, 0.3) !important;
        }
        .division-card:hover .division-bg {
          opacity: 1 !important;
        }
        .division-card:hover .division-icon {
          transform: scale(1.15);
          color: #0dcaf0 !important;
        }
        .leadership-card {
          transition: all 0.4s ease;
          background: #ffffff;
        }
        .leadership-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important;
        }
        .social-btn {
          background: #f8f9fa;
          border: 1px solid #e9ecef;
          transition: all 0.3s ease;
        }
        .social-btn:hover {
          background: #0d6efd !important;
          color: #ffffff !important;
          border-color: #0d6efd;
          transform: translateY(-3px);
        }
        .social-btn.danger-hover:hover {
          background: #dc3545 !important;
          border-color: #dc3545 !important;
        }
      `}</style>
    </>
  );
}






