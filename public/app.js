async function load() {

    const response = await fetch("/status");

    const data = await response.json();

    const tbody = document.getElementById("table");

    tbody.innerHTML = "";

    data.forEach(item => {

        tbody.innerHTML += `

<tr>

<td>${item.host}</td>

<td>${item.ip}</td>

<td>${item.alive ? "🟢 Online" : "🔴 Offline"}</td>

<td>${item.time} ms</td>

<td>${item.packetLoss}%</td>

<td>${item.date}</td>

</tr>

`;

    });

}

load();

setInterval(load,30000);
