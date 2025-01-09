// Inicializar partículas
particlesJS('particles-js',
    {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#64ffda"
            },
            "shape": {
                "type": "circle"
            },
            "opacity": {
                "value": 0.5,
                "random": false
            },
            "size": {
                "value": 3,
                "random": true
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#64ffda",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            }
        },
        "retina_detect": true
    }
);

// Custom cursor implementation
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const cursorInner = document.createElement('div');
    cursorInner.className = 'cursor-inner';
    document.body.appendChild(cursorInner);

    function updateCursorPosition(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorInner.style.left = e.clientX + 'px';
        cursorInner.style.top = e.clientY + 'px';
    }

    document.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('scroll', updateCursorPosition);

    // Manejar cambios de pantalla completa
    document.addEventListener('fullscreenchange', function() {
        if (document.fullscreenElement) {
            document.addEventListener('mousemove', updateCursorPosition);
        }
    });

    // Add hover effect for clickable elements
    const clickables = document.querySelectorAll('a, button, .btn, .social-link, .theme-switch');
    clickables.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorInner.classList.add('cursor-inner-hover');
        });
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorInner.classList.remove('cursor-inner-hover');
        });
    });
});

// Efecto de escritura para títulos
const typingTexts = [
    "Desarrollador Front-end",
    "Desarrollador Back-end",
    "Diseñador UI/UX",
    "Desarrollador Full Stack"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;

function typeEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeEffect, newTextDelay);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        setTimeout(typeEffect, typingDelay);
    } else {
        setTimeout(typeEffect, isDeleting ? erasingDelay : typingDelay);
    }
}

// Iniciar efecto de escritura
setTimeout(typeEffect, newTextDelay);

// Animación de entrada para elementos
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            if (entry.target.classList.contains('skill-level')) {
                animateCounter(entry.target);
            }
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

// Animación para las tarjetas de habilidades
document.querySelectorAll('.skill-card').forEach(card => {
    VanillaTilt.init(card, {
        max: 25,
        speed: 400,
        glare: true,
        'max-glare': 0.5
    });

    card.addEventListener('mouseenter', (e) => {
        const icon = e.currentTarget.querySelector('i');
        icon.style.transform = 'scale(1.2) rotate(360deg)';
    });

    card.addEventListener('mouseleave', (e) => {
        const icon = e.currentTarget.querySelector('i');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Navegación suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 100;
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Menú móvil
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('header');

menuButton?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuButton.classList.toggle('active');
    header.classList.toggle('menu-open');
});

// Animación de contador para niveles de habilidad
function animateCounter(counter) {
    const target = +counter.getAttribute('data-target');
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            counter.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    };
    
    updateCounter();
}

// Barra de progreso de página
window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;
    
    document.querySelector('.page-progress').style.width = `${progress}%`;
});

// Cambio de tema
const themeSwitch = document.querySelector('.theme-switch');
let isDark = true;

themeSwitch.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    isDark = !isDark;
    themeSwitch.querySelector('i').className = isDark ? 'fas fa-moon' : 'fas fa-sun';
});

// Efecto parallax en el hero
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.005;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.005;
    
    document.querySelector('.hero-content').style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    document.querySelector('.hero-background').style.transform = `translate3d(${-moveX}px, ${-moveY}px, 0)`;
});
