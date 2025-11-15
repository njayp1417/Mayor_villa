// Mayor Villa - Professional JavaScript Functions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initScrollAnimations();
    initInteractiveElements();
    initNavigation();
    
    // Set current year in footer
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// Scroll-based animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with animate class
    document.querySelectorAll('.animate').forEach(element => {
        observer.observe(element);
    });
}

// Interactive elements
function initInteractiveElements() {
    // Member card interactions
    const memberCards = document.querySelectorAll('.card');
    memberCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Feature card clicks
    const featureCards = document.querySelectorAll('.feature');
    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            showFeatureModal(title);
        });
    });
}

// Navigation functionality
function initNavigation() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active navigation highlighting
    const navLinks = document.querySelectorAll('.main-nav a');
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Feature modal display
function showFeatureModal(title) {
    const features = {
        'Academic Excellence': 'Our residents maintain high academic standards while fostering a collaborative learning environment.',
        'Community Living': 'Experience the perfect balance of privacy and community in our thoughtfully designed spaces.',
        'Professional Development': 'Access to mentorship programs, workshops, and networking opportunities.',
        'Modern Amenities': 'State-of-the-art facilities including study areas, recreational spaces, and high-speed internet.'
    };
    
    const message = features[title] || 'Learn more about this feature by contacting our team.';
    
    // Create and show modal
    showNotification(title, message);
}

// Notification system
function showNotification(title, message) {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <h4>${title}</h4>
            <p>${message}</p>
            <button onclick="this.parentElement.parentElement.remove()" class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;

    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        padding: 1.5rem;
        position: relative;
    `;

    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        color: #666;
        padding: 5px;
    `;

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Interactive quiz/riddle system
function showDailyChallenge() {
    const challenges = [
        {
            question: "What academic discipline studies the functions and mechanisms of living organisms?",
            answer: "Physiology",
            hint: "Perfect for Adeola's field of study!"
        },
        {
            question: "What field focuses on the study of mass media and its impact on society?",
            answer: "Mass Communication",
            hint: "Right up Ife's alley!"
        },
        {
            question: "What makes a hostel more than just accommodation?",
            answer: "Community",
            hint: "The Mayor Villa difference!"
        }
    ];

    const challenge = challenges[Math.floor(Math.random() * challenges.length)];
    const userAnswer = prompt(`Daily Challenge:\n\n${challenge.question}\n\nHint: ${challenge.hint}`);
    
    if (userAnswer && userAnswer.toLowerCase().includes(challenge.answer.toLowerCase())) {
        showNotification('Correct!', `Excellent! ${challenge.answer} is the right answer. You're Mayor Villa material!`);
    } else {
        showNotification('Good Try!', `The answer was "${challenge.answer}". Keep learning and growing!`);
    }
}

// Member spotlight rotation
function initMemberSpotlight() {
    const spotlights = [
        {
            name: "Adeola",
            achievement: "Dean's List for Academic Excellence in Physiology",
            quote: "Understanding life at the cellular level helps me appreciate our community even more."
        },
        {
            name: "Ife",
            achievement: "Outstanding Media Project on Community Stories",
            quote: "Every housemate has a story worth telling and sharing with the world."
        }
    ];

    let currentSpotlight = 0;
    
    function showSpotlight() {
        const spotlight = spotlights[currentSpotlight];
        showNotification(`Member Spotlight: ${spotlight.name}`, 
            `${spotlight.achievement}\n\n"${spotlight.quote}"`);
        
        currentSpotlight = (currentSpotlight + 1) % spotlights.length;
    }

    // Show spotlight every 30 seconds if page is active
    setInterval(() => {
        if (!document.hidden) {
            showSpotlight();
        }
    }, 30000);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
function optimizeImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizeImages);

// Export functions for global access
window.MayorVilla = {
    showDailyChallenge,
    showNotification,
    initMemberSpotlight
};