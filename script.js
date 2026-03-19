// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {

    // 1. Loading Page Logic
    const loader = document.getElementById('loader');
    const percentageText = document.querySelector('.loader-percentage');
    let percentage = 0;

    function updateLoader() {
        const interval = setInterval(() => {
            percentage += Math.floor(Math.random() * 15) + 1;
            if (percentage >= 100) {
                percentage = 100;
                clearInterval(interval);
                hideLoader();
            }
            percentageText.innerText = `${percentage}%`;
        }, 120);
    }

    function hideLoader() {
        setTimeout(() => {
            const tl = gsap.timeline();
            tl.to(loader, {
                opacity: 0,
                duration: 1,
                ease: "power2.inOut",
                onComplete: () => {
                    loader.style.display = 'none';
                    document.body.classList.remove('loading');
                    startHeroAnimations();
                }
            });
        }, 300);
    }

    updateLoader();

    // 2. Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            navLinks.classList.toggle('open');
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                navLinks.classList.remove('open');
            });
        });
    }

    // 3. Typed.js for Role Switcher
    if (document.querySelector('.role')) {
        new Typed('.role', {
            strings: ['Aspiring Software Developer', 'Computer Science Student', 'Problem Solver', 'Tech Enthusiast'],
            typeSpeed: 60,
            backSpeed: 40,
            loop: true
        });
    }

    // 4. GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Entrance
    function startHeroAnimations() {
        const heroTl = gsap.timeline();
        heroTl.from('.glitch-text', {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: 'power4.out'
        })
        .from('.role-switcher', {
            opacity: 0,
            duration: 0.8
        }, '-=0.5')
        .from('.hero-cta', {
            y: 50,
            opacity: 0,
            duration: 0.8
        }, '-=0.4');
    }

    // Section Animation Loop
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const title = section.querySelector('.section-title');
        const content = section.querySelector('.container > *:not(.section-title)');

        if (title) {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
        }

        if (content) {
            gsap.from(content, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 70%',
                },
                y: 70,
                opacity: 0,
                duration: 1.2,
                ease: 'power3.out'
            });
        }
    });

    // 4. Floating Background Circles Animation
    gsap.to('.circle-1', {
        x: '20%',
        y: '20%',
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    gsap.to('.circle-2', {
        x: '-20%',
        y: '-20%',
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    gsap.to('.circle-3', {
        scale: 1.5,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    // 5. Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    const body = document.body;

    // Check for saved theme - default is light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateToggleIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = (currentTheme === 'dark') ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateToggleIcon(newTheme);

        // GSAP transition effect
        gsap.fromTo('body', { opacity: 0.8 }, { opacity: 1, duration: 0.5 });
    });

    function updateToggleIcon(theme) {
        if (theme === 'light') {
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    }

    // 6. Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.padding = '1rem 5%';
            nav.style.background = 'var(--bg-dark)';
            nav.style.opacity = '0.95';
        } else {
            nav.style.padding = '1.5rem 5%';
            nav.style.background = 'var(--bg-dark)';
            nav.style.opacity = '0.8';
        }
    });

});
