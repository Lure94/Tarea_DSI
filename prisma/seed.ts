import 'dotenv/config';
import pkg from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const { PrismaClient, Role } = pkg;

const dbUrl = process.env.DATABASE_URL || 'file:./prisma/dev.db';
const adapter = new PrismaBetterSqlite3({ url: dbUrl });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Iniciando el proceso de seed...');

  await prisma.user.deleteMany();
  await prisma.tenant.deleteMany();

  const tenant = await prisma.tenant.create({
    data: {
      name: 'Empresa Alpha',
      users: {
        create: [
          {
            name: 'Administrador Alpha',
            email: 'admin@alpha.com',
            password: 'hashed_password_123',
            telephone: '+505 8888-1111',
            roles: Role.ADMIN,
          },
          {
            name: 'Carlos Mendoza',
            email: 'carlos@alpha.com',
            password: 'hashed_password_456',
            telephone: '+505 8888-2222',
            roles: Role.USER,
          },
        ],
      },
    },
    include: {
      users: true,
    },
  });

  console.log('Seed completado con éxito:');
  console.dir(tenant, { depth: null });
}

main()
  .catch((e) => {
    console.error('Error durante la ejecución del seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });