# Tailwindcss HTML

## 目标
- 使用 tailwindcss 写 html 页面，提高页面输出效率  
- 页面写完后，用打包命令打包，得到打包后的 js、css 等文件  
- 支持多页面入口，一并打包，打包后得到各个页面的 html、js、css 文件
- 静态资源文件，放在 public 文件夹下即可

## 收益
- 1、用工程化的方式写页面，修改样式等实时更新
- 2、引入 tailwindcss，基本可以做到不手写样式
- 3、按需打包。tailwindcss 可能内置有几万个 class，打包时只会打包项目中用到的 class 类

## 不足
- tailwindcss 自定义的 class 类，px 单位不能转为 vw ，需要手动计算
> 如 `text-[56px] lg:text-[70px]`，表示字体在移动端（按750像素）显示为 56px , 在 pc 端显示为 70px  
> 但 `px 自动转 vw 插件`无法识别，需要自己手动计算。  
>  
> 移动端设计稿尺寸是 750 像素，则 56/7.5 = 7.466666666666667 ；那么 `text-[56px]` 就得写成 `text-[7.466666666666667vw]`  
> PC 端设计稿尺寸是 1920 像素，则 70/19.2 = 3.6458333333333335 ；那么 `text-[70px]` 就得写成 `text-[3.6458333333333335vw]`


## 项目结构说明
```
├── public                     # 项目公共静态资源目录
│   └── img                    # 静态图片目录
├── page                       # 多页面
│   ├── help-you-choose          # help-you-choose 智能选购页
|   |   ├── index.css       
│   │   ├── index.html
│   │   └── index.js
│   ├── sp-collection          # sp-collection SP 聚合页
|   |   ├── index.css       
│   │   ├── index.html
│   │   └── index.js
│   └── ...                    # 更多页面
│
├── common.css                 # 页面 css（公共）
├── index.html                 # 项目页面入口，仅作示例页面跳转用
├── package.json               # 项目包管理说明
├── tailwind.config.js         # tailwindcss 配置
└── vite.config.js             # 项目打包配置
```



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



