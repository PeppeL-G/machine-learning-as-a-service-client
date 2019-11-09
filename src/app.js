const express = require('express')
const expressHandlebars = require('express-handlebars')
const path = require('path')

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

app.listen(8080)