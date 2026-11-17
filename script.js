document.addEventListener("DOMContentLoaded", () => {
    const galleryItems = document.querySelectorAll(".gallery-item");

    // Example of batching reads/writes to prevent Layout Thrashing
    // BAD: Reading offsetHeight and modifying styles inside a tight loop causes synchronous layout recalculations.
    // GOOD: Separate measurement phase from update phase if calculations are needed.

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    // Optional Intersection Observer to add a fade-in class when items enter viewport
    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Batch class addition
                entry.target.classList.add("fade-in");
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    galleryItems.forEach(item => {
        observer.observe(item);
    });
});