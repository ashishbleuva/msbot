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
    appId: '68f72d4f-5f9d-4673-bb6b-3d79b1893062',
    appPassword: 'zaQRc4X5s54tJT2cZyVqdCO'
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

/*bot.dialog('/', function (session) {
    session.send("Hello World");
});
*/


var userResponse = {
    "Yes": {
        nextStep: "OK, Please check the secondary board."

    },
    "No": {
        nextStep: "OK, Please bring up primary board and try to login onto it."
    }
};

bot.dialog('/', [
    function (session) {
        //builder.Prompts.choice(session, "Is Primary Board up?", userResponse);

       var reply =  new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments([
               new builder.HeroCard(session)
                .title('Primary Board Check')
                .subtitle('Primary Board Check')
                .text('Is primary board workin?')
                .buttons([
                    builder.CardAction.openUrl(session, 'https://azure.microsoft.com/en-us/services/storage/', 'Yes'),
                    builder.CardAction.openUrl(session, 'https://azure.microsoft.com/en-us/services/storage/', 'No')
                ])]);

        session.send(reply);
    },
    function (session, results) {
            var response = userResponse[results.response.entity];
            session.send("%(nextStep)s",response);
    }

]);

