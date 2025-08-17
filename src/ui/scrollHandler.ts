import { scrollTopBtn } from '../utils/dom.js'; 
export function handleScroll(): void {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add('visible'); 
  } else {
    scrollTopBtn.classList.remove('visible'); 
  }
}

export function scrollToTop(): void {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' 
  });
}
