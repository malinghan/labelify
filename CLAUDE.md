# Project: Labelify

## Tech Stack
- Vite + TypeScript + Vue 3
- Vitest for unit tests
- Playwright for e2e tests
- Tailwind CSS
- Pinia for state management

## Commands
- `npm run dev` — start dev server（禁止 Claude 运行，告知用户手动执行）
- `npm run test` — vitest --run（单次运行，非 watch 模式）
- `npm run test:e2e` — playwright test
- `npm run build` — production build
- `npm run typecheck` — tsc --noEmit

## Directory Structure
- src/components/   — UI 组件，每个组件独立文件夹
- src/canvas/       — 画布核心逻辑（纯函数）
- src/composables/  — Vue composables（以 use 开头）
- src/store/        — Pinia 状态管理
- src/types/        — TypeScript 类型定义
- .claude/specs/    — 功能规约文档

## Code Conventions
- 使用具名导出（named exports），页面组件除外
- 组件文件名使用 PascalCase
- composables 以 use 开头
- 禁止在 canvas/ 目录外直接操作 DOM
- 使用 Vue 3 Composition API + `<script setup>`

## Architecture Decisions
- Canvas 状态统一由 Pinia store 管理
- 所有画布操作为 src/canvas/ 下的纯函数
- 坐标系：世界坐标 vs 屏幕坐标需明确区分
- 标注数据与画布渲染解耦

## Rules for Claude
- 每个任务完成前必须运行 npm run typecheck 通过
- 禁止启动 dev server，告知用户手动运行
- 测试使用 --run 标志，不使用 watch 模式
- 不要过度工程化，只实现当前 spec 要求的功能
- 禁止使用 any 类型绕过类型检查
