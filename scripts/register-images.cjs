/**
 * `--require` hook for the `check:*` scripts: makes `require("…/hero.webp")`
 * resolve to the same `StaticImageData` shape webpack produces, so a script
 * can import the content layer outside a Next build. See ./imageMeta.cjs.
 */
require("./imageMeta.cjs").registerImageRequireHook();
