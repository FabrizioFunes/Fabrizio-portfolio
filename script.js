// ========================================
// Theme Toggle
// ========================================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Add animation effect
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0deg)';
    }, 300);
});

// ========================================
// Mobile Menu
// ========================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
});

// ========================================
// Navbar Scroll Effect
// ========================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ========================================
// Smooth Scroll
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Scroll Progress Bar
// ========================================
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (window.pageYOffset / scrollTotal) * 100;
    scrollProgress.style.width = scrollPercentage + '%';
});

// ========================================
// Intersection Observer for Animations
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger number counter for stat cards
            if (entry.target.classList.contains('stat-card')) {
                animateCounter(entry.target);
            }
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.section-header, .about-content, .skill-category, .education-item, .contact-info, .stat-card').forEach(el => {
    observer.observe(el);
});

// ========================================
// Stagger Effect for Skill Categories
// ========================================
const skillCategories = document.querySelectorAll('.skill-category');
skillCategories.forEach((category, index) => {
    category.style.transitionDelay = `${index * 0.1}s`;
});

// ========================================
// Stagger Effect for Education Items
// ========================================
const educationItems = document.querySelectorAll('.education-item');
educationItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.15}s`;
});

// ========================================
// Custom Cursor
// ========================================
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Smooth cursor animation
function animateCursor() {
    // Cursor position
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    
    // Follower position (slower)
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    if (cursor) {
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    }
    
    if (cursorFollower) {
        cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;
    }
    
    requestAnimationFrame(animateCursor);
}

if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    animateCursor();
}

// Cursor effects on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .skill-tag, .stat-card, .education-card');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursor) cursor.style.transform += ' scale(1.5)';
        if (cursorFollower) cursorFollower.style.transform += ' scale(1.2)';
    });
    
    el.addEventListener('mouseleave', () => {
        if (cursor) cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
        if (cursorFollower) cursorFollower.style.transform = cursorFollower.style.transform.replace(' scale(1.2)', '');
    });
});

// ========================================
// Particles Background
// ========================================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = window.innerWidth > 768 ? 30 : 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 8 + 4;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 20 + 15;
        const animationDelay = Math.random() * 3;
        const opacity = Math.random() * 0.4 + 0.2;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.animationDuration = `${animationDuration}s`;
        particle.style.animationDelay = `${animationDelay}s`;
        particle.style.opacity = opacity;
        
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// ========================================
// Typing Effect for Hero
// ========================================
function typeWriter() {
    const text = 'Fabrizio Funes';
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;
    
    let i = 0;
    typingElement.textContent = '';
    
    function type() {
        if (i < text.length) {
            typingElement.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    }
    
    setTimeout(type, 1000);
}

// Start typing effect when page loads
window.addEventListener('load', typeWriter);

// ========================================
// Number Counter Animation
// ========================================
function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    if (isNaN(target)) return;
    
    const valueElement = element.querySelector('.stat-value');
    if (!valueElement) return;
    
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            valueElement.textContent = target + '+';
            clearInterval(timer);
        } else {
            valueElement.textContent = Math.floor(current);
        }
    }, 16);
}

// ========================================
// Parallax Effect on Scroll
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Parallax for hero shapes
    const shapes = document.querySelectorAll('.hero-bg-shapes .shape');
    shapes.forEach((shape, index) => {
        const speed = 0.1 + (index * 0.05);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ========================================
// Skill Tag Level Indicator
// ========================================
document.querySelectorAll('.skill-tag').forEach(tag => {
    const level = tag.dataset.level;
    if (level) {
        // Map level names to display text
        const levelDisplay = {
            'bajo': 'Nivel Bajo',
            'medio': 'Nivel Medio',
            'medio/alto': 'Nivel Medio/Alto',
            'alto': 'Nivel Alto',
            'actualmente aprendiendo': 'Actualmente Aprendiendo'
        };
        
        tag.setAttribute('title', levelDisplay[level] || level);
        
        // Add ripple effect on click
        tag.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('skill-ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    }
});

// Add skill ripple animation CSS
const skillRippleStyle = document.createElement('style');
skillRippleStyle.textContent = `
    .skill-tag {
        position: relative;
        overflow: hidden;
    }
    
    .skill-ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: skill-ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes skill-ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(skillRippleStyle);
// ========================================
// Add Ripple Effect to Buttons
// ========================================
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Add ripple CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// Tilt Effect on Cards
// ========================================
function addTiltEffect() {
    const cards = document.querySelectorAll('.about-card, .education-card, .stat-card, .skill-category');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 120;
            const rotateY = (centerX - x) / 120;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// Only add tilt on desktop
if (window.innerWidth > 768) {
    addTiltEffect();
}

// ========================================
// Magnetic Effect on Buttons
// ========================================
function addMagneticEffect() {
    const buttons = document.querySelectorAll('.btn-primary, .social-link');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

// Only add magnetic effect on desktop
if (window.innerWidth > 768) {
    addMagneticEffect();
}

// ========================================
// Add Loading Animation
// ========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ========================================
// Lazy Load Images (if any are added later)
// ========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// Add Glow Effect on Mouse Move
// ========================================
document.addEventListener('mousemove', (e) => {
    const glowElements = document.querySelectorAll('.card-glow');
    
    glowElements.forEach(glow => {
        const card = glow.parentElement;
        const rect = card.getBoundingClientRect();
        
        // Check if mouse is over the card
        if (e.clientX >= rect.left && e.clientX <= rect.right &&
            e.clientY >= rect.top && e.clientY <= rect.bottom) {
            
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            glow.style.background = `radial-gradient(circle at ${x}% ${y}%, var(--accent-glow), transparent)`;
        }
    });
});

// ========================================
// Active Navigation Link
// ========================================
function setActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveNav);

// Add active class style
const navStyle = document.createElement('style');
navStyle.textContent = `
    .nav-link.active {
        color: var(--primary) !important;
    }
    
    .nav-link.active::before {
        width: 100% !important;
    }
`;
document.head.appendChild(navStyle);

// ========================================
// Easter Egg: Konami Code
// ========================================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode.splice(-konamiPattern.length - 1, konamiCode.length - konamiPattern.length);
    
    if (konamiCode.join('').includes(konamiPattern.join(''))) {
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 3000);
    }
});

// Add rainbow animation
const easterEggStyle = document.createElement('style');
easterEggStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(easterEggStyle);

// ========================================
// Performance: Reduce animations on low-end devices
// ========================================
if (navigator.hardwareConcurrency <= 4) {
    document.documentElement.style.setProperty('--animation-duration', '0.3s');
}

// ========================================
// Console Message
// ========================================
console.log('%c¡Hola Developer! 👋', 'font-size: 20px; font-weight: bold; color: #2563eb;');
console.log('%cGracias por revisar mi portafolio. Si quieres contactarme, mi email es: fabrizio.funes.genovesio@gmail.com', 'font-size: 14px; color: #64748b;');
console.log('%cDesarrollado con amor por Fabrizio Funes, jajaja un saludo :)', 'font-size: 12px; color: #94a3b8; font-style: italic;');
