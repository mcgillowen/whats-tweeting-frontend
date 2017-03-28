

const TWITTER_CONSUMER_KEY = 'xvz1evFS4wEEPTGEFPHBog';
const TWITTER_CONSUMER_SECRET = 'kAcSOqF21Fu85e7zjz7ZN2U4ZRhfV3WpwPAoE3Z7kBw';
const HTTP_METHOD = 'POST';
const TWITTER_REQUEST_TOKEN_URL = 'https://api.twitter.com/oauth/request_token';
const TWITTER_SIGNATURE_METHOD = 'HMAC-SHA1';
const TWITTER_OAUTH_VERSION = '1.0';

const oauth_params = {
  oauth_consumer_key: TWITTER_CONSUMER_KEY,
  oauth_nonce: nonceGenerator,
  oauth_signature_method: "HMAC-SHA1",
  oauth_timestamp: getTimeStamp,
  oauth_version: "1.0"
}

function nonceGenerator() {
  const nonceLen = 32;
  const chars = 'abcdefghijklimnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let nonce = '';
  for (let i = 0; i < nonceLen; i++) {
    nonce += chars.charAt(parseInt(Math.random() * chars.length, 10));
  }
  return nonce;
}

function percentEncode(str) {
  return encodeURIComponent(str).replace(/\!/g, "%21").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
};

function getTimeStamp() {
  return Date.now();
}

function getBaseString(method, url, oauth_data) {
    return method.toUpperCase() + '&' + this.percentEncode(this.getBaseUrl(url)) + '&' + this.percentEncode(this.getParameterString(request, oauth_data));
}



function getSignature(key, secret, nonce, timestamp) {
  let authValue = `oauth_consumer_key=${key}&oauth_nonce=${nonce}&oauth_signature_method=${TWITTER_SIGNATURE_METHOD}&oauth_timestamp=${timestamp}`;
  let value = `${HTTP_METHOD}&${percentEncode(TWITTER_REQUEST_TOKEN_URL)}&${percentEncode(authValue)}`;
  let hashingKey = `${percentEncode(secret)}&`;

  const signed = CryptoJS.HmacSHA1(value, hashingKey);

  return CryptoJS.enc.Base64.stringify(signed);

}

function outputParams() {
  const tStamp = getTimeStamp();
  const nonce = nonceGenerator();

  const sig = getSignature(TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET, nonce, tStamp);

  outputtimestamp.innerHTML = tStamp;
  outputkey.innerHTML = TWITTER_CONSUMER_KEY;
  outputnonce.innerHTML = nonce;
  outputsignature.innerHTML = sig;
}


