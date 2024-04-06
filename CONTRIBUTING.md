# Welcome

各位好兄弟们，大家好，欢迎大家参与`x-attempt-ui`的开发。发起这个组件库开发项目的目的是为了让更多的人能够参与进来，了解组件库相关的知识。因此希望通过这个项目可以给大家带来一些学习上的帮助。路漫漫其修远兮，吾将上下而求索，共勉。

## Note
后续将整理一篇组件库搭建的详细笔记。大家有什么心得也可以将笔记共享在此处。

## Run it

要运行组件库，请执行以下步骤：

1. 推荐先 fork 项目并基于此仓库进行操作
2. 克隆 fork 后的项目到本地 `git clone https://github.com/xxxxxx/x-attempt-ui.git`
3. 切换至 dev 分支 `git checkout dev`
4. 安装依赖：`pnpm i`
5. 启动文档：`pnpm dev:docs`
6. 在浏览器中访问：`http://localhost:5173/x-attempt-ui/`

## 如何贡献？

为了维护组件库代码提交规范性，项目采用以下流程提交代码。

### fork 项目

前往[项目主页](https://github.com/XinXiaoIsMe/x-attempt-ui,"github主页") fork 工程至自己的 git 仓库，并基于此 git 仓库维护代码。

### 添加主仓库为远程仓库

执行下面 git 命令

```sh
git remote add upstream git@github.com:XinXiaoIsMe/x-attempt-ui.git
```

### 提交 pr

每当你准备开始一个新的功能开发或提交 PR 前，请先从主仓库拉取最新的代码并合并到仓库的对应分支。

```sh
git checkout -b dev
git fetch upstream
git merge upstream/dev
```

### 创建需求分支

对于每次代码提交需求，本地需创建一个新的分支，请尽量避免在同一个分支上处理多个需求。

根据你需要开发的新功能，推荐采用：`${type}/${component}/${feat}` 分支命名规范。

其中，type 表示该分支类型，有以下选项：

- feature：功能分支
- fix：修复分支
- docs：文档修改分支
- refactor：重构分支

component 为你需要修改的组件，如 button、icon、upoload等。若需要修改脚手架能力，此处应为 base。

feat 为你需要具体修改的内容。此处定义根据功能自由命名，命名采用短横线命名法。

以下是具体例子:

- `feature/base/add-markdown-pure`
- `feature/button/add-style`
- `fix/icon/alignment-issue`
- `docs/upload/add-picture-demo`
- `refactor/base/refactor-router`

### 创建组件

使用指令 `pnpm new component-name [组件名]`。

例如 `pnpm new checkbox 复选框` 即可自动创建组件目录及文件。

在编写完代码后，在确保与目标分支不存在冲突的前提下可以将该功能分支提交 PR 到主仓库的对应分支（目前主要的开发分支为 dev 分支）。

PR 将由具备权限的贡献者 CR 后进行 merge，若提交的功能影响面较广，CR 人员应当及时同其他成员共同参与讨论和检验。

**注：组件名称统一使用英文小写，以短横线连接。**

### ⚠️ 组件开发目录结构标准

```plaintext
|- avatar: 单个组件的开发目录
  |- src: 源代码文件夹
    |- util.ts: 实用工具函数文件
    |- avatar.ts: 组件 types、interface、props 文件
    |- avatar.vue: 组件模板文件
  |- style: 样式文件夹
    |- index.scss: 组件样式文件
  |- index.ts: 组件入口文件
```

## Commit 规范

我们推荐使用以下 commmit message 格式。

`${type}(${component}): ${commit-word}`

以下是具体实例，当然，中文的提交说明目前也是可接受的 !

- `feat(button): add styles for button component`
- `fix(icon): resolve alignment issue in icon component`
- `docs(upload): update README file`
- `refactor(base): refactor router module`
- `chore(base): update deploy config`

更多请阅读：<https://www.conventionalcommits.org/zh-hans/v1.0.0/>

## 目录结构

```plaintext
|- build/                  # 打包配置
|- docs/                   # 组件库文档
|- packages/               # 组件库开发目录
|  |- x-attempt-ui/        # 组件库
|     |- src/
|        |- assets/        # 资源文件夹
|        |- components/    # 组件目录
|        |- styles/        # 公共样式文件夹
|        |- utils/         # 工具文件夹
|        |- index.ts       # 组件库入口文件
|        |- index.scss     # 组件库样式入口文件
|     |- package.json      # 组件库 package.json 文件
|  |- x-attempt-hooks/     # 组件库hooks
|- package.json            # 根目录下的 package.json 文件
|- README.md               # 根目录下的 README.md 文件
|- tsconfig.json           # 根目录下的 TypeScript 配置文件
|- ...
```

## 公共样式
`common`文件夹放置`sass变量`和`css变量`，分别位于`var.scss`和`css-var.scss`中。`mixins`文件夹放置`mixin`、`sass函数`和一些配置。`mixin`和`sass函数`都有对应注释，可以很快看懂。更多关于`sass`的知识可以查看[sass官网](https://sass-lang.com/documentation/modules/math/).
