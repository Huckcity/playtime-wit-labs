import { v4 } from "uuid";

let users = [];

export const userMemStore = {
  async getAllUsers() {
    return users;
  },

  async addUser(user) {
    user._id = v4();
    users.push(user);
  },

  async getUserById(id) {
    return users.find((user) => user._id === id);
  },

  async getUserByEmail(email) {
    return users.find((user) => user.email === email);
  },

  async deleteUserById(id) {
    return users.splice(
      users.findIndex((user) => user._id === id),
      1
    );
  },

  async deleteAll() {
    users = [];
  },
};
