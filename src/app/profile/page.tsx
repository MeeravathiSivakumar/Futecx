"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <div className="spinner-grow text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const isFutecxMember = user.email === "ashwinkalai2k@gmail.com" || user.email?.endsWith("@futecx.com");

  return (
    <div className="profile-page bg-light" style={{ minHeight: "100vh", paddingBottom: "80px" }}>
      {/* Sleek Gradient Banner */}
      <div className="position-relative" style={{ height: "240px", background: "linear-gradient(135deg, #0f172a 0%, #1e40af 100%)", overflow: "hidden" }}>
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: "url('https://www.transparenttextures.com/patterns/cubes.png')", opacity: 0.2 }}></div>
        <div className="position-absolute bottom-0 start-0 w-100" style={{ height: "100px", background: "linear-gradient(0deg, #f8f9fa 0%, transparent 100%)" }}></div>
      </div>

      <div className="container position-relative" style={{ marginTop: "-120px", zIndex: 10 }}>
        <div className="row g-5">
          {/* Left Sidebar - Profile Card */}
          <div className="col-lg-4">
            <div className="card border-0 rounded-4 overflow-hidden mb-4" data-aos="fade-up" style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.08)" }}>
              <div className="card-body p-0">
                <div className="text-center p-5 bg-white border-bottom">
                  <div className="position-relative d-inline-block mb-3">
                    <img 
                      src={user.photoURL || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"} 
                      alt={user.displayName || "User"}
                      className="rounded-circle shadow-sm bg-white p-1"
                      style={{ width: "160px", height: "160px", objectFit: "cover", border: "4px solid #f8f9fa" }}
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                      onError={(e) => { e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"; }}
                    />
                    <span className="position-absolute bottom-0 end-0 p-2 bg-success border border-white border-3 rounded-circle shadow-sm" title="Online" style={{ width: "28px", height: "28px", marginBottom: "10px", marginRight: "10px" }}></span>
                  </div>
                  <h3 className="fw-black text-dark mb-1" style={{ letterSpacing: "-0.5px" }}>{user.displayName}</h3>
                  <p className="text-muted mb-3 fw-medium">{user.email}</p>
                  
                  {isFutecxMember && (
                    <div className="d-flex justify-content-center gap-2 mb-4">
                      <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 rounded-pill px-3 py-2 fw-semibold">
                        <i className="fa-solid fa-code me-2"></i>FUTECX Member
                      </span>
                    </div>
                  )}

                  <div className="d-grid gap-2">
                    <button className="btn btn-dark rounded-pill py-2 fw-bold shadow-sm transition-all hover-lift">
                      <i className="fa-solid fa-pen-to-square me-2"></i> Edit Profile
                    </button>
                    <button onClick={() => { logout(); router.push("/"); }} className="btn btn-light rounded-pill py-2 fw-bold text-danger border transition-all hover-lift mt-2">
                      <i className="fa-solid fa-right-from-bracket me-2"></i> Sign Out
                    </button>
                  </div>
                </div>
                <div className="bg-light p-4">
                  <h6 className="fw-bold text-uppercase text-muted mb-3" style={{ fontSize: "0.85rem", letterSpacing: "1px" }}>About</h6>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-3 d-flex align-items-center text-dark">
                      <i className="fa-solid fa-location-dot text-muted me-3" style={{ width: "20px" }}></i>
                      <span className="fw-medium">Global User</span>
                    </li>
                    {isFutecxMember && (
                      <>
                        <li className="mb-3 d-flex align-items-center text-dark">
                          <i className="fa-solid fa-building text-muted me-3" style={{ width: "20px" }}></i>
                          <span className="fw-medium">TN-FUTECX</span>
                        </li>
                        <li className="d-flex align-items-center text-dark">
                          <i className="fa-regular fa-calendar text-muted me-3" style={{ width: "20px" }}></i>
                          <span className="fw-medium">Joined September 2026</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Dashboard */}
          <div className="col-lg-8">
            {isFutecxMember ? (
              <>
                {/* Overview Stats */}
                <h4 className="fw-bold text-dark mb-4" data-aos="fade-up">Dashboard Overview</h4>
                <div className="row g-4 mb-5" data-aos="fade-up" data-aos-delay="100">
                  <div className="col-md-6">
                    <div className="card h-100 border-0 rounded-4 p-4 transition-all hover-lift" style={{ background: "linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%)", boxShadow: "0 5px 20px rgba(13,110,253,0.05)" }}>
                      <div className="d-flex align-items-center mb-4">
                        <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3 shadow" style={{ width: "48px", height: "48px", fontSize: "1.2rem" }}>
                          <i className="fa-solid fa-rocket"></i>
                        </div>
                        <div>
                          <h6 className="fw-bold text-muted mb-0 text-uppercase" style={{ fontSize: "0.8rem", letterSpacing: "1px" }}>Active Projects</h6>
                          <h3 className="fw-black text-dark mb-0">3</h3>
                        </div>
                      </div>
                      <div className="progress mt-auto" style={{ height: "6px" }}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{ width: "75%" }} aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}></div>
                      </div>
                      <p className="text-muted small mt-2 mb-0 fw-medium">75% completion rate across projects</p>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="card h-100 border-0 rounded-4 p-4 transition-all hover-lift" style={{ background: "linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)", boxShadow: "0 5px 20px rgba(25,135,84,0.05)" }}>
                      <div className="d-flex align-items-center mb-4">
                        <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3 shadow" style={{ width: "48px", height: "48px", fontSize: "1.2rem" }}>
                          <i className="fa-solid fa-medal"></i>
                        </div>
                        <div>
                          <h6 className="fw-bold text-muted mb-0 text-uppercase" style={{ fontSize: "0.8rem", letterSpacing: "1px" }}>Achievements</h6>
                          <h3 className="fw-black text-dark mb-0">12</h3>
                        </div>
                      </div>
                      <div className="d-flex gap-2 mt-auto">
                        <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 rounded-pill px-3 py-2"><i className="fa-solid fa-star me-1"></i> Top Contributor</span>
                        <span className="badge bg-info bg-opacity-10 text-info border border-info border-opacity-25 rounded-pill px-3 py-2"><i className="fa-solid fa-bolt me-1"></i> Fast Shipper</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Activity Timeline */}
                <h4 className="fw-bold text-dark mb-4" data-aos="fade-up" data-aos-delay="200">Recent Activity</h4>
                <div className="card border-0 shadow-sm rounded-4" data-aos="fade-up" data-aos-delay="250">
                  <div className="card-body p-5">
                    <div className="position-relative">
                      {/* Timeline Line */}
                      <div className="position-absolute top-0 bottom-0 start-0 ms-3" style={{ width: "2px", background: "#e9ecef" }}></div>
                      
                      {/* Item 1 */}
                      <div className="position-relative mb-4 pb-2" style={{ paddingLeft: "45px" }}>
                        <div className="position-absolute top-0 start-0 bg-primary text-white rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: "28px", height: "28px", marginLeft: "0px", zIndex: 2, fontSize: "0.8rem" }}>
                          <i className="fa-solid fa-check"></i>
                        </div>
                        <h6 className="fw-bold mb-1 text-dark">Joined TN-FUTECX Community</h6>
                        <p className="text-muted small mb-0 fw-medium">You are now part of the ecosystem.</p>
                        <small className="text-muted opacity-75 mt-1 d-block">2 hours ago</small>
                      </div>
                      
                      {/* Item 2 */}
                      <div className="position-relative" style={{ paddingLeft: "45px" }}>
                        <div className="position-absolute top-0 start-0 bg-secondary bg-opacity-25 text-secondary rounded-circle d-flex align-items-center justify-content-center shadow-sm border border-white border-2" style={{ width: "28px", height: "28px", marginLeft: "0px", zIndex: 2, fontSize: "0.8rem" }}>
                          <i className="fa-solid fa-user-plus"></i>
                        </div>
                        <h6 className="fw-bold mb-1 text-dark">Account Created</h6>
                        <p className="text-muted small mb-0 fw-medium">Welcome aboard!</p>
                        <small className="text-muted opacity-75 mt-1 d-block">1 day ago</small>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="card border-0 rounded-4 shadow-sm p-5 text-center" data-aos="fade-up">
                <div className="mb-4">
                  <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: "80px", height: "80px", fontSize: "2rem" }}>
                    <i className="fa-solid fa-hand-wave"></i>
                  </div>
                  <h3 className="fw-bold text-dark">Welcome to FUTECX</h3>
                  <p className="text-muted lead mb-0">You are currently logged in as a guest user.</p>
                </div>
                <hr className="my-4 text-muted opacity-25" />
                <div className="row g-4 justify-content-center">
                  <div className="col-md-5">
                    <div className="p-4 bg-light rounded-4 h-100 text-start border">
                      <h6 className="fw-bold text-dark"><i className="fa-solid fa-code me-2 text-primary"></i>Become a Contributor</h6>
                      <p className="text-muted small mb-3">Join our community of developers and start shipping real-world products.</p>
                      <Link href="/team" className="btn btn-outline-primary btn-sm rounded-pill px-4 fw-bold">Apply Now</Link>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="p-4 bg-light rounded-4 h-100 text-start border">
                      <h6 className="fw-bold text-dark"><i className="fa-solid fa-briefcase me-2 text-primary"></i>Career Opportunities</h6>
                      <p className="text-muted small mb-3">Looking for a full-time role? Check out our open positions.</p>
                      <Link href="/careers" className="btn btn-primary btn-sm rounded-pill px-4 fw-bold shadow-sm">View Roles</Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
