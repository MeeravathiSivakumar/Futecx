"use client";

import React from "react";
import Link from "next/link";
import "./projects.css";

export default function ProjectsPage() {
  const PROJECTS = [
    {
      id: "chatlse",
      title: "Chat LSE",
      tags: ["Web App", "WebSockets", "UI/UX"],
      desc: "A modern, highly responsive real-time chat application featuring a seamless dark-mode UI, instant messaging capabilities, and encrypted websockets.",
      image: "/image/projects/chatlse.jpg",
      status: "Completed",
      link: "https://test-420914.web.app"
    },
    {
      id: "meera-write",
      title: "Meera Content Write",
      tags: ["Generative AI", "NLP", "Text Engine"],
      desc: "A highly specialized generative AI module designed for high-quality, context-aware content generation, prompt engineering, and automated drafting.",
      image: "/image/projects/meera-write.jpg",
      status: "Completed",
      link: "https://meera-ai-73904.firebaseapp.com"
    },
    {
      id: "attendance",
      title: "Smart Biometric Attendance System",
      tags: ["Security", "Computer Vision", "Biometrics"],
      desc: "A highly scalable corporate attendance tracker using advanced facial recognition and biometric processing integrated directly with HR payroll systems.",
      image: "/image/projects/attendance.jpg",
      status: "Completed",
    },
    {
      id: "student-ai",
      title: "AI Student Support Assistant",
      tags: ["Agentic AI", "RAG", "Education"],
      desc: "A production-tested RAG-based AI agent designed to support and automate student academics, university admissions, and hostel management inquiries seamlessly.",
      image: "/image/projects/student-ai.jpg",
      status: "Completed",
    },
    {
      id: "eduflex",
      title: "EduFlex Ecosystem",
      tags: ["EdTech Platform", "AI Learning"],
      desc: "A comprehensive digital learning ecosystem connecting students and mentors. Features AI-driven learning paths, assessment engines, and real-time interactive collaboration.",
      image: "/image/projects/eduflex.jpg",
      status: "Completed",
    },
    {
      id: "bujji",
      title: "BUJJI Dream Route AI",
      tags: ["Smart Mobility", "App", "AI Travel"],
      desc: "An intelligent routing and travel AI system designed to optimize pathways, predict traffic patterns, and provide highly personalized journey recommendations.",
      image: "/image/projects/bujji.jpg",
      status: "Completed",
    },
    {
      id: "bujji-full",
      title: "AI-Driven Intelligent Travel Planning and Navigation System using Generative AI and Geospatial Analytics",
      tags: ["Research", "Generative AI", "Geospatial Data"],
      desc: "An extensive architecture leveraging complex routing algorithms, multi-model AI logic, and realtime geospatial mapping to completely revolutionize autonomous travel planning.",
      image: "/image/projects/bujji-full.jpg",
      status: "Completed",
    },
    {
      id: "insight",
      title: "Insight AI",
      link: "https://insightai-frontend.onrender.com/",
      tags: ["Data Science", "LLM", "Analytics"],
      desc: "An AI-powered data analyst capable of parsing complex raw datasets, identifying hidden patterns, and autonomously generating comprehensive business intelligence reports.",
      image: "/image/projects/insight.jpg",
      status: "Completed",
    },
    {
      id: "traffic-emergency",
      title: "AI-Based Real-Time Traffic Congestion Monitoring and Emergency Route Optimization System",
      tags: ["Computer Vision", "Smart City", "Emergency AI"],
      desc: "A smart-city infrastructure prototype capable of real-time vehicle tracking, density mapping, and autonomous anomaly detection to assist emergency vehicles.",
      image: "/image/projects/traffic-emergency.jpg",
      status: "Completed",
    },
    {
      id: "saimeera",
      title: "SAI MEERA Digital Business Platform",
      tags: ["E-Commerce", "Web Dev", "Branding"],
      desc: "A comprehensive digital transformation project for a printing enterprise, featuring e-commerce integrations, full creative branding, and digital print media design.",
      image: "/image/projects/saimeera.jpg",
      status: "Completed",
    },
    {
      id: "agentos",
      title: "FUTECX AgentOS Studio",
      tags: ["Platform & Tools", "Agents", "Developer"],
      desc: "A massive multi-model AI agent workspace engineered for complex evidence evaluation, contextual permissions, and fully autonomous multi-step workflow handling.",
      image: "/image/projects/agentos.jpg",
      status: "Upcoming",
    },
    {
      id: "chess",
      title: "FUTECX Chess V4",
      tags: ["Game Dev", "Multiplayer", "Esports"],
      desc: "A massive online multiplayer chess platform with AI-driven opponents, real-time social systems, rich gamification, and competitive daily reward structures.",
      image: "/image/projects/chess.jpg",
      status: "Upcoming",
    }
  ];

  return (
    <>
      {/* HERO SECTION */}
      <section className="position-relative py-5 d-flex align-items-center justify-content-center min-vh-50" style={{ 
        background: "url('/image/projects/header-bg.jpg') no-repeat center center/cover",
        paddingTop: "100px", paddingBottom: "100px" 
      }}>
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: "rgba(11, 18, 32, 0.85)" }}></div>
        <div className="container text-center position-relative z-index-2 py-5 mt-4">
          <span className="badge bg-primary bg-opacity-25 text-info border border-info border-opacity-50 rounded-pill px-4 py-2 mb-3 shadow" data-aos="fade-down">Master Portfolio</span>
          <h1 className="display-3 fw-black text-white mb-3" data-aos="zoom-in" style={{ textShadow: "0 10px 30px rgba(0,0,0,0.8)" }}>Projects Engineered by FUTECX</h1>
          <p className="lead text-light opacity-75 mx-auto" style={{ maxWidth: "800px" }} data-aos="fade-up" data-aos-delay="200">
            A comprehensive showcase of every product, service integration, and research architecture fully engineered by the FUTECX team.
          </p>
        </div>
      </section>

      {/* PROJECTS GRID */}
      <section className="py-5" style={{ background: "linear-gradient(to bottom, #f8f9fa, #e9ecef)" }}>
        <div className="container py-5">
          <div className="row g-5">
            {PROJECTS.map((project, idx) => (
              <div className="col-lg-4 col-md-6" key={project.id} data-aos="fade-up" data-aos-delay={(idx % 3) * 100}>
                {/* Premium Card with 3D Hover & Glow */}
                <div 
                  className="project-grid-card bg-white rounded-4 overflow-hidden h-100 position-relative transition-all d-flex flex-column"
                  style={{
                    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    border: "1px solid rgba(0,0,0,0.03)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-15px) scale(1.02)";
                    e.currentTarget.style.boxShadow = "0 20px 40px rgba(13, 110, 253, 0.15)";
                    e.currentTarget.style.borderColor = "rgba(13, 110, 253, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.05)";
                    e.currentTarget.style.borderColor = "rgba(0,0,0,0.03)";
                  }}
                >
                  <div className="project-img-wrapper position-relative" style={{ height: "240px", overflow: "hidden" }}>
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-100 h-100 object-fit-cover transition-all" 
                      style={{ transition: "transform 0.6s ease" }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                      onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                    />
                    
                    {/* Floating Status Badge */}
                    <div className="position-absolute top-0 end-0 m-3 z-index-2">
                      <span 
                        className={`badge px-3 py-2 rounded-pill shadow ${project.status === 'Upcoming' ? 'bg-warning text-dark' : 'bg-primary text-white'}`}
                        style={{ backdropFilter: "blur(5px)", background: project.status === 'Upcoming' ? 'rgba(255, 193, 7, 0.9)' : 'rgba(13, 110, 253, 0.9)' }}
                      >
                        {project.status === 'Upcoming' ? <><i className="fa-solid fa-clock me-1"></i> Upcoming</> : <><i className="fa-solid fa-check-circle me-1"></i> Completed</>}
                      </span>
                    </div>

                    <div className="position-absolute bottom-0 start-0 w-100 p-4 z-index-2" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)" }}>
                      <div className="d-flex flex-wrap gap-2">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="badge bg-light text-dark bg-opacity-75 backdrop-blur px-2 py-1 rounded-1" style={{ fontSize: "0.7rem" }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-4 d-flex flex-column flex-grow-1 bg-white position-relative">
                    <h4 className="fw-bold mb-3 fs-5" style={{ color: "#0b1220" }}>{project.title}</h4>
                    <p className="text-muted small lh-lg flex-grow-1 mb-4">{project.desc}</p>
                    
                    <div className="mt-auto">
                      <Link href={project.link || "#"} target={project.link ? "_blank" : "_self"} className="btn btn-outline-primary rounded-pill w-100 fw-bold hover-glow">
                        Explore Project <i className="fa-solid fa-arrow-right ms-2"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHATSAPP COMMUNITY CTA */}
      <section className="py-5 bg-dark text-white text-center position-relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0b1220 0%, #1a2a47 100%)" }}>
        <div className="position-absolute top-0 end-0 w-100 h-100 opacity-10" style={{ background: "radial-gradient(circle at center, #25D366 0%, transparent 60%)" }}></div>
        <div className="container position-relative z-index-2 py-5">
          <div className="mb-4 d-inline-block p-4 rounded-circle bg-white shadow-lg" style={{ transform: "translateY(-10px)" }}>
            <i className="fa-brands fa-whatsapp fa-3x" style={{ color: "#25D366" }}></i>
          </div>
          <h2 className="display-5 fw-bold mb-3 text-white">Join the FUTECX Community</h2>
          <p className="lead mb-4 opacity-75 mx-auto" style={{ maxWidth: "600px" }}>
            Connect with our engineers, stay updated on our latest upcoming products like AgentOS & Chess V4, and collaborate on future projects.
          </p>
          <a 
            href="https://chat.whatsapp.com/your-group-link" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-lg rounded-pill px-5 py-3 fw-bold shadow-lg text-white" 
            style={{ backgroundColor: "#25D366", transition: "transform 0.3s", border: "2px solid rgba(255,255,255,0.2)" }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <i className="fa-brands fa-whatsapp me-2 fs-4 align-middle"></i> Join Our WhatsApp Group
          </a>
        </div>
      </section>
    </>
  );
}


