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

  name = name.normalize("NFKC");

  // Emojis aur special symbols hatao
  name = name.replace(/[^A-Za-z0-9]/g, "");

  // CAPITAL letters
  name = name.toUpperCase();

  return name;
}

// New Member Join
client.on("guildMemberAdd", async (member) => {
  try {
    const me = member.guild.members.me;

    if (!me.permissions.has(PermissionsBitField.Flags.ManageNicknames)) {
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

// Member Update
client.on("guildMemberUpdate", async (oldMember, newMember) => {
  try {
    const me = newMember.guild.members.me;

    if (!me.permissions.has(PermissionsBitField.Flags.ManageNicknames)) {
      return;
    }

    const sourceName =
      newMember.user.globalName ||
      newMember.user.username;

    const finalName = cleanName(sourceName);

    if (newMember.nickname !== `AG ${finalName}`) {
      await newMember.setNickname(`AG ${finalName}`);
      console.log(`Nickname Updated: AG ${finalName}`);
    }
  } catch (err) {
    console.error(err);
  }
});

client.login(process.env.BOT_TOKEN);
