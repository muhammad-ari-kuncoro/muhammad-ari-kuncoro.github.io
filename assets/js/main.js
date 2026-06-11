/* =========================
   ARI KUNCORO — PORTFOLIO 2026
   script.js
========================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Terminal typing effect ---------- */
  const terminal = document.getElementById('terminalBody');

  const lines = [
    { type: 'cmd', text: 'whoami' },
    { type: 'out', text: 'Muhammad Ari Kuncoro' },
    { type: 'comment', text: '# Fullstack Developer — Laravel & Flutter' },
    { type: 'gap' },
    { type: 'cmd', text: 'status --check' },
    { type: 'okline', text: '● available for work' },
    { type: 'gap' },
    { type: 'cmd', text: 'stack --top' },
    { type: 'tags', items: ['Laravel', 'Flutter', 'PostgreSQL', 'React', 'Docker'] },
    { type: 'gap' },
    { type: 'cmd', text: 'whereis ari' },
    { type: 'out', text: 'Bekasi, Indonesia 🇮🇩' }
  ];

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function renderStatic() {
    lines.forEach(line => terminal.appendChild(buildLineEl(line, true)));
    appendCursorLine();
  }

  function buildLineEl(line, full) {
    if (line.type === 'gap') {
      const div = document.createElement('div');
      div.style.height = '8px';
      return div;
    }

    const row = document.createElement('div');
    row.className = 'term-line';

    if (line.type === 'cmd') {
      const prompt = document.createElement('span');
      prompt.className = 'term-prompt';
      prompt.textContent = '$';
      row.appendChild(prompt);

      const out = document.createElement('span');
      out.className = 'term-output';
      out.textContent = full ? line.text : '';
      row.appendChild(out);
    } else if (line.type === 'tags') {
      const wrap = document.createElement('div');
      wrap.className = 'term-tags';
      if (full) {
        line.items.forEach(t => {
          const span = document.createElement('span');
          span.textContent = t;
          wrap.appendChild(span);
        });
      }
      row.appendChild(wrap);
      row.style.marginBottom = '0';
    } else {
      const out = document.createElement('span');
      out.textContent = full ? line.text : '';
      out.className =
        line.type === 'comment' ? 'term-comment' :
        line.type === 'okline' ? 'term-ok' :
        'term-output';
      row.appendChild(out);
    }

    return row;
  }

  function appendCursorLine() {
    const row = document.createElement('div');
    row.className = 'term-line';

    const prompt = document.createElement('span');
    prompt.className = 'term-prompt';
    prompt.textContent = '$';

    const cursor = document.createElement('span');
    cursor.className = 'cursor';

    row.appendChild(prompt);
    row.appendChild(cursor);
    terminal.appendChild(row);
  }

  async function typeLines() {
    for (const line of lines) {
      if (line.type === 'gap') {
        terminal.appendChild(buildLineEl(line));
        continue;
      }

      const el = buildLineEl(line, false);
      terminal.appendChild(el);

      if (line.type === 'cmd') {
        const out = el.querySelector('.term-output');
        await typeText(out, line.text, 35);
        await wait(180);
      } else if (line.type === 'tags') {
        const wrap = el.querySelector('.term-tags');
        for (const t of line.items) {
          const span = document.createElement('span');
          span.textContent = t;
          wrap.appendChild(span);
          await wait(90);
        }
        await wait(150);
      } else {
        const out = el.querySelector('span');
        await typeText(out, line.text, 18);
        await wait(220);
      }
    }
    appendCursorLine();
  }

  function typeText(el, text, speed) {
    return new Promise(resolve => {
      let i = 0;
      const interval = setInterval(() => {
        el.textContent = text.slice(0, i + 1);
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          resolve();
        }
      }, speed);
    });
  }

  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  if (terminal) {
    if (reduceMotion) {
      terminal.innerHTML = '';
      renderStatic();
    } else {
      terminal.innerHTML = '';
      typeLines();
    }
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && !reduceMotion) {
    revealEls.forEach(el => el.classList.add('pre-anim'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          entry.target.classList.remove('pre-anim');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navTabs = document.getElementById('navTabs');

  if (navToggle && navTabs) {
    navToggle.addEventListener('click', () => {
      navTabs.classList.toggle('open');
    });

    navTabs.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navTabs.classList.remove('open'));
    });
  }

  /* ---------- Scrollspy ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-tabs a[data-nav]');

  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-50% 0px -50% 0px' });

    sections.forEach(sec => spy.observe(sec));
  }

});