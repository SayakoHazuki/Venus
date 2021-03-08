const { exec } = require('child_process');
const Command = require('command');

module.exports = class ExecCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'exec',
            aliases: ['shell'],
            category: 'owner',
            description: 'Execute bash commands.',
            usage: 'exec <command>',
            devOnly: true,
            minimumRequiredArgs: 1,
        });
    }

    async run(client, message, args) {
        exec(message.content.replace('v.shell', '').replace('v.exec', ''), (error, stdout, stderr) => {
            if (error) {
                message.channel.send(`${error.message}`, { code: 'xl' });
                return;
            }
            if (stderr) {
                message.channel.send(`${stderr}`, { code: 'xl' });
                return;
            }
            return message.channel.send(`${stdout}`, { code: 'xl' });
        });
    }
}