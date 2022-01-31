import { db } from "../models/db.js";

export const accountsController = {
  index: {
    auth: false,
    handler: (req, h) => h.view("main", { title: "Welcome to Playlist!" }),
  },

  showSignup: {
    auth: false,
    handler: (req, h) =>
      h.view("signup-view", { title: "Sign up for Playlist" }),
  },

  signup: {
    auth: false,
    handler: async (req, h) => {
      const user = req.payload;
      await db.userStore.addUser(user);
      return h.redirect("/");
    },
  },

  showLogin: {
    auth: false,
    handler: (req, h) => h.view("login-view", { title: "Login to Playlist" }),
  },

  login: {
    auth: false,
    handler: async (req, h) => {
      const { email, password } = req.payload;
      const user = await db.userStore.getUserByEmail(email);
      if (!user || user.password !== password) {
        return h.redirect("/");
      }
      req.cookieAuth.set({ id: user._id });
      return h.redirect("/dashboard");
    },
  },

  logout: {
    handler: (req, h) => {
      req.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  async validate(req, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { valid: false };
    }
    return { valid: true, credentials: user };
  },
};
