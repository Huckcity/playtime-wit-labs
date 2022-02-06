import { view } from "@hapi/vision/lib/schemas.js";
import { db } from "../models/db.js";
import { AddPlaylistSpec, AddTrackSpec } from "../models/joi-schemas.js";

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
    validate: {
      payload: AddPlaylistSpec,
      options: { abortEarly: false },
      failAction: async (req, h, error) => {
        const loggedInUser = req.auth.credentials;
        const playlists = await db.playlistStore.getUserPlaylists(
          loggedInUser._id
        );

        const viewData = {
          title: "Playtime Dashboard",
          user: loggedInUser,
          playlists,
          errors: error.details,
        };
        return h.view("dashboard-view", viewData).takeover().code(400);
      },
    },
    handler: async (req, h) => {
      const loggedInUser = req.auth.credentials;
      const newPlaylist = {
        userId: loggedInUser._id,
        title: req.payload.name,
      };
      await db.playlistStore.addPlaylist(newPlaylist);
      return h.redirect("/dashboard");
    },
  },

  showPlaylist: {
    handler: async (req, h) => {
      const playlist = await db.playlistStore.getPlaylistById(req.params.id);
      const viewData = {
        playlist,
      };
      return h.view("playlist-view", viewData);
    },
  },

  addTrack: {
    validate: {
      payload: AddTrackSpec,
      async failAction(req, h, error) {
        const playlist = await db.playlistStore.getPlaylistById(req.params.id);
        const viewData = {
          playlist,
          errors: error.message,
        };
        return h.view("playlist-view", viewData).takeover().code(400);
      },
    },
    handler: async (req, h) => {
      const { title, artist, duration } = req.payload;
      const track = {
        title,
        artist,
        duration,
      };
      const pl = await db.trackStore.addTrack(req.params.id, track);
      return h.redirect(`/dashboard/playlist/${req.params.id}`);
    },
  },

  deleteTrack: {
    handler: async (req, h) => {
      const res = await db.trackStore.deleteTrack(req.params.trackId);
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
