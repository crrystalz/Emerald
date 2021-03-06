const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const { spawn } = require('child_process');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('code_comment')
        .setDescription('Sends code and comment in channel')
        .addStringOption(option =>
            option.setName('file_link')
            .setDescription('Link to the file that snippet is in')
            .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('line_number')
            .setDescription('The line number of the middle of snipppet')
            .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('margin')
            .setDescription('The number of prior and following lines to include in the snippet')
            .setRequired(true)
        ),

    async execute(interaction) {
        const fileLink = interaction.options.getString('file_link');
        const lineNumber = interaction.options.getInteger('line_number');
        const margin = interaction.options.getInteger('margin');
        const comment = interaction.options.getString('comment');

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

            const commentEmbed = new MessageEmbed()
                .setColor('#152023')
                .addFields(
                    { name: 'Comment', value: `${comment}`},
                )

                .setFooter({ text: "Comment created by " + interaction.user.username, iconURL: interaction.user.displayAvatarURL() });
            
            interaction.channel.send({ embeds: [commentEmbed] });
        });

        pyfile.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        pyfile.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });
    },
}