const express = require('express')
const port = 3000
const bodyParser = require('body-parser')
const app = express()
const date = require(__dirname + '/date.js')


let items = ["Buy Food", "Make Food", "Eat Food"]
let workItems = []


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static("public"))


app.get('/', (req, res) => {



   let day = date.getDate()

    res.render('index', {listTitle: day, newListItems: items})


})

    app.post("/", (req, res) => {
        let item = req.body.newItem

        if (req.body.list === "Work List") {
            workItems.push(item)
            res.redirect("/work")
        } else {
            items.push(item)
            res.redirect("/")
        }


    })

    app.get("/work", (req,res) => {
        res.render("index", {listTitle: "Work List", newListItems: workItems})
    })

    app.post("/work", (req, res) => {
        let item = req.body.newItem
        workItems.push(item)
        res.redirect("/work")
    })



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})