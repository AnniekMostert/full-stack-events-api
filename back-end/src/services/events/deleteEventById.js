import { PrismaClient } from "@prisma/client";

const deleteEventById = async (id) => {
  const prisma = new PrismaClient();

  const deletedEvent = await prisma.event.deleteMany({
    where: {
      id,
    },
  });

  return deletedEvent;
};

export default deleteEventById;
