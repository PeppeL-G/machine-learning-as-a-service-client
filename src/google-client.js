const secrets = require('./secrets')
const {Translate} = require('@google-cloud/translate').v2

exports.translate = function(textToTranslate, callback){
	
	const translate = new Translate({
		projectId: secrets.GOOGLE_PROJECT_ID,
		keyFilename: secrets.GOOGLE_PATH_TO_CREDENTIALS
	})
	
	const to = "en"
	
	translate.translate(textToTranslate, to).then(function(translations){
		callback(translations[0])
	}).catch(function(error){
		console.log("GOOGLE TRANSLATION error")
		console.log(error)
		callback("TRANSLATION FAILED")
	})
	
}