const { Client, GatewayIntentBits, PermissionsBitField } = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ],
});

function cleanName(name) {
  if (!name) return "MEMBER";

  return name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N} ]/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
}

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("guildMemberAdd", async (member) => {
  try {
    const me = member.guild.members.me;

    if (!me.permissions.has(PermissionsBitField.Flags.ManageNicknames)) {
      return;
    }

    // Display Name ko priority do
    const sourceName = member.user.globalName || member.displayName;

    const finalName = cleanName(sourceName);

    await member.setNickname(`AG ${finalName}`);

    console.log(`Nickname set: AG ${finalName}`);
  } catch (err) {
    console.error(err);
  }
});

client.login(process.env.BOT_TOKEN);
