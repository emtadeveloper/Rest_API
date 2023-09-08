module.exports = (app) => {
  app.use((error, req, res, next) => {
    const Status = error.status || 500
    res.send({
      code: 'Exception',
      Status,
      en_message: error.message,
      fa_message: 'خطایی در عملیات مورد نظر رخ داده است'
    })
  })
}
