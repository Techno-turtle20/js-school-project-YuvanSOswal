import { scrollTopBtn } from '../utils/dom.js';
export function handleScroll() {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    }
    else {
        scrollTopBtn.classList.remove('visible');
    }
}
export function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
//# sourceMappingURL=scrollHandler.js.map