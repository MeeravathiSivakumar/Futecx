import sys
from PIL import Image

try:
    img = Image.open(r'C:\Users\Master\.gemini\antigravity\brain\ff4e77b9-0896-4c6c-925b-ee7f2ca1c6bb\login_hd_169_1789842102910.jpg')
    img_resized = img.resize((2560, 1440), Image.Resampling.LANCZOS)
    img_resized.save(r'C:\Users\Master\Downloads\FUTECX-main\FUTECX-main\Startup-main\futecx-next\public\image\login-bg.jpg', quality=100)
    print('Upscaled successfully')
except Exception as e:
    print('Error:', e)
