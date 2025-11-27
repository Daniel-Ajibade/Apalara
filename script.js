/* =============================
   SCRIPT.JS FOR CLEM’S NATION
   Interactive functionality for:
   - FAQ accordion
   - Smooth scroll
   - Testimonials carousel
   - Modals (Coming Soon)
============================= */

document.addEventListener('DOMContentLoaded', () => {

    /* =============================
       FAQ ACCORDION
    ============================= */
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;

            // Toggle max-height for smooth open/close
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
            }

            // Optionally close other FAQ answers
            faqQuestions.forEach(other => {
                if (other !== question) {
                    other.nextElementSibling.style.maxHeight = null;
                }
            });
        });
    });

    /* =============================
       SMOOTH SCROLL FOR HERO BUTTONS
    ============================= */
    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetID = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetID);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 60, // Adjust for fixed navbar
                    behavior: 'smooth'
                });
            }
        });
    });

    /* =============================
       TESTIMONIALS CAROUSEL
    ============================= */
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;

    function showTestimonial(index) {
        testimonials.forEach((t, i) => {
            t.style.display = i === index ? 'block' : 'none';
        });
    }

    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }

    // Initialize carousel
    if (testimonials.length > 0) {
        showTestimonial(currentIndex);
        setInterval(nextTestimonial, 5000); // change every 5 seconds
    }

    /* =============================
       MODAL PLACEHOLDER (COMING SOON)
    ============================= */
    // Example for "Join Club" modal
    // const joinButtons = document.querySelectorAll('.btn-secondary');

    // joinButtons.forEach(btn => {
    //     btn.addEventListener('click', () => {
    //         alert("Feature Coming Soon: Video conferencing / Cultural Club enrollment!");
    //     });
    // });

});
// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});
const testimonialSlide = document.getElementById('testimonial-slide');
const testimonials = document.querySelectorAll('.testimonial-item');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentIndex = 0;

function getVisibleCount() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 992) return 2;
    return 3;
}

function updateSlide() {
    const visibleCount = getVisibleCount();
    const itemWidth = testimonials[0].clientWidth;
    testimonialSlide.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}

// Next button
nextBtn.addEventListener('click', () => {
    const visibleCount = getVisibleCount();
    const maxIndex = testimonials.length - visibleCount;
    if (currentIndex >= maxIndex) {
        currentIndex = 0;
    } else {
        currentIndex++;
    }
    updateSlide();
});

// Prev button
prevBtn.addEventListener('click', () => {
    const visibleCount = getVisibleCount();
    const maxIndex = testimonials.length - visibleCount;
    if (currentIndex <= 0) {
        currentIndex = maxIndex;
    } else {
        currentIndex--;
    }
    updateSlide();
});

// Adjust on window resize
window.addEventListener('resize', () => {
    // Reset currentIndex if it exceeds new max
    const visibleCount = getVisibleCount();
    if (currentIndex > testimonials.length - visibleCount) {
        currentIndex = testimonials.length - visibleCount;
    }
    updateSlide();
});

// Initial setup
updateSlide();
