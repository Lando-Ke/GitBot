'use strict';

let axios = require('axios');

module.exports.handler = function(event, context, cb) {
  let accessToken = 'EAADiFzZC62TgBAHGFS0fSxSFavhuDoGbQsgaqVgWCSzKj0TCZBNchBcWKFpw8FDho9acwHYZCH7jgORQVpl13l3rqrQXddZAbwHyZAgPtGyHt4JH2LtZC8kZBo2HWrPmG7BpcbEyjDZBtB31ALjsZC6NMnIIDqm5ZBa8qK5nUBGxh07AZDZD';

  if (event.method === 'GET') {
    //facebook app verifiction
    if (event.hubVerifyToken === 'GITBOTTOKEN' && event.hubChallenge) {
      return cb(null, parseInt(event.hubChallenge));
    } else {
      return cb('The Token entered is Invalid');
    }
  }

  if (event.method === 'POST') {
   event.payload.entry.map((entry) => {
     entry.messaging.map((messagingItem) => {
       if (messagingItem.message && messagingItem.message.text) {
         axios.get('https://api.github.com/search/repositories?q=' + messagingItem.message.text + '&sort=stars&order=desc')
           .then((response) => {
             let message = `Sorry, I found no repositories for your query "${messagingItem.message.text}"`;
             if (response.data.items.length > 0) {
               let repositories = response.data.items.map((repository, index) => `${index + 1}: ${repository.html_url}`);

               message = `Here are some repositories which might be interesting:\n\n${repositories.slice(0, 5).join('\n')}`;
             }

             let payload = {
               recipient: {
                 id: messagingItem.sender.id
               },
               message: {
                 text: message
               }
             };

             let url = `https://graph.facebook.com/v2.6/me/messages?access_token=${accessToken}`;

             axios.post(url, payload)
               .then((response) => {
                 return cb(null, response);
               })
             });
       }
     });
   });
  }
  };
