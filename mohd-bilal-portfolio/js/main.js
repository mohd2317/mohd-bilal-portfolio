(function () {
      const SKILLS = [
        { name: 'Core Java 8+', icon: 'coffee', cat: 'backend' },
        { name: 'Python', icon: 'code-2', cat: 'backend' },
        { name: 'Spring Boot', icon: 'leaf', cat: 'backend' },
        { name: 'MySQL & JDBC', icon: 'database', cat: 'backend' },
        { name: 'HTML5 & CSS3', icon: 'layout', cat: 'backend' },
        { name: 'Git & GitHub', icon: 'git-branch', cat: 'tools' },
        { name: 'ITIL & Support', icon: 'headphones', cat: 'support' },
        { name: 'LangChain AI', icon: 'bot', cat: 'tools' },
        { name: 'IntelliJ & VS Code', icon: 'terminal', cat: 'tools' }
      ];

      const PROJECTS = [
        {
          id: 'commutematch',
          title: 'CommuteMatch Project',
          category: 'ai',
          badge: 'In Development',
          stack: 'Java Full-Stack • Python • LangChain',
          previewTitle: 'CommuteMatch Routing',
          previewLine: 'Java API + Python Agent',
          summary: 'Shared-mobility routing system backend using Java web APIs paired with a Python automation agent to link co-travelers.',
          bullets: [
            'Designing a shared-mobility routing system backend using Java web APIs.',
            'Embedding a smart automation agent using Python and LangChain to link co-travelers via destination paths.'
          ],
          githubUrl: 'https://github.com/mohd2317'
        },
        {
          id: 'irctc',
          title: 'IRCTC Ticket Booking System',
          category: 'backend',
          badge: 'Backend & Security',
          stack: 'Java • JSON • BCrypt',
          previewTitle: 'Ticket Reservation API',
          previewLine: 'BCrypt Auth + JSON Store',
          summary: 'Layered backend logic for authorization registries, route queries, multi-stage reservations, and BCrypt password security.',
          bullets: [
            'Formulated layered system backend logic facilitating authorization registries, route queries, multi-stage reservations tracking, and record cancellation parameters.',
            'Integrated industry-standard BCrypt algorithm for high-security password cryptographic hashing alongside structured local storage configurations via JSON maps.'
          ],
          githubUrl: 'https://github.com/mohd2317'
        },
        {
          id: 'ems',
          title: 'Employee Management System',
          category: 'backend',
          badge: 'JDBC & MySQL',
          stack: 'Java 8 • JDBC • MySQL',
          previewTitle: 'CRUD Operations Console',
          previewLine: 'OOP + JDBC Transactions',
          summary: 'Object-oriented console application with full CRUD logic, structured Java exception handlers, and MySQL persistence.',
          bullets: [
            'Architected a robust console application utilizing Object-Oriented Programming (OOP) paradigms, full CRUD logic patterns, and structured Java Exception Handlers.',
            'Built safe database transaction maps using JDBC drivers, validating secure persistent connections, statement workflows, and relational data operations.'
          ],
          githubUrl: 'https://github.com/mohd2317'
        }
      ];

      let activeSkillTab = 'all';
      let activeFilter = 'all';

      function showToast(msg) {
        const container = document.getElementById('toast-container');
        if (!container) return;
        const el = document.createElement('div');
        el.className = 'toast-enter rounded-xl border border-stone-200 bg-slate-900 px-4 py-2.5 text-xs font-medium text-white shadow-lg';
        el.textContent = msg;
        container.appendChild(el);
        setTimeout(() => el.remove(), 2600);
      }

      function copyText(text, label) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(() => showToast(label + ' copied: ' + text)).catch(() => fallbackCopy(text, label));
        } else {
          fallbackCopy(text, label);
        }
      }

      function fallbackCopy(text, label) {
        try {
          const ta = document.createElement('textarea');
          ta.value = text;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          showToast(label + ' copied: ' + text);
        } catch (err) {
          showToast('Copy manually: ' + text);
        }
      }

      function renderSkills() {
        const grid = document.getElementById('skills-grid');
        if (!grid) return;
        const list = activeSkillTab === 'all' ? SKILLS : SKILLS.filter((s) => s.cat === activeSkillTab);
        grid.innerHTML = list.map((s) => `
          <div class="soft-card-3d flex flex-col items-center justify-center gap-2 rounded-2xl border border-stone-200 bg-white p-4 text-center">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-50 text-slate-700">
              <i data-lucide="${s.icon}" class="h-5 w-5"></i>
            </div>
            <span class="text-[11px] font-semibold text-slate-700">${s.name}</span>
          </div>
        `).join('');
        if (window.lucide) window.lucide.createIcons();
      }

      function renderProjects() {
        const grid = document.getElementById('projects-grid');
        if (!grid) return;
        const list = activeFilter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === activeFilter);
        grid.innerHTML = list.map((p) => `
          <article class="soft-card-3d tilt-card flex flex-col justify-between overflow-hidden rounded-2xl border border-stone-200 bg-white">
            <div class="bg-orange-50/60 p-5 pb-0">
              <div class="rounded-t-xl border border-b-0 border-stone-200 bg-white p-3.5 shadow-sm">
                <div class="flex items-center justify-between">
                  <div class="flex gap-1">
                    <span class="h-2 w-2 rounded-full bg-orange-400"></span>
                    <span class="h-2 w-2 rounded-full bg-stone-300"></span>
                    <span class="h-2 w-2 rounded-full bg-stone-300"></span>
                  </div>
                  <span class="text-[10px] font-semibold text-orange-500">${p.badge}</span>
                </div>
                <p class="mt-2.5 text-xs font-bold text-slate-800">${p.previewTitle}</p>
                <p class="text-[11px] text-slate-400">${p.previewLine}</p>
              </div>
            </div>
            <div class="flex flex-1 flex-col justify-between p-5 space-y-4">
              <div class="space-y-1.5">
                <div class="flex items-center justify-between">
                  <h3 class="text-sm font-bold text-slate-900">${p.title}</h3>
                  <button type="button" data-project-id="${p.id}" class="open-project-btn text-orange-500 hover:text-orange-600" aria-label="View ${p.title} Details">
                    <i data-lucide="arrow-up-right" class="h-4 w-4"></i>
                  </button>
                </div>
                <p class="text-xs leading-relaxed text-slate-500">${p.summary}</p>
              </div>
              <div class="flex items-center justify-between border-t border-stone-100 pt-3">
                <span class="text-[11px] font-medium text-slate-400">${p.stack}</span>
                <button type="button" data-project-id="${p.id}" class="open-project-btn text-[11px] font-semibold text-orange-500 hover:underline">Details</button>
              </div>
            </div>
          </article>
        `).join('');
        if (window.lucide) window.lucide.createIcons();
        bindTiltCards();
      }

      function bindTiltCards() {
        document.querySelectorAll('.tilt-card').forEach((card) => {
          if (card.dataset.tiltBound === '1') return;
          card.dataset.tiltBound = '1';
          card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(900px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg) translateY(-3px)`;
          });
          card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)';
          });
        });
      }

      function openProjectModal(projectId) {
        const p = PROJECTS.find((item) => item.id === projectId);
        if (!p) return;
        const modal = document.getElementById('project-modal');
        document.getElementById('modal-badge').textContent = p.badge;
        document.getElementById('modal-title').textContent = p.title;
        document.getElementById('modal-stack').textContent = p.stack;
        document.getElementById('modal-github-link').href = p.githubUrl;
        document.getElementById('modal-bullets').innerHTML = p.bullets.map((b) => `
          <li class="flex items-start gap-2">
            <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500"></span>
            <span>${b}</span>
          </li>
        `).join('');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      }

      function closeProjectModal() {
        const modal = document.getElementById('project-modal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }

      window.addEventListener('DOMContentLoaded', () => {
        if (window.lucide) window.lucide.createIcons();
        renderSkills();
        renderProjects();

        // Mobile menu
        const mobileBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileBtn && mobileMenu) {
          mobileBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden');
            mobileBtn.setAttribute('aria-expanded', String(isHidden));
          });
          document.querySelectorAll('.mobile-nav-link').forEach((link) => {
            link.addEventListener('click', () => {
              mobileMenu.classList.add('hidden');
              mobileBtn.setAttribute('aria-expanded', 'false');
            });
          });
        }

        // Copy buttons
        document.getElementById('copy-email-hero')?.addEventListener('click', () => {
          copyText('mohdbilal002345@gmail.com', 'Email');
        });
        document.getElementById('copy-phone-btn')?.addEventListener('click', () => {
          copyText('+91 7618106617', 'Phone');
        });

        // Skill Tabs
        document.querySelectorAll('.skill-tab-btn').forEach((btn) => {
          btn.addEventListener('click', () => {
            activeSkillTab = btn.dataset.skillTab;
            document.querySelectorAll('.skill-tab-btn').forEach((b) => {
              b.className = 'skill-tab-btn rounded-full border border-stone-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-600 transition hover:border-orange-300';
            });
            btn.className = 'skill-tab-btn rounded-full bg-orange-500 px-3.5 py-1.5 text-xs font-semibold text-white transition';
            renderSkills();
          });
        });

        // Project Filters
        document.querySelectorAll('.project-filter-btn').forEach((btn) => {
          btn.addEventListener('click', () => {
            activeFilter = btn.dataset.filter;
            document.querySelectorAll('.project-filter-btn').forEach((b) => {
              b.className = 'project-filter-btn rounded-full border border-stone-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-600 transition hover:border-orange-300';
            });
            btn.className = 'project-filter-btn rounded-full bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white transition';
            renderProjects();
          });
        });

        // Project Modal
        document.getElementById('projects-grid')?.addEventListener('click', (e) => {
          const btn = e.target.closest('.open-project-btn');
          if (btn) openProjectModal(btn.dataset.projectId);
        });
        document.getElementById('close-modal-btn')?.addEventListener('click', closeProjectModal);
        document.getElementById('modal-close-secondary')?.addEventListener('click', closeProjectModal);
        document.getElementById('project-modal')?.addEventListener('click', (e) => {
          if (e.target.id === 'project-modal') closeProjectModal();
        });

        // Contact Modal
        const contactModal = document.getElementById('contact-modal');
        document.getElementById('open-contact-modal-btn')?.addEventListener('click', () => {
          contactModal.classList.remove('hidden');
          contactModal.classList.add('flex');
        });
        document.getElementById('close-contact-modal-btn')?.addEventListener('click', () => {
          contactModal.classList.add('hidden');
          contactModal.classList.remove('flex');
        });
        contactModal?.addEventListener('click', (e) => {
          if (e.target.id === 'contact-modal') {
            contactModal.classList.add('hidden');
            contactModal.classList.remove('flex');
          }
        });

        document.getElementById('contact-form')?.addEventListener('submit', (e) => {
          e.preventDefault();
          const name = document.getElementById('sender-name').value.trim();
          const email = document.getElementById('sender-email').value.trim();
          const msg = document.getElementById('sender-message').value.trim();
          const status = document.getElementById('form-status');
          if (!name || !email || !msg) {
            status.textContent = 'Please fill in all fields.';
            status.className = 'text-xs text-rose-500';
            return;
          }
          const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
          const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`);
          window.open(`mailto:mohdbilal002345@gmail.com?subject=${subject}&body=${body}`, '_blank');
          status.textContent = 'Email draft prepared!';
          status.className = 'text-xs text-emerald-600';
          showToast('Email draft prepared for mohdbilal002345@gmail.com');
        });
      });
    })();
