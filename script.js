const liffId = "2008567223-nEGAWAee"; // LINE Developers で発行された LIFF ID

async function initLiff() {
  try {
    await liff.init({ liffId });
    // LIFFが初期化されるとIDトークンやアクセストークンが取れる場合がある
    const idTokenPayload = liff.getDecodedIDToken();
    console.log("decoded ID token:", idTokenPayload);
    // 例：userId を使う（payload.sub や liff.getContext() 参照）
    const userId = idTokenPayload ? idTokenPayload.sub : null;
    // サーバにIDトークンを送って本人確認／紐付け処理を行う
    if (idTokenPayload) {
      await fetch("/api/link_line_user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: liff.getIDToken() })
      });
    }
  } catch (err) {
    console.error("LIFF init error", err);
  }
}

window.addEventListener("load", () => {
  initLiff();
});
