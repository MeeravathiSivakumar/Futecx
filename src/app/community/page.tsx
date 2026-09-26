"use client";
import React from "react";
import Link from "next/link";
import "./community.css";

export default function CommunityPage() {
  const SOCIAL_LINKS = [
    { id: 'whatsapp', name: 'WhatsApp', icon: 'fa-brands fa-whatsapp', desc: 'Join our exclusive team discussions and early beta access.', colorClass: 'card-whatsapp' },
    { id: 'discord', name: 'Discord', icon: 'fa-brands fa-discord', desc: 'Engage with open-source projects, hackathons, and mentorship.', colorClass: 'card-discord' },
    { id: 'instagram', name: 'Instagram', icon: 'fa-brands fa-instagram', desc: 'Behind-the-scenes content, design showcases, and team stories.', colorClass: 'card-instagram' },
    { id: 'youtube', name: 'YouTube', icon: 'fa-brands fa-youtube', desc: 'Tech tutorials, project reveals, and deep-dive podcasts.', colorClass: 'card-youtube' },
    { id: 'x', name: 'X (Twitter)', icon: 'fa-brands fa-twitter', desc: 'Latest announcements, quick updates, and industry insights.', colorClass: 'card-x' },
    { id: 'linkedin', name: 'LinkedIn', icon: 'fa-brands fa-linkedin-in', desc: 'Professional networking, hiring, and B2B partnerships.', colorClass: 'card-linkedin' },
    { id: 'facebook', name: 'Facebook', icon: 'fa-brands fa-facebook-f', desc: 'Community events, live streams, and general updates.', colorClass: 'card-facebook' }
  ];

  return (
    <>
      {/* HERO SECTION */}
      <section className="community-hero py-5 text-white d-flex align-items-center min-vh-50 position-relative" style={{
        background: "url('/image/company/community-header-bg.jpg') no-repeat center center/cover",
        paddingTop: "100px", paddingBottom: "100px"
      }}>
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: "rgba(11, 18, 32, 0.85)" }}></div>
        <div className="container position-relative z-index-2 py-5 text-center" style={{ paddingTop: '100px', paddingBottom: '50px' }}>
          <span className="badge bg-primary bg-opacity-25 text-info border border-info border-opacity-50 rounded-pill px-4 py-2 mb-3 shadow mt-5" data-aos="fade-down">The FUTECX Ecosystem</span>
          <h1 className="display-3 fw-bold text-white mb-3" data-aos="zoom-in" style={{ textShadow: "0 10px 30px rgba(0,0,0,0.8)" }}>Connect With <span className="text-info fw-bolder">Us</span></h1>
          <p className="lead text-light opacity-75 mx-auto" style={{ maxWidth: "800px" }} data-aos="fade-up" data-aos-delay="200">
            Join thousands of builders, researchers, and innovators across our global networks. Collaborate, learn, and shape the future of digital business.
          </p>
        </div>
      </section>

      {/* SOCIAL GRID */}
      <section className="py-5 bg-dark border-top border-primary border-opacity-25" style={{ minHeight: '60vh' }}>
        <div className="container py-5">
          <div className="row g-4 justify-content-center">
            {SOCIAL_LINKS.map((social, idx) => (
              <div className="col-xl-3 col-lg-4 col-md-6" key={social.id} data-aos="fade-up" data-aos-delay={idx * 100}>
                <a href="#" className={`social-card ${social.colorClass} card h-100 p-4 text-center rounded-4 text-white d-block`}>
                  <div className="mb-4 mt-3">
                    <i className={`${social.icon} display-4`}></i>
                  </div>
                  <h4 className="fw-bold mb-3">{social.name}</h4>
                  <p className="text-light opacity-50 small mb-2 px-2">
                    {social.desc}
                  </p>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA SECTION */}
      <section className="py-5 bg-light border-top">
        <div className="container py-5 text-center">
          <h2 className="fw-bolder mb-4">Ready to Build With Us?</h2>
          <p className="text-muted mb-4 mx-auto" style={{ maxWidth: '600px' }}>
            Whether you're looking for a technology partner, career opportunities, or simply want to explore generative AI, you belong here.
          </p>
          <Link href="/contact" className="btn btn-dark btn-lg rounded-pill px-5 py-3 fw-bold shadow">
            Contact Us Today
          </Link>
        </div>
      </section>
    </>
  );
}
