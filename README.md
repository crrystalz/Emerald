# 🟢 Emerald [WIP]
Emerald is a all in one bot made for programmers and their teams. GitHub integration, custom code commenting with line by line specification.
* Wrote in [discord.js](https://github.com/discordjs/discord.js) v13, and supports slash commands

# Using Emerald
Emerald can be invited to any Discord server with this [link](https://discord.com/api/oauth2/authorize?client_id=994383308207161434&permissions=8&scope=bot%20applications.commands)

A full list of Emerald's commands can be viewed by running ``/help``

# Locally running a copy of Emerald
As Emerald is currently hosted on my own computer, the bot is often down. However, it's easy to get a copy of Emerald up and running on your own computer. **Please refrain from calling the bot your own work, and any modificatinos you wish to make to the bot please add as a pull request rather than modifying the bot in your own server, and you will be duly credited for your contribution(s).**

## Node Installation
### Windows and macOS

Install the **LTS** Node.js installer for your operating system [here](https://nodejs.org/en/download/)

### Arch

``pacman -S nodejs npm``

### Fedora
``dnf module install nodejs:<stream>`` where <stream> corresponds to the major version of Node.js

To view a list of available streams:

``dnf module list nodejs``

### Debian and Ubuntu based

[Node.js binary distributions](https://github.com/nodesource/distributions/blob/master/README.md) are available from NodeSource.

### Gentoo
``emerge nodejs``

## Cloning the repository
Follow the steps provided [here](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)

## Creating a application/bot in the Discord Developer Portal
Naviage to the [Discord Developer Portal](https://discord.com/developers/applications) and sign in with your Discord account. Next, press create application and type in a name, preferrably name it ``Emerald-{insert your server's name}`` and set a profile picture for the bot (the one used in the official bot can be found (here)[https://image.shutterstock.com/image-vector/emerald-gem-logo-vector-icon-260nw-1771876256.jpg]). Now that your Discord application is all setup, create a bot by navigating to the bot menu on the left hand side. Click on "Add bot" and confirm. Then copy the token to your clipboard, this will be used later.

## Inviting the bot to your server
Click on the OAuth2 button in the menu on the left, and activate the "bot" and "applications.command" scopes. Then in Bot Permissions, give your bot Administration access, and the link generated will invite the bot to your server when activated.

## Activating the bot
In order to activate the bot, create a file in the root folder of the cloned repository called ``.env``. In this file type ``DISCORD_TOKEN = {insert_token_here}"``. Paste in the token from your clipboard that you copied earlier, note that there shouldn't be any curly braces. Finally. in command prompt, naviage to the root directory of the bot and type ``node .``, this should start the bot.

If your are having trouble locally hosting the bot, DM me on Discord at crrystalz#0001

Please report any issues with using the bot [here](https://github.com/crrystalz/Emerald/issues/new). If you have any feature requests, send them to me on Discord at crrystalz#0001
