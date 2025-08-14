
let timelineTopics = {};

const subtopicContainer = document.getElementById('subtopicContainer');
const detailModal = document.getElementById('detailModal');
const modalTitle = document.getElementById('modalTitle');
const modalDate = document.getElementById('modalDate');
const modalSubtitle = document.getElementById('modalSubtitle');
const modalImage = document.getElementById('modalImage');
const modalDescription = document.getElementById('modalDescription');
const learnMoreLink = document.getElementById('learnMoreLink');
const closeModal = document.querySelector('.close-modal');
const topicTitle = document.getElementById('topicTitle');
const topicDescription = document.getElementById('topicDescription');
const navItems = document.querySelectorAll('.nav-item');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

let currentTopic = 'technology';
let currentSubtopic = 'computers';

function init() {
    fetch('timeline.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            timelineTopics = data;
            createSubtopicButtons();
            createTimeline();
            setupEventListeners();
            checkSavedTheme();
        })
        .catch(error => {
            console.error('Error fetching timeline data:', error);
            alert("Failed to load timeline data. Please check if timeline.json exists and is a valid JSON file.");
        });
}

function createSubtopicButtons() {
    subtopicContainer.innerHTML = '';
    const subtopics = timelineTopics[currentTopic].subtopics;
    
    for (const [key, subtopic] of Object.entries(subtopics)) {
        const button = document.createElement('button');
        button.className = `subtopic-btn ${key === currentSubtopic ? 'active' : ''}`;
        button.textContent = subtopic.title;
        button.dataset.subtopic = key;
        subtopicContainer.appendChild(button);
    }
}

// Create timeline items for current subtopic
function createTimeline() {
    const timelineContainer = document.querySelector('.timeline-container');
    timelineContainer.innerHTML = '<div class="timeline-line"></div>';
    
    const currentData = timelineTopics[currentTopic].subtopics[currentSubtopic];
    topicTitle.textContent = currentData.title;
    topicDescription.textContent = currentData.description;
    
    currentData.events.forEach((event, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = `timeline-item ${index % 2 === 0 ? 'left' : 'right'}`;
        
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <div class="timeline-date">${event.date}</div>
                <h3 class="timeline-title">${event.title}</h3>
                <p class="timeline-desc">${event.description.substring(0, 150)}...</p>
            </div>
            <div class="timeline-dot"></div>
        `;
        
        timelineItem.querySelector('.timeline-content').addEventListener('click', () => openEventModal(event));
        timelineContainer.appendChild(timelineItem);
    });

    animateOnScroll();
}

// Animate timeline items when they come into view
function animateOnScroll() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                const index = Array.from(timelineItems).indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.1}s`;
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Open modal with event details
function openEventModal(event) {
    modalTitle.textContent = event.title;
    modalDate.textContent = event.date;
    modalSubtitle.textContent = timelineTopics[currentTopic].subtopics[currentSubtopic].title;
    modalDescription.textContent = event.description;
    
    // Create a new image element to handle loading
    const tempImage = new Image();
    tempImage.onload = () => {
        modalImage.src = tempImage.src;
        modalImage.alt = event.title;
    };
    tempImage.onerror = () => {
        modalImage.src = ''; // Clear source on error
        modalImage.alt = 'Image failed to load';
    };
    tempImage.src = event.image;
    
    learnMoreLink.href = event.searchUrl;
    
    detailModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeEventModal() {
    detailModal.classList.remove('show');
    document.body.style.overflow = '';
}

// Toggle theme between dark and light
function toggleTheme() {
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

// Check for saved theme preference
function checkSavedTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeToggle.checked = true;
    }
}

// Toggle mobile menu
function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

// Show/hide scroll to top button
function handleScroll() {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Set up event listeners
function setupEventListeners() {
    // Subtopic buttons
    subtopicContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('subtopic-btn')) {
            currentSubtopic = e.target.dataset.subtopic;
            document.querySelectorAll('.subtopic-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');
            createTimeline();
        }
    });

    // Main topic navigation
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            currentTopic = item.dataset.topic;
            currentSubtopic = Object.keys(timelineTopics[currentTopic].subtopics)[0];
            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            createSubtopicButtons();
            createTimeline();
        });
    });

    // Modal close
    closeModal.addEventListener('click', closeEventModal);
    detailModal.addEventListener('click', (e) => {
        if (e.target === detailModal) {
            closeEventModal();
        }
    });

    // Theme toggle
    themeToggle.addEventListener('change', toggleTheme);

    // Mobile menu toggle
    hamburger.addEventListener('click', toggleMenu);

    // Scroll events
    window.addEventListener('scroll', handleScroll);
    scrollTopBtn.addEventListener('click', scrollToTop);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', init);