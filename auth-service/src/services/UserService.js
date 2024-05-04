const UserRepository = require('../repositories/UserRepositories');

class UserService {
  constructor() {
    this.user = new UserRepository();
  }

  async getUsers() {
    const users = await this.user.getAllUsers();

    return users;
  }
}

module.exports = UserService;
