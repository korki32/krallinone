
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

        // Kalkulátor logika
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
        const benefitsContainer = document.getElementById('benefits-container');
        const addBenefitBtn = document.getElementById('addBenefitBtn');

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

        // Funkció a beállítások betöltéséhez a localStorage-ból
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
                    benefitCounter = Math.max(...Object.keys(benefits).map(id => parseInt(id)), 0);
                }
            }
        };

        // Funkció a beállítások mentéséhez
        const saveSettings = () => {
            const settings = {};
            settingsInputs.forEach(input => {
                settings[input.id] = input.value;
            });
            settingsCheckboxes.forEach(checkbox => {
                settings[checkbox.id] = checkbox.checked;
            });

            // Juttatások mentése
            const currentBenefits = {};
            document.querySelectorAll('.benefit-field').forEach(div => {
                const id = div.dataset.id;
                const name = div.querySelector('input[type="text"]').value;
                const value = parseFloat(div.querySelector('input[type="number"]').value) || 0;
                currentBenefits[id] = {
                    name,
                    value
                };
            });
            settings.benefits = currentBenefits;
            localStorage.setItem('calculatorSettings', JSON.stringify(settings));
        };

        // Lokális tároló a havi adatokhoz
        const getStorageKey = () => `monthlyData-${currentDate.getFullYear()}-${currentDate.getMonth()}`;

        const saveMonthlyData = () => {
            localStorage.setItem(getStorageKey(), JSON.stringify(selectedDays));
        };

        const loadMonthlyData = () => {
            const data = localStorage.getItem(getStorageKey());
            selectedDays = data ? JSON.parse(data) : {};
        };

        const monthNames = ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"];

        const renderCalendar = () => {
            calendarDaysEl.innerHTML = '';
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            currentMonthEl.textContent = `${monthNames[month]} ${year}`;

            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const numDays = lastDay.getDate();
            const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

            // Üres napok
            for (let i = 0; i < startDay; i++) {
                const emptyDay = document.createElement('div');
                emptyDay.classList.add('day', 'empty-day');
                calendarDaysEl.appendChild(emptyDay);
            }

            // Napok
            for (let i = 1; i <= numDays; i++) {
                const dayEl = document.createElement('div');
                const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
                dayEl.classList.add('day', 'bg-gray-700', 'rounded-lg', 'text-white', 'hover:bg-purple-800', 'hover:transform', 'hover:scale-105', 'transition-all', 'duration-200');
                dayEl.textContent = i;
                dayEl.dataset.date = dateString;

                if (selectedDays[dateString]) {
                    const data = selectedDays[dateString];
                    dayEl.classList.remove('bg-gray-700', 'hover:bg-purple-800');
                    if (data.isVacation) {
                        dayEl.classList.add('vacation', 'bg-yellow-600', 'hover:bg-yellow-700');
                    } else if (data.isOvertime) {
                        dayEl.classList.add('overtime', 'bg-red-600', 'hover:bg-red-700');
                    } else {
                        dayEl.classList.add('selected', 'bg-blue-600', 'hover:bg-blue-700');
                    }
                    const hoursSpan = document.createElement('span');
                    hoursSpan.classList.add('hours');
                    hoursSpan.textContent = `${data.workHours + data.overtimeHours + data.vacationHours} óra`;
                    dayEl.appendChild(hoursSpan);
                }

                dayEl.addEventListener('click', () => openShiftModal(dateString));
                calendarDaysEl.appendChild(dayEl);
            }
        };

        const openShiftModal = (dateString) => {
            activeDate = dateString;
            const existingData = selectedDays[dateString] || {
                startTime: '',
                endTime: '',
                isOvertime: false,
                isVacation: false,
                overtimeHours: 0,
                vacationHours: 0
            };

            startTimeInput.value = existingData.startTime;
            endTimeInput.value = existingData.endTime;
            overtimeCheckbox.checked = existingData.isOvertime;
            overtimeHoursInput.value = existingData.overtimeHours || 0;
            vacationCheckbox.checked = existingData.isVacation;
            vacationHoursInput.value = existingData.vacationHours || 0;

            updateModalInputs();

            shiftModal.style.display = 'flex';
        };

        const updateModalInputs = () => {
            const isOvertime = overtimeCheckbox.checked;
            const isVacation = vacationCheckbox.checked;

            startTimeInput.disabled = isVacation;
            endTimeInput.disabled = isVacation;
            overtimeHoursInput.disabled = !isOvertime;
            vacationHoursInput.disabled = !isVacation;
            overtimeCheckbox.disabled = isVacation;
            vacationCheckbox.disabled = isOvertime;

            if (isVacation) {
                startTimeInput.classList.add('disabled-input');
                endTimeInput.classList.add('disabled-input');
            } else {
                startTimeInput.classList.remove('disabled-input');
                endTimeInput.classList.remove('disabled-input');
            }
            if (!isOvertime) {
                overtimeHoursInput.classList.add('disabled-input');
            } else {
                overtimeHoursInput.classList.remove('disabled-input');
            }
            if (!isVacation) {
                vacationHoursInput.classList.add('disabled-input');
            } else {
                vacationHoursInput.classList.remove('disabled-input');
            }
        };

        overtimeCheckbox.addEventListener('change', updateModalInputs);
        vacationCheckbox.addEventListener('change', updateModalInputs);

        prevBtn.addEventListener('click', () => {
            monthChangeDirection = -1;
            const currentKey = getStorageKey();
            if (Object.keys(selectedDays).length > 0) {
                pdfConfirmModal.style.display = 'flex';
            } else {
                currentDate.setMonth(currentDate.getMonth() - 1);
                loadMonthlyData();
                renderCalendar();
                calculate();
            }
        });

        nextBtn.addEventListener('click', () => {
            monthChangeDirection = 1;
            const currentKey = getStorageKey();
            if (Object.keys(selectedDays).length > 0) {
                pdfConfirmModal.style.display = 'flex';
            } else {
                currentDate.setMonth(currentDate.getMonth() + 1);
                loadMonthlyData();
                renderCalendar();
                calculate();
            }
        });

        saveAndContinueBtn.addEventListener('click', () => {
            // Itt a PDF mentési logika lenne
            if (monthChangeDirection === 1) {
                currentDate.setMonth(currentDate.getMonth() + 1);
            } else if (monthChangeDirection === -1) {
                currentDate.setMonth(currentDate.getMonth() - 1);
            }
            loadMonthlyData();
            renderCalendar();
            calculate();
            pdfConfirmModal.style.display = 'none';
        });

        continueWithoutSavingBtn.addEventListener('click', () => {
            if (monthChangeDirection === 1) {
                currentDate.setMonth(currentDate.getMonth() + 1);
            } else if (monthChangeDirection === -1) {
                currentDate.setMonth(currentDate.getMonth() - 1);
            }
            selectedDays = {};
            loadMonthlyData();
            renderCalendar();
            calculate();
            pdfConfirmModal.style.display = 'none';
        });

        saveShiftBtn.addEventListener('click', () => {
            const shiftData = {
                startTime: startTimeInput.value,
                endTime: endTimeInput.value,
                isOvertime: overtimeCheckbox.checked,
                isVacation: vacationCheckbox.checked,
                overtimeHours: parseFloat(overtimeHoursInput.value) || 0,
                vacationHours: parseFloat(vacationHoursInput.value) || 0
            };

            const start = new Date(`2000-01-01T${shiftData.startTime}`);
            const end = new Date(`2000-01-01T${shiftData.endTime}`);
            if (end < start) end.setDate(end.getDate() + 1);
            const workHours = (end - start) / (1000 * 60 * 60);

            if (!shiftData.isOvertime && !shiftData.isVacation && workHours <= 0) {
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


        // === ANIMÁCIÓS FUNKCIÓ ===
        const animateValue = (elementId, start, end, prefix = '', suffix = '') => {
            const element = document.getElementById(elementId);
            if (!element) return;
            d3.select(element)
                .transition()
                .duration(500)
                .tween("text", function() {
                    const that = d3.select(this);
                    const i = d3.interpolateNumber(start, end);
                    return function(t) {
                        that.text(prefix + formatCurrency(i(t)).replace(' Ft', '') + suffix);
                    };
                })
                .on("end", function() {
                    element.textContent = prefix + formatCurrency(end) + suffix;
                });
        };

        // === D3.JS DIAGRAM LOGIKA ===
        const chartContainer = d3.select("#chart-container");
        let chartWidth = 0;
        let chartHeight = 0;
        let tooltip = null;

        const drawChart = (data) => {
            chartContainer.html('');
            chartWidth = chartContainer.node().getBoundingClientRect().width;
            chartHeight = 300;
            const margin = {
                top: 20,
                right: 20,
                bottom: 60,
                left: 60
            };
            const innerWidth = chartWidth - margin.left - margin.right;
            const innerHeight = chartHeight - margin.top - margin.bottom;

            const svg = chartContainer.append("svg")
                .attr("width", chartWidth)
                .attr("height", chartHeight)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            tooltip = d3.select("body").append("div")
                .attr("class", "tooltip");

            const x = d3.scaleBand()
                .domain(data.map(d => d.label))
                .range([0, innerWidth])
                .padding(0.2);

            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.value)])
                .nice()
                .range([innerHeight, 0]);

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", `translate(0,${innerHeight})`)
                .call(d3.axisBottom(x))
                .selectAll("text")
                .attr("transform", "rotate(-45)")
                .style("text-anchor", "end")
                .attr("dy", "0.5em");

            svg.append("g")
                .attr("class", "y axis")
                .call(d3.axisLeft(y).tickFormat(d3.format(".2s")));

            svg.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", d => x(d.label))
                .attr("y", d => y(0))
                .attr("width", x.bandwidth())
                .attr("height", 0)
                .attr("fill", "#6d28d9")
                .on("mouseover", (event, d) => {
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 1);
                    tooltip.html(`<strong>${d.label}:</strong> ${formatCurrency(d.value)}`)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 28) + "px");
                    d3.select(event.currentTarget).attr("fill", "#8b5cf6");
                })
                .on("mouseout", (event, d) => {
                    tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
                    d3.select(event.currentTarget).attr("fill", "#6d28d9");
                })
                .transition()
                .duration(750)
                .attr("y", d => y(d.value))
                .attr("height", d => innerHeight - y(d.value));

            svg.append("g")
                .attr("class", "x axis-label")
                .attr("transform", `translate(${innerWidth / 2}, ${innerHeight + margin.bottom - 10})`)
                .append("text")
                .text("Bruttó fizetés komponensei")
                .attr("fill", "#9ca3af");
        };

        // === FŐ SZÁMÍTÁSI LOGIKA ===
        const calculate = () => {
            saveSettings();
            const hourlyRate = parseFloat(hourlyRateInput.value) || 0;
            const vacationHourlyRate = parseFloat(vacationHourlyRateInput.value) || hourlyRate;
            const nightRate = parseFloat(nightRateInput.value) / 100 || 0;
            const nightStart = parseFloat(nightStartInput.value) || 22;
            const nightEnd = parseFloat(nightEndInput.value) || 6;
            const eveningRate = parseFloat(eveningRateInput.value) / 100 || 0;
            const eveningStart = parseFloat(eveningStartInput.value) || 14;
            const eveningEnd = parseFloat(eveningEndInput.value) || 22;
            const weekendRate = parseFloat(weekendRateInput.value) / 100 || 0;
            const weekendOption = weekendOptionSelect.value;
            const overtimeRate = parseFloat(overtimeRateInput.value) / 100 || 0;

            let totalHours = 0;
            let totalBaseBrutto = 0;
            let nightHours = 0;
            let eveningHours = 0;
            let weekendHours = 0;
            let overtimeHours = 0;
            let totalVacationHours = 0;

            const isWeekend = (date) => {
                const day = new Date(date).getDay();
                if (weekendOption === 'all') {
                    return day === 0 || day === 6;
                }
                if (weekendOption === 'saturday') {
                    return day === 6;
                }
                if (weekendOption === 'sunday') {
                    return day === 0;
                }
                return false;
            };

            Object.entries(selectedDays).forEach(([date, shift]) => {
                if (shift.isVacation) {
                    totalVacationHours += shift.vacationHours;
                } else if (shift.isOvertime) {
                    overtimeHours += shift.overtimeHours;
                } else {
                    let startHour = parseFloat(shift.startTime.split(':')[0]);
                    let endHour = parseFloat(shift.endTime.split(':')[0]);
                    let workDuration = endHour - startHour;
                    if (workDuration < 0) workDuration += 24;

                    totalHours += workDuration;

                    // Pótlék számítása
                    let currentNightHours = 0;
                    let currentEveningHours = 0;
                    let currentWeekendHours = 0;
                    for (let i = 0; i < workDuration; i++) {
                        const currentHour = (startHour + i) % 24;
                        const isNight = (nightEnd > nightStart) ? (currentHour >= nightStart && currentHour < nightEnd) : (currentHour >= nightStart || currentHour < nightEnd);
                        const isEvening = (eveningEnd > eveningStart) ? (currentHour >= eveningStart && currentHour < eveningEnd) : (currentHour >= eveningStart || currentHour < eveningEnd);

                        if (isNight) currentNightHours++;
                        if (isEvening) currentEveningHours++;
                        if (isWeekend(date)) currentWeekendHours++;
                    }
                    nightHours += currentNightHours;
                    eveningHours += currentEveningHours;
                    weekendHours += currentWeekendHours;
                }
            });

            const baseBrutto = totalHours * hourlyRate;
            const nightBonus = nightHours * hourlyRate * nightRate;
            const eveningBonus = eveningHours * hourlyRate * eveningRate;
            const weekendBonus = weekendHours * hourlyRate * weekendRate;
            const overtimeBonus = overtimeHours * hourlyRate * overtimeRate;
            const vacationBonus = totalVacationHours * vacationHourlyRate;

            const totalBonus = nightBonus + eveningBonus + weekendBonus + overtimeBonus + vacationBonus;
            let totalBenefits = 0;
            document.querySelectorAll('.benefit-field').forEach(div => {
                const value = parseFloat(div.querySelector('input[type="number"]').value) || 0;
                totalBenefits += value;
            });

            const totalBrutto = baseBrutto + totalBonus + totalBenefits;

            let szja = totalBrutto * 0.15;
            let tb = totalBrutto * 0.185;

            let totalSavings = 0;
            let savingsBreakdown = [];

            // Adó- és járulékkedvezmények
            if (ekhoCheckbox.checked) {
                // EKHO logikát implementálni, ami bonyolultabb
                savingsBreakdown.push({
                    name: "EKHO (Egyelőre nem támogatott)",
                    value: 0
                });
            } else {
                if (under25Checkbox.checked) {
                    const maxUnder25 = 576600;
                    const deduction = Math.min(totalBrutto, maxUnder25) * 0.15;
                    szja = Math.max(0, szja - deduction);
                    totalSavings += deduction;
                    savingsBreakdown.push({
                        name: "25 év alatti adómentesség",
                        value: deduction
                    });
                }
                if (under30motherCheckbox.checked) {
                    const maxUnder30 = 576600;
                    const deduction = Math.min(totalBrutto, maxUnder30) * 0.15;
                    szja = Math.max(0, szja - deduction);
                    totalSavings += deduction;
                    savingsBreakdown.push({
                        name: "30 év alatti anyuka",
                        value: deduction
                    });
                }
                if (marriedCheckbox.checked) {
                    const deduction = 5000;
                    szja = Math.max(0, szja - deduction);
                    totalSavings += deduction;
                    savingsBreakdown.push({
                        name: "Friss házasok kedvezménye",
                        value: deduction
                    });
                }
                if (personalDeductionCheckbox.checked) {
                    const deduction = 13335;
                    szja = Math.max(0, szja - deduction);
                    totalSavings += deduction;
                    savingsBreakdown.push({
                        name: "Személyi kedvezmény",
                        value: deduction
                    });
                }
                if (mother4plusCheckbox.checked) {
                    szja = 0;
                    totalSavings += totalBrutto * 0.15;
                    savingsBreakdown.push({
                        name: "4+ gyermeket nevelő anyák",
                        value: totalBrutto * 0.15
                    });
                }
                if (retiredEmployeeCheckbox.checked) {
                    tb = 0;
                    totalSavings += totalBrutto * 0.185;
                    savingsBreakdown.push({
                        name: "Nyugdíjas munkavállaló",
                        value: totalBrutto * 0.185
                    });
                }
            }

            const totalTax = szja + tb;
            const nettoSalary = totalBrutto - totalTax;

            // Frissítsd a DOM elemeket animálva
            animateValue('totalHours', parseFloat(totalHoursEl.textContent) || 0, totalHours, '', ' óra');
            animateValue('baseBrutto', parseFloat(baseBruttoEl.textContent) || 0, baseBrutto);
            animateValue('nightBreakdown', parseFloat(nightBreakdownEl.textContent) || 0, nightHours, '', ` óra (${formatCurrency(nightBonus)})`);
            animateValue('eveningBreakdown', parseFloat(eveningBreakdownEl.textContent) || 0, eveningHours, '', ` óra (${formatCurrency(eveningBonus)})`);
            animateValue('weekendBreakdown', parseFloat(weekendBreakdownEl.textContent) || 0, weekendHours, '', ` óra (${formatCurrency(weekendBonus)})`);
            animateValue('overtimeBreakdown', parseFloat(overtimeBreakdownEl.textContent) || 0, overtimeHours, '', ` óra (${formatCurrency(overtimeBonus)})`);
            animateValue('vacationHours', parseFloat(vacationHoursEl.textContent) || 0, totalVacationHours, '', ` óra (${formatCurrency(vacationBonus)})`);
            animateValue('totalBonus', parseFloat(totalBonusEl.textContent) || 0, totalBonus);
            animateValue('totalBenefits', parseFloat(totalBenefitsEl.textContent) || 0, totalBenefits);
            animateValue('nettoOutput', parseFloat(nettoOutputEl.textContent) || 0, nettoSalary);
            animateValue('totalSavings', parseFloat(totalSavingsEl.textContent) || 0, totalSavings);


            if (totalBenefits > 0) {
                totalBenefitsContainer.classList.remove('hidden');
            } else {
                totalBenefitsContainer.classList.add('hidden');
            }

            // Megtakarítási részletező frissítése
            if (savingsBreakdown.length > 0) {
                savingsListEl.innerHTML = savingsBreakdown.map(item => `<p class="text-gray-300">- ${item.name}: <span class="text-green-400 font-bold">${formatCurrency(item.value)}</span></p>`).join('');
                savingsPlaceholderEl.classList.add('hidden');
            } else {
                savingsListEl.innerHTML = '';
                savingsPlaceholderEl.classList.remove('hidden');
            }

            // Diagram adatainak előkészítése és kirajzolása
            const chartData = [{
                label: 'Alap Bruttó',
                value: baseBrutto
            }, {
                label: 'Pótlékok',
                value: totalBonus - vacationBonus
            }, {
                label: 'Juttatások',
                value: totalBenefits
            }, ];

            drawChart(chartData);

        };

        // Eseménykezelők
        settingsInputs.forEach(input => input.addEventListener('input', () => {
            saveSettings();
            calculate();
        }));

        settingsCheckboxes.forEach(checkbox => checkbox.addEventListener('change', () => {
            saveSettings();
            calculate();
        }));

        benefitsContainer.addEventListener('input', () => {
            saveSettings();
            calculate();
        });

        calculateBtn.addEventListener('click', calculate);

        // Kezdeti renderelés és adatok betöltése
        loadSettings();
        loadMonthlyData();
        renderCalendar();
        calculate();

        // Külön eseménykezelő a D3 diagram újrarajzolásához
        window.addEventListener('resize', () => {
            calculate();
        });
    });
