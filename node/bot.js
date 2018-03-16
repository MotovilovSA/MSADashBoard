process.env["NTBA_FIX_319"] = 1;

var TelegramBot = require('node-telegram-bot-api');
// Устанавливаем токен, который выдавал нам бот.
var token = '408128987:AAGmhFHb6XSG4KMpSLuG9E5vjvTy38liizk';
// Включить опрос сервера
var bot = new TelegramBot(token, { polling: true });

bot.on('message', function (msg) {
    var chatId = msg.chat.id;
    console.log(msg);
    bot.sendMessage(chatId, "Hello!", { caption: "I'm a bot!" });
});