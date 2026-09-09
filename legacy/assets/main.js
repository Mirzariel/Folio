/* Folio landing page.

   One IntersectionObserver and one requestAnimationFrame loop drive the whole
   page. Every animation here carries a product claim; none of them loop.
   `prefers-reduced-motion` is treated as a second design: everything arrives
   finished, and every interaction still works. */

(function () {
  'use strict';

  /* ------------------------------------------------------------------
     1. CHECKOUT URL. The only line you have to change to start selling.
     Paste the link your payment provider gives you (Gumroad, Paddle,
     Lemon Squeezy, Stripe Payment Link, Polar). While it is empty,
     every buy button simply scrolls to the pricing section.
     ------------------------------------------------------------------ */
  var CHECKOUT_URL = '';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  var wait = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };

  /* ---- buy buttons -------------------------------------------------- */
  $$('.js-buy').forEach(function (b) {
    if (CHECKOUT_URL) { b.setAttribute('href', CHECKOUT_URL); b.setAttribute('rel', 'noopener'); }
    else { b.setAttribute('href', '#pricing'); }
  });

  /* ================================================================
     One shared observer. Anything that needs to know it is on screen
     registers a callback here instead of creating its own.
     ================================================================ */
  var jobs = [];
  var io = ('IntersectionObserver' in window) ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      var fns = e.target.__folio || [];
      e.target.__folio = null;
      fns.forEach(function (fn) { fn(e.target); });
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }) : null;

  function onEnter(el, fn) {
    if (!el) return;
    if (!io) { fn(el); return; }
    (el.__folio = el.__folio || []).push(fn);
    if (jobs.indexOf(el) === -1) { jobs.push(el); io.observe(el); }
  }

  /* An anchor link can jump the page past a section without it ever
     intersecting, which would leave it stuck in its hidden state. Fire
     anything that is now entirely above the viewport. */
  function sweepPassed() {
    if (!io) return;
    jobs.slice().forEach(function (el) {
      if (!el.__folio) return;
      if (el.getBoundingClientRect().bottom >= 0) return;
      io.unobserve(el);
      var fns = el.__folio;
      el.__folio = null;
      fns.forEach(function (fn) { fn(el); });
    });
  }
  window.addEventListener('hashchange', function () { setTimeout(sweepPassed, 60); });
  window.addEventListener('load', function () { setTimeout(sweepPassed, 120); });

  /* ---- reveal + line reveals ---------------------------------------- */
  $$('.rv, .lines, .eyebrow').forEach(function (el) {
    onEnter(el, function (t) { t.classList.add('in'); });
  });

  /* ================================================================
     2. The signature moment: scattered becomes ordered.
     Claim: scattered photographs become an ordered archive.
     One custom property, --p, from 0 (pile) to 1 (grid).
     ================================================================ */
  var prints = $('#prints');
  var progress = $('#progress');
  var nav = $('#nav');
  var buybar = $('#buybar');
  var pricing = $('#pricing');

  function scrollFrame() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    var vh = window.innerHeight;

    if (prints && !reduced) {
      var span = Math.min(vh * 0.8, 640);
      prints.style.setProperty('--p', clamp(y / span, 0, 1).toFixed(4));
    }

    if (nav) nav.classList.toggle('is-stuck', y > 40);

    if (progress) {
      var max = document.documentElement.scrollHeight - vh;
      progress.style.transform = 'scaleX(' + (max > 0 ? clamp(y / max, 0, 1) : 0) + ')';
    }

    if (buybar) {
      var show = y > vh * 0.9;
      if (show && pricing) {
        var box = pricing.getBoundingClientRect();
        if (box.top < vh && box.bottom > 0) show = false;
      }
      buybar.classList.toggle('is-on', show);
    }
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { scrollFrame(); ticking = false; });
  }, { passive: true });
  window.addEventListener('resize', scrollFrame, { passive: true });
  scrollFrame();

  /* ================================================================
     3. Counters. Claim: these are figures Folio actually holds.
     ================================================================ */
  function fmt(v, dec) {
    return dec ? v.toFixed(dec) : Math.round(v).toLocaleString('en-US');
  }

  function countTo(el, target, dec, suffix, dur) {
    if (reduced) { el.textContent = fmt(target, dec) + suffix; return Promise.resolve(); }
    return new Promise(function (done) {
      var t0 = performance.now();
      (function step(now) {
        var t = Math.min(1, (now - t0) / dur);
        var e = 1 - Math.pow(1 - t, 3);
        el.textContent = fmt(target * e, dec) + suffix;
        if (t < 1) requestAnimationFrame(step);
        else { el.textContent = fmt(target, dec) + suffix; done(); }
      })(t0);
    });
  }

  $$('[data-count]').forEach(function (el) {
    var target = parseFloat(el.dataset.count);
    var dec = parseInt(el.dataset.decimals || '0', 10);
    var suffix = el.dataset.suffix || '';
    if (reduced || isNaN(target)) return;
    /* The real figure stays in the markup until the count actually starts, so
       a counter that never fires shows the truth rather than a zero. */
    onEnter(el, function () { countTo(el, target, dec, suffix, 1500); });
  });

  /* ================================================================
     4. The scan sweep. Claim: this is the scan populating the wall.
     ================================================================ */
  var galGrid = $('#galgrid');
  if (galGrid) onEnter(galGrid, function (g) { g.classList.add('is-scanned'); });

  /* ================================================================
     5. Connected enlargement. The spec's own behaviour: the tile grows
     into the frame, and Escape reads as putting a print down.
     ================================================================ */
  var viewer = $('#viewer');
  var cells = $$('.gal__cell');

  if (viewer && cells.length) {
    var vImg = $('#viewerImg');
    var vName = $('#viewerName');
    var vPos = $('#viewerPos');
    var vClose = $('#viewerClose');
    var vPrev = $('#viewerPrev');
    var vNext = $('#viewerNext');
    var idx = 0;
    var lastFocus = null;
    var isOpen = false;

    function meta() {
      var tile = cells[idx];
      vName.textContent = tile.dataset.name || 'Photograph';
      vPos.textContent = (idx + 1) + ' of ' + cells.length + ' in August 2019';
    }

    function flipFrom(rect) {
      if (reduced || !rect) return;
      var to = vImg.getBoundingClientRect();
      if (!to.width || !to.height) return;
      var dx = rect.left - to.left;
      var dy = rect.top - to.top;
      var sx = rect.width / to.width;
      var sy = rect.height / to.height;
      vImg.style.transition = 'none';
      vImg.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(' + sx + ',' + sy + ')';
      vImg.getBoundingClientRect();
      requestAnimationFrame(function () {
        vImg.style.transition = 'transform .44s cubic-bezier(.22,.61,.36,1)';
        vImg.style.transform = 'none';
      });
    }

    function open(i) {
      idx = i;
      lastFocus = document.activeElement;
      var img = cells[idx].querySelector('img');
      var rect = img.getBoundingClientRect();

      vImg.src = img.currentSrc || img.src;
      vImg.alt = img.alt || '';
      meta();

      viewer.hidden = false;
      isOpen = true;
      var sw = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (sw > 0) document.body.style.paddingRight = sw + 'px';

      vImg.style.transition = 'none';
      vImg.style.transform = 'none';
      // eslint-disable-next-line no-unused-expressions
      vImg.offsetWidth;

      if (vImg.complete && vImg.naturalWidth) flipFrom(rect);
      else vImg.addEventListener('load', function h() { vImg.removeEventListener('load', h); flipFrom(rect); });

      requestAnimationFrame(function () { viewer.classList.add('is-open'); });
      vClose.focus();
    }

    function close() {
      if (!isOpen) return;
      isOpen = false;
      var img = cells[idx].querySelector('img');
      var rect = img.getBoundingClientRect();
      viewer.classList.remove('is-open');

      var finish = function () {
        viewer.hidden = true;
        vImg.style.transition = 'none';
        vImg.style.transform = 'none';
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        /* Focus returns to the tile now showing, which is where the print was
           put down. Never leave focus on a control inside the hidden viewer. */
        var back = cells[idx];
        if (!back && lastFocus && lastFocus.focus && lastFocus !== document.body) back = lastFocus;
        if (back && back.focus) back.focus({ preventScroll: true });
      };

      if (reduced) { finish(); return; }

      var to = vImg.getBoundingClientRect();
      if (to.width && to.height) {
        var dx = rect.left - to.left;
        var dy = rect.top - to.top;
        vImg.style.transition = 'transform .34s cubic-bezier(.4,0,.7,.6)';
        vImg.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(' +
          (rect.width / to.width) + ',' + (rect.height / to.height) + ')';
      }
      setTimeout(finish, 340);
    }

    function step(dir) {
      idx = (idx + dir + cells.length) % cells.length;
      var img = cells[idx].querySelector('img');
      vImg.classList.add('is-swapping');
      setTimeout(function () {
        vImg.src = img.currentSrc || img.src;
        vImg.alt = img.alt || '';
        meta();
        vImg.classList.remove('is-swapping');
      }, reduced ? 0 : 160);
    }

    cells.forEach(function (c, i) {
      c.setAttribute('type', 'button');
      var name = c.dataset.name || 'photograph';
      c.setAttribute('aria-label', 'Open ' + name + ' in the viewer');
      c.addEventListener('click', function () { open(i); });
    });

    vClose.addEventListener('click', close);
    vPrev.addEventListener('click', function () { step(-1); });
    vNext.addEventListener('click', function () { step(1); });
    $$('[data-close]', viewer).forEach(function (el) { el.addEventListener('click', close); });

    document.addEventListener('keydown', function (e) {
      if (!isOpen) return;
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
      else if (e.key === 'Tab') {
        // keep focus inside the viewer while it covers the wall
        var f = [vClose, vPrev, vNext];
        var at = f.indexOf(document.activeElement);
        e.preventDefault();
        f[(at + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
    });
  }

  /* ================================================================
     6. The plan runner. Claim: you approve, then Folio does it and
     verifies it. Plays once on entry, and replays on demand.
     ================================================================ */
  var planWin = $('#planwin');
  if (planWin) {
    var approve = $('#approve');
    var btnLabel = $('.plan__btnlabel', approve);
    var flowSteps = $$('.flow__s', $('#planFlow'));
    var planRows = $$('.rows__r', $('#planRows'));
    var planCount = $('#planCount');
    var planUnit = $('#planUnit');
    var planLabel = $('#planLabel');
    var planStatus = $('#planStatus');
    var running = false;
    var played = false;

    var initial = {
      unit: planUnit.textContent,
      label: planLabel.textContent,
      status: planStatus.textContent,
      count: planCount.textContent
    };

    function setFlow(live) {
      flowSteps.forEach(function (s, i) {
        s.classList.toggle('is-done', i < live);
        s.classList.toggle('is-live', i === live);
      });
    }

    function reset() {
      setFlow(1);
      planRows.forEach(function (r) { r.classList.remove('is-done'); });
      planCount.textContent = initial.count;
      planUnit.textContent = initial.unit;
      planLabel.textContent = initial.label;
      planStatus.textContent = initial.status;
      planStatus.classList.remove('is-done');
      btnLabel.textContent = 'Approve this plan';
      approve.disabled = false;
    }

    function run() {
      if (running) return;
      running = true;
      played = true;
      approve.disabled = true;
      approve.classList.add('is-pressed');
      setTimeout(function () { approve.classList.remove('is-pressed'); }, 340);

      if (reduced) {
        setFlow(4);
        planRows.forEach(function (r) { r.classList.add('is-done'); });
        planLabel.textContent = 'What happened';
        planUnit.textContent = 'files moved and verified';
        planStatus.textContent = 'Done. 12,480 moved and verified. Nothing was deleted.';
        planStatus.classList.add('is-done');
        btnLabel.textContent = 'Reset the demo';
        approve.disabled = false;
        running = false;
        return;
      }

      btnLabel.textContent = 'Approved';

      Promise.resolve()
        .then(function () { return wait(420); })
        .then(function () {
          setFlow(2);
          planLabel.textContent = 'What is happening';
          planUnit.textContent = 'files moved so far';
          planStatus.textContent = 'Moving. Same drive, one file at a time.';
          planRows.forEach(function (r, i) {
            setTimeout(function () { r.classList.add('is-done'); }, 120 + i * 165);
          });
          return Promise.all([
            countTo(planCount, 12480, 0, '', 1400),
            wait(1450)
          ]);
        })
        .then(function () {
          setFlow(3);
          planUnit.textContent = 'files checked against the plan';
          planStatus.textContent = 'Verifying every completed change.';
          return wait(950);
        })
        .then(function () {
          setFlow(4);
          planLabel.textContent = 'What happened';
          planUnit.textContent = 'files moved and verified';
          planStatus.textContent = 'Done. 12,480 moved and verified. Nothing was deleted.';
          planStatus.classList.add('is-done');
          btnLabel.textContent = 'Run it again';
          approve.disabled = false;
          running = false;
        });
    }

    setFlow(1);
    approve.addEventListener('click', function () {
      if (running) return;
      /* After a finished run the button says "Run it again", so it must do
         exactly that: snap back to the plan, then play it through. */
      if (played) {
        reset();
        played = false;
        setTimeout(run, reduced ? 0 : 320);
        return;
      }
      run();
    });

    /* Plays itself once so the story is told even if nobody clicks. The
       approval beat is preserved: the button is visibly pressed first. */
    onEnter(planWin, function () {
      if (reduced) return;
      setTimeout(function () { if (!played) run(); }, 1200);
    });
  }

  /* ================================================================
     7. The duplicate collapse. Claim: quarantine frees nothing until
     you reclaim, and Folio says so.
     ================================================================ */
  var dupes = $('#dupes');
  if (dupes) {
    var stage = $('.dupes__stage', dupes);
    var destName = $('.dupes__destname', dupes);
    var outcomes = $$('.outc', dupes);

    function collapse() {
      stage.classList.remove('is-collapsed');
      if (reduced) { stage.classList.add('is-collapsed'); return; }
      // let the reset paint before replaying
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { stage.classList.add('is-collapsed'); });
      });
    }

    outcomes.forEach(function (b) {
      b.setAttribute('type', 'button');
      b.addEventListener('click', function () {
        outcomes.forEach(function (o) {
          var on = o === b;
          o.classList.toggle('is-on', on);
          o.setAttribute('aria-checked', on ? 'true' : 'false');
        });
        var reclaim = b.dataset.outcome === 'reclaim';
        stage.classList.toggle('is-danger', reclaim);
        destName.textContent = reclaim ? 'Removed for good' : '.Folio';
        collapse();
      });
    });

    onEnter(dupes, function () { setTimeout(collapse, 420); });
  }

  /* ================================================================
     8. The rename preview types itself. Claim: the preview is
     mandatory and it updates before you commit.
     ================================================================ */
  var rename = $('#rename');
  if (rename) {
    var PATTERN = 'Bali {n}';
    var rnText = $('#rnText');
    var rnRows = $$('#rnRows b');
    var caret = $('.rn__caret', rename);

    function paint(typed) {
      rnText.textContent = typed;
      var base = typed.replace(/\{n?$/, '');
      rnRows.forEach(function (b) {
        var n = String(b.dataset.i).padStart(3, '0');
        var name = base.indexOf('{n}') > -1 ? base.replace('{n}', n) : base;
        b.textContent = (name || '') + b.dataset.ext;
      });
    }

    onEnter(rename, function () {
      if (reduced) { paint(PATTERN); caret.classList.add('is-off'); return; }
      var k = 0;
      (function type() {
        paint(PATTERN.slice(0, k));
        if (k++ < PATTERN.length) setTimeout(type, 62);
        else setTimeout(function () { caret.classList.add('is-off'); }, 900);
      })();
    });
  }

  /* ================================================================
     9. Micro detail: pointer parallax, nav section marking, menu, FAQ.
     ================================================================ */
  if (!reduced && window.matchMedia('(pointer: fine)').matches) {
    $$('.tilt').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty('--ry', (x * 2.2).toFixed(2) + 'deg');
        el.style.setProperty('--rx', (-y * 1.4).toFixed(2) + 'deg');
      });
      el.addEventListener('mouseleave', function () {
        el.style.setProperty('--ry', '0deg');
        el.style.setProperty('--rx', '0deg');
      });
    });
  }

  var navLinks = $$('#navlinks a');
  if (navLinks.length && 'IntersectionObserver' in window) {
    var byId = {};
    navLinks.forEach(function (a) {
      var id = a.getAttribute('href');
      if (id && id.charAt(0) === '#' && id.length > 1) byId[id.slice(1)] = a;
    });
    var here = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        navLinks.forEach(function (a) { a.classList.remove('is-here'); });
        var a = byId[e.target.id];
        if (a) a.classList.add('is-here');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(byId).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) here.observe(s);
    });
  }

  var burger = $('#burger');
  var links = $('#navlinks');
  if (burger && links) {
    burger.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      nav.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName !== 'A') return;
      links.classList.remove('is-open');
      nav.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Open menu');
    });
  }

  var faqs = $$('.faq details');
  faqs.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (!d.open) return;
      faqs.forEach(function (o) { if (o !== d) o.open = false; });
    });
  });

  var yr = $('#yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
