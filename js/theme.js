// Função para alternar o tema
function toggleTheme() {
    // Verifica se o corpo tem a classe dark-mode
    const isDarkMode = document.body.classList.contains('dark-mode');
    const themeIcon = document.querySelector('.theme-switch-icon');
    
    // Adiciona logs para depuração
    console.log('Alternando tema. Tema atual é escuro?', isDarkMode);
    
    // Alterna entre os temas
    if (isDarkMode) {
        // Mudando para tema claro
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
        
        // Verifica qual ícone está ativo antes de tentar substituir
        if (themeIcon) {
            themeIcon.classList.remove('bi-sun-fill');
            themeIcon.classList.add('bi-moon-fill');
        }
        
        // Atualiza o favicon para o tema claro
        updateFavicon('light');
        console.log('Tema alterado para: claro');
    } else {
        // Mudando para tema escuro
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        
        // Verifica qual ícone está ativo antes de tentar substituir
        if (themeIcon) {
            themeIcon.classList.remove('bi-moon-fill');
            themeIcon.classList.add('bi-sun-fill');
        }
        
        // Atualiza o favicon para o tema escuro
        updateFavicon('dark');
        console.log('Tema alterado para: escuro');
    }
    
    // Forçar atualização de estilos em todos os elementos
    document.querySelectorAll('*').forEach(element => {
        if (element.style) {
            const compStyle = window.getComputedStyle(element);
            element.style.color = compStyle.color;
            element.style.backgroundColor = compStyle.backgroundColor;
        }
    });
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
    
    console.log('Inicializando tema. Tema salvo:', savedTheme);
    
    if (savedTheme) {
        // Aplica o tema salvo
        if (savedTheme === 'dark') {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            
            if (themeIcon) {
                themeIcon.classList.remove('bi-moon-fill');
                themeIcon.classList.add('bi-sun-fill');
            }
            
            updateFavicon('dark');
            console.log('Tema escuro aplicado do localStorage');
        } else {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            
            if (themeIcon) {
                themeIcon.classList.remove('bi-sun-fill');
                themeIcon.classList.add('bi-moon-fill');
            }
            
            updateFavicon('light');
            console.log('Tema claro aplicado do localStorage');
        }
    } else {
        // Verifica a preferência do sistema
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
        console.log('Sem tema salvo, verificando preferência do sistema. Prefere escuro?', prefersDarkScheme);
        
        if (prefersDarkScheme) {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            
            if (themeIcon) {
                themeIcon.classList.remove('bi-moon-fill');
                themeIcon.classList.add('bi-sun-fill');
            }
            
            updateFavicon('dark');
            console.log('Tema escuro aplicado da preferência do sistema');
        } else {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            
            if (themeIcon) {
                themeIcon.classList.remove('bi-sun-fill');
                themeIcon.classList.add('bi-moon-fill');
            }
            
            updateFavicon('light');
            console.log('Tema claro aplicado da preferência do sistema');
        }
    }
}

// Adiciona o evento de alternar tema ao botão de tema
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, configurando alternador de tema');
    
    const themeToggle = document.querySelector('.theme-switch-wrapper');
    const themeIcon = document.querySelector('.theme-switch-icon');
    
    if (themeToggle && themeIcon) {
        console.log('Elementos de alternância de tema encontrados');
        
        // Verificar se os ícones corretos estão presentes
        if (!themeIcon.classList.contains('bi-sun-fill') && !themeIcon.classList.contains('bi-moon-fill')) {
            // Adicionar classe padrão se nenhuma das classes estiver presente
            themeIcon.classList.add('bi-moon-fill');
            console.log('Classe de ícone padrão adicionada');
        }
        
        // Garantir que o evento de clique seja adicionado apenas uma vez
        themeToggle.removeEventListener('click', toggleTheme);
        themeToggle.addEventListener('click', toggleTheme);
        console.log('Evento de clique adicionado ao alternador de tema');
        
        // Inicializa o tema
        initTheme();
        
        // Verifica a visibilidade do botão de alternar tema
        const computedStyle = window.getComputedStyle(themeToggle);
        if (computedStyle.display === 'none' || computedStyle.visibility === 'hidden') {
            console.warn('O alternador de tema está oculto ou invisível!');
        }
        
        // Adiciona um status visual para debug
        const statusIndicator = document.createElement('span');
        statusIndicator.id = 'theme-status';
        statusIndicator.style.position = 'fixed';
        statusIndicator.style.bottom = '5px';
        statusIndicator.style.right = '5px';
        statusIndicator.style.fontSize = '10px';
        statusIndicator.style.padding = '2px 5px';
        statusIndicator.style.background = 'rgba(0,0,0,0.5)';
        statusIndicator.style.color = 'white';
        statusIndicator.style.borderRadius = '3px';
        statusIndicator.style.zIndex = '9999';
        statusIndicator.style.opacity = '0.7';
        
        statusIndicator.textContent = document.body.classList.contains('dark-mode') ? 'Tema Escuro' : 'Tema Claro';
        document.body.appendChild(statusIndicator);
    } else {
        console.error('Elementos de alternância de tema não encontrados');
        if (!themeToggle) console.error('Elemento .theme-switch-wrapper não encontrado');
        if (!themeIcon) console.error('Elemento .theme-switch-icon não encontrado');
    }
    
    // Adiciona listener para mudanças na preferência do sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            console.log('Preferência do sistema alterada. Prefere escuro?', e.matches);
            const themeIcon = document.querySelector('.theme-switch-icon');
            
            if (e.matches) {
                document.body.classList.remove('light-mode');
                document.body.classList.add('dark-mode');
                
                if (themeIcon) {
                    themeIcon.classList.remove('bi-moon-fill');
                    themeIcon.classList.add('bi-sun-fill');
                }
                
                updateFavicon('dark');
                
                const statusIndicator = document.getElementById('theme-status');
                if (statusIndicator) statusIndicator.textContent = 'Tema Escuro';
            } else {
                document.body.classList.remove('dark-mode');
                document.body.classList.add('light-mode');
                
                if (themeIcon) {
                    themeIcon.classList.remove('bi-sun-fill');
                    themeIcon.classList.add('bi-moon-fill');
                }
                
                updateFavicon('light');
                
                const statusIndicator = document.getElementById('theme-status');
                if (statusIndicator) statusIndicator.textContent = 'Tema Claro';
            }
        }
    });
}); 