import re
import os

files = [
    ('src/app/contact/page.tsx', 'contact', """name, email, phone, service, message"""),
    ('src/app/apply/intern/page.tsx', 'intern', """name: get("name"), email: get("email"), phone: get("phone"), college: get("college"), year: get("year"), domain: get("domain"), skills: get("skills"), linkedin: get("linkedin"), whyFutecx: get("whyFutecx")"""),
    ('src/app/apply/core-team/page.tsx', 'core_team', """name: get("name"), email: get("email"), phone: get("phone"), role: get("role"), experience: get("experience"), portfolio: get("portfolio"), github: get("github"), linkedin: get("linkedin"), currentRole: get("currentRole"), vision: get("vision"), availability: get("availability")"""),
    ('src/app/apply/agentos/page.tsx', 'agentos', """name: get("name"), email: get("email"), phone: get("phone"), role: get("role"), vision: get("vision"), github: get("github")""")
]

for filepath, form_type, payload in files:
    if not os.path.exists(filepath): continue
    with open(filepath, 'r', encoding='utf-8') as f:
        c = f.read()

    # The block looks like:
    # try {
    #   await addDoc(collection(db, "intern_applications"), {
    #     formType: "Intern Application",
    #     ...
    #   });
    #   setStatus("success");
    #   form.reset();
    # } catch (error) { console.error(error);
    #   setStatus("error");
    # }

    # For contact page, it might have `formRef` instead of `form.reset()`
    # Let's write a targeted substitution.
    
    if "contact" in filepath:
        # We did try patching contact earlier. Let's see if it's already patched.
        if "fetch('/api/submit-form'" not in c:
            pattern = re.compile(r'try\s*\{.*?await addDoc.*?setLoading\(false\);\s*\}', re.DOTALL)
            new_try = f"""try {{
      const res = await fetch('/api/submit-form', {{
        method: 'POST',
        headers: {{ 'Content-Type': 'application/json' }},
        body: JSON.stringify({{ formType: '{form_type}', {payload} }})
      }});
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      alert("Message sent successfully!");
      if (formRef.current) formRef.current.reset();
    }} catch (error) {{
      console.error(error);
      alert("Something went wrong. Please try again.");
    }} finally {{
      setLoading(false);
    }}"""
            c = pattern.sub(new_try, c)
    else:
        pattern = re.compile(r'try\s*\{.*?await addDoc.*?setStatus\("error"\);\s*\}', re.DOTALL)
        new_try = f"""try {{
      const res = await fetch('/api/submit-form', {{
        method: 'POST',
        headers: {{ 'Content-Type': 'application/json' }},
        body: JSON.stringify({{ formType: '{form_type}', {payload} }})
      }});
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setStatus("success");
      form.reset();
    }} catch (error) {{
      console.error(error);
      setStatus("error");
    }}"""
        c = pattern.sub(new_try, c)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(c)

print("Fixed forms!")
