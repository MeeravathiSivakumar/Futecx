"use client";
import React, { useState } from "react";

export default function InternApplicationForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const get = (name: string) => (form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)?.value?.trim() ?? "";

    try {
      await addDoc(collection(db, "intern_applications"), {
        formType: "Intern Application",
        name: get("name"),
        email: get("email"),
        phone: get("phone"),
        college: get("college"),
        year: get("year"),
        domain: get("domain"),
        skills: get("skills"),
        linkedin: get("linkedin"),
        whyFutecx: get("whyFutecx"),
        submittedAt: serverTimestamp(),
        status: isSpam({ name: get("name"), email: get("email"), phone: get("phone") }) ? "spam" : "pending",
      });
      setStatus("success");
      form.reset();
    } catch (error) { console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="min-vh-100" style={{ background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)", paddingTop: "100px", paddingBottom: "60px" }}>
      <div className="container" style={{ maxWidth: "700px" }}>
        <div className="text-center mb-5">
          <span className="badge rounded-pill mb-3 px-3 py-2" style={{ background: "#0ea5e9", color: "#fff", letterSpacing: "2px", fontSize: "0.75rem" }}>INTERNSHIP PROGRAMME</span>
          <h1 className="fw-black text-dark" style={{ fontSize: "2.2rem" }}>Join as an Intern</h1>
          <p className="text-muted">Get hands-on experience building real AI products and enterprise software at FUTECX.</p>
        </div>

        {status === "success" ? (
          <div className="text-center p-5 bg-white rounded-4 shadow-sm">
            <div style={{ fontSize: "4rem" }}>✅</div>
            <h4 className="fw-bold mt-3 text-success">Application Submitted!</h4>
            <p className="text-muted">Our team will review your application and reach out within 3–5 business days.</p>
            <button className="btn btn-primary rounded-pill px-4 mt-2" onClick={() => setStatus("idle")}>Submit Another</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-4 shadow-sm p-4 p-md-5">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold small">Full Name *</label>
                <input name="name" type="text" className="form-control rounded-3" placeholder="Ashwin Ramakrishnan" required />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold small">Email Address *</label>
                <input name="email" type="email" className="form-control rounded-3" placeholder="you@example.com" required />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold small">Phone Number *</label>
                <input name="phone" type="tel" className="form-control rounded-3" placeholder="+91 XXXXXXXXXX" required />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold small">College / University *</label>
                <input name="college" type="text" className="form-control rounded-3" placeholder="Your college name" required />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold small">Year of Study *</label>
                <select name="year" className="form-select rounded-3" required>
                  <option value="">-- Select Year --</option>
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                  <option>Postgraduate</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold small">Domain of Interest *</label>
                <select name="domain" className="form-select rounded-3" required>
                  <option value="">-- Select Domain --</option>
                  <option>AI & Machine Learning</option>
                  <option>Full-Stack Development</option>
                  <option>UI/UX Design</option>
                  <option>DevOps & Cloud</option>
                  <option>Cybersecurity</option>
                  <option>Computer Vision</option>
                  <option>Content & Community</option>
                </select>
              </div>
              <div className="col-12">
                <label className="form-label fw-semibold small">Key Skills *</label>
                <input name="skills" type="text" className="form-control rounded-3" placeholder="e.g., Python, React, TensorFlow, Figma" required />
              </div>
              <div className="col-12">
                <label className="form-label fw-semibold small">LinkedIn Profile</label>
                <input name="linkedin" type="url" className="form-control rounded-3" placeholder="https://linkedin.com/in/yourprofile" />
              </div>
              <div className="col-12">
                <label className="form-label fw-semibold small">Why do you want to intern at FUTECX? *</label>
                <textarea name="whyFutecx" rows={4} className="form-control rounded-3" placeholder="Tell us what excites you about FUTECX and what you hope to build here..." required />
              </div>
            </div>
            <div className="mt-4">
              <button type="submit" className="btn fw-bold w-100 rounded-pill py-3" style={{ background: "linear-gradient(90deg, #0ea5e9, #6366f1)", color: "#fff", border: "none" }} disabled={status === "loading"}>
                {status === "loading" ? "Submitting..." : "Submit Intern Application →"}
              </button>
              {status === "error" && <p className="text-danger text-center mt-2 small">Something went wrong. Please try again.</p>}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
