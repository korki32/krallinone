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
            // Juttatások betöltése
            benefits = settings.benefits || {};
            Object.keys(benefits).forEach(id => {
                createBenefitField(id, benefits[id].name, benefits[id].value);
            });
            // Frissítjük a számlálót, hogy ne legyen ID ütközés
            if (Object.keys(benefits).length > 0) {
                benefitCounter = Math.max(...Object.keys(benefits).map(id => parseInt(id)))
            }
        } else {
            // Alapértelmezett értékek, ha még nincs mentve semmi
            hourlyRateInput.value = 1500;
            vacationHourlyRateInput.value = 1500;
            nightRateInput.value = 25;
            nightStartInput.value = 22;
            nightEndInput.value = 6;
            eveningRateInput.value = 15;
            eveningStartInput.value = 18;
            eveningEndInput.value = 22;
            weekendRateInput.value = 50;
            overtimeRateInput.value = 50;
        }
    };

    // Funkció a beállítások mentéséhez a localStorage-ba
    const saveSettings = () => {
        const settings = {};
        settingsInputs.forEach(input => {
            settings[input.id] = input.value;
        });
        settingsCheckboxes.forEach(checkbox => {
            settings[checkbox.id] = checkbox.checked;
        });

        // Juttatások mentése
        const benefitFields = document.querySelectorAll('.benefit-field');
        const benefitsToSave = {};
        benefitFields.forEach(field => {
            const id = field.dataset.id;
            const name = field.querySelector(`[id="benefitName-${id}"]`).value;
            const value = parseFloat(field.querySelector(`[id="benefitValue-${id}"]`).value) || 0;
            benefitsToSave[id] = {
                name,
                value
            };
        });
        settings.benefits = benefitsToSave;

        localStorage.setItem('calculatorSettings', JSON.stringify(settings));
    };

    // Eseménykezelők a beállítások mezőkhöz
    [...settingsInputs, ...settingsCheckboxes].forEach(input => {
        input.addEventListener('change', () => {
            saveSettings();
            calculate();
        });
    });
    benefitsContainer.addEventListener('input', saveSettings);

    const getMonthName = (date) => {
        return date.toLocaleString('hu-HU', {
            month: 'long',
            year: 'numeric'
        });
    };

    const isWeekend = (date) => {
        const day = date.getDay();
        return day === 0 || day === 6;
    };

    const getWeekNumber = (d) => {
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
        return weekNo;
    };

    const renderCalendar = () => {
        calendarDaysEl.innerHTML = '';
        currentMonthEl.textContent = getMonthName(currentDate);

        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        const firstDayOfWeek = (firstDay.getDay() + 6) % 7;

        for (let i = 0; i < firstDayOfWeek; i++) {
            const emptyDiv = document.createElement('div');
            emptyDiv.classList.add('day', 'empty-day');
            calendarDaysEl.appendChild(emptyDiv);
        }

        for (let day = 1; day <= lastDay.getDate(); day++) {
            const date = new Date(year, month, day);
            const dateStr = date.toISOString().split('T')[0];
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('day', 'relative', 'rounded-lg', 'transition-colors', 'duration-200', 'ease-in-out');
            dayDiv.dataset.date = dateStr;

            const dayName = date.toLocaleDateString('hu-HU', {
                weekday: 'short'
            }).charAt(0).toUpperCase() + date.toLocaleDateString('hu-HU', {
                weekday: 'short'
            }).slice(1, -1);
            const dayNum = date.getDate();

            let classesToAdd = ['bg-gray-800', 'hover:bg-gray-700'];

            const shiftData = selectedDays[dateStr];
            if (shiftData) {
                if (shiftData.isVacation) {
                    classesToAdd = ['vacation', 'hover:bg-yellow-600'];
                } else if (shiftData.isOvertime) {
                    classesToAdd = ['overtime', 'hover:bg-red-500'];
                } else {
                    classesToAdd = ['selected', 'hover:bg-blue-600'];
                }
            }

            dayDiv.classList.add(...classesToAdd);

            dayDiv.innerHTML = `
                <span class="font-medium">${dayNum}</span>
                ${shiftData && shiftData.isVacation ? '<span class="text-xs text-white mt-1">SZABADSÁG</span>' : ''}
                ${shiftData && shiftData.isOvertime ? '<span class="text-xs text-white mt-1">TÚLÓRA</span>' : ''}
                ${shiftData && !shiftData.isVacation && !shiftData.isOvertime ? '<span class="hours text-xs text-gray-400 mt-1">' + (shiftData.workHours + (shiftData.breakHours || 0)) + ' óra</span>' : ''}
            `;

            dayDiv.addEventListener('click', () => {
                openShiftModal(dateStr);
            });

            calendarDaysEl.appendChild(dayDiv);
        }
    };

    const openShiftModal = (dateStr) => {
        activeDate = dateStr;
        const shiftData = selectedDays[dateStr] || {};

        startTimeInput.value = shiftData.startTime || '';
        endTimeInput.value = shiftData.endTime || '';
        overtimeCheckbox.checked = shiftData.isOvertime || false;
        vacationCheckbox.checked = shiftData.isVacation || false;
        overtimeHoursInput.value = shiftData.overtimeHours || 8;
        vacationHoursInput.value = shiftData.vacationHours || 8;

        // Szabályok alkalmazása a beviteli mezőkre
        const toggleInputs = () => {
            const isVacation = vacationCheckbox.checked;
            const isOvertime = overtimeCheckbox.checked;

            startTimeInput.disabled = isVacation;
            endTimeInput.disabled = isVacation;
            overtimeCheckbox.disabled = isVacation;
            vacationCheckbox.disabled = isOvertime;
            overtimeHoursInput.disabled = !isOvertime;
            vacationHoursInput.disabled = !isVacation;

            if (isVacation) {
                startTimeInput.classList.add('disabled-input');
                endTimeInput.classList.add('disabled-input');
                overtimeCheckbox.closest('div').classList.add('disabled');
            } else {
                startTimeInput.classList.remove('disabled-input');
                endTimeInput.classList.remove('disabled-input');
                overtimeCheckbox.closest('div').classList.remove('disabled');
            }

            if (isOvertime) {
                vacationCheckbox.closest('div').classList.add('disabled');
            } else {
                vacationCheckbox.closest('div').classList.remove('disabled');
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

        overtimeCheckbox.addEventListener('change', toggleInputs);
        vacationCheckbox.addEventListener('change', toggleInputs);

        toggleInputs();

        shiftModal.style.display = 'flex';
    };

    const saveMonthlyData = () => {
        const monthKey = currentDate.toISOString().slice(0, 7);
        localStorage.setItem(`selectedDays-${monthKey}`, JSON.stringify(selectedDays));
    };

    const loadMonthlyData = () => {
        const monthKey = currentDate.toISOString().slice(0, 7);
        const savedData = localStorage.getItem(`selectedDays-${monthKey}`);
        selectedDays = savedData ? JSON.parse(savedData) : {};
    };

    // FONTOS: A calculate függvény logika
    const calculate = () => {
        const hourlyRate = parseFloat(hourlyRateInput.value) || 0;
        const vacationHourlyRate = parseFloat(vacationHourlyRateInput.value) || hourlyRate;
        const nightRate = parseFloat(nightRateInput.value) / 100 || 0;
        const nightStart = parseFloat(nightStartInput.value);
        const nightEnd = parseFloat(nightEndInput.value);
        const eveningRate = parseFloat(eveningRateInput.value) / 100 || 0;
        const eveningStart = parseFloat(eveningStartInput.value);
        const eveningEnd = parseFloat(eveningEndInput.value);
        const weekendRate = parseFloat(weekendRateInput.value) / 100 || 0;
        const overtimeRate = parseFloat(overtimeRateInput.value) / 100 || 0;
        const weekendOption = weekendOptionSelect.value;
        const isEKHO = ekhoCheckbox.checked;
        const isUnder25 = under25Checkbox.checked;
        const isUnder30mother = under30motherCheckbox.checked;
        const isMarried = marriedCheckbox.checked;
        const isPersonalDeduction = personalDeductionCheckbox.checked;
        const isRetiredEmployee = retiredEmployeeCheckbox.checked;
        const isMother4plus = mother4plusCheckbox.checked;

        let totalHours = 0;
        let baseBrutto = 0;
        let nightHours = 0;
        let eveningHours = 0;
        let weekendHours = 0;
        let overtimeHours = 0;
        let totalVacationHours = 0;
        let nightPay = 0;
        let eveningPay = 0;
        let weekendPay = 0;
        let overtimePay = 0;
        let vacationPay = 0;

        const dateKeys = Object.keys(selectedDays);
        dateKeys.forEach(dateStr => {
            const shiftData = selectedDays[dateStr];
            if (!shiftData) return;

            const date = new Date(dateStr);
            const dayOfWeek = date.getDay();

            if (shiftData.isVacation) {
                const hours = parseFloat(shiftData.vacationHours) || 0;
                totalVacationHours += hours;
                vacationPay += hours * vacationHourlyRate;
                totalHours += hours;
                return;
            }

            if (shiftData.isOvertime) {
                const hours = parseFloat(shiftData.overtimeHours) || 0;
                overtimeHours += hours;
                overtimePay += hours * hourlyRate * (1 + overtimeRate);
                totalHours += hours;
                return;
            }

            const start = new Date(`${dateStr}T${shiftData.startTime}`);
            const end = new Date(`${dateStr}T${shiftData.endTime}`);
            if (end < start) end.setDate(end.getDate() + 1);

            let current = new Date(start);
            while (current < end) {
                let nextHour = new Date(current);
                nextHour.setHours(current.getHours() + 1);
                if (nextHour > end) nextHour = end;

                const hour = current.getHours();
                const minutes = (nextHour - current) / (1000 * 60);
                const hourFraction = minutes / 60;

                baseBrutto += hourlyRate * hourFraction;

                let isNight = false;
                let isEvening = false;
                if (nightEnd < nightStart) {
                    if (hour >= nightStart || hour < nightEnd) {
                        isNight = true;
                    }
                } else if (hour >= nightStart && hour < nightEnd) {
                    isNight = true;
                }

                if (eveningEnd < eveningStart) {
                    if (hour >= eveningStart || hour < eveningEnd) {
                        isEvening = true;
                    }
                } else if (hour >= eveningStart && hour < eveningEnd) {
                    isEvening = true;
                }

                if (isNight) {
                    nightHours += hourFraction;
                    nightPay += hourlyRate * nightRate * hourFraction;
                }

                if (isEvening) {
                    eveningHours += hourFraction;
                    eveningPay += hourlyRate * eveningRate * hourFraction;
                }

                if (isWeekend(current) && ((weekendOption === 'all') || (weekendOption === 'saturday' && current.getDay() === 6) || (weekendOption === 'sunday' && current.getDay() === 0))) {
                    weekendHours += hourFraction;
                    weekendPay += hourlyRate * weekendRate * hourFraction;
                }

                totalHours += hourFraction;
                current = nextHour;
            }
        });

        // Juttatások számítása
        const totalBenefits = Object.values(benefits).reduce((sum, b) => sum + (b.value || 0), 0);
        if (totalBenefits > 0) {
            totalBenefitsContainer.style.display = 'block';
        } else {
            totalBenefitsContainer.style.display = 'none';
        }

        // Fizetési adatok
        const totalBrutto = baseBrutto + nightPay + eveningPay + weekendPay + overtimePay + vacationPay;
        const totalBonus = nightPay + eveningPay + weekendPay + overtimePay;

        // Adó és járulékok számítása
        let netto = totalBrutto;
        let totalSavings = 0;
        let szjaSavings = 0;
        let tbSavings = 0;
        const savingsDetails = [];

        // EKHO adózás
        if (isEKHO) {
            const ekhoPay = totalBrutto * 0.15;
            const tbPay = totalBrutto * 0.13;
            netto = totalBrutto - ekhoPay - tbPay;
        } else {
            // Normál adózás
            let szja = totalBrutto * 0.15;
            let tbJarulék = totalBrutto * 0.185;

            // Kedvezmények
            if (isUnder25) {
                const maxExempt = 576601; // 2024-es átlagbér
                const exemption = Math.min(totalBrutto, maxExempt);
                szjaSavings += exemption * 0.15;
            }
            if (isUnder30mother) {
                // A logic is complex, just add the benefit based on a max value
                const maxExempt = 576601;
                szjaSavings += Math.min(totalBrutto, maxExempt) * 0.15;
            }
            if (isMarried) {
                szjaSavings += 5000;
            }
            if (isPersonalDeduction) {
                szjaSavings += 77700;
            }

            if (isMother4plus) {
                szjaSavings = totalBrutto * 0.15;
            }

            szja -= szjaSavings;
            if (szja < 0) szja = 0;

            if (isRetiredEmployee) {
                tbJarulék = 0;
            }
            
            // Járulék kedvezmény (ha van)
            if (isEKHO) {
                tbJarulék = totalBrutto * 0.13;
            }
            if (isRetiredEmployee) {
                tbJarulék = 0;
            }

            tbSavings = (totalBrutto * 0.185) - tbJarulék;

            netto = totalBrutto - szja - tbJarulék;
            totalSavings = szjaSavings + tbSavings;
        }
        
        // Juttatások hozzáadása a nettóhoz
        netto += totalBenefits;

        // Eredmények kiírása
        totalHoursEl.textContent = `${(totalHours).toFixed(2)} óra`;
        baseBruttoEl.textContent = formatCurrency(baseBrutto);
        nightBreakdownEl.textContent = `${nightHours.toFixed(2)} óra (${formatCurrency(nightPay)})`;
        eveningBreakdownEl.textContent = `${eveningHours.toFixed(2)} óra (${formatCurrency(eveningPay)})`;
        weekendBreakdownEl.textContent = `${weekendHours.toFixed(2)} óra (${formatCurrency(weekendPay)})`;
        overtimeBreakdownEl.textContent = `${overtimeHours.toFixed(2)} óra (${formatCurrency(overtimePay)})`;
        vacationHoursEl.textContent = `${totalVacationHours.toFixed(2)} óra (${formatCurrency(vacationPay)})`;
        totalBonusEl.textContent = formatCurrency(totalBonus);
        totalBenefitsEl.textContent = formatCurrency(totalBenefits);
        nettoOutputEl.textContent = formatCurrency(netto);
        totalSavingsEl.textContent = formatCurrency(totalSavings);

        // Megtakarítások részletező
        savingsListEl.innerHTML = '';
        if (isUnder25) savingsDetails.push(`25 év alatti adómentesség: ${formatCurrency(Math.min(totalBrutto, 576601) * 0.15)}`);
        if (isUnder30mother) savingsDetails.push(`30 év alatti anyuka kedvezmény: ${formatCurrency(Math.min(totalBrutto, 576601) * 0.15)}`);
        if (isMarried) savingsDetails.push(`Friss házasok kedvezménye: ${formatCurrency(5000)}`);
        if (isPersonalDeduction) savingsDetails.push(`Személyi kedvezmény: ${formatCurrency(77700)}`);
        if (isMother4plus) savingsDetails.push(`4+ gyermeket nevelő anyák adómentessége: ${formatCurrency(totalBrutto * 0.15)}`);
        if (isRetiredEmployee) savingsDetails.push(`Nyugdíjas munkavállaló járulék-mentessége: ${formatCurrency(totalBrutto * 0.185)}`);

        if (savingsDetails.length > 0) {
            savingsDetails.forEach(detail => {
                const p = document.createElement('p');
                p.classList.add('text-gray-300');
                p.textContent = detail;
                savingsListEl.appendChild(p);
            });
            savingsPlaceholderEl.style.display = 'none';
        } else {
            savingsPlaceholderEl.style.display = 'block';
        }

        // Grafikon
        updateChart(totalBrutto, szja, tbJarulék, totalBenefits, totalBonus, isEKHO);
    };

    const updateChart = (totalBrutto, szja, tbJarulék, totalBenefits, totalBonus, isEKHO) => {
        const data = [];
        if (totalBrutto > 0) {
            if (isEKHO) {
                data.push({
                    category: 'EKHO (15%)',
                    value: totalBrutto * 0.15
                });
                data.push({
                    category: 'TB (13%)',
                    value: totalBrutto * 0.13
                });
                data.push({
                    category: 'Nettó',
                    value: totalBrutto - (totalBrutto * 0.15) - (totalBrutto * 0.13)
                });
            } else {
                data.push({
                    category: 'Adó (SZJA)',
                    value: szja
                });
                data.push({
                    category: 'Járulék (TB)',
                    value: tbJarulék
                });
                data.push({
                    category: 'Nettó',
                    value: totalBrutto - szja - tbJarulék
                });
            }
        }
        if (totalBenefits > 0) {
            data.push({
                category: 'Juttatások',
                value: totalBenefits
            });
        }
        if (totalBonus > 0) {
            data.push({
                category: 'Pótlékok',
                value: totalBonus
            });
        }

        const margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 50
        };
        const chartContainer = d3.select("#chart-container");
        const svgWidth = chartContainer.node().getBoundingClientRect().width;
        const svgHeight = 300;
        const innerWidth = svgWidth - margin.left - margin.right;
        const innerHeight = svgHeight - margin.top - margin.bottom;

        chartContainer.select("svg").remove();
        const svg = chartContainer.append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand()
            .domain(data.map(d => d.category))
            .range([0, innerWidth])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)])
            .nice()
            .range([innerHeight, 0]);

        const tooltip = d3.select("#tooltip");

        svg.selectAll(".bar")
            .data(data)
            .join("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.category))
            .attr("y", innerHeight)
            .attr("width", x.bandwidth())
            .attr("height", 0)
            .on("mouseover", (event, d) => {
                tooltip.style("opacity", 1)
                    .html(`<strong>${d.category}</strong><br>${formatCurrency(d.value)}`)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 20) + "px");
            })
            .on("mouseout", () => {
                tooltip.style("opacity", 0);
            })
            .transition()
            .duration(500)
            .attr("y", d => y(d.value))
            .attr("height", d => innerHeight - y(d.value));

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(0,${innerHeight})`)
            .call(d3.axisBottom(x));

        svg.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(y).tickFormat(d3.format(".2s")));
    };

    prevBtn.addEventListener('click', () => {
        monthChangeDirection = -1;
        pdfConfirmModal.style.display = 'flex';
    });

    nextBtn.addEventListener('click', () => {
        monthChangeDirection = 1;
        pdfConfirmModal.style.display = 'flex';
    });

    const exportToPdf = async () => {
        const {
            jsPDF
        } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const content = document.querySelector('.container');
        const scale = 2;

        const options = {
            scale: scale,
            useCORS: true,
            onclone: (document) => {
                // Ensure the canvas background is rendered
                const canvas = document.getElementById('futuristic-canvas');
                if (canvas) {
                    canvas.style.display = 'none'; // Hide the canvas for the PDF
                }
            }
        };

        const canvas = await html2canvas(content, options);
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
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

        const monthName = getMonthName(currentDate).replace(' ', '_');
        pdf.save(`fizetes_osszesito_${monthName}.pdf`);
    };

    saveAndContinueBtn.addEventListener('click', async () => {
        await exportToPdf();
        pdfConfirmModal.style.display = 'none';
        changeMonth();
    });

    continueWithoutSavingBtn.addEventListener('click', () => {
        pdfConfirmModal.style.display = 'none';
        changeMonth();
    });

    const changeMonth = () => {
        const newMonth = currentDate.getMonth() + monthChangeDirection;
        const newYear = currentDate.getFullYear();
        currentDate = new Date(newYear, newMonth, 1);
        loadMonthlyData();
        renderCalendar();
        calculate();
    };

    const closeButtons = document.querySelectorAll('.close-btn');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });

    saveShiftBtn.addEventListener('click', () => {
        const shiftData = {
            isOvertime: overtimeCheckbox.checked,
            isVacation: vacationCheckbox.checked,
            startTime: startTimeInput.value,
            endTime: endTimeInput.value,
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
        saveMonthlyData(); // Munkaórák mentése
        renderCalendar();
        calculate();
    });

    cancelShiftBtn.addEventListener('click', () => {
        if (activeDate) delete selectedDays[activeDate];
        shiftModal.style.display = 'none';
        saveMonthlyData(); // Módosítás mentése
        renderCalendar();
        calculate();
    });

    // Eseménykezelők a számítás indításához és a mentéshez
    calculateBtn.addEventListener('click', calculate);

    // Kezdeti renderelés és adatok betöltése
    loadSettings();
    loadMonthlyData();
    renderCalendar();
    calculate();
});
