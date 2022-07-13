const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const { spawn } = require('child_process');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('code_comment_thread')
        .setDescription('Creates thread with code and comment')
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
        // .addStringOption(option =>
        //     option.setName('file_type')
        //     .setDescription('Optional field, required for syntax highlighting')
        //     .setRequired(true)
        //     .addChoices(
        //         { name: 'js', value: 'js' },
        //         { name: 'python', value: 'py'},
        //     )
        // ),

    async execute(interaction) {
        const fileLink = interaction.options.getString('file_link');
        const threadName = interaction.options.getString('name');
        const lineNumber = interaction.options.getInteger('line_number');
        const margin = interaction.options.getInteger('margin');
        const comment = interaction.options.getString('comment');
        // const fileType = interaction.options.getString('file_type');

        const thread = await interaction.channel.threads.create({
            name: threadName,
            autoArchiveDuration: 10080,
        });

        console.log(`Created thread: ${thread.name}`);

        let input = { 
            'file_link': fileLink,
            'line_number': lineNumber,
            'margin': margin,
            // 'file_type': fileType,
        }

        const pyfile = spawn('python', [`./src/commands/GitHub_Code_Commenting/scrape.py`, JSON.stringify(input)]);
        
        pyfile.stdout.on('data', (data) => {
            const snippet = data.toString().split(',');
            // const snippet = [];
            // for (i = 0; i < snippet1.length; i++) {
            //     console.log(snippet1[i].substr(1, -1))
            //     snippet.push(snippet1[i].substr(1, -1));
            // }

            // const snippet = snippet1.map(s => s.slice(-1));

            console.log(snippet)
            
            interaction.reply(`${snippet}`);

            const commentEmbed = new MessageEmbed()
                .setColor('#152023')
                .addFields(
                    { name: 'Comment', value: `${comment}`},
                )
                // .setImage(interaction.user.avatarURL())
                .setFooter({ text: "Comment created by " + interaction.user.username, iconURL: interaction.user.displayAvatarURL() });
            
            // thread.send(comment);
            thread.send({ embeds: [commentEmbed] });
            // interaction.reply('Succesfully created a thread with code snippet and comment!');
            // console.log(`${data}`)
            // snippet.push(`${data}`);
        });

        pyfile.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        pyfile.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });
    },
}