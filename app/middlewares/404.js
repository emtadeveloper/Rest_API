module.exports = (app) => {
  app.use((req, res, next) => {
    res.status(404).send({
      code: 'Not Found',
      status: 404,
      message: 'requsted resourse could not be found !'
    })
  })
}
