import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.jsx') || file.endsWith('.js')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(path.join(__dirname, 'src'));

files.forEach(file => {
  if (file.includes('ContextCursor') || file.includes('LoadingScreen')) return;
  
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  // Remove willChange inside style objects
  content = content.replace(/,\s*willChange:\s*['"][^'"]+['"]/g, '');
  content = content.replace(/willChange:\s*['"][^'"]+['"]\s*,?\s*/g, '');
  
  // Clean empty styles
  content = content.replace(/style=\{\{\s*\}\}/g, '');
  
  // Clean specific useMagneticEffect
  content = content.replace(/target\.style\.willChange\s*=\s*['"][^'"]+['"];?/g, '');
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content);
    console.log('Cleaned:', file);
  }
});
