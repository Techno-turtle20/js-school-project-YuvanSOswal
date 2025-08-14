# Timeline App - JS School Project

## Project Overview
A fully interactive, responsive, and theme-switchable timeline application that displays historical, technological, and scientific events dynamically from a JSON file.

##  Features
- Dynamic Data Loading – All events are loaded from `timeline.json` for easy updates.
- Multiple Topics & Subtopics – Switch between categories like Technology, Science, Art, etc.
- Interactive Timeline – Click on any event to see full details in a modal popup.
- Dark/Light Theme Toggle – Persistent theme preference saved in `localStorage`.
- Responsive Design – Works across desktops, tablets, and smartphones.
- Animated Scrolling – Timeline events fade in as you scroll.
- External Links – Each event includes a "Learn More" link to Wikipedia.

##  Project Structure
- index.html # Main HTML structure
- styles.css # Styling for light and dark themes
- script.js # JavaScript for data loading and interactivity
- timeline.json # Event data for all topics and subtopics

## Steps
1. Clone or download this repository.
2. Open `index.html` in your browser.
3. Select a topic from the navbar to explore events.

## How It Works
- `script.js` fetches data from `timeline.json` and dynamically creates HTML elements.
- Event details are displayed in a modal when a timeline item is clicked.
- The theme toggle switches between predefined CSS variables for light/dark modes.
- Animations are handled with CSS transitions and JavaScript `IntersectionObserver`.

## Technologies Used
- HTML5
- CSS3 (Variables, Animations, Responsive Design)
- JavaScript (ES6+)
- Font Awesome for icons

## Author
Yuvan SOswal - DataArt JS School Project
