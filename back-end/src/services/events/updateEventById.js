import { PrismaClient } from "@prisma/client";

const updateEventById = async (id, updatedEvent) => {
  const prisma = new PrismaClient();
  const { createdBy, categoryIds, ...rest } = updatedEvent;

  const event = await prisma.event.updateMany({
    where: {
      id,
    },
    data: {
      ...rest,
      createdBy: createdBy ? { connect: { id: createdBy } } : undefined,
      categoryIds: categoryIds
        ? { connect: categoryIds.map((categoryId) => ({ id: categoryId })) }
        : undefined,
    },
  });
  
  return event;
};

export default updateEventById;
