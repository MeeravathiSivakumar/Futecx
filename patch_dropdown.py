f = open('src/app/admin/page.tsx', encoding='utf-8')
c = f.read()
f.close()

# 1. Status Filter
old_filter = """<option value="rejected">Rejected</option>
            <option value="spam">Spam</option>
          </select>"""
new_filter = """<option value="rejected">Rejected</option>
          </select>"""
c = c.replace(old_filter, new_filter)

# 2. Table Dropdown
old_dropdown = """<option value="new">New</option>
                              <option value="pending">Pending</option>
                              <option value="reviewed">Reviewed</option>
                              <option value="accepted">Accepted</option>
                              <option value="rejected">Rejected</option>
                              <option value="spam">Spam</option>
                            </select>"""
new_dropdown = """{e.status === "spam" && <option value="spam" disabled>Auto Spam</option>}
                              <option value="new">New</option>
                              <option value="pending">Pending</option>
                              <option value="reviewed">Reviewed</option>
                              <option value="accepted">Accepted</option>
                              <option value="rejected">Rejected</option>
                            </select>"""
c = c.replace(old_dropdown, new_dropdown)

open('src/app/admin/page.tsx', 'w', encoding='utf-8').write(c)
print('Done patching')
