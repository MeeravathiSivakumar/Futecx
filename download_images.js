const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = path.join(__dirname, 'public', 'image', 'projects');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

// Ensure high quality, non-face futuristic tech concepts.
const imagesToFetch = [
  { name: "chatlse.jpg", prompt: "A glowing futuristic chat application interface on a holographic screen floating in a dark server room, neon cyan and purple UI elements, 8k resolution, highly detailed digital art" },
  { name: "meera-write.jpg", prompt: "A futuristic AI text generation interface, glowing code streams, holographic data blocks, dark mode UI, glowing orange and blue, 8k, cyberpunk aesthetic, no people" },
  { name: "attendance.jpg", prompt: "A futuristic biometric security dashboard, glowing fingerprint and iris scan UI elements, dark blue tech background, highly professional corporate security, 8k resolution, no people" },
  { name: "student-ai.jpg", prompt: "A futuristic digital education interface, glowing holographic books and data nodes, smart learning analytics dashboard, glowing blue and green, 8k tech wallpaper, no faces" },
  { name: "eduflex.jpg", prompt: "A vast digital ecosystem of learning, glowing network nodes representing students and knowledge, dark space background with neon connections, high tech, 8k resolution" },
  { name: "bujji.jpg", prompt: "A futuristic smart mobility UI, glowing GPS map with neon travel routes, autonomous driving dashboard, dark theme, sleek and modern tech, 8k resolution" },
  { name: "bujji-full.jpg", prompt: "A high-tech geospatial analytics dashboard, glowing 3D earth hologram with satellite data points, complex navigation UI, cyberpunk blue and purple, 8k" },
  { name: "insight.jpg", prompt: "An advanced AI data analytics dashboard, glowing 3D charts and financial graphs floating in dark space, neon pink and cyan, highly detailed UI/UX, 8k resolution" },
  { name: "traffic-emergency.jpg", prompt: "A top-down smart city traffic monitoring UI, glowing red and green routes on a dark map, emergency vehicle pathfinding algorithm visualized, 8k high tech" },
  { name: "saimeera.jpg", prompt: "A futuristic digital business platform interface, glowing e-commerce metrics and corporate branding, dark mode sleek design, neon lights, 8k resolution" },
  { name: "agentos.jpg", prompt: "A massive multi-model AI agent architecture visualized as glowing server racks and neural network pathways, dark tech laboratory, glowing blue logic gates, 8k" },
  { name: "chess.jpg", prompt: "A highly futuristic digital chess board with glowing neon pieces floating in a dark cyberpunk arena, high tech esports aesthetic, 8k photorealistic" }
];

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const request = https.get(url, { timeout: 30000 }, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
          const req2 = https.get(response.headers.location, { timeout: 30000 }, (res) => {
              if (res.statusCode !== 200) {
                  fs.unlink(dest, () => reject(new Error(`Status ${res.statusCode}`)));
                  return;
              }
              res.pipe(file);
              file.on('finish', () => file.close(resolve));
          }).on('error', (err) => {
              fs.unlink(dest, () => reject(err));
          }).on('timeout', () => {
              req2.destroy();
              fs.unlink(dest, () => reject(new Error('Timeout')));
          });
      } else if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => file.close(resolve));
      } else {
         fs.unlink(dest, () => reject(new Error(`Status ${response.statusCode}`)));
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    }).on('timeout', () => {
        request.destroy();
        fs.unlink(dest, () => reject(new Error('Timeout')));
    });
  });
};

const delay = ms => new Promise(res => setTimeout(res, ms));

async function run() {
  for (const img of imagesToFetch) {
    const dest = path.join(dir, img.name);
    // Remove existing file if it's too small (broken download)
    if (fs.existsSync(dest)) {
        const stats = fs.statSync(dest);
        if (stats.size < 50000) { // less than 50kb is likely a broken image or error HTML
            console.log(`Removing broken image ${img.name}`);
            fs.unlinkSync(dest);
        } else {
            console.log(`Skipping ${img.name}, already exists and looks valid.`);
            continue;
        }
    }
    
    const safePrompt = encodeURIComponent(img.prompt);
    const url = `https://image.pollinations.ai/prompt/${safePrompt}?width=800&height=600&nologo=true&seed=${Math.floor(Math.random()*100000)}`;
    
    let success = false;
    let attempts = 0;
    while (!success && attempts < 5) {
      attempts++;
      console.log(`Downloading ${img.name} (Attempt ${attempts})...`);
      try {
          await download(url, dest);
          
          // Verify file size after download
          const stats = fs.statSync(dest);
          if (stats.size > 50000) {
              console.log(`Successfully downloaded ${img.name} (${Math.round(stats.size/1024)} KB)`);
              success = true;
          } else {
              console.log(`File too small, retrying...`);
              fs.unlinkSync(dest);
          }
          await delay(2000);
      } catch (e) {
          console.error(`Error downloading ${img.name}:`, e.message);
          await delay(3000);
      }
    }
  }
  console.log("Done downloading all images.");
}

run();
