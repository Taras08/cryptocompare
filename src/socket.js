// this is where you paste your api key
var apiKey = "8c54326c45ef8299d552a9b2fa981ac363bb01c868ee6c8b77574f026fd01932";
var ccStreamer = new WebSocket('wss://streamer.cryptocompare.com/v2?api_key=' + apiKey)

ccStreamer.onopen = function onStreamOpen() {
    var subRequest = {
        "action": "SubAdd",
        "subs": ["0~Coinbase~BTC~USD"]
    };
    ccStreamer.send(JSON.stringify({
        "action": "SubAdd",
        "subs": ["0~Coinbase~BTC~USD"]
    }));
    ccStreamer.send(JSON.stringify({
        "action": "SubAdd",
        "subs": ["0~Coinbase~BCH~USD"]
    }));
    ccStreamer.send(JSON.stringify({
        "action": "SubAdd",
        "subs": ["0~Coinbase~ETH~USD"]
    }));
    ccStreamer.send(JSON.stringify({
        "action": "SubAdd",
        "subs": ["0~Coinbase~XRP~USD"]
    }));
}
export default ccStreamer