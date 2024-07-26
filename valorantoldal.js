document.addEventListener('DOMContentLoaded', function () {
    const agents = [
        { name: 'Sova', image: 'images/valorant/agent_sova.png' },
        { name: 'Breach', image: 'images/valorant/agent_breach.png' },
        { name: 'Skye', image: 'images/valorant/agent_skye.png' },
        { name: 'KAY/O', image: 'images/valorant/agent_kayo.png' },
        { name: 'Fade', image: 'images/valorant/agent_fade.png' },
        { name: 'Gekko', image: 'images/valorant/agent_gekko.png' },
        { name: 'Cypher', image: 'images/valorant/agent_cypher.png' },
        { name: 'Sage', image: 'images/valorant/agent_sage.png' },
        { name: 'Killjoy', image: 'images/valorant/agent_killjoy.png' },
        { name: 'Chamber', image: 'images/valorant/agent_chamber.png' },
        { name: 'Deadlock', image: 'images/valorant/agent_deadlock.png' },
        { name: 'Jett', image: 'images/valorant/agent_jett.png' },
        { name: 'Phoenix', image: 'images/valorant/agent_phoenix.png' },
        { name: 'Reyna', image: 'images/valorant/agent_reyna.png' },
        { name: 'Raze', image: 'images/valorant/agent_raze.png' },
        { name: 'Yoru', image: 'images/valorant/agent_yoru.png' },
        { name: 'Neon', image: 'images/valorant/agent_neon.png' },
        { name: 'Iso', image: 'images/valorant/agent_iso.png' },
        { name: 'Brimstone', image: 'images/valorant/agent_brimstone.png' },
        { name: 'Viper', image: 'images/valorant/agent_viper.png' },
        { name: 'Omen', image: 'images/valorant/agent_omen.png' },
        { name: 'Astra', image: 'images/valorant/agent_astra.png' },
        { name: 'Harbor', image: 'images/valorant/agent_harbor.png' },
        { name: 'Clove', image: 'images/valorant/agent_clove.png' }
    ];

    const canvas = document.getElementById('wheel');
    const ctx = canvas.getContext('2d');
    const spinButton = document.getElementById('spin');
    const spinSound = document.getElementById('spin-sound');
    const stopSound = document.getElementById('stop-sound');

    const radius = canvas.width / 2;
    let currentAngle = 0;
    let spinning = false;

    function drawWheel() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const activeAgents = agents.filter(agent => !agent.excluded);
        const angleStep = (2 * Math.PI) / activeAgents.length;

        activeAgents.forEach((agent, index) => {
            const angle = index * angleStep;
            ctx.beginPath();
            ctx.moveTo(radius, radius);
            ctx.arc(radius, radius, radius, angle, angle + angleStep);
            ctx.lineTo(radius, radius);
            ctx.fillStyle = index % 2 === 0 ? '#333' : '#444';
            ctx.fill();

            ctx.save();
            ctx.translate(radius, radius);
            ctx.rotate(angle + angleStep / 2);
            ctx.textAlign = 'right';
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 12px Arial';
            ctx.fillText(agent.name, radius - 10, 10);
            ctx.restore();
        });
    }

    function spinWheel(spinAngle, spinDuration) {
        const startTime = Date.now();
        const initialAngle = currentAngle;
        const easing = (progress) => {
            return progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
        };

        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / spinDuration, 1);
            currentAngle = initialAngle + spinAngle * easing(progress);
            drawWheel();
            canvas.style.transform = `rotate(${currentAngle}rad)`;
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                spinning = false;
                stopSound.play();
            }
        }

        animate();
    }

    function startContinuousSpin() {
        const spinAngle = 0.01;
        const spinDuration = 100;

        function animate() {
            if (!spinning) {
                currentAngle += spinAngle;
                drawWheel();
                canvas.style.transform = `rotate(${currentAngle}rad)`;
                requestAnimationFrame(animate);
            }
        }

        animate();
    }

    function updateCategoryBorders() {
        // Végigmegyünk az összes kategória ikonon
        document.querySelectorAll('.category-icon').forEach(icon => {
            const category = icon.dataset.category;
            const agentsInCategory = document.querySelectorAll(`.agent-class[data-category="${category}"] .agent img`);
            const allActive = Array.from(agentsInCategory).every(img => !img.classList.contains('inactive'));

            if (allActive) {
                icon.classList.remove('inactive');
                icon.classList.add('active');
            } else {
                icon.classList.remove('active');
                icon.classList.add('inactive');
            }
        });
    }

    function updateAgentState(index, isActive) {
        if (isActive) {
            delete agents[index].excluded;
        } else {
            agents[index].excluded = true;
        }
        drawWheel();
        updateCategoryBorders(); // Frissítjük a kategória ikonokat
    }

    drawWheel();
    startContinuousSpin();

    spinButton.addEventListener('click', function () {
        if (spinning) return;

        spinning = true;
        spinSound.play();
        const fastSpinAngle = Math.random() * 2 * Math.PI + 5 * Math.PI;
        const fastSpinDuration = 6800;
        spinWheel(fastSpinAngle, fastSpinDuration);
    });

    const agentElements = document.querySelectorAll('.agent img');
    agentElements.forEach((img, index) => {
        img.addEventListener('click', function () {
            img.classList.toggle('inactive');
            const isActive = !img.classList.contains('inactive');
            updateAgentState(index, isActive);
        });
    });
});
