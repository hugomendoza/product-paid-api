import { prisma } from '../postgres-db';
import { products as seedProducts } from './data';

async function main() {
  const deleteDeliveries = await prisma.delivery.deleteMany();
  const deleteTransactions = await prisma.transaction.deleteMany();
  const deleteCustomers = await prisma.customer.deleteMany();
  const deleteProducts = await prisma.product.deleteMany();

  Promise.all([deleteCustomers, deleteDeliveries, deleteProducts, deleteTransactions]);

  await prisma.product.createMany({
    data: seedProducts,
  });

  await prisma.$disconnect();
}

(async () => {
  await main();
})();
