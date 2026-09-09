/**
 * Registers GSAP plugins exactly once and re-exports the pieces the motion
 * modules use. Import from here rather than from "gsap" directly, so plugin
 * registration cannot be missed and the bundle stays to core + ScrollTrigger.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/** Every motion module has this shape. Returning a cleanup is optional. */
export type MotionModule = (reduced: boolean) => (() => void) | void;
