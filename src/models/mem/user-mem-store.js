import { v4 } from "uuid";

let users = [];

export const userMemStore = {
  async getAllUsers() {
    return users;
  },

  async addUser(user) {
    user._id = v4();
    users.push(user);
    return user;
  },

  async getUserById(id) {
    const returnedUser = users.find((user) => user._id === id);
    return returnedUser === undefined ? null : returnedUser;
  },

  async getUserByEmail(email) {
    const returnedUser = users.find((user) => user.email === email);
    return returnedUser === undefined ? null : returnedUser;
  },

  async deleteUserById(id) {
    const index = users.findIndex((user) => user._id === id);
    if (index !== -1) users.splice(index, 1);
  },

  async deleteAll() {
    users = [];
  },
};
