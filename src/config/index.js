import path from "path";

const funcs = {};

function getConfigPath() {
  const CONFIG_FILE = "taupahji.config.js";
  // read config from root of working directory
  return path.join(path.resolve(), CONFIG_FILE);
}

function loadConfigJS(filePath) {
  try {
    const config = require(filePath);
  } catch (err) {
    err.message = "taupahji.config.js not found.";
    throw err;
  }
  return config;
}

funcs.getConfigPath = getConfigPath;
funcs.loadConfigJS = loadConfigJS;

const config = loadConfigJS(getConfigPath());

const configGenerator = {
  專案: () => (config.專案),
  全部腔口: () => (config.腔口),
  預設腔口: () => (config.腔口[0]),
  範例查詢: () => (config.範例查詢),
  頁尾連結: () => (config.頁尾連結),
};

export { funcs as FUNC };

export default configGenerator;
