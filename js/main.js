// Initialize Lucide Icons
lucide.createIcons();

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Navbar effect on scroll
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const logoText = document.getElementById('logo-text');
const ctaBtn = document.getElementById('nav-cta');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('bg-white/95', 'backdrop-blur-md', 'shadow-sm');
        navbar.classList.remove('bg-transparent', 'py-6');
        navbar.classList.add('py-4');
        
        // Text colors
        navLinks.forEach(link => {
            link.classList.remove('text-white', 'hover:text-emerald-300');
            link.classList.add('text-slate-600', 'hover:text-emerald-600');
        });
        
        logoText.classList.remove('text-white');
        logoText.classList.add('text-slate-900');
        
    } else {
        navbar.classList.remove('bg-white/95', 'backdrop-blur-md', 'shadow-sm', 'py-4');
        navbar.classList.add('bg-transparent', 'py-6');
        
        // Text colors
        navLinks.forEach(link => {
            link.classList.remove('text-slate-600', 'hover:text-emerald-600');
            link.classList.add('text-white', 'hover:text-emerald-300');
        });
        
        logoText.classList.remove('text-slate-900');
        logoText.classList.add('text-white');
    }
});

// Mobile Menu Logic
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
let isMobileMenuOpen = false;

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
        isMobileMenuOpen = !isMobileMenuOpen;
        
        if (isMobileMenuOpen) {
            mobileMenu.classList.remove("max-h-0", "border-transparent", "opacity-0", "-z-10");
            mobileMenu.classList.add("max-h-96", "border-white/10", "opacity-100", "z-40");
            mobileMenuBtn.innerHTML = '<i data-lucide="x" class="w-7 h-7"></i>';
            mobileMenuBtn.classList.add("text-emerald-500");
        } else {
            mobileMenu.classList.add("max-h-0", "border-transparent", "opacity-0", "-z-10");
            mobileMenu.classList.remove("max-h-96", "border-white/10", "opacity-100", "z-40");
            mobileMenuBtn.innerHTML = '<i data-lucide="menu" class="w-7 h-7"></i>';
            mobileMenuBtn.classList.remove("text-emerald-500");
        }
        lucide.createIcons();
    });

    // Close menu when a link is clicked
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
    mobileNavLinks.forEach(link => {
        link.addEventListener("click", () => {
            isMobileMenuOpen = false;
            mobileMenu.classList.add("max-h-0", "border-transparent", "opacity-0", "-z-10");
            mobileMenu.classList.remove("max-h-96", "border-white/10", "opacity-100", "z-40");
            mobileMenuBtn.innerHTML = '<i data-lucide="menu" class="w-7 h-7"></i>';
            mobileMenuBtn.classList.remove("text-emerald-500");
            lucide.createIcons();
        });
    });
}

// GSAP Animations
const animateFadeUp = (selector) => {
    gsap.from(selector, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
            trigger: selector,
            start: "top 85%",
            once: true
        }
    });
};

// Hero animations
gsap.from(".hero-content > *", {
    y: 30,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    stagger: 0.2,
    delay: 0.2
});

// Apply fade up to sections
animateFadeUp(".about-card");
animateFadeUp(".vision-mission-card");
animateFadeUp(".org-card");
animateFadeUp(".service-card");
animateFadeUp(".project-card");
animateFadeUp(".keuangan-card");
animateFadeUp(".legality-item");
animateFadeUp(".stat-card");

// Mobile menu toggle (simple version)
// You can expand this if needed for a full mobile menu experience

// Lightbox Functionality
(function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    if (!lightbox || !lightboxImg) return;

    // Open lightbox using Event Delegation (works for all current and future gallery-img)
    document.body.addEventListener('click', (e) => {
        const target = e.target.closest('.gallery-img');
        
        // Check if clicked element or its parent has gallery-img class
        if (target) {
            // Prevent default behavior just in case
            e.preventDefault();
            
            lightboxImg.src = target.src;
            lightbox.classList.remove('opacity-0', 'pointer-events-none');
            
            // Smooth scale animation
            setTimeout(() => {
                lightboxImg.classList.remove('scale-95');
                lightboxImg.classList.add('scale-100');
            }, 10);
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        }
    });

    // Close lightbox function
    const closeLightbox = () => {
        lightbox.classList.add('opacity-0', 'pointer-events-none');
        lightboxImg.classList.remove('scale-100');
        lightboxImg.classList.add('scale-95');
        
        // Restore body scroll
        document.body.style.overflow = '';
    };

    // Close on button click
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !lightbox.classList.contains('pointer-events-none')) {
            closeLightbox();
        }
    });
})();
