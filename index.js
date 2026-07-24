const {
  Client,
  GatewayIntentBits,
  PermissionsBitField,
} = require("discord.js");

require("dotenv").config();
const unidecode = require("unidecode");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

function cleanName(name) {
  // Stylish Unicode → Normal
  let cleaned = unidecode(name);

  // Sirf English letters aur numbers rakho
  cleaned = cleaned.replace(/[^a-zA-Z0-9 ]/g, "");

  // Extra spaces hatao
  cleaned = cleaned.replace(/\s+/g, " ").trim();

  // Uppercase
  cleaned = cleaned.toUpperCase();

  if (!cleaned) cleaned = "USER";

  return cleaned;
}

client.on("guildMemberAdd", async (member) => {
  try {
    if (
      !member.guild.members.me.permissions.has(
        PermissionsBitField.Flags.ManageNicknames
      )
    ) {
      console.log("❌ Manage Nicknames permission missing.");
      return;
    }

    // Display Name ya Username
    const original =
      member.displayName || member.user.globalName || member.user.username;

    const finalName = `AG ${cleanName(original)}`;

    await member.setNickname(finalName);

    console.log(`✅ ${original} → ${finalName}`);
  } catch (err) {
    console.error("Nickname Error:", err);
  }
});

client.login(process.env.BOT_TOKEN);
