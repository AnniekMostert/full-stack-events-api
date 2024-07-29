import { PrismaClient } from "@prisma/client";

const createEvent = async (
  title,
  description,
  location,
  image,
  startTime,
  endTime,
  createdBy,
  categoryIds
) => {
  const prisma = new PrismaClient();

  const newEvent = await prisma.event.create({
    data: {
      title,
      description,
      location,
      image,
      startTime,
      endTime,
      createdBy: {
        connect: { id: createdBy },
      },
      categoryIds: {
        connect: categoryIds.map((categoryId) => ({ id: categoryId })),
      },
    },
  });

  return newEvent;
};

export default createEvent;
