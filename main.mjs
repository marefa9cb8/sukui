'use strict';

import { postMessage } from './src/slack';
import { getProfile, twitterPost, twitterGet, client } from './src/twitter';
import { download } from './src/download';

twitterPost("connection.");

const stream = client.stream('user');
getProfile().then((user) => {
  stream.on('favorite', (data) => {
    if(data.event === 'favorite'
    && data.source.screen_name === user
    && data.target_object.extended_entities
    ){
      let tweet_url = 'https://twitter.com/' + data.target.screen_name + '/status/' + data.target_object.id_str;
      postMessage("general",tweet_url);
      data.target_object.extended_entities.media.forEach((value) => {
        console.log(value.media_url_https);
        download(value.media_url_https);
      });
    }
  });
});
