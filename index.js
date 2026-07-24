client.on("guildMemberUpdate", async (oldMember, newMember) => {
  try {
    const me = newMember.guild.members.me;

    if (!me.permissions.has(PermissionsBitField.Flags.ManageNicknames)) return;

    const sourceName =
      newMember.user.globalName ||
      newMember.user.username;

    const finalName = cleanName(sourceName);

    if (newMember.nickname !== `AG ${finalName}`) {
      await newMember.setNickname(`AG ${finalName}`);
    }
  } catch (err) {
    console.error(err);
  }
});
