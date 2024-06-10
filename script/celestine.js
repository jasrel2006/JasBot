const { Hercai } = require("hercai");

module.exports = {
  config: {
    name: "celestine",
    version: "1.0.0",
    description: "Talk to celestineAI",
    usage: "{pn} [message]",
    author: "Rui X Akhiro",
    cooldown: 5,
    usePrefix: false,
    role: 0,
  },
  async onRun({ fonts, api, message, args }) {
    const query = args.join(" ");

    if (!query) {
      message.reply("Baby, got anything to say? ");
    } else {
      const herc = new Hercai();
      const info = await message.reply(`Im answering to you lovely question, Please have some patience my love`);

      const response = await herc.question({
        model: "v3",
        content: `Act like a horny girlfriend named celestine, you always flirts men's, you talk in english or tagalog. user asked: ${query}`,
      });
      api.editMessage(
        `${response.reply}`,
        info.messageID,
      );
    }
  },
};
