# Tailwindcss HTML
- 使用 tailwindcss 写 html 页面，提高页面输出效率  
- 页面写完后，用打包命令打包，得到打包后的 js、css 等文件  
- 静态资源文件，放在 public 文件夹下即可


### 本地开发

```
第一步: yarn install 或者 yarn
第二步: yarn dev
```

### 打包
```
yarn build
```


> 使用如下命令(需要开2个终端)，可以在开发的同时，实时更新打包后的文件
```
终端一: yarn dev
终端二: yarn build:watch
```


## 项目结构说明
```
├── public                     # 项目公共静态资源目录
│   └── img                    # 静态图片目录
├── index.css                  # 页面css
├── index.html                 # 页面html
├── index.js                   # 页面js
├── package.json               # 项目包管理说明
├── tailwind.config.js         # tailwindcss 配置
└── vite.config.js             # 项目打包配置
```
