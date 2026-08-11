/* ============================================================================
   tour.js — guided walkthrough engine

   One engine, configured per page. A page defines window.TOUR as an array of
   steps and includes a launch button; everything else — overlay, spotlight,
   bubble, positioning, keyboard handling, progress — comes from here.

   Step shape
   ----------
   {
     el:     'CSS selector'    the element to spotlight. Omit for a step that
                               addresses the page as a whole.
     text:   'string'          what the reader is told. HTML is allowed.
     before: fn                runs before the spotlight moves — use it to reset
                               controls so each step starts from a known state.
     action: fn                runs after the bubble appears — use it to change a
                               control so the reader watches the result happen.
     settle: 600               ms to wait after `before` for a redraw.
     scroll: true              scroll the target into view first. Default true.
   }

   Design notes
   ------------
   The point of these walkthroughs is not to name the controls. It is to walk a
   reader to the finding the page exists for, moving the inputs so they watch the
   number change rather than reading a claim about it. Steps therefore end on a
   conclusion, and `action` does the demonstrating.

   Accessibility: the bubble is a labelled dialog, focus moves into it, Escape
   exits, arrow keys and Enter navigate, and every transition is disabled under
   prefers-reduced-motion. The overlay never traps a keyboard user — Escape
   always works and the launch button regains focus on exit.
   ============================================================================ */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var narrow = function () { return window.matchMedia('(max-width: 820px)').matches; };

  var css = [
        /* The veil is a transparent click-catcher only. The mask is the ring's outsized
       box-shadow — painting a background here as well would dim the spotlighted
       element along with everything else, and compound to ~86% outside it. */
    '.tour-veil{position:fixed;inset:0;z-index:900;background:transparent;',
      'opacity:0;transition:opacity .3s;pointer-events:none}',
    '.tour-veil.on{opacity:1;pointer-events:auto}',
    // No target, or narrow screens where the ring's mask is dropped: the veil
    // carries the dimming itself.
    '.tour-veil.solid{background:rgba(8,11,15,.62)}',
    '.tour-ring{position:absolute;z-index:901;border:2px solid var(--panel-signal,#f2c14e);border-radius:6px;',
      'box-shadow:0 0 0 4px rgba(242,193,78,.22),0 0 0 9999px rgba(8,11,15,.62);',
      'transition:top .35s cubic-bezier(.3,.8,.3,1),left .35s cubic-bezier(.3,.8,.3,1),',
      'width .35s,height .35s;pointer-events:none}',
    '.tour-box{position:fixed;z-index:902;max-width:352px;background:var(--panel-surface,#1f2327);',
      'color:var(--panel-text,#d2d7db);border:1px solid var(--panel-border,#343a3f);border-radius:8px;',
      'padding:17px 19px 15px;box-shadow:0 18px 44px rgba(0,0,0,.5);opacity:0;',
      'transition:opacity .28s,transform .28s;transform:translateY(6px);font-size:.88rem;line-height:1.58}',
    '.tour-box.on{opacity:1;transform:none}',
    // Colour stated explicitly, not inherited. Twelve case-study pages carry a bare
    // `p { color: var(--body-text) }` in their own style block, which targets this
    // paragraph directly and beats anything inherited from .tour-box. In light mode
    // that painted #3a3f45 onto a dark bubble at 1.49:1. text-align too, for the same
    // reason: those pages justify every p, which reads badly at 352px.
    '.tour-box p{margin:0 0 14px;color:var(--panel-text,#d2d7db);text-align:left}',
    '.tour-box b,.tour-box strong{color:var(--panel-bright,#fafafb)}',
    '.tour-box .row{display:flex;align-items:center;justify-content:space-between;',
      'gap:10px;flex-wrap:wrap}',
    '.tour-box .count{font:600 .68rem/1 ui-monospace,monospace;letter-spacing:.1em;',
      'text-transform:uppercase;color:var(--panel-muted,#949ba1)}',
    '.tour-box .acts{display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end}',
    '.tour-box button{font:600 .78rem/1 inherit;padding:8px 13px;border-radius:4px;cursor:pointer;',
      'border:1px solid var(--panel-border,#343a3f);background:transparent;color:var(--panel-text,#d2d7db)}',
    '.tour-box button:hover:not(:disabled){border-color:var(--panel-muted,#949ba1)}',
    '.tour-box button.go{background:var(--panel-signal,#f2c14e);color:#14171a;',
      'border-color:var(--panel-signal,#f2c14e)}',
    '.tour-box button:disabled{opacity:.45;cursor:default}',
    // Sits in the footer row, not absolutely positioned over the copy — at 352px
    // wide a top-right button overlapped the first line of every step by ~33px.
    '.tour-box .quit{padding:8px 10px;font-size:.74rem;font-weight:500;border:none;',
      'color:var(--panel-muted,#949ba1);background:none}',
    '.tour-box .quit:hover{color:var(--panel-text,#d2d7db);border:none}',
    '@media(max-width:820px){.tour-box{left:12px!important;right:12px!important;max-width:none;',
      'top:auto!important;bottom:14px}.tour-ring{box-shadow:0 0 0 4px rgba(242,193,78,.22)}',
      '.tour-veil{background:rgba(8,11,15,.62)}}',
    '@media(prefers-reduced-motion:reduce){.tour-veil,.tour-ring,.tour-box{transition:none}}',
    '@media print{.tour-veil,.tour-ring,.tour-box{display:none!important}}'
  ].join('');

  var veil, ring, box, txt, count, back, next, i = -1, live = false, opener = null;

  function build() {
    var st = document.createElement('style'); st.textContent = css;
    document.head.appendChild(st);

    veil = document.createElement('div'); veil.className = 'tour-veil';
    ring = document.createElement('div'); ring.className = 'tour-ring';
    ring.style.display = 'none';

    box = document.createElement('div');
    box.className = 'tour-box';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'false');
    box.setAttribute('aria-label', 'Guided walkthrough');
    box.innerHTML =
      '<p></p><div class="row"><span class="count"></span>' +
      '<span class="acts">' +
      '<button type="button" class="quit" aria-label="Close walkthrough" title="Escape">Close</button>' +
      '<button type="button" class="bk">Back</button>' +
      '<button type="button" class="go">Next</button></span></div>';

    document.body.appendChild(veil);
    document.body.appendChild(ring);
    document.body.appendChild(box);

    txt = box.querySelector('p'); count = box.querySelector('.count');
    back = box.querySelector('.bk'); next = box.querySelector('.go');

    box.querySelector('.quit').addEventListener('click', stop);
    veil.addEventListener('click', stop);
    back.addEventListener('click', function () { go(i - 1); });
    next.addEventListener('click', function () { go(i + 1); });
    document.addEventListener('keydown', keys);
    window.addEventListener('resize', function () { if (live) place(); });
    // The ring is absolute (document coords), the bubble fixed (viewport coords):
    // without this they drift apart the moment the reader scrolls mid-step.
    window.addEventListener('scroll', function () { if (live) place(); }, { passive: true });
  }

  function keys(e) {
    if (!live) return;
    if (e.key === 'Escape') { e.preventDefault(); stop(); }
    // Enter on a focused button already fires click; handling it here too would
    // advance twice in one keystroke.
    else if (e.key === 'Enter' && e.target && e.target.tagName === 'BUTTON') { return; }
    else if (e.key === 'ArrowRight' || e.key === 'Enter') { e.preventDefault(); go(i + 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1); }
  }

  var target = null;

  function place() {
    veil.classList.toggle('solid', !target);
    if (!target) {
      ring.style.display = 'none';
      box.style.left = Math.max(16, (window.innerWidth - box.offsetWidth) / 2) + 'px';
      box.style.top = Math.max(16, (window.innerHeight - box.offsetHeight) / 2) + 'px';
      return;
    }
    var r = target.getBoundingClientRect(), pad = 6;
    ring.style.display = '';
    ring.style.top = (r.top + window.scrollY - pad) + 'px';
    ring.style.left = (r.left + window.scrollX - pad) + 'px';
    ring.style.width = (r.width + pad * 2) + 'px';
    ring.style.height = (r.height + pad * 2) + 'px';

    if (narrow()) { box.style.left = ''; box.style.top = ''; return; }

    var bw = box.offsetWidth || 352, bh = box.offsetHeight || 150, gap = 18;
    var left = r.right + gap;
    if (left + bw > window.innerWidth - 12) left = r.left - bw - gap;   // flip side
    if (left < 12) left = Math.min(window.innerWidth - bw - 12, Math.max(12, r.left));
    var top = r.top + r.height / 2 - bh / 2;
    top = Math.max(12, Math.min(window.innerHeight - bh - 12, top));
    box.style.left = left + 'px';
    box.style.top = top + 'px';
  }

  function go(n) {
    var steps = window.TOUR || [];
    if (n < 0) return;
    if (n >= steps.length) { stop(); return; }
    i = n;
    var s = steps[i];

    back.disabled = (i === 0);
    next.textContent = (i === steps.length - 1) ? 'Finish' : 'Next';
    next.disabled = true;

    if (s.before) { try { s.before(); } catch (e) {} }

    target = s.el ? document.querySelector(s.el) : null;
    if (target && s.scroll !== false) {
      target.scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' });
    }

    setTimeout(function () {
      txt.innerHTML = s.text;
      count.textContent = 'Step ' + (i + 1) + ' of ' + steps.length;
      place();
      box.classList.add('on');
      setTimeout(function () {
        if (s.action) { try { s.action(); } catch (e) {} }
        place();
        next.disabled = false;
        next.focus();
      }, reduce ? 0 : 320);
    }, reduce ? 0 : (s.settle || 420));
  }

  function start() {
    if (!(window.TOUR || []).length) return;
    opener = document.activeElement;
    live = true;
    veil.classList.add('on');
    go(0);
  }

  function stop() {
    live = false; i = -1; target = null;
    veil.classList.remove('on');
    box.classList.remove('on');
    ring.style.display = 'none';
    if (opener && opener.focus) { try { opener.focus(); } catch (e) {} }
  }

  function init() {
    build();
    Array.prototype.forEach.call(document.querySelectorAll('[data-tour-start]'), function (b) {
      b.addEventListener('click', function (e) { e.preventDefault(); start(); });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.GuidedTour = { start: start, stop: stop };
})();
