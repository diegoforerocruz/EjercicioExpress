const express = require("express")
const Joi = require("joi")
const app = express()

app.use(express.json())

const clients = [
    {id:1, name: "Nestle"},
    {id:2, name: "IBM"},
    {id:3, name: "Apple"}
]

app.get("/api/clients", (req, res) => {
    res.send(clients)
})

app.get("/api/clients/:id", (req,res) => {
    const client = clients.find( c => c.id === parseInt(req.params.id))
    if(!client) return res.status(404).send("The client with this id was not found")
    res.send(client)
})

app.post("/api/clients", (req,res) => {
    const schema = Joi.object({
        name: Joi.string()
        .min(3)
        .required()
    })

    const {error} = schema.validate(req.body)
    if(error) {
        return res.status(400).send(error)
    }

    const client = {
        id:clients.length + 1 ,
        name: req.body.name
    }

    clients.push(client)
    res.send(client)
})

app.put("/api/clients/:id", (req,res) => {
    const client = clients.find( c => c.id === parseInt(req.params.id))
    if(!client) return res.status(404).send("The client with this id was not found")

    const schema = Joi.object({
        name: Joi.string()
        .min(3)
        .required()
    })

    const {error} = schema.validate(req.body)
    if(error) {
        return res.status(400).send(error)
    }

    client.name = req.body.name

    res.send(client)
})

app.delete("/api/clients/:id", (req,res) => {
    const client = clients.find( c => c.id === parseInt(req.params.id))
    if(!client) return res.status(404).send("The client with this id was not found")  

    const index = clients.indexOf(client)

    clients.splice(index, 1)

    res.send(client)
})



app.listen(3000, () => {
    console.log("Listening on port 3000")
})