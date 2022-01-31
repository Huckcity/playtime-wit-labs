import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async (req, h) => {
      const loggedInUser = req.auth.credentials;
      const playlists = await db.playlistStore.getUserPlaylists(
        loggedInUser._id
      );
      const viewData = {
        title: "Playtime Dashboard",
        user: loggedInUser,
        playlists,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addPlaylist: {
    handler: async (req, h) => {
      const loggedInUser = req.auth.credentials;
      const newPlaylist = {
        userId: loggedInUser._id,
        title: req.payload.title,
      };
      await db.playlistStore.addPlaylist(newPlaylist);
      return h.redirect("/dashboard");
    },
  },

  showPlaylist: {
    handler: async (req, h) => {
      const playlist = await db.playlistStore.getPlaylistById(req.params.id);
      return h.view("playlist-view", playlist);
    },
  },

  addTrack: {
    handler: async (req, h) => {
      const { name, duration } = req.payload;
      const track = {
        name,
        duration,
      };
      const pl = await db.playlistStore.addTrackToPlaylist(
        req.params.id,
        track
      );
      return h.redirect(`/dashboard/playlist/${pl._id}`);
    },
  },

  deleteTrack: {
    handler: async (req, h) => {
      const res = await db.playlistStore.deleteTrackFromPlaylist(
        req.params.id,
        req.params.trackId
      );
      console.log(res);
      return h.redirect(`/dashboard/playlist/${req.params.id}`);
    },
  },

  deletePlaylist: {
    handler: async (req, h) => {
      await db.playlistStore.deletePlaylistById(req.params.id);
      return h.redirect("/dashboard");
    },
  },
};
