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
    } else if (selectedMemeType === 'dipperworthless') {
        imageUrl = `https://frenchnoodles.xyz/api/endpoints/worthless/?text=${text}`;
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

// Page2 generálás
document.getElementById('generate-button-2').addEventListener('click', () => {
    const text1 = encodeURIComponent(document.getElementById('description2-1').value);
    const text2 = encodeURIComponent(document.getElementById('description2-2').value);
    
    if (text1.length > 100 || text2.length > 100) {
        alert('A szövegek nem lehetnek többek, mint 100 karakter.');
        return;
    }

    if (!selectedMemeType) {
        alert('Kérlek válassz egy mém típust!');
        return;
    }

    let imageUrl;

    if (selectedMemeType === 'choose') {
        imageUrl = `https://api.memegen.link/images/ds/${text1}/${text2}`;
    } else if (selectedMemeType === 'drake') {
        imageUrl = `https://frenchnoodles.xyz/api/endpoints/drake/?text1=${text1}&text2=${text2}`;
    } else if (selectedMemeType === 'pooh') {
        imageUrl = `https://api.popcat.xyz/pooh?text1=${text1}&text2=${text2}`;
    } else {
        alert('Érvénytelen mém típus.');
        return;
    }

    const memeImage = document.getElementById('meme-image-2');
    memeImage.src = imageUrl;
    memeImage.alt = 'Meme kép';
    memeImage.style.display = 'block';
});

// Oldalak közötti váltás
document.querySelectorAll('.nav-button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
        document.querySelectorAll('.nav-button').forEach(btn => btn.classList.remove('active'));
        
        const pageId = button.getAttribute('data-page');
        document.getElementById(pageId).classList.add('active');
        button.classList.add('active');
    });
});

document.getElementById('page1').classList.add('active');
document.querySelector('.nav-button[data-page="page1"]').classList.add('active');
