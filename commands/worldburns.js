module.exports = {
  name: '!worldburns',
  description: 'if the world burns',
  execute(msg, args) {
    setTimeout(() => msg.channel.send('And if the world burns down tomorrow...'), 2000);
    setTimeout(() => msg.channel.send('will you still be with me?'), 3500);
    setTimeout(() => msg.channel.send('I wanna see you'), 5000);
  },
  cooldown: 30,
};
