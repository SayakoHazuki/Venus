const { MessageEmbed, MessageAttachment } = require("discord.js");
const Command = require("../../base/classes/Command");
const img = require("../../base/modules/ImageGen");

class WastedCommand extends Command {
    constructor() {
        super({
            name: 'wasted',
            aliases: [],
            category: 'images',
            description: 'Generate a wasted image from GTA.',
            usage: 'wasted [member]'
        });
    }

    async run(client, message, args) {
        let user = message.mentions.members?.first() ? message.mentions.members.first()?.user : message.author;

        const attachment = new MessageAttachment(await img.wasted(user?.displayAvatarURL({ format: 'png', size: 512 })), 'wasted.png');
    
        let embed = new MessageEmbed()
        .setColor('#FF0000')
        .attachFiles([attachment])
        .setImage('attachment://wasted.png')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();
        message.channel.send(embed);
    }
}

module.exports = WastedCommand;