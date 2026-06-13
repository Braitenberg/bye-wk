let WK_PATTERNS = [];
let SECTION_PATTERN = /meer\s*wk/i;

const ext = typeof browser !== 'undefined' ? browser : chrome;
fetch(ext.runtime.getURL('patterns.txt'))
  .then((r) => r.text())
  .then((text) => {
    WK_PATTERNS = text
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith('#'))
      .map((l) => new RegExp(l, 'i'));

    // Rebuild section signal pattern from loaded patterns
    const sectionLine = WK_PATTERNS.find((p) => p.source.includes('meer'));
    if (sectionLine) SECTION_PATTERN = sectionLine;

    blockWKContent();
    const observer = new MutationObserver(() => blockWKContent());
    observer.observe(document.body, { childList: true, subtree: true });
  });

function isWKRelated(text) {
  return WK_PATTERNS.some((pattern) => pattern.test(text));
}

// Find the blockable ancestor of a matching element.
// For section-level blocks (e.g. "meer wk voetbal"), the matching element is
// the heading itself — its direct parent is the block container we want to hide.
// For individual cards, stop at <article>, <li>, or a heading-wrapping <a>.
function findCardAncestor(el, isSectionSignal) {
  if (isSectionSignal && /^H[1-6]$/.test(el.tagName) && el.parentElement !== document.body) {
    return el.parentElement;
  }
  let node = el;
  while (node && node !== document.body) {
    const tag = node.tagName;
    if (tag === 'SECTION' || tag === 'ASIDE') return node;
    if (tag === 'ARTICLE' || tag === 'LI') return node;
    if (tag === 'A' && node.querySelector('h1,h2,h3,h4')) return node;
    node = node.parentElement;
  }
  return el;
}

function blockWKContent() {
  // Check headings and category labels by text content
  const targets = document.querySelectorAll('h1, h2, h3, h4, [class*="label"], [class*="tag"], [class*="category"]');
  for (const el of targets) {
    const text = el.innerText || el.textContent || '';
    if (!isWKRelated(text)) continue;

    const isSectionSignal = SECTION_PATTERN.test(text);
    const card = findCardAncestor(el, isSectionSignal);
    if (card.dataset.wkBlocked) continue;
    card.dataset.wkBlocked = '1';
    card.style.display = 'none';
  }

  // Also catch cards where the WK signal is only in the link URL (e.g. livestreams)
  const links = document.querySelectorAll('a[href]');
  for (const a of links) {
    if (!isWKRelated(a.href)) continue;
    const card = findCardAncestor(a, false);
    if (card.dataset.wkBlocked) continue;
    card.dataset.wkBlocked = '1';
    card.style.display = 'none';
  }
}
