/**
 * vr-fix.js — Correção para WebXR dom-overlay no Pico / Wolvic / Quest
 *
 * Problema: Em modo VR (sessão WebXR immersive-vr), o browser NÃO renderiza
 * elementos DOM sobre a cena 3D por padrão. Os popups/janelas do 3DVista abrem,
 * mas ficam invisíveis — parece que "nada aconteceu".
 *
 * Solução: Configurar a feature "dom-overlay" ao iniciar a sessão XR,
 * apontando para document.body. Isso instrui o browser a compositar o DOM
 * como camada 2D sobre a cena VR.
 */
(function () {
    'use strict';

    // ── 1. Criar overlay root (será o root do dom-overlay WebXR) ──────────────
    const overlayRoot = document.createElement('div');
    overlayRoot.id = 'vr-dom-overlay-root';
    overlayRoot.style.cssText = [
        'position:fixed',
        'inset:0',
        'z-index:99999',
        'pointer-events:none',
        'display:flex',
        'flex-direction:column',
    ].join(';');
    document.body.appendChild(overlayRoot);

    let vrSessionActive = false;

    // ── 2. Hook em xr.requestSession para injetar dom-overlay ─────────────────
    function hookXRSystem() {
        const xr = navigator && navigator.xr;
        if (!xr || xr._vrFixHooked) return;
        xr._vrFixHooked = true;

        const origRequest = xr.requestSession.bind(xr);
        xr.requestSession = function (mode, opts) {
            if (mode && mode.includes('vr')) {
                opts = Object.assign({}, opts || {});

                // Adicionar dom-overlay nas optional features
                const optFeat = Array.isArray(opts.optionalFeatures)
                    ? opts.optionalFeatures.slice()
                    : [];
                if (!optFeat.includes('dom-overlay')) optFeat.push('dom-overlay');
                opts.optionalFeatures = optFeat;
                opts.domOverlay = { root: overlayRoot };

                console.log('[vr-fix] Sessão VR solicitada com dom-overlay');
            }

            const p = origRequest(mode, opts);

            p.then(function (session) {
                if (!mode || !mode.includes('vr')) return;
                vrSessionActive = true;
                console.log('[vr-fix] Sessão VR ativa — dom-overlay configurado');

                session.addEventListener('end', function () {
                    vrSessionActive = false;
                    // Devolver eventuais filhos do overlay pro body
                    while (overlayRoot.firstChild) {
                        document.body.appendChild(overlayRoot.firstChild);
                    }
                    overlayRoot.style.pointerEvents = 'none';
                    console.log('[vr-fix] Sessão VR encerrada');
                });
            }).catch(function () {});

            return p;
        };
    }

    // Tentar hook em diferentes momentos (player pode inicializar após o load)
    hookXRSystem();
    setTimeout(hookXRSystem, 800);
    setTimeout(hookXRSystem, 2500);
    setTimeout(hookXRSystem, 5000);

    // ── 3. MutationObserver: mover popups/janelas do 3DVista para o overlay ───
    // Quando o 3DVista cria uma janela modal, ela é adicionada ao body ou ao
    // #viewer. Em VR, esse nó precisa estar dentro do overlayRoot para aparecer.
    function isPopupNode(node) {
        if (node.nodeType !== 1) return false;
        const id = node.id || '';
        const cls = node.className || '';
        // Excluir os próprios containers do tour e nosso overlay
        if (id === 'viewer' || id === 'preloadContainer' || id === 'vr-dom-overlay-root') return false;
        // 3DVista usa z-index alto para janelas modais
        const zi = parseInt(node.style.zIndex, 10) || 0;
        const pos = node.style.position;
        return zi > 1 || pos === 'fixed' || pos === 'absolute';
    }

    const bodyObserver = new MutationObserver(function (mutations) {
        if (!vrSessionActive) return;

        mutations.forEach(function (mutation) {
            mutation.addedNodes.forEach(function (node) {
                if (!isPopupNode(node)) return;
                console.log('[vr-fix] Popup detectado em VR, movendo para overlay:', node.id || node.className);
                overlayRoot.style.pointerEvents = 'auto';
                overlayRoot.appendChild(node);
            });
        });
    });

    // Observar o body e o #viewer quando estiver pronto
    function startObserving() {
        bodyObserver.observe(document.body, { childList: true });
        const viewer = document.getElementById('viewer');
        if (viewer) bodyObserver.observe(viewer, { childList: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startObserving);
    } else {
        startObserving();
    }

    // ── 4. Fallback: interceptar window.open (hotspots tipo "abrir link") ─────
    const _origOpen = window.open;
    window.open = function (url, target, features) {
        if (vrSessionActive && url && /^https?:\/\//i.test(url)) {
            showVRFallbackPopup(url);
            return null;
        }
        return _origOpen.call(window, url, target, features);
    };

    // ── 5. Popup de fallback (para links que usam window.open em VR) ──────────
    function showVRFallbackPopup(url) {
        const existing = document.getElementById('vr-fix-popup');
        if (existing) existing.remove();

        const popup = document.createElement('div');
        popup.id = 'vr-fix-popup';
        popup.style.cssText = [
            'position:absolute',
            'inset:0',
            'background:rgba(0,0,0,0.95)',
            'display:flex',
            'flex-direction:column',
            'font-family:Arial,Helvetica,sans-serif',
            'z-index:999999',
        ].join(';');

        const shortUrl = url.length > 60 ? url.slice(0, 57) + '…' : url;

        popup.innerHTML =
            '<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 16px;background:#1c1c1c;border-bottom:1px solid #333;gap:12px;flex-shrink:0">' +
                '<span style="color:#888;font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1">' + shortUrl + '</span>' +
                '<a id="vrf-newtab" href="' + url + '" target="_blank" rel="noopener" style="background:#1a3a6b;border:1px solid #2a5aab;color:#7ab8ff;padding:8px 16px;border-radius:6px;font-size:13px;text-decoration:none;white-space:nowrap">↗ Nova aba</a>' +
                '<button id="vrf-back" style="background:#2d2d2d;border:1px solid #555;color:#fff;padding:8px 16px;border-radius:6px;cursor:pointer;font-size:13px;white-space:nowrap">← Voltar</button>' +
            '</div>' +
            '<iframe src="' + url + '" style="flex:1;border:none;width:100%;background:#fff" ' +
                'sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation allow-modals" ' +
                'allow="fullscreen;payment;xr-spatial-tracking" allowfullscreen></iframe>';

        overlayRoot.style.pointerEvents = 'auto';
        overlayRoot.appendChild(popup);

        function closePopup() {
            popup.remove();
            if (!overlayRoot.hasChildNodes()) {
                overlayRoot.style.pointerEvents = 'none';
            }
        }

        popup.querySelector('#vrf-back').addEventListener('click', closePopup);
        document.addEventListener('keydown', function onKey(e) {
            if (e.key === 'Escape') { closePopup(); document.removeEventListener('keydown', onKey); }
        });

        console.log('[vr-fix] Popup fallback aberto para:', url);
    }

    console.log('[vr-fix] Carregado — aguardando sessão VR');
})();
