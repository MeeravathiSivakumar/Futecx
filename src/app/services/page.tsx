"use client";

import React from "react";
import Link from "next/link";
import "./services.css";

export default function ServicesPage() {
  const SERVICES = [
    {
      id: "01",
      icon: "fa-solid fa-brain",
      img: "/image/service/gen-ai-new.jpg",
      title: "Generative AI Integration",
      desc: "Why settle for standard software when you can have intelligent systems? We integrate advanced LLMs (Gemini, ChatGPT) directly into your business workflows, automating tasks, generating insights, and saving you thousands of hours in operational costs.",
      items: ["Custom AI Agents", "Workflow Automation", "RAG Systems", "Intelligent Analytics", "Chatbot Development"]
    },
    {
      id: "02",
      icon: "fa-solid fa-code",
      img: "/image/service/full-stack-web.jpg",
      title: "Full-Stack Web Engineering",
      desc: "Your digital storefront needs to be fast, secure, and built to scale. We engineer custom, high-performance web applications tailored precisely to your business model, ensuring a flawless experience for your users and higher conversion rates.",
      items: ["React & Next.js", "Custom Dashboards", "E-Commerce", "SaaS Platforms", "API Development"]
    },
    {
      id: "03",
      icon: "fa-solid fa-comments",
      img: "/image/service/conversational-ai.jpg",
      title: "Conversational AI & Chatbots",
      desc: "Never miss a customer inquiry again. We build human-like AI assistants that handle 24/7 customer support, lead generation, and interactive user onboarding, drastically improving your customer retention.",
      items: ["Customer Support Bots", "Lead Gen Agents", "Voice AI", "Multi-lingual NLP", "CRM Integration"]
    },
    {
      id: "04",
      icon: "fa-solid fa-server",
      img: "/image/service/backend-arch.jpg",
      title: "Backend Architecture",
      desc: "A beautiful UI is nothing without a powerful engine. We design robust, cloud-native backend architectures that can handle massive data loads, ensuring your application never crashes during peak business hours.",
      items: ["Node.js & Python", "REST & GraphQL APIs", "Database Design", "High Availability", "Microservices"]
    },
    {
      id: "05",
      icon: "fa-solid fa-mobile-screen",
      img: "/image/service/mobile-app.jpg",
      title: "Mobile Application Dev",
      desc: "Reach your customers wherever they are. We develop sleek, responsive cross-platform mobile applications that put your business directly into the pockets of your target audience.",
      items: ["Cross-platform Apps", "Native Experiences", "UI/UX Optimization", "API Integration", "App Store Deployment"]
    },
    {
      id: "06",
      icon: "fa-solid fa-graduation-cap",
      img: "/image/service/edtech.jpg",
      title: "EdTech & Industry Solutions",
      desc: "Transform the way your institution or enterprise learns. We build domain-specific AI platforms and learning management systems that personalize education and optimize industrial training processes.",
      items: ["EdTech AI Assistants", "Industrial Automation", "Smart Analytics", "Personalized Learning", "Process Optimization"]
    },
    {
      id: "07",
      icon: "fa-solid fa-cloud",
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
      title: "Cloud & DevOps Deployments",
      desc: "Stop worrying about servers. We handle full cloud infrastructure setup and CI/CD deployment pipelines, ensuring your products are secure, globally accessible, and effortlessly updated.",
      items: ["AWS & Google Cloud", "Serverless Architecture", "CI/CD Pipelines", "Docker & Containers", "Security Audits"]
    },
    {
      id: "08",
      icon: "fa-solid fa-robot",
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      title: "Platform Automation",
      desc: "Time is money. We build custom automation tools and bots that connect your Discord, Slack, and CRM systems, streamlining your internal communications and community management.",
      items: ["Discord/Slack Bots", "Workflow Automation", "Community Management", "CRM Sync", "Task Automation"]
    },
    {
      id: "09",
      icon: "fa-solid fa-pen-nib",
      img: "/image/service/ui-ux.jpg",
      title: "UI/UX & Digital Branding",
      desc: "First impressions matter. We don't just write code; we craft stunning, user-centric interfaces and complete brand identities designed specifically to drive user engagement and skyrocket conversions.",
      items: ["Wireframing", "High-fidelity Prototyping", "Brand Identity", "Design Systems", "User Research"]
    },
    {
      id: "10",
      icon: "fa-solid fa-rocket",
      img: "/image/service/mvp.jpg",
      title: "MVP & Rapid Prototyping",
      desc: "Got a brilliant idea? Let's build it fast. We specialize in rapid development cycles, turning your concept into a testable Minimum Viable Product (MVP) so you can hit the market and secure funding quickly.",
      items: ["Proof of Concept", "MVP Development", "Market Testing", "Iterative Building", "Scalable Foundations"]
    },
    {
      id: "11",
      icon: "fa-solid fa-building",
      img: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=800&q=80",
      title: "Custom Enterprise Software",
      desc: "Off-the-shelf software often limits growth. We architect bespoke organizational platforms, ERPs, and management systems tailored to your unique internal processes to maximize workforce efficiency.",
      items: ["Custom ERP Systems", "Internal Tooling", "Workflow Management", "Legacy Modernization", "Data Migration"]
    },
    {
      id: "12",
      icon: "fa-solid fa-globe",
      img: "/image/service/commercial.jpg",
      title: "Commercial & Corporate Websites",
      desc: "Your website is your ultimate digital asset. We develop premium commercial websites with robust content management systems, designed to establish absolute industry authority and generate high-quality leads.",
      items: ["Corporate Portals", "SEO Architecture", "Headless CMS", "High-conversion Landing Pages", "B2B Web Solutions"]
    },
    {
      id: "13",
      icon: "fa-solid fa-cart-shopping",
      img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
      title: "E-Commerce & Retail Solutions",
      desc: "Scale your revenue securely. We engineer high-performance digital storefronts, scalable inventory management systems, and seamless payment gateway integrations that deliver flawless shopping experiences.",
      items: ["Custom E-Commerce", "Payment Integrations", "Inventory Management", "B2C & B2B Platforms", "Conversion Optimization"]
    },
    {
      id: "14",
      icon: "fa-solid fa-chart-line",
      img: "/image/service/data-analytics.jpg",
      title: "Real-Time Data Analytics",
      desc: "Make decisions based on facts, not guesses. We build real-time monitoring dashboards and data pipelines that transform your complex raw data into clear, actionable business intelligence.",
      items: ["Interactive Dashboards", "Data Visualization", "Real-time Processing", "Predictive Analytics", "Custom Reporting"]
    },
    {
      id: "15",
      icon: "fa-solid fa-network-wired",
      img: "/image/service/api-dev.jpg",
      title: "API Development & Integration",
      desc: "Connect your isolated systems. We design robust, secure APIs that allow your disparate software platforms to communicate flawlessly, eliminating data silos and heavily reducing manual data entry.",
      items: ["Custom REST/GraphQL APIs", "Third-party Integrations", "System Synchronization", "API Security", "Documentation"]
    }
  ];

  return (
    <>
      {/* HEADER SECTION */}
      <section className="position-relative py-5 d-flex align-items-center justify-content-center min-vh-50" style={{ 
        background: "url('/image/company/services-bg.png') no-repeat center center/cover",
        paddingTop: "100px", paddingBottom: "100px" 
      }}>
        {/* Dark overlay for perfect text readability */}
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: "rgba(11, 18, 32, 0.75)" }}></div>
        <div className="container text-center position-relative z-index-2 py-5 mt-4">
          <span className="badge bg-primary bg-opacity-25 text-info border border-info border-opacity-50 rounded-pill px-4 py-2 mb-3 shadow" data-aos="fade-down">Our Service Based Work</span>
          <h1 className="display-3 fw-light text-white mb-3" data-aos="zoom-in" style={{ textShadow: "0 10px 30px rgba(0,0,0,0.8)" }}>Enterprise Engineering & <span className="text-info fw-bolder">Digital Innovation</span></h1>
          <p className="lead text-light opacity-75 mx-auto" style={{ maxWidth: "800px" }} data-aos="fade-up" data-aos-delay="200">
            We partner with startups, businesses, and enterprises to build highly scalable digital products. Explore exactly how our specific engineering services can transform your business.
          </p>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-5 bg-white">
        <div className="container py-5">
          <div className="text-center mb-5" data-aos="fade-up">
            <h6 className="text-primary fw-bold text-uppercase tracking-wider">What We Build For You</h6>
            <h2 className="display-5 fw-bold text-dark">Our Specialized Engineering Divisions</h2>
            <p className="text-muted mx-auto mt-3" style={{ maxWidth: "700px" }}>
              From deep-tech AI integrations to full-scale web platforms, our dedicated divisions deliver production-ready software that solves your most complex business problems.
            </p>
          </div>

          <div className="row g-4">
            {SERVICES.map((service, idx) => (
              <div className="col-xl-4 col-md-6" key={service.id} data-aos="fade-up" data-aos-delay={(idx % 3) * 100}>
                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden bg-light hover-shadow transition-all">
                  <div className="position-relative">
                    <img src={service.img} className="card-img-top" alt={service.title} style={{ height: "200px", objectFit: "cover" }} />
                    <div className="position-absolute top-0 end-0 m-3">
                      <span className="badge bg-dark bg-opacity-75 text-white fs-6 rounded-circle d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
                        {service.id}
                      </span>
                    </div>
                    <div className="position-absolute bottom-0 start-0 m-3">
                      <div className="bg-white text-primary rounded-circle shadow-sm d-flex align-items-center justify-content-center" style={{ width: "45px", height: "45px" }}>
                        <i className={`${service.icon} fs-5`}></i>
                      </div>
                    </div>
                  </div>
                  <div className="card-body p-4 d-flex flex-column">
                    <h4 className="fw-bold mb-3">{service.title}</h4>
                    <p className="text-muted mb-4 flex-grow-1" style={{ fontSize: "0.95rem" }}>{service.desc}</p>
                    
                    <ul className="service-features list-unstyled mb-0 pt-3 border-top border-dark border-opacity-10">
                      {service.items.map((item, i) => (
                        <li key={i} className="mb-2 d-flex align-items-center">
                          <i className="fa-solid fa-check text-primary me-2 small"></i>
                          <span className="small text-dark fw-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* COMMISSIONED WORK / CLIENT PROJECTS */}
      <section className="py-5 bg-light border-top">
        <div className="container py-5">
          <div className="row mb-5 text-center">
            <div className="col">
              <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-2 mb-3">Client Success</span>
              <h2 className="section-title h3 fw-bolder">Commissioned Client Projects</h2>
              <p className="text-muted">Real-world systems engineered and delivered by FUTECX.</p>
            </div>
          </div>
          
          <div className="row g-4 justify-content-center">
            
            {/* Project 1: Smart Attendance Project */}
            <div className="col-lg-10" data-aos="fade-up">
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100 bg-white hover-shadow transition-all">
                <div className="row g-0 h-100">
                  <div className="col-md-5">
                    <img src="/image/company/client_attendance.png" className="img-fluid h-100 w-100" style={{ objectFit: "cover", minHeight: "300px" }} alt="Smart Attendance System" />
                  </div>
                  <div className="col-md-7">
                    <div className="card-body p-4 p-md-5 d-flex flex-column h-100">
                      <div className="mb-3">
                        <span className="badge bg-primary bg-opacity-10 text-primary me-2 px-3 py-2 rounded-pill border border-primary border-opacity-25">AI Vision</span>
                        <span className="badge bg-secondary bg-opacity-10 text-secondary me-2 px-3 py-2 rounded-pill border border-secondary border-opacity-25">Biometrics</span>
                        <span className="badge bg-info bg-opacity-10 text-info px-3 py-2 rounded-pill border border-info border-opacity-25">Enterprise</span>
                      </div>
                      <h3 className="card-title fw-bold mb-3">Smart Biometric Attendance System</h3>
                      <p className="card-text text-muted lh-lg mb-4">
                        A highly scalable corporate attendance tracker using advanced facial recognition and biometric processing. Designed to eliminate manual logging, integrate directly with HR payroll systems, and provide real-time dashboard analytics for organizational management.
                      </p>
                      <button className="btn btn-outline-primary rounded-pill px-4 py-2 mt-auto align-self-start fw-bold">
                        View Client Project <i className="fa-solid fa-arrow-right ms-1"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 2: Traffic Monitoring System */}
            <div className="col-lg-10" data-aos="fade-up" data-aos-delay="100">
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100 bg-white hover-shadow transition-all">
                <div className="row g-0 h-100">
                  <div className="col-md-7 order-2 order-md-1">
                    <div className="card-body p-4 p-md-5 d-flex flex-column h-100">
                      <div className="mb-3">
                        <span className="badge bg-success bg-opacity-10 text-success me-2 px-3 py-2 rounded-pill border border-success border-opacity-25">Smart City</span>
                        <span className="badge bg-danger bg-opacity-10 text-danger me-2 px-3 py-2 rounded-pill border border-danger border-opacity-25">Computer Vision</span>
                        <span className="badge bg-dark bg-opacity-10 text-dark px-3 py-2 rounded-pill border border-dark border-opacity-25">Analytics</span>
                      </div>
                      <h3 className="card-title fw-bold mb-3">AI Traffic Monitoring System</h3>
                      <p className="card-text text-muted lh-lg mb-4">
                        An intelligent smart-city infrastructure prototype capable of real-time vehicle tracking, density mapping, and autonomous anomaly detection. Built to assist municipal traffic control by processing multiple live camera feeds concurrently and mapping high-congestion zones.
                      </p>
                      <button className="btn btn-outline-success rounded-pill px-4 py-2 mt-auto align-self-start fw-bold">
                        View Client Project <i className="fa-solid fa-arrow-right ms-1"></i>
                      </button>
                    </div>
                  </div>
                  <div className="col-md-5 order-1 order-md-2">
                    <img src="/image/company/client_traffic.png" className="img-fluid h-100 w-100" style={{ objectFit: "cover", minHeight: "300px" }} alt="Traffic Monitoring" />
                  </div>
                </div>
              </div>
            </div>

            {/* Project 3: Sai Meera Digital Design */}
            <div className="col-lg-10" data-aos="fade-up" data-aos-delay="200">
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100 bg-white hover-shadow transition-all">
                <div className="row g-0 h-100">
                  <div className="col-md-5">
                    <img src="/image/company/client_saimeera_new.jpg" className="img-fluid h-100 w-100" style={{ objectFit: "cover", minHeight: "300px" }} alt="Sai Meera Web" />
                  </div>
                  <div className="col-md-7">
                    <div className="card-body p-4 p-md-5 d-flex flex-column h-100">
                      <div className="mb-3">
                        <span className="badge bg-primary bg-opacity-10 text-primary me-2 px-3 py-2 rounded-pill border border-primary border-opacity-25">UI/UX Design</span>
                        <span className="badge bg-secondary bg-opacity-10 text-secondary me-2 px-3 py-2 rounded-pill border border-secondary border-opacity-25">E-Commerce</span>
                        <span className="badge bg-info bg-opacity-10 text-info px-3 py-2 rounded-pill border border-info border-opacity-25">Branding</span>
                      </div>
                      <h3 className="card-title fw-bold mb-3">SAI MEERA Digital Business Platform</h3>
                      <p className="card-text text-muted lh-lg mb-4">
                        A comprehensive digital transformation project for a printing and invitations enterprise. We delivered a complete production-grade website featuring seamless e-commerce integrations, alongside full creative branding and digital print media design to drastically improve their online sales funnel.
                      </p>
                      <button className="btn btn-outline-primary rounded-pill px-4 py-2 mt-auto align-self-start fw-bold">
                        View Client Project <i className="fa-solid fa-arrow-right ms-1"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      
      {/* CALL TO ACTION */}
      <section className="py-5 bg-dark text-white text-center position-relative overflow-hidden">
        <div className="container position-relative z-index-2 py-5">
          <h2 className="display-6 fw-bold mb-3">Ready to Build With Us?</h2>
          <p className="lead mb-4 opacity-75">From an early-stage idea to a working MVP, we combine product thinking with software engineering.</p>
          <Link href="/contact" className="btn btn-primary btn-lg rounded-pill px-5 py-3 fw-bold shadow-lg">
            Start Your Project <i className="fa-solid fa-arrow-right ms-2"></i>
          </Link>
        </div>
      </section>
    </>
  );
}
