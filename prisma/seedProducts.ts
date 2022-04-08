import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function main() {
  [...Array.from(Array(30).keys())].forEach(async (item) => {
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
        image: "7975a2a0-04d0-415d-6f03-7c3d04a31a00",
      },
    });
    console.log(`${item}/30`);
  });
}

main()
  .catch(console.log)
  .finally(() => client.$disconnect());
