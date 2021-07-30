# bridge-the-gap-discord
An example discord client for [bridge-the-gap](https://github.com/KhaosMC/bridge-the-gap)

# Prerequisites
The client requires a bunch of nodejs packages (can be installed through npm).
```
git clone https://github.com/KhaosMC/bridge-the-gap-discord.git
cd bridge-the-gap-discord
npm i discord.js socket.io fs child_process
```

# Config
Before you using this bot, please look over the config file and change values as needed
```
token - this is your discord bot token which you acquire through the developer portal on discord, if you're not sure how to set one up, look it up online.
channel_id - channel which you wish for the bot to listen to and send message through, this is where it'll bridge the gap
launch_server - Off by default, however, the bot will launch the websocket server using the server path below. Will not close it if bot crashes and you need to import the executable yourself
server_path - Relative path to the server executable, this can be left empty if launch_server is false
client_name - the name you wish for the client to have (this is used for displaying where the message is ocming from)
client_type - the type (such as minecraft or discord) of the client
server_url - this is the url for the websocket server
auth_token - authentication token for websocket server, generated through the server
```

# Usage
Using the bot is relatively simple, simply just run
```
node index.js
