# Claude Code ToolBox

<div align="center">

**Claude Code 项目配置工具箱**

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE.txt)
![Version](https://img.shields.io/badge/version-1.0.1-green.svg)

一套面向 Claude Code 的项目级配置集合，包含 rules、skills、agents、hooks、MCP 服务器配置、`DESIGN.md` 设计规范，以及用于同步配置的安装脚本。

[English](#english) | [中文](#中文)

</div>

---

## 中文

###这是什么

这个仓库提供一套可以直接复用到业务项目里的 Claude Code 基础配置，主要包含：

- 项目级 `.claude/` 配置
- 常用 MCP 服务器配置模板
- `DESIGN.md` 设计系统文档（项目级 `design.md` 约定）
- 用于同步这些配置的 `install.sh`

适合的使用方式是：把这个仓库作为你的 Claude Code 配置源，然后同步到具体项目里使用。

### 快速安装

####方式一：克隆仓库

```bash
git clone https://github.com/mark452300/claude_code_toolbox.git
```

####方式二：同步到当前项目

`install.sh`适合在你的业务项目根目录执行。脚本会从远端拉取本仓库最新内容，并把配置同步到当前目录。

执行前请确认本机已安装：

- `git`
- `bash`

在目标项目根目录执行：

```bash
bash /path/to/claude_code_toolbox/install.sh
```

如果你当前就在本仓库目录，也可以这样执行：

```bash
cd /path/to/your-project
bash /path/to/claude_code_toolbox/install.sh
```

脚本会执行这些操作：

- 临时拉取最新的 `claude_code_toolbox`
- 将仓库中的 `.claude/` 同步到当前项目
- 将 `.mcp.json`复制到当前项目根目录
-目标目录如果已有 `.claude/`，会先删除再覆盖
- 如果源仓库缺少 `.claude/` 或 `.mcp.json`，脚本会输出警告

同步完成后，你的项目目录通常会包含：

```text
your-project/
├── .claude/
│ ├── rules/
│ ├── skills/
│ └── settings.json
└── .mcp.json
```

注意：

- 请在目标项目根目录执行脚本，因为它会把文件写入当前目录
- 脚本需要联网访问 GitHub
- 脚本会覆盖当前项目中的 `.claude/` 和 `.mcp.json`

### 当前包含的内容

####1. `.claude/`

当前仓库实际提供：

- `rules/`
 - `code-for-humans.md`
 - `mcp-tools.md`
- `skills/`
 - `frontend-design`
 - `karpathy-guidelines`
- `settings.json`

####2. MCP服务器配置

当前 `.mcp.json` 内置了6 个 MCP Server：

- `toolbox-mysql`：MySQL 数据库访问
- `context7`：文档检索与示例查询
- `playwright`：浏览器自动化
- `serena`：语义级代码分析与记忆
- `codegraph`：代码图谱与索引查询
- `prompts.chat`：提示词搜索与 MCP 接入

####3. `DESIGN.md` 设计规范

仓库根目录的 `DESIGN.md` 是本项目采用的设计系统文档，用适合人类和 AI 工具读取的 Markdown 格式集中记录颜色、字体、间距、圆角、组件、响应式行为以及设计约束，使 Claude Code 等编码工具在生成或修改界面时能够遵循一致的视觉语言。

本仓库的 `DESIGN.md` 当前定义了 Runwai 风格的单色编辑设计系统，并作为 `front/` 示例页面的设计依据。这里的 `design.md` 是项目约定的文档格式，不应表述为 Google 官方标准、浏览器标准或 W3C 标准。仓库目前没有绑定 Google 官方的 `design.md` 规范或校验器；如需引入外部设计规范，应在确认其官方来源后再补充链接和校验命令。

### 配置说明

同步后，需要按你的本地环境修改 `.mcp.json` 中的占位值。

#### `toolbox-mysql`

```json
{
 "mcpServers": {
 "toolbox-mysql": {
 "env": {
 "MYSQL_HOST": "localhost",
 "MYSQL_PORT": "3306",
 "MYSQL_USER": "root",
 "MYSQL_PASSWORD": "your password",
 "MYSQL_DATABASE": "your database name"
 }
 }
 }
}
```

至少需要替换：

- `MYSQL_PASSWORD`
- `MYSQL_DATABASE`

#### `context7`

```json
{
 "mcpServers": {
 "context7": {
 "args": [
 "-y",
 "@upstash/context7-mcp",
 "--api-key",
 "your-api-key"
 ]
 }
 }
}
```

将占位值替换为你自己的 Context7 API Key。

获取地址：<https://context7.com/dashboard>

#### `serena`

```json
{
 "mcpServers": {
 "serena": {
 "args": [
 "start-mcp-server",
 "--context",
 "claude-code",
 "--project",
 "D:\\code\\GitHub\\your-project"
 ]
 }
 }
}
```

将 `--project` 对应的路径替换为你的项目绝对路径。

#### `codegraph`

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

要求本机已安装 `codegraph` 命令，并在目标项目里建立索引。

#### `playwright`

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

首次使用需要本机具备 Node.js / npm 环境。

#### `prompts.chat`

```json
{
 "mcpServers": {
 "prompts.chat": {
 "command": "npx",
 "args": ["-y", "prompts.chat", "mcp"]
 }
 }
}
```

用于在 Claude Code里搜索和使用外部提示词。

#### `.claude/settings.json`

仓库中的项目设置主要包括：

- `enableAllProjectMcpServers: true`
- 对 `mcp__codegraph__*`、`mcp__serena__*`、`Bash(*)`、`WebFetch(*)` 的权限放行
- `serena-hooks` 的 `SessionStart`、`PreToolUse`、`Stop` hooks
- 启用以下插件：
 - `claude-mem@thedotmack`
 - `understand-anything@understand-anything`
 - `superpowers@superpowers-marketplace`
 - `claude-hud@claude-hud`
 - `mattpocock-skills@mattpocock`
 - `ecc@ecc`

如果你的本地环境没有安装这些依赖或插件，同步后需要按需调整 `.claude/settings.json`。

### 项目结构

```text
claude_code_toolbox/
├── .claude/
│ ├── agents/
│ │ └── engineering-software-architect.md
│ ├── rules/
│ │ ├── code-for-humans.md
│ │ └── mcp-tools.md
│ ├── skills/
│ │ ├── frontend-design/
│ │ │ └── SKILL.md
│ │ └── karpathy-guidelines/
│ │ └── SKILL.md
│ └── settings.json
├── .mcp.json
├── install.sh
└── README.md
```

### 使用示例

#### 使用 skill

```text
使用 karpathy-guidelines skill 帮我重构这段代码
使用 frontend-design skill 帮我调整这个页面
```

#### 使用 rule

```text
请按 code-for-humans规则整理这个模块
在这次操作里遵循 mcp-tools规则
```

#### 使用 MCP

```text
查询 users 表中的所有活跃用户
用 context7 查一下 React Router 最新文档
用 playwright 打开登录页并检查报错
用 serena 分析这个仓库的模块关系
用 codegraph 查找谁调用了这个函数
用 prompts.chat 搜一个适合前端调试的 prompt
```

###维护说明

#### 添加新的 Skill

1. 在 `.claude/skills/` 下创建新目录并新增 `SKILL.md`

#### 添加新的 Rule

1. 在 `.claude/rules/` 下新增 `.md` 文件
2. 如果需要，使用 frontmatter 指定适用路径

示例：

```markdown
---
paths:
 - "src/**/*.ts"
---

规则内容...
```

---

## English

### Overview

This repository provides a reusable Claude Code project configuration bundle, including:

- project-level `.claude/` rules, skills, agents, hooks, and settings
- a ready-to-edit `.mcp.json` template
- `install.sh` for syncing the configuration into another project

### Quick Start

#### Clone the repository

```bash
git clone https://github.com/mark452300/claude_code_toolbox.git
```

#### Sync into another project

Run `install.sh` from the root of the target project:

```bash
bash /path/to/claude_code_toolbox/install.sh
```

The script will:

- fetch the latest `claude_code_toolbox`
- sync `.claude/` into the current project
- copy `.mcp.json` into the current project root
- replace an existing `.claude/` directory if present

This repository also includes `DESIGN.md`, a project-level design-system document for the `front/` example. It records the visual language in a human- and AI-readable Markdown format, including colors, typography, spacing, radii, components, responsive behavior, and design constraints.

`DESIGN.md` is a project convention in this repository. It should not be described as an official Google, browser, or W3C standard. This repository does not currently depend on an officially published Google `design.md` specification or validator. Any external specification or validation command should be added only after its official source has been verified.

- `rules/`
 - `code-for-humans.md`
 - `mcp-tools.md`
- `skills/`
 - `frontend-design`
 - `karpathy-guidelines`
- `settings.json`

#### MCP servers in `.mcp.json`

- `toolbox-mysql`
- `context7`
- `playwright`
- `serena`
- `codegraph`
- `prompts.chat`

### Notes

After syncing, update placeholder values in `.mcp.json`, especially:

- MySQL credentials
- Context7 API key
- Serena `--project` path

You may also need to adjust `.claude/settings.json` if your local environment does not use the same plugins or hooks.

---

## License

This project is licensed under [Apache-2.0](LICENSE.txt).

## Contributing

Issue and Pull Request are welcome.

## Repository

- GitHub: <https://github.com/mark452300/claude_code_toolbox>
- Issues: <https://github.com/mark452300/claude_code_toolbox/issues>
