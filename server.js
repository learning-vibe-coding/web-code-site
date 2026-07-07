import express from "express";
import ping from "ping";
import fs from "fs";

const app = express();

app.use(express.static("public"));

const hosts = JSON.parse(fs.readFileSync("hosts.json"));

app.get("/status", async (req, res) => {

    let result = [];

    for (const host of hosts) {

        try {

            const r = await ping.promise.probe(host, {
                timeout: 2
            });

            result.push({

                host,

                alive: r.alive,

                ip: r.numeric_host,

                time: r.time,

                packetLoss: r.packetLoss,

                date: new Date().toLocaleString()

            });

        } catch {

            result.push({

                host,

                alive: false,

                ip: "-",

                time: "-",

                packetLoss: "100",

                date: new Date().toLocaleString()

            });

        }

    }

    res.json(result);

});

app.listen(3000, () => {

    console.log("http://localhost:3000");

});
