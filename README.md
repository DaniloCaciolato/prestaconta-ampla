# Portal de Transparência para ONGs

Este é um portal simples para prestação de contas de organizações não governamentais (ONGs), desenvolvido com JavaScript vanilla, HTML e CSS com Bootstrap.

## Características

- Interface responsiva e moderna usando Bootstrap 5
- Visualização de receitas e despesas da organização
- Detalhes sobre projetos e seus status
- Filtros por ano e mês para dados financeiros
- Tema claro/escuro com adaptação automática à preferência do sistema
- Dados inseridos diretamente via JavaScript (sem backend)
- URLs amigáveis para acesso direto à página de cada ONG

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (vanilla)
- Bootstrap 5
- Bootstrap Icons
- Chart.js (para implementação futura de gráficos)

## Estrutura do Projeto

```
prestaconta-vanilla/
├── index.html              # Página principal
├── ong.html                # Página de detalhes da ONG
├── css/
│   └── styles.css          # Estilos personalizados
├── js/
│   ├── dados.js            # Dados de exemplo
│   ├── landing.js          # Funcionalidades da página inicial
│   ├── ong.js              # Funcionalidades da página de detalhes
│   └── theme.js            # Gerenciamento do tema claro/escuro
├── img/
│   ├── favicon.svg         # Ícone do site (modo claro)
│   └── favicon-dark.svg    # Ícone do site (modo escuro)
└── README.md               # Documentação
```

## Como Usar

1. Clone este repositório
2. Abra o arquivo `index.html` em qualquer navegador moderno
3. Para modificar os dados, edite o arquivo `js/dados.js`

## Funcionalidades

- **Tema Claro/Escuro**: Alternância automática baseada na preferência do sistema
- **Resumo Financeiro**: Visualização rápida de receitas, despesas e saldo
- **Receitas**: Tabela detalhada com filtros por ano, mês e busca textual
- **Despesas**: Tabela detalhada com filtros por ano, mês e busca textual
- **Projetos**: Cards com informações sobre os projetos e barras de progresso
- **Contato**: Informações de contato da ONG
- **URLs Amigáveis**: Acesso direto à página de cada ONG via URL personalizada

## Personalização

Para personalizar o portal para sua organização:

1. Edite as informações da organização no arquivo `js/dados.js`
2. Substitua os dados de exemplo no mesmo arquivo
3. Ajuste as cores e estilos em `css/styles.css`

## Próximos Passos

- Implementação de gráficos usando Chart.js
- Integração com backend para armazenamento persistente de dados
- Área administrativa para gerenciamento de dados
- Autenticação de usuários para acesso à área administrativa
- Download de relatórios em PDF

## Aviso de Propriedade

Este projeto não é licenciável e todos os direitos estão reservados. O código e design deste projeto são destinados apenas para uso educacional e demonstrativo. Não é permitida a redistribuição, venda ou uso comercial sem autorização expressa do autor.
