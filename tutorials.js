async function fetchTutorials() {
    try {
        console.log('Fetching tutorials...');
        const response = await fetch('https://createobsession-cms.onrender.com/api/tutorials?populate=*');
        const data = await response.json();
        console.log('Received data:', data);
        if (!data || !data.data) {
            console.error('Invalid data structure:', data);
            return [];
        }
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
    console.log('Displaying tutorials:', tutorials);
    const container = document.getElementById('tutorials-container');
    
    if (!container) {
        console.error('Container not found!');
        return;
    }

    if (!tutorials || tutorials.length === 0) {
        container.innerHTML = '<p>No tutorials available.</p>';
        return;
    }

    tutorials.forEach(tutorial => {
        if (tutorial && tutorial.attributes) {
            const descriptionText = getDescriptionText(tutorial.attributes.description);
            const imageUrl = tutorial.attributes.featuredImage?.data?.attributes?.url 
                ? `https://createobsession-cms.onrender.com${tutorial.attributes.featuredImage.data.attributes.url}`
                : '';
            
            const tutorialElement = `
                <div class="tutorial-card">
                    ${imageUrl ? `<img src="${imageUrl}" alt="${tutorial.attributes.title}" class="tutorial-image">` : ''}
                    <h2>${tutorial.attributes.title || 'Untitled'}</h2>
                    <p>Difficulty: ${tutorial.attributes.difficultyLevel || 'N/A'}</p>
                    <p>Duration: ${tutorial.attributes.duration || 0} minutes</p>
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
    console.log('Page loaded, fetching tutorials...');
    const tutorials = await fetchTutorials();
    displayTutorials(tutorials);
}); 