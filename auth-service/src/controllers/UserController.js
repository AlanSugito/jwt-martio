const UserService = require('../services/UserService');

const service = new UserService();

class UserController {
  static async getAllUsers(_, res, next) {
    try {
      const users = await service.getUsers();

      res.status(200).json({message: 'Success', data: {users}});
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
