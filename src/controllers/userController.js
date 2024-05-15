const userService = require("./../services/userService");
const { useGoogleLogin } = require("@react-oauth/google");
let sessions = {};

let handleCreateNewUser = async (req, res) => {
  if (!res.isLoginGoogle) {
    if (!req.body.userName || !req.body.password) {
      return res.status(400).json({
        code: 400,
        message: "Username and password are required fields",
      });
    }
  }

  let result = await userService.createNewUser(req.body);

  return res.status(200).json(result);
};

let handleGetUserByName = async (req, res) => {
  let username = req.params.name;
  console.log("name", username);
  let result = await userService.handleCheckUserName(username);
  return res.json({ isExisted: result });
};

let handleGetAllUser = async (req, res) => {
  let result = await userService.handleGetAllUser();
  if (result.code === 5) {
    return res.status(500).json({ message: "Internal Server Error" });
  } else if (result.code === 4) {
    return res.status(404).json({ message: "No User Found" });
  } else {
    return res.status(200).json(result);
  }
};

let handleGetUserById = async (req, res) => {
  let result = await userService.handleGetUserById(req.params.id);
  if (result.code === 5) {
    return res.status(500).json({ message: "Internal Server Error" });
  } else if (result.code === 0) {
    return res.status(404).json({ message: "No User Found" });
  } else {
    return res.status(200).json(result);
  }
};

let handleLogin = async (req, res) => {
  if (!req.body.userName || !req.body.password) {
    return res.status(400).json({
      code: 400,
      message: "Username and password are required fields",
    });
  }

  let result = await userService.handleLogin(req.body);
  if (result.code == 1 || result.code == 10) {
    const sessionId = Date.now().toString() + Math.random().toString();
    sessions[sessionId] = {
      sub: result.user.id,
    };

    return res
      .setHeader(
        "Set-Cookie",
        `sessionId=${sessionId};Max-Age=3600; HttpOnly;Secure; SameSite=none`
      )
      .status(200)
      .json({
        message: "Login  Success",
        sessionId: sessionId,
        code: 200,
        data: result.user,
      });
  } else if (result.code == 0) {
    return res
      .status(404)
      .json({ code: 404, message: "Username or password  is incorrect!" });
  } else {
    return res
      .status(500)
      .json({ code: 500, message: "Internal Server Error" });
  }
};

let handleAuthMe = async (req, res) => {
  const session = sessions[req.cookies.sessionId];
  if (!session) {
    console.log("err1");
    return res.status(401).json({
      code: 401,
      message: "Unauthorized!",
    });
  }
  if (!req.cookies) {
    console.log("err1");

    return res.status(401).json({
      code: 401,
      message: "Unauthorized!",
    });
  }
  let result = await userService.hanleGetAccountMe(session.sub);
  if (result.code == 200) {
    return res.status(200).json(result);
  } else if (result.code == 404) {
    return res.status(404).json(result);
  }
  console.log(session);
};

let handleUserLogOut = (req, res) => {
  delete sessions[req.cookies.sessionId];
  return res
    .setHeader(
      "Set-Cookie",
      "sessionId=; Max-Age=0; HttpOnly=false; Secure=false"
    )
    .status(200)
    .json({ code: 200 });
};

let handleCreateNewAdmin = async (req, res) => {
  let result = await userService.createNewAdmin(req.body);
  return res.json(result);
};

let handleDeleteAccount = async (req, res) => {
  let result = await userService.deleteAccount(req.body);
  return res.json(result);
};

module.exports = {
  handleCreateNewUser,
  handleGetAllUser,
  handleLogin,
  handleAuthMe,
  handleUserLogOut,
  handleCreateNewAdmin,
  handleDeleteAccount,
  handleGetUserById,
  handleGetUserByName,
};
