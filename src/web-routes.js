import { dashboardController } from "./controllers/dashboard-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },

  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  {
    method: "POST",
    path: "/dashboard/addplaylist",
    config: dashboardController.addPlaylist,
  },
  {
    method: "GET",
    path: "/dashboard/playlist/{id}",
    config: dashboardController.showPlaylist,
  },
  {
    method: "POST",
    path: "/dashboard/playlist/{id}/addtrack",
    config: dashboardController.addTrack,
  },
  {
    method: "GET",
    path: "/dashboard/playlist/{id}/deletetrack/{trackId}",
    config: dashboardController.deleteTrack,
  },
  {
    method: "GET",
    path: "/dashboard/playlist/{id}/delete",
    config: dashboardController.deletePlaylist,
  },
];
