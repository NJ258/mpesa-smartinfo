import { PrismaClient, UserRole } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Limpar dados antigos
  await prisma.rating.deleteMany()
  await prisma.liquidityPing.deleteMany()
  await prisma.agent.deleteMany()
  await prisma.helpRequest.deleteMany()
  await prisma.temporaryAgent.deleteMany()
  await prisma.user.deleteMany()
  await prisma.admin.deleteMany()

  console.log('✅ Dados antigos removidos')

  // Criar Admin para testes
  const admin = await prisma.admin.create({
    data: {
      name: 'Admin Teste',
      email: 'admin@test.com',
      password: 'admin123', // Em produção, usar bcrypt
    },
  })
  console.log('✅ Admin criado:', admin.email)

  // Criar Usuário Cliente para testes
  const usuario = await prisma.user.create({
    data: {
      name: 'Usuário Teste',
      phoneNumber: '840000000',
      role: UserRole.CLIENT,
    },
  })
  console.log('✅ Usuário criado:', usuario.phoneNumber)

  // Criar 1 Agente para testes
  const agente = await prisma.agent.create({
    data: {
      code: 'AG001',
      name: 'Agente Teste',
      phoneNumber: '842000000',
      password: 'agent123', // Em produção, usar bcrypt
      location: 'Maputo Centro',
      latitude: -25.9655,
      longitude: 32.5832,
      referencePoint: 'Próximo à Catedral de Maputo',
      isActive: true,
      hasCash: true,
      hasFloat: true,
      rating: 5.0,
    },
  })
  console.log('✅ Agente criado:', agente.code, '-', agente.name)

  console.log('\n📊 Dados de teste criados com sucesso!')
  console.log('\n🔐 Credenciais de teste:')
  console.log('   Admin:')
  console.log('     Email: admin@test.com')
  console.log('     Senha: admin123')
  console.log('\n   Usuário/Cliente:')
  console.log('     Telefone: 840000000')
  console.log('\n   Agente:')
  console.log('     Código: AG001')
  console.log('     Nome: Agente Teste')
  console.log('     Senha: agent123')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Erro ao executar seed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
