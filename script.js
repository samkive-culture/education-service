  /* ── STAT DATA ── */

  // 카운트, 맥스값 수정해야함
  const courses = [
    { name: '신규 입사자 입문 교육', count: 49, max: 50 },
    { name: '커피 베리에이션 교육', count: 32, max: 40 },
    { name: '브루잉 교육',          count: 15, max: 20 },
    { name: '커핑 초급 교육',       count: 30, max: 30 },
    { name: '점장/세컨 교육',       count: 28, max: 30 },
    { name: '한성자동차 VIP 교육',  count: 30, max: 50 },
  ];
  const grid = document.getElementById('statGrid');
  grid.innerHTML = ''; 

  courses.forEach((c, i) => {
    const pct = Math.round(c.count / c.max * 100);
    
    const card = document.createElement('div');
    card.className = 'stat-card';
    card.innerHTML = `
      <div class="stat-top">
        <div class="stat-name">${c.name}</div>
        <div class="stat-count">
          <div class="stat-num">${c.count}<span class="stat-unit"> 명</span></div>
          <div class="stat-pct" style="text-align:right">수료 완료</div>
        </div>
      </div>
      <div class="stat-bar-bg"><div class="stat-bar-fill" data-pct="${pct}" style="width:0%"></div></div>
      <div class="stat-pct">${pct}% (정원 ${c.max}명)</div>
    `;
    grid.appendChild(card);
  });


  /* Animate bars on scroll */
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      const bars = e.target.querySelectorAll('.stat-bar-fill');
      
      if (e.isIntersecting) {
        bars.forEach(b => {
          b.style.width = b.dataset.pct + '%';
        });
      } else {
        bars.forEach(b => {
          b.style.width = '0%';
        });
      }
    });
  }, { threshold: 0.2 }); 
  obs.observe(grid);


  /* ── ARCHIVE ── */
  function toggleArchive() {
    document.getElementById('archivePanel').classList.toggle('open');
  }
  document.addEventListener('click', e => {
    if (!e.target.closest('.archive-btn') && !e.target.closest('.archive-panel'))
      document.getElementById('archivePanel').classList.remove('open');
  });
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.getElementById('archivePanel').classList.remove('open');
  }

  /* ── NAV ── */
  function scrollToSection(id, el) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    el.classList.add('active');
  }
  window.addEventListener('scroll', () => {
    ['article','report','calendar'].forEach((id, i) => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 140) {
        document.querySelectorAll('.nav-item').forEach((n,j) => n.classList.toggle('active', j===i));
      }
    });
  });

  /* ── CALENDAR ── */
  let cy = 2026, cm = 4;
  const MN = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];
  function updateCal() {
    document.getElementById('calMonthLabel').textContent = `${cy}년 ${MN[cm-1]}`;
    const p = n => String(n).padStart(2,'0');
    const ld = new Date(cy, cm, 0).getDate();
    document.getElementById('calIframe').src =
      `https://calendar.google.com/calendar/embed?src=terarosaeducation%40gmail.com&ctz=Asia%2FSeoul&mode=MONTH&dates=${cy}${p(cm)}01%2F${cy}${p(cm)}${ld}`;
  }
  function changeMonth(d) {
    cm += d;
    if (cm > 12) { cm = 1; cy++; }
    if (cm < 1)  { cm = 12; cy--; }
    updateCal();
  }

/* ── TOP BUTTON ── */
const topBtn = document.getElementById('topBtn');
window.addEventListener('scroll', () => {
  topBtn.classList.toggle('visible', window.scrollY > 300);
});
