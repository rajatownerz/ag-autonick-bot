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

      // Fancy Unicode letters ko normal letters me convert karne ki koshish
      name = name.normalize("NFKD");

      // Sirf normal A-Z, a-z, 0-9 rakhega
      name = name.replace(/[^a-zA-Z0-9 ]/g, "");

      // Extra spaces remove
      name = name.trim();

      // Agar naam khali ho gaya
      if (!name) {
        name = member.user.username;
      }

      // Nickname set
      await member.setNickname(`AG ${name.substring(0, 25)}`);

      console.log(`Nickname changed: ${member.user.tag}`);

    }
  } catch (err) {
    console.error(err);
  }
});

client.login(process.env.BOT_TOKEN);
