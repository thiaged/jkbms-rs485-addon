console.log("✅ config.js is being loaded");

const config = require("/config/smartphoton_jkbms/settings.js");

const fs = require("fs");
const options = JSON.parse(fs.readFileSync("/data/options.json", "utf8"));
const bcrypt = require("bcryptjs");

if ("theme" in options && options.theme !== "default") {
  config.editorTheme.theme = options.theme;
}

config.debugUseColors = false;
config.flowFile = "flows.json";
config.nodesDir = "/config/smartphoton_jkbms/nodes";
config.uiPort = 1891;
config.userDir = "/config/smartphoton_jkbms/";
config.httpNodeRoot = "/endpoint";

console.log("✅ Node-RED is using userDir =", config.userDir);
console.log("✅ Node-RED is using uiPort =", config.uiPort);

config.credentialSecret = "domosimple";
config.flowFilePretty = true;

config.contextStorage = {
  default: {
    module: 'localfilesystem',
    config: {
      dir: '/config/smartphoton_jkbms/global-variables',
      flushInterval: '5'
    }
  }
};

config.adminAuth = {
  type: "credentials",
  users: [
    {
      username: "thiaged",
      password: "$2y$08$glpFrRgE52xXuushNiZcieD7tmv5NgDE1nSQ0SE8qoeUlQqzQ0.li",
      permissions: "*"
    }
  ]
};

config.httpNodeAuth = {
  user: "thiaged",
  pass: "$2y$08$glpFrRgE52xXuushNiZcieD7tmv5NgDE1nSQ0SE8qoeUlQqzQ0.li"
};

config.httpStaticAuth = {
  user: "thiaged",
  pass: "$2y$08$glpFrRgE52xXuushNiZcieD7tmv5NgDE1nSQ0SE8qoeUlQqzQ0.li"
};

if (options.log_level) {
  config.logging.console.level = options.log_level.toLowerCase();
  if (config.logging.console.level === "warning") {
    config.logging.console.level = "warn";
  }
}

module.exports = config;
