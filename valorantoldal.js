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
    const resultDisplay = document.getElementById('result');
    const indicator = document.getElementById('indicator');

    const radius = canvas.width / 2;
    const angleStep = (2 * Math.PI) / agents.length;
    let currentAngle = 0;
    let targetAngle = 0; // Az új cél szög

    function drawWheel() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        agents.forEach((agent, index) => {
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

    function spinWheel(spinAngle, spinDuration, isImmediateSpin = false) {
        const startTime = Date.now();
        const initialAngle = currentAngle;
        const easing = (progress) => {
            // Easing function for the spinning animation
            return progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
        };

        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / spinDuration, 1);
            currentAngle = initialAngle + spinAngle * easing(progress);
            drawWheel();
            canvas.style.transform = `rotate(${currentAngle}rad)`;
            indicator.style.transform = `rotate(${currentAngle}rad)`;
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else if (isImmediateSpin) {
                // Calculate winner only after immediate spin
                const winnerIndex = Math.floor((currentAngle % (2 * Math.PI)) / angleStep);
                const winner = agents[winnerIndex];
                resultDisplay.textContent = `Az új agent: ${winner.name}`;
            }
        }

        animate();
    }

    function startSlowSpin() {
        const slowSpinAngle = Math.random() * 2 * Math.PI; // Lassú pörgetés szöge
        const slowSpinDuration = 10000; // Lassú pörgetés 10 másodperc alatt
        spinWheel(slowSpinAngle, slowSpinDuration);
    }

    drawWheel();

    // Oldal betöltésekor lassú pörgetés
    setTimeout(startSlowSpin, 1000); // 1 másodperc késleltetés az oldal betöltése után

    spinButton.addEventListener('click', function () {
        const fastSpinAngle = Math.random() * 2 * Math.PI + 5 * Math.PI; // Gyors pörgetés szöge
        const fastSpinDuration = 2000; // Manuális pörgetés 2 másodperc alatt
        spinWheel(fastSpinAngle, fastSpinDuration, true); // `true` jelzi, hogy az azonnali pörgetés után ki akarjuk írni az eredményt
    });
});
