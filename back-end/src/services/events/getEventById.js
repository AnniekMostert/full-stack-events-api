import { PrismaClient } from "@prisma/client";

const getEventById = async (id) => {
  const prisma = new PrismaClient();
  const event = await prisma.event.findUnique({
    include: {
      categories: true,
    },
    where: { id },
  });

  return event;
};

export default getEventById;
