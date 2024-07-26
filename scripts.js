document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.nav-tab');
    const slider = document.querySelector('.nav-tab-slider');

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            slider.style.width = this.offsetWidth + 'px';
            slider.style.left = this.offsetLeft + 'px';
        });
    });
});
