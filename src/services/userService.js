const db = require("../models");
const bcrypt = require("bcrypt");
const user = require("../models/user");
const { where } = require("sequelize");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

let handleCheckUserName = (userName) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { userName: userName } });

      if (user) {
        resolve({ isExisted: true, user: user });
      }
      resolve({ isExisted: false });
    } catch (error) {
      reject(error);
    }
  });
};

let handleGetUserByName = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {
          userName: name,
        },
      });
      if (user) {
        resolve({
          code: 1,
          message: "User exited",
        });
      } else {
        resolve({
          code: 0,
          data: user,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleHashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hash(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};

let handleCheckPassword = (password, hashPassword) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkPassword = await bcrypt.compareSync(password, hashPassword);
      resolve(checkPassword);
    } catch (error) {
      reject(error);
    }
  });
};

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkUserName = await handleCheckUserName(data.userName);
      if (checkUserName.isExisted) {
        resolve({
          code: 2,
          message: "UserName existed. Please use  another username.",
        });
        return;
      }

      let hashUserPassword = await handleHashUserPassword(data.password);
      let newUser = await db.User.create({
        ...data,
        password: hashUserPassword,
      });
      if (newUser) {
        resolve({
          code: 1,
          message: "Create new user  successfully!",
          data: newUser,
        });
      }
      resolve({
        code: 0,
        message: "Create new user fail",
        data: null,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let handleGetAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        attributes: {
          exclude: ["password"],
        },
        where: { roleId: 1, isDelete: false }, // only get the normal user info
      });
      if (users) {
        resolve({
          code: 1,
          data: users,
        });
      }
      resolve({
        code: 4,
        data: users,
      });
    } catch (error) {
      reject({ code: 5, message: error });
    }
  });
};

let hanleGetAccountMe = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userAccount = await db.User.findOne({ where: { id: id } });
      if (userAccount) {
        resolve({
          code: 200,
          message: "Login successful",
          userAccount: userAccount,
        });
      }
      resolve({
        code: 404,
        message: "Not found",
        userAccount: userAccount,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let handleLogin = (data) => {
  return new Promise(async (resolve, reject) => {
    let user;
    try {
      let checkUserName = await handleCheckUserName(data.userName);
      if (checkUserName.isExisted) {
        user = await db.User.findOne({
          where: { userName: data.userName },
        });
        let checkPassword = await handleCheckPassword(
          data.password,
          user.password
        );

        user = await db.User.findOne({
          where: { userName: data.userName },
          attributes: {
            exclude: ["password"],
          },
        });
        if (checkPassword) {
          if (user.roleId == 1) {
            resolve({
              code: 1,
              message: "Login  Successfully!",
              user: user,
            });
          }
          resolve({
            code: 10,
            message: "Login  Successfully!",
            user: user,
          });
        }
        resolve({
          code: 0,
          message: "Login  Failed!",
        });
      }
      resolve({
        code: 0,
        message: "Login  Failed!",
      });
    } catch (error) {
      reject({ code: 5, message: error });
    }
  });
};

let createNewAdmin = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkAdminName = await handleCheckUserName(data.userName);
      if (checkAdminName.isExisted) {
        resolve({
          code: 2,
          message: "UserName existed. Please use  another username.",
        });
      }

      let hashUserPassword = await handleHashUserPassword(data.password);
      let newAdmin = await db.User.create({
        ...data,
        password: hashUserPassword,
      });
      if (newAdmin) {
        resolve({
          code: 1,
          message: "Create new Admin  successfully!",
          data: newAdmin,
        });
      }
      resolve({
        code: 0,
        message: "Create new Admin fail",
        data: null,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let deleteAccount = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { id: data.id } });
      if (user) {
        let result = await db.User.update(
          { isDelete: true },
          { where: { id: user.id } }
        );
        if (result[0] > 0) {
          resolve({ code: 1, message: "Successfully deleted the account" });
        } else {
          resolve({ code: 0, message: "Failed to delete the account" });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleGetUserById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { id: id } });
      if (user) {
        resolve({ code: 1, message: "Found user", data: user });
      } else {
        resolve({ code: 0, message: "Not Found user" });
      }
    } catch (error) {
      reject({ code: 5, message: error });
    }
  });
};

module.exports = {
  createNewUser,
  handleGetAllUser,
  handleLogin,
  createNewAdmin,
  hanleGetAccountMe,
  deleteAccount,
  handleGetUserById,
  handleGetUserByName,
  handleCheckUserName,
};
