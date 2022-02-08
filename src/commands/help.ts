import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { Command } from "../interfaces/command";

export const help: Command = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Hilfe für den Bot."),
  run: async (interaction) => {
    await interaction.deferReply();

    const helpEmbed = new MessageEmbed();
    helpEmbed.setTitle("CroBot hilfe");
    helpEmbed.setDescription(
      "Ein bot von Crovax zur verfügung gestellt. Zur Zeit dafür da seinen 100 Days of Code Fortschritt zu tracken."
    );
    helpEmbed.addField(
      "Den heutigen Eintrag erstellen",
      "Mit /100 kannst du die Challange beginnen oder den Eintrag für den Tag erstellen."
    );
    helpEmbed.addField(
      "Einen Eintrag bearbeiten",
      "Mit /edit kannst du einen vorherigen Eintrag bearbeiten. /edit Braucht 2 Einträge, die Nachrichten ID und einen neuen Eintrag für den Tag. Stelle sicher, das du diesen Befehl im gleichen Channel wie zuvor ausführst. Mit einem Rechtklick und ID Kopieren auf dem vorherigen Eintrag kannst du die benötigte ID bekommen."
    );
    helpEmbed.addField(
      "Deinen Fortschritt ansehen",
      "Mit /viewstats kannst du deinen Aktuellen Fortschritt der 100DoC ansehen."
    );
    helpEmbed.addField("Hilfe", "Mit /hilfe erhälst du Hilfe.");
    await interaction.editReply({ embeds: [helpEmbed] });
  },
};
