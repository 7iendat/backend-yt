const express = require("express");
const userController = require("../controllers/userController");

let router = express.Router();

let initUserRoutes = (app) => {
  router.get("/api/get-all-user", userController.handleGetAllUser);
  router.get("/api/get-user-by-id/:id", userController.handleGetUserById);
  router.get("/api/get-user-by-name/:name", userController.handleGetUserByName);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.post("/login", userController.handleLogin);
  router.get("/api/auth/me", userController.handleAuthMe);
  router.get("/api/auth/logOut", userController.handleUserLogOut);
  router.post("/api/create-new-admin", userController.handleCreateNewAdmin);
  router.post("/api/deleteAccount", userController.handleDeleteAccount);

  return app.use("/", router);
};

module.exports = initUserRoutes;
