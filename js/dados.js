/**
 * Dados de exemplo para o Portal de Transparência
 */

// Lista de todas as ONGs disponíveis
const organizacoes = [
    {
        id: 1,
        nome: "Associação de Assistência ao Menor de Platina",
        sigla: "AMPLA",
        slug: "ampla",
        logo: "./img/ampla-fundo.png",
        descricao: "Organização sem fins lucrativos dedicada ao desenvolvimento de crianças e adolescentes através do esporte e educação.",
        cnpj: "49.892.987/0001-95",
        contato: {
            endereco: "Rua Ismael Benedito de Camargo, 583 - Centro - Platina/SP",
            telefone: "(18) 3354-1181",
            email: "aampla@gmail.com",
            horario: "Segunda a Sexta: 8h às 17h"
        },
        redesSociais: {
            facebook: "https://www.facebook.com/ampla2014ampla/",
            instagram: "https://www.instagram.com/projetoamplaeduca?igsh=MWRoZXpxamJheXh5eg==",
            whatsapp: "https://wa.me/5511912345678"
        },
        imagem: "./img/ampla-fundo.png"
    }
];

// Banco de dados das ONGs
const dadosONGs = {
    // Associação de Assistência ao Menor de Platina
    "ampla": {
        nome: "Associação de Assistência ao Menor de Platina",
        logo: "./img/logo-ampla.png",
        descricao: "A Associação de Assistência ao Menor de Platina (AMPLA) é uma organização sem fins lucrativos dedicada ao desenvolvimento social e educacional de crianças e adolescentes em situação de vulnerabilidade. Fundada em 1990, a AMPLA atua na cidade de Platina-SP, oferecendo programas educacionais, culturais e esportivos que visam promover a inclusão social e o desenvolvimento integral dos jovens.",
        cnpj: "49.892.987/0001-95",
        imagem: "./img/ampla-fundo.png",
        // Receitas
        receitas: [],

        // Despesas
        despesas: [],

        // Projetos
        projetos: [
            {
                id: 1,
                nome: 'Educação para Todos',
                descricao: 'Programa de reforço escolar e alfabetização para crianças e adolescentes em situação de vulnerabilidade social.',
                objetivo: 'Melhorar o desempenho escolar e reduzir a evasão escolar de 200 crianças e adolescentes.',
                beneficiados: 180,
                metaBeneficiados: 200,
                orcamento: 50000.00,
                gastoAtual: 35000.00,
                status: 'Em progresso',
                imagem: 'https://res.cloudinary.com/dyxopkrxl/image/upload/v1743507646/cld-sample-5.jpg'
            },
            {
                id: 2,
                nome: 'Saúde Comunitária',
                descricao: 'Atendimento médico básico e orientação sobre saúde preventiva para comunidades de baixa renda.',
                objetivo: 'Realizar 1000 atendimentos médicos e 20 palestras sobre saúde preventiva.',
                beneficiados: 750,
                metaBeneficiados: 1000,
                orcamento: 80000.00,
                gastoAtual: 60000.00,
                status: 'Em progresso',
                imagem: 'https://res.cloudinary.com/dyxopkrxl/image/upload/v1743507646/cld-sample-3.jpg'
            }
        ],

        // Livros Contábeis
        livrosContabeis: [],

        // Galeria
        galeria: [
            {
                id: 1,
                titulo: "Alunos da Ampla",
                descricao: "Sala de aula.",
                data: "2025-02-27",
                evento: "Projeto Ampla",
                ano: "2025",
                mes: "02",
                imagem: "https://res.cloudinary.com/dyxopkrxl/image/upload/v1743559847/SALA2_rwwxuj.png"
            },
            {
                id: 2,
                titulo: "Alunos da Ampla",
                descricao: "Sala de aula.",
                data: "2025-02-27",
                evento: "Projeto Ampla",
                ano: "2025",
                mes: "02",
                imagem: "https://res.cloudinary.com/dyxopkrxl/image/upload/v1743559846/SALA3_wkm3dm.png"
            },
            {
                id: 3,
                titulo: "Alunos da Ampla",
                descricao: "Sala de aula.",
                data: "2025-02-27",
                evento: "Projeto Ampla",
                ano: "2025",
                mes: "02",
                imagem: "https://res.cloudinary.com/dyxopkrxl/image/upload/v1743559846/SALA4_tpedrm.png"
            },
            {
                id: 4,
                titulo: "Alunos da Ampla",
                descricao: "Sala de aula.",
                data: "2025-02-27",
                evento: "Projeto Ampla",
                ano: "2025",
                mes: "02",
                imagem: "https://res.cloudinary.com/dyxopkrxl/image/upload/v1743559846/SALA1_ygev51.png"
            },
            {
                id: 5,
                titulo: "Carvanal Ampla",
                descricao: "Carnaval",
                data: "2025-02-28",
                evento: "Recreação",
                ano: "2025",
                mes: "02",
                imagem: "https://res.cloudinary.com/dyxopkrxl/image/upload/v1743559848/CARNAVAL1_ryjxue.png"
            },
            {
                id: 6,
                titulo: "Carvanal Ampla",
                descricao: "Carnaval",
                data: "2025-02-28",
                evento: "Recreação",
                ano: "2025",
                mes: "02",
                imagem: "https://res.cloudinary.com/dyxopkrxl/image/upload/v1743559847/CARNAVAL2_itwevb.png?t=202407312050"
            }
        ],

        // Mural de Avisos
        muralAvisos: [
            {
                id: 1,
                titulo: "VAGA ABERTA",
                descricao: "CONTRATA-SE atendente de cozinha<br><br>Requisitos:<br>- Ensino Fundamental Completo<br>- Habilidade em trabalho em equipe<br>- Proatividade, dinâmica e ética",
                data: "2024-03-15",
                arquivo: "mural.pdf/Cozinha.pdf"
            }
        ]
    }
};

// Categorização das Despesas para gráficos
const categoriasDespesas = [
    { categoria: 'Infraestrutura', valor: 10200.00 },
    { categoria: 'Material', valor: 17600.00 },
    { categoria: 'Recursos Humanos', valor: 13500.00 },
    { categoria: 'Logística', valor: 1500.00 },
    { categoria: 'Marketing', valor: 1800.00 }
];

// Fontes de Receita para gráficos
const fontesReceita = [
    { fonte: 'Pessoa Jurídica', valor: 40000.00 },
    { fonte: 'Pessoa Física', valor: 9400.00 },
    { fonte: 'Evento', valor: 16550.50 },
    { fonte: 'Governo', valor: 30000.00 },
    { fonte: 'Venda', valor: 4500.00 },
    { fonte: 'Campanha', valor: 12000.00 }
]; 
