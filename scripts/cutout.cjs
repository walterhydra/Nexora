const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function processImage(inputPath, outputPath, options = {}) {
  const { threshold = 248, feather = 2 } = options;
  const image = sharp(inputPath);
  const { width, height } = await image.metadata();

  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const channels = info.channels; // 3 (RGB)

  // BFS Flood-fill from outer boundaries
  const visited = new Uint8Array(width * height);
  const queue = new Int32Array(width * height);
  let head = 0;
  let tail = 0;

  function isBackground(idx) {
    const r = data[idx * channels];
    const g = data[idx * channels + 1];
    const b = data[idx * channels + 2];
    // Check if pixel is pure white / near-white background
    return r >= threshold && g >= threshold && b >= threshold;
  }

  // Seed with all edge pixels
  for (let x = 0; x < width; x++) {
    const topIdx = x;
    const botIdx = (height - 1) * width + x;
    if (!visited[topIdx] && isBackground(topIdx)) {
      visited[topIdx] = 1;
      queue[tail++] = topIdx;
    }
    if (!visited[botIdx] && isBackground(botIdx)) {
      visited[botIdx] = 1;
      queue[tail++] = botIdx;
    }
  }

  for (let y = 0; y < height; y++) {
    const leftIdx = y * width;
    const rightIdx = y * width + (width - 1);
    if (!visited[leftIdx] && isBackground(leftIdx)) {
      visited[leftIdx] = 1;
      queue[tail++] = leftIdx;
    }
    if (!visited[rightIdx] && isBackground(rightIdx)) {
      visited[rightIdx] = 1;
      queue[tail++] = rightIdx;
    }
  }

  // Flood fill
  while (head < tail) {
    const curr = queue[head++];
    const cx = curr % width;
    const cy = Math.floor(curr / width);

    // 4 directions
    const neighbors = [
      cy > 0 ? curr - width : -1,
      cy < height - 1 ? curr + width : -1,
      cx > 0 ? curr - 1 : -1,
      cx < width - 1 ? curr + 1 : -1
    ];

    for (const n of neighbors) {
      if (n !== -1 && !visited[n] && isBackground(n)) {
        visited[n] = 1;
        queue[tail++] = n;
      }
    }
  }

  // Build RGBA output
  const outputBuffer = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const srcIdx = i * channels;
    const dstIdx = i * 4;

    outputBuffer[dstIdx] = data[srcIdx];
    outputBuffer[dstIdx + 1] = data[srcIdx + 1];
    outputBuffer[dstIdx + 2] = data[srcIdx + 2];

    if (visited[i] === 1) {
      // background
      outputBuffer[dstIdx + 3] = 0;
    } else {
      // sticker foreground
      outputBuffer[dstIdx + 3] = 255;
    }
  }

  // Save as PNG
  await sharp(outputBuffer, {
    raw: {
      width,
      height,
      channels: 4
    }
  })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  console.log(`Processed: ${outputPath}`);
}

async function main() {
  const brainDir = 'C:/Users/admin/.gemini/antigravity/brain/888e6f9c-6efc-449d-9a85-0690073000a1';
  
  await processImage(
    path.join(brainDir, 'rocket_3d_1794304929481.jpg'),
    'public/images/stickers/rocket-3d.png',
    { threshold: 245 }
  );

  await processImage(
    path.join(brainDir, 'verified_badge_3d_1794304953004.jpg'),
    'public/images/stickers/verified-badge-3d.png',
    { threshold: 245 }
  );

  await processImage(
    path.join(brainDir, 'coffee_code_3d_1794304973630.jpg'),
    'public/images/stickers/coffee-code-3d.png',
    { threshold: 245 }
  );
}

main().catch(console.error);
