"use client";

import React, { useEffect } from "react";
import "./achievements.css";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AchievementsPage() {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  const achievements = [
    {
      date: "2024",
      title: "State-Level Innovation Hackathon — 1st Special Prize",
      desc: "Secured the 1st Special Prize among top developers by showcasing our highly innovative 'Traffino Management System', an advanced prototype for real-time traffic monitoring and emergency route optimization.",
      img: "/image/achievements/hackathon-prize.jpg",
      badge: "Major Victory",
      icon: "fa-solid fa-trophy"
    },
    {
      date: "2024",
      title: "Google Cloud Gen AI Academy Certification",
      desc: "Successfully completed the Google Cloud Gen AI Academy APAC Cohort, mastering the architecture, deployment, and orchestration of advanced intelligent AI agents on Google Cloud Run.",
      img: "/image/achievements/gen-ai-cert.jpg",
      badge: "AI Excellence",
      icon: "fa-solid fa-brain"
    },
    {
      date: "2024",
      title: "Microsoft Engagements",
      desc: "Participated in high-level tech engagements and interviews with Microsoft, validating our advanced technological approach and significantly expanding our enterprise network.",
      img: "/image/achievements/microsoft-hub.jpg",
      badge: "Industry Connect",
      icon: "fa-solid fa-handshake"
    },
    {
      date: "2023",
      title: "Premier 24-Hour Buildathon Champion",
      desc: "Emerged victorious in an intensive, highly competitive 24-hour buildathon, outperforming top developer teams to architect and deploy cutting-edge software solutions from scratch.",
      img: "/image/achievements/buildathon.jpg",
      badge: "Hackathon Win",
      icon: "fa-solid fa-medal"
    },
    {
      date: "Ongoing",
      title: "Thought Leadership at Premier Tech Summits",
      desc: "Established a dominant industry presence by actively engaging in and contributing to prestigious technology conferences, showcasing our advanced capabilities in AI architectures to tech leaders and peers.",
      img: "/image/achievements/aws-summit.png",
      badge: "Industry Presence",
      icon: "fa-solid fa-users"
    }
  ];

  return (
    <>
      {/* HEADER SECTION */}
      <section className="position-relative py-5 d-flex align-items-center justify-content-center min-vh-50" style={{ 
        background: "url('/image/company/achievement-bg.png') no-repeat center center/cover",
        paddingTop: "100px", paddingBottom: "100px" 
      }}>
        {/* Dark overlay for perfect text readability */}
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: "rgba(11, 18, 32, 0.75)" }}></div>
        <div className="container text-center position-relative z-index-2 py-5 mt-4">
          <span className="badge bg-primary bg-opacity-25 text-info border border-info border-opacity-50 rounded-pill px-4 py-2 mb-3 shadow" data-aos="fade-down">Our Milestones</span>
          <h1 className="display-3 fw-bold text-white mb-3" data-aos="zoom-in" style={{ textShadow: "0 10px 30px rgba(0,0,0,0.8)" }}>Awards & <span className="text-info fw-bolder">Achievements</span></h1>
          <p className="lead text-light opacity-75 mx-auto" style={{ maxWidth: "800px" }} data-aos="fade-up" data-aos-delay="200">
            From dominating hackathons to engaging with global tech leaders. A look at FUTECX's real-world victories and industry milestones.
          </p>
        </div>
      </section>

      {/* TIMELINE SECTION */}
      <section className="bg-light py-5">
        <div className="container py-5">
          <div className="timeline">
            {achievements.map((ach, index) => (
              <div key={index} className={`timeline-container ${index % 2 === 0 ? "left" : "right"}`} data-aos={index % 2 === 0 ? "fade-right" : "fade-left"} data-aos-duration="1000">
                <div className="timeline-content">
                  <div className="timeline-date">{ach.date}</div>
                  <img src={ach.img} alt={ach.title} className="timeline-image shadow-sm" />
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: "45px", height: "45px", fontSize: "1.2rem" }}>
                      <i className={ach.icon}></i>
                    </div>
                    <h4 className="fw-bolder mb-0" style={{ letterSpacing: "-0.5px", color: "#0f172a" }}>{ach.title}</h4>
                  </div>
                  <p className="text-secondary lh-lg mb-0" style={{ fontSize: "0.95rem" }}>{ach.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}






