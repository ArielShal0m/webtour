# Testar VR no PC (sem óculos o tempo todo)

## URL com `simulateVR=1`

Abra o tour assim:

```
index.htm?simulateVR=1
```

Isso faz **duas coisas**:

1. **Entra em modo VR automaticamente** (igual ao parâmetro `?vr` do 3DVista), ~0,5 s após carregar — o mesmo fluxo de clicar no botão de óculos.
2. **Cliques em hotspots de página (iframe)** redirecionam para a URL, como no óculos real.

Use **HTTPS** (ou `localhost`). Em `http://` o navegador costuma bloquear WebXR.

## Só forçar VR ao abrir

```
index.htm?vr
```

Comportamento original do player: tenta abrir VR ao carregar.

## Limitações no PC sem headset

- No **Chrome/Edge no PC**, ao entrar em VR o navegador pode pedir **óculos ligado** ou **emulador WebXR**; sem isso pode não aparecer imagem estéreo.
- Para **só testar o fluxo do formulário** (clicar → ir para a página → Voltar ao Tour), use `?simulateVR=1`: mesmo que o VR visual falhe, o **redirecionamento ao clicar no hotspot** funciona como no óculos.

## Tela branca com **Immersive Web Emulator** (Meta)

O tour usava o **WebXR Polyfill** com `overwriteNativeXR: true`, que **substituía** o `navigator.xr` do Chrome. O emulador da Meta precisa do WebXR **nativo** — daí conflito e tela branca.

**Correção aplicada:** o polyfill **não sobrescreve mais** o WebXR nativo (`overwriteNativeXR: false`). Recarregue o tour e teste de novo com o emulador.

Se em algum aparelho **muito antigo** com Cardboard o VR parar de funcionar, avise (dá para tentar outro ajuste).

### Passos com Immersive Web Emulator

1. Instale a extensão e **fixe o painel** (ícone da extensão).
2. No painel, escolha um headset (ex.: Quest 3) e clique para **ativar** a emulação.
3. Abra o tour em **HTTPS** ou **localhost**.
4. Entre no modo VR pelo botão do tour.

## Outros

- `chrome://flags` → **WebXR Incubations** (se existir) pode ajudar.
- Chrome atualizado costuma funcionar melhor com Three.js + WebXR.
