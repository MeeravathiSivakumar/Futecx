import os

f = open('src/app/admin/page.tsx', 'r', encoding='utf-8')
c = f.read()
f.close()

c = c.replace('e.status === "spam"', 'e.routingStatus === "spam"')
c = c.replace('e.status !== "spam"', 'e.routingStatus !== "spam"')
c = c.replace('status: "new"', 'routingStatus: "application"') # If updateStatus used this, wait, no. updateStatus updates `status`.

# Let's check updateStatus. If they move it out of Spam, they should update `routingStatus` too.
old_update = """  const updateStatus = async (colKey: string, docId: string, newStatus: string) => {
    await updateDoc(doc(db, colKey, docId), { status: newStatus });
    setData(prev => ({
      ...prev,
      [colKey]: prev[colKey].map(e => e.id === docId ? { ...e, status: newStatus } : e)
    }));"""

new_update = """  const updateStatus = async (colKey: string, docId: string, newStatus: string) => {
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
    }));"""

c = c.replace(old_update, new_update)

# Also let's show the email validation status in the UI
# Find where the status badge is rendered
old_badge = """<span className={statusBadge(selected.status)}>{selected.status}</span>
                  <small className="text-muted ms-2">{formatDate(selected.submittedAt)}</small>
                </div>
                <hr />"""

new_badge = """<span className={statusBadge(selected.status)}>{selected.status}</span>
                  <small className="text-muted ms-2">{formatDate(selected.submittedAt)}</small>
                </div>
                {selected.emailValidationStatus && (
                  <div className="mb-3 p-2 rounded" style={{ background: selected.emailValidationStatus === 'deliverable' ? '#dcfce7' : '#fee2e2', fontSize: '0.8rem' }}>
                    <strong>Email Status:</strong> {String(selected.emailValidationStatus).toUpperCase()}
                    {selected.spamReason && <div className="text-danger mt-1">{String(selected.spamReason)}</div>}
                  </div>
                )}
                <hr />"""

c = c.replace(old_badge, new_badge)

open('src/app/admin/page.tsx', 'w', encoding='utf-8').write(c)
print("Patched admin page")
