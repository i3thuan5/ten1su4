import config from "../../taupahji.config";

const configGenerator = {
  專案: () => (config.專案),
  全部腔口: () => (config.腔口),
  預設腔口: () => (config.腔口[0]),
};

export default configGenerator;
