import { PrismaClient } from "@prisma/client";

const deleteUserById = async (id) => {
  const prisma = new PrismaClient();
  const deletedUser = await prisma.user.deleteMany({
    where: { id },
  });

  return deletedUser;
};

export default deleteUserById;
