"use client";

import React from "react";
import Link from "next/link";
import "./products.css";

export default function ProductsPage() {
  const MAJOR_PRODUCTS = [
    {
      id: "meera",
      title: "Meera AI Chatbot System",
      category: "Artificial Intelligence",
      status: "In Production",
      desc: "An advanced conversational AI assistant designed for seamless enterprise integrations. Capable of handling complex workflows, RAG-based document parsing, and real-time customer interactions.",
      image: "/image/company/product_meera_ai.png",
      link: "#"
    },
    {
      id: "eduflex",
      title: "EduFlex Ecosystem",
      category: "EdTech Platform",
      status: "Beta",
      desc: "A comprehensive digital learning ecosystem connecting students and mentors. Features AI-driven learning paths, assessment engines, and real-time interactive collaboration.",
      image: "/image/company/product_eduflex.png",
      link: "#"
    },
    {
      id: "bujji",
      title: "BUJJI Dream Route AI",
      category: "Smart Mobility",
      status: "Active Development",
      desc: "An intelligent routing and travel AI system. Designed to optimize pathways, predict traffic patterns, and provide highly personalized journey recommendations based on real-time data.",
      image: "/image/company/product_bujji.png",
      link: "#"
    },
    {
      id: "agentos",
      title: "FUTECX AgentOS Studio",
      category: "Platform & Tools",
      status: "Active Development",
      desc: "A massive multi-model AI agent workspace engineered for complex evidence evaluation, contextual permissions, and fully autonomous multi-step workflow handling.",
      image: "/image/company/product_agentos.png",
      link: "#"
    },
    {
      id: "chess",
      title: "FUTECX Chess V4",
      category: "Advanced Web Game Product",
      status: "In Production",
      desc: "A massive online multiplayer chess platform with AI-driven opponents, real-time social systems, rich gamification, and competitive daily reward structures.",
      image: "/image/company/product_chess.png",
      link: "#"
    },
    {
      id: "student-assistant",
      title: "AI Student Support Assistant",
      category: "Agentic AI / RAG",
      status: "Completed & Tested",
      desc: "A production-tested RAG-based AI agent designed to support and automate student academics, university admissions, hostel management, and placement inquiries seamlessly.",
      image: "/image/company/product_student_ai.png",
      link: "#"
    }
  ];

  return (
    <>
      {/* HERO SECTION */}
      <section className="position-relative py-5 d-flex align-items-center justify-content-center min-vh-50" style={{ 
        background: "url('/image/company/product_header_bg.png') no-repeat center center/cover",
        paddingTop: "100px", paddingBottom: "100px" 
      }}>
        {/* Dark overlay for perfect text readability */}
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: "rgba(11, 18, 32, 0.85)" }}></div>
        <div className="container text-center position-relative z-index-2 py-5 mt-4">
          <span className="badge bg-primary bg-opacity-25 text-info border border-info border-opacity-50 rounded-pill px-4 py-2 mb-3 shadow" data-aos="fade-down">Our Intellectual Property</span>
          <h1 className="display-3 fw-light text-white mb-3" data-aos="zoom-in" style={{ textShadow: "0 10px 30px rgba(0,0,0,0.8)" }}>Products Built by <span className="text-info fw-bolder">FUTECX</span></h1>
          <p className="lead text-light opacity-75 mx-auto" style={{ maxWidth: "800px" }} data-aos="fade-up" data-aos-delay="200">
            Discover the flagship products and internal platforms engineered by FUTECX. From advanced conversational AI to enterprise platforms, we build digital infrastructure that scales.
          </p>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container py-5">
          <div className="row g-5">
            {MAJOR_PRODUCTS.map((prod, index) => (
              <div className="col-12" key={prod.id} data-aos="fade-up" data-aos-delay={index * 100}>
                <div className={`product-bento-card overflow-hidden bg-white rounded-4 shadow-sm border-0 d-flex flex-column ${index % 2 === 0 ? 'flex-lg-row' : 'flex-lg-row-reverse'}`}>
                  <div className="product-image-wrap w-100 w-lg-50 position-relative">
                    <img src={prod.image} alt={prod.title} className="w-100 h-100 object-fit-cover" style={{ minHeight: "350px" }} />
                    <div className="position-absolute top-0 start-0 m-3">
                      <span className="badge bg-dark bg-opacity-75 text-white backdrop-blur rounded-pill px-3 py-2">
                        {prod.status}
                      </span>
                    </div>
                  </div>
                  <div className="product-content w-100 w-lg-50 p-4 p-lg-5 d-flex flex-column justify-content-center">
                    <span className="text-primary fw-semibold mb-2">{prod.category}</span>
                    <h2 className="fw-bolder mb-3">{prod.title}</h2>
                    <p className="text-muted mb-4 lead fs-6">{prod.desc}</p>
                    <div>
                      <Link href={prod.link} className="btn btn-outline-dark rounded-pill px-4 py-2 fw-bold">
                        View Product <i className="fa-solid fa-arrow-right ms-2"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
