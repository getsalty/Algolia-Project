import { User } from '@prisma/client';
import { prisma } from '~/utils/prisma';

export type UserInfo = Pick<User, 'name' | 'image'>;

export const getUserInfo = async (
  userId: string,
): Promise<UserInfo | Error> => {
  try {
    const user = await prisma.user.findFirst({
      select: { name: true, image: true },
      where: { id: userId },
    });

    return user ?? new Error('User not found');
  } catch (error) {
    return error as Error;
  }
};
