const { Client, GatewayIntentBits, PermissionsBitField } = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

function cleanName(name) {
  // Fancy letters ko normal letters me convert karega
  name = name.normalize("NFKD");

  // Sirf letters aur space rakhega
  name = name.replace(/[^\p{L}\p{N} ]/gu, "");

  // Extra space remove
  name = name.trim();

  // Capital me karega
  return name.toUpperCase();
}

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

      // ONLY SERVER DISPLAY NAME
      let name = cleanName(member.displayName);

      if (!name) {
        name = "MEMBER";
      }

      await member.setNickname(`AG ${name}`);

      console.log(`Nickname changed: AG ${name}`);
    }

  } catch (error) {
    console.error(error);
  }
});

client.login(process.env.BOT_TOKEN);
