// JavaScript interactions for Roderick Andoy Jr. Website

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Dynamic Role Typing Effect
  const typedRole = document.getElementById('typed-role');
  const roles = [
    "Software Engineering",
    "Systems Architecture",
    "Full-Stack Development",
    "API & Cloud Infrastructure"
  ];
  let roleIdx = 0, charIdx = 0, isDeleting = false;

  function typeRole() {
    if (!typedRole) return;
    const current = roles[roleIdx];

    if (isDeleting) {
      typedRole.textContent = current.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typedRole.textContent = current.substring(0, charIdx + 1);
      charIdx++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIdx === current.length) {
      isDeleting = true;
      speed = 2200;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      speed = 400;
    }

    setTimeout(typeRole, speed);
  }
  typeRole();

  // 2. Interactive Terminal Engine
  const terminalOutput = document.getElementById('terminal-output');
  const termPresets = document.querySelectorAll('.term-preset');

  const cmdResponses = {
    skills: [
      "<span class='text-emerald-400'>[Core Engineering]</span> JavaScript, TypeScript, Python, Node.js, React, Next.js",
      "<span class='text-cyan-400'>[Databases]</span> PostgreSQL, MongoDB, Redis, REST APIs, GraphQL",
      "<span class='text-amber-400'>[DevOps]</span> Docker, Git, CI/CD Pipelines, Linux, AWS / Vercel"
    ],
    contact: [
      "Email: <span class='text-emerald-400'>roderick.andoy@example.com</span>",
      "Location: <span class='text-cyan-400'>Philippines (Remote Available)</span>",
      "Status: <span class='text-amber-400'>Open for software engineering opportunities</span>"
    ],
    status: [
      "System Status: <span class='text-emerald-400'>ONLINE (100% Uptime)</span>",
      "Current Focus: Architecting next-gen full-stack cloud applications.",
      "Latency: < 15ms"
    ]
  };

  termPresets.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (!terminalOutput) return;

      if (cmd === 'clear') {
        terminalOutput.innerHTML = `<div class="text-slate-500">Terminal buffer cleared. Type or click presets below:</div>`;
        return;
      }

      const promptLine = document.createElement('div');
      promptLine.className = 'text-emerald-400 mt-2';
      promptLine.innerHTML = `$ ${cmd}`;
      terminalOutput.appendChild(promptLine);

      if (cmdResponses[cmd]) {
        cmdResponses[cmd].forEach(res => {
          const resLine = document.createElement('div');
          resLine.className = 'text-slate-300 ml-3';
          resLine.innerHTML = res;
          terminalOutput.appendChild(resLine);
        });
      }

      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    });
  });

  // 3. Copy Email to Clipboard
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyEmailText = document.getElementById('copy-email-text');

  if (copyEmailBtn && copyEmailText) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('roderick.andoy@example.com').then(() => {
        copyEmailText.textContent = "Copied!";
        copyEmailBtn.classList.add('border-emerald-500', 'text-emerald-400');
        setTimeout(() => {
          copyEmailText.textContent = "Copy Email";
          copyEmailBtn.classList.remove('border-emerald-500', 'text-emerald-400');
        }, 2000);
      });
    });
  }

  // 4. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
  }

  // 5. Light / Dark Theme Switch
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      if (themeIcon) themeIcon.className = `fas ${isLight ? 'fa-sun' : 'fa-moon'} text-xs`;
    });
  }

  // 6. Project Filter
  const projFilters = document.querySelectorAll('.proj-filter');
  const projCards = document.querySelectorAll('.proj-card');

  projFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      projFilters.forEach(b => {
        b.classList.remove('active', 'bg-emerald-400', 'text-slate-950');
        b.classList.add('text-slate-400');
      });
      btn.classList.add('active', 'bg-emerald-400', 'text-slate-950');
      btn.classList.remove('text-slate-400');

      const cat = btn.getAttribute('data-filter');
      projCards.forEach(card => {
        if (cat === 'all' || card.getAttribute('data-category') === cat) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 7. Contact Form Feedback
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      formFeedback.className = "p-4 rounded-2xl text-xs font-semibold text-center bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";
      formFeedback.textContent = "Thank you! Roderick Andoy Jr. has received your message.";
      formFeedback.classList.remove('hidden');
      contactForm.reset();

      setTimeout(() => {
        formFeedback.classList.add('hidden');
      }, 5000);
    });
  }

});
