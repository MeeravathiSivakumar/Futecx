"use client";
import React, { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function AgentOSApplicationForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const get = (name: string) => (form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)?.value?.trim() ?? "";

    try {
      await addDoc(collection(db, "agentos_applications"), {
        formType: "AgentOS Project Application",
        name: get("name"),
        email: get("email"),
        phone: get("phone"),
        contributionArea: get("contributionArea"),
        aiExperience: get("aiExperience"),
        tools: get("tools"),
        github: get("github"),
        linkedin: get("linkedin"),
        sampleWork: get("sampleWork"),
        motivation: get("motivation"),
        submittedAt: serverTimestamp(),
        status: "pending",
      });
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-vh-100" style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)", paddingTop: "100px", paddingBottom: "60px" }}>
      <div className="container" style={{ maxWidth: "700px" }}>
        <div className="text-center mb-5">
          <span className="badge rounded-pill mb-3 px-3 py-2" style={{ background: "#059669", color: "#fff", letterSpacing: "2px", fontSize: "0.75rem" }}>AGENTOS PROJECT</span>
          <h1 className="fw-black text-dark" style={{ fontSize: "2.2rem" }}>Join AgentOS Development</h1>
          <p className="text-muted">Contribute to FUTECX's flagship multi-model AI agent workspace. Build the future of autonomous intelligence.</p>
        </div>

        {status === "success" ? (
          <div className="text-center p-5 bg-white rounded-4 shadow-sm">
            <div style={{ fontSize: "4rem" }}>🤖</div>
            <h4 className="fw-bold mt-3" style={{ color: "#059669" }}>Application Received!</h4>
            <p className="text-muted">Our AgentOS team will review your profile. Welcome to the frontier!</p>
            <button className="btn rounded-pill px-4 mt-2" style={{ background: "#059669", color: "#fff" }} onClick={() => setStatus("idle")}>Submit Another</button>
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
                <label className="form-label fw-semibold small">Contribution Area *</label>
                <select name="contributionArea" className="form-select rounded-3" required>
                  <option value="">-- Select Area --</option>
                  <option>LLM Integration & Prompt Engineering</option>
                  <option>Agent Orchestration & Workflow</option>
                  <option>Frontend (React/Next.js)</option>
                  <option>Backend API & Infrastructure</option>
                  <option>RAG & Knowledge Bases</option>
                  <option>Computer Vision Module</option>
                  <option>Testing & QA</option>
                  <option>Documentation</option>
                </select>
              </div>
              <div className="col-12">
                <label className="form-label fw-semibold small">AI / ML Experience Level *</label>
                <select name="aiExperience" className="form-select rounded-3" required>
                  <option value="">-- Select --</option>
                  <option>Beginner (learning AI fundamentals)</option>
                  <option>Intermediate (built AI projects)</option>
                  <option>Advanced (production AI systems)</option>
                  <option>Expert (research / published work)</option>
                </select>
              </div>
              <div className="col-12">
                <label className="form-label fw-semibold small">Tools & Technologies *</label>
                <input name="tools" type="text" className="form-control rounded-3" placeholder="e.g., LangChain, OpenAI API, FastAPI, Next.js, Docker" required />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold small">GitHub Profile *</label>
                <input name="github" type="url" className="form-control rounded-3" placeholder="https://github.com/you" required />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold small">LinkedIn Profile</label>
                <input name="linkedin" type="url" className="form-control rounded-3" placeholder="https://linkedin.com/in/you" />
              </div>
              <div className="col-12">
                <label className="form-label fw-semibold small">Link to Relevant Work / Project</label>
                <input name="sampleWork" type="url" className="form-control rounded-3" placeholder="GitHub repo, demo, or portfolio link" />
              </div>
              <div className="col-12">
                <label className="form-label fw-semibold small">Why do you want to build AgentOS? *</label>
                <textarea name="motivation" rows={4} className="form-control rounded-3" placeholder="Describe your vision for autonomous AI agents and what you'd contribute to AgentOS..." required />
              </div>
            </div>
            <div className="mt-4">
              <button type="submit" className="btn fw-bold w-100 rounded-pill py-3" style={{ background: "linear-gradient(90deg, #059669, #0ea5e9)", color: "#fff", border: "none" }} disabled={status === "loading"}>
                {status === "loading" ? "Submitting..." : "Apply to AgentOS Team →"}
              </button>
              {status === "error" && <p className="text-danger text-center mt-2 small">Something went wrong. Please try again.</p>}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
