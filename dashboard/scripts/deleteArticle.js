async function deleteArticle() {
    let URI = document.getElementById("link").value;
    let p = document.getElementById("keystore").value;
    let passphrase = await hash(p);

    await fetch(`https://api.xefili.dev/${URI}`, {mode:"cors", method:"DELETE", headers:{"X-API-Key": passphrase}});
    p = "";
    passphrase = "";
}

window.deleteArticle = deleteArticle;