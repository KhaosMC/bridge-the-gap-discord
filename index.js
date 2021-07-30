const Discord = require('discord.js');
const io = require('socket.io');
const fs = require('fs');

let client = new Discord.Client();
var socket;

const config = JSON.parse(fs.readFileSync('config.json'))
console.log(config.server_url)

client.login(config.token);

client.on('ready', async () => {
    client.user.setActivity('over Khaos Applications', {
        type: "WATCHING"
    });
    console.log('Bot is up and running!');
    if (config.launch_server) {
        console.log('Launching websocket server!')
        // Launch server
    }
    try {
        socket = io.connect(config.server_url);
    } catch {
        chatbridge_enabled = false;
        console.log('Error! Websocket is not running!')
        process.exit();
    }
})

client.on('message', async message => {
    if (message.channel.id == config.channel_id && !(message.author.bot)) {
        const data = {
            "msg": message.content,
            "username": message.author.username
        };
        socket.send(JSON.stringify(data));
    }
})

 try {
    socket.on('message', function (data) {
        const msg = JSON.parse(data);
        client.guilds.channels.cache.get(config.channel_id).send(`[${msg.client_name}] <${msg.username}> ${msg.msg}`);
    })
} catch {} 