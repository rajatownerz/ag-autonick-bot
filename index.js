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
    .replace(/[\u{1F300}-\u{1FAFF}]/gu, "")
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
}

// Join hone par
client.on("guildMemberAdd", async (member) => {
  try {
    const me = member.guild.members.me;

    if (!me.permissions.has(PermissionsBitField.Flags.ManageNicknames)) {
      return;
    }

    const sourceName =
      member.user.globalName ||
      member.user.username;

    const finalName = `AG ${cleanName(sourceName)}`;

    await member.setNickname(finalName);

    console.log(`Joined -> ${finalName}`);
  } catch (err) {
    console.error(err);
  }
});

// Member update hone par
client.on("guildMemberUpdate", async (oldMember, newMember) => {
  try {
    const me = newMember.guild.members.me;

    if (!me.permissions.has(PermissionsBitField.Flags.ManageNicknames)) {
      return;
    }

    const sourceName =
      newMember.user.globalName ||
      newMember.user.username;

    const finalName = `AG ${cleanName(sourceName)}`;

    if (newMember.nickname !== finalName) {
      await newMember.setNickname(finalName);
      console.log(`Updated -> ${finalName}`);
    }
  } catch (err) {
    console.error(err);
  }
});

client.login(process.env.BOT_TOKEN);
