"use client";

import React, { useRef, useState } from "react";
import "./contact.css";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const name = (formRef.current.elements.namedItem("name") as HTMLInputElement).value.trim();
    const email = (formRef.current.elements.namedItem("email") as HTMLInputElement).value.trim();
    const phone = (formRef.current.elements.namedItem("phone") as HTMLInputElement).value.trim();
    const service = (formRef.current.elements.namedItem("service") as HTMLSelectElement).value;
    const message = (formRef.current.elements.namedItem("message") as HTMLTextAreaElement).value.trim();

    if (!name || !email || !message) {
      alert("Please fill all required fields.");
      return;
    }

    setLoading(true);

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      // If keys are provided, use real EmailJS. Otherwise, simulate success for MVP demo.
      if (serviceId && serviceId !== "YOUR_SERVICE_ID") {
        await emailjs.send(
          serviceId,
          templateId || "",
          { name, email, phone, service, message },
          publicKey
        );
      } else {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log("Mock Email Sent:", { name, email, phone, service, message });
      }
      
      alert("🎉 Message sent successfully! Our team will get back to you shortly.");
      formRef.current.reset();
    } catch (error) {
      console.error(error);
      alert("Failed to send message. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="contact-hero">
        <div className="container contact-hero-content text-center" style={{ paddingTop: '80px' }}>
          <span className="badge bg-primary bg-opacity-25 text-info border border-info border-opacity-50 rounded-pill px-4 py-2 mb-3 shadow" data-aos="fade-down">Let's Connect</span>
          <h1 className="display-3 fw-light text-white mb-3" data-aos="zoom-in" style={{ textShadow: "0 10px 30px rgba(0,0,0,0.8)" }}>Partner with <span className="text-info fw-bolder">FUTECX</span></h1>
          <p className="lead text-light opacity-75 mx-auto" style={{ maxWidth: "800px" }} data-aos="fade-up" data-aos-delay="200">
            Whether you need an AI agent, a full-scale web platform, or creative digital design, our team is ready to build the future with you.
          </p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="contact-section-dark py-5">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-11">
              <div className="contact-glass-container d-flex flex-column flex-md-row">
                
                {/* Left: Info */}
                <div className="contact-info-panel d-flex flex-column col-md-5" data-aos="fade-right">
                  <h3 className="fw-bold mb-3">Contact Information</h3>
                  <p className="text-white-50 mb-5">Fill out the form and our team will get back to you within 24 hours.</p>
                  
                  <div className="d-flex flex-column">
                    <div className="contact-info-item">
                      <div className="contact-icon-glass">
                        <i className="fa-solid fa-building"></i>
                      </div>
                      <div>
                        <h6 className="mb-0 fw-bold">Company</h6>
                        <small className="text-white-50">FUTECX Technologies Pvt Ltd</small>
                      </div>
                    </div>

                    <div className="contact-info-item">
                      <div className="contact-icon-glass">
                        <i className="fa-solid fa-map-marker-alt"></i>
                      </div>
                      <div>
                        <h6 className="mb-0 fw-bold">Location</h6>
                        <small className="text-white-50">143 TN-Future Tech Park,<br/>Thanjavur, Tamil Nadu, India</small>
                      </div>
                    </div>

                    <div className="contact-info-item">
                      <div className="contact-icon-glass">
                        <i className="fa-solid fa-envelope"></i>
                      </div>
                      <div>
                        <h6 className="mb-0 fw-bold">Email Us</h6>
                        <a href="mailto:tnfutecx@gmail.com" className="text-white-50 text-decoration-none">tnfutecx@gmail.com</a>
                      </div>
                    </div>

                    <div className="contact-info-item">
                      <div className="contact-icon-glass" style={{ color: '#25D366' }}>
                        <i className="fa-brands fa-whatsapp"></i>
                      </div>
                      <div>
                        <h6 className="mb-0 fw-bold">WhatsApp</h6>
                        <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer" className="text-white-50 text-decoration-none">+91 XXXXXXXXXX</a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-5">
                    <p className="mb-0 small text-white-50">
                      <i className="fa-regular fa-clock me-2"></i> Business Hours: Mon – Sat (9:00 AM – 7:00 PM)
                    </p>
                  </div>
                </div>

                {/* Right: Form */}
                <div className="contact-form-panel col-md-7" data-aos="fade-left">
                  <h4 className="fw-bolder mb-2">Send Us a Message</h4>
                  <p className="text-white-50 mb-4 small">Select a FUTECX Business Division for your inquiry.</p>
                  
                  <form id="contactForm" ref={formRef} onSubmit={handleSubmit}>
                    <div className="row g-4">
                      
                      <div className="col-sm-6">
                        <label className="form-label small fw-bold text-white-50">First Name <span className="text-info">*</span></label>
                        <input type="text" id="name" name="name" className="form-control glass-input" placeholder="John Doe" required />
                      </div>
                      
                      <div className="col-sm-6">
                        <label className="form-label small fw-bold text-white-50">Email Address <span className="text-info">*</span></label>
                        <input type="email" id="email" name="email" className="form-control glass-input" placeholder="john@example.com" required />
                      </div>

                      <div className="col-sm-6">
                        <label className="form-label small fw-bold text-white-50">Phone Number</label>
                        <input type="text" id="phone" name="phone" className="form-control glass-input" placeholder="+91 98765 43210" />
                      </div>

                      <div className="col-sm-6">
                        <label className="form-label small fw-bold text-white-50">Service Division <span className="text-info">*</span></label>
                        <select id="service" name="service" className="form-select glass-input" required>
                          <option value="" className="text-dark">-- Select Division --</option>
                          <option value="AI & Intelligent Systems" className="text-dark">AI & Intelligent Systems</option>
                          <option value="Software & Product Engineering" className="text-dark">Software & Product Engineering</option>
                          <option value="Smart Mobility & Location Tech" className="text-dark">Smart Mobility & Location Tech</option>
                          <option value="Automation & Digital Platforms" className="text-dark">Automation & Digital Platforms</option>
                          <option value="Creative, Branding & Print" className="text-dark">Creative, Branding & Print</option>
                          <option value="Interactive Commerce" className="text-dark">Interactive Commerce & Experiences</option>
                        </select>
                      </div>

                      <div className="col-12">
                        <label className="form-label small fw-bold text-white-50">Your Message <span className="text-info">*</span></label>
                        <textarea id="message" name="message" className="form-control glass-input" rows={5} placeholder="Describe your project, requirements, or inquiry..." required></textarea>
                      </div>

                      <div className="col-12 mt-4">
                        <button type="submit" className="btn btn-glass-submit w-100" disabled={loading}>
                          {loading ? (
                            <span><i className="fa-solid fa-circle-notch fa-spin me-2"></i> Sending...</span>
                          ) : (
                            <span><i className="fa-solid fa-paper-plane me-2"></i> Send Message</span>
                          )}
                        </button>
                      </div>

                    </div>
                  </form>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
