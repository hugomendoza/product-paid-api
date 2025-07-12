import { prisma } from '../postgres';
import { products as seedProducts } from './data';

async function main() {
  const deleteCustomers = prisma.customer.deleteMany();
  const deleteDeliveries = prisma.delivery.deleteMany();
  const deleteProducts = prisma.product.deleteMany();
  const deleteTransactions = prisma.transaction.deleteMany();

  await prisma.$transaction([
    deleteCustomers,
    deleteDeliveries,
    deleteProducts,
    deleteTransactions,
  ]);

  await prisma.product.createMany({
    data: seedProducts,
  });

  await prisma.$disconnect();
}

(async () => {
  await main();
})();
