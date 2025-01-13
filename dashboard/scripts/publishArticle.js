async function getValues() {
    let title = document.getElementById("titleForm").value;
    let content = document.getElementById("contentForm").value;
    let tags = document.getElementById("tagForm").value;

    let passphrase = document.getElementById("passphrase").value;

    let data = {};
    data.title = title;
    data.content = content;
    data.tags = [];

    let t = tags.trim();
    let s = t.split(",");

    for(let i = 0; i<3; i++) {
        data.tags.push(s[i]);
    }
    
    data.pass = passphrase;

    await createJSON(data);
}

window.getValues = getValues;

async function createJSON(data) {
    let d = new Date();
    data.time = {};
    data.time.year = d.getFullYear();
    data.time.month = d.getMonth();
    data.time.day = d.getDay();

    await pushArticle(data);
}

async function hash(string) {
    const utf8 = new TextEncoder().encode(string);
    return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(bytes => bytes.toString(16).padStart(2, '0')).join('');
        return hashHex;
    });
}

window.hash = hash;

async function pushArticle(data) {

    console.info(data);

    let options = {
        mode: "cors",
        method: "POST",
        headers: {
            "X-API-Key": `${await hash(data.pass)}`
        },
        body: JSON.stringify(data)
    }
    await fetch("https://api.xefili.dev/articles", options);

    delete data.pass;
}