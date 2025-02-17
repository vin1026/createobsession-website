async function fetchTutorials() {
    try {
        const response = await fetch('https://createobsession-cms.onrender.com/api/tutorials?populate=*');
        const data = await response.json();
        console.log('API Response:', data);
        return data.data;
    } catch (error) {
        console.error('Error fetching tutorials:', error);
        return [];
    }
}

function getDescriptionText(description) {
    if (!Array.isArray(description)) return '';
    return description.map(block => {
        if (block.children) {
            return block.children.map(child => child.text).join('');
        }
        return '';
    }).join('\n');
}

function displayTutorials(tutorials) {
    const container = document.getElementById('tutorials-container');
    if (!container) {
        console.error('Tutorial container not found');
        return;
    }
    
    tutorials.forEach(tutorial => {
        if (tutorial && tutorial.attributes) {
            const descriptionText = getDescriptionText(tutorial.attributes.description);
            const imageUrl = tutorial.attributes.featuredImage?.url 
                ? `https://createobsession-cms.onrender.com${tutorial.attributes.featuredImage.url}`
                : '';
            
            const tutorialElement = `
                <div class="tutorial-card">
                    ${imageUrl ? `<img src="${imageUrl}" alt="${tutorial.attributes.title}" class="tutorial-image">` : ''}
                    <h2>${tutorial.attributes.title}</h2>
                    <p>Difficulty: ${tutorial.attributes.difficultyLevel}</p>
                    <p>Duration: ${tutorial.attributes.duration} minutes</p>
                    <div class="tutorial-description">
                        ${descriptionText}
                    </div>
                </div>
            `;
            container.innerHTML += tutorialElement;
        }
    });
}

// Load tutorials when page loads
document.addEventListener('DOMContentLoaded', async () => {
    const tutorials = await fetchTutorials();
    displayTutorials(tutorials);
}); 