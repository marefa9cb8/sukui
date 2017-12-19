"use strict";

//const slack = require('slack');
import slack from 'slack';
const token = process.env.SLACK_API_TOKEN;
const bot = new slack({token});

// search channel
function getChannelName(name){
  return bot.channels.list({token})
    .then((list) => {
      let channels = list.channels;
      let ids = channels.filter((item, index) => {
        if(item.name === name) return true;
      });
      if(ids.length === 0)  return undefined;
      else return ids[0].id;
    }).catch((err) => {throw err});
};

// post message
function postMessage(channelName, text){
  return getChannelName(channelName)
    .then((id) => {
      let param = {channel:id,
                   text:text,
                   username:"sukui-bot",
                   icon_emoji:":gift:"
      }
      return bot.chat.postMessage(param);
    }).catch((err) => {throw err});
}

// module export
export {postMessage};
