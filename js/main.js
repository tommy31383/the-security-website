// ===== MOBILE NAV TOGGLE =====
const mobileToggle = document.getElementById('mobileToggle');
const nav = document.getElementById('nav');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });
}

// Close nav when clicking a link (mobile)
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
        if (nav.classList.contains('active')) {
            mobileToggle.classList.remove('active');
            nav.classList.remove('active');
        }
    });
});

// ===== HEADER SCROLL EFFECT =====
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
    }
    lastScroll = currentScroll;
});

// ===== HERO SLIDER =====
const slides = document.querySelectorAll('.hero-slide');
const dotsContainer = document.querySelector('.hero-dots');
const prevBtn = document.querySelector('.hero-prev');
const nextBtn = document.querySelector('.hero-next');
let currentSlide = 0;
let slideInterval;

if (slides.length > 0) {
    // Create dots
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.classList.add('hero-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.hero-dot');

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide((currentSlide + 1) % slides.length);
    }

    function prevSlide() {
        goToSlide((currentSlide - 1 + slides.length) % slides.length);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    slideInterval = setInterval(nextSlide, 5000);
}

// ===== COUNTER ANIMATION =====
const statNumbers = document.querySelectorAll('.stat-number');

function animateCounters() {
    statNumbers.forEach(num => {
        const target = parseInt(num.dataset.count);
        const duration = 2000;
        const start = 0;
        const startTime = Date.now();

        function update() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            num.textContent = Math.floor(start + (target - start) * eased);
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                num.textContent = target;
            }
        }

        update();
    });
}

// Use Intersection Observer for counters
if (statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-bar');
    if (statsSection) statsObserver.observe(statsSection);
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const elements = document.querySelectorAll(
        '.service-card, .why-card, .testimonial-card, .news-card, .about-content, .about-images, .contact-info, .contact-form-wrapper, .album-item, .stat-item, .pricing-card, .job-card'
    );

    elements.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(el => observer.observe(el));
}

initScrollAnimations();

// ===== ALBUM FILTER =====
const filterBtns = document.querySelectorAll('.album-filter-btn');
const albumItems = document.querySelectorAll('.album-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        albumItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===== LIGHTBOX =====
const lightbox = document.createElement('div');
lightbox.classList.add('lightbox');

const lightboxClose = document.createElement('button');
lightboxClose.classList.add('lightbox-close');
lightboxClose.textContent = '\u00D7';

const lightboxImg = document.createElement('img');
lightboxImg.src = '';
lightboxImg.alt = 'Preview';

lightbox.appendChild(lightboxClose);
lightbox.appendChild(lightboxImg);
document.body.appendChild(lightbox);

albumItems.forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').src;
        lightboxImg.src = imgSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === lightboxClose) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');

if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Cảm ơn bạn đã gửi yêu cầu! Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.');
        contactForm.reset();
    });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = this.getAttribute('href');
        if (target === '#') return;
        e.preventDefault();
        const element = document.querySelector(target);
        if (element) {
            const offset = header ? header.offsetHeight : 0;
            const top = element.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ===== ACTIVE NAV ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector('.nav a[href*="' + id + '"]');
        if (link) {
            if (scrollY >= top && scrollY < top + height) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });
});
