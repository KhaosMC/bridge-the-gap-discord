// Import libraries and create a discord client
const Discord = require('discord.js');
const io = require('socket.io');
const fs = require('fs');

let client = new Discord.Client();
var socket;

const config = JSON.parse(fs.readFileSync('config.json')) // Import the config

client.login(config.token); // Login to the bot account

// Check if websocket should be started with the bot, then try to connect to server
client.on('ready', async () => {
    client.user.setActivity('over bridge channel', {
        type: "WATCHING"
    });
    console.log('Bot is up and running!');
    if (config.launch_server) {
        console.log('Launching websocket server!')
        try {
            // Launch server
            setTimeout(10)
            console.log('Success! Websocket server was started');
        } catch {
            console.log('Error! Failed to launch server!')
        }


    }
    try {
        socket = io.connect(config.server_url);
    } catch {
        chatbridge_enabled = false;
        console.log('Error! Websocket is not running! Stopping client');
        process.exit();
    }
})

// Send data to websocket when message is received in chatbridge channel
client.on('message', async message => {
    if (message.channel.id == config.channel_id && !(message.author.bot)) {
        const data = {
            "msg": message.content,
            "username": message.author.username
        };
        socket.send(JSON.stringify(data));
    }
})

/*
// Send message to channel if message is recieved
socket.on('message', function (data) {
    const msg = JSON.parse(data);
    if (msg.msg != null) {
        client.guilds.channels.cache.get(config.channel_id).send(`[${msg.client_name}] <${msg.username}> ${msg.msg}`);
    };
}) */