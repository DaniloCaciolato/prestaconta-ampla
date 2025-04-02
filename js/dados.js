/**
 * Dados de exemplo para o Portal de Transparência
 */

// Lista de todas as ONGs disponíveis
const organizacoes = [
    {
        id: 1,
        nome: "Associação de Assistência ao Menor de Platina",
        slug: "ampla",
        descricao: "Trabalhamos para melhorar a vida de crianças e adolescentes em situação de vulnerabilidade social por meio de programas educacionais e de saúde.",
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
        imagem: "./img/logo-ampla.png"
    },
    {
        id: 2,
        nome: "Instituto Futuro Melhor",
        slug: "futuro",
        descricao: "Nossa missão é promover projetos de saúde comunitária e distribuição de alimentos para combater a fome e melhorar a qualidade de vida nas comunidades carentes.",
        cnpj: "98.765.432/0001-10",
        contato: {
            endereco: "Av. Central, 456 - Jardim América - Rio de Janeiro/RJ",
            telefone: "(21) 9876-5432",
            email: "contato@futuromelhor.org.br",
            horario: "Segunda a Sexta: 8h às 17h"
        },
        redesSociais: {
            facebook: "https://facebook.com/futuromelhor",
            instagram: "https://instagram.com/futuromelhor",
            twitter: "https://twitter.com/futuromelhor"
        },
        imagem: "https://res.cloudinary.com/dyxopkrxl/image/upload/v1743507646/cld-sample-3.jpg"
    }
];

// Banco de dados das ONGs
const dadosONGs = {
    // Associação de Assistência ao Menor de Platina
    "ampla": {
        // Receitas
        receitas: [
            {
                id: 1,
                data: '2023-01-15',
                descricao: 'Doação Empresa XYZ',
                fonte: 'Pessoa Jurídica',
                valor: 15000.00,
                ano: '2023'
            },
            {
                id: 2,
                data: '2023-02-10',
                descricao: 'Doação Anônima',
                fonte: 'Pessoa Física',
                valor: 5000.00,
                ano: '2023'
            },
            {
                id: 3,
                data: '2023-03-05',
                descricao: 'Evento Beneficente',
                fonte: 'Evento',
                valor: 8750.50,
                ano: '2023'
            },
            {
                id: 4,
                data: '2023-04-20',
                descricao: 'Patrocínio Corporativo',
                fonte: 'Pessoa Jurídica',
                valor: 25000.00,
                ano: '2023'
            },
            {
                id: 5,
                data: '2023-05-12',
                descricao: 'Doações Online',
                fonte: 'Pessoa Física',
                valor: 3200.00,
                ano: '2023'
            }
        ],

        // Despesas
        despesas: [
            {
                id: 1,
                data: '2023-01-20',
                descricao: 'Aluguel da Sede',
                categoria: 'Infraestrutura',
                projeto: 'Administrativo',
                valor: 3500.00,
                ano: '2023',
                imagem: 'https://res.cloudinary.com/dyxopkrxl/image/upload/v1743507646/cld-sample-5.jpg'
            },
            {
                id: 2,
                data: '2023-01-25',
                descricao: 'Material Didático',
                categoria: 'Material',
                projeto: 'Educação para Todos',
                valor: 2800.00,
                ano: '2023',
                imagem: 'https://res.cloudinary.com/dyxopkrxl/image/upload/v1743507646/cld-sample-3.jpg'
            },
            {
                id: 3,
                data: '2023-02-05',
                descricao: 'Contas de Utilidades',
                categoria: 'Infraestrutura',
                projeto: 'Administrativo',
                valor: 1200.00,
                ano: '2023',
                imagem: 'https://res.cloudinary.com/dyxopkrxl/image/upload/v1743507646/cld-sample-4.jpg'
            },
            {
                id: 4,
                data: '2023-02-15',
                descricao: 'Salários da Equipe',
                categoria: 'Recursos Humanos',
                projeto: 'Administrativo',
                valor: 12000.00,
                ano: '2023',
                imagem: 'https://res.cloudinary.com/dyxopkrxl/image/upload/v1743507646/cld-sample-5.jpg'
            },
            {
                id: 5,
                data: '2023-03-10',
                descricao: 'Equipamentos Médicos',
                categoria: 'Material',
                projeto: 'Saúde Comunitária',
                valor: 8000.00,
                ano: '2023',
                imagem: 'https://res.cloudinary.com/dyxopkrxl/image/upload/v1743507646/cld-sample-3.jpg'
            },
            {
                id: 6,
                data: '2023-04-05',
                descricao: 'Transporte de Doações',
                categoria: 'Logística',
                projeto: 'Distribuição de Alimentos',
                valor: 1500.00,
                ano: '2023',
                imagem: 'https://res.cloudinary.com/dyxopkrxl/image/upload/v1743507646/cld-sample-4.jpg'
            }
        ],

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
        ]
    },
    
    // Instituto Futuro Melhor
    "futuro": {
        // Receitas
        receitas: [
            {
                id: 1,
                data: '2022-06-18',
                descricao: 'Subsídio Governamental',
                fonte: 'Governo',
                valor: 30000.00,
                ano: '2022'
            },
            {
                id: 2,
                data: '2022-08-22',
                descricao: 'Doação Mensal Recorrente',
                fonte: 'Pessoa Física',
                valor: 1200.00,
                ano: '2022'
            },
            {
                id: 3,
                data: '2022-10-05',
                descricao: 'Venda de Produtos Solidários',
                fonte: 'Venda',
                valor: 4500.00,
                ano: '2022'
            },
            {
                id: 4,
                data: '2022-11-15',
                descricao: 'Bazar Beneficente',
                fonte: 'Evento',
                valor: 7800.00,
                ano: '2022'
            },
            {
                id: 5,
                data: '2022-12-20',
                descricao: 'Campanha de Natal',
                fonte: 'Campanha',
                valor: 12000.00,
                ano: '2022'
            }
        ],

        // Despesas
        despesas: [
            {
                id: 1,
                data: '2022-05-20',
                descricao: 'Manutenção Predial',
                categoria: 'Infraestrutura',
                projeto: 'Administrativo',
                valor: 2500.00,
                ano: '2022',
                imagem: 'https://res.cloudinary.com/dyxopkrxl/image/upload/v1743507646/cld-sample-5.jpg'
            },
            {
                id: 2,
                data: '2022-06-10',
                descricao: 'Compra de Alimentos',
                categoria: 'Material',
                projeto: 'Distribuição de Alimentos',
                valor: 6000.00,
                ano: '2022',
                imagem: 'https://res.cloudinary.com/dyxopkrxl/image/upload/v1743507646/cld-sample-3.jpg'
            },
            {
                id: 3,
                data: '2022-07-15',
                descricao: 'Marketing e Divulgação',
                categoria: 'Marketing',
                projeto: 'Captação de Recursos',
                valor: 1800.00,
                ano: '2022',
                imagem: 'https://res.cloudinary.com/dyxopkrxl/image/upload/v1743507646/cld-sample-4.jpg'
            },
            {
                id: 4,
                data: '2022-08-20',
                descricao: 'Seguro do Imóvel',
                categoria: 'Infraestrutura',
                projeto: 'Administrativo',
                valor: 2200.00,
                ano: '2022',
                imagem: 'https://res.cloudinary.com/dyxopkrxl/image/upload/v1743507646/cld-sample-5.jpg'
            },
            {
                id: 5,
                data: '2022-09-05',
                descricao: 'Material de Escritório',
                categoria: 'Material',
                projeto: 'Administrativo',
                valor: 800.00,
                ano: '2022',
                imagem: 'https://res.cloudinary.com/dyxopkrxl/image/upload/v1743507646/cld-sample-3.jpg'
            },
            {
                id: 6,
                data: '2022-10-10',
                descricao: 'Treinamento de Voluntários',
                categoria: 'Recursos Humanos',
                projeto: 'Capacitação',
                valor: 1500.00,
                ano: '2022',
                imagem: 'https://res.cloudinary.com/dyxopkrxl/image/upload/v1743507646/cld-sample-4.jpg'
            }
        ],

        // Projetos
        projetos: [
            {
                id: 1,
                nome: 'Distribuição de Alimentos',
                descricao: 'Arrecadação e distribuição de cestas básicas para famílias em situação de insegurança alimentar.',
                objetivo: 'Distribuir 500 cestas básicas para famílias em situação de vulnerabilidade.',
                beneficiados: 480,
                metaBeneficiados: 500,
                orcamento: 35000.00,
                gastoAtual: 32000.00,
                status: 'Concluído',
                imagem: 'https://res.cloudinary.com/dyxopkrxl/image/upload/v1743507646/cld-sample-4.jpg'
            },
            {
                id: 2,
                nome: 'Capacitação Profissional',
                descricao: 'Cursos profissionalizantes para jovens e adultos em áreas com demanda no mercado de trabalho local.',
                objetivo: 'Capacitar 100 pessoas e obter uma taxa de empregabilidade de 70% após o curso.',
                beneficiados: 85,
                metaBeneficiados: 100,
                orcamento: 40000.00,
                gastoAtual: 28000.00,
                status: 'Em progresso',
                imagem: 'https://res.cloudinary.com/dyxopkrxl/image/upload/v1743507646/cld-sample-5.jpg'
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