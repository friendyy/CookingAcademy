// Enhanced tab functionality for the cooking academy website
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');

    // Function to switch tabs with enhanced UX
    function switchTab(targetTab) {
        // Add loading state
        const activePanel = document.getElementById(targetTab + '-panel');
        if (activePanel) {
            activePanel.classList.add('loading');
        }

        // Remove active class from all buttons and panels
        tabButtons.forEach(button => {
            button.classList.remove('active');
            button.setAttribute('aria-selected', 'false');
        });
        
        tabPanels.forEach(panel => {
            panel.classList.remove('active');
        });

        // Add active class to clicked button
        const activeButton = document.querySelector(`[data-tab="${targetTab}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
            activeButton.setAttribute('aria-selected', 'true');
            // Add focus for accessibility
            activeButton.focus();
        }

        // Show corresponding panel with delay for smooth transition
        setTimeout(() => {
            if (activePanel) {
                activePanel.classList.add('active');
                activePanel.classList.remove('loading');
            }
        }, 150);
    }

    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });

    // Optional: Add keyboard navigation support
    tabButtons.forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const targetTab = this.getAttribute('data-tab');
                switchTab(targetTab);
            }
        });
    });

    // Optional: Add arrow key navigation between tabs
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const activeButton = document.querySelector('.tab-button.active');
            if (activeButton) {
                const currentIndex = Array.from(tabButtons).indexOf(activeButton);
                let newIndex;
                
                if (e.key === 'ArrowLeft') {
                    newIndex = currentIndex > 0 ? currentIndex - 1 : tabButtons.length - 1;
                } else {
                    newIndex = currentIndex < tabButtons.length - 1 ? currentIndex + 1 : 0;
                }
                
                const targetTab = tabButtons[newIndex].getAttribute('data-tab');
                switchTab(targetTab);
                tabButtons[newIndex].focus();
            }
        }
    });

    // Enhanced UX Features
    function initUXEnhancements() {
        // Add ripple effect to buttons
        document.querySelectorAll('.button').forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Add image loading states and lazy loading
        document.querySelectorAll('.course-card img').forEach(img => {
            img.setAttribute('data-loading', 'true');
            
            // Handle lazy loading
            if (img.getAttribute('loading') === 'lazy') {
                img.addEventListener('load', function() {
                    this.removeAttribute('data-loading');
                    this.classList.add('loaded');
                });
            } else {
                img.addEventListener('load', function() {
                    this.removeAttribute('data-loading');
                });
            }
            
            img.addEventListener('error', function() {
                this.removeAttribute('data-loading');
                this.style.background = '#f0f0f0';
                this.alt = 'Image not available';
                this.classList.add('loaded');
            });
        });

        // Add smooth scroll to contact form
        document.querySelectorAll('a[href="#contact"]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector('.contact-form').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });

        // Add course card hover effects
        document.querySelectorAll('.course-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Add form validation feedback
        const contactForm = document.querySelector('.contact-form form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                // Add loading state to form
                const submitBtn = this.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.classList.add('loading');
                    submitBtn.textContent = 'Opening WhatsApp...';
                }
            });
        }

        // Add intersection observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe course cards and features for scroll animations
        document.querySelectorAll('.course-card, .feature').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Initialize UX enhancements
    initUXEnhancements();

    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .button {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
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
});
