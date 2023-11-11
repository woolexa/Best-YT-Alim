const { EmbedBuilder, PermissionsBitField, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require("discord.js");
const discord = require("discord.js")

module.exports = {
    name: "yetkili-basvuru",
    description: "Yetkili başvuru EMBED'ını komutu kullandığınız kanala atar",
    type: 1,


    run: async (client, interaction) => {



        const woolexaticketembed = new EmbedBuilder()
        .setColor("LuminousVividPink")
        .setAuthor({name: "Woolexa Yetkili Başvuru Sistemi", iconURL: interaction.guild.iconURL({ dynamic: true })})
        .setDescription("```ansi\n[2;31mSelam sunucuya hoş geldin! Eğer burayı beğendiysen neden yetkili olmak için başvurmuyorsun?[0m\```\n\```ansi\n[2;36mLütfen sunucu kurallarına uyarak formu doldurunuz aksi taktirde ceza alma şansın oldukça yüksek![0m```")
        .setFooter({text: "Developed By Woolexa"})
        .setTimestamp()

        const woolexarow = new ActionRowBuilder()
        .setComponents(
         new ButtonBuilder()
         .setLabel("Yetkili Başvuru")
         .setStyle(discord.ButtonStyle.Primary)
         .setCustomId("woolexayetkilibasvur")
         .setEmoji("1150517077921255556")
        )

         interaction.reply({ embeds: [woolexaticketembed], components: [woolexarow] });

 }
}