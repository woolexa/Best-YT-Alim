// Discord
const { PermissionsBitField, EmbedBuilder, ButtonStyle, Client, GatewayIntentBits, StringSelectMenuBuilder, ChannelType, Partials, ActionRowBuilder, SelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType, SelectMenuInteraction, ButtonBuilder, AuditLogEvent } = require("discord.js");
// İNTENTS
const client = new Client({ intents: Object.values(GatewayIntentBits), shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember] });
const PARTIALS = Object.values(Partials);
const Discord = require("discord.js")
const { join } = require('path');
const config = require("./config.json");
//Database\\
const db = require("croxydb")
const fs = require("fs")

//Slash Commands Register\\

global.client = client;
client.commands = (global.commands = []);
const { readdirSync } = require("fs")
const { TOKEN } = require("./config.json");
readdirSync('./commands').forEach(f => {
    if (!f.endsWith(".js")) return;

    const props = require(`./commands/${f}`);

    if(props.type == 2 || props.type == 3) {
        client.commands.push({
                name: props.name.toLowerCase(),
                type: props.type
        })
        
        } else {
        client.commands.push({
                name: props.name.toLowerCase(),
                description: props.description,
                options: props.options,
                dm_permission: false,
                type: props.type || 1
            });
        }

    console.log(`[Command] ${props.name} komutu yüklendi.`)

});

readdirSync('./events').forEach(e => {

    const eve = require(`./events/${e}`);
    const name = e.split(".")[0];

    client.on(name, (...args) => {
        eve(client, ...args)
    });
    console.log(`[EVENT] ${name} eventi yüklendi.`)
});


client.login(TOKEN)

//This a Created By Woolexa

const soru = require("./sorular.js");

client.on("interactionCreate", async (i) => {

  const modal = new ModalBuilder()
  .setCustomId('ybasvuru')
  .setTitle('Woolexa Yetkili Başvuru Sistemi')
  .setComponents(
    new ActionRowBuilder()
      .setComponents(
        new TextInputBuilder()
        .setCustomId("soru1")
        .setLabel(`${soru.soru1}`)
        .setStyle(1)
        .setMinLength(3)
        .setMaxLength(20)
        .setPlaceholder(`${soru.örnekcevap1}`)
        .setRequired(true),
      ),
    new ActionRowBuilder()
      .setComponents(
        new TextInputBuilder()
        .setCustomId("soru2")
        .setLabel(`${soru.soru2}`)
        .setStyle(1)
        .setMinLength(2)
        .setMaxLength(3)
        .setPlaceholder(`${soru.örnekcevap2}`)
        .setRequired(true)
      ),
    new ActionRowBuilder()
      .setComponents(
        new TextInputBuilder()
        .setCustomId("soru3")
        .setLabel(`${soru.soru3}`)
        .setStyle(1)
        .setMinLength(4)
        .setMaxLength(75)
        .setPlaceholder(`${soru.örnekcevap3}`)
        .setRequired(true)
      ),
    new ActionRowBuilder()
      .setComponents(
        new TextInputBuilder()
        .setCustomId("soru4")
        .setLabel(`${soru.soru4}`)
        .setStyle(1)
        .setMinLength(1)
        .setMaxLength(2)
        .setPlaceholder(`${soru.örnekcevap4}`)
        .setRequired(true)
      ),
      new ActionRowBuilder()
      .setComponents(
        new TextInputBuilder()
        .setCustomId("soru5")
        .setLabel(`${soru.soru5}`)
        .setStyle(1)
        .setMinLength(4)
        .setMaxLength(30)
        .setPlaceholder(`${soru.örnekcevap5}`)
        .setRequired(true)
      ),  
  )
  if (i.customId === "woolexayetkilibasvur") {
      i.showModal(modal)
      db.set(`basvuruadam31_${i.guild.id}`, { user: i.user.id })
  }

  if (i.customId === "ybasvuru") {

      const kabulet = new ButtonBuilder()
      .setCustomId("soruladevamke")
      .setLabel("Onaylıyorum")
      .setStyle(3)
      .setEmoji("✅")     

      const row4 = new ActionRowBuilder()
      .addComponents(kabulet)

      const onyalmıyorum = new ButtonBuilder()
      .setCustomId("onaylamıyorusss")
      .setLabel("Onaylıyorum")
      .setStyle(4)
      .setEmoji("⛔")     

      const row5 = new ActionRowBuilder()
      .addComponents(onyalmıyorum)

      
      const soru1 = i.fields.getTextInputValue("soru1");
      const soru2 = i.fields.getTextInputValue("soru2");
      const soru3 = i.fields.getTextInputValue("soru3");
      const soru4 = i.fields.getTextInputValue("soru4");
      const soru5 = i.fields.getTextInputValue("soru5");

      const titan = new EmbedBuilder()
      .setColor("Random")
      .setAuthor({ name: `Woolexa Yetkili Başvuru`})
      .setThumbnail(`${i.user.displayAvatarURL()}`)
      .setDescription(`\`\`\`ansi\n[2;35m[2;33m${soru.soru1}[0m[2;35m[0m\`\`\`\n\`\`\`ansi\n[2;35m[2;33m[2;35m${soru1}[0m[2;33m[0m[2;35m[0m\`\`\`\n\`\`\`ansi\n[2;35m[2;33m${soru.soru2}[0m[2;35m[0m\`\`\`\n\`\`\`ansi\n[2;35m[2;33m[2;35m${soru2}[0m[2;33m[0m[2;35m[0m\`\`\`\n\`\`\`ansi\n[2;35m[2;33m${soru.soru3}[0m[2;35m[0m\`\`\`\n\`\`\`ansi\n[2;35m[2;33m[2;35m${soru3}[0m[2;33m[0m[2;35m[0m\`\`\`\n\`\`\`ansi\n[2;35m[2;33m${soru.soru4}[0m[2;35m[0m\`\`\`\n\`\`\`ansi\n[2;35m[2;33m[2;35m${soru4}[0m[2;33m[0m[2;35m[0m\`\`\`\n\`\`\`ansi\n[2;35m[2;33m${soru.soru5}[0m[2;35m[0m\`\`\`\n\`\`\`ansi\n[2;35m[2;33m[2;35m${soru5}[0m[2;33m[0m[2;35m[0m\`\`\`\n`)
      .setTimestamp()

      await i.reply({ content: `${i.user}`, embeds: [titan], components: [row4, row5], ephemeral: true})
      db.set(`sorular_${i.user.id}${i.guild.id}`, { soru1: `${soru.soru1}`, sorucevap1: `${soru1}`, soru2: `${soru.soru2}`, sorucevap2: `${soru2}`, soru3: `${soru.soru3}`, sorucevap3: `${soru3}`, soru4: `${soru.soru4}`, sorucevap4: `${soru4}`, soru5: `${soru.soru5}`, sorucevap5: `${soru5}`, })
  }

    const modal3 = new ModalBuilder()
    .setCustomId('ybasvuru2')
    .setTitle('Woolexa Yetkili Başvuru Sistemi')
    .setComponents(
      new ActionRowBuilder()
        .setComponents(
          new TextInputBuilder()
          .setCustomId("soru6")
          .setLabel(`${soru.soru6}`)
          .setStyle(2)
          .setMinLength(1)
          .setMaxLength(4000)
          .setPlaceholder(`${soru.örnekcevap6}`)
          .setRequired(true),
        ),
      new ActionRowBuilder()
        .setComponents(
          new TextInputBuilder()
          .setCustomId("soru7")
          .setLabel(`${soru.soru7}`)
          .setStyle(2)
          .setMinLength(1)
          .setMaxLength(4000)
          .setPlaceholder(`${soru.örnekcevap7}`)
          .setRequired(true)
        ),  
    )
    if (i.customId === "soruladevamke") {
        i.showModal(modal3)
    }
    let message ;
    let logKanalı = client.channels.cache.get(config.LOGKANNALI)
  
    if (i.customId === "ybasvuru2") {

      const kabulet2 = new ButtonBuilder()
      .setCustomId("soruladevamke")
      .setLabel("Başvurunuz Elimize Ulaştı")
      .setStyle(3)
      .setEmoji("✅") 
      .setDisabled(true)    

      const row5 = new ActionRowBuilder()
      .addComponents(kabulet2)

      i.update({ components: [row5]})
  
      const kabulet = new ButtonBuilder()
      .setCustomId("basvuru_kabul")
      .setLabel("Kabul Et")
      .setStyle(3)
      .setEmoji("✅")
  
      const reddet = new ButtonBuilder()
      .setCustomId("basvuru_red")
      .setLabel("Reddet")
      .setStyle(1)
      .setEmoji("❌")
  
      const blacklist = new ButtonBuilder()
      .setCustomId("blacklist")
      .setLabel("BlackList")
      .setStyle(1)
      .setEmoji("🥊")      
  
      const row4 = new ActionRowBuilder()
      .addComponents(kabulet,reddet,blacklist)


      const chnl = db.fetch(`basvuruadam31_${i.guild.id}`);
      const x = chnl.user;
  
      const sor = db.fetch(`sorular_${x}${i.guild.id}`);
        
        const soru1 = sor.sorucevap1
        const soru2 = sor.sorucevap2
        const soru3 = sor.sorucevap3
        const soru4 = sor.sorucevap4
        const soru5 = sor.sorucevap5
        const soru6 = i.fields.getTextInputValue("soru6");
        const soru7 = i.fields.getTextInputValue("soru7");
  
        const woolexatitan = new EmbedBuilder()
        .setColor("Random")
        .setAuthor({ name: `Woolexa Yetkili Başvuru`})
        .setThumbnail(`${i.user.displayAvatarURL()}`)
        .setDescription(`# **${i.user.tag}** **-** (\`${i.user.id}\`)\n# **Kullanıcısının Başvuru Formu**\n\`\`\`ansi\n[2;35m[2;33m${soru.soru1}[0m[2;35m[0m\`\`\`\n\`\`\`ansi\n[2;35m[2;33m[2;35m${soru1}[0m[2;33m[0m[2;35m[0m\`\`\`\n\`\`\`ansi\n[2;35m[2;33m${soru.soru2}[0m[2;35m[0m\`\`\`\n\`\`\`ansi\n[2;35m[2;33m[2;35m${soru2}[0m[2;33m[0m[2;35m[0m\`\`\`\n\`\`\`ansi\n[2;35m[2;33m${soru.soru3}[0m[2;35m[0m\`\`\`\n\`\`\`ansi\n[2;35m[2;33m[2;35m${soru3}[0m[2;33m[0m[2;35m[0m\`\`\`\n\`\`\`ansi\n[2;35m[2;33m${soru.soru4}[0m[2;35m[0m\`\`\`\n\`\`\`ansi\n[2;35m[2;33m[2;35m${soru4}[0m[2;33m[0m[2;35m[0m\`\`\`\n\`\`\`ansi\n[2;35m[2;33m${soru.soru5}[0m[2;35m[0m\`\`\`\n\`\`\`ansi\n[2;35m[2;33m[2;35m${soru5}[0m[2;33m[0m[2;35m[0m\`\`\`\n\`\`\`ansi\n[2;35m[2;33m${soru.soru6}[0m[2;35m[0m\`\`\`\n\`\`\`ansi\n[2;35m[2;33m[2;35m${soru6}[0m[2;33m[0m[2;35m[0m\`\`\`\n\`\`\`ansi\n[2;35m[2;33m${soru.soru7}[0m[2;35m[0m\`\`\`\n\`\`\`ansi\n[2;35m[2;33m[2;35m${soru7}[0m[2;33m[0m[2;35m[0m\`\`\``)
        .setTimestamp()
        message = await logKanalı.send({ content: `${i.user}`, embeds: [woolexatitan], components: [row4]})
        db.delete(`basvuruadam31_${i.guild.id}`);
        db.delete(`sorular_${x}${i.guild.id}`);
        db.set(message.id,i.user.id)
  }

  const basvuruDurum = client.channels.cache.get(config.BASVURUKONTROL)

  if (i.customId === "basvuru_kabul") {

    if(!i.member.roles.cache.get(config.basvuruokuyucu) && !i.member.permissions.has(PermissionsBitField.Flags.Administrator)) return i.reply({ content: `Başvuruyu yanıtlamak için <@&${config.basvuruokuyucu}> rolüne sahip olmalısın`, ephemeral: true });

      const kabulet2 = new ButtonBuilder()
      .setCustomId("basvuru_kabul")
      .setLabel("Kabul Edildi")
      .setStyle(3)
      .setEmoji("✅")
      .setDisabled(true)


      const row5 = new ActionRowBuilder()
      .addComponents(kabulet2)

      i.update({ components: [row5]})
      let kişi = db.get(i.message.id)
      let kullanıcı = i.client.guilds.cache.get(config.GUİLD).members.cache.get(kişi) 
      kullanıcı.roles.add(config.yetkilirolü)
      await basvuruDurum.send({ content: `<@${kişi}> Katılım başvurunuz onaylanmıştır.`})
      kullanıcı.user.send(`Katılım Başvurun Başarıyla **Onaylanmıştır**`).catch(() => {}).then(x => setTimeout(() => x.delete(), 180000));
      db.delete(i.message.id)
  } 
  if (i.customId === "basvuru_red") {

    if(!i.member.roles.cache.get(config.basvuruokuyucu) && !i.member.permissions.has(PermissionsBitField.Flags.Administrator)) return i.reply({ content: `Başvuruyu yanıtlamak için <@&${config.basvuruokuyucu}> rolüne sahip olmalısın`, ephemeral: true });

      let kişi = db.get(i.message.id)
      let kullanıcı = i.client.guilds.cache.get(config.GUİLD).members.cache.get(kişi)

      const reddet2 = new ButtonBuilder()
      .setCustomId("başvuru_red")
      .setLabel("Reddedildi")
      .setStyle(1)
      .setEmoji("❌")
      .setDisabled(true)

      const row6 = new ActionRowBuilder()
      .addComponents(reddet2)
      await basvuruDurum.send({ content: `<@${kişi}>, Maalesef ! Başvurunuz **kabul edilmedi** onaylanmadı.\n**Sizi onaylamayan kişi: **${i.user.toString()}`})
      i.update({ components: [row6]})
      kullanıcı.user.send(`Maalef katılım başvurun reddedilmiştir! \n**Sizi onaylamayan kişi: **${i.user.toString()}`).catch(() => {}).then(x => setTimeout(() => x.delete(), 180000));
      db.delete(i.message.id)
  }

  if (i.customId === "blacklist") {

    if(!i.member.roles.cache.get(config.basvuruokuyucu) && !i.member.permissions.has(PermissionsBitField.Flags.Administrator)) return i.reply({ content: `Başvuruyu yanıtlamak için <@&${config.basvuruokuyucu}> rolüne sahip olmalısın`, ephemeral: true });

    let kişi = db.get(i.message.id)
    let kullanıcı = i.client.guilds.cache.get(config.GUİLD).members.cache.get(kişi)

    const blacklist2 = new ButtonBuilder()
    .setCustomId("blacklist")
    .setLabel("Mapus")
    .setStyle(3)
    .setEmoji("🥊")
    .setDisabled(true)


    const row5 = new ActionRowBuilder()
    .addComponents(blacklist2)

    i.update({ components: [row5]})
    kullanıcı.roles.add(config.blacklistrol)
    await basvuruDurum.send({ content: `<@${kişi}> BlackList rolünü almaya hak kazanmıştır!`})
    kullanıcı.user.send(`Sunucumuzda **BlackList** rolü almaya hak kazandın kendine dikkat et!`).catch(() => {}).then(x => setTimeout(() => x.delete(), 180000));
    db.delete(i.message.id)
 }

 if (i.customId === "onaylamıyorusss") {

  const chnl = db.fetch(`basvuruadam31_${i.guild.id}`);
  const x = chnl.user;

  const titan = new EmbedBuilder()
  .setColor("Random")
  .setAuthor({ name: `Woolexa Yetkili Başvuru`})
  .setThumbnail(`${i.user.displayAvatarURL()}`)
  .setDescription(`Başvuru iptal edildi bu mesajı silebilirsiiz!`)
  .setTimestamp()

  const onyalmıyorum = new ButtonBuilder()
  .setCustomId("onaylamıyorusss")
  .setLabel("Onaylıyorum")
  .setStyle(4)
  .setDisabled(true)
  .setEmoji("⛔")     

  const row5 = new ActionRowBuilder()
  .addComponents(onyalmıyorum)

  db.delete(`basvuruadam31_${i.guild.id}`);
  db.delete(`sorular_${x}${i.guild.id}`);
  

  i.update({ components: [row5]})
 }
});