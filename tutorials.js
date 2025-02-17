async function fetchTutorials() {
    try {
        const response = await fetch('https://createobsession-cms.onrender.com/api/tutorials?populate=*');
        const result = await response.json();
        console.log('Raw API Response:', result);
        console.log('Data array:', result.data);
        return result.data || [];
    } catch (error) {
        console.error('Error:', error);
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
    console.log('Tutorials array received:', tutorials);
    const container = document.getElementById('tutorials-container');
    
    if (!container) {
        console.error('Container not found');
        return;
    }

    console.log('Number of tutorials:', tutorials.length);
    
    if (!tutorials.length) {
        container.innerHTML = '<p>No tutorials available.</p>';
        return;
    }

    tutorials.forEach((tutorial, index) => {
        console.log(`Tutorial ${index}:`, tutorial);
    });

    const html = tutorials.map(tutorial => {
        const title = tutorial.attributes?.title || 'No title available';
        const description = tutorial.attributes?.description[0]?.children[0]?.text || 'No description available';
        const imageUrl = tutorial.attributes?.featuredImage?.url
            ? `https://createobsession-cms.onrender.com${tutorial.attributes.featuredImage.url}`
            : '';

        return `
            <div class="tutorial-card">
                ${imageUrl ? `<img src="${imageUrl}" alt="${title}" class="tutorial-image">` : ''}
                <h2>${title}</h2>
                <p>Difficulty: ${tutorial.attributes?.difficultyLevel || 'Unknown'}</p>
                <p>Duration: ${tutorial.attributes?.duration || 'Unknown'} minutes</p>
                <div class="tutorial-description">
                    ${description}
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = html;
}

// Load tutorials when page loads
document.addEventListener('DOMContentLoaded', async () => {
    const tutorials = await fetchTutorials();
    console.log('Before display:', tutorials);
    displayTutorials(tutorials);
}); 