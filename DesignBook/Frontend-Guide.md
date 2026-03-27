# Frontend Style Guide GenC Store

## Design Inspiration

[E-commerce website](https://empi.re/)

### Landing Page

![Landing-Page](Landing.png)

### Shop

![Product-Page-1](Product-Page.png)
![Product-Page-2](Product-Page-2.png)

### Product

![Product](Product.png)

### Cart

![Cart-Page](Cart.png)

## Color palette - WCAG AA Compliant

### Primaries

| Variable  | Values    |
| :-------- | :-------- |
| `$blue`   | `#0d6efd` |
| `$indigo` | `#6610f2` |
| `$purple` | `#6f42c1` |
| `$pink`   | `#d63384` |
| `$red`    | `#dc3545` |
| `$orange` | `#fd7e14` |
| `$yellow` | `#ffc107` |
| `$green`  | `#198754` |
| `$teal`   | `#20c997` |
| `$cyan`   | `#0dcaf0` |

![Visual-View-Of-Colors](primaries.png)

### Derivates

Meant for UI states.

| Variable     | Value       |
| :----------- | :---------- |
| `$primary`   | `$blue`     |
| `$secondary` | `$gray-600` |
| `$success`   | `$green`    |
| `$info`      | `$cyan`     |
| `$warning`   | `$yellow`   |
| `$danger`    | `$red`      |
| `$light`     | `$gray-100` |
| `$dark`      | `$gray-900` |

![Derivates](Derivates.webp)

### Generals

Meant for backgrounds etc.

| Variable    | Values    |
| :---------- | :-------- |
| `$white`    | `#fff`    |
| `$gray-100` | `#f8f9fa` |
| `$gray-200` | `#e9ecef` |
| `$gray-300` | `#dee2e6` |
| `$gray-400` | `#ced4da` |
| `$gray-500` | `#adb5bd` |
| `$gray-600` | `#6c757d` |
| `$gray-700` | `#495057` |
| `$gray-800` | `#343a40` |
| `$gray-900` | `#212529` |
| `$black`    | `#000`    |

### Typography Scale

Meant for fluid, responsive text sizing across all viewports. The sizes scale smoothly between the minimum and maximum values based on the screen width (assuming a standard `1rem = 16px` browser base).

| Variable     | Value (Clamp Function)                      | Approx. Range (px) | Intended Use                                       |
| :----------- | :------------------------------------------ | :----------------- | :------------------------------------------------- |
| `--text-xs`  | `clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)` | `12px - 14px`      | Small labels, badges.                              |
| `--text-sm`  | `clamp(0.875rem, 0.8rem + 0.375vw, 1rem)`   | `14px - 16px`      | Secondary text, product card titles, and metadata. |
| `--text-md`  | `clamp(1rem, 0.9rem + 0.5vw, 1.125rem)`     | `16px - 18px`      | Standard body copy, inputs, and standard buttons.  |
| `--text-lg`  | `clamp(1.125rem, 1rem + 0.625vw, 1.25rem)`  | `18px - 20px`      | Subtitles, small prices, and highlighted text.     |
| `--text-xl`  | `clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)`   | `20px - 24px`      | Section headers, main product prices, and modals.  |
| `--text-xxl` | `clamp(1.5rem, 1.3rem + 1vw, 2rem)`         | `24px - 32px`      | Page titles, hero sections, and major banners.     |
