// Tab functionality for the cooking academy website
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');

    // Function to switch tabs
    function switchTab(targetTab) {
        // Remove active class from all buttons and panels
        tabButtons.forEach(button => {
            button.classList.remove('active');
        });
        
        tabPanels.forEach(panel => {
            panel.classList.remove('active');
        });

        // Add active class to clicked button
        const activeButton = document.querySelector(`[data-tab="${targetTab}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }

        // Show corresponding panel
        const activePanel = document.getElementById(targetTab);
        if (activePanel) {
            activePanel.classList.add('active');
        }
    }

    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });

    // Optional: Add keyboard navigation support
    tabButtons.forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const targetTab = this.getAttribute('data-tab');
                switchTab(targetTab);
            }
        });
    });

    // Optional: Add arrow key navigation between tabs
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const activeButton = document.querySelector('.tab-button.active');
            if (activeButton) {
                const currentIndex = Array.from(tabButtons).indexOf(activeButton);
                let newIndex;
                
                if (e.key === 'ArrowLeft') {
                    newIndex = currentIndex > 0 ? currentIndex - 1 : tabButtons.length - 1;
                } else {
                    newIndex = currentIndex < tabButtons.length - 1 ? currentIndex + 1 : 0;
                }
                
                const targetTab = tabButtons[newIndex].getAttribute('data-tab');
                switchTab(targetTab);
                tabButtons[newIndex].focus();
            }
        }
    });
});
