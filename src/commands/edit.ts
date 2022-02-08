import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../interfaces/command";

export const edit: Command = {
  data: new SlashCommandBuilder()
    .setName("edit")
    .setDescription("Einen vorherigen Eintrag bearbeiten")
    .addStringOption((option) =>
      option
        .setName("embed-id")
        .setDescription("ID der zu editierenden Nachricht.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("Beschreibung für das heutig gelernte.")
        .setRequired(true)
    ),
  run: async (interaction) => {
    await interaction.deferReply();
    const { channel, user } = interaction;
    const targetId = interaction.options.getString("embed-id", true);
    const text = interaction.options.getString("message", true);

    if (!channel) {
      await interaction.editReply({
        content: "Fehlender channel parameter.",
      });
      return;
    }
    const targetMessage = await channel.messages
      .fetch(targetId)
      .catch((error) => {});

    if (!targetMessage) {
      await interaction.editReply({
        content:
          "Dies scheint keine gültige Nachrichten ID zu sein, versuche diesen Befehl, im gleichen channel in dem die die Nachricht zuvor ausgeführt wurde.",
      });
      return;
    }

    const targetEmbed = targetMessage.embeds[0];
    if (targetEmbed.author?.name !== user.tag) {
      await interaction.editReply({
        content: "Dieser Text gehört nicht dir, Du kannst ihn nicht Editieren.",
      });
    }
    targetEmbed.setDescription(text);
    await targetMessage.edit({ embeds: [targetEmbed] });
    await interaction.editReply({ content: "Updated!" });
  },
};
