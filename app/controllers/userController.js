/* eslint-disable no-prototype-builtins */
const userModel = require('../models/userModels')
const UserModel = require('../models/userModels')

const usersList = async (req, res, next) => {
  //
  let projection = {}
  if (req.query.hasOwnProperty('fields')) {
    projection = req.query.fields.split(',').reduce((total, current) => {
      return { [current]: 1, ...total }
    }, {})
  }

  const perPage = 10
  const page = req.query.page || 1
  const offset = (page - 1) * perPage
  const userCount = await UserModel.count()
  const totalPages = Math.ceil(userCount / perPage)
  const users = await UserModel.find({}, projection)
    .limit(perPage)
    .skip(offset)

  res.send({
    sucsess: true,
    message: 'لیست کاربران با موفقیت تولید شد',
    data: { users },
    meta: {
      page: parseInt(page),
      pages: totalPages,
      next: hasNextPage(page, totalPages)
        ? `${process.env.APP_URL}/api/v1/users?page=${parseInt(page) + 1}`
        : null,
      prev: hasPrevPage(page, totalPages)
        ? `${process.env.APP_URL}/api/v1/users?page=${parseInt(page) - 1}`
        : null
    }
  })
}

const addUser = async (req, res, next) => {
  try {
    const { firstName, lastName, mobile, email } = req.body

    if (
      firstName === undefined ||
      firstName === '' ||
      lastName === '' ||
      lastName === undefined ||
      mobile === '' ||
      mobile === undefined ||
      email === '' ||
      email === undefined
    ) {
      return res.status(422).send({
        success: true,
        message: 'اطلاعات ارسالی برای ایجاد معتبر نمی باشد'
      })
    }
    const newUser = new UserModel({
      firstName,
      lastName,
      mobile,
      email
    })
    await newUser.save()
    res.status(201).send({
      success: true,
      message: 'کاربر جدید با موفقیت ایجاد شد',
      newUser
    })
  } catch (error) {
    next(error)
  }
}

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!id) {
      return res
        .status(404)
        .send({ error: true, message: 'کاربری با  این مشخصات یافت نشد' })
    }
    const user = await UserModel.findOne({ _id: id })
    if (!user) {
      return res
        .status(404)
        .send({ error: true, message: 'کاربری با  این مشخصات یافت نشد' })
    }

    return res.send({
      sucess: true,
      data: { user }
    })
  } catch (error) {
    next(error)
  }
}

const removeUser = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!id) {
      return res
        .status(404)
        .send({ error: true, message: 'کاربری با  این مشخصات یافت نشد' })
    }
    await userModel.deleteOne({ _id: id })
    return res.send({
      sucess: true,
      message: 'کاربر با موفقیت حذف شد'
    })
  } catch (error) {
    next(error)
  }
}

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!id) {
      return res
        .status(404)
        .send({ error: true, message: 'کاربری با  این مشخصات یافت نشد' })
    }
    const { n, nModified } = await userModel.updateOne(
      { _id: id },
      { ...req.body }
    )
    if ((n === 0, nModified === 0)) {
      throw new Error('عملیات بروز رسانی با خطا مواجه شده است')
    }
    return res.send({
      sucess: true,
      message: 'کاربر با موفقیت به روز رسانی شد'
    })
  } catch (error) {
    next(error)
  }
}

const hasNextPage = (page, totalPages) => {
  return page < totalPages
}

const hasPrevPage = (page) => {
  return page > 1
}

module.exports = {
  usersList,
  addUser,
  getUser,
  removeUser,
  updateUser
}
