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

    "𝐚":"A","𝐛":"B","𝐜":"C","𝐝":"D","𝐞":"E","𝐟":"F",
    "𝐠":"G","𝐡":"H","𝐢":"I","𝐣":"J","𝐤":"K","𝐥":"L",
    "𝐦":"M","𝐧":"N","𝐨":"O","𝐩":"P","𝐪":"Q","𝐫":"R",
    "𝐬":"S","𝐭":"T","𝐮":"U","𝐯":"V","𝐰":"W","𝐱":"X",
    "𝐲":"Y","𝐳":"Z"
  };

  return name
    .split("")
    .map(c => fancyMap[c] || c)
    .join("")
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .trim()
    .toUpperCase();
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

      // Sirf Discord display name lega, username nahi
      let name = cleanName(member.displayName);

      // Agar naam khali ho to default
      if (!name) {
        name = "MEMBER";
      }

      await member.setNickname(`AG ${name.substring(0, 25)}`);

      console.log(`Nickname changed for ${member.user.tag}`);
    }

  } catch (err) {
    console.error(err);
  }
});

client.login(process.env.BOT_TOKEN);
