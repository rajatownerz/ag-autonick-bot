const {
  Client,
  GatewayIntentBits,
  PermissionsBitField
} = require("discord.js");

require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

client.once("ready", () => {
  console.log(`${client.user.tag} is Online!`);
});

function cleanName(name) {
  if (!name) return "";

  return name
    .normalize("NFKC")
    .replace(/[\u{1F300}-\u{1FAFF}]/gu, "") // Emojis remove
    .replace(/[^\p{L}\p{N}\s]/gu, "")       // Special chars remove
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
}

client.on("guildMemberAdd", async (member) => {
  try {
    const me = member.guild.members.me;

    if (
      !me.permissions.has(PermissionsBitField.Flags.ManageNicknames)
    ) {
      console.log("Manage Nicknames permission missing.");
      return;
    }

    const sourceName =
      member.user.globalName ||
      member.user.username;

    const finalName = cleanName(sourceName);

    if (finalName.length > 0) {
      await member.setNickname(`AG ${finalName}`);
      console.log(`Nickname changed: AG ${finalName}`);
    }

  } catch (err) {
    console.error(err);
  }
});

client.login(process.env.BOT_TOKEN);
