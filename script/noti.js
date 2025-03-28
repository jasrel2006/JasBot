module.exports.config = {
    name: "sendnoti",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "Yan Maglinte",
    description: "Sends a message to all groups and can only be done by the admin.",
    usePrefix: true,
    commandCategory: "noti",
    usages: "[Text]",
    cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
    // Replace 'your_developer_uid' with the actual UID of the developer who should have access
    const allowedUID = ['100078489093765']; 

    // Check if the user sending the command is the developer
    if (!allowedUID.includes(event.senderID)) {
        return api.sendMessage("› Sorry pero dika si jasrel.", event.threadID);
    }

    const threadList = await api.getThreadList(25, null, ['INBOX']);
    let sentCount = 0;
    const custom = args.join(' ');

    async function sendMessage(thread) {
        try {
            await api.sendMessage(`𝖭𝖮𝖳𝖨 𝖥𝖱𝖮𝖬 𝗝𝗔𝗦𝗥𝗘𝗟\n ----------------\n 𝖣𝖤𝖵 𝖭𝖠𝖬𝖤 : 𝖠𝖭𝖮𝖭𝖸𝖬𝖮𝖴𝖲 \n ---------------\n\n『𝖬𝖤𝖲𝖲』: "${custom}"`, thread.threadID);
            sentCount++;
        } catch (error) {
            console.error("Error sending a message:", error);
        }
    }

    for (const thread of threadList) {
        if (sentCount >= 20) {
            break;
        }
        if (thread.isGroup && thread.name != thread.threadID && thread.threadID != event.threadID) {
            await sendMessage(thread);
        }
    }

    if (sentCount > 0) {
        api.sendMessage(`› Sent the notification successfully.`, event.threadID);
    } else {
        api.sendMessage("› No eligible group threads found to send the message to.", event.threadID);
    }
};
