import { Client, Intents, Message } from 'discord.js';
import config from './config';
import helpCommand from './commands';
import express from 'express';

const { intents, prefix, token } = config;

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    ...intents // Add other intents from your config
  ],
  presence: {
    activities: [
      {
        type: 'STREAMING',
        name: 'Earthians',
        url: 'https://www.youtube.com/watch?v=cp8UEv8i0lc'
      }
    ]
  }
});

const app = express();

app.get('/', (_req, res) => {
  res.send('Halo, ini adalah tampilan web!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server web berjalan di port ${PORT}`);
});

client.on('ready', () => {
  console.log(`Terhubung sebagai: ${client.user?.tag}`);
});

client.on('guildMemberAdd', (member) => {
  const welcomeChannelId = '1131765376326312007'; // Replace with the actual channel ID
  const welcomeChannel = member.guild.channels.cache.get(welcomeChannelId);
  if (welcomeChannel?.isText()) {
    welcomeChannel.send(`Selamat datang di Earthians, ${member}!`);
  }
});

client.on('guildMemberBoost', (member) => {
  const thankYouChannelId = '1132151459065106492'; // Replace with the actual channel ID
  const thankYouChannel = member.guild.channels.cache.get(thankYouChannelId);
  if (thankYouChannel?.isText()) {
    thankYouChannel.send(`Terima kasih atas boost server, ${member}!`);
  }
});

client.on('messageCreate', async (message: Message) => {
  if (message.author.bot) return;

  const content = message.content.toLowerCase();

  if (content.includes('halo')) {
    message.channel.send(`Hai ${message.author}, ada yang bisa dibantu?`);
  } else if (content.includes('chitanda eru')) {
    message.channel.send('Manggil aku?');
  } else if (content.includes('iya')) {
    message.channel.send('Iyain aja');
  } else if (content.includes('pagi')) {
    message.channel.send(`Pagi juga, ${message.author}!`);
  } else if (content.includes('siang')) {
    message.channel.send(`Siang juga, ${message.author}!`);
  } else if (content.includes('sore')) {
    message.channel.send(`Sore juga, ${message.author}!`);
  } else if (content.includes('malam')) {
    message.channel.send(`Malam juga, ${message.author}!`);
  }

  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift();

    switch (command) {
      case 'ping':
        const msg = await message.reply('Pinging...');
        await msg.edit(`Ping kamu adalah ${Date.now() - msg.createdTimestamp}ms.`);
        break;

      case 'say':
      case 'repeat':
        if (args.length > 0) await message.channel.send(args.join(' '));
        else await message.reply('Anda tidak mengirim pesan untuk diulang, membatalkan perintah.');
        break;

      case 'help':
        const embed = helpCommand(message);
        embed.setThumbnail(client.user?.displayAvatarURL() || '');
        await message.channel.send({ embeds: [embed] });
        break;
    }
  }
});

client.login(token);
