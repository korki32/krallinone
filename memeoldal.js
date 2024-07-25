document.getElementById('generate-button').addEventListener('click', () => {
    const description = encodeURIComponent(document.getElementById('description').value);
    const title = encodeURIComponent('Teljesítmény elérve');
    
    if (description.length > 20) {
        alert('A leírás nem lehet több, mint 20 karakter.');
        return;
    }

    const selectedApi = document.getElementById('api-select').value;
    let imageUrl;

    if (selectedApi === 'minecraftskinstealer') {
        const randomAchievement = Math.floor(Math.random() * 39) + 1;
        imageUrl = `https://minecraftskinstealer.com/achievement/${randomAchievement}/${title}/${description}`;
    } else if (selectedApi === 'otherapi') {
        // Helyettesítsd a 'otherapi' helyét a megfelelő API URL-jével és paramétereivel
        imageUrl = `https://example.com/api?title=${title}&description=${description}`;
    } else {
        alert('Ismeretlen API');
        return;
    }

    const achievementImage = document.getElementById('achievement-image');
    achievementImage.src = imageUrl;
    achievementImage.alt = 'Teljesítmény kép';
});

