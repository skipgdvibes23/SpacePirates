
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);



/* ============================================
   MOBILE MENU TOGGLE - IMPROVED
   ============================================ */
const menuBtn = document.getElementById('menu-mobile-btn');
const menuWrap = document.getElementById('menu-wrapper');
const navbar = document.getElementById('menu');

menuBtn.addEventListener('click', () => {
    const isOpen = menuWrap.classList.toggle('open');
    menuBtn.classList.toggle('active', isOpen);
    menuBtn.setAttribute('aria-expanded', isOpen);
});

// Close menu when clicking a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        menuWrap.classList.remove('open');
        menuBtn.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
        menuWrap.classList.remove('open');
        menuBtn.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        // Skip empty or pure "#" hrefs
        if (!targetId || targetId === '#') return;

        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();
        const offset = navbar.offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

window.addEventListener('scroll', onScroll, { passive: true });

function onScroll() {
    handleNavbarScroll();
    handleActiveLink();
}

function handleNavbarScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
}

function handleActiveLink() {
    const offset = navbar.offsetHeight + 10;
    let current = '';

    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - offset) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        const match = link.getAttribute('href') === `#${current}`;
        link.classList.toggle('active', match);
    });
}

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
});

$$('.reveal').forEach(el => revealObserver.observe(el));

console.log(
    '%c🚀 Space Pirates 🚀',
    'color:#5AD880; font-size:24px; font-weight:bold;'
);
console.log(
    '%cLooking for secrets? Keep exploring, soldier!',
    'color:#FFFF00; font-size:14px;'
);