Copyright Filter
================

An asynchronous library for determining copyright status.

Currently requires use of the twitter API.

## Config:

Example:

```
{
  twitter: {
   consumer_key: TWITTER_CONSUMER_KEY,
   consumer_secret: TWITTER_CONSUMER_SECRET,
   access_token_key: TWITTER_ACCESS_TOKEN_KEY,
   access_token_secret: TWITTER_ACCESS_TOKEN_SECRET
 }
}
```

## Usage:

- Create a new CopyrightFilter, passing in the config object:

`var copyrightFilter = new CopyrightFilter(CONFIG)`

- Call the isCopyrighted method with a url containing the works for copyright testing. As there may be a substantial delay in receiving a response, this is handled asynchronously with an error-first callback

```
var url = "http://www.example.com/"
copyrightFilter.isCopyrighted(url, function(err, copyrighted){
  if (copyrighted) {
    console.log(URL + 'contains copyrighted content');
  } else {
    console.log(URL + 'is safe to publish');
  }
})
```
