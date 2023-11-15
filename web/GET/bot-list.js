  const list = ["https://blob-bot.0lie.repl.co/","https://kerfus-bot.0lie.repl.co/index","https://pronoun-bot.0lie.repl.co"];
exports.run = (client,res,req,data) => {
  if(req.query.spaced)res.send(list.join(' '))
  else res.send(list)
  return 'stop';
}