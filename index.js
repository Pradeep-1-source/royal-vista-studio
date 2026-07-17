// --- PORTFOLIO LINKS CONFIGURATION ---
const portfolioLinks = {
    "3D model": "https://drive.google.com/drive/folders/1fiuXJ1YneGvGxQz7MM7bygVdC7H878Zy?usp=sharing",
    "After Effect": "https://drive.google.com/drive/folders/1Ehl6eEOA9OROA1NZRGZJuRSgnAUfba7E?usp=sharing",
    "Home Theater": "https://drive.google.com/drive/folders/16TyagEeLP5Y_ZvdevEb5x2SmnnOW_m3m?usp=sharing",
    "Fashion": "https://drive.google.com/drive/folders/1n3INcdnbKMZ5stpsTXK4K4jGmAQ4hMMx?usp=sharing",
    "Interior": "https://drive.google.com/drive/folders/1LSMHGEW4DQhUTXGV7-6FrAarTotSvAk9?usp=sharing",
    "PC Build": "https://drive.google.com/drive/folders/1Tt9hr5fl3U299MHlI96q6aeDaE6Ftq4I?usp=sharing",
    "Photoshop": "https://drive.google.com/drive/folders/1-ZbZufwGfR3aTlPdXcJjMP0NVI5YPlf-?usp=sharing",
    "Videos": "https://drive.google.com/drive/folders/1dNlvBLrUGCNr-K9LFPtjpC5BBhEpHfe_?usp=sharing",
    "Complete Portfolio": "https://drive.google.com/drive/folders/1yx3L4kqeWUlUrUYKippY1txpPYNCgrwK?usp=sharing"
};

document.addEventListener('DOMContentLoaded', () => {
    // --- PRELOADER REMOVAL ---
    const preloader = document.getElementById('preloader');
    
    // Simulate loader transition completion
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        
        // Trigger initial GSAP animation for hero content after loader closes
        initHeroAnimations();
    }, 2000);

    // --- NAVIGATION LOGIC ---
    const header = document.getElementById('main-header');
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // Sticky Header Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Scroll Progress Bar
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById('scroll-progress').style.width = scrolled + '%';

        // Highlight Active Link on Scroll
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // Mobile Hamburger Menu
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
        });
    }

    // Close Menu on Link Click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });

    // --- CUSTOM CURSOR INTERACTIVE EFFECT ---
    const cursorDot = document.getElementById('cursor-dot');
    const cursorFollower = document.getElementById('cursor-follower');
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Instant position for the core dot
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    // Smooth physics follower loop
    function updateFollowerPosition() {
        // Linear interpolation delay (0.15 makes it float smoothly)
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(updateFollowerPosition);
    }
    updateFollowerPosition();

    // Hover Scaling for Cursor
    const hoverTargets = document.querySelectorAll('.hover-target, a, button, .portfolio-card');
    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => {
            cursorDot.classList.add('hovered');
            cursorFollower.classList.add('hovered');
        });
        target.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('hovered');
            cursorFollower.classList.remove('hovered');
        });
    });

    // --- HERO MOUSE GLOW & PARTICLES ---
    const heroSection = document.getElementById('home');
    const heroGlow = document.getElementById('hero-glow');

    if (heroSection && heroGlow) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            heroGlow.style.left = x + 'px';
            heroGlow.style.top = y + 'px';
            heroGlow.style.opacity = '1';
        });

        heroSection.addEventListener('mouseleave', () => {
            heroGlow.style.opacity = '0';
        });
    }

    // Spawn Hero Particle System
    const particlesContainer = document.getElementById('particles-container');
    if (particlesContainer) {
        const particleCount = 35;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.background = 'rgba(212, 175, 55, ' + (Math.random() * 0.15 + 0.05) + ')';
            particle.style.borderRadius = '50%';
            
            // Random styling
            const size = Math.random() * 5 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Position
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.top = Math.random() * 100 + 'vh';
            
            particlesContainer.appendChild(particle);

            // Animate floating path using GSAP
            gsap.to(particle, {
                y: '-=150',
                x: '+=' + (Math.random() * 80 - 40),
                opacity: 0,
                duration: Math.random() * 6 + 4,
                repeat: -1,
                ease: 'power1.out',
                delay: Math.random() * 5
            });
        }
    }

    // --- PORTFOLIO DYNAMIC REDIRECT BINDING ---
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectType = card.getAttribute('data-project');
            const targetUrl = portfolioLinks[projectType];
            if (targetUrl) {
                window.open(targetUrl, '_blank');
            } else {
                console.error(`URL not found for portfolio category: ${projectType}`);
            }
        });
    });

    // View Complete Portfolio CTA Button
    const completePortfolioBtn = document.getElementById('complete-portfolio-btn');
    if (completePortfolioBtn) {
        completePortfolioBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.open(portfolioLinks["Complete Portfolio"], '_blank');
        });
    }

    // --- INTERACTIVE MAGNETIC BUTTONS ---
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Pull the button slightly towards mouse cursor
            btn.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // --- GSAP SCROLLTRIGGER REVEALS & ANIMS ---
    gsap.registerPlugin(ScrollTrigger);

    // Initial Hero Animation (Triggered after Preloader hides)
    function initHeroAnimations() {
        gsap.from('#home .hero-agency-sub', {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });

        gsap.from('#home .hero-studio-title', {
            scale: 0.94,
            opacity: 0,
            duration: 1.4,
            delay: 0.2,
            ease: 'power4.out'
        });

        gsap.from('#home .hero-tagline', {
            y: 20,
            opacity: 0,
            duration: 1,
            delay: 0.4,
            ease: 'power3.out'
        });

        gsap.from('#home .hero-service-item', {
            opacity: 0,
            y: 15,
            stagger: 0.1,
            duration: 0.8,
            delay: 0.6,
            ease: 'power2.out'
        });

        gsap.from('#home .hero-btn-container', {
            y: 25,
            opacity: 0,
            duration: 1,
            delay: 0.9,
            ease: 'power3.out'
        });
    }

    // General scroll reveals
    const revealsFadeUp = document.querySelectorAll('.reveal-fade-up');
    revealsFadeUp.forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 45,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out'
        });
    });

    const revealsSlideLeft = document.querySelectorAll('.reveal-slide-left');
    revealsSlideLeft.forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            x: -60,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out'
        });
    });

    const revealsSlideRight = document.querySelectorAll('.reveal-slide-right');
    revealsSlideRight.forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            x: 60,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out'
        });
    });

    const revealsScale = document.querySelectorAll('.reveal-scale');
    revealsScale.forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            scale: 0.93,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out'
        });
    });

    // Skill Bar filling ScrollTrigger
    const skillFills = document.querySelectorAll('.skill-fill');
    skillFills.forEach(fill => {
        const targetPercent = fill.getAttribute('data-percent');
        gsap.to(fill, {
            scrollTrigger: {
                trigger: fill,
                start: 'top 90%'
            },
            width: targetPercent,
            duration: 1.8,
            ease: 'power4.out'
        });
    });

    // Statistics Counter ScrollTrigger
    const statsCounter = document.querySelectorAll('.stat-number.count');
    statsCounter.forEach(counter => {
        const targetVal = parseInt(counter.getAttribute('data-target'), 10);
        gsap.to(counter, {
            scrollTrigger: {
                trigger: counter,
                start: 'top 85%'
            },
            innerText: targetVal,
            duration: 2.2,
            snap: { innerText: 1 },
            ease: 'power2.out'
        });
    });
});
