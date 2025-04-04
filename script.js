// Runs when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    console.log("Ushaspot website loaded!");

    // Mobile menu toggle for small screens
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector("nav ul");

    if (menuToggle) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("active"); // Toggle menu visibility
        });
    }
});

// Header behavior on scroll
window.addEventListener("scroll", function () {
    let header = document.querySelector("header");
    let topBar = document.querySelector(".top-bar");
    let logoContainer = document.querySelector(".logo-container");
    let nav = document.querySelector("nav");

    if (window.scrollY > 50) {
        header.classList.add("scrolled"); // Add styling for scrolled state
        topBar.style.display = "none"; // Hide top red bar when scrolling
        logoContainer.classList.add("scrolled-logo"); // Adjust logo size
        nav.classList.add("scrolled-nav"); // Modify navigation bar styling
    } else {
        header.classList.remove("scrolled"); // Restore original styling
        topBar.style.display = "block"; // Show top red bar
        logoContainer.classList.remove("scrolled-logo"); // Reset logo styling
        nav.classList.remove("scrolled-nav"); // Reset nav styling
    }
});

// Slider functionality with auto-scroll and manual navigation
document.addEventListener("DOMContentLoaded", function () {
    const sliderSection = document.querySelector(".slider-container"); // The slider section
    const slider = document.querySelector(".slider");
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const dotsContainer = document.querySelector(".dots-container");

    let index = 0; // Track current slide
    const totalSlides = slides.length;
    let autoScrollInterval;
    let isSliderActive = false; // Ensure auto-scroll starts only once

    // Create dots for navigation based on the number of slides
    slides.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active"); // First dot is active initially
        dot.addEventListener("click", () => moveToSlide(i)); // Click event to navigate slides
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".dot");

    // Function to navigate to a specific slide
    function moveToSlide(slideIndex) {
        index = slideIndex;
        slider.style.transform = `translateX(-${index * 100}%)`; // Move slider
        updateDots(); // Update active dot
    }

    // Function to highlight the active dot
    function updateDots() {
        dots.forEach(dot => dot.classList.remove("active"));
        dots[index].classList.add("active");
    }

    // Function to auto-scroll slides every 3 seconds
    function autoScroll() {
        index = (index + 1) % totalSlides; // Loop back after last slide
        moveToSlide(index);
    }

    // Start auto-scroll only when slider is visible
    function startSlider() {
        if (!isSliderActive) {
            isSliderActive = true;
            autoScrollInterval = setInterval(autoScroll, 3000);
        }
    }

    // Stop auto-scroll when the slider goes out of view
    function stopSlider() {
        clearInterval(autoScrollInterval);
        isSliderActive = false;
    }

    // Manual navigation - Next button
    nextBtn.addEventListener("click", () => {
        index = (index + 1) % totalSlides; // Move to the next slide
        moveToSlide(index);
        resetAutoScroll(); // Restart auto-scroll after user interaction
    });

    // Manual navigation - Previous button
    prevBtn.addEventListener("click", () => {
        index = (index - 1 + totalSlides) % totalSlides; // Move to the previous slide
        moveToSlide(index);
        resetAutoScroll();
    });

    // Restart auto-scroll after user interaction
    function resetAutoScroll() {
        stopSlider();
        startSlider();
    }

    // Observe when the slider enters or leaves the viewport
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    startSlider(); // Start auto-scroll if visible
                } else {
                    stopSlider(); // Stop auto-scroll if out of view
                }
            });
        },
        { threshold: 0.5 } // Start when at least 50% of the slider is visible
    );

    observer.observe(sliderSection); // Attach observer to slider
});

// Contact form submission using Formspree API
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const successMessage = document.getElementById("success-message");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form data
        const formData = new FormData(form);

        // Send data to Formspree API
        fetch("https://formspree.io/f/mvgkbqpw", {
            method: "POST",
            body: formData,
            headers: { "Accept": "application/json" }
        })
        .then(response => {
            if (response.ok) {
                successMessage.classList.remove("hidden"); // Show success message
                form.reset(); // Clear form fields
            } else {
                alert("Oops! Something went wrong. Please try again.");
            }
        })
        .catch(error => {
            alert("Error submitting form. Please check your internet connection.");
        });
    });
});

// Footer inquiry form submission
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("footer-inquiry-form");
    const message = document.getElementById("footer-message");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent default form submission
        message.classList.remove("hidden"); // Show confirmation message
        form.reset(); // Clear form fields
        setTimeout(() => message.classList.add("hidden"), 3000); // Hide message after 3 seconds
    });
});

// Sewing Machine page dropdown functionality
document.addEventListener("DOMContentLoaded", function () {
    // Function to handle dropdown hover and selection
    function setupDropdown(dropdownId, defaultText) {
        const dropdown = document.getElementById(dropdownId);
        const selected = dropdown.querySelector(".dropdown-selected");
        const optionsList = dropdown.querySelector(".dropdown-options");
        const options = dropdown.querySelectorAll(".dropdown-option");

        // Open dropdown on hover
        dropdown.addEventListener("mouseenter", function () {
            optionsList.style.display = "block";
            selected.style.color = "#FF2F2F"; // Change arrow color to user's red
        });

        // Close dropdown when mouse leaves
        dropdown.addEventListener("mouseleave", function () {
            optionsList.style.display = "none";
            selected.style.color = "black"; // Reset arrow color
        });

        // Handle option hover and selection
        options.forEach(option => {
            option.addEventListener("mouseenter", function () {
                if (!option.classList.contains("selected")) {
                    option.style.color = "#FF2F2F"; // Change text color to user's red on hover
                }
            });

            option.addEventListener("mouseleave", function () {
                if (!option.classList.contains("selected")) {
                    option.style.color = "black"; // Reset text color when not selected
                }
            });

            option.addEventListener("click", function () {
                // Remove 'selected' class from all options
                options.forEach(opt => {
                    opt.classList.remove("selected");
                    opt.style.color = "black"; // Reset all options to black
                });

                // Add 'selected' class to the clicked option
                option.classList.add("selected");
                option.style.color = "#FF2F2F"; // Keep the selected option user's red

                // Update dropdown selected text
                selected.textContent = option.textContent;
                dropdown.setAttribute("data-selected", option.getAttribute("data-value"));
            });
        });

        // Add reset functionality (Select Type / Select Brand)
        const resetOption = document.createElement("li");
        resetOption.classList.add("dropdown-option");
        resetOption.textContent = defaultText;
        resetOption.style.fontWeight = "bold"; // Make it bold for distinction
        resetOption.setAttribute("data-value", "");

        resetOption.addEventListener("click", function () {
            selected.textContent = defaultText;
            dropdown.setAttribute("data-selected", "");

            // Remove 'selected' class from all options
            options.forEach(opt => {
                opt.classList.remove("selected");
                opt.style.color = "black"; // Reset all options to black
            });
        });

        optionsList.insertBefore(resetOption, optionsList.firstChild);
    }

    // Initialize dropdowns with reset option
    setupDropdown("product-type-dropdown", "Select Type");
    setupDropdown("brand-dropdown", "Select Brand");

    // Filtering functionality
    document.getElementById("search-btn").addEventListener("click", function () {
        const selectedType = document.getElementById("product-type-dropdown").getAttribute("data-selected") || "";
        const selectedBrand = document.getElementById("brand-dropdown").getAttribute("data-selected") || "";
        const productCards = document.querySelectorAll(".product-card");
        let hasResults = false;

        productCards.forEach(card => {
            const productType = card.getAttribute("data-type");
            const productBrand = card.getAttribute("data-brand");

            if ((selectedType === "" || productType === selectedType) &&
                (selectedBrand === "" || productBrand === selectedBrand)) {
                card.style.display = "block";
                hasResults = true;
            } else {
                card.style.display = "none";
            }
        });

        // Show "No products match your search" message
        const noResultsMessage = document.getElementById("no-results-message");
        noResultsMessage.style.display = hasResults ? "none" : "block";
    });
});

// Multiple color options functionality
document.querySelectorAll('.variant-product').forEach(product => {
    const imgElement = product.querySelector('.product-image');
    const nameElement = product.querySelector('.product-name');
    const buttons = product.querySelectorAll('.color-options button');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const newName = button.getAttribute('data-name');
            const newImg = button.getAttribute('data-img');

            // Update image and product name
            imgElement.src = newImg;
            nameElement.textContent = newName;

            // Update active button styling
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
});

