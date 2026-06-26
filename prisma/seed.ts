import 'dotenv/config'; 
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

// 1. Creamos un pool de conexiones nativo de PostgreSQL usando la librería 'pg'
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

// 2. Le pasamos el adaptador oficial al constructor de Prisma 7
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🔄 Limpiando base de datos...');
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.user.deleteMany();

  console.log('🌱 Creando marcas de lujo...');
  const chanel = await prisma.brand.create({
    data: { name: 'Chanel', logo: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=300' }
  });

  const dior = await prisma.brand.create({
    data: { name: 'Dior', logo: 'https://images.unsplash.com/photo-1628149455678-16f37bc392f4?w=300' }
  });

  const versace = await prisma.brand.create({
    data: { name: 'Versace', logo: 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=300' }
  });

  console.log('🛍️ Insertando perfumes destacados...');
  await prisma.product.createMany({
    data: [
      {
        name: 'Bleu de Chanel',
        description: 'Una fragancia atemporal, amaderada y aromática con una estela cautivadora. Un elogio a la libertad masculina.',
        price: 8500.00, // Pesos Dominicanos
        stock: 15,
        gender: 'HOMBRE',
        size: 100,
        images: ['https://images.unsplash.com/photo-1541643600914-78b084683601?w=500'],
        topNotes: ['Toronja', 'Limón', 'Menta', 'Pimienta Rosa'],
        heartNotes: ['Jengibre', 'Nuez Moscada', 'Jazmín'],
        baseNotes: ['Incienso', 'Vetiver', 'Cedro', 'Sándalo'],
        brandId: chanel.id,
      },
      {
        name: 'Sauvage Eau de Parfum',
        description: 'La frescura jugosa y espirituosa de Sauvage exuda facetas nuevas, sensuales y misteriosas.',
        price: 9200.00,
        stock: 20,
        gender: 'HOMBRE',
        size: 100,
        images: ['https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500'],
        topNotes: ['Bergamota de Calabria'],
        heartNotes: ['Pimienta de Sichuan', 'Lavanda', 'Anís estrellado', 'Nuez moscada'],
        baseNotes: ['Ambroxan', 'Vainilla de Papúa Nueva Guinea'],
        brandId: dior.id,
      },
      {
        name: 'Eros Eau de Toilette',
        description: 'Sublime masculinidad a través de un aura luminosa con una frescura intensa, vibrante y brillante.',
        price: 7300.00,
        stock: 8,
        gender: 'UNISEX',
        size: 100,
        images: ['https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500'],
        topNotes: ['Menta', 'Manzana Verde', 'Limón'],
        heartNotes: ['Haba Tonka', 'Ambroxan', 'Geranio'],
        baseNotes: ['Vainilla de Madagascar', 'Cedro de Virginia', 'Vetiver'],
        brandId: versace.id,
      }
    ]
  });

  console.log('✨ Base de datos poblada con éxito.');
}

main()
  .catch((e) => {
    console.error('❌ Error ejecutando el seed script:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });