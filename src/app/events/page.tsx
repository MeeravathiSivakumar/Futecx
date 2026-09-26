"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

export default function EventsPage() {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  const pastEvents = [
    {
      title: "FUTECX Developer Internship Cohort",
      type: "Intensive Internship",
      date: "2024 - 2025",
      desc: "Successfully onboarded and mentored highly skilled interns, guiding them through rigorous full-stack development challenges and AI integration projects, effectively shaping the next generation of top-tier developers.",
      icon: "fa-solid fa-laptop-code",
      img: "/image/events/event_internship.jpg"
    },
    {
      title: "Advanced Tech Sessions via Google Meet",
      type: "Virtual Workshop",
      date: "Regularly Hosted",
      desc: "Conducted high-level interactive technical seminars and system architecture planning meetings via Google Meet. These virtual deep-dives covered everything from foundational web frameworks to cutting-edge Generative AI workflows.",
      icon: "fa-solid fa-video",
      img: "/image/events/event_workshop.jpg"
    },
    {
      title: "Campus Innovation Hackathons",
      type: "Live Buildathon",
      date: "Multiple Semesters",
      desc: "Mentored and led intensive campus hackathons, providing critical architectural guidance and strategic product planning to student developers, resulting in the successful deployment of multiple viable prototypes.",
      icon: "fa-solid fa-rocket",
      img: "/image/events/event_buildathon.jpg"
    }
  ];

  return (
    <>
      {/* HEADER SECTION */}
      <section className="position-relative py-5 d-flex align-items-center justify-content-center min-vh-50" style={{ 
        background: "url('/image/company/events-bg.png') no-repeat center center/cover",
        paddingTop: "100px", paddingBottom: "100px" 
      }}>
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: "rgba(11, 18, 32, 0.8)" }}></div>
        <div className="container text-center position-relative z-index-2 py-5 mt-4">
          <span className="badge bg-primary bg-opacity-25 text-info border border-info border-opacity-50 rounded-pill px-4 py-2 mb-3 shadow" data-aos="fade-down">Community & Learning</span>
          <h1 className="display-3 fw-bold text-white mb-3" data-aos="zoom-in" style={{ textShadow: "0 10px 30px rgba(0,0,0,0.8)" }}><span className="text-info fw-bolder">Events</span> & Workshops</h1>
          <p className="lead text-light opacity-75 mx-auto" style={{ maxWidth: "800px" }} data-aos="fade-up" data-aos-delay="200">
            Join the FUTECX developer ecosystem. Explore our upcoming live sessions, deep-dive workshops, and look back at our history of engineering excellence.
          </p>
        </div>
      </section>

      {/* PAST EVENTS SECTION (Moved right below header) */}
      <section className="py-5 bg-white">
        <div className="container py-5">
          <div className="text-center mb-5" data-aos="fade-up">
            <h6 className="text-primary fw-bold text-uppercase tracking-wider">Our Legacy</h6>
            <h2 className="display-5 fw-bold text-dark">Events Conducted by FUTECX</h2>
            <p className="text-muted mx-auto mt-3" style={{ maxWidth: "600px" }}>A look back at the impactful workshops, internships, and deep-dive sessions we have successfully orchestrated.</p>
          </div>

          <div className="row g-4">
            {pastEvents.map((evt, idx) => (
              <div key={idx} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={idx * 100}>
                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden bg-light hover-shadow transition-all">
                  <div className="position-relative">
                    <img src={evt.img} className="card-img-top" alt={evt.title} style={{ height: "220px", objectFit: "cover" }} />
                    <div className="position-absolute top-0 start-0 m-3 badge bg-white text-dark shadow-sm px-3 py-2 rounded-pill fw-bold">
                      {evt.date}
                    </div>
                  </div>
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-3 text-primary fw-bold small text-uppercase">
                      <i className={`${evt.icon} me-2`}></i> {evt.type}
                    </div>
                    <h4 className="card-title fw-bold mb-3">{evt.title}</h4>
                    <p className="card-text text-muted lh-lg mb-0">{evt.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DISCORD / COMMUNITY CTA SECTION (Above Footer) */}
      <section className="py-5 bg-light">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center" data-aos="zoom-in">
              <div className="card border-0 shadow-lg rounded-4 overflow-hidden" style={{ background: "linear-gradient(135deg, #0b1220 0%, #1e293b 100%)" }}>
                <div className="card-body p-5">
                  <i className="fa-brands fa-discord display-2 text-info mb-4"></i>
                  <h2 className="text-white fw-bold mb-3">Want to join events like these?</h2>
                  <p className="text-light opacity-75 mb-4 lh-lg mx-auto" style={{ maxWidth: "600px" }}>
                    There are no live upcoming events at this moment, but our developer ecosystem is always active. Join the official FUTECX Discord community to be the first to know about future workshops, hackathons, and internship cohorts!
                  </p>
                  <Link href="/community" className="btn btn-info rounded-pill px-5 py-3 fw-bold text-dark shadow-sm hover-lift">
                    Join Our Discord Community <i className="fa-solid fa-arrow-right ms-2"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
