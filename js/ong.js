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
 * Inicializa todas as funcionalidades do portal
 */
function inicializarPortal() {
    // Carregar informações da ONG
    carregarInformacoesONG();
    
    // Carregar dados financeiros
    carregarReceitas();
    carregarDespesas();
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
    // Nome da ONG
    document.getElementById('ong-nome').textContent = dadosOng.nome;
    document.getElementById('footer-ong-nome').textContent = dadosOng.nome;
    document.getElementById('footer-ong-cnpj').textContent = `CNPJ: ${dadosOng.cnpj}`;
    document.title = `Portal de Transparência - ${dadosOng.nome}`;
    
    // Descrição
    document.getElementById('ong-descricao').innerHTML = `
        <p>Este portal foi desenvolvido para garantir total transparência sobre os recursos financeiros da nossa organização.</p>
        <p>${dadosOng.descricao}</p>
    `;
    
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
 * Carrega a tabela de receitas
 */
function carregarReceitas(filtroAno = 'todos', filtroMes = 'todos', termoBusca = '') {
    const tbody = document.querySelector('#tabela-receitas tbody');
    tbody.innerHTML = '';
    
    let dadosFiltrados = dadosReceitas;
    
    // Aplicar filtro de ano
    if (filtroAno !== 'todos') {
        dadosFiltrados = dadosFiltrados.filter(receita => receita.ano === filtroAno);
    }
    
    // Aplicar filtro de mês
    if (filtroMes !== 'todos') {
        dadosFiltrados = dadosFiltrados.filter(receita => {
            const mes = receita.data.split('-')[1]; // Formato esperado: YYYY-MM-DD
            return mes === filtroMes;
        });
    }
    
    // Aplicar busca
    if (termoBusca) {
        const termoLowerCase = termoBusca.toLowerCase();
        dadosFiltrados = dadosFiltrados.filter(receita => 
            receita.descricao.toLowerCase().includes(termoLowerCase) || 
            receita.fonte.toLowerCase().includes(termoLowerCase)
        );
    }
    
    // Ordenar por data (mais recente primeiro)
    dadosFiltrados.sort((a, b) => new Date(b.data) - new Date(a.data));
    
    // Calcular valor total
    let valorTotal = 0;
    
    // Adicionar linhas à tabela
    dadosFiltrados.forEach(receita => {
        valorTotal += receita.valor;
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${formatarData(receita.data)}</td>
            <td>${receita.descricao}</td>
            <td>${receita.fonte}</td>
            <td class="text-end">${formatarMoeda(receita.valor)}</td>
        `;
        tbody.appendChild(tr);
    });
    
    // Atualizar rodapé com total
    document.getElementById('soma-receitas').textContent = formatarMoeda(valorTotal);
    
    // Caso não haja dados
    if (dadosFiltrados.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = '<td colspan="4" class="text-center">Nenhuma receita encontrada</td>';
        tbody.appendChild(tr);
    }
}

/**
 * Carrega a tabela de despesas
 */
function carregarDespesas(filtroAno = 'todos', filtroMes = 'todos', termoBusca = '') {
    const tbody = document.querySelector('#tabela-despesas tbody');
    tbody.innerHTML = '';
    
    let dadosFiltrados = dadosDespesas;
    
    // Aplicar filtro de ano
    if (filtroAno !== 'todos') {
        dadosFiltrados = dadosFiltrados.filter(despesa => despesa.ano === filtroAno);
    }
    
    // Aplicar filtro de mês
    if (filtroMes !== 'todos') {
        dadosFiltrados = dadosFiltrados.filter(despesa => {
            const mes = despesa.data.split('-')[1]; // Formato esperado: YYYY-MM-DD
            return mes === filtroMes;
        });
    }
    
    // Aplicar busca
    if (termoBusca) {
        const termoLowerCase = termoBusca.toLowerCase();
        dadosFiltrados = dadosFiltrados.filter(despesa => 
            despesa.descricao.toLowerCase().includes(termoLowerCase) || 
            despesa.categoria.toLowerCase().includes(termoLowerCase) ||
            despesa.projeto.toLowerCase().includes(termoLowerCase)
        );
    }
    
    // Ordenar por data (mais recente primeiro)
    dadosFiltrados.sort((a, b) => new Date(b.data) - new Date(a.data));
    
    // Calcular valor total
    let valorTotal = 0;
    
    // Adicionar linhas à tabela
    dadosFiltrados.forEach(despesa => {
        valorTotal += despesa.valor;
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${formatarData(despesa.data)}</td>
            <td><a href="#" class="despesa-link" data-id="${despesa.id}">${despesa.descricao}</a></td>
            <td>${despesa.categoria}</td>
            <td>${despesa.projeto}</td>
            <td class="text-end">${formatarMoeda(despesa.valor)}</td>
        `;
        tbody.appendChild(tr);
    });
    
    // Atualizar rodapé com total
    document.getElementById('soma-despesas').textContent = formatarMoeda(valorTotal);
    
    // Caso não haja dados
    if (dadosFiltrados.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = '<td colspan="5" class="text-center">Nenhuma despesa encontrada</td>';
        tbody.appendChild(tr);
    }
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