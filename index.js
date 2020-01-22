require('dotenv').config()
const express = require('express'),
      {SERVER_PORT, CONNECTION_STRING} = process.env,
      massive = require('massive'),
      cors = require('cors'),
      pc = require('./products_controller')
      app = express();

app.use(cors())
app.use(express.json())

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('db connected')
})

app.get('/api/products', pc.getAll)
app.get('/api/products/:id', pc.getOne)
app.put('/api/products/:id', pc.update)
app.post('/api/products', pc.create)
app.delete('/api/products/:id', pc.delete)


const port = SERVER_PORT;
app.listen(port, ()=> console.log(`server running on ${port}`))
