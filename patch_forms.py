import os
import re

def patch_file(filepath, form_type, payload_str):
    if not os.path.exists(filepath): return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove firebase imports
    content = re.sub(r'import \{ isSpam \}.*?\n', '', content)
    content = re.sub(r'import \{ db \}.*?\n', '', content)
    content = re.sub(r'import \{ collection, addDoc, serverTimestamp \}.*?\n', '', content)
    
    # Replace try block
    # We find the try { ... } catch block and replace it
    # Pattern to match try { await addDoc(...) ... } catch ... finally ... }
    
    pattern = re.compile(r'try\s*\{.*?await addDoc.*?alert\("[^"]+"\);\s*(formRef|if).*?reset\(\);\s*\}\s*catch\s*\(error\)\s*\{.*?\}\s*finally\s*\{.*?\}', re.DOTALL)
    
    new_try_block = f"""try {{
      const res = await fetch('/api/submit-form', {{
        method: 'POST',
        headers: {{ 'Content-Type': 'application/json' }},
        body: JSON.stringify({{ formType: '{form_type}', {payload_str} }})
      }});
      
      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      alert("🎉 Application submitted successfully! We will get back to you soon.");
      if (formRef && formRef.current) formRef.current.reset();
      else if (e.target) (e.target as HTMLFormElement).reset();
    }} catch (error) {{
      console.error("Submission Error:", error);
      alert("Failed to submit. Please try again.");
    }} finally {{
      setLoading(false);
    }}"""
    
    content = pattern.sub(new_try_block, content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)


patch_file('src/app/contact/page.tsx', 'contact', 'name, email, phone, service, message')

patch_file('src/app/apply/intern/page.tsx', 'intern', 'name: get("name"), email: get("email"), phone: get("phone"), college: get("college"), degree: get("degree"), year: get("year"), domain: get("domain"), whyFutecx: get("whyFutecx")')

patch_file('src/app/apply/core-team/page.tsx', 'core_team', 'name: get("name"), email: get("email"), phone: get("phone"), role: get("role"), experience: get("experience"), portfolio: get("portfolio"), whyFutecx: get("whyFutecx")')

patch_file('src/app/apply/agentos/page.tsx', 'agentos', 'name: get("name"), email: get("email"), phone: get("phone"), role: get("role"), vision: get("vision"), github: get("github")')

print("Patched all 4 forms to use backend API")
