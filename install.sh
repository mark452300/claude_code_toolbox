#!/bin/bash

# 同步 Claude Code 配置脚本
# 用途：从 claude_code_toolbox 仓库拉取配置文件到当前项目

set -e  # 遇到错误立即退出

REPO_URL="https://github.com/mark452300/claude_code_toolbox.git"
TEMP_DIR=$(mktemp -d)
TARGET_FOLDERS=("rules" "skills" "commands" "agents" "output-styles" "agent-memory")
KEEP_FILES=(".claude" ".mcp.json")

echo "📦 开始同步 Claude Code 配置..."

# 清理函数
cleanup() {
    if [ -d "$TEMP_DIR" ]; then
        echo "🧹 清理临时文件..."
        rm -rf "$TEMP_DIR"
    fi
}

# 设置退出时清理
trap cleanup EXIT

# 1. 克隆仓库到临时目录
echo "⬇️  正在从 GitHub 拉取配置..."
git clone --depth 1 "$REPO_URL" "$TEMP_DIR" 2>/dev/null || {
    echo "❌ 克隆仓库失败，请检查网络连接或仓库地址"
    exit 1
}

# 2. 确保 .claude 文件夹存在
if [ ! -d ".claude" ]; then
    echo "📁 创建 .claude 文件夹..."
    mkdir -p .claude
fi

# 3. 移动指定文件夹到 .claude
echo "📋 开始移动配置文件夹到 .claude/..."
for folder in "${TARGET_FOLDERS[@]}"; do
    if [ -d "$TEMP_DIR/$folder" ]; then
        # 如果目标文件夹已存在，先删除
        if [ -d ".claude/$folder" ]; then
            echo "  🔄 更新 $folder..."
            rm -rf ".claude/$folder"
        else
            echo "  ➕ 添加 $folder..."
        fi
        mv "$TEMP_DIR/$folder" ".claude/"
    else
        echo "  ⚠️  警告: $folder 在源仓库中不存在，跳过"
    fi
done

# 4. 复制 .mcp.json 到项目根目录
if [ -f "$TEMP_DIR/.mcp.json" ]; then
    echo "📄 复制 .mcp.json 到项目根目录..."
    cp "$TEMP_DIR/.mcp.json" ".mcp.json"
    echo "  ✓ .mcp.json"
else
    echo "  ⚠️  警告: .mcp.json 在源仓库中不存在"
fi

# 5. 删除临时目录中的其他无关文件（已在 cleanup 中处理）

echo "✅ 配置同步完成！"
echo ""
echo "已同步的内容："
for folder in "${TARGET_FOLDERS[@]}"; do
    if [ -d ".claude/$folder" ]; then
        echo "  ✓ .claude/$folder"
    fi
done
if [ -f ".mcp.json" ]; then
    echo "  ✓ .mcp.json"
fi
