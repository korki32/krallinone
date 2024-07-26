let selectedMemeType = '';

document.querySelectorAll('.meme-option').forEach(option => {
    option.addEventListener('click', () => {
        document.querySelectorAll('.meme-option').forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');
        selectedMemeType = option.getAttribute('data-meme');
    });
});

document.getElementById('generate-button').addEventListener('click', () => {
    const text = encodeURIComponent(document.getElementById('description').value);
    
    if (text.length > 100) {
        alert('A szöveg nem lehet több, mint 100 karakter.');
        return;
    }

    if (!selectedMemeType) {
        alert('Kérlek válassz egy mém típust!');
        return;
    }

    let imageUrl;

    if (selectedMemeType === 'pikachu') {
        imageUrl = `https://api.popcat.xyz/pikachu?text=${text}`;
    } else if (selectedMemeType === 'oogway') {
        imageUrl = `https://api.popcat.xyz/oogway?text=${text}`;
    } else if (selectedMemeType === 'fact') {
        imageUrl = `https://api.popcat.xyz/facts?text=${text}`;
    } else if (selectedMemeType === 'sadcat') {
        imageUrl = `https://api.popcat.xyz/sadcat?text=${text}`;
    } else if (selectedMemeType === 'sbburn') {
        imageUrl = `https://luminabot.xyz/api/image/burn?text=${text}`;
    } else if (selectedMemeType === 'changemymind') {
        imageUrl = `https://frenchnoodles.xyz/api/endpoints/changemymind/?text=${text}`;
    } else if (selectedMemeType === 'biden') {
        imageUrl = `https://api.popcat.xyz/biden?text=${text}`;
    } else {
        alert('Érvénytelen mém típus.');
        return;
    }

    const memeImage = document.getElementById('meme-image');
    memeImage.src = imageUrl;
    memeImage.alt = 'Meme kép';
    memeImage.style.display = 'block';
});
