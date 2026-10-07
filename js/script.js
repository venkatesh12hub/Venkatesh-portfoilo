// ===============================
// Venkatesh Portfolio JavaScript
// ===============================

const navbar = document.getElementById("navbar");
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const themeToggle = document.getElementById("theme-toggle");

// Theme toggle
const savedTheme = localStorage.getItem("portfolio-theme");

function setTheme(theme) {
    const isLight = theme === "light";
    document.body.classList.toggle("light-theme", isLight);
    themeToggle.setAttribute("aria-pressed", String(isLight));
    themeToggle.setAttribute("aria-label", `Switch to ${isLight ? "dark" : "light"} mode`);
    themeToggle.setAttribute("title", `Switch to ${isLight ? "dark" : "light"} mode`);
    themeToggle.querySelector("span").textContent = isLight ? "☾" : "☼";
    localStorage.setItem("portfolio-theme", theme);
}

setTheme(savedTheme === "light" ? "light" : "dark");

themeToggle.addEventListener("click", () => {
    setTheme(document.body.classList.contains("light-theme") ? "dark" : "light");
});

// Sticky navbar
window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 30);
});

// Mobile menu
menuBtn.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("hidden") === false;
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

// Close mobile menu after clicking a link
mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open menu");
    });
});

// Scroll reveal animation
const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

revealElements.forEach(element => observer.observe(element));

// Active navigation
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});
