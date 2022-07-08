const {
    SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create_thread')
        .setDescription('Creates thread with given name')
        .addStringOption(option =>
            option.setName('file_link')
            .setDescription('Link to the file that comment is about')
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('name')
            .setDescription('The name of the thread')
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
        )
        .addStringOption(option =>
            option.setName('comment')
            .setDescription('The comment to add to the thread')
            .setRequired(true)
        ),

    async execute(interaction) {
        const threadName = interaction.options.getString('name');
        const comment = interaction.options.getString('comment');

        const thread = await interaction.channel.threads.create({
            name: threadName,
            autoArchiveDuration: 10080,
        });

        console.log(`Created thread: ${thread.name}`);

        await thread.send(comment);
        await interaction.reply('Succesfully created a thread!');
    },
}