const express = require('express')
const expressHandlebars = require('express-handlebars')
const path = require('path')
const awsClient = require('./aws-client')
const azureClient = require('./azure-client')
const googleClient = require('./google-client')

const app = express()

// Setup the rendering engine.
app.set("views", path.join(__dirname, "views"))

app.engine("hbs", expressHandlebars({
	layoutsDir: path.join(__dirname, "layouts"),
	defaultLayout: "main.hbs",
}))

// Add request handlers for Spectre CSS files.
app.use(express.static(
	path.join(__dirname, "../", "node_modules", "spectre.css", "dist")
))

app.get("/", function(request, response){
	response.render("home.hbs")
})

// AWS Translate
app.get("/aws-translate", function(request, response){
	
	const textToTranslate = request.query.textToTranslate || ""
	
	if(!textToTranslate){
		
		const model = {
			textToTranslate
		}
		
		response.render("translate.hbs", model)
		
	}else{
		
		awsClient.translate(textToTranslate, function(translatedText){
			
			const model = {
				textToTranslate,
				translatedText
			}
			
			response.render("translate.hbs", model)
			
		})
		
	}
	
})

// Azure Translate
app.get("/azure-translate", function(request, response){
	
	const textToTranslate = request.query.textToTranslate || ""
	
	if(!textToTranslate){
		
		const model = {
			textToTranslate
		}
		
		response.render("translate.hbs", model)
		
	}else{
		
		azureClient.translate(textToTranslate, function(translatedText){
			
			const model = {
				textToTranslate,
				translatedText
			}
			
			response.render("translate.hbs", model)
			
		})
		
	}
	
})

// Google Translate
app.get("/google-translate", function(request, response){
	
	const textToTranslate = request.query.textToTranslate || ""
	
	if(!textToTranslate){
		
		const model = {
			textToTranslate
		}
		
		response.render("translate.hbs", model)
		
	}else{
		
		googleClient.translate(textToTranslate, function(translatedText){
			
			const model = {
				textToTranslate,
				translatedText
			}
			
			response.render("translate.hbs", model)
			
		})
		
	}
	
})

app.listen(8080)