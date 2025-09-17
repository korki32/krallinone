document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('bg-animation');
    const numberOfParticles = 20;

    const createParticle = () => {
        const particle = document.createElement('span');
        const size = Math.random() * 5 + 2;
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 10;
        const startX = Math.random() * 100;

        particle.classList.add('particle');
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${startX}vw`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `-${delay}s`;
        
        container.appendChild(particle);

        // Remove particle after animation to prevent memory leak
        particle.addEventListener('animationend', () => {
            particle.remove();
        });
    };

    // Initial particle creation
    for (let i = 0; i < numberOfParticles; i++) {
        createParticle();
    }

    // Continuously create new particles
    setInterval(createParticle, 500);
});
