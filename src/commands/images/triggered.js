const Command = require('command');
const img = require('@modules/ImageGen');
const { MessageAttachment, MessageEmbed } = require('discord.js');

module.exports = class TriggeredCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'triggered',
            aliases: ['trigger'],
            category: 'images',
            description: 'Apply triggered effect on your pfp',
            usage: 'triggered [member]'
        });
    }

    async run(message, args) {
        let user = message.mentions.users.first() ? message.mentions.users.first().user : args.length ? await message.resolveUser(args.join(' ')) : message.author;
        if(!user) user = message.author;

        let trigger = await img.trigger(user.displayAvatarURL({ format: 'png', size: 512 }));
        let attachment = new MessageAttachment(trigger, 'trigger.gif');

        let embed = new MessageEmbed()
        .attachFiles([attachment])
        .setImage('attachment://trigger.gif')
        .setColor('RANDOM')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.inlineReply(embed);
    }
}