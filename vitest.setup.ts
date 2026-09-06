import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

/**
 * jsdom implements neither `matchMedia` nor `requestIdleCallback`, and the
 * shell depends on both (`usePrefersReducedMotion`, `useMediaBreakpoint`,
 * the consent gate). Stub them once here rather than in every test.
 */
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }),
});

window.requestIdleCallback = ((cb: IdleRequestCallback) =>
  setTimeout(() => cb({ didTimeout: false, timeRemaining: () => 0 }), 0)) as never;
window.cancelIdleCallback = ((id: number) => clearTimeout(id)) as never;

afterEach(() => {
  cleanup();
  localStorage.clear();
  sessionStorage.clear();
});
