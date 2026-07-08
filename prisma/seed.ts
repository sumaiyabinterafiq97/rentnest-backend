import bcrypt from 'bcrypt';
import config from '../src/config';

import prisma from '../src/shared/prisma';

async function main() {
  const adminEmail = 'admin@rentnest.com';
  const adminPassword = 'admin123';
  
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, Number(config.bcrypt_salt_rounds) || 12);
    await prisma.user.create({
      data: {
        name: 'Super Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'ADMIN'
      }
    });
    console.log('Admin user seeded successfully');
  } else {
    console.log('Admin user already exists');
  }

  // Seed Categories
  const categories = ['Apartment', 'House', 'Studio', 'Villa'];
  for (const name of categories) {
    const exists = await prisma.category.findUnique({ where: { name } });
    if (!exists) {
      await prisma.category.create({ data: { name } });
    }
  }
  console.log('Categories seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
