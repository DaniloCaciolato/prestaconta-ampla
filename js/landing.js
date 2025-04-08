/**
 * Script para a landing page do Portal de Transparência
 */

// Inicializa o portal quando a página é carregada
document.addEventListener('DOMContentLoaded', function() {
    carregarOrganizacoes();
    
    // Verificar se estamos em uma URL de ONG e redirecionar para a página correta
    verificarUrlAmigavel();
});

/**
 * Verifica se a URL atual é uma URL amigável de ONG e redireciona se necessário
 * Esta função simula o comportamento do .htaccess
 */
function verificarUrlAmigavel() {
    // Obter o caminho da URL atual
    const path = window.location.pathname;
    const urlAtual = window.location.href;
    const hostname = window.location.hostname;
    
    // Não fazer nada se já estivermos em uma página conhecida
    if (path.includes('index.html') || path.includes('ong.html')) {
        return;
    }
    
    // Verificar subdomínios
    if (hostname.includes('ampla.')) {
        window.location.href = 'ong.html?ong=ampla';
        return;
    }
    
    if (hostname.includes('basquete.') || 
        hostname.includes('epbe.') || 
        hostname.includes('palmitalense.')) {
        window.location.href = 'ong.html?ong=basquete';
        return;
    }
    
    // Extrair o slug da ONG da URL atual
    const match = path.match(/\/([^\/\.]+)\/?$/);
    if (match && match[1]) {
        const slug = match[1];
        
        // Verificar se o slug corresponde a uma ONG existente
        const ongExiste = organizacoes.some(org => org.slug === slug);
        if (ongExiste) {
            // Redirecionar para a página da ONG com o parâmetro
            window.location.href = `ong.html?ong=${slug}`;
        }
    }
}

/**
 * Carrega a lista de organizações disponíveis
 */
function carregarOrganizacoes() {
    const listaOrganizacoes = document.getElementById('lista-organizacoes');
    const botaoVoltar = document.querySelector('.nav-link[href="index.html"]');

    if (!listaOrganizacoes) return;

    // Limpa o conteúdo atual
    listaOrganizacoes.innerHTML = '';

    // Verifica se existem organizações para exibir
    if (!organizacoes || organizacoes.length === 0) {
        listaOrganizacoes.innerHTML = '<div class="col-12"><div class="alert alert-info">Nenhuma organização disponível no momento.</div></div>';
        return;
    }

    // Se houver apenas uma organização, redirecionar diretamente para ela e esconder o botão voltar
    if (organizacoes.length === 1) {
        const unicaOrg = organizacoes[0];
        if (botaoVoltar) {
            botaoVoltar.style.display = 'none';
        }
        window.location.href = `ong.html?ong=${unicaOrg.slug}`;
        return;
    }

    // Mostrar o botão voltar se houver mais de uma organização
    if (botaoVoltar) {
        botaoVoltar.style.display = 'block';
    }

    // Constrói os cards para cada organização
    organizacoes.forEach(org => {
        const card = document.createElement('div');
        card.className = 'col-md-6 col-lg-4 mb-4';
        
        // Usar URLs amigáveis para os links
        const urlAmigavel = `${org.slug}`;
        
        card.innerHTML = `
            <div class="card h-100 organizacao-card">
                <img src="${org.imagem || 'img/placeholder-ong.jpg'}" class="card-img-top" alt="${org.nome}" style="height: 180px; object-fit: cover;">
                <div class="card-body">
                    <h3 class="card-title h5">${org.nome}</h3>
                    <p class="card-text mb-2">${org.descricao.substring(0, 100)}${org.descricao.length > 100 ? '...' : ''}</p>
                    <p class="mb-2"><strong>CNPJ:</strong> <span>${org.cnpj}</span></p>
                    <a href="${urlAmigavel}" class="btn btn-primary mt-2 link-ong" data-slug="${org.slug}">Ver detalhes</a>
                </div>
            </div>
        `;
        
        listaOrganizacoes.appendChild(card);
    });
    
    // Adicionar manipuladores de eventos para os links das ONGs
    adicionarEventosLinks();
}

/**
 * Adiciona eventos de clique aos links das ONGs para simular URLs amigáveis
 */
function adicionarEventosLinks() {
    document.querySelectorAll('.link-ong').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const slug = this.getAttribute('data-slug');
            window.location.href = `ong.html?ong=${slug}`;
        });
    });
} 