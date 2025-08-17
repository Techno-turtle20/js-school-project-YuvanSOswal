import { ITimelineData, ITopic, ISubtopic, ITimelineEvent } from '../types.js'; 
import { subtopicContainer, topicTitle, topicDescription } from '../utils/dom.js'; 
import { openEventModal } from './modalHandler.js'; 

let timelineData: ITimelineData = {};
let currentTopic: string = 'technology';
let currentSubtopic: string = 'computers';

export function setTimelineData(data: ITimelineData): void {
  timelineData = data;
}

export function setCurrentTopic(topicKey: string): void {
  currentTopic = topicKey;
}

export function setCurrentSubtopic(subtopicKey: string): void {
  currentSubtopic = subtopicKey;
}

export function getCurrentSubtopic(): string {
  return currentSubtopic;
}

export function getFirstSubtopicKey(topicKey: string): string | undefined {
  const topic = timelineData[topicKey];
  if (topic && topic.subtopics) {
    return Object.keys(topic.subtopics)[0];
  }
  return undefined;
}

export function createSubtopicButtons(): void {
  subtopicContainer.innerHTML = ''; 

  const currentTopicData: ITopic = timelineData[currentTopic];
  if (!currentTopicData || !currentTopicData.subtopics) {
    console.warn(`No subtopics found for current topic: ${currentTopic}`);
    return;
  }
  const subtopics: { [key: string]: ISubtopic } = currentTopicData.subtopics;

  if (!subtopics[currentSubtopic]) {
    currentSubtopic = Object.keys(subtopics)[0];
  }

  for (const [key, subtopic] of Object.entries(subtopics)) {
    const button = document.createElement('button');
    button.className = `subtopic-btn ${key === currentSubtopic ? 'active' : ''}`;
    button.textContent = subtopic.title;
    button.dataset.subtopic = key; 
    subtopicContainer.appendChild(button);
  }
}

export function createTimeline(): void {
  const timelineContainer = document.querySelector('.timeline-container') as HTMLDivElement;
  timelineContainer.innerHTML = '<div class="timeline-line"></div>'; // Reset timeline container
  const currentTopicData: ITopic = timelineData[currentTopic];
  if (!currentTopicData || !currentTopicData.subtopics || !currentTopicData.subtopics[currentSubtopic]) {
    console.warn(`No data found for current subtopic: ${currentSubtopic} under topic: ${currentTopic}`);
    topicTitle.textContent = "No Data Available";
    topicDescription.textContent = "Please select another subtopic.";
    return;
  }

  const currentData: ISubtopic = currentTopicData.subtopics[currentSubtopic];
  topicTitle.textContent = currentData.title;
  topicDescription.textContent = currentData.description;
  currentData.events.forEach((event: ITimelineEvent, index: number) => {
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
    timelineItem.querySelector('.timeline-content')?.addEventListener('click', () => openEventModal(event, currentData.title));
    timelineContainer.appendChild(timelineItem);
  });

  animateOnScroll();
}

function animateOnScroll(): void {
  const timelineItems = document.querySelectorAll('.timeline-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        const index = Array.from(timelineItems).indexOf(entry.target as HTMLDivElement);
        (entry.target as HTMLElement).style.animationDelay = `${index * 0.1}s`;
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
