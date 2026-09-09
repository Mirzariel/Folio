/**
 * Client entry point.
 *
 * Interaction is set up synchronously because a control that does not respond
 * is a bug. Motion and the viewer are dynamically imported, so GSAP lands in
 * its own chunk after first paint and a page with no gallery never downloads
 * the viewer at all.
 *
 * Nothing here is required for the page to read: the markup is complete and
 * the .js gate keeps every reveal in its finished state without scripting.
 */
import { initInteractions } from './interactions';

initInteractions();

void import('./motion').then((module) => module.initMotion());

if (document.querySelector('.gal__cell')) {
  void import('./viewer').then((module) => module.initViewer());
}
