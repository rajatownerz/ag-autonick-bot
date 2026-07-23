const { Client, GatewayIntentBits, PermissionsBitField } = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

function cleanName(name) {
  const fancyMap = {
    "𝐀":"A","𝐁":"B","𝐂":"C","𝐃":"D","𝐄":"E","𝐅":"F","𝐆":"G",
    "𝐇":"H","𝐈":"I","𝐉":"J","𝐊":"K","𝐋":"L","𝐌":"M","𝐍":"N",
    "𝐎":"O","𝐏":"P","𝐐":"Q","𝐑":"R","𝐒":"S","𝐓":"T",
    "𝐔":"U","𝐕":"V","𝐖":"W","𝐗":"X","𝐘":"Y","𝐙":"Z",
    "𝐚":"a","𝐛":"b","𝐜":"c","𝐝":"d","𝐞":"e","𝐟":"f",
    "𝐠":"g","𝐡":"h","𝐢":"i","𝐣":"j","𝐤":"k","𝐥":"l",
    "𝐦":"m","𝐧":"n","𝐨":"o","𝐩":"p","𝐪":"q","𝐫":"r",
    "𝐬":"s","𝐭":"t","𝐮":"u","𝐯":"v","𝐰":"w","𝐱":"x",
    "𝐲":"y","𝐳":"z"
  };

  return name
    .split("")
    .map(c => fancyMap[c] || c)
    .join("")
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .trim();
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

      let name = cleanName(member.displayName);

      if (!name) name = member.user.username;

      await member.setNickname(`AG ${name}`);

      console.log(`Nickname changed: ${member.user.tag}`);
    }

  } catch (err) {
    console.error(err);
  }
});

client.login(process.env.BOT_TOKEN);
