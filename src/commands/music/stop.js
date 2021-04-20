const Command = require('command');

module.exports = class StopCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'stop',
            aliases: ['dc', 'leave', 'getout', 'fuckoff', 'shutup', 'sadap', 'stfu', 'gtfo'],
            category: 'music',
            description: 'Stop the music playing and leave vc',
            usage: 'stop'
        });
    }

    async run(message, args) {
        let player = await this.client.player.getQueue(message);
        if(!player) return message.inlineReply('❌ | There is no queue for this guild.');
        if (!message.member.voice.channel) return message.channel.send(`❌ | You're not in a voice channel !`);
        if(message.member.voice.channel.id !== player.firstMessage.member.voice.channel.id) return message.inlineReply(`❌ | You are currently in the wrong voice channel. Please join <#!${player.queue.voiceChannel.id}>.`);
        let success = this.client.player.stop(message);
        if(success) message.inlineReply('⏹ | Stopped.');
    }
}