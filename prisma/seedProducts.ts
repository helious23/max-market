import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function main() {
  [...Array.from(Array(100).keys())].forEach(async (item) => {
    await client.product.create({
      data: {
        name: String(item),
        description: String(item),
        price: item,
        user: {
          connect: {
            id: 9,
          },
        },
        image: "xx",
      },
    });
    console.log(`${item}/100`);
  });
}

main()
  .catch(console.log)
  .finally(() => client.$disconnect());
