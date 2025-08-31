// Portfolio Website JavaScript
// Handles all interactive functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initAnimations();
    initProgressBars();
    
    console.log('Portfolio website loaded successfully!');
});

// Navigation functionality
function initNavigation() {
    const nav = document.getElementById('navigation');
    
    // Handle scroll effects on navigation
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// Smooth scrolling to sections
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Close mobile menu if open
        closeMobileMenu();
    }
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
    });
    closeMobileMenu();
}

// Mobile menu functionality
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    
    if (mobileMenu.classList.contains('active')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    
    mobileMenu.classList.add('active');
    mobileMenu.style.display = 'block';
    
    // Change icon to X
    if (menuIcon) {
        menuIcon.setAttribute('data-lucide', 'x');
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    
    mobileMenu.classList.remove('active');
    mobileMenu.style.display = 'none';
    
    // Change icon back to menu
    if (menuIcon) {
        menuIcon.setAttribute('data-lucide', 'menu');
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileMenu && mobileMenu.classList.contains('active')) {
        if (!mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            closeMobileMenu();
        }
    }
});

// Scroll-triggered animations
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up');
    animatedElements.forEach(el => {
        // Set initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        observer.observe(el);
    });
}

// Initialize animations for cards and interactive elements
function initAnimations() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.hover-lift');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add glow effect to primary buttons
    const primaryButtons = document.querySelectorAll('.btn-primary');
    primaryButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.boxShadow = 'var(--shadow-hero)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
}

// Animate progress bars when they come into view
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressFill = entry.target;
                const width = progressFill.style.width;
                
                // Reset width and animate
                progressFill.style.width = '0%';
                setTimeout(() => {
                    progressFill.style.width = width;
                }, 200);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// Enhanced scroll indicator functionality
function initScrollIndicator() {
    const scrollBtn = document.querySelector('.scroll-btn');
    if (scrollBtn) {
        // Add bounce animation
        scrollBtn.style.animation = 'bounce 2s infinite';
        
        // Hide scroll indicator when user starts scrolling
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                scrollBtn.style.opacity = '0';
            } else {
                scrollBtn.style.opacity = '1';
            }
        });
    }
}

// Add typing effect to hero text (optional enhancement)
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroTitle.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 1000);
    }
}

// Handle form submissions and button clicks
document.addEventListener('click', function(event) {
    const target = event.target;
    
    // Handle resume download buttons
    if (target.textContent && target.textContent.includes('./resume/KRISHNA.P_RESUME.pdf')) {
        event.preventDefault();
        alert('Resume download functionality would be implemented here. Please add your actual resume file and update the link.');
    }
    
    // Handle email buttons
    if (target.textContent && target.textContent.includes('Email')) {
        const email = 'your.email@example.com';
        window.location.href = `mailto:${email}?subject=Portfolio Inquiry&body=Hi, I found your portfolio website and would like to connect.`;
    }
    
    // Handle project demo buttons
    if (target.textContent && (target.textContent.includes('Live Demo') || target.textContent.includes('View Code'))) {
        event.preventDefault();
        alert('Project links would be implemented here. Please add your actual project URLs.');
    }
    
    // Handle social media buttons
    if (target.closest('.social-btn')) {
        event.preventDefault();
        const icon = target.querySelector('i') || target;
        const iconName = icon.getAttribute('data-lucide');
        
        switch(iconName) {
            case 'github':
                window.open('https://github.com/yourusername', '_blank');
                break;
            case 'linkedin':
                window.open('https://linkedin.com/in/yourusername', '_blank');
                break;
            case 'mail':
                window.location.href = 'mailto:your.email@example.com';
                break;
        }
    }
});

// Add smooth reveal animation for sections
function initSectionReveal() {
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        
        sectionObserver.observe(section);
    });
}

// Add CSS for section reveal
const style = document.createElement('style');
style.textContent = `
    .section-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    /* Enhanced animations */
    @keyframes glow {
        0%, 100% { box-shadow: 0 0 20px hsl(233, 84%, 58%, 0.3); }
        50% { box-shadow: 0 0 30px hsl(233, 84%, 58%, 0.5); }
    }
    
    .btn-primary:hover {
        animation: glow 2s ease-in-out infinite;
    }
    
    /* Smooth transitions for all interactive elements */
    * {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* Loading animation for icons */
    i[data-lucide] {
        opacity: 0;
        animation: fadeIn 0.5s ease-out forwards;
    }
    
    @keyframes fadeIn {
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);

// Initialize advanced features
window.addEventListener('load', function() {
    initScrollIndicator();
    initSectionReveal();
    
    // Add loading complete class to body
    document.body.classList.add('loaded');
});

// Handle keyboard navigation
document.addEventListener('keydown', function(event) {
    // Close mobile menu with Escape key
    if (event.key === 'Escape') {
        closeMobileMenu();
    }
    
    // Navigate with arrow keys (optional enhancement)
    if (event.key === 'ArrowDown' && event.ctrlKey) {
        event.preventDefault();
        const sections = document.querySelectorAll('section');
        const currentSection = Array.from(sections).find(section => {
            const rect = section.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom > 100;
        });
        
        if (currentSection) {
            const nextSection = currentSection.nextElementSibling;
            if (nextSection && nextSection.tagName === 'SECTION') {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
});

// Performance optimization: Lazy load images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Add particle effect to hero section (optional enhancement)
function initParticleEffect() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    // Create particle container
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    heroSection.appendChild(particleContainer);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 2}s;
    `;
    
    container.appendChild(particle);
}

// Add float animation for particles
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.5;
        }
        50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 1;
        }
    }
`;
document.head.appendChild(particleStyle);

// Initialize particle effect on load
window.addEventListener('load', initParticleEffect);

// Error handling for missing elements
function safeElementOperation(selector, operation) {
    const element = document.querySelector(selector);
    if (element) {
        operation(element);
    }
}

// Export functions for global access (if needed)
window.portfolioFunctions = {
    scrollToSection,
    scrollToTop,
    toggleMobileMenu,
    closeMobileMenu
};