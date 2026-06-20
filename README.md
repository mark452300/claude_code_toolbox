# Claude Code ToolBox

<div align="center">

**最全面的 Claude Code 工具箱**

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE.txt)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](.claude-plugin/plugin.json)

一站式 Claude Code 配置工具箱，包含项目级 `.claude` 配置、MCP 服务器配置，以及用于同步这些配置的安装脚本。

[English](#english) | [中文](#chinese)

</div>

---

## 📦 快速安装

### 方式一：插件市场安装（推荐）

```bash
/plugin marketplace add mark452300/claude_code_toolbox
```

### 方式二：Git 克隆安装

```bash
git clone https://github.com/mark452300/claude_code_toolbox.git
```

### 方式三：使用 `install.sh` 同步到当前项目

`install.sh` 适合在你的业务项目目录中执行，用来把本仓库提供的 `.claude/` 和 `.mcp.json` 同步到当前项目。

执行前请确认本机已安装：

- `git`
- `bash`

使用方式：

```bash
bash /path/to/claude_code_toolbox/install.sh
```

如果你当前就在本仓库目录，也可以这样执行：

```bash
bash install.sh
```

脚本会执行以下操作：

- 从 GitHub 临时拉取最新的 `claude_code_toolbox`
- 将仓库中的 `.claude/` 整体同步到当前项目
- 将 `.mcp.json` 复制到当前项目根目录
- 如果目标 `.claude/` 已存在，会先删除后再覆盖为最新版本
- 如果源仓库缺少 `.claude/` 或 `.mcp.json`，脚本会输出警告

示例：

```bash
cd /path/to/your-project
bash /path/to/claude_code_toolbox/install.sh
```

执行完成后，你的项目目录通常会包含：

```text
your-project/
├── .claude/
│   ├── agents/
│   ├── commands/
│   ├── rules/
│   ├── skills/
│   └── settings.json
└── .mcp.json
```

注意事项：

- 请在目标项目根目录执行这个脚本，因为它会把文件写入“当前目录”
- 脚本需要联网访问 GitHub
- 脚本会覆盖当前项目中的 `.claude/` 和 `.mcp.json`

---

## 🚀 当前内容

### 📁 `.claude` 配置

当前仓库主要通过 `.claude/` 提供 Claude Code 项目配置，包含：

- **agents/** - Claude Code agents 目录（当前为空）
- **commands/** - Claude Code commands 目录（当前为空）
- **rules/** - 项目规则
- **skills/** - Claude Code skills
- **settings.json** - Claude Code 项目设置、hooks 与权限配置

### 🔧 MCP 服务器配置

当前仓库提供了 5 个 MCP 服务器配置：

- **toolbox-mysql** - MySQL 数据库访问
- **context7** - 文档检索与示例查询
- **playwright** - 浏览器自动化
- **serena** - 项目语义分析与记忆
- **codegraph** - 代码图谱与索引查询

可以手动的安装

自动压缩提问的token   :  https://headroom-docs.vercel.app/docs/mcp

### 📚 Skills

- **karpathy-guidelines** - Karpathy 编码准则
- **frontend-design** - 前端设计最佳实践

### 📋 Rules

- **mcp-tools** - MCP 工具使用约定
- **code-for-humans** - 面向人类可读性的编码规则

### 🧰 同步脚本

- **`install.sh`** - 将本仓库的配置同步到你的当前项目

---

## ⚙️ 配置说明

安装后，需要根据你的本地环境修改 `.mcp.json` 中的占位值。

#### 1. toolbox-mysql 配置

```json
{
  "mcpServers": {
    "toolbox-mysql": {
      "env": {
        "MYSQL_HOST": "localhost",
        "MYSQL_PORT": "3306",
        "MYSQL_USER": "root",
        "MYSQL_PASSWORD": "你的数据库密码",
        "MYSQL_DATABASE": "你的数据库名称"
      }
    }
  }
}
```

需要至少替换：

- `MYSQL_PASSWORD`
- `MYSQL_DATABASE`

#### 2. context7 配置

```json
{
  "mcpServers": {
    "context7": {
      "args": [
        "-y",
        "@upstash/context7-mcp",
        "--api-key",
        "你的 API Key"
      ]
    }
  }
}
```

将 `your-api-key write here ...` 替换为你自己的 Context7 API Key。

获取地址： [https://context7.com/dashboard](https://context7.com/dashboard)

#### 3. serena 配置

```json
{
  "mcpServers": {
    "serena": {
      "args": [
        "start-mcp-server",
        "--context",
        "claude-code",
        "--project",
        "你的项目工作区路径"
      ]
    }
  }
}
```

将 `your-project-workspace write here ...` 替换为你的项目绝对路径。

示例路径：`D:\code\GitHub\claude_code_toolbox`

#### 4. codegraph 配置

```json
{
  "mcpServers": {
    "codegraph": {
      "type": "stdio",
      "command": "codegraph",
      "args": ["serve", "--mcp"]
    }
  }
}
```

要求本机已安装 `codegraph` 命令。

#### 5. playwright 配置

默认配置如下：

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

首次使用时需要本机具备 Node.js / npm 环境。

#### 6. `.claude/settings.json`

仓库中还包含项目级 Claude Code 设置，主要包括：

- 启用项目 MCP Server
- `serena-hooks` 的 `SessionStart`、`PreToolUse`、`Stop` Hook
- 对 `mcp__codegraph__*`、`mcp__serena__*`、`Bash(*)`、`WebFetch(*)` 的权限放行

如果你不使用 `serena-hooks` 或 `claude-mem@thedotmack`，同步后需要按你的环境调整 `.claude/settings.json`。

---

## 📁 当前项目结构

```
claude_code_toolbox/
├── .claude/
│   ├── agents/              # Claude Code agents（当前为空）
│   ├── commands/            # Claude Code commands（当前为空）
│   ├── rules/
│   │   ├── mcp-tools.md
│   │   └── code-for-humans.md
│   ├── skills/
│   │   ├── karpathy-guidelines/
│   │   │   └── SKILL.md
│   │   └── frontend-design/
│   │       └── SKILL.md
│   └── settings.json        # Claude Code 项目设置
├── .claude-plugin/          # 插件市场元数据
│   ├── plugin.json
│   └── marketplace.json
├── .mcp.json                # MCP 服务器配置
├── .codegraph/              # codegraph 本地索引数据
├── .serena/                 # serena 项目本地数据
├── install.sh               # 配置同步脚本
└── README.md                # 项目文档
```

---

## 🎯 使用示例

### 使用 skill

```bash
使用 karpathy-guidelines skill 帮我重构这段代码
使用 frontend-design skill 帮我调整这个页面
```

### 使用 rule

```bash
请按 code-for-humans 规则整理这个模块
在这次操作里遵循 mcp-tools 规则
```

### 使用 MCP

```bash
查询 users 表中的所有活跃用户
用 context7 查一下 React Router 最新文档
用 playwright 打开登录页并检查报错
用 serena 分析这个仓库的模块关系
用 codegraph 查找谁调用了这个函数
```

---

## 🛠️ 开发指南

### 添加新的 Skill

1. 在 `skills/` 目录下创建新文件夹
2. 创建 `SKILL.md` 文件，包含技能定义

### 添加新的 Rule

1. 在 `rules/` 目录下创建 `.md` 文件
2. 使用 frontmatter 指定应用路径：

```markdown
---
paths:
  - "src/**/*.ts"
---

规则内容...
```

### 更新插件元数据

如果你新增了 skill 或 rule，记得同步更新：

- `.claude-plugin/plugin.json`
- `.claude-plugin/marketplace.json`

---

## 📄 许可证

本项目采用 [Apache-2.0](LICENSE.txt) 许可证。

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

## 📮 联系方式

- **作者：** lemon Alpha
- **仓库：** [https://github.com/mark452300/claude_code_toolbox](https://github.com/mark452300/claude_code_toolbox)
- **问题反馈：** [GitHub Issues](https://github.com/mark452300/claude_code_toolbox/issues)

---

## 🌟 Star History

如果这个项目对你有帮助，请给个 Star ⭐️

---

<div align="center">

**Made with ❤️ for Claude Code Community**

</div>
