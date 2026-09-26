"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, doc, updateDoc, Timestamp } from "firebase/firestore";
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

// Only these Google accounts are allowed into admin
const ALLOWED_EMAILS = [
  "tnfutecx@gmail.com",
  "younginnovator2024@gmail.com",
  "ashwinramakrishnan@gmail.com",
  "meeravathisivakumar@gmail.com",
];

type FormEntry = {
  id: string;
  formType: string;
  name: string;
  email: string;
  phone?: string;
  status: string;
  submittedAt: Timestamp | null;
  [key: string]: unknown;
};

const COLLECTIONS = [
  { key: "contact_inquiries", label: "Contact Inquiries", color: "#0ea5e9", icon: "fa-envelope" },
  { key: "intern_applications", label: "Intern Applications", color: "#f59e0b", icon: "fa-graduation-cap" },
  { key: "core_team_applications", label: "Core Team Applications", color: "#7c3aed", icon: "fa-users-gear" },
  { key: "agentos_applications", label: "AgentOS Applications", color: "#059669", icon: "fa-robot" },
];

function formatDate(ts: Timestamp | null) {
  if (!ts) return "—";
  try { return ts.toDate().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }); } catch { return "—"; }
}

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const [activeTab, setActiveTab] = useState("contact_inquiries");
  const [data, setData] = useState<Record<string, FormEntry[]>>({});
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<FormEntry | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) {
        if (ALLOWED_EMAILS.includes(u.email || "")) {
          setUser(u);
          setAccessDenied(false);
        } else {
          setAccessDenied(true);
          setUser(null);
          signOut(auth);
        }
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  const handleLogin = async () => {
    setLoginLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      await signInWithPopup(auth, provider);
    } catch { /* cancelled */ }
    setLoginLoading(false);
  };

  const handleLogout = () => signOut(auth);

  const fetchAll = async () => {
    setLoading(true);
    const result: Record<string, FormEntry[]> = {};
    for (const col of COLLECTIONS) {
      try {
        const q = query(collection(db, col.key), orderBy("submittedAt", "desc"));
        const snap = await getDocs(q);
        result[col.key] = snap.docs.map(d => ({ id: d.id, _collection: col.key, ...d.data() } as unknown as FormEntry));
      } catch { result[col.key] = []; }
    }
    setData(result);
    setLoading(false);
  };

  useEffect(() => { if (user) fetchAll(); }, [user]);

  const updateStatus = async (colKey: string, docId: string, newStatus: string) => {
    const isRestoring = newStatus !== "spam" && activeTab === "spam";
    const updates: any = { status: newStatus };
    if (isRestoring) updates.routingStatus = "application";
    
    await updateDoc(doc(db, colKey, docId), updates);
    setData(prev => ({
      ...prev,
      [colKey]: prev[colKey].map(e => {
        if (e.id === docId) {
          return { ...e, status: newStatus, ...(isRestoring ? { routingStatus: "application" } : {}) };
        }
        return e;
      })
    }));
    if (selected?.id === docId) setSelected(prev => prev ? { ...prev, status: newStatus } : null);
  };

  const activeCol = COLLECTIONS.find(c => c.key === activeTab) || { key: "spam", label: "Spam Vault", color: "#dc3545", icon: "fa-ban" };
  
  let baseEntries = activeTab === "spam" 
    ? Object.values(data).flat().filter(e => e.routingStatus === "spam")
    : (data[activeTab] || []).filter(e => e.routingStatus !== "spam");

  const entries = baseEntries.filter(e => {
    const matchSearch = !search || e.name?.toLowerCase().includes(search.toLowerCase()) || e.email?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || e.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statusBadge = (status: string) => {
    const map: Record<string, string> = { new: "primary", pending: "warning", reviewed: "info", accepted: "success", rejected: "danger", spam: "dark" };
    return `badge bg-${map[status] || "secondary"}`;
  };

  // Auth loading
  if (authLoading) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100" style={{ background: "#0b1220" }}>
        <div className="text-center text-white">
          <div className="spinner-border text-info mb-3" role="status"></div>
          <p className="text-muted small">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Access Denied
  if (accessDenied) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100" style={{ background: "#0b1220" }}>
        <div className="bg-white rounded-4 shadow-lg p-5 text-center" style={{ maxWidth: "400px" }}>
          <div style={{ fontSize: "3rem" }}>🚫</div>
          <h4 className="fw-black mt-3 text-danger">Access Denied</h4>
          <p className="text-muted small">Your Google account is not authorized to access the FUTECX Admin Panel. Only registered FUTECX team members can log in.</p>
          <button className="btn btn-outline-danger rounded-pill px-4 mt-2" onClick={() => { setAccessDenied(false); }}>Try Another Account</button>
        </div>
      </div>
    );
  }

  // Login Screen
  if (!user) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100" style={{ background: "linear-gradient(135deg, #0b1220 0%, #1e293b 100%)" }}>
        <div className="bg-white rounded-4 shadow-lg p-5 text-center" style={{ width: "400px" }}>
          <div style={{ fontSize: "2.5rem", fontWeight: "900", color: "#0ea5e9", marginBottom: "8px" }}>FUTECX</div>
          <p className="text-muted small mb-4">Admin Panel · Team Access Only</p>
          <div className="mb-4 p-3 rounded-3" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
            <p className="text-muted small mb-0">🔐 Secured with Google Authentication. Only authorized FUTECX team accounts can access this dashboard.</p>
          </div>
          <button className="btn w-100 rounded-pill fw-bold d-flex align-items-center justify-content-center gap-2 py-3"
            style={{ background: "#fff", border: "2px solid #e2e8f0", color: "#333" }}
            onClick={handleLogin} disabled={loginLoading}>
            <svg width="20" height="20" viewBox="0 0 48 48"><path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.1 30.1 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8 2.9l6.4-6.4C34.6 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.6 20-21 0-1.3-.1-2.7-.5-4z"/><path fill="#34A853" d="M6.3 14.7l7 5.1C15 17.1 19.2 14 24 14c3.1 0 5.9 1.1 8 2.9l6.4-6.4C34.6 5.1 29.6 3 24 3c-7.7 0-14.4 4.6-17.7 11.7z"/><path fill="#FBBC05" d="M24 45c5.5 0 10.5-1.8 14.4-4.9l-6.7-5.5C29.8 36.5 27 37.5 24 37.5c-6.1 0-11.3-4.1-13.1-9.7l-7 5.4C7.6 40.7 15.3 45 24 45z"/><path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-.9 2.7-2.8 5-5.3 6.6l6.7 5.5C41.5 37.1 45 31 45 24c0-1.3-.1-2.7-.5-4z"/></svg>
            {loginLoading ? "Signing in..." : "Sign in with Google"}
          </button>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #0b1220, #1e293b)", padding: "16px 32px" }} className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-3">
          <span style={{ fontSize: "1.5rem", fontWeight: "900", color: "#38bdf8" }}>FUTECX</span>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", borderLeft: "1px solid rgba(255,255,255,0.2)", paddingLeft: "12px" }}>Admin Panel</span>
        </div>
        <div className="d-flex align-items-center gap-3">
          {user.photoURL && <img src={user.photoURL} alt="" className="rounded-circle" width={32} height={32} />}
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem" }}>{user.email}</span>
          <button className="btn btn-sm rounded-pill" style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }} onClick={fetchAll}>
            <i className="fas fa-sync-alt me-1"></i> Refresh
          </button>
          <button className="btn btn-sm rounded-pill btn-danger" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="container-fluid px-4 py-3">
        <div className="row g-3 mb-3">
          {COLLECTIONS.map(col => (
            <div key={col.key} className="col-6 col-md-3">
              <div className="bg-white rounded-3 p-3 shadow-sm d-flex align-items-center gap-3 border-start border-4" style={{ borderColor: col.color }}>
                <i className={`fas ${col.icon} fs-4`} style={{ color: col.color }}></i>
                <div>
                  <div className="fw-black fs-4">{(data[col.key] || []).length}</div>
                  <div className="text-muted small">{col.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="d-flex gap-2 mb-3 flex-wrap">
          {COLLECTIONS.map(col => {
            const count = (data[col.key] || []).filter(e => e.routingStatus !== "spam").length;
            return (
              <button key={col.key} onClick={() => { setActiveTab(col.key); setSelected(null); setSearch(""); setStatusFilter("all"); }}
                className={`btn btn-sm rounded-pill fw-semibold ${activeTab === col.key ? "text-white" : "btn-light"}`}
                style={activeTab === col.key ? { background: col.color, border: "none" } : {}}>
                <i className={`fas ${col.icon} me-1`}></i> {col.label}
                <span className="ms-2 badge rounded-pill bg-white" style={{ color: col.color }}>{count}</span>
              </button>
            )
          })}
          
          <button onClick={() => { setActiveTab("spam"); setSelected(null); setSearch(""); setStatusFilter("all"); }}
            className={`btn btn-sm rounded-pill fw-bold ${activeTab === "spam" ? "text-white" : "btn-outline-danger"}`}
            style={activeTab === "spam" ? { background: "#dc3545", border: "none" } : {}}>
            <i className="fas fa-ban me-1"></i> Spam Vault
            <span className={`ms-2 badge rounded-pill ${activeTab === "spam" ? "bg-white text-danger" : "bg-danger text-white"}`}>
              {Object.values(data).flat().filter(e => e.routingStatus === "spam").length}
            </span>
          </button>
        </div>

        {/* Filters */}
        <div className="d-flex gap-2 mb-3 flex-wrap">
          <input type="text" className="form-control form-control-sm rounded-pill" style={{ maxWidth: "220px" }}
            placeholder="Search name or email..." value={search} onChange={e => setSearch(e.target.value)} />
          <select className="form-select form-select-sm rounded-pill" style={{ maxWidth: "160px" }}
            value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="row g-3">
          <div className={selected ? "col-lg-7" : "col-12"}>
            <div className="bg-white rounded-4 shadow-sm overflow-hidden">
              {loading ? (
                <div className="text-center py-5 text-muted"><i className="fas fa-spinner fa-spin me-2"></i> Loading...</div>
              ) : entries.length === 0 ? (
                <div className="text-center py-5 text-muted">No submissions found.</div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead style={{ background: "#f8fafc" }}>
                      <tr>
                        <th className="ps-3 fw-semibold small text-muted">Name</th>
                        <th className="fw-semibold small text-muted">Email</th>
                        <th className="fw-semibold small text-muted">Date</th>
                        <th className="fw-semibold small text-muted">Status</th>
                        <th className="fw-semibold small text-muted">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entries.map(e => (
                        <tr key={e.id} onClick={() => setSelected(e)} style={{ cursor: "pointer", background: selected?.id === e.id ? "#f0f9ff" : undefined }}>
                          <td className="ps-3 fw-semibold small">{e.name}</td>
                          <td className="small text-muted">{e.email}</td>
                          <td className="small text-muted">{formatDate(e.submittedAt)}</td>
                          <td><span className={statusBadge(e.status)}>{e.status}</span></td>
                          <td>
                            <select className="form-select form-select-sm rounded-pill" style={{ width: "120px", fontSize: "0.75rem" }}
                              value={e.status}
                              onClick={ev => ev.stopPropagation()}
                              onChange={ev => updateStatus((e as any)._collection || activeTab, e.id, ev.target.value)}>
                              {e.routingStatus === "spam" && <option value="spam" disabled>Auto Spam</option>}
                              <option value="new">New</option>
                              <option value="pending">Pending</option>
                              <option value="reviewed">Reviewed</option>
                              <option value="accepted">Accepted</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {selected && (
            <div className="col-lg-5">
              <div className="bg-white rounded-4 shadow-sm p-4 position-sticky" style={{ top: "80px" }}>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h5 className="fw-black mb-0">{selected.name}</h5>
                    <small className="text-muted">{selected.formType}</small>
                  </div>
                  <button className="btn btn-sm btn-light rounded-circle" onClick={() => setSelected(null)}>✕</button>
                </div>
                <div className="mb-3">
                  <span className={statusBadge(selected.status)}>{selected.status}</span>
                  <small className="text-muted ms-2">{formatDate(selected.submittedAt)}</small>
                </div>
                {selected.emailValidationStatus && (
                  <div className="mb-3 p-2 rounded" style={{ background: selected.emailValidationStatus === 'deliverable' ? '#dcfce7' : '#fee2e2', fontSize: '0.8rem' }}>
                    <strong>Email Status:</strong> {String(selected.emailValidationStatus).toUpperCase()}
                    {selected.spamReason && <div className="text-danger mt-1">{String(selected.spamReason)}</div>}
                  </div>
                )}
                <hr />
                <div className="row g-2">
                  {Object.entries(selected).filter(([k]) => !["id","formType","submittedAt"].includes(k)).map(([k, v]) => (
                    <div key={k} className="col-12">
                      <div className="small text-muted text-uppercase fw-semibold" style={{ letterSpacing: "1px", fontSize: "0.65rem" }}>{k.replace(/([A-Z])/g, " $1")}</div>
                      <div className="small text-dark" style={{ wordBreak: "break-word" }}>{String(v || "—")}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 d-flex gap-2">
                  <a href={`mailto:${selected.email}`} className="btn btn-sm btn-outline-primary rounded-pill flex-fill">
                    <i className="fas fa-envelope me-1"></i> Email
                  </a>
                  {selected.phone && (
                    <a href={`https://wa.me/${String(selected.phone).replace(/\D/g,"")}`} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-success rounded-pill flex-fill">
                      <i className="fab fa-whatsapp me-1"></i> WhatsApp
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
