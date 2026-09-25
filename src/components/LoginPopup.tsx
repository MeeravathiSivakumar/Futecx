"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../app/globals.css"; // ensure it has access to glassmorphism styles

export default function LoginPopup() {
  const { user, loginWithGoogle } = useAuth();
  const [show, setShow] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    // If the user is already logged in OR we are not on the home page, do not show popup
    if (user || pathname !== "/") return;

    const timer = setTimeout(() => {
      // Check again when timer finishes just in case they logged in during the 30 seconds
      if (!user) {
        setShow(true);
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, [user, pathname]);

  if (!show || pathname !== "/") return null;

  return (
    <div id="loginPopupOverlay" className="popup-overlay" style={{
      position: 'fixed',
      top: 0, left: 0, width: '100%', height: '100%',
      background: 'rgba(0, 0, 0, 0.45)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      animation: 'fadeIn 0.4s ease-in-out'
    }}>
      <div className="popup-content bg-white p-4 rounded shadow-lg text-center position-relative" style={{ maxWidth: '400px', width: '90%' }}>
        <button id="closePopupBtn" className="btn-close position-absolute top-0 end-0 m-3" onClick={() => setShow(false)} aria-label="Close"></button>
        <h3 className="fw-bold mb-3">Join TN-FUTECX</h3>
        <p className="text-muted mb-4">Log in to explore the community, projects, and exclusive tech resources.</p>
        
        <button className="btn btn-outline-dark w-100 mb-3 fw-bold d-flex justify-content-center align-items-center gap-2 py-2" onClick={() => {
          loginWithGoogle();
          setShow(false);
        }}>
          <i className="fa-brands fa-google text-danger"></i> Sign in with Google
        </button>
        
        <div className="d-flex align-items-center mb-3">
          <hr className="flex-grow-1" />
          <span className="mx-2 text-muted small">OR</span>
          <hr className="flex-grow-1" />
        </div>
        
        <Link href="/login" className="btn btn-dark w-100 fw-bold py-2" onClick={() => setShow(false)}>
          <i className="fa-solid fa-envelope me-2"></i> Continue with Email
        </Link>
      </div>
    </div>
  );
}
