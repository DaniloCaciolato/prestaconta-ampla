// Função para alternar o tema
function toggleTheme() {
    // Verifica se o corpo tem a classe dark-mode
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    // Alterna entre os temas
    if (isDarkMode) {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
        document.querySelector('.theme-switch-icon').classList.replace('bi-sun-fill', 'bi-moon-fill');
        // Atualiza o favicon para o tema claro
        updateFavicon('light');
    } else {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        document.querySelector('.theme-switch-icon').classList.replace('bi-moon-fill', 'bi-sun-fill');
        // Atualiza o favicon para o tema escuro
        updateFavicon('dark');
    }
}

// Função para atualizar o favicon de acordo com o tema
function updateFavicon(theme) {
    const faviconSvg = document.querySelector('link[rel="icon"][type="image/svg+xml"]');
    if (faviconSvg) {
        faviconSvg.href = theme === 'dark' ? 'img/favicon-dark.svg' : 'img/favicon.svg';
    }
}

// Função para inicializar o tema com base na preferência do usuário ou do sistema
function initTheme() {
    // Verifica se existe uma preferência salva no localStorage
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.querySelector('.theme-switch-icon');
    
    if (savedTheme) {
        // Aplica o tema salvo
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            if (themeIcon) themeIcon.classList.replace('bi-moon-fill', 'bi-sun-fill');
            updateFavicon('dark');
        } else {
            document.body.classList.add('light-mode');
            if (themeIcon) themeIcon.classList.replace('bi-sun-fill', 'bi-moon-fill');
            updateFavicon('light');
        }
    } else {
        // Verifica a preferência do sistema
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (prefersDarkScheme) {
            document.body.classList.add('dark-mode');
            if (themeIcon) themeIcon.classList.replace('bi-moon-fill', 'bi-sun-fill');
            updateFavicon('dark');
        } else {
            document.body.classList.add('light-mode');
            if (themeIcon) themeIcon.classList.replace('bi-sun-fill', 'bi-moon-fill');
            updateFavicon('light');
        }
    }
}

// Adiciona o evento de alternar tema ao botão de tema
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.querySelector('.theme-switch-wrapper');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
        
        // Inicializa o tema
        initTheme();
    }
    
    // Adiciona listener para mudanças na preferência do sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.body.classList.remove('light-mode');
                document.body.classList.add('dark-mode');
                document.querySelector('.theme-switch-icon').classList.replace('bi-moon-fill', 'bi-sun-fill');
                updateFavicon('dark');
            } else {
                document.body.classList.remove('dark-mode');
                document.body.classList.add('light-mode');
                document.querySelector('.theme-switch-icon').classList.replace('bi-sun-fill', 'bi-moon-fill');
                updateFavicon('light');
            }
        }
    });
}); 