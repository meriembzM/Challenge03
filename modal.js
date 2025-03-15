// modal.js
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const openModalButton = document.getElementById('open-modal');
    const closeModalButton = document.getElementById('close-modal');

    // Ouvrir la modale
    openModalButton.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    // Fermer la modale
    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Fermer la modale si l'utilisateur clique en dehors
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});