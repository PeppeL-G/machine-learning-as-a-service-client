const secrets = require('./secrets')
const request = require('request')
const uuidv4 = require('uuid/v4')

exports.translate = function(textToTranslate, callback){
	
	const options = {
		method: 'POST',
		baseUrl: secrets.AZURE_ENDPOINT,
		url: 'translate',
		qs: {
			'api-version': '3.0',
			'to': 'en',
			'from': 'sv'
		},
		headers: {
			'Ocp-Apim-Subscription-Key': secrets.AZURE_SUBSCRIPTION_KEY,
			'Content-type': 'application/json',
			'X-ClientTraceId': uuidv4().toString()
		},
		body: [{
			'text': textToTranslate
		}],
		json: true,
	}
	
	request(options, function(error, response, body){
		if(error){
			console.log("AZURE Translate Error")
			console.log(error)
			callback("TRANSLATION FAILED")
		}else{
			callback(body[0].translations[0].text)
		}
	})
	
}