// Script da Igreja CEIFA - Versão Premium

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    
    // Efeito de scrolling na navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Navbar smooth scroll e menu mobile
    const navLinks = document.querySelectorAll('.nav-links a');
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const section = document.querySelector(href);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
                // Fechar menu mobile se estiver aberto
                navLinksContainer?.classList.remove('active');
            }
        });
    });

    // Hamburger menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinksContainer?.classList.toggle('active');
        });
    }

    // Destaque do link ativo ao scrollar
    window.addEventListener('scroll', updateActiveLink);

    function updateActiveLink() {
        const scrollPosition = window.scrollY + 100;
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.style.opacity = '0.6';
                    if (link.getAttribute('href') === '#' + section.id) {
                        link.style.opacity = '1';
                    }
                });
            }
        });
    }

    // Animação de cards ao entrar na viewport
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

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
    }, observerOptions);

    // Observar elementos
    document.querySelectorAll('.culto-card, .pastor-card, .contato-card, .feature, .info-card').forEach(card => {
        observer.observe(card);
    });

    // Efeito parallax no hero
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${window.scrollY * 0.5}px)`;
        }
    });

    // Scroll Progress Bar
    const progressBar = document.querySelector('.scroll-progress-bar');
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    // Contador de animação para números
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 30);
    }

    // Iniciar contador quando chegar na seção
    const statsElements = document.querySelectorAll('[data-count]');
    statsElements.forEach(el => {
        observer.observe(el);
        el.addEventListener('observed', () => {
            const target = parseInt(el.getAttribute('data-count'));
            animateCounter(el, target);
        }, { once: true });
    });
});

// Sistema de localização de células
document.addEventListener('DOMContentLoaded', function() {
    // Sistema removido - agora mostra lista estática
});

// Console greeting
console.log('%c🙏 Bem-vindo ao site da Igreja CEIFA!', 'font-size: 14px; color: #5469FF; font-weight: bold;');
console.log('%cComunidade de Integração da Família - Uberaba, MG', 'font-size: 12px; color: #000000;');
console.log('%cTelefone: Entre em contato via Instagram @igrejaceifa.uberaba', 'font-size: 11px; color: #64748b;');
