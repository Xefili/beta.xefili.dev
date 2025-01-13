let trace = {x:[],y:[],fill:"tozeroy"};
let trace2 = {x:[],y:[],fill:"tozeroy"};

var layout = {
    type: "scattergl",
    title: "Free Memory [in MB]",
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    font: {
        color: "#FFFFFF"
    },
    margin: {
        b: 50,
        l: 50,
        r: 50,
        t: 50
    }
}
var layout2 = {
    type: "scattergl",
    title: "Current Load [in %, floats]",
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    font: {
        color: "#FFFFFF"
    },
    margin: {
        b: 50,
        l: 50,
        r: 50,
        t: 50
    }
}

let thresholds = {
    load: {
        low: 0.2,
        med: 0.8
        //higher loads will be 0.8 and up
    },
    freemem: {
        low: 3000,
        med: 2000
        //anything below 2GB free memory is considered high memory usage
    }
}

let count = 0;

async function startup() {
    let response = await fetch("https://api.xefili.dev/dashboard/sys", {mode:"cors",method:"GET"});
    let prefetch = await response.json();

    count++;
    trace.x.push(count);
    trace.y.push(Math.round(prefetch.freemem/1000/1000));
    trace2.x.push(count);
    trace2.y.push(prefetch.load[2]);

    fillData(prefetch);
    colorize(prefetch);
    refresh();
}

window.startup = startup;

function fillData(prefetch) {
    document.getElementById("load").innerHTML = `Load: ${prefetch.load[2]*100}%`;
    document.getElementById("uptime").innerHTML = `Uptime: ${prefetch.uptime}s`;
    document.getElementById("platform").innerHTML = `Platform: ${prefetch.platform}`;
    document.getElementById("arch").innerHTML = `Archicture: ${prefetch.arch}`;
    document.getElementById("freemem").innerHTML = `Free memory: ${Math.round(prefetch.freemem/1000/1000)}MB`;

    let data = [trace];
    let data2 = [trace2];
	Plotly.newPlot(document.getElementById("graph"), data, layout, {"staticPlot": true});
	Plotly.newPlot(document.getElementById("graph2"), data2, layout2, {"staticPlot":true});
}

function colorize(prefetch) {
    document.getElementById("freemem").classList.remove("green");
    document.getElementById("freemem").classList.remove("yellow");
    document.getElementById("freemem").classList.remove("red");
    
    document.getElementById("load").classList.remove("green");
    document.getElementById("load").classList.remove("yellow");
    document.getElementById("load").classList.remove("red");
    
    if(prefetch.load[2] <= thresholds.load.low) {
        document.getElementById("load").classList.add("green");
    }
    if(prefetch.load[2] <= thresholds.load.med && prefetch.load[2] > thresholds.load.low) {
        document.getElementById("load").classList.add("yellow");
    }
    if(prefetch.load[2] > thresholds.load.med) {
        document.getElementById("load").classList.add("red");
    }

    if(Math.round(prefetch.freemem/1000/1000) >= thresholds.freemem.low) {
        document.getElementById("freemem").classList.add("green");

    }
    if(Math.round(prefetch.freemem/1000/1000) < thresholds.freemem.low) {
        document.getElementById("freemem").classList.add("yellow");
    }
    if(Math.round(prefetch.freemem/1000/1000) < thresholds.freemem.med) {
        document.getElementById("freemem").classList.add("red");
    }
}

async function refresh() {
    setTimeout(async() => {
        startup();
    }, 10000);
}