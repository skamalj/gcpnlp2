
var returnSentiment = function(req, res){
    text = req.params.text;
    getSentiment(text, res);
    console.log("Recieved: " + text);
	 };

function getSentiment(text,res) {
    // Imports the Google Cloud client library
    const language = require('@google-cloud/language');
   
    // Instantiates a client
    const client = new language.LanguageServiceClient({
        keyFilename : process.env.JSON_KEY
    })
   
    const document = {
      content: text,
      type: 'PLAIN_TEXT',
    };
   
    // Detects the sentiment of the text
    client
        .analyzeSentiment({document: document})
        .then(results => {
            const sentiment = results[0].documentSentiment;
            res.send(JSON.stringify(sentiment));
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
}   

module.exports = {
		returnSentiment: returnSentiment
}