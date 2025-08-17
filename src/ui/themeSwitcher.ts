import { body, themeToggle } from '../utils/dom.js'; 
export function toggleTheme(): void {
  if (body.classList.contains('dark-theme')) {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    localStorage.setItem('theme', 'light');
  } else {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
  }
}

export function checkSavedTheme(): void {
  const savedTheme: string = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    themeToggle.checked = true; 
  } else {
    themeToggle.checked = false;
  }
}
