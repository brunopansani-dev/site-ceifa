// Script da Igreja CEIFA

document.addEventListener('DOMContentLoaded', function () {

    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const navLinks = document.querySelectorAll('.nav-links a');

    // ── Navbar scroll effect ──────────────────────────────
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ── Hamburger toggle ──────────────────────────────────
    function openMenu() {
        hamburger.classList.add('active');
        navLinksContainer.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        navLinksContainer.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', () => {
        hamburger.classList.contains('active') ? closeMenu() : openMenu();
    });

    overlay.addEventListener('click', closeMenu);

    // ── Nav links: smooth scroll + close menu ─────────────
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                closeMenu();
                const section = document.querySelector(href);
                if (section) {
                    const offset = navbar.offsetHeight;
                    const top = section.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
            }
        });
    });

    // ── Active link highlight on scroll ──────────────────
    function updateActiveLink() {
        const scrollPosition = window.scrollY + navbar.offsetHeight + 10;
        document.querySelectorAll('section[id]').forEach(section => {
            const top    = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const link   = document.querySelector(`.nav-links a[href="#${section.id}"]`);
            if (link) {
                link.style.opacity = (scrollPosition >= top && scrollPosition < bottom) ? '1' : '0.6';
            }
        });
    }
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();

    // ── Card entrance animation ───────────────────────────
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                requestAnimationFrame(() => {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.culto-card, .pastor-card, .contato-card, .feature, .info-card, .celula-item').forEach(card => {
        observer.observe(card);
    });

    // ── Scroll progress bar ───────────────────────────────
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop  = window.scrollY;
            const docHeight  = document.body.scrollHeight - window.innerHeight;
            progressBar.style.width = ((scrollTop / docHeight) * 100) + '%';
        });
    }

});

// Console greeting
console.log('%c🙏 Bem-vindo ao site da Igreja CEIFA!', 'font-size:14px;color:#5469FF;font-weight:bold;');
console.log('%cComunidade de Integração da Família — Uberaba, MG', 'font-size:12px;color:#000;');