"use client";

import Link from "next/link";
import "../app/globals.css";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/login") return null;

  return (
    <>
      <div className="container-fluid footer-advanced pt-5 mt-5 position-relative overflow-hidden" id="newsletter">
        {/* Decorative Background Elements */}
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: "radial-gradient(circle at bottom right, rgba(13, 110, 253, 0.1) 0%, rgba(0, 0, 0, 0) 60%)", zIndex: 0 }}></div>
        <div className="position-absolute top-0 start-50 translate-middle-x w-100 h-1" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)", height: '1px' }}></div>
        
        <div className="container py-5 position-relative z-index-2">
          <div className="row g-5">
            {/* Quick Links */}
            <div className="col-lg-3 col-md-6" data-aos="fade-up">
              <h4 className="text-white mb-4 fw-bold">Quick Links</h4>
              <div className="d-flex flex-column gap-2 footer-links">
                <Link className="text-white-50 text-decoration-none hover-white transition-all" href="/about"><i className="fa-solid fa-angle-right me-2 text-info"></i>About TN-FUTECX</Link>
                <Link className="text-white-50 text-decoration-none hover-white transition-all" href="/contact"><i className="fa-solid fa-angle-right me-2 text-info"></i>Contact Us</Link>
                <Link className="text-white-50 text-decoration-none hover-white transition-all" href="#"><i className="fa-solid fa-angle-right me-2 text-info"></i>Privacy Policy</Link>
                <Link className="text-white-50 text-decoration-none hover-white transition-all" href="#"><i className="fa-solid fa-angle-right me-2 text-info"></i>Terms & Conditions</Link>
                <Link className="text-white-50 text-decoration-none hover-white transition-all" href="#"><i className="fa-solid fa-angle-right me-2 text-info"></i>FAQs & Help</Link>
              </div>
            </div>

            {/* Contact Info */}
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="100">
              <h4 className="text-white mb-4 fw-bold">Contact</h4>
              <div className="d-flex flex-column gap-3 mb-4">
                <div className="d-flex align-items-start gap-3 text-white-50">
                  <i className="fa fa-map-marker-alt mt-1 text-primary"></i>
                  <p className="mb-0">143 TN-FUTECX Tech Park,<br/>Thanjavur, India</p>
                </div>
                <div className="d-flex align-items-center gap-3 text-white-50">
                  <i className="fa fa-phone-alt text-primary"></i>
                  <p className="mb-0">+91 9876543210</p>
                </div>
                <div className="d-flex align-items-center gap-3 text-white-50">
                  <i className="fa fa-envelope text-primary"></i>
                  <p className="mb-0">tnfutecx@gmail.com</p>
                </div>
              </div>
              <div className="d-flex gap-2">
                <a className="btn btn-glass-social" href="https://x.com/RAshwin2k"><i className="fab fa-twitter"></i></a>
                <a className="btn btn-glass-social" href="https://g.dev/AshwinRamakrishnan"><i className="fab fa-google"></i></a>
                <a className="btn btn-glass-social" href="https://github.com/AshwinRamakrishnan"><i className="fab fa-github"></i></a>
                <a className="btn btn-glass-social" href="https://www.linkedin.com/in/ashwin-ramakrishnan-b328a6298"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>

            {/* Gallery */}
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="200">
              <h4 className="text-white mb-4 fw-bold">Gallery</h4>
              <div className="row g-2">
                {[
                  { num: 1, col: 'col-6', ratio: '16/9' }, 
                  { num: 2, col: 'col-6', ratio: '16/9' }, 
                  { num: 3, col: 'col-12', ratio: '24/7' }, 
                  { num: 4, col: 'col-4', ratio: '1/1' }, 
                  { num: 5, col: 'col-4', ratio: '1/1' }, 
                  { num: 6, col: 'col-4', ratio: '1/1' }
                ].map((item) => (
                  <div key={item.num} className={item.col}>
                    <div className="footer-gallery-wrapper rounded-3 overflow-hidden shadow-sm" style={{ aspectRatio: item.ratio }}>
                      <img 
                        className="img-fluid transition-all footer-gallery-img" 
                        src={`/image/gallery/gallery-${item.num}.jpg`} 
                        alt={`Gallery ${item.num}`} 
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover', 
                          objectPosition: item.num === 1 ? 'center' : 'top center',
                          opacity: 0.8
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="300">
              <h4 className="text-white mb-4 fw-bold">Newsletter</h4>
              <p className="text-white-50 mb-4">Stay updated with the latest from TN-FUTECX. Subscribe to our newsletter.</p>
              
              <div className="newsletter-box d-flex align-items-center mx-auto rounded-pill p-1 bg-white bg-opacity-10 border border-white border-opacity-25 backdrop-blur shadow-lg">
                <input 
                  className="form-control bg-transparent border-0 text-white shadow-none ps-3 py-2 flex-grow-1" 
                  type="email" 
                  placeholder="tnfutecx@gmail.com" 
                  style={{ minWidth: 0 }}
                />
                <button id="subscribe-btn" type="button" className="btn btn-primary rounded-pill py-2 px-3 fw-bold newsletter-btn-glow flex-shrink-0">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="container-fluid border-top border-white border-opacity-10 mt-5 py-4 bg-black bg-opacity-25 position-relative z-index-2">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                <p className="mb-0 text-white-50">
                  &copy; <Link className="text-white text-decoration-none fw-bold mx-1" href="/">TN-FUTECX</Link>, All Rights Reserved.
                </p>
              </div>
              <div className="col-md-6 text-center text-md-end">
                <div className="d-flex justify-content-center justify-content-md-end gap-3 footer-bottom-links">
                  <Link href="/" className="text-white-50 text-decoration-none hover-white small">Home</Link>
                  <Link href="#" className="text-white-50 text-decoration-none hover-white small">Cookies</Link>
                  <Link href="#" className="text-white-50 text-decoration-none hover-white small">Help</Link>
                  <Link href="#" className="text-white-50 text-decoration-none hover-white small">FAQs</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a href="#" className="back-to-top d-flex align-items-center justify-content-center transition-all shadow-sm" style={{ position: "fixed", bottom: "30px", right: "30px", width: "44px", height: "44px", zIndex: 99, borderRadius: "50%", border: "1px solid rgba(13, 110, 253, 0.3)", background: "rgba(13, 110, 253, 0.15)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", color: "#0d6efd", fontSize: "16px", textDecoration: "none" }}>
        <i className="fa fa-arrow-up"></i>
      </a>

      <style jsx>{`
        .footer-advanced {
          background-color: #050b14;
        }
        .hover-white:hover {
          color: #fff !important;
        }
        .btn-glass-social {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        .btn-glass-social:hover {
          background: var(--bs-primary);
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(13, 110, 253, 0.4);
        }
        .footer-gallery-wrapper { width: 100%; display: flex; align-items: center; justify-content: center; background: rgba(255, 255, 255, 0.05); cursor: pointer; transition: all 0.3s ease; }
          .footer-gallery-wrapper:hover { box-shadow: 0 0 20px rgba(255,255,255,0.3) !important; transform: translateY(-3px); z-index: 10; position: relative; }
        .footer-gallery-img { transition: all 0.5s ease; }
        .footer-gallery-wrapper:hover .footer-gallery-img { opacity: 1 !important; transform: scale(1.15); }
        .backdrop-blur {
          backdrop-filter: blur(10px);
        }
        .newsletter-box input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
        .newsletter-box input:focus {
          outline: none;
        }
        .newsletter-box:focus-within {
          border-color: rgba(13, 110, 253, 0.5) !important;
          box-shadow: 0 0 20px rgba(13, 110, 253, 0.2) !important;
        }
        .newsletter-btn-glow {
          box-shadow: 0 0 15px rgba(13, 110, 253, 0.5);
          transition: all 0.3s ease;
        }
        .newsletter-btn-glow:hover {
          box-shadow: 0 0 25px rgba(13, 110, 253, 0.8);
          transform: scale(1.05) !important;
        }
        .back-to-top:hover {
          background: rgba(13, 110, 253, 0.9) !important;
          border-color: rgba(13, 110, 253, 1) !important;
          box-shadow: 0 0 15px rgba(13, 110, 253, 0.6) !important;
          color: white !important;
        }
      `}</style>
    </>
  );
}












