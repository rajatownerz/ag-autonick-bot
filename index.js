const {
  Client,
  GatewayIntentBits,
  PermissionsBitField
} = require("discord.js");

require("dotenv").config();
const unidecode = require("unidecode");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

client.once("ready", () => {
  console.log(`${client.user.tag} Online`);
});

function cleanName(name) {
  // Stylish fonts ko normal letters me convert karega
  name = unidecode(name);

  // Emojis aur special characters hata dega
  name = name.replace(/[^a-zA-Z0-9 ]/g, "");

  // Extra spaces hatao
  name = name.replace(/\s+/g, " ").trim();

  // CAPITAL letters
  name = name.toUpperCase();

  return name;
}

client.on("guildMemberAdd", async (member) => {
  try {
    if (
      !member.guild.members.me.permissions.has(
        PermissionsBitField.Flags.ManageNicknames
      )
    ) {
      return;
    }

    const originalName =
      member.user.globalName ||
      member.user.username;

    const finalName = `AG ${cleanName(originalName)}`;

    await member.setNickname(finalName);

    console.log(`${originalName} -> ${finalName}`);
  } catch (err) {
    console.error(err);
  }
});

client.login(process.env.BOT_TOKEN);
