"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Iniciando seed do banco de dados...');
    // Limpar dados antigos
    await prisma.rating.deleteMany();
    await prisma.liquidityPing.deleteMany();
    await prisma.agent.deleteMany();
    await prisma.helpRequest.deleteMany();
    await prisma.temporaryAgent.deleteMany();
    await prisma.user.deleteMany();
    await prisma.admin.deleteMany();
    // Criar Administrador
    await prisma.admin.create({
        data: {
            name: 'Admin SmartInfo',
            email: 'admin@smartinfo.co.mz',
            password: 'adminpassword123', // Em prod usar bcrypt
        },
    });
    // Criar Usuários Demo
    const joao = await prisma.user.create({
        data: {
            name: 'João Macuácua',
            phoneNumber: '841234567',
            role: client_1.UserRole.CLIENT,
        },
    });
    const maria = await prisma.user.create({
        data: {
            name: 'Maria Tembe',
            phoneNumber: '849876543',
            role: client_1.UserRole.CLIENT,
        },
    });
    // Criar 8 Agentes
    const agentsData = [
        {
            code: 'AG01',
            name: 'Ana Santos',
            phoneNumber: '841112222',
            location: 'Polana Cimento, Maputo',
            latitude: -25.9627,
            longitude: 32.5800,
            referencePoint: 'Perto da banca azul, junto ao cruzamento',
            isActive: true,
            hasCash: true,
            hasFloat: true,
            rating: 4.9,
        },
        {
            code: 'AG02',
            name: 'Carlos M.',
            phoneNumber: '842223333',
            location: 'Fórum de Maputo',
            latitude: -25.9550,
            longitude: 32.5720,
            referencePoint: 'Em frente ao mercado central, ao lado da praça',
            isActive: false,
            hasCash: false,
            hasFloat: true,
            rating: 4.6,
        },
        {
            code: 'AG03',
            name: 'Miguel Agente Móvel',
            phoneNumber: '843334444',
            location: 'Xikhelene, Maputo',
            latitude: -25.9200,
            longitude: 32.5900,
            referencePoint: 'Ao lado da bomba de gasolina Total',
            isActive: true,
            hasCash: true,
            hasFloat: false,
            rating: 4.5,
        },
        {
            code: 'AG04',
            name: 'Lúcia Valente',
            phoneNumber: '844445555',
            location: 'Zimpeto, Maputo',
            latitude: -25.8500,
            longitude: 32.5600,
            referencePoint: 'Em frente ao mini-mercado Popular',
            isActive: true,
            hasCash: false,
            hasFloat: true,
            rating: 4.8,
        },
        {
            code: 'AG05',
            name: 'Agente M-Pesa Baixa',
            phoneNumber: '845556666',
            location: 'Baixa, Maputo',
            latitude: -25.9692,
            longitude: 32.5732,
            referencePoint: 'Junto ao Mercado Central de Maputo',
            isActive: true,
            hasCash: true,
            hasFloat: true,
            rating: 4.8,
        },
        {
            code: 'AG06',
            name: 'Agente M-Pesa Xipamanine',
            phoneNumber: '846667777',
            location: 'Xipamanine, Maputo',
            latitude: -25.9565,
            longitude: 32.5543,
            referencePoint: 'Em frente ao Mercado de Xipamanine',
            isActive: true,
            hasCash: false,
            hasFloat: true,
            rating: 4.5,
        },
        {
            code: 'AG07',
            name: 'Agente M-Pesa Matola',
            phoneNumber: '847778888',
            location: 'Matola Centro',
            latitude: -25.9622,
            longitude: 32.4589,
            referencePoint: 'Perto da praça de Matola',
            isActive: false,
            hasCash: false,
            hasFloat: false,
            rating: 4.2,
        },
        {
            code: 'AG08',
            name: 'Agente M-Pesa Benfica',
            phoneNumber: '848889999',
            location: 'Benfica, Maputo',
            latitude: -25.8883,
            longitude: 32.5334,
            referencePoint: 'Junto à escola primária de Benfica',
            isActive: false,
            hasCash: false,
            hasFloat: true,
            rating: 4.3,
        },
    ];
    for (const agent of agentsData) {
        const createdAgent = await prisma.agent.create({
            data: agent,
        });
        // Adicionar alguns ratings para simulação
        await prisma.rating.create({
            data: {
                agentId: createdAgent.id,
                stars: Math.floor(agent.rating),
                comment: 'Excelente atendimento, rápido e atencioso.',
            },
        });
    }
    // Criar alguns pedidos de ajuda
    await prisma.helpRequest.create({
        data: {
            userName: 'Utilizador Demo',
            location: 'Boane Centro',
            description: 'Zona com muitos utilizadores, mas poucos agentes com dinheiro disponível.',
        },
    });
    console.log('✅ Seed concluído com sucesso!');
}
main()
    .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
