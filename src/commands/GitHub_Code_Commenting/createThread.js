const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const { spawn } = require('child_process');

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
        const fileLink = interaction.options.getString('file_link');
        const threadName = interaction.options.getString('name');
        const lineNumber = interaction.options.getInteger('line_number');
        const margin = interaction.options.getInteger('margin');
        const comment = interaction.options.getString('comment');

        const thread = await interaction.channel.threads.create({
            name: threadName,
            autoArchiveDuration: 10080,
        });

        console.log(`Created thread: ${thread.name}`);

        let input = { 
            'file_link': fileLink,
            'line_number': lineNumber,
            'margin': margin,
        }

        const pyfile = spawn('python', [`./src/commands/GitHub_Code_Commenting/scrape.py`, JSON.stringify(input)]);

        pyfile.stdout.on('data', (data) => {
            console.log('e')
            console.log(`stdout: ${data}`);
        });

        pyfile.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        pyfile.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });

        await thread.send(comment);
        await interaction.reply('Succesfully created a thread!');
    },
}