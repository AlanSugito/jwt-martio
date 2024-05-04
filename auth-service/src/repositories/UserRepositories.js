const prisma = require('../apps/prisma');
const APIError = require('../utils/APIError');
const Cryptographer = require('../utils/Cryptographer');

class UserRepository {
  async save(data) {
    const {password} = data;
    const hashedPassword = await Cryptographer.hash(password);

    const user = await prisma.user.create({
      data: {...data, password: hashedPassword},
      select: {id: true},
    });

    return user;
  }

  async getUser(email) {
    const user = await prisma.user.findUnique({
      where: {email},
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return user;
  }

  async getAllUsers() {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      return users;
    } catch (error) {
      throw new APIError(500, 'Internal Server Error');
    }
  }

  async getUserCredentials(email) {
    const userCredentials = await prisma.user.findUnique({
      where: {email},
      select: {
        id: true,
        email: true,
        password: true,
      },
    });

    if (!userCredentials) throw new APIError(404, 'user not found');

    return userCredentials;
  }

  async getUserToken(token) {
    const userToken = await prisma.token.findFirst({where: {token}});

    if (!userToken) throw new APIError(404, 'Token not found');

    return userToken;
  }

  async setUserToken(id, token) {
    const result = await prisma.token.create({
      data: {token, userId: id},
    });

    return result.id;
  }
}

module.exports = UserRepository;
