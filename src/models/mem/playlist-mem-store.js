import { v4 } from "uuid";

let playlists = [];

export const playlistMemStore = {
  async getAllPlaylists() {
    return playlists;
  },

  async addPlaylist(playlist) {
    playlist._id = v4();
    playlists.push(playlist);
    return playlist;
  },

  async getPlaylistById(id) {
    return playlists.find((playlist) => playlist._id === id);
  },

  async deletePlaylistById(id) {
    return playlists.splice(
      playlists.findIndex((playlist) => playlist._id === id),
      1
    );
  },

  async deleteAllPlaylists() {
    playlists = [];
  },

  async addTrackToPlaylist(id, track) {
    const pl = playlists.find((playlist) => playlist._id === id);
    track._id = v4();
    if (pl.tracks) {
      pl.tracks.push(track);
    } else {
      pl.tracks = [track];
    }
    return pl;
  },

  async deleteTrackFromPlaylist(id, trackId) {
    const pl = playlists.find((playlist) => playlist._id === id);
    console.log(pl);
    pl.tracks.splice(
      pl.tracks.findIndex((track) => track._id === trackId),
      1
    );
    return pl;
  },

  async getUserPlaylists(userId) {
    return playlists.filter((playlist) => playlist.userId === userId);
  },
};
