import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { useImageZoom } from "@/hooks/useImageZoom";
import { zoomAttributes } from "@/utils/imageZoom";

function frame(id: string) {
  const attrs = zoomAttributes({ id, src: `/${id}.webp`, width: 1600, height: 1067, caption: id });
  const pairs = Object.entries(attrs)
    .map(([key, value]) => `${key}="${value}"`)
    .join(" ");
  return `<button id="${id}" ${pairs}></button>`;
}

function click(id: string, init: MouseEventInit = {}) {
  const element = document.getElementById(id);
  element?.dispatchEvent(new MouseEvent("click", { bubbles: true, button: 0, ...init }));
}

afterEach(() => {
  document.body.innerHTML = "";
});

describe("useImageZoom", () => {
  it("opens on the clicked photograph with its group around it", () => {
    document.body.innerHTML = `
      <section data-zoom-group>${frame("a")}${frame("b")}${frame("c")}</section>
      <section data-zoom-group>${frame("d")}</section>
    `;
    const { result } = renderHook(() => useImageZoom());
    expect(result.current.open).toBe(false);

    act(() => click("b"));
    expect(result.current.open).toBe(true);
    expect(result.current.index).toBe(1);
    expect(result.current.images.map((image) => image.id)).toEqual(["a", "b", "c"]);
  });

  it("wraps in both directions within the group it opened", () => {
    document.body.innerHTML = `<section data-zoom-group>${frame("a")}${frame("b")}</section>`;
    const { result } = renderHook(() => useImageZoom());

    act(() => click("b"));
    act(() => result.current.next());
    expect(result.current.index).toBe(0);

    act(() => result.current.previous());
    expect(result.current.index).toBe(1);

    act(() => result.current.close());
    expect(result.current.open).toBe(false);
  });

  it("ignores clicks that are not on a photograph", () => {
    document.body.innerHTML = `<section data-zoom-group><button id="plain"></button></section>`;
    const { result } = renderHook(() => useImageZoom());

    act(() => click("plain"));
    expect(result.current.open).toBe(false);
  });

  it("leaves modified and non-primary clicks to the browser", () => {
    document.body.innerHTML = `<section data-zoom-group>${frame("a")}</section>`;
    const { result } = renderHook(() => useImageZoom());

    for (const init of [{ metaKey: true }, { ctrlKey: true }, { shiftKey: true }, { button: 1 }]) {
      act(() => click("a", init));
      expect(result.current.open).toBe(false);
    }

    act(() => click("a"));
    expect(result.current.open).toBe(true);
  });

  it("stays shut for a click a swipe has already cancelled", () => {
    document.body.innerHTML = `<section data-zoom-group>${frame("a")}</section>`;
    const { result } = renderHook(() => useImageZoom());

    act(() => click("a", { cancelable: true, composed: true }));
    expect(result.current.open).toBe(true);

    act(() => result.current.close());

    // What `useSwipe`'s `onClickCapture` leaves behind: a cancelled click.
    act(() => {
      const event = new MouseEvent("click", { bubbles: true, cancelable: true, button: 0 });
      event.preventDefault();
      document.getElementById("a")?.dispatchEvent(event);
    });
    expect(result.current.open).toBe(false);
  });

  it("opens on a photograph clicked through its own child elements", () => {
    const attrs = zoomAttributes({
      id: "pool",
      src: "/pool.webp",
      width: 10,
      height: 10,
      caption: "Pool",
    });
    const pairs = Object.entries(attrs)
      .map(([key, value]) => `${key}="${value}"`)
      .join(" ");
    document.body.innerHTML = `
      <section data-zoom-group><button ${pairs}><img id="inner" alt="" /></button></section>
    `;
    const { result } = renderHook(() => useImageZoom());

    act(() => click("inner"));
    expect(result.current.open).toBe(true);
    expect(result.current.images[0]?.id).toBe("pool");
  });
});
