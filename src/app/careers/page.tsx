"use client";
import React from "react";
import Link from "next/link";

export default function CareersPage() {
  const PERKS = [
    { icon: "fas fa-microchip", title: "Work on the Edge", desc: "Direct involvement in cutting-edge tech like AgentOS, Generative AI, and edge deployment." },
    { icon: "fas fa-chalkboard-user", title: "Mentorship", desc: "Learn directly from founders and the core engineering team. Continuous learning culture." },
    { icon: "fas fa-building", title: "TN-Future Tech Park", desc: "Located in the heart of Thanjavur's tech hub with a dynamic, highly collaborative startup environment." },
    { icon: "fas fa-globe", title: "Real-World Impact", desc: "Build products that are actually deployed to enterprises and solve real-world problems." }
  ];

  const ROLES = [
    { title: "AI / ML Research Engineer", type: "Full-Time", location: "On-Site", desc: "Focusing on YOLO models, LLM fine-tuning, and advancing AgentOS development.", icon: "fas fa-brain" },
    { title: "Next.js Full-Stack Developer", type: "Full-Time", location: "Hybrid", desc: "Building scalable web applications, e-commerce platforms, and complex API integrations.", icon: "fab fa-react" },
    { title: "Creative UI/UX Designer", type: "Full-Time", location: "Remote", desc: "Crafting stunning, glassmorphic, and highly animated user interfaces for the web.", icon: "fas fa-pen-nib" },
    { title: "Software Engineering Intern", type: "Internship", location: "On-Site", desc: "Open application for passionate learners looking to gain hands-on experience in tech.", icon: "fas fa-laptop-code" }
  ];

  return (
    <div className="careers-wrapper position-relative text-white min-vh-100" style={{ background: "#020617" }}>
      {/* GLOBAL DARK BACKGROUND & GLOWS */}
      <div className="position-absolute w-100 h-100 top-0 start-0 z-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 0%, #082f49 0%, #020617 70%)" }}></div>
      <div className="position-absolute top-0 start-0 w-100 h-100 z-0 overflow-hidden pointer-events-none">
        <div className="position-absolute rounded-circle" style={{ width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(14,165,233,0.15) 0%, rgba(0,0,0,0) 70%)', top: '-20%', left: '-10%', filter: 'blur(60px)' }}></div>
        <div className="position-absolute rounded-circle" style={{ width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, rgba(0,0,0,0) 70%)', bottom: '10%', right: '-10%', filter: 'blur(80px)' }}></div>
      </div>

      <div className="position-relative z-1">
        {/* HERO SECTION */}
        <section className="py-5 position-relative border-bottom border-secondary border-opacity-25" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', background: 'url("/image/careers/hero-bg-ai.jpg") center/cover no-repeat' }}>
          <div className="position-absolute w-100 h-100 top-0 start-0" style={{ background: "rgba(2, 6, 23, 0.75)" }}></div>
          <div className="container py-5 mt-5 text-center position-relative z-1">
            <span className="badge rounded-pill mb-4 px-4 py-2" data-aos="fade-down" style={{ background: "rgba(14, 165, 233, 0.2)", border: "1px solid rgba(14, 165, 233, 0.5)", color: "#38bdf8", letterSpacing: "1px", backdropFilter: "blur(5px)" }}>
              <i className="fas fa-rocket me-2"></i> Join the Vision
            </span>
            <h1 className="display-3 fw-black mb-4" data-aos="zoom-in" style={{ textShadow: "0 10px 30px rgba(0,0,0,0.8)" }}>
              Build the <span className="text-info">Future</span> at FUTECX
            </h1>
            <p className="lead text-light opacity-85 mx-auto fs-4 fw-medium" style={{ maxWidth: "800px", textShadow: "0 2px 10px rgba(0,0,0,0.8)" }} data-aos="fade-up" data-aos-delay="200">
              Join a passionate team of engineers and innovators in Thanjavur, pushing the boundaries of AI, Web3, and digital platforms.
            </p>
          </div>
        </section>

        {/* WHY FUTECX (PERKS) - LIGHT THEME */}
        <section className="py-5 text-dark" style={{ background: "#f8fafc" }}>
          <div className="container py-5">
            <div className="text-center mb-5">
              <h2 className="fw-bolder fs-1" data-aos="fade-up">Why Join Our Team?</h2>
              <p className="text-muted fs-5" data-aos="fade-up" data-aos-delay="100">We don't just write code; we architect solutions for tomorrow.</p>
            </div>
            <div className="row g-4">
              {PERKS.map((perk, idx) => (
                <div className="col-md-6 col-lg-3" key={idx} data-aos="fade-up" data-aos-delay={idx * 100}>
                  <div className="card h-100 p-4 text-center rounded-4 border-0 shadow-sm hover-lift bg-white" style={{ transition: 'all 0.3s' }} onMouseEnter={(e) => e.currentTarget.classList.add('shadow')} onMouseLeave={(e) => e.currentTarget.classList.remove('shadow')}>
                    <div className="icon-wrapper mb-4 mx-auto d-flex align-items-center justify-content-center rounded-circle" style={{ width: '80px', height: '80px', background: 'rgba(14, 165, 233, 0.1)', border: '1px solid rgba(14, 165, 233, 0.2)' }}>
                      <i className={`${perk.icon} fs-2 text-info`}></i>
                    </div>
                    <h5 className="fw-bold mb-3">{perk.title}</h5>
                    <p className="text-muted small mb-0 lh-lg">{perk.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FUTECX INTERNSHIP PROGRAM - LIGHT THEME */}
        <section className="py-5 position-relative text-dark" style={{ background: "#ffffff" }}>
          <div className="container py-4">
            <div className="rounded-5 p-5 border border-info border-opacity-25 shadow-sm" style={{ background: "linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%)" }}>
              <div className="row align-items-center">
                <div className="col-lg-6 mb-4 mb-lg-0" data-aos="fade-right">
                  <span className="badge bg-info text-white rounded-pill px-3 py-2 mb-3 shadow-sm"><i className="fas fa-graduation-cap me-2"></i>Students & Freshers</span>
                  <h3 className="fw-bold fs-1 text-dark mb-4">FUTECX <span className="text-info">Internship</span> Program</h3>
                  <p className="text-muted fs-5 mb-4 lh-base">
                    Kickstart your career at TN-Future Tech Park. We offer hands-on internships for passionate students eager to work on real-world AI, Web3, and full-stack projects alongside our core engineering team.
                  </p>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-3 d-flex align-items-center"><i className="fas fa-check-circle text-info fs-5 me-3"></i> <span className="text-muted fw-medium">Live project deployment experience</span></li>
                    <li className="mb-3 d-flex align-items-center"><i className="fas fa-check-circle text-info fs-5 me-3"></i> <span className="text-muted fw-medium">1-on-1 mentorship from founders</span></li>
                    <li className="mb-3 d-flex align-items-center"><i className="fas fa-check-circle text-info fs-5 me-3"></i> <span className="text-muted fw-medium">Pre-Placement Offers (PPO) for top performers</span></li>
                  </ul>
                  <Link href="/contact" className="btn btn-info text-white rounded-pill px-5 py-3 shadow fw-bold transition-all hover-lift">
                    Apply for Internship <i className="fas fa-arrow-right ms-2"></i>
                  </Link>
                </div>
                <div className="col-lg-6 text-center" data-aos="fade-left">
                  <div className="position-relative d-inline-block w-100 mt-4 mt-lg-0">
                    <div className="position-absolute top-50 start-50 translate-middle rounded-circle bg-info opacity-25" style={{ width: "300px", height: "300px", filter: "blur(60px)", zIndex: 0 }}></div>
                    <img src="/image/careers/internship.jpg" alt="FUTECX Interns" className="img-fluid rounded-4 shadow-lg position-relative z-1 border border-white border-4" style={{ objectFit: "cover", height: "350px", width: "100%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OPEN ROLES */}
        <section className="py-5 my-5">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="fw-bolder fs-1" data-aos="fade-up">Open Positions</h2>
              <p className="text-info opacity-75 fs-5" data-aos="fade-up" data-aos-delay="100">Find a role where you can make an immediate impact.</p>
            </div>
            
            <div className="row justify-content-center g-4">
              {ROLES.map((role, idx) => (
                <div className="col-lg-10" key={idx} data-aos="fade-up" data-aos-delay={100 + (idx * 100)}>
                  <div className="career-glass-card role-card rounded-4 p-4 p-md-5 d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-4">
                    <div className="d-flex align-items-center gap-4">
                      <div className="role-icon bg-info bg-opacity-10 rounded-4 d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px', flexShrink: 0, border: '1px solid rgba(14,165,233,0.2)' }}>
                        <i className={`${role.icon} fs-1 text-info`}></i>
                      </div>
                      <div>
                        <h4 className="fw-bold mb-2">{role.title}</h4>
                        <div className="d-flex flex-wrap gap-2 mb-2">
                          <span className="badge rounded-pill border border-secondary text-light opacity-75 px-3 py-2"><i className="far fa-clock me-1"></i> {role.type}</span>
                          <span className="badge rounded-pill border border-secondary text-light opacity-75 px-3 py-2"><i className="fas fa-map-marker-alt me-1"></i> {role.location}</span>
                        </div>
                        <p className="text-light opacity-75 mb-0">{role.desc}</p>
                      </div>
                    </div>
                    <div className="text-md-end mt-3 mt-md-0">
                      <Link href="/contact" className="btn btn-info text-dark fw-bold rounded-pill px-4 py-3 shadow-lg btn-apply">
                        Apply Now <i className="fas fa-arrow-right ms-2 btn-arrow"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA SECTION */}
        <section className="py-5 position-relative border-top border-info border-opacity-25" style={{ background: "rgba(14, 165, 233, 0.02)" }}>
          <div className="container py-5 text-center" data-aos="zoom-in">
            <h2 className="fw-bolder fs-1 mb-4">Don't see a perfect fit?</h2>
            <p className="opacity-75 mb-5 mx-auto fs-5" style={{ maxWidth: '600px' }}>
              We are always on the lookout for exceptional talent. If you think you belong at FUTECX, drop us your resume anyway!
            </p>
            <Link href="/contact" className="btn btn-outline-info btn-lg rounded-pill px-5 py-3 fw-bold shadow-lg glowing-btn">
              Send Open Application
            </Link>
          </div>
        </section>
      </div>

      <style jsx>{`
        .career-glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .career-glass-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(14, 165, 233, 0.4);
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3), 0 0 15px rgba(14, 165, 233, 0.1);
        }
        .role-card:hover .role-icon {
          background: rgba(14, 165, 233, 0.2) !important;
          transform: scale(1.05);
          transition: all 0.3s ease;
        }
        .btn-apply {
          transition: all 0.3s ease;
        }
        .btn-apply .btn-arrow {
          transition: transform 0.3s ease;
        }
        .btn-apply:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(14, 165, 233, 0.5) !important;
        }
        .btn-apply:hover .btn-arrow {
          transform: translateX(5px);
        }
        .glowing-btn {
          transition: all 0.3s ease;
        }
        .glowing-btn:hover {
          background: rgba(14, 165, 233, 0.1);
          box-shadow: 0 0 30px rgba(14, 165, 233, 0.3);
          transform: translateY(-3px);
        }
      `}</style>
    </div>
  );
}
