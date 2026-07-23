const { Client, GatewayIntentBits, PermissionsBitField } = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("guildMemberAdd", async (member) => {
  try {
    if (
      member.guild.members.me.permissions.has(
        PermissionsBitField.Flags.ManageNicknames
      )
    ) {

      let name = member.displayName;

      // Emoji aur fancy symbols remove karega
      name = name.replace(/[^\p{L}\p{N} ]/gu, "");

      // Agar naam bahut lamba ho
      name = name.substring(0, 25).trim();

      await member.setNickname(`AG ${name}`);

      console.log(`Nickname changed: ${member.user.tag}`);
    }

  } catch (err) {
    console.error(err);
  }
});

client.login(process.env.BOT_TOKEN);
