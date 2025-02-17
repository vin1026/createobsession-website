async function fetchTutorials() {
    try {
        const response = await fetch('https://createobsession-cms.onrender.com/api/tutorials?populate=*');
        const data = await response.json();
        console.log('Raw API response:', data); // Debug log
        return data.data || [];
    } catch (error) {
        console.error('Error fetching tutorials:', error);
        return [];
    }
}

function displayTutorials(tutorials) {
    console.log('Tutorials to display:', tutorials); // Debug log
    const container = document.getElementById('tutorials-container');
    
    if (!Array.isArray(tutorials)) {
        console.error('Expected array of tutorials, got:', tutorials);
        return;
    }
    
    tutorials.forEach(tutorial => {
        if (!tutorial || !tutorial.attributes) {
            console.error('Invalid tutorial data:', tutorial);
            return;
        }
        
        const tutorialElement = `
            <div class="tutorial-card">
                <h2>${tutorial.attributes.title || 'Untitled'}</h2>
                <p>Difficulty: ${tutorial.attributes.difficultyLevel || 'N/A'}</p>
                <p>Duration: ${tutorial.attributes.duration || 0} minutes</p>
                <div class="tutorial-description">
                    ${tutorial.attributes.description || ''}
                </div>
            </div>
        `;
        container.innerHTML += tutorialElement;
    });
}

// Load tutorials when page loads
document.addEventListener('DOMContentLoaded', async () => {
    const tutorials = await fetchTutorials();
    displayTutorials(tutorials);
}); 