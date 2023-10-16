require('dotenv').config();
const https = require('https');
const express = require('express');
const expressWs = require('express-ws');
const fs = require('fs')
const chalk = require('chalk');
const path = require('path');
const util = require('util');

const app = express();

let BOT_RUNNING = false;

var options = {
  key: fs.readFileSync('server.key', 'utf-8'),
  cert: fs.readFileSync('server.crt', 'utf-8'),
};
const httpsServer = https.createServer(options, app);
const wss = expressWs(app, httpsServer);


app.ws('/connect', function (ws, req) {
  ws.on('message', function (msg) {
    if (msg === "connectRequest") {
        /*let obj;
        try {
            obj = { botStatus: BOT_RUNNING, privateKey: process.env.PRIVATE_KEY, contractAddr: process.env.CONTRACT, nodeUrl: process.env.WSS_BLOCKS, tokenA: process.env.TOKENA, tokenB: process.env.TOKENB, slippage: process.env.SLIPPAGE, gasPrice: process.env.GASPRICE, gasLimit: process.env.GASLIMIT };
            obj.botStatus =  BOT_RUNNING;
        } catch (error) {
            obj = {botStatus: BOT_RUNNING}
        }
        console.log(obj)
        ws.send(JSON.stringify(obj))*/
    } else {
        /*console.log(msg)
        var obj = JSON.parse(msg)
        if (!obj.botStatus) {
            //stop bot
            BOT_RUNNING = false;
            ws.send(JSON.stringify({botStatus: BOT_RUNNING}))
            return;
        }
        
        initConfig(obj)
        try {
            BOT_RUNNING = true;
            run()
        } catch (error) {
            BOT_RUNNING = false;
        }*/
        
        //setBotStatus(obj)
        //botStatus = obj.botStatus 
    }
  })
})

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
  

httpsServer.listen(process.env.port, (console.log(chalk.yellow(`web server is running now.....`))));


var log_file = fs.createWriteStream(__dirname + '/log_bot.txt', { flags: 'w' });
var log_stdout = process.stdout;
console.log = function (d) {
    log_file.write(util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
};



const initConfig = async (obj) => {
    var config = fs.createWriteStream(__dirname + '/.env', { flags: 'w' });
    config.write("privateKey=" + obj.privateKey +'\n');
    
    /*try {
        var config = fs.createWriteStream(__dirname + '/.env', { flags: 'w' });
        if (obj.privateKey)
            config.write("PRIVATE_KEY=" + obj.privateKey +'\n');
        
        if (obj.nodeUrl)
            config.write("WSS_BLOCKS=" + obj.nodeUrl +'\n');

        if (obj.contractAddr)
            config.write("CONTRACT=" + obj.contractAddr +'\n');

        if (obj.tokenA)
            config.write("TOKENA=" + obj.tokenA +'\n');
        
        if (obj.tokenB)
            config.write("TOKENB=" + obj.tokenB +'\n');

        if (obj.slippage)
            config.write("SLIPPAGE=" + obj.slippage +'\n');
        
        if (obj.gasPrice)
            config.write("GASPRICE=" + obj.gasPrice +'\n');
        
        if (obj.gasLimit)
            config.write("GASLIMIT=" + obj.gasLimit +'\n');
        
        var aWss = wss.getWss('/');
        aWss.clients.forEach(function (client) {
            var obj = {botStatus: true};
            var updateInfo = JSON.stringify(obj);
            client.send(updateInfo);
        });
    } catch (error) {
        
    }*/
}

const run = async () => {

}
