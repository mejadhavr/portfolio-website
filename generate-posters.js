import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const videoDir = './public/videos';
const posterDir = './public/videos/posters';

if (!fs.existsSync(posterDir)) {
  fs.mkdirSync(posterDir, { recursive: true });
}

// Extract posters from both MP4 and WebM
const files = fs.readdirSync(videoDir).filter(file => file.endsWith('.mp4') || file.endsWith('.webm'));

// Use a Map to track base names so we don't generate the same poster twice (for .mp4 and .webm)
const processedBaseNames = new Set();

files.forEach(file => {
  const baseName = path.parse(file).name;
  if (processedBaseNames.has(baseName)) return;
  
  const inputPath = path.join(videoDir, file);
  const outputPath = path.join(posterDir, `${baseName}.webp`);

  console.log(`Generating poster for ${file}...`);
  
  try {
    // -ss 00:00:01: Seek to 1 second
    // -vframes 1: Extract 1 frame
    // -q:v 50: Quality 50 (balance size/clarity)
    // -vf scale=1280:-1: Scale to 720p width while maintaining aspect ratio
    const command = `ffmpeg -i "${inputPath}" -ss 00:00:01 -vframes 1 -q:v 50 -vf scale=1280:-1 "${outputPath}" -y`;
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ Created ${baseName}.webp`);
    processedBaseNames.add(baseName);
  } catch {
    console.error(`❌ Failed to process ${file}. Make sure FFmpeg is installed.`);
  }
});

console.log('🎉 All posters generated successfully!');
