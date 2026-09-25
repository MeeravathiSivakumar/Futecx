"use client";

import { useState } from "react";
import Link from "next/link";
import "./team.css";

function TeamCard({ id, name, role, imgSrc, email, aboutContent, experienceContent, contactContent, github, linkedin, twitter, google, imagePosition = "center" }: any) {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100 position-relative transition-all hover-shadow-lg" id={id} style={{ background: "linear-gradient(145deg, #ffffff, #f8f9fa)" }}>
      {/* Top Banner */}
      <div className="position-relative" style={{ height: "140px", background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" }}>
        {/* Dynamic decorative elements */}
        <div className="position-absolute opacity-25" style={{ top: "20px", left: "20px", width: "50px", height: "50px", border: "2px dashed white", borderRadius: "50%", animation: "spin 10s linear infinite" }}></div>
        <div className="position-absolute opacity-25" style={{ bottom: "20px", right: "20px", width: "30px", height: "30px", background: "white", borderRadius: "50%" }}></div>
      </div>
      
      {/* Profile Image */}
      <div className="position-absolute text-center w-100" style={{ top: "60px" }}>
        <img 
          src={imgSrc} 
          alt={name} 
          className="rounded-circle shadow-lg bg-white" 
          style={{ 
            width: "140px", 
            height: "140px", 
            objectFit: "cover", 
            objectPosition: imagePosition,
            border: "5px solid white",
          }} 
        />
      </div>

      {/* Body */}
      <div className="card-body pt-5 mt-5 d-flex flex-column">
        <div className="text-center mb-4">
          <h4 className="fw-bold text-dark mb-1">{name}</h4>
          <p className="text-primary fw-semibold small text-uppercase mb-3" style={{ letterSpacing: "1px" }}>{role}</p>
          
          {/* Social Icons */}
          <div className="d-flex justify-content-center gap-3">
            {github && <a href={github} className="text-secondary hover-primary transition-all fs-5" target="_blank" rel="noreferrer"><i className="fa-brands fa-github"></i></a>}
            {linkedin && <a href={linkedin} className="text-secondary hover-primary transition-all fs-5" target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin-in"></i></a>}
            {twitter && <a href={twitter} className="text-secondary hover-primary transition-all fs-5" target="_blank" rel="noreferrer"><i className="fa-brands fa-twitter"></i></a>}
            {google && <a href={google} className="text-secondary hover-primary transition-all fs-5" target="_blank" rel="noreferrer"><i className="fa-brands fa-google"></i></a>}
            {email && <a href={`mailto:${email}`} className="text-secondary hover-primary transition-all fs-5"><i className="fa-solid fa-envelope"></i></a>}
          </div>
        </div>

        {/* Custom Tabs */}
        <ul className="nav nav-pills justify-content-center mb-4 gap-2 pb-3 border-bottom border-light">
          <li className="nav-item">
            <button className={`nav-link rounded-pill px-3 py-1 small fw-bold ${activeTab === 'about' ? 'active shadow-sm' : 'text-muted bg-light border-0'}`} onClick={() => setActiveTab('about')} style={{ transition: "all 0.3s" }}>About</button>
          </li>
          <li className="nav-item">
            <button className={`nav-link rounded-pill px-3 py-1 small fw-bold ${activeTab === 'experience' ? 'active shadow-sm' : 'text-muted bg-light border-0'}`} onClick={() => setActiveTab('experience')} style={{ transition: "all 0.3s" }}>Experience</button>
          </li>
        </ul>

        {/* Tab Content */}
        <div className="tab-content flex-grow-1 text-muted small" style={{ lineHeight: "1.6" }}>
          <div className={`fade ${activeTab === 'about' ? 'show active' : 'd-none'}`}>
            {aboutContent}
          </div>
          <div className={`fade ${activeTab === 'experience' ? 'show active' : 'd-none'}`}>
            {experienceContent}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Team() {
  return (
    <>
      {/* HERO */}
      <header className="hero">
        <div className="container position-relative" data-aos="fade-up" data-aos-duration="900">
          <span className="badge bg-primary bg-opacity-25 text-info border border-info border-opacity-50 rounded-pill px-4 py-2 mb-3 shadow" data-aos="fade-down"><i className="fa-solid fa-users me-2"></i> Innovators • Builders • Leaders</span>
          <h1 className="display-3 fw-light text-white mb-3" data-aos="zoom-in" style={{ textShadow: "0 10px 30px rgba(0,0,0,0.8)" }}>Meet the <span className="text-info fw-bolder">TN-FUTECX</span> Team</h1>
          <p className="lead text-light opacity-75 mx-auto" style={{ maxWidth: "800px" }} data-aos="fade-up" data-aos-delay="200">The passionate young innovators turning ideas into real-world impact.</p>
        </div>
      </header>

      <section className="about-section" data-aos="slide-up" data-aos-duration="1500">
        <div className="containers">
          {/* Card 1: Ashwin R */}
          <TeamCard
            id="card1"
            name="Ashwin R"
            role="Project Lead"
            imgSrc="/image/team/ashwin.png"
            email="ashwinkalai2k@gmail.com"
            github="https://github.com/AshwinRamakrishnan"
            linkedin="https://www.linkedin.com/in/ashwin-ramakrishnan-b328a6298"
            google="https://g.dev/AshwinRamakrishnan"
            twitter="https://x.com/RAshwin2k"
            aboutContent={
              <p className="text">
                A project lead with expertise in full-stack development, Ashwin oversees the FUTECX project. He's known for his leadership skills, strategic planning, and innovative approach in AI and technology.
              </p>
            }
            experienceContent={
              <ul style={{ color: "#000000", lineHeight: 1.6 }}>
                <li>
                  <strong>Founder & Project Lead – FUTECX</strong> (2023 – Present)<br />
                  • Founded and led a startup delivering AI, ML, and Cloud-based solutions.<br />
                  • Defined product vision, roadmap, and execution across multiple phases.<br />
                  • Built and managed a high-performing team of young innovators.<br />
                  • Spearheaded scalable AI/web applications, earning recognition at hackathons & startup events.
                </li>
                <li>
                  <strong>Full-Stack Developer & Technical Lead</strong><br />
                  • Developed full-stack applications using React, Node.js, Python, and Flask.<br />
                  • Implemented responsive UI/UX designs and optimized backend performance.<br />
                  • Deployed and scaled applications in cloud environments with high reliability.<br />
                  • Improved code quality through reviews and best practice enforcement.
                </li>
                <li>
                  <strong>Educator & Mentor</strong><br />
                  • Conducted workshops and training sessions on AI, programming, and web technologies.<br />
                  • Mentored students and junior developers to build industry-ready skills.<br />
                  • Fostered an innovation-driven culture within FUTECX and student communities.
                </li>
              </ul>
            }
            contactContent={
              <>
                <p className="text">Email: <a href="mailto:ashwinkalai2k@gmail.com">ashwinkalai2k@gmail.com</a></p>
                <p className="text">LinkedIn: <a href="https://www.linkedin.com/in/ashwin-ramakrishnan-b328a6298" target="_blank" rel="noreferrer">linkedin.com/in/ashwin-ramakrishnan</a></p>
              </>
            }
          />

          {/* Card 2: Meeravathi S */}
          <TeamCard
            id="card2"
            name="Meeravathi S"
            role="Frontend Developer & UI/UX"
            imgSrc="/image/team/meeravathi.png"
            imagePosition="top"
            email="meeracse1@gmail.com"
            linkedin="https://www.linkedin.com/in/meeravathi-sivakumar-5b1478325"
            google="https://g.dev/MeeravathiSivakumar"
            github="https://github.com/meeravathi"
            twitter="https://twitter.com/meeravathi"
            aboutContent={
              <p className="text">
                A highly skilled frontend developer specializing in modern UI/UX design. Meeravathi's exceptional design sensibilities and rigorous attention to detail drive the polished, user-centric experiences across FUTECX's core products.
              </p>
            }
            experienceContent={
              <ul className="text-muted" style={{ lineHeight: 1.6 }}>
                <li><strong>Lead Frontend Developer - FUTECX:</strong> Architects and develops the complete visual interface for the FUTECX ecosystem. Champions responsive design, accessibility, and high-performance React architectures.</li>
                <li><strong>Enterprise Projects:</strong> Headed the UI development for the massive SAI MEERA Digital Business Website, ensuring a seamless e-commerce and portfolio experience.</li>
                <li><strong>Design System Strategist:</strong> Created and maintains the FUTECX component library, bridging the gap between raw backend capabilities and elegant user experiences.</li>
              </ul>
            }
            contactContent={
              <>
                <p className="text">Email: <a href="mailto:meeracse1@gmail.com">meeracse1@gmail.com</a></p>
                <p className="text">LinkedIn: <a href="https://www.linkedin.com/in/meeravathi-sivakumar-5b1478325" target="_blank" rel="noreferrer">linkedin.com/in/meeravathi-sivakumar</a></p>
              </>
            }
          />

          {/* Card 3: A. Arunprasath */}
          <TeamCard
            id="card3"
            name="Arunprasath A"
            role="Frontend Developer & Designer"
            imgSrc="/image/team/arunprasath.jpg"
            email="Prasathaarun787@gmail.com"
            github="https://github.com/arunprasath"
            linkedin="https://www.linkedin.com/in/a-arun-prasath-153498305"
            google="https://g.dev/arunprasath"
            twitter="https://twitter.com/arunprasath"
            aboutContent={
              <p className="text">
                A passionate developer and UI/UX designer with 3+ years of experience. Arunprasath actively drives frontend modernization at FUTECX, crafting visually striking and highly functional user interfaces.
              </p>
            }
            experienceContent={
              <ul className="text-muted" style={{ lineHeight: 1.6 }}>
                <li><strong>Frontend Engineer & Designer:</strong> Builds robust, scalable, and responsive web platforms utilizing modern JavaScript frameworks.</li>
                <li><strong>FUTECX Core Contributor:</strong> Consistently delivers full-stack logic integrations, design wireframes, and production-level UI enhancements.</li>
                <li><strong>AI Integration UI:</strong> Designed and implemented the frontend monitoring dashboards for the AI-based Traffic Management System.</li>
                <li><strong>Strategic Execution:</strong> Leverages leadership and cross-functional team collaboration to ensure project milestones are delivered with high quality.</li>
              </ul>
            }
            contactContent={
              <>
                <p className="text">Email: <a href="mailto:Prasathaarun787@gmail.com">Prasathaarun787@gmail.com</a></p>
                <p className="text">GitHub: <a href="https://github.com/arunprasath" target="_blank" rel="noreferrer">github.com/arunprasath</a></p>
                <p className="text">LinkedIn: <a href="https://www.linkedin.com/in/a-arun-prasath-153498305" target="_blank" rel="noreferrer">linkedin.com/in/a-arun-prasath</a></p>
              </>
            }
          />
        </div>
      </section>

      {/* COMMUNITY & ECOSYSTEM */}
      <section className="py-5" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", color: "#fff" }}>
        <div className="container py-5 text-center">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8" data-aos="fade-up">
              <span className="badge bg-primary bg-opacity-25 text-white border border-primary border-opacity-50 rounded-pill px-4 py-2 mb-4 fs-6 shadow-sm" style={{ letterSpacing: "2px", textTransform: "uppercase" }}>FUTECX Developer Ecosystem</span>
              <h2 className="display-5 fw-bolder mb-3 text-white">More Than Just a Core Team.</h2>
              <p className="lead fw-light opacity-75">
                The FUTECX ecosystem is powered by a massive community of young innovators, students, and open-source contributors.
              </p>
            </div>
          </div>
          <div className="row g-4 text-center">
            <div className="col-md-4" data-aos="zoom-in">
              <h1 className="display-4 fw-black text-info mb-0">200+</h1>
              <p className="fs-5 opacity-75 mt-2">Active Contributors</p>
            </div>
            <div className="col-md-4" data-aos="zoom-in" data-aos-delay="100">
              <h1 className="display-4 fw-black text-primary mb-0">147+</h1>
              <p className="fs-5 opacity-75 mt-2">Internships Completed</p>
            </div>
            <div className="col-md-4" data-aos="zoom-in" data-aos-delay="200">
              <h1 className="display-4 fw-black text-info mb-0">1 Platform</h1>
              <p className="fs-5 opacity-75 mt-2">The Young Innovators Platform</p>
            </div>
          </div>
          <div className="mt-5 pt-3" data-aos="fade-up" data-aos-delay="300">
            <Link href="/community" className="btn btn-outline-light rounded-pill px-5 py-3 fw-bold fs-5">
              Explore Our Community
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
