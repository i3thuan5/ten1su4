# 𢯭手 ten-suˋ
[![Build Status](https://travis-ci.org/i3thuan5/ten1su4.svg?branch=master)](https://travis-ci.org/i3thuan5/ten1su4)
[![devDependency Status](https://david-dm.org/i3thuan5/ten1su4/dev-status.svg)](https://david-dm.org/i3thuan5/ten1su4#info=devDependencies)

## 使用
1. 安裝`ten1su4@1.0.0`
2. 新增taupahji.config.js
3. 讓你的webpack.config.js讀取taupahji.config.js
```js
plugins: [
    new webpack.ProvidePlugin({
      tensuConfig: "tensuConfig",
    }),
  ],
  resolve: {
    alias: {
      tensuConfig: path.join(path.resolve(), "taupahji.config.js"),
    },
  },
```

## 開發
### 安裝
先裝`nodejs 6`
```bash
npm i
npm start
打開 http://localhost:3000/
```

### 排版
```bash 
npm run reformat
```

### 佈署
```
npm run publish-lib
```

## API
* [臺灣言語服務](https://github.com/sih4sing5hong5/tai5-uan5_gian5-gi2_hok8-bu7)

## License授權
MIT License <http://g0v.mit-license.org/>
