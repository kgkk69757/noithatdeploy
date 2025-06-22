const observerOptions = {
    root: null,
    rootMargin: "50px",
    threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Lazy load ảnh
            const lazyImages = entry.target.querySelectorAll("img[data-src]");
            lazyImages.forEach((img) => {
                img.src = img.dataset.src;
                img.removeAttribute("data-src");
                img.classList.add("loaded");
            });

            entry.target.classList.add("loaded");
            observer.unobserve(entry.target); // Ngừng quan sát sau khi đã load
        }
    });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
    // Quan sát từng section cần lazy load
    const sections = document.querySelectorAll("#lazy-content > section");
    sections.forEach((section) => observer.observe(section));
});
