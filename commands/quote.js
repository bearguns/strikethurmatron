module.exports = {
  name: '!quote',
  description: 'quote bot!',
  execute(msg, args) {
    if (!args.length) {
      return msg.channel.send(`Whoops ${message.author}! You didn't provide any arguments to the quote command!`);
    }

    const mentionedUser = msg.mentions.users.first();
    const quote = args[0];
    console.log(mentionedUser.id);
    console.log(quote);
  }
}
