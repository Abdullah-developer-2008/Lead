document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('secure-contact-form');
    const statusMessageBox = document.getElementById('form-status-msg');

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            // Prevent normal, flat page-reloads
            event.preventDefault();

            // Extract real-time user metrics inputs values
            const clientName = document.getElementById('form-name').value.trim();
            const clientEmail = document.getElementById('form-email').value.trim();
            const clientTopic = document.getElementById('form-topic').value;
            const clientMessage = document.getElementById('form-message').value.trim();

            // Form validation fallback verification checkpoint
            if (!clientName || !clientEmail || !clientTopic || !clientMessage) {
                displaySystemStatus('CRITICAL ERROR: ALL INTAKE PORTAL DATA STRINGS MUST BE SPECIFIED.', 'error');
                return;
            }

            // Mock successful backend pipeline submission sequence simulation
            displaySystemStatus('TRANSMISSION SUCCESSFUL // ROUTING SECURE DATA PACKET TO THE CORE HIERARCHY...', 'success');
            
            // Clean out old form data layers post routing cycle completion
            contactForm.reset();
        });
    }

    // --- Dynamic Status Response Rendering Utility ---
    function displaySystemStatus(messageText, statusType) {
        // Reset current active structural presentation classes
        statusMessageBox.className = 'status-box-hidden';
        statusMessageBox.textContent = messageText;

        if (statusType === 'success') {
            statusMessageBox.classList.add('status-box-success');
        } else if (statusType === 'error') {
            statusMessageBox.classList.add('status-box-error');
        }

        // Auto-dismiss the tracking update frame after exactly 5 seconds
        setTimeout(() => {
            statusMessageBox.className = 'status-box-hidden';
            statusMessageBox.textContent = '';
        }, 5000);
    }
});