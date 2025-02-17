async function fetchTutorials() {
    try {
        const response = await fetch('https://createobsession-cms.onrender.com/api/tutorials?populate=*');
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching tutorials:', error);
        return [];
    }
}

function displayTutorials(tutorials) {
    const container = document.getElementById('tutorials-container');
    
    tutorials.forEach(tutorial => {
        const tutorialElement = `
            <div class="tutorial-card">
                <h2>${tutorial.attributes.title}</h2>
                <p>Difficulty: ${tutorial.attributes.difficultyLevel}</p>
                <p>Duration: ${tutorial.attributes.duration} minutes</p>
                <div class="tutorial-description">
                    ${tutorial.attributes.description}
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