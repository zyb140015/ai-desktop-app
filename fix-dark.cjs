const fs = require('fs');
const path = require('path');

const pagesPath = path.join(__dirname, 'src/renderer/pages');
const componentsPath = path.join(__dirname, 'src/renderer/components');

const replacements = [
  { regex: /dark:bg-slate-900\/50\/50/g, replacement: 'dark:bg-slate-900' },
  { regex: /dark:bg-slate-900\/50/g, replacement: 'dark:bg-slate-900' },
  { regex: /dark:border-slate-800\/50\/50/g, replacement: 'dark:border-slate-800' },
  { regex: /dark:border-slate-800\/50\/60/g, replacement: 'dark:border-slate-800' },
  { regex: /dark:border-slate-800\/50/g, replacement: 'dark:border-slate-800' },
  { regex: /dark:text-slate-400 dark:text-slate-500/g, replacement: 'dark:text-slate-400' },
  { regex: /dark:text-slate-300 dark:text-slate-600/g, replacement: 'dark:text-slate-300' },
  { regex: /dark:text-slate-300 dark:text-slate-500/g, replacement: 'dark:text-slate-300' },
  { regex: /dark:text-slate-200 dark:text-slate-100/g, replacement: 'dark:text-slate-200' },
  { regex: /dark:text-slate-500 dark:text-slate-400/g, replacement: 'dark:text-slate-500' },
  { regex: /dark:text-slate-500 dark:text-slate-600/g, replacement: 'dark:text-slate-500' },
  { regex: /dark:hover:bg-slate-800\/50/g, replacement: 'dark:hover:bg-slate-800' },
  { regex: /dark:hover:bg-slate-800\/50\/50/g, replacement: 'dark:hover:bg-slate-800' },
  { regex: /dark:hover:border-emerald-600\/50/g, replacement: 'dark:hover:border-emerald-600' },
  { regex: /dark:hover:border-emerald-600\/50\/50/g, replacement: 'dark:hover:border-emerald-600' }
];

function processFile(fullPath) {
  let content = fs.readFileSync(fullPath, 'utf8');
  let changed = false;
  
  for (const { regex, replacement } of replacements) {
    const newContent = content.replace(regex, replacement);
    if (newContent !== content) {
      content = newContent;
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Cleaned up ${path.basename(fullPath)}`);
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      processFile(fullPath);
    }
  }
}

walkDir(pagesPath);
walkDir(componentsPath);
console.log('Done cleaning up.');
