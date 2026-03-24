const fs = require('fs');
const path = require('path');

const pagesPath = path.join(__dirname, 'src/renderer/pages');
const componentsPath = path.join(__dirname, 'src/renderer/components');

const replacements = [
  // Backgrounds
  { regex: /\bbg-white\b/g, replacement: 'bg-white dark:bg-slate-950' },
  { regex: /\bbg-slate-50\b/g, replacement: 'bg-slate-50 dark:bg-slate-900/50' },
  { regex: /\bbg-slate-100\b/g, replacement: 'bg-slate-100 dark:bg-slate-800' },
  { regex: /\bbg-[#F1F5F9]\b/g, replacement: 'bg-[#F1F5F9] dark:bg-slate-900' },
  { regex: /\bbg-[#10B981]\/10\b/g, replacement: 'bg-[#10B981]/10 dark:bg-emerald-900/30' },
  
  // Borders
  { regex: /\bborder-slate-100\b/g, replacement: 'border-slate-100 dark:border-slate-800/50' },
  { regex: /\bborder-slate-200\b/g, replacement: 'border-slate-200 dark:border-slate-800' },
  { regex: /\bborder-slate-300\b/g, replacement: 'border-slate-300 dark:border-slate-700' },
  { regex: /\bborder-[#E2E8F0]\b/g, replacement: 'border-[#E2E8F0] dark:border-slate-700' },
  
  // Texts
  { regex: /\btext-slate-800\b/g, replacement: 'text-slate-800 dark:text-slate-200' },
  { regex: /\btext-slate-700\b/g, replacement: 'text-slate-700 dark:text-slate-300' },
  { regex: /\btext-slate-600\b/g, replacement: 'text-slate-600 dark:text-slate-400' },
  { regex: /\btext-slate-500\b/g, replacement: 'text-slate-500 dark:text-slate-400' },
  { regex: /\btext-slate-400\b/g, replacement: 'text-slate-400 dark:text-slate-500' },
  { regex: /\btext-slate-300\b/g, replacement: 'text-slate-300 dark:text-slate-600' },
  
  // Hovers
  { regex: /\bhover:bg-slate-50\b/g, replacement: 'hover:bg-slate-50 dark:hover:bg-slate-800/50' },
  { regex: /\bhover:bg-slate-100\b/g, replacement: 'hover:bg-slate-100 dark:hover:bg-slate-800' },
  { regex: /\bhover:text-slate-900\b/g, replacement: 'hover:text-slate-900 dark:hover:text-slate-100' },
  { regex: /\bhover:text-slate-800\b/g, replacement: 'hover:text-slate-800 dark:hover:text-slate-200' },
  
  // Placeholders
  { regex: /\bplaceholder-slate-300\b/g, replacement: 'placeholder-slate-300 dark:placeholder-slate-600' },
  { regex: /\bplaceholder-slate-400\b/g, replacement: 'placeholder-slate-400 dark:placeholder-slate-500' },
  
  // specific emerald
  { regex: /\bhover:border-emerald-400\b/g, replacement: 'hover:border-emerald-400 dark:hover:border-emerald-600/50' },
  { regex: /\bfocus:border-emerald-500\b/g, replacement: 'focus:border-emerald-500 dark:focus:border-emerald-500/80' }
];

function processFile(fullPath) {
  let content = fs.readFileSync(fullPath, 'utf8');
  let changed = false;
  
  for (const { regex, replacement } of replacements) {
    // Only replace if it is NOT immediately followed by a space and "dark:"
    // e.g. "bg-white dark:..." -> fail lookahead
    const safeRegex = new RegExp(regex.source + '(?![\\s]*dark:)', 'g');
    const newContent = content.replace(safeRegex, replacement);
    if (newContent !== content) {
      content = newContent;
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated ${path.basename(fullPath)}`);
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

// Also let's append dark mode css for the checkbox to styles.css
const stylesPath = path.join(__dirname, 'src/renderer/styles.css');
if (fs.existsSync(stylesPath)) {
  let css = fs.readFileSync(stylesPath, 'utf8');
  if (!css.includes('.dark input[type="checkbox"].ai-checkbox')) {
    css += `
/* Dark mode for ai-checkbox */
.dark input[type="checkbox"].ai-checkbox {
  background-color: #020617; /* slate-950 */
  border-color: #1e293b; /* slate-800 */
}
.dark input[type="checkbox"].ai-checkbox:checked {
  background-color: #10B981;
  border-color: #10B981;
}
`;
    fs.writeFileSync(stylesPath, css, 'utf8');
    console.log('Updated styles.css for dark mode checkboxes');
  }
}

console.log('Done scanning and replacing.');
