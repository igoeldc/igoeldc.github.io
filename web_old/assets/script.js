function scrollToSection(id) {
    const section = document.getElementById(id);
    section.scrollIntoView({ behavior: 'smooth' });
}

// Make the dropdown menu open by clicking instead of hovering
// document.getElementById('language-btn').addEventListener('click', function () {
//     const menu = document.getElementById('language-menu');
//     menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
// });