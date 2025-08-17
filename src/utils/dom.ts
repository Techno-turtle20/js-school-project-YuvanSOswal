function isHTMLDivElement(element: HTMLElement | null): element is HTMLDivElement {
  return element instanceof HTMLDivElement;
}

function isHTMLHeadingElement(element: HTMLElement | null): element is HTMLHeadingElement {
  return element instanceof HTMLHeadingElement;
}

function isHTMLParagraphElement(element: HTMLElement | null): element is HTMLParagraphElement {
  return element instanceof HTMLParagraphElement;
}

function isHTMLImageElement(element: HTMLElement | null): element is HTMLImageElement {
  return element instanceof HTMLImageElement;
}


function isHTMLAnchorElement(element: HTMLElement | null): element is HTMLAnchorElement {
  return element instanceof HTMLAnchorElement;
}

function isHTMLSpanElement(element: HTMLElement | null): element is HTMLSpanElement {
  return element instanceof HTMLSpanElement;
}

function isHTMLUListElement(element: HTMLElement | null): element is HTMLUListElement {
  return element instanceof HTMLUListElement;
}

function isHTMLButtonElement(element: HTMLElement | null): element is HTMLButtonElement {
  return element instanceof HTMLButtonElement;
}

function isHTMLInputElement(element: HTMLElement | null): element is HTMLInputElement {
  return element instanceof HTMLInputElement;
}

function getElementByIdOrThrow<T extends HTMLElement>(id: string, typeGuard: (element: HTMLElement | null) => element is T): T {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Element with ID '${id}' not found.`);
  }
  if (!typeGuard(element)) {
    throw new Error(`Element with ID '${id}' is not of the expected type.`);
  }
  return element;
}

// Exported DOM element references for global use
export const subtopicContainer = getElementByIdOrThrow('subtopicContainer', isHTMLDivElement);
export const detailModal = getElementByIdOrThrow('detailModal', isHTMLDivElement);
export const modalTitle = getElementByIdOrThrow('modalTitle', isHTMLHeadingElement);
export const modalDate = getElementByIdOrThrow('modalDate', isHTMLParagraphElement);
export const modalSubtitle = getElementByIdOrThrow('modalSubtitle', isHTMLParagraphElement);
export const modalImage = getElementByIdOrThrow('modalImage', isHTMLImageElement);
export const modalDescription = getElementByIdOrThrow('modalDescription', isHTMLParagraphElement);
export const learnMoreLink = getElementByIdOrThrow('learnMoreLink', isHTMLAnchorElement);
export const closeModal = document.querySelector('.close-modal') as HTMLSpanElement; 
export const topicTitle = getElementByIdOrThrow('topicTitle', isHTMLHeadingElement);
export const topicDescription = getElementByIdOrThrow('topicDescription', isHTMLParagraphElement);
export const navItems = document.querySelectorAll('.nav-item') as NodeListOf<HTMLLIElement>;
export const hamburger = document.querySelector('.hamburger') as HTMLDivElement;
export const navMenu = document.querySelector('.nav-menu') as HTMLUListElement;
export const scrollTopBtn = getElementByIdOrThrow('scrollTopBtn', isHTMLButtonElement);
export const themeToggle = getElementByIdOrThrow('themeToggle', isHTMLInputElement);
export const body = document.body;

export function showErrorMessage(message: string): void {
  const errorMessage = document.createElement('div');
  errorMessage.textContent = message;
  errorMessage.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #f44336;
    color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    z-index: 9999;
    text-align: center;
    font-family: sans-serif;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  `;
  document.body.appendChild(errorMessage);

  // Animate in
  setTimeout(() => {
    errorMessage.style.opacity = '1';
  }, 10);

  // Animate out and remove after 5 seconds
  setTimeout(() => {
    errorMessage.style.opacity = '0';
    errorMessage.addEventListener('transitionend', () => errorMessage.remove(), { once: true });
  }, 5000);
}
