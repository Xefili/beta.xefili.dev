let win = document.getElementById("singin");

async function signin() {
    try {
    let rawOptions = `{
        "method": "POST",
        "mode": "cors",
        "headers": {
            "X-Pass": "${document.getElementById("passwd").value}"
        }
    }`
    let options = JSON.parse(rawOptions);

    let response = await fetch("https://api.xefili.dev/login", options);
    if(response.status == 200) {
        win.classList.toggle("hidden");
        try{document.getElementsByTagName("alert")[0].classList.add("hidden");}catch(e){}
        document.getElementById("main").classList.toggle("hidden");
        startup();
    } else {
        document.getElementsByTagName("alert")[0].classList.toggle("hidden");
    }
    } catch(e) {
        alert(`Wrong password! The following error was produced: ${e}`);
    }
}

window.signin = signin;