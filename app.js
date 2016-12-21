var restify = require('restify');
var builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat bot
var connector = new builder.ChatConnector({
    "6c26dd45-89bf-4bd6-a5f9-994615b39bcc": process.env.MICROSOFT_APP_ID,
    "e3F9da1jVKQfr6BnAq9bB4n": process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', function (session) {
    session.send("Hello World");
});



var userResponse = {
    "Yes": {
        nextStep: "OK, Please check the secondary board."

    },
    "No": {
        nextStep: "OK, Please bring up primary board and try to login onto it."
    }
};

bot.dialog('/ha lost', [
    function (session) {
        builder.Prompts.choice(session, "Is Primary Board up?", userResponse);
    },
    function (session, results) {
            var response = userResponse[results.response.entity];
            session.send("%(nextStep)s",response);
    }

]);
