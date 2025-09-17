document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('futuristic-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const particleCount = 200;

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.2;
            this.vy = (Math.random() - 0.5) * 0.2;
            this.radius = Math.random() * 1.5;
            this.color = `rgba(44, 192, 235, ${Math.random() * 0.5 + 0.1})`;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(44, 192, 235, ${1 - distance / 100})`;
                    ctx.lineWidth = 0.2;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }

    resizeCanvas();
    initParticles();
    window.addEventListener('resize', resizeCanvas);
    animate();

    // Calculator logic starts here
    const calendarDaysEl = document.getElementById('calendarDays');
    const currentMonthEl = document.getElementById('currentMonth');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const hourlyRateInput = document.getElementById('hourlyRate');
    const vacationHourlyRateInput = document.getElementById('vacationHourlyRate');
    const nightRateInput = document.getElementById('nightRate');
    const nightStartInput = document.getElementById('nightStart');
    const nightEndInput = document.getElementById('nightEnd');
    const eveningRateInput = document.getElementById('eveningRate');
    const eveningStartInput = document.getElementById('eveningStart');
    const eveningEndInput = document.getElementById('eveningEnd');
    const weekendRateInput = document.getElementById('weekendRate');
    const weekendOptionSelect = document.getElementById('weekendOption');
    const overtimeRateInput = document.getElementById('overtimeRate');
    const ekhoCheckbox = document.getElementById('ekho');
    const under25Checkbox = document.getElementById('under25');
    const under30motherCheckbox = document.getElementById('under30mother');
    const marriedCheckbox = document.getElementById('married');
    const personalDeductionCheckbox = document.getElementById('personalDeduction');
    const retiredEmployeeCheckbox = document.getElementById('retiredEmployee');
    const mother4plusCheckbox = document.getElementById('mother4plus');
    const calculateBtn = document.getElementById('calculateBtn');
    const totalHoursEl = document.getElementById('totalHours');
    const baseBruttoEl = document.getElementById('baseBrutto');
    const nightBreakdownEl = document.getElementById('nightBreakdown');
    const eveningBreakdownEl = document.getElementById('eveningBreakdown');
    const weekendBreakdownEl = document.getElementById('weekendBreakdown');
    const overtimeBreakdownEl = document.getElementById('overtimeBreakdown');
    const vacationHoursEl = document.getElementById('vacationHours');
    const totalBonusEl = document.getElementById('totalBonus');
    const nettoOutputEl = document.getElementById('nettoOutput');
    const totalBenefitsEl = document.getElementById('totalBenefits');
    const totalBenefitsContainer = document.getElementById('totalBenefits-container');
    const totalSavingsEl = document.getElementById('totalSavings');
    const savingsListEl = document.getElementById('savings-list');
    const savingsPlaceholderEl = document.getElementById('savings-placeholder');
    const shiftModal = document.getElementById('shiftModal');
    const shiftInputs = document.getElementById('shift-inputs');
    const startTimeInput = document.getElementById('startTime');
    const endTimeInput = document.getElementById('endTime');
    const overtimeCheckbox = document.getElementById('overtimeCheckbox');
    const overtimeHoursInput = document.getElementById('overtimeHoursInput');
    const vacationCheckbox = document.getElementById('vacationCheckbox');
    const vacationHoursInput = document.getElementById('vacationHoursInput');
    const saveShiftBtn = document.getElementById('saveShiftBtn');
    const cancelShiftBtn = document.getElementById('cancelShiftBtn');
    const messageBox = document.getElementById('messageBox');
    const messageText = document.getElementById('messageText');
    const closeMessageBtn = document.getElementById('closeMessageBtn');
    const infoButtons = document.querySelectorAll('.info-icon');
    const pdfConfirmModal = document.getElementById('pdfConfirmModal');
    const saveAndContinueBtn = document.getElementById('saveAndContinueBtn');
    const continueWithoutSavingBtn = document.getElementById('continueWithoutSavingBtn');
    const closePdfModalBtn = document.querySelector('#pdfConfirmModal .close-btn');

    // Hozzáadott elemek a Juttatásokhoz
    const benefitsContainer = document.getElementById('benefits-container');
    const addBenefitBtn = document.getElementById('addBenefitBtn');

    // Az új Juttatások mezők tárolása
    let benefits = {};
    let benefitCounter = 0;

    const settingsInputs = [
        hourlyRateInput,
        vacationHourlyRateInput,
        nightRateInput,
        nightStartInput,
        nightEndInput,
        eveningRateInput,
        eveningStartInput,
        eveningEndInput,
        weekendRateInput,
        overtimeRateInput,
        weekendOptionSelect,
    ];

    const settingsCheckboxes = [
        ekhoCheckbox,
        under25Checkbox,
        under30motherCheckbox,
        marriedCheckbox,
        personalDeductionCheckbox,
        retiredEmployeeCheckbox,
        mother4plusCheckbox,
    ];

    let currentDate = new Date();
    let selectedDays = {};
    let activeDate = null;
    let monthChangeDirection = 0; // -1: prev, 1: next

    const formatCurrency = (amount) => {
        return `${Math.round(amount).toLocaleString('hu-HU')} Ft`;
    };

    const showMessageBox = (message) => {
        messageText.textContent = message;
        messageBox.style.display = 'block';
    };

    const hideMessageBox = () => {
        messageBox.style.display = 'none';
    };

    closeMessageBtn.addEventListener('click', hideMessageBox);

    infoButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const infoType = e.target.dataset.info;
            let message = "";
            switch (infoType) {
                case 'ekho':
                    message = "Az Egyszerűsített Közteherviselési Hozzájárulás (EKHO) egy adózási mód, amely helyettesíti a normál SZJA-t és a legtöbb járulékot. Külön szabályok vonatkoznak rá.";
                    break;
                case 'under25':
                    message = "A 25 év alattiak mentesülnek a személyi jövedelemadó (SZJA) fizetése alól a bruttó átlagkereset mértékéig.";
                    break;
                case 'under30mother':
                    message = "A 30 év alatti, gyermeket vállaló anyák adómentességet kapnak a fizetésükre a bruttó átlagkereset mértékéig.";
                    break;
                case 'married':
                    message = "A friss házasok havonta adóalap-kedvezményt vehetnek igénybe a házasságkötést követő 24 hónapon keresztül.";
                    break;
                case 'personalDeduction':
                    message = "A személyi kedvezményre jogosító betegségekkel élők (pl. cukorbetegség, laktóz- vagy gluténérzékenység) adóalap-kedvezményt vehetnek igénybe.";
                    break;
                case 'retiredEmployee':
                    message = "A nyugdíjas munkavállalók mentesülnek a 18.5%-os TB-járulék fizetése alól, csak a 15%-os SZJA-t kell fizetniük.";
                    break;
                case 'mother4plus':
                    message = "A 4 vagy több gyermeket nevelő anyák teljes mértékben mentesülnek a személyi jövedelemadó (SZJA) fizetése alól.";
                    break;
            }
            showMessageBox(message);
        });
    });

    const createBenefitField = (id, name, value) => {
        const benefitDiv = document.createElement('div');
        benefitDiv.classList.add('flex', 'items-end', 'space-x-2', 'benefit-field');
        benefitDiv.dataset.id = id;
        benefitDiv.innerHTML = `
            <div class="flex-1">
                <label for="benefitName-${id}" class="block text-gray-400 font-medium mb-1 text-sm">Juttatás neve</label>
                <input type="text" id="benefitName-${id}" value="${name || ''}" class="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
            </div>
            <div class="flex-1">
                <label for="benefitValue-${id}" class="block text-gray-400 font-medium mb-1 text-sm">Összeg (Ft)</label>
                <input type="number" id="benefitValue-${id}" value="${value || 0}" class="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
            </div>
            <button class="remove-benefit-btn p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 11-2 0v6a1 1 0 112 0V8z" clip-rule="evenodd" />
                </svg>
            </button>
        `;
        benefitsContainer.appendChild(benefitDiv);
    };

    addBenefitBtn.addEventListener('click', () => {
        benefitCounter++;
        createBenefitField(benefitCounter, '', 0);
        saveSettings();
    });

    benefitsContainer.addEventListener('click', (e) => {
        if (e.target.closest('.remove-benefit-btn')) {
            const benefitDiv = e.target.closest('.benefit-field');
            const id = benefitDiv.dataset.id;
            delete benefits[id];
            benefitDiv.remove();
            saveSettings();
            calculate();
        }
    });

    const loadSettings = () => {
        const settings = JSON.parse(localStorage.getItem('calculatorSettings'));
        if (settings) {
            settingsInputs.forEach(input => {
                if (settings[input.id] !== undefined) {
                    input.value = settings[input.id];
                }
            });
            settingsCheckboxes.forEach(checkbox => {
                if (settings[checkbox.id] !== undefined) {
                    checkbox.checked = settings[checkbox.id];
                }
            });
            if (settings.benefits) {
                benefits = settings.benefits;
                Object.keys(benefits).forEach(id => {
                    createBenefitField(id, benefits[id].name, benefits[id].value);
                });
            }
        }
    };

    const saveSettings = () => {
        const settings = {};
        settingsInputs.forEach(input => {
            settings[input.id] = input.value;
        });
        settingsCheckboxes.forEach(checkbox => {
            settings[checkbox.id] = checkbox.checked;
        });
        const currentBenefits = {};
        document.querySelectorAll('.benefit-field').forEach(div => {
            const id = div.dataset.id;
            const name = div.querySelector('input[type="text"]').value;
            const value = parseFloat(div.querySelector('input[type="number"]').value) || 0;
            currentBenefits[id] = { name, value };
        });
        settings.benefits = currentBenefits;
        localStorage.setItem('calculatorSettings', JSON.stringify(settings));
    };

    // --- Animációk, Diagram és Számítások ---

    // Animációs függvény
    function animateValue(obj, start, end) {
        const duration = 700;
        const range = end - start;
        const startTime = performance.now();
        let lastTimestamp = startTime;

        function step(timestamp) {
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            const easing = (t) => t * (2 - t); // Simple quadratic ease-out
            const easedPercentage = easing(percentage);
            const current = start + range * easedPercentage;
            
            obj.textContent = formatCurrency(current);

            if (percentage < 1) {
                requestAnimationFrame(step);
            } else {
                obj.textContent = formatCurrency(end);
            }
        }

        requestAnimationFrame(step);
    }
    
    const updateDisplay = (id, value) => {
        const element = document.getElementById(id);
        if (element) {
            const start = parseFloat(element.textContent.replace(/[^0-9,-]/g, '').replace(',', '.')) || 0;
            animateValue(element, start, value);
        }
    };

    const updateHoursDisplay = (id, value) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = `${value} óra`;
        }
    };
    
    const updateBreakdownDisplay = (id, hours, amount) => {
        const element = document.getElementById(id);
        if (element) {
            const textContent = `${hours} óra `;
            const amountSpan = document.createElement('span');
            amountSpan.id = `${id}-amount`;
            amountSpan.textContent = formatCurrency(0);
            element.innerHTML = textContent;
            element.appendChild(amountSpan);
            animateValue(amountSpan, 0, amount);
        }
    };
    
    // A D3.js diagram frissítő függvénye
    const chartContainer = document.getElementById('chart-container');
    const margin = { top: 20, right: 20, bottom: 80, left: 60 };
    let chartWidth, chartHeight;

    const setupChart = () => {
        chartWidth = chartContainer.offsetWidth - margin.left - margin.right;
        chartHeight = 400 - margin.top - margin.bottom;

        d3.select("#chart-container svg").remove();

        const svg = d3.select("#chart-container")
            .append("svg")
            .attr("width", chartWidth + margin.left + margin.right)
            .attr("height", chartHeight + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);
        
        return svg;
    };

    let svg = setupChart();
    const tooltip = d3.select("#tooltip");

    const updateChart = (data) => {
        svg = setupChart(); // Re-create SVG on update to handle resize correctly
        
        if (!data || data.length === 0 || d3.sum(data, d => d.value) === 0) {
            d3.select("#chart-container").append("p").attr("class", "text-center text-gray-400 mt-4").text("Nincs elegendő adat a diagram megjelenítéséhez.");
            return;
        }

        // Skálák
        const x = d3.scaleBand()
            .range([0, chartWidth])
            .domain(data.map(d => d.label))
            .padding(0.2);
    
        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value) * 1.1])
            .range([chartHeight, 0]);
    
        // Tengelyek
        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0,${chartHeight})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-45)");
    
        svg.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(y).tickFormat(d3.format(".2s")));

        // Sávok
        svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.label))
            .attr("width", x.bandwidth())
            .attr("y", d => y(d.value))
            .attr("height", d => chartHeight - y(d.value))
            .attr("fill", "#6d28d9")
            .on("mouseover", (event, d) => {
                tooltip.style("opacity", 1)
                    .html(`${d.label}<br>${formatCurrency(d.value)}`);
            })
            .on("mousemove", (event) => {
                tooltip.style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 10) + "px");
            })
            .on("mouseout", () => {
                tooltip.style("opacity", 0);
            });
    };
    
    // A fő számítási logika
    const calculate = () => {
        const hourlyRate = parseFloat(hourlyRateInput.value) || 0;
        const vacationHourlyRate = parseFloat(vacationHourlyRateInput.value) || 0;
        const nightRate = (parseFloat(nightRateInput.value) || 0) / 100;
        const nightStart = parseFloat(nightStartInput.value) || 0;
        const nightEnd = parseFloat(nightEndInput.value) || 0;
        const eveningRate = (parseFloat(eveningRateInput.value) || 0) / 100;
        const eveningStart = parseFloat(eveningStartInput.value) || 0;
        const eveningEnd = parseFloat(eveningEndInput.value) || 0;
        const weekendRate = (parseFloat(weekendRateInput.value) || 0) / 100;
        const overtimeRate = (parseFloat(overtimeRateInput.value) || 0) / 100;
        const weekendOption = weekendOptionSelect.value;
        const isEKHO = ekhoCheckbox.checked;
        const isUnder25 = under25Checkbox.checked;
        const isUnder30mother = under30motherCheckbox.checked;
        const isMarried = marriedCheckbox.checked;
        const isPersonalDeduction = personalDeductionCheckbox.checked;
        const isRetiredEmployee = retiredEmployeeCheckbox.checked;
        const isMother4plus = mother4plusCheckbox.checked;
    
        if (hourlyRate <= 0) {
            updateDisplay('nettoOutput', 0);
            return;
        }
    
        let totalHours = 0;
        let baseBrutto = 0;
        let nightHours = 0;
        let eveningHours = 0;
        let weekendHours = 0;
        let overtimeHours = 0;
        let vacationHours = 0;
        let nightBonus = 0;
        let eveningBonus = 0;
        let weekendBonus = 0;
        let overtimeBonus = 0;
        let vacationPay = 0;
        let totalBonus = 0;
    
        Object.values(selectedDays).forEach(day => {
            if (day.isVacation) {
                vacationHours += day.vacationHours;
                vacationPay += day.vacationHours * vacationHourlyRate;
            } else if (day.isOvertime) {
                overtimeHours += day.overtimeHours;
            } else {
                totalHours += day.workHours;
                
                const dayNightHours = day.nightHours;
                const dayEveningHours = day.eveningHours;
                const isWeekend = day.isWeekend;
    
                nightHours += dayNightHours;
                eveningHours += dayEveningHours;
    
                if (isWeekend && (weekendOption === 'all' || (weekendOption === 'saturday' && day.dayOfWeek === 6) || (weekendOption === 'sunday' && day.dayOfWeek === 0))) {
                    weekendHours += day.workHours;
                }
            }
        });
    
        baseBrutto = totalHours * hourlyRate;
        nightBonus = nightHours * hourlyRate * nightRate;
        eveningBonus = eveningHours * hourlyRate * eveningRate;
        weekendBonus = weekendHours * hourlyRate * weekendRate;
        overtimeBonus = overtimeHours * hourlyRate * overtimeRate;
    
        totalBonus = nightBonus + eveningBonus + weekendBonus + overtimeBonus + vacationPay;
        
        let totalBenefits = 0;
        document.querySelectorAll('.benefit-field').forEach(div => {
            const value = parseFloat(div.querySelector('input[type="number"]').value) || 0;
            totalBenefits += value;
        });

        // Diagram adatok előkészítése
        const chartData = [
            { label: 'Alap bér', value: baseBrutto },
            { label: 'Éjszakai pótlék', value: nightBonus },
            { label: 'Délutáni pótlék', value: eveningBonus },
            { label: 'Hétvégi pótlék', value: weekendBonus },
            { label: 'Túlóra pótlék', value: overtimeBonus },
            { label: 'Szabadságdíj', value: vacationPay }
        ];

        if (totalBenefits > 0) {
            chartData.push({ label: 'Juttatások', value: totalBenefits });
            totalBenefitsContainer.classList.remove('hidden');
        } else {
            totalBenefitsContainer.classList.add('hidden');
        }

        const totalBrutto = baseBrutto + totalBonus + totalBenefits;
    
        let taxBase = totalBrutto;
        
        let SZJA_RATE = 0.15;
        let TB_RATE = 0.185;
    
        if (isEKHO) {
            SZJA_RATE = 0;
            TB_RATE = 0;
            const EKHO_RATE = 0.13;
            const PENSION_RATE = 0.09;
            const HEALTH_RATE = 0.04;
            let ekhoTax = totalBrutto * EKHO_RATE;
            let ekhoContribution = totalBrutto * (PENSION_RATE + HEALTH_RATE);
            let totalDeductions = ekhoTax + ekhoContribution;
            let netto = totalBrutto - totalDeductions;
            updateHoursDisplay('totalHours', totalHours + overtimeHours + vacationHours);
            updateDisplay('baseBrutto', baseBrutto);
            updateBreakdownDisplay('nightBreakdown', nightHours, nightBonus);
            updateBreakdownDisplay('eveningBreakdown', eveningHours, eveningBonus);
            updateBreakdownDisplay('weekendBreakdown', weekendHours, weekendBonus);
            updateBreakdownDisplay('overtimeBreakdown', overtimeHours, overtimeBonus);
            updateDisplay('vacationHours', vacationPay);
            updateHoursDisplay('vacationHours', vacationHours);
            updateDisplay('totalBonus', totalBonus);
            updateDisplay('totalBenefits', totalBenefits);
            updateDisplay('nettoOutput', netto);
            updateChart(chartData);
            return;
        }

        if (isUnder25 || isUnder30mother || isMother4plus) {
            let limit = 576601; // 2024-es átlagkereset * 12
            let deduction = Math.min(taxBase, limit);
            taxBase -= deduction;
        }
    
        let personalDeduction = 0;
        if (isPersonalDeduction) {
            personalDeduction = 13335;
        }
    
        let marriedDeduction = 0;
        if (isMarried) {
            marriedDeduction = 5000;
        }
    
        let tax = (taxBase - personalDeduction - marriedDeduction) * SZJA_RATE;
        if (tax < 0) tax = 0;
    
        let deductions = 0;
        if (isRetiredEmployee) {
            deductions = tax;
        } else {
            deductions = tax + (totalBrutto * TB_RATE);
        }
    
        let savings = 0;
        if (isUnder25) savings += totalBrutto * 0.15; // Egyszerűsített számítás
        if (isUnder30mother) savings += totalBrutto * 0.15;
        if (isMarried) savings += 5000;
        if (isPersonalDeduction) savings += 13335;
        if (isMother4plus) savings = totalBrutto * 0.15;
    
        const netto = totalBrutto - deductions;
    
        updateHoursDisplay('totalHours', totalHours + overtimeHours + vacationHours);
        updateDisplay('baseBrutto', baseBrutto);
        updateBreakdownDisplay('nightBreakdown', nightHours, nightBonus);
        updateBreakdownDisplay('eveningBreakdown', eveningHours, eveningBonus);
        updateBreakdownDisplay('weekendBreakdown', weekendHours, weekendBonus);
        updateBreakdownDisplay('overtimeBreakdown', overtimeHours, overtimeBonus);
        updateHoursDisplay('vacationHours', vacationHours);
        updateDisplay('totalBonus', totalBonus);
        updateDisplay('totalBenefits', totalBenefits);
        updateDisplay('totalSavings', savings);
        updateDisplay('nettoOutput', netto);
        
        updateSavingsList(isUnder25, isUnder30mother, isMarried, isPersonalDeduction, isRetiredEmployee, isMother4plus, baseBrutto);
    
        updateChart(chartData);
    };
    
    const updateSavingsList = (isUnder25, isUnder30mother, isMarried, isPersonalDeduction, isRetiredEmployee, isMother4plus, baseBrutto) => {
        const savingsList = [];
        if (isUnder25) savingsList.push({ text: '25 év alatti adómentesség', value: baseBrutto * 0.15 });
        if (isUnder30mother) savingsList.push({ text: '30 év alatti anyuka', value: baseBrutto * 0.15 });
        if (isMother4plus) savingsList.push({ text: '4+ gyermeket nevelő anyák', value: baseBrutto * 0.15 });
        if (isPersonalDeduction) savingsList.push({ text: 'Személyi kedvezmény', value: 13335 });
        if (isMarried) savingsList.push({ text: 'Friss házasok', value: 5000 });
        if (isRetiredEmployee) savingsList.push({ text: 'Nyugdíjas munkavállaló', value: baseBrutto * 0.185 });
    
        savingsListEl.innerHTML = '';
        if (savingsList.length === 0) {
            savingsListEl.innerHTML = '<p class="text-gray-400" id="savings-placeholder">Jelölj be kedvezményeket a részletekhez.</p>';
        } else {
            savingsList.forEach(item => {
                const p = document.createElement('p');
                p.classList.add('text-sm', 'text-gray-300');
                p.textContent = `${item.text}: ${formatCurrency(item.value)}`;
                savingsListEl.appendChild(p);
            });
        }
    };

    const saveMonthlyData = () => {
        localStorage.setItem(`monthlyData-${currentDate.getFullYear()}-${currentDate.getMonth()}`, JSON.stringify(selectedDays));
    };

    const loadMonthlyData = () => {
        const data = localStorage.getItem(`monthlyData-${currentDate.getFullYear()}-${currentDate.getMonth()}`);
        if (data) {
            selectedDays = JSON.parse(data);
        } else {
            selectedDays = {};
        }
    };

    const renderCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();

        currentMonthEl.textContent = `${year}. ${new Intl.DateTimeFormat('hu-HU', { month: 'long' }).format(currentDate)}`;
        calendarDaysEl.innerHTML = '';

        let startDay = (firstDay.getDay() + 6) % 7;
        for (let i = 0; i < startDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('empty-day');
            calendarDaysEl.appendChild(emptyDay);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dayEl = document.createElement('div');
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            const dayData = selectedDays[dateStr];

            dayEl.dataset.date = dateStr;
            dayEl.dataset.dayOfWeek = new Date(dateStr).getDay();
            dayEl.classList.add('day', 'bg-gray-800', 'rounded-lg', 'shadow-md', 'transition-transform');

            let content = `<span class="font-bold">${i}</span>`;
            if (dayData) {
                if (dayData.isOvertime) {
                    dayEl.classList.add('overtime');
                    content += `<span class="hours">${dayData.overtimeHours} túlóra</span>`;
                } else if (dayData.isVacation) {
                    dayEl.classList.add('vacation');
                    content += `<span class="hours">${dayData.vacationHours} szabadság</span>`;
                } else {
                    dayEl.classList.add('selected');
                    content += `<span class="hours">${dayData.workHours} óra</span>`;
                }
            } else {
                content += '<span class="hours">0 óra</span>';
            }
            dayEl.innerHTML = content;

            dayEl.addEventListener('click', () => {
                activeDate = dateStr;
                
                if (dayData && dayData.isOvertime) {
                    overtimeCheckbox.checked = true;
                    vacationCheckbox.checked = false;
                    overtimeHoursInput.value = dayData.overtimeHours;
                    overtimeHoursInput.disabled = false;
                    vacationHoursInput.disabled = true;
                    startTimeInput.disabled = true;
                    endTimeInput.disabled = true;
                } else if (dayData && dayData.isVacation) {
                    vacationCheckbox.checked = true;
                    overtimeCheckbox.checked = false;
                    vacationHoursInput.value = dayData.vacationHours;
                    vacationHoursInput.disabled = false;
                    overtimeHoursInput.disabled = true;
                    startTimeInput.disabled = true;
                    endTimeInput.disabled = true;
                } else if (dayData && dayData.startTime && dayData.endTime) {
                    startTimeInput.value = dayData.startTime;
                    endTimeInput.value = dayData.endTime;
                    overtimeCheckbox.checked = false;
                    vacationCheckbox.checked = false;
                    overtimeHoursInput.disabled = true;
                    vacationHoursInput.disabled = true;
                    startTimeInput.disabled = false;
                    endTimeInput.disabled = false;
                } else {
                    startTimeInput.value = '';
                    endTimeInput.value = '';
                    overtimeCheckbox.checked = false;
                    vacationCheckbox.checked = false;
                    overtimeHoursInput.disabled = true;
                    vacationHoursInput.disabled = true;
                    startTimeInput.disabled = false;
                    endTimeInput.disabled = false;
                }
                shiftModal.style.display = 'flex';
            });
            calendarDaysEl.appendChild(dayEl);
        }
    };
    
    const handleMonthChange = (direction) => {
        const hasData = Object.keys(selectedDays).length > 0;
        if (hasData && monthChangeDirection !== direction) {
            pdfConfirmModal.style.display = 'flex';
            monthChangeDirection = direction;
        } else {
            changeMonth(direction);
        }
    };
    
    const changeMonth = (direction) => {
        if (direction === -1) {
            currentDate.setMonth(currentDate.getMonth() - 1);
        } else {
            currentDate.setMonth(currentDate.getMonth() + 1);
        }
        loadMonthlyData();
        renderCalendar();
        calculate();
    };

    closePdfModalBtn.addEventListener('click', () => {
        pdfConfirmModal.style.display = 'none';
        monthChangeDirection = 0;
    });

    prevBtn.addEventListener('click', () => handleMonthChange(-1));
    nextBtn.addEventListener('click', () => handleMonthChange(1));

    saveAndContinueBtn.addEventListener('click', () => {
        generatePDF();
        pdfConfirmModal.style.display = 'none';
        changeMonth(monthChangeDirection);
        monthChangeDirection = 0;
    });

    continueWithoutSavingBtn.addEventListener('click', () => {
        pdfConfirmModal.style.display = 'none';
        changeMonth(monthChangeDirection);
        monthChangeDirection = 0;
    });

    const generatePDF = () => {
        const content = document.querySelector('.container');
        html2canvas(content, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#0d1117'
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210;
            const pageHeight = 297;
            const imgHeight = canvas.height * imgWidth / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            pdf.save(`fizetes_kalkulator_${currentDate.getFullYear()}_${currentDate.getMonth() + 1}.pdf`);
        });
    };

    // Modal eseménykezelők
    overtimeCheckbox.addEventListener('change', () => {
        overtimeHoursInput.disabled = !overtimeCheckbox.checked;
        if (overtimeCheckbox.checked) {
            vacationCheckbox.checked = false;
            vacationHoursInput.disabled = true;
            startTimeInput.disabled = true;
            endTimeInput.disabled = true;
        } else if (!vacationCheckbox.checked) {
            startTimeInput.disabled = false;
            endTimeInput.disabled = false;
        }
    });

    vacationCheckbox.addEventListener('change', () => {
        vacationHoursInput.disabled = !vacationCheckbox.checked;
        if (vacationCheckbox.checked) {
            overtimeCheckbox.checked = false;
            overtimeHoursInput.disabled = true;
            startTimeInput.disabled = true;
            endTimeInput.disabled = true;
        } else if (!overtimeCheckbox.checked) {
            startTimeInput.disabled = false;
            endTimeInput.disabled = false;
        }
    });

    saveShiftBtn.addEventListener('click', () => {
        if (!activeDate) return;
    
        const shiftData = {
            isOvertime: overtimeCheckbox.checked,
            isVacation: vacationCheckbox.checked,
            startTime: startTimeInput.value,
            endTime: endTimeInput.value,
            overtimeHours: parseFloat(overtimeHoursInput.value) || 0,
            vacationHours: parseFloat(vacationHoursInput.value) || 0
        };

        if (shiftData.isOvertime) {
            delete shiftData.startTime;
            delete shiftData.endTime;
            delete shiftData.vacationHours;
        } else if (shiftData.isVacation) {
            delete shiftData.startTime;
            delete shiftData.endTime;
            delete shiftData.overtimeHours;
        } else {
            delete shiftData.overtimeHours;
            delete shiftData.vacationHours;
            const start = new Date(`2000-01-01T${shiftData.startTime}`);
            const end = new Date(`2000-01-01T${shiftData.endTime}`);
            if (end < start) end.setDate(end.getDate() + 1);
            shiftData.workHours = (end - start) / (1000 * 60 * 60);

            const nightStartHour = parseFloat(nightStartInput.value);
            const nightEndHour = parseFloat(nightEndInput.value);
            const eveningStartHour = parseFloat(eveningStartInput.value);
            const eveningEndHour = parseFloat(eveningEndInput.value);
            
            let nightHours = 0;
            let eveningHours = 0;

            const shiftStart = start.getHours() + start.getMinutes() / 60;
            const shiftEnd = end.getHours() + end.getMinutes() / 60;

            const calculateOverlap = (shiftStart, shiftEnd, periodStart, periodEnd) => {
                if (shiftEnd < shiftStart) shiftEnd += 24;
                if (periodEnd < periodStart) periodEnd += 24;
            
                const overlapStart = Math.max(shiftStart, periodStart);
                const overlapEnd = Math.min(shiftEnd, periodEnd);
                
                return Math.max(0, overlapEnd - overlapStart);
            };

            nightHours = calculateOverlap(shiftStart, shiftEnd, nightStartHour, nightEndHour);
            eveningHours = calculateOverlap(shiftStart, shiftEnd, eveningStartHour, eveningEndHour);

            shiftData.nightHours = nightHours;
            shiftData.eveningHours = eveningHours;
            shiftData.isWeekend = (new Date(activeDate).getDay() === 6 || new Date(activeDate).getDay() === 0);
            shiftData.dayOfWeek = new Date(activeDate).getDay();
        }
    
        if (!shiftData.isOvertime && !shiftData.isVacation && (shiftData.workHours <= 0 || isNaN(shiftData.workHours))) {
            delete selectedDays[activeDate];
        } else {
            selectedDays[activeDate] = shiftData;
        }
        shiftModal.style.display = 'none';
        saveMonthlyData();
        renderCalendar();
        calculate();
    });

    cancelShiftBtn.addEventListener('click', () => {
        if (activeDate) delete selectedDays[activeDate];
        shiftModal.style.display = 'none';
        saveMonthlyData();
        renderCalendar();
        calculate();
    });

    calculateBtn.addEventListener('click', calculate);

    loadSettings();
    loadMonthlyData();
    renderCalendar();
    calculate();
});
