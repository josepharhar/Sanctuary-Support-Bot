// This command adds a snippet to the snippets collection
/*--- DEV ONLY ---*/

import { ApplicationCommandOptionType } from 'discord.js';
import Snippet from '../../schemas/snippet.js';


export default {
    name: 'addsnippet',
    description: 'Add a snippet',
    options: [{
            name: 'label',
            description: 'The label for the snippet',
            required: true,
            type: ApplicationCommandOptionType.String
        },
        {
            name: 'message',
            description: 'The message for the snippet',
            required: true,
            type: ApplicationCommandOptionType.String
        }
    ],
    devOnly: true,
    callback: async (client, interaction) => {
        await interaction.deferReply();
        const label = interaction.options.getString('label');
        const message = interaction.options.getString('message');

        const newSnippet = new Snippet({
            snippetName: label,
            snippetContent: message,
        });

        await newSnippet.save();
        await interaction.editReply(`${label} snippet successfully added.`);
    }
}