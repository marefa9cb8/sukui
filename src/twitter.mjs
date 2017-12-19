"use strict";

import Twitter from 'twitter';

// twitter OAuth
const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// Get profile
function getProfile(){
  return client.get('account/settings', {})
    .then((res) => {return res.screen_name})
    .catch((err) => {throw err});
}

// POST
function twitterPost(text){
  return client.post('statuses/update', {status: text})
    .then((res) => {return res})
    .catch((err) => {throw err});
}

// GET
function twitterGet(){
  return client.get('statuses/home_timeline', {count: 5})
    .then((res) => {return res})
    .catch((err) => {throw err});
}

// Stream
//const stream = client.stream('user');
//stream.on('data', function(res) {
//  console.log(res);
//});

//stream.on('error', function(err) {
//  throw err;
//});

// module export
export {getProfile, twitterPost, twitterGet, client};
