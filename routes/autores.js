const express = require('express')
const router = express.Router()
const Autor = require('../models/autor')

// All Authors Route
router.get('/', async (req, res) => {
  let searchOptions = {}
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
  try {
    const autores = await Autor.find(searchOptions)
    res.render('autores/index', {
      autores: autores,
      searchOptions: req.query
    })
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
})

// New Author Route
router.get('/novo', (req, res) => {
  res.render('autores/novo', { autor: new Autor() })
})

// Create Author Route
router.post('/', async (req, res) => {
  const autor = new Autor({
    name: req.body.name
  })
  try {
    const newAutor = await autor.save()
    // res.redirect(`autores/${newAutor.id}`)
    res.redirect(`autores`)
  } catch (err) {
    console.log(err)
    res.render('autores/novo', {
      autor: autor,
      errorMessage: 'Deu erro ao criar Autor'
    })
  }
})

module.exports = router