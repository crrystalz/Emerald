const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Displays a list of all commands'),
    async execute(interaction) {
        const helpEmbed = new MessageEmbed()
                .setColor('#152023')
                .setTitle('Commands')
                .setDescription(
                    '``/code_comment_thread`` - Creates thread with code snippet and comment \n <:c_t:1000837386776870942> file_link: Requires link to the file snippet is in \n <:c_t:1000837386776870942> name: Name of the thread to be created \n <:c_t:1000837386776870942> line_number: The line number of the middle of snipppet \n <:c_t:1000837386776870942> margin: The number of prior and following lines to include in the snippet \n <:c_l:1000837268669481031> comment: The comment to add to the thread \n ``/code_comment`` - Sends code and comment in channel \n <:c_t:1000837386776870942> file_link: Requires link to the file snippet is in \n <:c_t:1000837386776870942> line_number: The line number of the middle of snipppet \n <:c_t:1000837386776870942> margin: The number of prior and following lines to include in the snippet \n <:c_l:1000837268669481031> comment: The comment to add to add after the code \n ``/code_scrape`` - Sends code snippet in channel \n <:c_t:1000837386776870942> file_link: Requires link to the file snippet is in \n <:c_t:1000837386776870942> line_number: The line number of the middle of snipppet \n <:c_l:1000837268669481031> margin: The number of prior and following lines to include in the snippet'
                )
            
            interaction.reply({ embeds: [helpEmbed] });
    },
}