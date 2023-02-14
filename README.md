# Tailwindcss HTML

## 目标
- 使用 tailwindcss 写 html 页面，提高页面输出效率  
- 页面写完后，用打包命令打包，得到打包后的 js、css 等文件  
- 静态资源文件，放在 public 文件夹下即可

## 收益
- 1、用工程化的方式写页面，修改样式等实时更新
- 2、引入 tailwindcss，基本可以做到不手写样式
- 3、按需打包。tailwindcss内置可能有几万个class，打包时只会打包项目中用到的class类

## 不足
- tailwindcss 自定义的 class 类，px 单位不能转为 vw ，需要手动计算
> 如 `text-[28px] lg:text-[70px]`，表示字体在移动端显示为 28px , 在 pc 端显示为 70px  
> 但 px 自动转 vw 插件无法识别，需要自己手动计算。


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
