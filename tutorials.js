async function fetchTutorials() {
    try {
        console.log('Starting fetch...');
        const url = 'https://createobsession-cms.onrender.com/api/tutorials?populate=*';
        console.log('Fetching from:', url);
        
        const response = await fetch(url);
        console.log('Response status:', response.status);
        
        const data = await response.json();
        console.log('Raw API response:', data);
        
        if (!data || !data.data) {
            throw new Error('Invalid data structure received');
        }
        
        return data.data;
    } catch (error) {
        console.error('Detailed error:', error);
        document.getElementById('tutorials-container').innerHTML = 
            `<p>Error loading tutorials: ${error.message}</p>`;
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
    console.log('Tutorials to display:', tutorials);
    
    if (!container) {
        console.error('Container element not found!');
        return;
    }

    if (!tutorials || tutorials.length === 0) {
        container.innerHTML = '<p>No tutorials found.</p>';
        return;
    }

    container.innerHTML = tutorials.map(tutorial => {
        if (!tutorial || !tutorial.attributes) {
            console.error('Invalid tutorial data:', tutorial);
            return '';
        }

        return `
            <div class="tutorial-card">
                <h2>${tutorial.attributes.title || 'Untitled'}</h2>
                <p>Difficulty: ${tutorial.attributes.difficultyLevel || 'N/A'}</p>
                <p>Duration: ${tutorial.attributes.duration || 0} minutes</p>
                <div class="tutorial-description">
                    ${tutorial.attributes.description?.[0]?.children?.[0]?.text || 'No description available.'}
                </div>
            </div>
        `;
    }).join('');
}

// Load tutorials when page loads
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Page loaded, starting tutorial fetch...');
    const tutorials = await fetchTutorials();
    displayTutorials(tutorials);
}); 