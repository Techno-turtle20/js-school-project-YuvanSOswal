import { fetchTimelineData } from './services/dataFetcher.js';
import { setTimelineData, setCurrentTopic, setCurrentSubtopic, createSubtopicButtons, createTimeline, getFirstSubtopicKey, } from './ui/timelineRenderer.js';
import { closeEventModal } from './ui/modalHandler.js';
import { toggleTheme, checkSavedTheme } from './ui/themeSwitcher.js';
import { handleScroll, scrollToTop } from './ui/scrollHandler.js';
import { subtopicContainer, navItems, detailModal, closeModal, themeToggle, hamburger, navMenu, scrollTopBtn } from './utils/dom.js';
let appTimelineData = {};
async function init() {
    try {
        appTimelineData = await fetchTimelineData();
        setTimelineData(appTimelineData);
        const initialTopic = 'technology';
        const firstSubtopicForInitialTopic = getFirstSubtopicKey(initialTopic);
        const initialSubtopic = firstSubtopicForInitialTopic || 'computers';
        setCurrentTopic(initialTopic);
        setCurrentSubtopic(initialSubtopic);
        createSubtopicButtons();
        createTimeline();
        setupEventListeners();
        checkSavedTheme();
    }
    catch (error) {
        console.error("Application initialization failed:", error);
    }
}
function setupEventListeners() {
    subtopicContainer.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('subtopic-btn')) {
            const newSubtopic = target.dataset.subtopic;
            if (newSubtopic) {
                setCurrentSubtopic(newSubtopic);
                document.querySelectorAll('.subtopic-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                target.classList.add('active');
                createTimeline();
            }
        }
    });
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const newTopic = item.dataset.topic;
            if (newTopic) {
                setCurrentTopic(newTopic);
                const firstSubtopic = getFirstSubtopicKey(newTopic);
                if (firstSubtopic) {
                    setCurrentSubtopic(firstSubtopic);
                }
                document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                createSubtopicButtons();
                createTimeline();
            }
        });
    });
    closeModal.addEventListener('click', closeEventModal);
    detailModal.addEventListener('click', (e) => {
        if (e.target === detailModal) {
            closeEventModal();
        }
    });
    themeToggle.addEventListener('change', toggleTheme);
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    window.addEventListener('scroll', handleScroll);
    scrollTopBtn.addEventListener('click', scrollToTop);
}
document.addEventListener('DOMContentLoaded', init);
//# sourceMappingURL=index.js.map