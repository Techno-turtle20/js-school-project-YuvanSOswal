import { detailModal, modalTitle, modalDate, modalSubtitle, modalImage, modalDescription, learnMoreLink } from '../utils/dom.js';
export function openEventModal(event, subtopicTitle) {
    modalTitle.textContent = event.title;
    modalDate.textContent = event.date;
    modalSubtitle.textContent = subtopicTitle;
    modalDescription.textContent = event.description;
    const tempImage = new Image();
    tempImage.onload = () => {
        modalImage.src = tempImage.src;
        modalImage.alt = event.title;
    };
    tempImage.onerror = () => {
        modalImage.src = 'https://placehold.co/400x250/cccccc/333333?text=Image+Not+Found';
        modalImage.alt = 'Image failed to load';
    };
    tempImage.src = event.image;
    learnMoreLink.href = event.searchUrl;
    detailModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}
export function closeEventModal() {
    detailModal.classList.remove('show');
    document.body.style.overflow = '';
}
//# sourceMappingURL=modalHandler.js.map