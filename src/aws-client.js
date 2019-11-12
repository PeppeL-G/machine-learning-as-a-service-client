const AWS = require("aws-sdk")

// Set which region to use.
AWS.config.update({region: 'eu-west-1'})

// Load credentials from the file ~/.aws/credentials.
AWS.config.getCredentials(function(error) {
	if(error){
		console.log("Could not load AWS credentials.")
		console.log(error)
	}else{
		/*
		console.log("AWS Access key:", AWS.config.credentials.accessKeyId)
		console.log("AWS Secret access key:", AWS.config.credentials.secretAccessKey)
		console.log("AWS Region:", AWS.config.region)
		*/
	}
})

exports.translate = function(textToTranslate, callback){
	
	const translate = new AWS.Translate()
	
	const params = {
		SourceLanguageCode: 'sv',
		TargetLanguageCode: 'en',
		Text: textToTranslate,
	}
	
	translate.translateText(params, function(error, data){
		if(error){
			console.log("AWS Translation error")
			console.log(error)
			callback("TRANSLATION FAILED")
		}else{
			callback(data.TranslatedText)
		}
	})
	
}