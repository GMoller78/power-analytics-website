// Function to set the current year in the footer
function setCurrentYear() {
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// Hamburger Menu Toggle Functionality
function setupHamburgerMenu() {
    const hamburgerButton = document.getElementById('hamburger-button');
    const mainNav = document.getElementById('main-nav');

    if (hamburgerButton && mainNav) {
        hamburgerButton.addEventListener('click', () => {
            mainNav.classList.toggle('is-active');
            hamburgerButton.classList.toggle('is-active');

            const isExpanded = hamburgerButton.getAttribute('aria-expanded') === 'true' || false;
            hamburgerButton.setAttribute('aria-expanded', !isExpanded);
        });

        // Optional: Close menu when a link is clicked
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                // Only close if it's a link to a different page or an anchor on the same page
                // This prevents closing if the link is purely for JS action without navigation
                if (link.getAttribute('href').startsWith('#') || link.getAttribute('href').includes('.html')) {
                    if (mainNav.classList.contains('is-active')) {
                        mainNav.classList.remove('is-active');
                        hamburgerButton.classList.remove('is-active');
                        hamburgerButton.setAttribute('aria-expanded', 'false');
                    }
                }
            });
        });
    }
}

// Contact Form Functionality (example, keep your actual form logic)
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) { // Ensure elements exist before adding listener
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent default form submission

            formStatus.textContent = 'Sending...';
            formStatus.style.color = 'blue';
            formStatus.className = 'form-status'; // Reset classes

            // **IMPORTANT:** Replace this timeout with actual AJAX call to your backend
            setTimeout(() => {
                const isSuccess = true; // Simulate success/failure
                if (isSuccess) {
                    formStatus.textContent = 'Message sent successfully! We will get back to you soon.';
                    formStatus.style.color = 'green';
                    formStatus.classList.add('success');
                    contactForm.reset();
                } else {
                    formStatus.textContent = 'An error occurred. Please try again.';
                    formStatus.style.color = 'red';
                    formStatus.classList.add('error');
                }
            }, 2000);
        });
    }
}

// Pre-fill subject in Contact Form based on URL query parameter
function prefillContactFormSubject() {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    const solutionParam = urlParams.get('solution');
    const subjectSelect = document.getElementById('subject');

    if (subjectSelect) {
        let selectedOption = null;
        if (serviceParam) {
            // Try exact match first for service
            selectedOption = subjectSelect.querySelector(`option[value="${serviceParam}"]`);
            if (!selectedOption) {
                // Try to match based on keywords if no exact match (e.g. "process-mapping" to "Process Mapping")
                const serviceKeywords = serviceParam.toLowerCase().split('-');
                for (let option of subjectSelect.options) {
                    const optionTextLower = option.text.toLowerCase();
                    if (serviceKeywords.some(keyword => optionTextLower.includes(keyword))) {
                        selectedOption = option;
                        break;
                    }
                }
            }
            if (!selectedOption) selectedOption = subjectSelect.querySelector(`option[value*="Service Request"]`);


        } else if (solutionParam) {
            // Try exact match first for solution
            selectedOption = subjectSelect.querySelector(`option[value="${solutionParam}"]`);
            if (!selectedOption) {
                const solutionKeywords = solutionParam.toLowerCase().split('-');
                for (let option of subjectSelect.options) {
                    const optionTextLower = option.text.toLowerCase();
                    if (solutionKeywords.some(keyword => optionTextLower.includes(keyword))) {
                        selectedOption = option;
                        break;
                    }
                }
            }
            if (!selectedOption) selectedOption = subjectSelect.querySelector(`option[value*="Solution Inquiry"]`);
        }

        if (selectedOption) {
            selectedOption.selected = true;
        } else if (serviceParam || solutionParam) { // If a param was present but no match, default to general
            const generalInquiry = subjectSelect.querySelector('option[value="General Inquiry"]');
            if (generalInquiry) generalInquiry.selected = true;
        }
    }
}


// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {
    setCurrentYear();
    setupHamburgerMenu();

    // Only run contact form specific scripts if we are on the contact page (or a page with the form)
    if (document.getElementById('contactForm')) {
        setupContactForm();
        prefillContactFormSubject();
    }
});