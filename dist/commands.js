"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const config_1 = tslib_1.__importDefault(require("./config"));
const { prefix } = config_1.default;
const commands = {
    'help': {
        description: 'Menampilkan daftar perintah beserta detailnya.',
        format: 'help'
    },
    'ping': {
        description: 'Memeriksa koneksi dengan server Discord.',
        format: 'ping'
    },
    'say': {
        aliases: ['repeat'],
        description: 'Mengulang apa pun yang dikatakan.',
        format: 'say <pesan>'
    }
};
function helpCommand(message) {
    const footerText = message.author.tag;
    const footerIcon = message.author.displayAvatarURL();
    const embed = new discord_js_1.MessageEmbed()
        .setTitle('MENU BANTUAN')
        .setColor('GREEN')
        .setFooter({ text: footerText, iconURL: footerIcon });
    for (const commandName of Object.keys(commands)) {
        const command = commands[commandName];
        let desc = command.description + '\n\n';
        if (command.aliases)
            desc += `**Alias :** ${command.aliases.join(', ')}\n\n`;
        desc += '**Format**\n```\n' + prefix + command.format + '```';
        embed.addField(commandName, desc, false);
    }
    return embed;
}
exports.default = helpCommand;
//# sourceMappingURL=commands.js.map