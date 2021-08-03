// Import libraries and create a discord client
const Discord = require('discord.js');
const WebSocket = require('ws');
const fs = require('fs');
const execFile = require('child_process').execFile;

let client = new Discord.Client();

const config = JSON.parse(fs.readFileSync('config.json')) // Import the config

if (config.launch_server) {
    console.log('Launching websocket server!')
    try {
        const child = execFile(config.server_path, (err) => {
            if (err) throw err;
        });
        console.log('Success! Websocket server was started');
    } catch {
        console.log('Error! Failed to launch server!')
    }
}

// Connect to socket and automatic reconnection
var socket = new WebSocket(config.server_url);
var time = 0;

socket.on('open', () => { // Authenticate client
    const auth = {
        "auth":config.auth_token,
        "name": config.client_name,
        "type": config.client_type
    };
    socket.send(JSON.stringify(auth));
    time = 0;
});

socket.on('close', () => { // Retry connection if failed
    setTimeout(() => {
        socket.connect();
        if (time <= 30000) {
            time += 2000;
        }
    }, time)
});

client.login(config.token); // Login to the bot account

// Check if websocket should be started with the bot, then try to connect to server
client.on('ready', async () => {
    client.user.setActivity('over bridge channel', {
        type: "WATCHING"
    });
    console.log('Bot is up and running!');
})

// Send data to websocket when message is received in chatbridge channel
client.on('message', async message => {
    if (message.channel.id == config.channel_id && !(message.author.bot)) {
        const data = {
            "type": "chat_message",
            "targets": [],
            "user": {
                "id": message.author.id,
                "name": message.author.username,
                "display_color": message.author.display_color
            },
            "message": message.content
        };
        socket.send(JSON.stringify(data));
    }
})

// Send message to channel if message is recieved
socket.on('message', function(recievedMessage) {
    const data = JSON.parse(recievedMessage);
    if (data.type == 'chat_message') {
        client.channels.cache.get(config.channel_id).send(`[${data.source.name}] <${data.user.name}> ${data.message}`)
    } else if (data.type == 'user_connection') {
        if (data.connect) {
            client.channels.cache.get(config.channel_id).send(`[${data.source.name}] ${data.user.name} joined the game`)
        } else if (!data.connect) {
            client.channels.cache.get(config.channel_id).send(`[${data.source.name}] ${data.user.name} left the game`)
        }
    }
});
