var Twitter = require('twitter');
var callbacks = {};

function CopyrightFilter(config) {
  this.setConfig(config);
  this.listenForCopyrightStatus();
}

CopyrightFilter.setConfig = function(config) {
  this.twitter = new Twitter(config.twitter);
};

CopyrightFilter.isCopyrighted = function(url, callback) {
  this.twitter.post('statuses/update', {status: '@europarl_en Is it OK to distribute this under new Copyright Directive? Respond with a no if not: ' + url}, function(error, tweet){
    callbacks[tweet.id] = callback;
  });
};

CopyrightFilter.listenForCopyrightStatus = function() {
  var stream = this.twitter.stream('statuses/filter', {follow: 'europarl_en'});
  stream.on('data', function(tweet) {
    var callback = callbacks[tweet.in_reply_to_status_id];
    if (callback) {
      if (/\bno\b/.test(tweet.text)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    }
  });
};

module.exports = CopyrightFilter;
