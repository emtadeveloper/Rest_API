module.exports = (app) => {
  app.use((req, res, next) => {
    res.status(404).send({
      code: '404',
      status: 'Not Found ',
      message: 'requsted resourse could not be found !'
    })
  })
}
