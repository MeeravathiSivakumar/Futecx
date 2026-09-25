"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

// Modern SVG Icons for Dropdowns
const Icons = {
  about: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="dropdown-svg"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" /></svg>,
  team: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="dropdown-svg"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg>,
  achieve: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="dropdown-svg"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>,
  event: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="dropdown-svg"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" /></svg>,
  services: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="dropdown-svg"><path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" /></svg>,
  products: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="dropdown-svg"><path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>,
  projects: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="dropdown-svg"><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" /></svg>,
  ai: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="dropdown-svg"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" /></svg>,
  community: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="dropdown-svg"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" /></svg>,
  careers: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="dropdown-svg"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.45 15.08 15.08 0 0 1-.06-.312m-2.24 2.39a4.499 4.499 0 0 0 1.415-1.515m.335-3.355a2.25 2.25 0 0 1 3.182-3.182m0 0a2.25 2.25 0 0 1 3.182 3.182m-3.182-3.182 1.06 1.06" /></svg>
};

export default function Navbar() {
  const { user, loginWithGoogle, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname === "/login") return null;

  return (
    <>

      <div className="sticky-top w-100 bg-white" style={{ zIndex: 1030, paddingTop: scrolled ? "10px" : "15px", paddingBottom: scrolled ? "10px" : "15px", transition: "all 0.3s ease", boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.05)" : "none" }}>
        <nav className="navbar navbar-expand-lg navbar-light nav-animated mx-auto" style={{
          width: scrolled ? "95%" : "90%",
          maxWidth: "1200px",
          borderRadius: "100px",
          padding: "0.5rem 1.5rem",
          background: "rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(0, 0, 0, 0.12)",
          transition: "all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)"
        }}>
      <div className="container-fluid px-2">
        <Link className="navbar-brand d-flex align-items-center" href="/">
          <Logo />
        </Link>
        <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav mx-auto nav-glass">
            <li className="nav-item"><Link className={`nav-link px-3 py-2 ${pathname === "/" ? "active" : ""}`} href="/">Home</Link></li>
            
            {/* Company Dropdown */}
            <li className="nav-item dropdown">
              <a className={`nav-link dropdown-toggle px-3 py-2 ${["/about", "/team", "/achievements", "/events"].includes(pathname) ? "active" : ""}`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Company
              </a>
              <ul className="dropdown-menu border-0 shadow custom-dropdown p-2" style={{ minWidth: "220px" }}>
                <li><Link className={`dropdown-item dropdown-item-custom d-flex align-items-center rounded ${pathname === "/about" ? "active" : ""}`} href="/about"><div className="dropdown-icon icon-about">{Icons.about}</div> About</Link></li>
                <li><Link className={`dropdown-item dropdown-item-custom d-flex align-items-center rounded mt-1 ${pathname === "/team" ? "active" : ""}`} href="/team"><div className="dropdown-icon icon-team">{Icons.team}</div> Team</Link></li>
                <li><Link className={`dropdown-item dropdown-item-custom d-flex align-items-center rounded mt-1 ${pathname === "/achievements" ? "active" : ""}`} href="/achievements"><div className="dropdown-icon icon-achieve">{Icons.achieve}</div> Achievements</Link></li>
                <li><Link className={`dropdown-item dropdown-item-custom d-flex align-items-center rounded mt-1 ${pathname === "/events" ? "active" : ""}`} href="/events"><div className="dropdown-icon icon-event">{Icons.event}</div> Events</Link></li>
              </ul>
            </li>

            {/* Services & Work Dropdown */}
            <li className="nav-item dropdown">
              <a className={`nav-link dropdown-toggle px-3 py-2 ${["/services", "/products", "/projects", "/ai-research"].includes(pathname) ? "active" : ""}`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Services & Work
              </a>
              <ul className="dropdown-menu border-0 shadow custom-dropdown p-2" style={{ minWidth: "240px" }}>
                <li><Link className={`dropdown-item dropdown-item-custom d-flex align-items-center rounded ${pathname === "/services" ? "active" : ""}`} href="/services"><div className="dropdown-icon icon-services">{Icons.services}</div> Services</Link></li>
                <li><Link className={`dropdown-item dropdown-item-custom d-flex align-items-center rounded mt-1 ${pathname === "/products" ? "active" : ""}`} href="/products"><div className="dropdown-icon icon-products">{Icons.products}</div> Products</Link></li>
                <li><Link className={`dropdown-item dropdown-item-custom d-flex align-items-center rounded mt-1 ${pathname === "/projects" ? "active" : ""}`} href="/projects"><div className="dropdown-icon icon-projects">{Icons.projects}</div> Projects</Link></li>
                <li><Link className={`dropdown-item dropdown-item-custom d-flex align-items-center rounded mt-1 ${pathname === "/ai-research" ? "active" : ""}`} href="/ai-research"><div className="dropdown-icon icon-ai">{Icons.ai}</div> AI & Research</Link></li>
              </ul>
            </li>

            {/* Ecosystem Dropdown */}
            <li className="nav-item dropdown">
              <a className={`nav-link dropdown-toggle px-3 py-2 ${["/community", "/careers"].includes(pathname) ? "active" : ""}`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Ecosystem
              </a>
              <ul className="dropdown-menu border-0 shadow custom-dropdown p-2" style={{ minWidth: "220px" }}>
                <li><Link className={`dropdown-item dropdown-item-custom d-flex align-items-center rounded ${pathname === "/community" ? "active" : ""}`} href="/community"><div className="dropdown-icon icon-event">{Icons.community}</div> Community</Link></li>
                <li><Link className={`dropdown-item dropdown-item-custom d-flex align-items-center rounded mt-1 ${pathname === "/careers" ? "active" : ""}`} href="/careers"><div className="dropdown-icon icon-about">{Icons.careers}</div> Careers</Link></li>
              </ul>
            </li>

            <li className="nav-item"><Link className={`nav-link px-3 py-2 ${pathname === "/contact" ? "active" : ""}`} href="/contact">Contact</Link></li>
          </ul>
          
          <div className="ms-lg-3 mt-3 mt-lg-0" id="authSection">
            {!user ? (
              <button onClick={loginWithGoogle} className="btn btn-primary rounded-pill px-4 fw-bold shadow-sm nav-login-btn">
                <i className="fa-brands fa-google me-2"></i>Login
              </button>
            ) : (
              <div className="dropdown position-relative">
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="btn btn-light dropdown-toggle d-flex align-items-center gap-2 py-1 px-3 shadow-sm nav-profile-btn" type="button" style={{ borderRadius: "999px", border: "1px solid rgba(0,0,0,0.1)" }}>
                  <img 
                    src={user.photoURL || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"} 
                    alt={user.displayName || "User"} 
                    className="rounded-circle" 
                    style={{ width: "32px", height: "32px", objectFit: "cover" }} 
                    referrerPolicy="no-referrer" 
                    crossOrigin="anonymous" 
                    onError={(e) => { e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"; }}
                  />
                  <span className="fw-semibold text-dark">{user.displayName}</span>
                </button>
                {dropdownOpen && (
                  <div className="dropdown-menu dropdown-menu-end shadow-lg border-0 show p-0 overflow-hidden" style={{ borderRadius: "20px", minWidth: "300px", position: "absolute", right: 0, top: "120%", zIndex: 1000, animation: "fadeInUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)" }}>
                    <div className="profile-banner position-relative" style={{ height: "90px", background: "linear-gradient(135deg, #0d6efd 0%, #0dcaf0 100%)" }}>
                    </div>
                    <div className="text-center px-4 pb-4 position-relative" style={{ marginTop: "-45px" }}>
                      <img 
                        src={user.photoURL || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"} 
                        className="rounded-circle shadow-sm bg-white p-1 mb-2 position-relative z-index-2" 
                        style={{ width: "80px", height: "80px", objectFit: "cover" }} 
                        referrerPolicy="no-referrer" 
                        crossOrigin="anonymous" 
                        onError={(e) => { e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"; }}
                      />
                      <h5 className="mb-0 fw-bolder text-dark mt-1">{user.displayName}</h5>
                      <small className="text-muted d-block text-truncate mb-4">{user.email}</small>
                      
                      <div className="d-grid gap-2">
                        <Link href="/profile" onClick={() => setDropdownOpen(false)} className="btn btn-light rounded-pill text-start fw-semibold py-2 px-4 hover-primary transition-all d-flex align-items-center text-decoration-none">
                          <div className="icon-box bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: "32px", height: "32px" }}>
                            <i className="fa-solid fa-user"></i>
                          </div>
                          My Profile
                        </Link>
                        <hr className="my-2 opacity-10" />
                        <button onClick={() => { logout(); setDropdownOpen(false); }} className="btn btn-danger-soft rounded-pill fw-bold py-2 d-flex align-items-center justify-content-center transition-all">
                          <i className="fa-solid fa-arrow-right-from-bracket me-2"></i> Logout
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      </nav>
      </div>
      <style jsx>{`
        @keyframes navSlideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .nav-animated {
          animation: navSlideDown 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .dropdown-icon {
          width: 34px; height: 34px; display: inline-flex; align-items: center; justify-content: center;
          border-radius: 8px; margin-right: 12px; transition: all 0.3s ease;
        }
        .dropdown-svg { width: 1.2rem; height: 1.2rem; }
        .icon-about { background: #e0f2fe; color: #0284c7; }
        .icon-team { background: #fce7f3; color: #db2777; }
        .icon-achieve { background: #fef3c7; color: #d97706; }
        .icon-event { background: #dcfce7; color: #16a34a; }
        
        .icon-services { background: #ede9fe; color: #7c3aed; }
        .icon-products { background: #fee2e2; color: #dc2626; }
        .icon-projects { background: #e0e7ff; color: #4f46e5; }
        .icon-ai { background: #f3e8ff; color: #9333ea; }
        
        .dropdown-item-custom:hover .dropdown-icon { transform: scale(1.1) rotate(-5deg); }
        .custom-dropdown {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid rgba(0, 0, 0, 0.08) !important;
          border-radius: 12px;
        }
        .dropdown-item-custom {
          color: #000;
          font-weight: 500;
        }
        .dropdown-item-custom:hover {
          background-color: rgba(0, 0, 0, 0.05);
          color: #000;
        }
        .nav-link {
          transition: all 0.2s ease;
          position: relative;
          border-radius: 8px;
          margin: 0 4px;
          font-weight: 700;
          color: #000 !important;
        }
        .nav-link:active {
          transform: scale(0.92);
        }
        .nav-link:hover, .nav-link.active {
          background-color: rgba(13, 110, 253, 0.08);
          color: var(--bs-primary) !important;
        }
        .nav-login-btn, .nav-profile-btn {
          transition: all 0.2s ease;
        }
        .nav-login-btn:active, .nav-profile-btn:active {
          transform: scale(0.95);
        }
        .hover-primary {
          border: 1px solid transparent;
        }
        .hover-primary:hover {
          background-color: rgba(13, 110, 253, 0.05) !important;
          color: var(--bs-primary) !important;
          border-color: rgba(13, 110, 253, 0.1);
          transform: translateX(5px);
        }
        .btn-danger-soft {
          background-color: rgba(220, 53, 69, 0.1);
          color: #dc3545;
          border: 1px solid transparent;
        }
        .btn-danger-soft:hover {
          background-color: #dc3545;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(220, 53, 69, 0.2);
        }
        .dropdown-item-custom {
          padding: 10px 20px;
          margin: 4px 8px;
          border-radius: 8px;
          transition: all 0.2s ease;
          position: relative;
          display: flex;
          align-items: center;
          font-weight: 500;
          color: #333;
        }
        .dropdown-item-custom:hover, .dropdown-item-custom.active {
          background-color: rgba(13, 110, 253, 0.08);
          color: var(--bs-primary);
          transform: translateX(5px);
        }
        .dropdown-menu.custom-dropdown {
          border-radius: 12px;
          padding: 8px 0;
          min-width: 200px;
          animation: fadeInUp 0.2s ease-out;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
}
