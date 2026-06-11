/**********************************************************************************
 * v8 Mobile list cards — Contacts & Sales (Potentials)
 * --------------------------------------------------------------------------------
 * On phones only, and only for the Contacts and Potentials list views, renders
 * each record as a card with an initials avatar, the name, a couple of detail
 * lines and a chevron — matching the app design.
 *
 * It does NOT remove the original table cells (checkbox, links, data-*), it only
 * appends a card cell and hides the rest via CSS, so list logic (selection,
 * mass edit, row-click navigation handled by List.js) keeps working.
 * Runs on initial load and re-runs on DOM changes (pjax / pagination / filter).
 **********************************************************************************/
(function () {
	var MEDIA = '(max-width: 767px)';
	// Per-module config: avatar color, and optional explicit name/line fields
	// (by column data-name). When fields are omitted the card auto-derives them.
	var MODULES = {
		Contacts:   { color: 'mlc-blue' },
		Potentials: { color: 'mlc-orange', nameFields: ['potentialname'], lineFields: ['related_to', 'sales_stage'] }
	};

	function isMobile() {
		return window.matchMedia && window.matchMedia(MEDIA).matches;
	}

	function getModule() {
		if (window._META && _META.module) {
			return _META.module;
		}
		var mc = document.querySelector('[class*="main-container-"]');
		if (mc) {
			var m = /main-container-([A-Za-z0-9_]+)/.exec(mc.className);
			if (m) { return m[1]; }
		}
		return '';
	}

	function cellText(cell) {
		if (!cell) { return ''; }
		var v = cell.querySelector('.value');
		return ((v ? v.textContent : cell.textContent) || '').trim();
	}

	function initials(name) {
		var w = (name || '').trim().split(/\s+/).filter(Boolean);
		if (!w.length) { return '?'; }
		return ((w[0].charAt(0) || '') + (w[1] ? w[1].charAt(0) : '')).toUpperCase();
	}

	function findCell(row, names) {
		for (var i = 0; i < names.length; i++) {
			var c = row.querySelector('td.listViewEntryValue[data-name="' + names[i] + '"]');
			if (c) { return c; }
		}
		return null;
	}

	function enhanceRow(row, cfg) {
		if (row.getAttribute('data-mlc')) { return; }
		var values = row.querySelectorAll('td.listViewEntryValue');
		if (!values.length) { return; }
		row.setAttribute('data-mlc', '1');

		// --- Title / avatar name ---
		var nameCells = [];
		var nameText = '';
		if (cfg.nameFields) {
			var nc = findCell(row, cfg.nameFields);
			if (nc) { nameCells.push(nc); nameText = cellText(nc); }
		}
		if (!nameCells.length) {
			// Default: combine first/last name columns when present.
			var fn = findCell(row, ['firstname', 'first_name']);
			var ln = findCell(row, ['lastname', 'last_name']);
			if (fn) {
				nameText = cellText(fn);
				nameCells.push(fn);
				if (ln) {
					var l = cellText(ln);
					if (l) { nameText = (nameText + ' ' + l).trim(); }
					nameCells.push(ln);
				}
			}
		}
		if (!nameCells.length) { nameCells.push(values[0]); nameText = cellText(values[0]); }

		var td = document.createElement('td');
		td.className = 'mlc-cell';
		td.colSpan = 50;

		var card = document.createElement('div');
		card.className = 'mlc-card';

		var avatar = document.createElement('div');
		avatar.className = 'mlc-avatar ' + cfg.color;
		avatar.textContent = initials(nameText);

		var content = document.createElement('div');
		content.className = 'mlc-content';
		var title = document.createElement('div');
		title.className = 'mlc-title';
		title.textContent = nameText || '—';
		content.appendChild(title);

		// --- Detail lines: explicit fields when configured, else first few columns ---
		var lineCells = [];
		if (cfg.lineFields) {
			cfg.lineFields.forEach(function (f) {
				var c = findCell(row, [f]);
				if (c) { lineCells.push(c); }
			});
		} else {
			Array.prototype.forEach.call(values, function (c) {
				if (nameCells.indexOf(c) < 0 && lineCells.length < 3) { lineCells.push(c); }
			});
		}
		lineCells.forEach(function (c) {
			var t = cellText(c);
			if (!t) { return; }
			var line = document.createElement('div');
			line.className = 'mlc-line';
			line.textContent = t;
			content.appendChild(line);
		});

		var chev = document.createElement('span');
		chev.className = 'mlc-chevron fa fa-chevron-right';

		card.appendChild(avatar);
		card.appendChild(content);
		card.appendChild(chev);
		td.appendChild(card);
		row.appendChild(td);
	}

	// Keep the bottom-nav highlight in sync with the current module (the
	// server renders it correctly on full loads; this also covers pjax).
	function currentModuleFromUrl() {
		var m = /[?&]module=([A-Za-z0-9_]+)/.exec(window.location.search || window.location.href);
		return m ? m[1] : '';
	}
	function syncBottomNavActive() {
		var nav = document.querySelector('.mobile-bottom-nav');
		if (!nav) { return; }
		var mod = currentModuleFromUrl();
		Array.prototype.forEach.call(nav.querySelectorAll('.mobile-nav-item'), function (a) {
			var hm = /module=([A-Za-z0-9_]+)/.exec(a.getAttribute('href') || '');
			var itemMod = hm ? hm[1] : '';
			var active = itemMod === mod || (itemMod === 'Calendar' && (mod === 'Calendar' || mod === 'Events'));
			if (active) { a.classList.add('active'); } else { a.classList.remove('active'); }
		});
	}

	function ensureFab(module) {
		if (document.querySelector('.mobile-fab')) { return; }
		var a = document.createElement('a');
		a.className = 'mobile-fab';
		a.href = 'index.php?module=' + module + '&view=Edit';
		a.setAttribute('title', '+');
		a.innerHTML = '<i class="fa fa-plus"></i>';
		document.body.appendChild(a);
	}

	function run() {
		syncBottomNavActive();
		if (!isMobile()) { return; }
		var cfg = MODULES[getModule()];
		if (!cfg) { return; }
		var rows = document.querySelectorAll('#listview-table tr.listViewEntries');
		Array.prototype.forEach.call(rows, function (r) { enhanceRow(r, cfg); });
		if (rows.length) { ensureFab(getModule()); }
	}

	var scheduled = false;
	function schedule() {
		if (scheduled) { return; }
		scheduled = true;
		var raf = window.requestAnimationFrame || function (cb) { return setTimeout(cb, 16); };
		raf(function () { scheduled = false; run(); });
	}

	function start() {
		run();
		window.addEventListener('popstate', syncBottomNavActive);
		var target = document.getElementById('page') || document.body;
		try {
			new MutationObserver(schedule).observe(target, { childList: true, subtree: true });
		} catch (e) { /* MutationObserver unsupported: initial run already done */ }
	}

	if (document.readyState !== 'loading') {
		start();
	} else {
		document.addEventListener('DOMContentLoaded', start);
	}
})();
