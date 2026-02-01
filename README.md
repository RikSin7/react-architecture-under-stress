# PerfMatch: React Architecture Under Stress 🚀

> **"Show, Don't Tell."**
> This project is an interactive case study on React rendering behavior, demonstrating the evolution from "naive implementation" to "high-performance engineering".

![App Screenshot](/src/assets/good.png)
![App Screenshot](/src/assets/bad.png)
![App Screenshot](/src/assets/best.png)



## ⚡ The Benchmark

The application renders a heavy dataset of **2,500 interactive items**. It features three distinct architectural implementations within the same codebase to allow side-by-side performance profiling.

| Version | Architecture | Rendering Strategy | Performance | Status |
| :--- | :--- | :--- | :--- | :--- |
| **A (Legacy)** | Monolithic Context | ❌ Full Tree Re-render | **~200ms+** | 🛑 Laggy |
| **B (Modern)** | Atomic State + Composition | ✅ Memoized Updates | **~18ms** | ⚠️ Good |
| **C (Best)** | Virtualization | 🚀 Windowing | **<1ms** | 🔥 Instant |

---

## 🏗️ Architectural Deep Dive

### 1. The Anti-Pattern (Version A)
Simulates a common mistake in growing React apps: **The Context Trap**.
*   **The Flaw**: A single `BadStateProvider` holds all application state (search, filters, data).
*   **The Impact**: Every keystroke in the search bar updates the Context, forcing every consumer (all 2,500 list items) to re-render, even if their props didn't change.
*   **Result**: Input lag and UI freezing.

### 2. The Refactor (Version B)
Demonstrates **Colocation** and **Memoization**.
*   **The Fix**:
    *   State is split into atomic hooks (`useSearch`, `useFilters`).
    *   `React.memo` wraps list items to prevent unnecessary re-renders.
*   **Result**: Typing is snappy because only the parent calculates the filter, and existing DOM nodes are largely preserved. However, the browser still struggles to paint 2,500 `div`s.

### 3. The Professional Solution (Version C)
Implements **Virtualization** (Windowing) for production-grade scale.
*   **The Logic**: Uses `react-virtuoso` to render *only* the items currently visible in the viewport (~15 items).
*   **The Magic**: Even though the list has 2,500 items, the "DOM Nodes" metric stays at ~20.
*   **Result**: Constant O(1) memory and CPU usage. It handles 100,000 items as easily as 10.

---

## 🛠️ The "Secret Sauce": Custom Tooling
All performance metrics are calculated in real-time using custom-built tools:

*   **Analysis**:
    *   **Live Render Graph**: Zero-dependency Recharts visualization of real-time performance (ms).
    *   **Info Mode**: Educational modal explaining "Context Traps" vs "Memoization" vs "Virtualization".
*   **PerfMonitor**: React Profiler API integration.
*   **RenderCounter**: A visual component that flashes pink whenever a component re-renders.
*   **DOM Nodes Metric**: Counts exact DOM elements in the list container to prove virtualization is working.

---

## 🚀 Getting Started

1.  **Clone & Install**
    ```bash
    git clone https://github.com/yourusername/good-bad-app.git
    cd good-bad-app
    npm install
    ```

2.  **Run Development Server**
    ```bash
    npm run dev
    ```

3.  **Run Tests**
    ```bash
    npm test
    ```

---

## 🧪 How to Verify (The "Mic Drop" Demo)

1.  **Open Version A (Legacy)**
    *   Look at the "DOM Nodes" metric: **2500**
    *   Start typing "table" in the search box.
    *   **Observe**: The UI lags significantly. The **Render Duration** hits 200ms+.

2.  **Open Version C (Best)**
    *   Look at the "DOM Nodes" metric: **~20**
    *   Start typing "table" in the search box.
    *   **Observe**: Instant response (0ms lag). The browser is only managing 20 elements, even though it *feels* like the full list is there.

---

## 🎨 Tech Stack
*   **Framework**: React 19 + TypeScript
*   **Styling**: Tailwind CSS v4 (Zinc Theme + Glassmorphism)
*   **Tooling**: Vite + Vitest

---

*Designed & Engineered for the Modern Web.*
