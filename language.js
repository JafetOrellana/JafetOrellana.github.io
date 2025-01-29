// language.js

// Cargar el archivo JSON con las traducciones
let translations = {};
const sidebarLang = document.querySelector(".sidebar");


fetch('translations.json') // Ruta relativa al archivo JSON
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al cargar el archivo JSON');
        }
        return response.json();
    })
    .then(data => {
        translations = data;
        console.log(translations);

        // Establecer el idioma predeterminado al cargar la página
        const savedLanguage = localStorage.getItem('language');
        setLanguage(savedLanguage || getDefaultLanguage()); 
    })
    .catch(error => console.error('Error loading translations:', error));

// Obtener el idioma predeterminado del navegador
function getDefaultLanguage() {
    const browserLanguage = navigator.language || navigator.userLanguage;
    return browserLanguage.startsWith('es') ? 'es' : 'en'; // Si el idioma del navegador es español, usar 'es', de lo contrario 'en'
}

// Cambiar el idioma de la página
function setLanguage(language) {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[language] && translations[language][key]) {
            element.innerHTML = translations[language][key]; // Actualizar el contenido del elemento
        }
    });

    // Actualizar el texto del botón de cambio de idioma
    const languageButton = document.querySelector('.languageText');
    const tooltip = document.querySelector('.languageTooltip');
    if (languageButton) {
        languageButton.textContent = language === 'es' ? 'English' : 'Español';
        tooltip.textContent = language === 'es' ? 'English' : 'Español';
    }

    // Guardar la preferencia de idioma en localStorage
    localStorage.setItem('language', language);
}

// Cambiar entre español e inglés al hacer clic en el botón
function toggleLanguage() {
    const currentLanguage = localStorage.getItem('language') || getDefaultLanguage();
    const newLanguage = currentLanguage === 'es' ? 'en' : 'es';
    setLanguage(newLanguage);
    sidebarLang.classList.remove("active");

}

// Asignar el evento al botón de cambio de idioma
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('.languageButton');
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleLanguage);
    }
});
