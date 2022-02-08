import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedAuthorData, MessageEmbed } from "discord.js";
import { Command } from "../interfaces/command";
import { getCamperData } from "../modules/getCamperData";

export const viewStats: Command = {
  data: new SlashCommandBuilder()
    .setName("viewstats")
    .setDescription("Deinen Fortschritt der 100DaysOfCode Challenge ansehen"),
  run: async (interaction) => {
    await interaction.deferReply();
    const { user } = interaction;
    const targetCamper = await getCamperData(user.id);

    if (!targetCamper.day) {
      await interaction.editReply({
        content:
          "Du hast noch nicht mit der #100DaysOfCode Challenge gestartet. Du kannst mit dem Befehl /100 starten.",
      });
      return;
    }
    const viewEmbed = new MessageEmbed();
    const authorData: EmbedAuthorData = {
      name: user.tag,
      iconURL: user.displayAvatarURL(),
    };

    viewEmbed.setTitle("Mein 100DoC Fortschritt");
    viewEmbed.setDescription(
      "Das letzte mal habe ich am " +
        new Date(targetCamper.timestamp).toLocaleDateString() +
        " gepostet."
    );
    viewEmbed.addField("Round", targetCamper.round.toString());
    viewEmbed.addField("Day", targetCamper.day.toString());
    viewEmbed.setAuthor(authorData);
    await interaction.editReply({ embeds: [viewEmbed] });
  },
};
