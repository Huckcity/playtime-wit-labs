import { assert } from "chai";
import { db } from "../src/models/db.js";
import { singlePlaylist, playlistArray } from "./fixtures.js";

suite("Playlist API tests", () => {
  setup(async () => {
    db.init();
    await db.playlistStore.deleteAll();
    for (let i = 0; i < playlistArray.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await db.playlistStore.addPlaylist(playlistArray[i]);
    }
  });

  // get one playlist
  test("get one playlist - success", async () => {
    assert.deepEqual(
      singlePlaylist,
      await db.playlistStore.addPlaylist(singlePlaylist)
    );
  });

  // add playlist
  test("add playlist - success", async () => {
    assert.equal(
      singlePlaylist,
      await db.playlistStore.addPlaylist(singlePlaylist)
    );
  });

  // delete playlist by id
  test("delete playlist by id - fail", async () => {
    await db.playlistStore.deletePlaylistById("123");
    const allPlaylists = await db.playlistStore.getAllPlaylists();
    assert.equal(allPlaylists.length, playlistArray.length);
  });

  test("delete playlist by id - success", async () => {
    await db.playlistStore.deletePlaylistById(playlistArray[0]._id);
    const allPlaylists = await db.playlistStore.getAllPlaylists();
    assert.equal(allPlaylists.length, playlistArray.length - 1);
  });

  // delete all playlists
});
