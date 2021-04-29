import Command from '../../base/Command';
import Discord, { MessageEmbed } from 'discord.js';
import imdb from 'imdb-api';
import Client from '../../base/Client';
const client = new imdb.Client({ apiKey: process.env.IMDB_API });

export default class IMDBCommand extends Command {
    constructor(client: Client) {
        super(client, {
            name: 'imdb',
            aliases: ['movieinfo', 'showinfo'],
            category: 'search',
            description: 'Get information about the specified show, movie, or series.',
            usage: 'imdb <(movie|show|series) title | imdb id>',
            minArgs: 1,
            maxArgs: -1
        });
    }

    async run(message: Discord.Message, args: string[]) {
        try {
            const data: any = /ev\d{7}\/\d{4}(-\d)?|(ch|co|ev|nm|tt)\d{7}/.test(args[0]) === true ? await client.get({ id: args[0] }) : await client.get({ name: args.join(' ') });
    
            let embed = new MessageEmbed()
            .setTitle(data.year === 0 ? `${data.title}`: `${data.title} (${data.year})`)
            .setURL(data.imdburl)
            .setDescription(data.plot)
            .addField('Production', data.production || 'None', true)
            .addField('Director', data.director || 'None', true)
            .addField('Writers', data.writer || 'None', true)
            .addField('Runtime', data.runtime || 'None', true)
            .addField('Type', this.client.utils.toProperCase(data.type) || 'None', true)
            .addField('Runtime', data.runtime || 'None', true)
            .addField('Status', !data.end_year ? 'Ongoing' : 'Finished', true)
            .addField('Actors', data.actors || 'None', true)
            .addField('Rated', data.rated || 'None', true)
            .addField('Languages', data.languages || 'None', true)
            .addField('Awards', data.awards || 'None', true)
            .addField('Rating', data.rating, true)
            .addField('Metascore', data.metascore, true)
            .addField('Votes', data.votes, true)
            .setColor('RANDOM')
            .setThumbnail(data.poster.startsWith('https') ? data.poster : data.poster.startsWith('http') ? data.poster : null)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp();
            message.reply(embed);
        } catch(err) {
            message.reply('❌ | No data retrieved from IMDB.');
        }
    }
}