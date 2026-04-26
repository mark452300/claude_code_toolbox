# Claude Code ToolBox

<div align="center">

**最全面的 Claude Code 工具箱**

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE.txt)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](.claude-plugin/plugin.json)

一站式 Claude Code 开发工具集合，包含 MCP 服务器配置、自定义 Agents、编码技能、规则模板等。

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

---

## 🚀 功能特性

### 🔧 MCP 服务器配置
预配置了 4 个强大的 MCP 服务器：

- **toolbox-mysql** - MySQL 数据库操作
- **context7** - 实时文档搜索和代码示例
- **playwright** - 浏览器自动化测试
- **serena** - 语义代码分析和智能重构

### 🤖 自定义 Agents
- **code-reviewer** - 专业代码审查 Agent，关注正确性和可维护性

### 📚 编码技能 (Skills)
- **karpathy-guidelines** - 减少 LLM 编码错误的行为准则
- **frontend-design** - 前端设计最佳实践

### 📋 项目规则 (Rules)
- **API 设计规范** - 统一的 API 响应格式和验证规则

---

## ⚙️ 配置说明

### 必需配置项

安装后，需要在 `.mcp.json` 文件中配置以下参数：

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

**必填项：**
- `MYSQL_PASSWORD` - 你的 MySQL 密码
- `MYSQL_DATABASE` - 目标数据库名称

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

**获取 API Key：** 访问 [https://context7.com/dashboard](https://context7.com/dashboard)

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

**示例路径：** `D:\code\GitHub\claude_code_toolbox`

#### 4. playwright 配置

无需额外配置，开箱即用。

---

## 📁 项目结构

```
claude_code_toolbox/
├── .claude-plugin/          # 插件元数据
│   ├── plugin.json          # 插件基本信息
│   └── marketplace.json     # 市场列表配置
├── .mcp.json                # MCP 服务器配置
├── agents/                  # 自定义 Agents
│   └── code-reviewer.md     # 代码审查 Agent
├── skills/                  # 编码技能
│   ├── karpathy-guidelines/ # Karpathy 编码准则
│   └── frontend-design/     # 前端设计技能
├── rules/                   # 项目规则
│   └── example.md           # API 设计规则示例
├── commands/                # 自定义命令（待扩展）
└── README.md                # 项目文档
```

---

## 🎯 使用示例

### 使用 Code Reviewer Agent

```bash
# 在 Claude Code 中调用
使用 code-reviewer agent 审查我的 PR
```

### 应用 Karpathy Guidelines

```bash
# 在编写代码时
使用 karpathy-guidelines skill 帮我重构这段代码
```

### 使用 MySQL MCP 服务器

```bash
# 配置完成后，可以直接查询数据库
查询 users 表中的所有活跃用户
```

---

## 🛠️ 开发指南

### 添加新的 Agent

1. 在 `agents/` 目录下创建新的 `.md` 文件
2. 使用以下模板：

```markdown
---
name: your-agent-name
description: Agent 描述
model: sonnet
tools: Read, Grep, Glob
---

Agent 的具体指令和行为描述...
```

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
