import re

f = open('src/app/admin/page.tsx', encoding='utf-8')
c = f.read()
f.close()

# 1. Update entries logic
old_entries = '''  const activeCol = COLLECTIONS.find(c => c.key === activeTab)!;
  const entries = (data[activeTab] || []).filter(e => {
    const matchSearch = !search || e.name?.toLowerCase().includes(search.toLowerCase()) || e.email?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || e.status === statusFilter;
    return matchSearch && matchStatus;
  });'''

new_entries = '''  const activeCol = COLLECTIONS.find(c => c.key === activeTab) || { key: "spam", label: "Spam Vault", color: "#dc3545", icon: "fa-ban" };
  
  let baseEntries = activeTab === "spam" 
    ? Object.values(data).flat().filter(e => e.status === "spam")
    : (data[activeTab] || []).filter(e => e.status !== "spam");

  const entries = baseEntries.filter(e => {
    const matchSearch = !search || e.name?.toLowerCase().includes(search.toLowerCase()) || e.email?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || e.status === statusFilter;
    return matchSearch && matchStatus;
  });'''
c = c.replace(old_entries, new_entries)

# 2. Update statusBadge
old_badge = 'const map: Record<string, string> = { new: "primary", pending: "warning", reviewed: "info", accepted: "success", rejected: "danger" };'
new_badge = 'const map: Record<string, string> = { new: "primary", pending: "warning", reviewed: "info", accepted: "success", rejected: "danger", spam: "dark" };'
c = c.replace(old_badge, new_badge)

# 3. Add Spam tab
old_tabs = '''        <div className="d-flex gap-2 mb-3 flex-wrap">
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
        </div>'''

new_tabs = '''        <div className="d-flex gap-2 mb-3 flex-wrap">
          {COLLECTIONS.map(col => {
            const count = (data[col.key] || []).filter(e => e.status !== "spam").length;
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
              {Object.values(data).flat().filter(e => e.status === "spam").length}
            </span>
          </button>
        </div>'''
c = c.replace(old_tabs, new_tabs)

# 4. Update status dropdown in filters
old_status_filter = '''<option value="rejected">Rejected</option>
          </select>'''
new_status_filter = '''<option value="rejected">Rejected</option>
            <option value="spam">Spam</option>
          </select>'''
c = c.replace(old_status_filter, new_status_filter)

# 5. Update status dropdown in table
old_status_table = '''<option value="rejected">Rejected</option>
                            </select>'''
new_status_table = '''<option value="rejected">Rejected</option>
                              <option value="spam">Spam</option>
                            </select>'''
c = c.replace(old_status_table, new_status_table)

open('src/app/admin/page.tsx', 'w', encoding='utf-8').write(c)
print("Admin patched successfully")
