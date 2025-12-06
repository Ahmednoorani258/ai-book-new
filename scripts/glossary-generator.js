const fs = require('fs');
const path = require('path');
const glob = require('glob');

const docsPath = path.join(__dirname, '../docs/modules');
const glossaryFilePath = path.join(__dirname, '../docs/glossary.md');
const termRegex = /<GlossaryTerm\s+term="([^"]+)"\s+definition="([^"]+)"\s*\/>/g;

function generateGlossary() {
  console.log('Starting glossary generation...');
  const terms = [];

  const files = glob.sync(`${docsPath}/**/*.mdx`);
  console.log(`Found ${files.length} MDX files to scan.`);

  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    let match;
    while ((match = termRegex.exec(content)) !== null) {
      terms.push({
        term: match[1],
        definition: match[2],
      });
    }
  });

  console.log(`Found ${terms.length} glossary terms.`);

  if (terms.length === 0) {
    console.log('No terms found. Glossary will not be updated.');
    return;
  }

  // Sort terms alphabetically
  terms.sort((a, b) => a.term.localeCompare(b.term));

  let markdownContent = `---\ntitle: Glossary
sidebar_label: Glossary
sidebar_position: 999
slug: /glossary
---

# Glossary

This glossary contains definitions for key terms used throughout the textbook. It is generated automatically.

`;

  terms.forEach(term => {
    markdownContent += `
## ${term.term}\n\n${term.definition}\n`;
  });

  fs.writeFileSync(glossaryFilePath, markdownContent);
  console.log(`Glossary successfully generated at ${glossaryFilePath}`);
}

generateGlossary();
