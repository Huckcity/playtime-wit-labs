import { assert } from "chai";
import { db } from "../src/models/db.js";
import { singleUser, usersArray } from "./fixtures.js";

suite("User API tests", () => {
  setup(async () => {
    db.init();
    await db.userStore.deleteAll();
    for (let i = 0; i < usersArray.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      usersArray[i] = await db.userStore.addUser(usersArray[i]);
    }
  });

  test("create a user", async () => {
    assert.deepEqual(singleUser, await db.userStore.addUser(singleUser));
  });

  test("get a user - failure", async () => {
    assert.isNull(await db.userStore.getUserById("123"));
    assert.isNull(await db.userStore.getUserByEmail("fake@email.com"));
  });

  test("get a user - bad params", async () => {
    assert.isNull(await db.userStore.getUserByEmail(""));
    assert.isNull(await db.userStore.getUserById(""));
    assert.isNull(await db.userStore.getUserById());
  });

  test("delete one user - fail", async () => {
    await db.userStore.deleteUserById("badId");
    const allUsers = await db.userStore.getAllUsers();
    assert.equal(usersArray.length, allUsers.length);
  });

  test("delete one user - success", async () => {
    await db.userStore.deleteUserById(usersArray[0]._id);
    const returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, usersArray.length - 1);
    const deletedUser = await db.userStore.getUserById(usersArray[0]._id);
    assert.isNull(deletedUser);
  });

  test("delete all users", async () => {
    let currentUsers = await db.userStore.getAllUsers();
    assert.equal(currentUsers.length, 3);
    await db.userStore.deleteAll();
    currentUsers = await db.userStore.getAllUsers();
    assert.equal(currentUsers.length, 0);
  });
});
