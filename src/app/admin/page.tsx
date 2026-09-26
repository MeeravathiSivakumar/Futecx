"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, doc, updateDoc, Timestamp } from "firebase/firestore";

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

const ADMIN_PASSWORD = "futecx@admin2026";

function formatDate(ts: Timestamp | null) {
  if (!ts) return "—";
  try { return ts.toDate().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }); } catch { return "—"; }
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);

  const [activeTab, setActiveTab] = useState("contact_inquiries");
  const [data, setData] = useState<Record<string, FormEntry[]>>({});
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<FormEntry | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleLogin = () => {
    if (pw === ADMIN_PASSWORD) { setAuthenticated(true); setPwError(false); }
    else { setPwError(true); }
  };

  const fetchAll = async () => {
    setLoading(true);
    const result: Record<string, FormEntry[]> = {};
    for (const col of COLLECTIONS) {
      try {
        const q = query(collection(db, col.key), orderBy("submittedAt", "desc"));
        const snap = await getDocs(q);
        result[col.key] = snap.docs.map(d => ({ id: d.id, ...d.data() } as FormEntry));
      } catch { result[col.key] = []; }
    }
    setData(result);
    setLoading(false);
  };

  useEffect(() => { if (authenticated) fetchAll(); }, [authenticated]);

  const updateStatus = async (colKey: string, docId: string, newStatus: string) => {
    await updateDoc(doc(db, colKey, docId), { status: newStatus });
    setData(prev => ({
      ...prev,
      [colKey]: prev[colKey].map(e => e.id === docId ? { ...e, status: newStatus } : e)
    }));
    if (selected?.id === docId) setSelected(prev => prev ? { ...prev, status: newStatus } : null);
  };

  const activeCol = COLLECTIONS.find(c => c.key === activeTab)!;
  const entries = (data[activeTab] || []).filter(e => {
    const matchSearch = !search || e.name?.toLowerCase().includes(search.toLowerCase()) || e.email?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || e.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statusBadge = (status: string) => {
    const map: Record<string, string> = { new: "primary", pending: "warning", reviewed: "info", accepted: "success", rejected: "danger" };
    return `badge bg-${map[status] || "secondary"}`;
  };

  if (!authenticated) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100" style={{ background: "#0b1220" }}>
        <div className="bg-white rounded-4 shadow-lg p-5" style={{ width: "380px" }}>
          <div className="text-center mb-4">
            <div style={{ fontSize: "2.5rem" }}>🔒</div>
            <h4 className="fw-black mt-2">FUTECX Admin</h4>
            <p className="text-muted small">Enter admin password to continue</p>
          </div>
          <input type="password" className={`form-control rounded-3 mb-3 ${pwError ? "is-invalid" : ""}`}
            placeholder="Admin Password" value={pw} onChange={e => setPw(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()} />
          {pwError && <div className="invalid-feedback d-block mb-2">Incorrect password.</div>}
          <button className="btn w-100 rounded-pill fw-bold" style={{ background: "linear-gradient(90deg, #0ea5e9, #6366f1)", color: "#fff" }} onClick={handleLogin}>
            Login to Admin Panel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #0b1220, #1e293b)", padding: "16px 32px" }} className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-3">
          <span style={{ fontSize: "1.5rem", fontWeight: "900", color: "#38bdf8" }}>FUTECX</span>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", borderLeft: "1px solid rgba(255,255,255,0.2)", paddingLeft: "12px" }}>Admin Panel</span>
        </div>
        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-sm rounded-pill" style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }} onClick={fetchAll}>
            <i className="fas fa-sync-alt me-1"></i> Refresh
          </button>
          <button className="btn btn-sm rounded-pill btn-danger" onClick={() => setAuthenticated(false)}>Logout</button>
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
          {COLLECTIONS.map(col => (
            <button key={col.key} onClick={() => { setActiveTab(col.key); setSelected(null); setSearch(""); setStatusFilter("all"); }}
              className={`btn btn-sm rounded-pill fw-semibold ${activeTab === col.key ? "text-white" : "btn-light"}`}
              style={activeTab === col.key ? { background: col.color, border: "none" } : {}}>
              <i className={`fas ${col.icon} me-1`}></i> {col.label}
              <span className="ms-2 badge rounded-pill bg-white" style={{ color: col.color }}>
                {(data[col.key] || []).length}
              </span>
            </button>
          ))}
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

        {/* Table + Detail Panel */}
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
                              onChange={ev => updateStatus(activeTab, e.id, ev.target.value)}>
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

          {/* Detail Panel */}
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
                <hr />
                <div className="row g-2">
                  {Object.entries(selected).filter(([k]) => !["id","formType","submittedAt","__typename"].includes(k)).map(([k, v]) => (
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
