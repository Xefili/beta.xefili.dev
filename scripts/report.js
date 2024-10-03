async function report() {
    let page = document.getElementById("page").value;
    let reason = document.getElementById("reason").value;

    page = HtmlSanitizer.SanitizeHtml(page);
    reason = HtmlSanitizer.SanitizeHtml(reason);
    
    console.log(page);
    console.log(reason);

    let str = `{pg:"${page}",rs:"${reason}"}`;

    let options = {
        method: "POST",
        body: JSON.stringify(str)
    }
    await fetch("https://api.xefili.dev/r", options);
    alert("Submitted report!");
    window.location.reload();
}

document.getElementById("reportform").addEventListener("submit", (event) => {
    event.preventDefault();
})

window.report = report;