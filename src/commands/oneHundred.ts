import { Command } from "../interfaces/command";
import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedAuthorData, EmbedFooterData, Interaction } from "discord.js";
import { getCamperData } from "../modules/getCamperData";
import { updateCamperData } from "../modules/updateCamperData";
import { MessageEmbed } from "discord.js";

export const oneHundred: Command = {
  data: new SlashCommandBuilder()
    .setName("100")
    .setDescription("Für die 100 Days of Code Challenge anmelden.")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("Beschreibung für das heutig gelernte.")
        .setRequired(true)
    ),

  run: async (interaction) => {
    await interaction.deferReply();
    const { user } = interaction;
    const text = interaction.options.getString("message", true);

    const targetCamper = await getCamperData(user.id);
    const updatedCamper = await updateCamperData(targetCamper);

    const oneHundredEmbed = new MessageEmbed();

    const authorData: EmbedAuthorData = {
      name: user.tag,
      iconURL: user.displayAvatarURL(),
    };

    const footerData: EmbedFooterData = {
      text:
        "Day completed: " +
        new Date(updatedCamper.timestamp).toLocaleDateString(),
    };

    oneHundredEmbed.setTitle("100 Days of Code");
    oneHundredEmbed.setDescription(text);
    oneHundredEmbed.setAuthor(authorData);
    oneHundredEmbed.addField("Round", updatedCamper.round.toString(), true);
    oneHundredEmbed.addField("Day", updatedCamper.day.toString(), true);
    oneHundredEmbed.setFooter(footerData);
    await interaction.editReply({ embeds: [oneHundredEmbed] });
  },
};
