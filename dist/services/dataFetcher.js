import { showErrorMessage } from '../utils/dom.js';
const TIMELINE_DATA_URL = 'timeline.json';
export async function fetchTimelineData() {
    try {
        const response = await fetch(TIMELINE_DATA_URL);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error fetching timeline data:', error);
        showErrorMessage("Failed to load timeline data. Please check if timeline.json exists and is a valid JSON file. See console for details.");
        throw error;
    }
}
//# sourceMappingURL=dataFetcher.js.map