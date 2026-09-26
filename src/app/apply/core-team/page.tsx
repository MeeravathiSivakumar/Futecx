"use client";
import React, { useState } from "react";

export default function CoreTeamForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const get = (name: string) => (form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)?.value?.trim() ?? "";

    try {
      await addDoc(collection(db, "core_team_applications"), {
        formType: "Core Team Application",
        name: get("name"),
        email: get("email"),
        phone: get("phone"),
        role: get("role"),
        experience: get("experience"),
        portfolio: get("portfolio"),
        github: get("github"),
        linkedin: get("linkedin"),
        currentRole: get("currentRole"),
        vision: get("vision"),
        availability: get("availability"),
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
    <div className="min-vh-100" style={{ background: "linear-gradient(135deg, #fdf4ff 0%, #ede9fe 100%)", paddingTop: "100px", paddingBottom: "60px" }}>
      <div className="container" style={{ maxWidth: "700px" }}>
        <div className="text-center mb-5">
          <span className="badge rounded-pill mb-3 px-3 py-2" style={{ background: "#7c3aed", color: "#fff", letterSpacing: "2px", fontSize: "0.75rem" }}>CORE TEAM</span>
          <h1 className="fw-black text-dark" style={{ fontSize: "2.2rem" }}>Join the Core Team</h1>
          <p className="text-muted">We're looking for driven leaders to shape FUTECX's next chapter. Full-time or part-time roles available.</p>
        </div>

        {status === "success" ? (
          <div className="text-center p-5 bg-white rounded-4 shadow-sm">
            <div style={{ fontSize: "4rem" }}>🚀</div>
            <h4 className="fw-bold mt-3" style={{ color: "#7c3aed" }}>Application Received!</h4>
            <p className="text-muted">Our leadership team will review your profile and get in touch very soon.</p>
            <button className="btn rounded-pill px-4 mt-2" style={{ background: "#7c3aed", color: "#fff" }} onClick={() => setStatus("idle")}>Submit Another</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-4 shadow-sm p-4 p-md-5">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold small">Full Name *</label>
                <input name="name" type="text" className="form-control rounded-3" placeholder="Your full name" required />
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
                <label className="form-label fw-semibold small">Role Applying For *</label>
                <select name="role" className="form-select rounded-3" required>
                  <option value="">-- Select Role --</option>
                  <option>AI/ML Engineer</option>
                  <option>Full-Stack Developer</option>
                  <option>DevOps Engineer</option>
                  <option>UI/UX Designer</option>
                  <option>Product Manager</option>
                  <option>Community Manager</option>
                  <option>Cybersecurity Specialist</option>
                  <option>Business Development</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold small">Years of Experience *</label>
                <select name="experience" className="form-select rounded-3" required>
                  <option value="">-- Select --</option>
                  <option>Fresher (0 years)</option>
                  <option>0 – 1 year</option>
                  <option>1 – 3 years</option>
                  <option>3 – 5 years</option>
                  <option>5+ years</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold small">Availability *</label>
                <select name="availability" className="form-select rounded-3" required>
                  <option value="">-- Select --</option>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Remote</option>
                  <option>Flexible</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold small">Current Role / Company</label>
                <input name="currentRole" type="text" className="form-control rounded-3" placeholder="e.g., Software Engineer @ XYZ" />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold small">LinkedIn Profile</label>
                <input name="linkedin" type="url" className="form-control rounded-3" placeholder="https://linkedin.com/in/you" />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold small">GitHub Profile</label>
                <input name="github" type="url" className="form-control rounded-3" placeholder="https://github.com/you" />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold small">Portfolio / Website</label>
                <input name="portfolio" type="url" className="form-control rounded-3" placeholder="https://yourportfolio.com" />
              </div>
              <div className="col-12">
                <label className="form-label fw-semibold small">What is your vision for FUTECX? *</label>
                <textarea name="vision" rows={4} className="form-control rounded-3" placeholder="Share your ideas, what you'd build, and how you'd drive FUTECX forward..." required />
              </div>
            </div>
            <div className="mt-4">
              <button type="submit" className="btn fw-bold w-100 rounded-pill py-3" style={{ background: "linear-gradient(90deg, #7c3aed, #4f46e5)", color: "#fff", border: "none" }} disabled={status === "loading"}>
                {status === "loading" ? "Submitting..." : "Apply for Core Team →"}
              </button>
              {status === "error" && <p className="text-danger text-center mt-2 small">Something went wrong. Please try again.</p>}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
