const UserModel = require('../models/userModels')
const TokenService = require('../services/tokenServices')

exports.newSession = async (req, res, next) => {
  try {
    const { email } = req.body
    const user = await UserModel.findOne({ email })
    if (!user) {
      return res.status(404).send({
        status: 'error',
        code: 404,
        message: 'آدرس ایمیل یا کلمه عبور اشتباه است'
      })
    }
    const token = TokenService.sign({ id: user._id })
    return res.send({
      status: 'sucess',
      code: 200,
      token
    })
  } catch (err) {
    next(err)
  }
}
