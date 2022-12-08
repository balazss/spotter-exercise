import { db } from "../utils/db.server.js";

export const findMany = async (limit, offset, query) => {
  const baseQuery = {
    where: {
      OR: [
        {
          vendor: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          title: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
  };

  const filters = {
    take: limit,
    skip: offset,
    orderBy: [
      {
        price: "asc",
      },
      {
        id: "desc",
      },
    ],
  };

  try {
    const [count, products] = await db.$transaction([
      db.product.count({
        ...baseQuery,
      }),
      db.product.findMany({
        ...baseQuery,
        ...filters,
      }),
    ]);
    return {
      count: count,
      products: products,
    };
  } catch (error) {
    throw error;
  }
};
