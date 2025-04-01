/**
 * Funcionalidades principais do Portal de Transparência
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicialização
    inicializarPortal();
});

/**
 * Inicializa todas as funcionalidades do portal
 */
function inicializarPortal() {
    // Carregar dados
    carregarReceitas();
    carregarDespesas();
    carregarProjetos();
    atualizarResumoFinanceiro();
    inicializarGraficos();
    
    // Configurar eventos
    configurarFiltros();
    configurarBuscas();
    
    // Mostrar efeito de entrada
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fadeIn');
    });
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
            <td>${despesa.descricao}</td>
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
 * Carrega informações dos projetos
 */
function carregarProjetos() {
    const container = document.getElementById('lista-projetos');
    container.innerHTML = '';
    
    dadosProjetos.forEach(projeto => {
        const percentualConcluido = (projeto.beneficiados / projeto.metaBeneficiados) * 100;
        const percentualOrcamento = (projeto.gastoAtual / projeto.orcamento) * 100;
        
        // Determinar classes CSS baseadas no status
        let statusClass;
        switch(projeto.status.toLowerCase()) {
            case 'concluído':
                statusClass = 'status-concluido';
                break;
            case 'em progresso':
                statusClass = 'status-em-progresso';
                break;
            default:
                statusClass = 'status-pendente';
        }
        
        const div = document.createElement('div');
        div.className = 'col-md-6 mb-4';
        div.innerHTML = `
            <div class="card projeto-card">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${projeto.imagem}" class="img-fluid rounded-start h-100" alt="${projeto.nome}" style="object-fit: cover;">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${projeto.nome}</h5>
                            <p class="card-text">${projeto.descricao}</p>
                            <p class="card-text"><small class="text-muted">Objetivo: ${projeto.objetivo}</small></p>
                            
                            <div class="mb-3">
                                <div class="d-flex justify-content-between align-items-center mb-1">
                                    <small>Beneficiados: ${projeto.beneficiados}/${projeto.metaBeneficiados}</small>
                                    <small>${percentualConcluido.toFixed(0)}%</small>
                                </div>
                                <div class="progress">
                                    <div class="progress-bar bg-success" role="progressbar" style="width: ${percentualConcluido}%" 
                                         aria-valuenow="${percentualConcluido}" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                            
                            <div class="mb-3">
                                <div class="d-flex justify-content-between align-items-center mb-1">
                                    <small>Orçamento: ${formatarMoeda(projeto.gastoAtual)} de ${formatarMoeda(projeto.orcamento)}</small>
                                    <small>${percentualOrcamento.toFixed(0)}%</small>
                                </div>
                                <div class="progress">
                                    <div class="progress-bar bg-primary" role="progressbar" style="width: ${percentualOrcamento}%" 
                                         aria-valuenow="${percentualOrcamento}" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                            
                            <p class="card-text mt-3">
                                <small class="text-muted">Status: <span class="${statusClass}">${projeto.status}</span></small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(div);
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
 * Inicializa os gráficos estatísticos
 */
function inicializarGraficos() {
    // Por enquanto, estamos usando apenas dados tabulares.
    // Em uma versão futura, poderemos adicionar gráficos utilizando a biblioteca Chart.js
    // que já está incluída no HTML.
} 