const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
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

const files = walk('m:/PROJECT FILES/Business Website/Nexora/src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('framer-motion') && content.includes('motion')) {
    let newContent = content;
    
    // Replace import { motion } from 'framer-motion'
    newContent = newContent.replace(/import\s*\{\s*motion\s*\}\s*from\s*['"`]framer-motion['"`]/g, "import { m } from 'framer-motion'");
    
    // Replace import { ..., motion, ... } from 'framer-motion'
    // Specifically looking for motion in destructured imports
    newContent = newContent.replace(/import\s*\{([^}]*)\}\s*from\s*['"`]framer-motion['"`]/g, (match, p1) => {
      let parts = p1.split(',').map(s => s.trim()).filter(s => s);
      if (parts.includes('motion')) {
        parts = parts.map(p => p === 'motion' ? 'm' : p);
        return `import { ${parts.join(', ')} } from 'framer-motion'`;
      }
      return match;
    });

    // Replace <motion. div -> <m. div
    newContent = newContent.replace(/<motion\./g, '<m.');
    newContent = newContent.replace(/<\/motion\./g, '</m.');

    if (newContent !== content) {
      fs.writeFileSync(file, newContent, 'utf8');
      console.log(`Updated ${file}`);
    }
  }
});
console.log('Refactoring complete');
