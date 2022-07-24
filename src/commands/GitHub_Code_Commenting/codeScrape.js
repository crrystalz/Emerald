const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const { spawn } = require('child_process');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('code_scrape')
        .setDescription('Sends code snippet in channel')
        .addStringOption(option =>
            option.setName('file_link')
            .setDescription('Link to the file that comment is about')
            .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('line_number')
            .setDescription('The line number the comment is about')
            .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('margin')
            .setDescription('The number of prior and following lines to include in the message')
            .setRequired(true)
        ),

    async execute(interaction) {
        const fileLink = interaction.options.getString('file_link');
        const lineNumber = interaction.options.getInteger('line_number');
        const margin = interaction.options.getInteger('margin');

        let input = { 
            'file_link': fileLink,
            'line_number': lineNumber,
            'margin': margin,
        }

        const pyfile = spawn('python', [`./src/commands/GitHub_Code_Commenting/scrape.py`, JSON.stringify(input)]);
        
        pyfile.stdout.on('data', (data) => {
            const snippet = data.toString().split(',');

            console.log(snippet)
            
            interaction.reply(`${snippet}`);
        });

        pyfile.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        pyfile.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });
    },
}