/**
 * Script para a página de detalhes da ONG
 */

let dadosReceitas = [];
let dadosDespesas = [];
let dadosOng = null;

document.addEventListener('DOMContentLoaded', function() {
    // Tentar obter o slug da ONG de várias formas
    let orgSlug = null;
    
    // 1. Verificar parâmetro na URL
    const urlParams = new URLSearchParams(window.location.search);
    orgSlug = urlParams.get('ong');
    
    // 2. Verificar se está no caminho da URL (formato: /slug)
    if (!orgSlug) {
        const path = window.location.pathname;
        const match = path.match(/\/([^\/\.]+)\/?$/);
        if (match && match[1]) {
            orgSlug = match[1];
        }
    }
    
    console.log("Slug detectado:", orgSlug); // Para ajudar no debugging
    
    // Verificar se o slug existe e se os dados da ONG estão disponíveis
    if (!orgSlug || !dadosONGs[orgSlug]) {
        console.log("Slug não encontrado ou dados não disponíveis, redirecionando...");
        // Redirecionar para a página inicial se o slug não existir
        window.location.href = 'index.html';
        return;
    }
    
    // Verificar se o domínio atual corresponde à ONG solicitada
    const hostname = window.location.hostname;
    const dominioPermitido = verificarDominioPermitido(hostname, orgSlug);
    
    if (!dominioPermitido) {
        console.log("Acesso negado: domínio não autorizado para esta ONG");
        // Redirecionar para a página inicial se o domínio não for autorizado
        window.location.href = 'index.html';
        return;
    }
    
    // Carregar dados da ONG
    dadosOng = organizacoes.find(org => org.slug === orgSlug);
    dadosReceitas = dadosONGs[orgSlug].receitas;
    dadosDespesas = dadosONGs[orgSlug].despesas;
    
    // Atualizar o título da página com o nome da ONG
    document.title = `PrestaConta - ${dadosOng.nome}`;
    
    // Inicialização
    inicializarPortal();
});

/**
 * Verifica se o domínio atual tem permissão para acessar os dados da ONG
 * @param {string} hostname - O hostname atual
 * @param {string} ongSlug - O slug da ONG solicitada
 * @returns {boolean} - True se o domínio tem permissão, false caso contrário
 */
function verificarDominioPermitido(hostname, ongSlug) {
    // Se estiver em localhost ou IP, permitir acesso (para desenvolvimento)
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.includes('::1')) {
        return true;
    }
    
    // Verificar se o domínio corresponde à ONG
    if (ongSlug === 'ampla' && hostname.includes('ampla.')) {
        return true;
    }
    
    if (ongSlug === 'basquete' && (
        hostname.includes('basquete.') || 
        hostname.includes('epbe.') || 
        hostname.includes('palmitalense.')
    )) {
        return true;
    }
    
    // Se não houver correspondência, negar acesso
    return false;
}

/**
 * Inicializa todas as funcionalidades do portal
 */
function inicializarPortal() {
    // Adicionar classe específica da ONG ao body
    const urlParams = new URLSearchParams(window.location.search);
    const pathSlug = window.location.pathname.split('/').pop().replace('.html', '');
    const ongSlug = urlParams.get('ong') || pathSlug || 'ampla';
    
    // Remover classes existentes de ONG
    document.body.classList.remove('ong-ampla', 'ong-futuro');
    
    // Adicionar nova classe
    document.body.classList.add(`ong-${ongSlug}`);
    console.log('Classe adicionada ao body:', `ong-${ongSlug}`);
    
    // Carregar informações da ONG
    carregarInformacoesONG();
    
    // Carregar dados financeiros
    carregarReceitas();
    carregarDespesas();
    carregarLivrosContabeis();
    carregarMuralAvisos();
    atualizarResumoFinanceiro();
    
    // Configurar eventos
    configurarFiltros();
    configurarBuscas();
    configurarModais();
    
    // Mostrar efeito de entrada
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fadeIn');
    });
}

/**
 * Carrega as informações da ONG na página
 */
function carregarInformacoesONG() {
    // Verificar se o domínio atual corresponde à ONG solicitada
    const hostname = window.location.hostname;
    const urlParams = new URLSearchParams(window.location.search);
    const ongSlug = urlParams.get('ong') || 'ampla';
    const dominioPermitido = verificarDominioPermitido(hostname, ongSlug);
    
    if (!dominioPermitido) {
        console.log("Acesso negado: domínio não autorizado para esta ONG");
        // Redirecionar para a página inicial se o domínio não for autorizado
        window.location.href = 'index.html';
        return;
    }
    
    // Nome da ONG
    document.getElementById('ong-nome').textContent = dadosOng.nome;
    document.getElementById('footer-ong-nome').textContent = dadosOng.nome;
    document.getElementById('footer-ong-cnpj').textContent = `CNPJ: ${dadosOng.cnpj}`;
    document.title = `Portal de Transparência - ${dadosOng.nome}`;
    
    // Atualizar nome da ONG no título de boas-vindas
    const ongNomeTitulo = document.getElementById('ong-nome-titulo');
    if (ongNomeTitulo) {
        ongNomeTitulo.textContent = dadosOng.nome;
        ongNomeTitulo.classList.add('titulo-moderno');
    }
    
    // Descrição
    const descricaoElement = document.getElementById('ong-descricao');
    if (descricaoElement) {
        descricaoElement.classList.add('texto-moderno');
        descricaoElement.innerHTML = `
            <p>Este portal foi desenvolvido para garantir total transparência sobre os recursos financeiros da nossa organização.</p>
            <p>${dadosOng.descricao}</p>
        `;
    }
    
    // Contato
    const contatoContainer = document.getElementById('ong-contato');
    contatoContainer.innerHTML = `
        <li class="mb-2"><i class="bi bi-geo-alt-fill me-2"></i> ${dadosOng.contato.endereco}</li>
        <li class="mb-2"><i class="bi bi-telephone-fill me-2"></i> ${dadosOng.contato.telefone}</li>
        <li class="mb-2"><i class="bi bi-envelope-fill me-2"></i> ${dadosOng.contato.email}</li>
        <li class="mb-2"><i class="bi bi-clock-fill me-2"></i> ${dadosOng.contato.horario}</li>
    `;
    
    // Redes sociais
    const redesContainer = document.getElementById('ong-redes');
    let redesHTML = '';
    
    if (dadosOng.redesSociais.facebook) {
        redesHTML += `<a href="${dadosOng.redesSociais.facebook}" target="_blank" class="btn btn-outline-primary me-2"><i class="bi bi-facebook"></i></a>`;
    }
    
    if (dadosOng.redesSociais.instagram) {
        redesHTML += `<a href="${dadosOng.redesSociais.instagram}" target="_blank" class="btn btn-outline-primary me-2"><i class="bi bi-instagram"></i></a>`;
    }
    
    if (dadosOng.redesSociais.twitter) {
        redesHTML += `<a href="${dadosOng.redesSociais.twitter}" target="_blank" class="btn btn-outline-primary me-2"><i class="bi bi-twitter"></i></a>`;
    }
    
    if (dadosOng.redesSociais.whatsapp) {
        redesHTML += `<a href="${dadosOng.redesSociais.whatsapp}" target="_blank" class="btn btn-outline-primary"><i class="bi bi-whatsapp"></i></a>`;
    }
    
    redesContainer.innerHTML = redesHTML;
}

/**
 * Formata um valor para exibição como moeda
 */
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

/**
 * Formata uma data ISO para formato brasileiro
 */
function formatarData(dataISO) {
    const data = new Date(dataISO);
    return data.toLocaleDateString('pt-BR');
}

/**
 * Carrega as receitas da ONG
 */
function carregarReceitas(filtroAno = 'todos', filtroMes = 'todos', termoBusca = '') {
    // Verificar se o domínio atual corresponde à ONG solicitada
    const hostname = window.location.hostname;
    const urlParams = new URLSearchParams(window.location.search);
    const ongSlug = urlParams.get('ong') || 'ampla';
    const dominioPermitido = verificarDominioPermitido(hostname, ongSlug);
    
    if (!dominioPermitido) {
        console.log("Acesso negado: domínio não autorizado para esta ONG");
        return;
    }
    
    const tabelaReceitas = document.getElementById('tabela-receitas');
    const semReceitas = document.getElementById('sem-receitas');
    
    if (!tabelaReceitas) {
        console.error('Tabela de receitas não encontrada');
        return;
    }
    
    // Limpar a tabela
    tabelaReceitas.innerHTML = '';
    
    // Verificar se existem receitas
    if (!dadosReceitas || dadosReceitas.length === 0) {
        tabelaReceitas.style.display = 'none';
        semReceitas.style.display = 'block';
        semReceitas.innerHTML = `
            <div class="col-12 text-center py-5">
                <div class="d-flex flex-column align-items-center">
                    <i class="bi bi-hourglass-split display-4 text-primary mb-3"></i>
                    <h4 class="mb-2">Em breve</h4>
                    <p class="text-muted">As receitas serão exibidas aqui em breve.</p>
                </div>
            </div>
        `;
        document.getElementById('total-receitas').textContent = 'R$ 0,00';
        return;
    }
    
    // Aplicar filtros
    let receitasFiltradas = dadosReceitas;
    
    if (filtroAno !== 'todos') {
        receitasFiltradas = receitasFiltradas.filter(receita => receita.ano === filtroAno);
    }
    
    if (filtroMes !== 'todos') {
        receitasFiltradas = receitasFiltradas.filter(receita => {
            const data = new Date(receita.data);
            return (data.getMonth() + 1).toString() === filtroMes;
        });
    }
    
    if (termoBusca) {
        const termo = termoBusca.toLowerCase();
        receitasFiltradas = receitasFiltradas.filter(receita => 
            receita.descricao.toLowerCase().includes(termo) || 
            receita.fonte.toLowerCase().includes(termo)
        );
    }
    
    // Exibir ou ocultar a mensagem de "sem receitas"
    if (receitasFiltradas.length === 0) {
        tabelaReceitas.style.display = 'none';
        semReceitas.style.display = 'block';
        semReceitas.innerHTML = '<div class="col-12 text-center">Nenhuma receita encontrada</div>';
        document.getElementById('total-receitas').textContent = 'R$ 0,00';
        return;
    } else {
        tabelaReceitas.style.display = 'table';
        semReceitas.style.display = 'none';
    }
    
    // Calcular o total de receitas
    const totalReceitas = receitasFiltradas.reduce((total, receita) => total + parseFloat(receita.valor), 0);
    document.getElementById('total-receitas').textContent = `R$ ${totalReceitas.toFixed(2).replace('.', ',')}`;
    
    // Renderizar as receitas
    receitasFiltradas.forEach(receita => {
        const data = new Date(receita.data);
        const dataFormatada = data.toLocaleDateString('pt-BR');
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${dataFormatada}</td>
            <td>${receita.descricao}</td>
            <td>${receita.fonte}</td>
            <td class="text-end">R$ ${parseFloat(receita.valor).toFixed(2).replace('.', ',')}</td>
        `;
        
        tabelaReceitas.appendChild(row);
    });
}

/**
 * Carrega as despesas da ONG
 */
function carregarDespesas(filtroAno = 'todos', filtroMes = 'todos', termoBusca = '') {
    // Verificar se o domínio atual corresponde à ONG solicitada
    const hostname = window.location.hostname;
    const urlParams = new URLSearchParams(window.location.search);
    const ongSlug = urlParams.get('ong') || 'ampla';
    const dominioPermitido = verificarDominioPermitido(hostname, ongSlug);
    
    if (!dominioPermitido) {
        console.log("Acesso negado: domínio não autorizado para esta ONG");
        return;
    }
    
    const tabelaDespesas = document.getElementById('tabela-despesas');
    const semDespesas = document.getElementById('sem-despesas');
    
    if (!tabelaDespesas) {
        console.error('Tabela de despesas não encontrada');
        return;
    }
    
    // Limpar a tabela
    tabelaDespesas.innerHTML = '';
    
    // Verificar se existem despesas
    if (!dadosDespesas || dadosDespesas.length === 0) {
        tabelaDespesas.style.display = 'none';
        semDespesas.style.display = 'block';
        semDespesas.innerHTML = `
            <div class="col-12 text-center py-5">
                <div class="d-flex flex-column align-items-center">
                    <i class="bi bi-hourglass-split display-4 text-primary mb-3"></i>
                    <h4 class="mb-2">Em breve</h4>
                    <p class="text-muted">As despesas serão exibidas aqui em breve.</p>
                </div>
            </div>
        `;
        document.getElementById('total-despesas').textContent = 'R$ 0,00';
        return;
    }
    
    // Aplicar filtros
    let despesasFiltradas = dadosDespesas;
    
    if (filtroAno !== 'todos') {
        despesasFiltradas = despesasFiltradas.filter(despesa => despesa.ano === filtroAno);
    }
    
    if (filtroMes !== 'todos') {
        despesasFiltradas = despesasFiltradas.filter(despesa => {
            const data = new Date(despesa.data);
            return (data.getMonth() + 1).toString() === filtroMes;
        });
    }
    
    if (termoBusca) {
        const termo = termoBusca.toLowerCase();
        despesasFiltradas = despesasFiltradas.filter(despesa => 
            despesa.descricao.toLowerCase().includes(termo) || 
            despesa.categoria.toLowerCase().includes(termo) ||
            despesa.projeto.toLowerCase().includes(termo)
        );
    }
    
    // Exibir ou ocultar a mensagem de "sem despesas"
    if (despesasFiltradas.length === 0) {
        tabelaDespesas.style.display = 'none';
        semDespesas.style.display = 'block';
        semDespesas.innerHTML = '<div class="col-12 text-center">Nenhuma despesa encontrada</div>';
        document.getElementById('total-despesas').textContent = 'R$ 0,00';
        return;
    } else {
        tabelaDespesas.style.display = 'table';
        semDespesas.style.display = 'none';
    }
    
    // Calcular o total de despesas
    const totalDespesas = despesasFiltradas.reduce((total, despesa) => total + parseFloat(despesa.valor), 0);
    document.getElementById('total-despesas').textContent = `R$ ${totalDespesas.toFixed(2).replace('.', ',')}`;
    
    // Renderizar as despesas
    despesasFiltradas.forEach(despesa => {
        const data = new Date(despesa.data);
        const dataFormatada = data.toLocaleDateString('pt-BR');
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${dataFormatada}</td>
            <td>${despesa.descricao}</td>
            <td>${despesa.categoria}</td>
            <td>${despesa.projeto}</td>
            <td class="text-end">R$ ${parseFloat(despesa.valor).toFixed(2).replace('.', ',')}</td>
            <td class="text-center">
                ${despesa.imagem ? `<button class="btn btn-sm btn-outline-primary" onclick="abrirModalDespesa(${despesa.id})"><i class="bi bi-image"></i></button>` : '-'}
            </td>
        `;
        
        tabelaDespesas.appendChild(row);
    });
}

/**
 * Atualiza o resumo financeiro no topo da página
 */
function atualizarResumoFinanceiro() {
    // Calcular total de receitas
    const totalReceitas = dadosReceitas.reduce((acc, receita) => acc + receita.valor, 0);
    
    // Calcular total de despesas
    const totalDespesas = dadosDespesas.reduce((acc, despesa) => acc + despesa.valor, 0);
    
    // Calcular saldo
    const saldo = totalReceitas - totalDespesas;
    
    // Atualizar os elementos HTML
    document.getElementById('total-receitas').textContent = formatarMoeda(totalReceitas);
    document.getElementById('total-despesas').textContent = formatarMoeda(totalDespesas);
    
    const saldoElement = document.getElementById('saldo');
    saldoElement.textContent = formatarMoeda(saldo);
    
    // Definir cor do saldo conforme valor (positivo/negativo)
    if (saldo > 0) {
        saldoElement.classList.add('text-success');
        saldoElement.classList.remove('text-danger');
    } else if (saldo < 0) {
        saldoElement.classList.add('text-danger');
        saldoElement.classList.remove('text-success');
    } else {
        saldoElement.classList.remove('text-success', 'text-danger');
    }
}

/**
 * Inicializa os filtros das tabelas
 */
function configurarFiltros() {
    // Filtro de ano para receitas
    document.getElementById('filtro-ano-receitas').addEventListener('change', function() {
        const ano = this.value;
        const mes = document.getElementById('filtro-mes-receitas').value;
        const busca = document.getElementById('busca-receitas').value;
        carregarReceitas(ano, mes, busca);
    });
    
    // Filtro de mês para receitas
    document.getElementById('filtro-mes-receitas').addEventListener('change', function() {
        const mes = this.value;
        const ano = document.getElementById('filtro-ano-receitas').value;
        const busca = document.getElementById('busca-receitas').value;
        carregarReceitas(ano, mes, busca);
    });
    
    // Filtro de ano para despesas
    document.getElementById('filtro-ano-despesas').addEventListener('change', function() {
        const ano = this.value;
        const mes = document.getElementById('filtro-mes-despesas').value;
        const busca = document.getElementById('busca-despesas').value;
        carregarDespesas(ano, mes, busca);
    });
    
    // Filtro de mês para despesas
    document.getElementById('filtro-mes-despesas').addEventListener('change', function() {
        const mes = this.value;
        const ano = document.getElementById('filtro-ano-despesas').value;
        const busca = document.getElementById('busca-despesas').value;
        carregarDespesas(ano, mes, busca);
    });
    
    // Filtro de ano para livros contábeis
    const filtroAnoLivros = document.getElementById('filtro-ano-livros');
    if (filtroAnoLivros) {
        console.log('Configurando evento change para filtro de livros contábeis');
        filtroAnoLivros.addEventListener('change', function() {
            const ano = String(this.value); // Garantir que é string
            console.log('Evento change do filtro de livros:', ano, 'Tipo:', typeof ano);
            const busca = document.getElementById('busca-livros').value;
            carregarLivrosContabeis(ano, busca);
        });
        
        // Inicializar com o valor atual para corrigir o estado inicial
        const anoInicial = String(filtroAnoLivros.value);
        console.log('Inicializando com valor:', anoInicial, 'Tipo:', typeof anoInicial);
        
        // Forçar carregamento inicial com o valor do select
        setTimeout(() => {
            if (anoInicial && anoInicial !== 'todos') {
                console.log('Carregando livros com filtro inicial:', anoInicial);
                const buscaInicial = document.getElementById('busca-livros').value;
                carregarLivrosContabeis(anoInicial, buscaInicial);
            }
        }, 500);
    } else {
        console.error('Elemento de filtro de livros não encontrado');
    }
}

/**
 * Inicializa as buscas nas tabelas
 */
function configurarBuscas() {
    // Busca para receitas
    document.getElementById('busca-receitas').addEventListener('input', function() {
        const busca = this.value;
        const ano = document.getElementById('filtro-ano-receitas').value;
        const mes = document.getElementById('filtro-mes-receitas').value;
        carregarReceitas(ano, mes, busca);
    });
    
    // Busca para despesas
    document.getElementById('busca-despesas').addEventListener('input', function() {
        const busca = this.value;
        const ano = document.getElementById('filtro-ano-despesas').value;
        const mes = document.getElementById('filtro-mes-despesas').value;
        carregarDespesas(ano, mes, busca);
    });
    
    // Busca para livros contábeis
    const buscaLivros = document.getElementById('busca-livros');
    if (buscaLivros) {
        buscaLivros.addEventListener('input', function() {
            const busca = this.value;
            const ano = document.getElementById('filtro-ano-livros').value;
            carregarLivrosContabeis(ano, busca);
        });
    }
}

/**
 * Configura o modal para exibir detalhes da despesa
 */
function configurarModais() {
    // Delegar evento de clique nos links das despesas
    document.querySelector('#tabela-despesas').addEventListener('click', function(event) {
        // Verificar se o clique foi em um link de despesa
        if (event.target.classList.contains('despesa-link')) {
            event.preventDefault();
            
            // Obter o ID da despesa
            const despesaId = parseInt(event.target.dataset.id);
            const despesa = dadosDespesas.find(d => d.id === despesaId);
            
            if (despesa) {
                // Preencher o modal com os dados
                document.getElementById('despesaModalLabel').textContent = `Despesa: ${despesa.descricao}`;
                document.getElementById('despesa-imagem').src = despesa.imagem;
                document.getElementById('despesa-titulo').textContent = despesa.descricao;
                document.getElementById('despesa-data').textContent = formatarData(despesa.data);
                document.getElementById('despesa-categoria').textContent = despesa.categoria;
                document.getElementById('despesa-projeto').textContent = despesa.projeto;
                document.getElementById('despesa-valor').textContent = formatarMoeda(despesa.valor);
                
                // Exibir o modal
                const modal = new bootstrap.Modal(document.getElementById('despesaModal'));
                modal.show();
            }
        }
    });
}

/**
 * Carrega os livros contábeis da ONG
 */
function carregarLivrosContabeis(filtroAno = 'todos', termoBusca = '') {
    // Verificar se o domínio atual corresponde à ONG solicitada
    const hostname = window.location.hostname;
    const urlParams = new URLSearchParams(window.location.search);
    const ongSlug = urlParams.get('ong') || 'ampla';
    const dominioPermitido = verificarDominioPermitido(hostname, ongSlug);
    
    if (!dominioPermitido) {
        console.log("Acesso negado: domínio não autorizado para esta ONG");
        return;
    }
    
    const containerLivros = document.getElementById('container-livros');
    const semLivros = document.getElementById('sem-livros');
    
    if (!containerLivros) {
        console.error('Container de livros não encontrado');
        return;
    }
    
    // Limpar o container
    containerLivros.innerHTML = '';
    
    // Verificar se existem livros
    if (!dadosOng.livrosContabeis || dadosOng.livrosContabeis.length === 0) {
        containerLivros.style.display = 'none';
        semLivros.style.display = 'block';
        semLivros.innerHTML = `
            <div class="col-12 text-center py-5">
                <div class="d-flex flex-column align-items-center">
                    <i class="bi bi-hourglass-split display-4 text-primary mb-3"></i>
                    <h4 class="mb-2">Em breve</h4>
                    <p class="text-muted">Os livros contábeis serão exibidos aqui em breve.</p>
                </div>
            </div>
        `;
        return;
    }
    
    // Aplicar filtros
    let livrosFiltrados = dadosOng.livrosContabeis;
    
    if (filtroAno !== 'todos') {
        livrosFiltrados = livrosFiltrados.filter(livro => livro.ano === filtroAno);
    }
    
    if (termoBusca) {
        const termo = termoBusca.toLowerCase();
        livrosFiltrados = livrosFiltrados.filter(livro => 
            livro.tipo.toLowerCase().includes(termo) || 
            livro.ano.toString().includes(termo)
        );
    }
    
    // Exibir ou ocultar a mensagem de "sem livros"
    if (livrosFiltrados.length === 0) {
        containerLivros.style.display = 'none';
        semLivros.style.display = 'block';
        semLivros.innerHTML = '<div class="col-12 text-center">Nenhum livro contábil encontrado</div>';
        return;
    } else {
        containerLivros.style.display = 'grid';
        semLivros.style.display = 'none';
    }
    
    // Renderizar os livros
    livrosFiltrados.forEach(livro => {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';
        card.innerHTML = `
            <div class="card h-100">
                <div class="card-body">
                    <div class="d-flex align-items-center mb-3">
                        <i class="bi ${livro.icone} fs-4 me-2" style="color: ${livro.cor}"></i>
                        <h5 class="card-title mb-0">${livro.tipo}</h5>
                    </div>
                    <p class="card-text">Ano: ${livro.ano}</p>
                    <a href="${livro.arquivo}" class="btn btn-primary" target="_blank">
                        <i class="bi bi-download me-2"></i>Baixar
                    </a>
                </div>
            </div>
        `;
        
        containerLivros.appendChild(card);
    });
}

/**
 * Carrega os avisos do mural
 */
function carregarMuralAvisos() {
    // Obter o slug da ONG atual
    const urlParams = new URLSearchParams(window.location.search);
    const pathSlug = window.location.pathname.split('/').pop().replace('.html', '');
    const ongSlug = urlParams.get('ong') || pathSlug || 'ampla';
    
    // Obter os avisos do mural da ONG atual
    const avisos = dadosONGs[ongSlug]?.muralAvisos || [];
    
    // Verificar se existem avisos
    if (!avisos || avisos.length === 0) {
        const muralSection = document.getElementById('mural');
        if (muralSection) {
            muralSection.innerHTML = `
                <h2 class="border-bottom pb-2 mb-4">Mural de Avisos</h2>
                <div class="card">
                    <div class="card-body text-center py-5">
                        <div class="d-flex flex-column align-items-center">
                            <i class="bi bi-hourglass-split display-4 text-primary mb-3"></i>
                            <h4 class="mb-2">Em breve</h4>
                            <p class="text-muted">Os avisos serão exibidos aqui em breve.</p>
                        </div>
                    </div>
                </div>
            `;
        }
        return;
    }
    
    // Renderizar os avisos
    const muralSection = document.getElementById('mural');
    if (muralSection) {
        let html = `
            <h2 class="border-bottom pb-2 mb-4">Mural de Avisos</h2>
            <div class="card">
                <div class="card-body">
                    <div class="row mb-4">
        `;
        
        // Adicionar cada aviso
        avisos.forEach(aviso => {
            html += `
                <div class="col-md-6 mb-4">
                    <div class="card h-100">
                        <div class="card-header bg-dark text-white" style="background: linear-gradient(45deg, #000000, #333333) !important;">
                            <h3 class="h5 mb-0">${aviso.titulo}</h3>
                        </div>
                        <div class="card-body">
                            <p class="card-text">${aviso.descricao}</p>
                            <a href="${aviso.arquivo}" class="btn btn-primary btn-sm" target="_blank">
                                <i class="bi bi-file-earmark-pdf"></i> Ver PDF
                            </a>
                        </div>
                        <div class="card-footer text-muted">
                            Publicado em: ${formatarData(aviso.data)}
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += `
                    </div>
                </div>
            </div>
        `;
        
        muralSection.innerHTML = html;
    }
} 