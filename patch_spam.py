import glob

files = glob.glob('src/app/apply/*/page.tsx') + ['src/app/contact/page.tsx']

for f in files:
    content = open(f, encoding='utf-8').read()
    
    # 1. Add import
    if 'import { isSpam }' not in content:
        content = content.replace('import { db }', 'import { isSpam } from "@/lib/spamDetector";\nimport { db }')
        
    # 2. Modify status inside addDoc
    if 'status: "new"' in content:
        content = content.replace('status: "new"', 'status: isSpam({ name, email, phone, message }) ? "spam" : "new"')
    
    # For forms that have "pending"
    if 'status: "pending"' in content:
        # get() was used in those forms
        # I'll just check the most important fields
        content = content.replace('status: "pending"', 'status: isSpam({ name: get("name"), email: get("email"), phone: get("phone") }) ? "spam" : "pending"')

    open(f, 'w', encoding='utf-8').write(content)

print('Forms patched for spam detection')
