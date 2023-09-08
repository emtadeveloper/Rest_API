// میاد و تمام قسمت های برنامه رو کنار هم دیگه میچینه
// چیدن و مدیریت میدلول ها روت ها و مدل ها و

const express = require('express')
const app = express()
require('./boot')
require('./middlewares')(app)
require('./routes')(app)
require('./middlewares/404')(app)
require('./middlewares/exception')(app)

module.exports = (port) => {
  app.listen(port, () => {
    console.log(`app is runnig as port ${port}`)
  })
}
