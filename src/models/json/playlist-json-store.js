import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";
import { trackJsonStore } from "./track-json-store.js";

const db = new Low(new JSONFile("./src/models/json/playlists.json"));
db.data = { playlists: [] };

export const playlistJsonStore = {
  async getAllPlaylists() {
    await db.read();
    return db.data.playlists;
  },

  async addPlaylist(playlist) {
    await db.read();
    playlist._id = v4();
    db.data.playlists.push(playlist);
    await db.write();
    return playlist;
  },

  async getPlaylistById(id) {
    await db.read();
    const list = db.data.playlists.find((playlist) => playlist._id === id);
    list.tracks = await trackJsonStore.getTracksByPlaylistId(list._id);
    return list;
  },

  async getUserPlaylists(id) {
    await db.read();
    return db.data.playlists.filter((playlist) => playlist.userId === id);
  },

  async deletePlaylistById(id) {
    await db.read();
    const index = db.data.playlists.findIndex(
      (playlist) => playlist._id === id
    );
    if (index !== -1) db.data.playlists.splice(index, 1);
    await db.write();
  },

  async deleteAll() {
    db.data.playlists = [];
    await db.write();
  },
};
