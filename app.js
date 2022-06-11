require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const port = 3000
const prismic = require('@prismicio/client')
const fetch = require('node-fetch')

const accessToken= process.env.PRISMIC_ACCESS_TOKEN

const client = prismic.createClient(process.env.PRISMIC_ENDPOINT, { 
  fetch, 
  accessToken,
})


app.use((req, res, next) => {
  res.locals.ctx = {
    prismic,
  }
  next()
})


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// -------------------------------------------------

app.get('/', async (req, res) => {
  res.render('pages/home')
})

app.get('/about', async (req, res) => {
  const document = await client.getFirst()
  // prismic.Predicates.any( 'document.type', ['collection'] )
  // const meta = await client.getSingle('home')
  console.log(document)
  res.render('page', { document })
  // res.render('pages/about')
})

app.get('/collections', (req, res) => {
  res.render('pages/collections')
})

app.get('/detail/:uid', async (req, res) => {
  res.render('pages/detail')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })