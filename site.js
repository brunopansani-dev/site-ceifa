// Script da Igreja CEIFA

document.addEventListener('DOMContentLoaded', function() {
    // Navbar smooth scroll
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const section = document.querySelector(href);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Destaque do link ativo ao scrollar
    window.addEventListener('scroll', updateActiveLink);

    function updateActiveLink() {
        const scrollPosition = window.scrollY + 80;
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
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.culto-card, .pastor, .contato-card').forEach(card => {
        observer.observe(card);
    });
});

// Greeting no console
console.log('%c🙏 Bem-vindo ao site da Igreja CEIFA!', 'font-size: 14px; color: #4F46E5; font-weight: bold;');
console.log('%cComunidade de Integração da Família - Uberaba, MG', 'font-size: 12px; color: #7C3AED;');

