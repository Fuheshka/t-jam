// Shared ambient motion: drifting gradient, light orbs, ИСТ ray fan and ray wave.
(function () {
  const PAL = ['#7FD6C2', '#8FA6E6', '#B98BE0', '#E9A9D0'];
  const NS = 'http://www.w3.org/2000/svg';
  function svg(cls, viewBox, style, html) {
    const el = document.createElementNS(NS, 'svg');
    el.setAttribute('class', cls); el.setAttribute('viewBox', viewBox); el.setAttribute('aria-hidden', 'true');
    el.setAttribute('style', style); el.innerHTML = html; document.body.prepend(el);
  }
  function fan(style) {
    let h = `<defs><linearGradient id="mfg" x1="0" x2="1"><stop offset="0" stop-color="${PAL[0]}"/><stop offset=".45" stop-color="${PAL[1]}"/><stop offset=".75" stop-color="${PAL[2]}"/><stop offset="1" stop-color="${PAL[3]}"/></linearGradient></defs>`;
    for (let i = 0; i < 9; i++) {
      const a = 192 + i * 19.5, L = 120 + (i % 2) * 22;
      h += `<g transform="translate(200 214) rotate(${a})"><g class="bar" style="--d:${300 + i * 70}ms"><rect x="74" y="-11" width="${L}" height="22" rx="3" fill="url(#mfg)"/><rect x="80" y="-5" width="${L}" height="22" rx="3" fill="none" stroke="#F6F4FA" stroke-opacity=".75" stroke-width="2"/></g></g>`;
    }
    svg('m-fan', '0 0 400 230', style, h);
  }
  function wave(style) {
    let h = '', idx = 0;
    for (let k = 0; k < 4; k++) {
      const cx = 155 + k * 175, up = k % 2 === 0;
      for (let j = 0; j <= 14; j++) {
        const t = Math.PI + (j / 14) * Math.PI, a = up ? t : t - Math.PI, r1 = 52, r2 = 92 + (j % 2) * 10;
        h += `<line x1="${(cx + r1 * Math.cos(a)).toFixed(1)}" y1="${(125 + r1 * Math.sin(a)).toFixed(1)}" x2="${(cx + r2 * Math.cos(a)).toFixed(1)}" y2="${(125 + r2 * Math.sin(a)).toFixed(1)}" stroke="${PAL[Math.min(3, Math.floor(idx / 15))]}" stroke-width="4" stroke-linecap="round" style="--d:${idx * 45}ms"/>`;
        idx++;
      }
    }
    svg('m-wave', '0 0 800 260', style, h);
  }
  window.motion = function (opts) {
    const bg = document.createElement('div');
    bg.className = 'motion-bg';
    bg.innerHTML = '<div class="m-orb o1"></div><div class="m-orb o2"></div>';
    document.body.prepend(bg);
    if (opts.fan) fan(opts.fan);
    if (opts.wave) wave(opts.wave);
  };
})();
