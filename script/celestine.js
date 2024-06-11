const axios = require('axios');

module.exports["config"] = {
  name: "celestine",
  version: "1.0.0",
  hasPermission: 0,
  credits: "ai", //api by jerome
  description: "Gpt architecture",
  usePrefix: false,
  commandCategory: "GPT4",
  cooldowns: 5,
};

module.exports["run"] = async ({ api, event, args }) => {
  try {
    const { messageID, messageReply } = event;
    let input = args.join(' ');

    if (messageReply) {
      const repliedMessage = messageReply.body;
      prompt = `${repliedMessage} ${prompt}`;
    }

    if (!input) {
      return api.sendMessage('𝗣𝗹𝗲𝗮𝘀𝗲 𝗽𝗿𝗼𝘃𝗶𝗱𝗲 𝗮 𝗺𝗲𝘀𝘀𝗮𝗴𝗲', event.threadID, messageID);
    }
    api.sendMessage('🕧 | 𝗖𝗲𝗹𝗲𝘀𝘁𝗶𝗻𝗲 𝗶𝘀 𝘁𝘆𝗽𝗶𝗻𝗴...', event.threadID);

    // Delay
    await new Promise(resolve => setTimeout(resolve, 2000)); // Adjust the delay time as needed

    const prompt = `Act like a very horny girlfriend named celestine, you always flirts men's, you talk in english or tagalog. user asked: ${input}`;

    const gpt4_api = `https://gpt4withcustommodel.onrender.com/gpt?query=${encodeURIComponent(prompt)}&model=gpt-3.5-turbo-16k-0613`;

    const response = await axios.get(gpt4_api);

    if (response.data && response.data.response) {
      const generatedText = response.data.response;

      // Ai Answer Here
      api.sendMessage(`𝐂𝐄𝐋𝐄𝐒𝐓𝐈𝐍𝐄\n━━━━━━━━━━━━━━━━━━\n${generatedText}\n𝗰𝗿𝗲𝗱𝗶𝘁𝘀: "https://www.facebook.com/jasrelking17" \n━━━━━━━━━━━━━━━━━━`, event.threadID, messageID);
    } else {
      console.error('API response did not contain expected data:', response.data);
      api.sendMessage(`❌ An error occurred while generating the text response. Please try again later. Response data: ${JSON.stringify(response.data)}`, event.threadID, messageID);
    }
  } catch (error) {
    api.sendMessage(`❌ An error occurred while generating the text response. Please try again later. Error details: ${error.message}`, event.threadID, event.messageID);
  }
};
