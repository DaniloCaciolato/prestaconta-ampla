# Portal de Transparência para ONGs

Este é um portal simples para prestação de contas de organizações não governamentais (ONGs), desenvolvido com JavaScript vanilla, HTML e CSS com Bootstrap.

## Características

- Interface responsiva e moderna usando Bootstrap 5
- Visualização de receitas e despesas da organização
- Detalhes sobre projetos e seus status
- Filtros por ano e busca textual
- Formulário de contato
- Dados inseridos diretamente via JavaScript (sem backend)

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (vanilla)
- Bootstrap 5
- Bootstrap Icons
- Chart.js (para implementação futura de gráficos)

## Estrutura do Projeto

```
portaltransparencia-vanilla/
├── index.html              # Página principal
├── css/
│   └── styles.css          # Estilos personalizados
├── js/
│   ├── dados.js            # Dados de exemplo
│   └── main.js             # Funcionalidades do portal
└── README.md               # Documentação
```

## Como Usar

1. Clone este repositório
2. Abra o arquivo `index.html` em qualquer navegador moderno
3. Para modificar os dados, edite o arquivo `js/dados.js`

## Funcionalidades

- **Resumo Financeiro**: Visualização rápida de receitas, despesas e saldo
- **Receitas**: Tabela detalhada com filtros por ano e busca
- **Despesas**: Tabela detalhada com filtros por ano e busca
- **Projetos**: Cards com informações sobre os projetos e barras de progresso
- **Contato**: Informações de contato e formulário para envio de mensagens

## Personalização

Para personalizar o portal para sua organização:

1. Edite as informações da organização no `index.html`
2. Substitua os dados de exemplo no arquivo `js/dados.js`
3. Ajuste as cores e estilos em `css/styles.css`

## Próximos Passos

- Implementação de gráficos usando Chart.js
- Integração com backend para armazenamento persistente de dados
- Área administrativa para gerenciamento de dados
- Autenticação de usuários para acesso à área administrativa
- Download de relatórios em PDF

## Licença

Este projeto é distribuído sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
