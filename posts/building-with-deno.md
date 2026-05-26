---
title: "Building Web Apps with Deno and Fresh"
date: 2026-05-25
excerpt: "My experience building this portfolio site with the Deno runtime and Fresh framework."
tags: ["deno", "fresh", "tailwind"]
---

## Why Deno?

Deno is a modern runtime for JavaScript and TypeScript. Here's what I like about it:

- Built-in TypeScript support
- Secure by default (permissions model)
- Standard library with quality modules
- Works well with npm packages

## Fresh Framework

Fresh is a full-stack web framework for Deno. Key features:

- **Zero runtime overhead** — no client-side JS by default
- **Islands architecture** — interactive components only where needed
- **Tailwind CSS** — built-in support
- **Edge-ready** — deploys to Deno Deploy

### Example: A Simple Island

```tsx
import { useSignal } from "@preact/signals";

export default function Counter() {
  const count = useSignal(0);
  return (
    <button onClick={() => count.value++}>
      Count: {count.value}
    </button>
  );
}
```

## Getting Started

To start a new Fresh project:

```bash
deno run -A -r https://fresh.deno.dev my-project
cd my-project
deno task start
```

The framework handles routing, rendering, and deployment out of the box.
