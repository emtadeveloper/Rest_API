const mongoose = require('mongoose')
const { MONGO_DBNAME, MONG_PORT, MONGO_HOST } = process.env

mongoose.connection.on('error', (error) => {
  console.log('mongodb connection failed ', error.message)
})

console.log(`mongodb://${MONGO_HOST}:${MONG_PORT}/${MONGO_DBNAME}`)

const startMongoDB = () => {
  mongoose
    .connect(`mongodb://${MONGO_HOST}:${MONG_PORT}/${MONGO_DBNAME}`)
    .then(() => {
      console.log('connected to mongodb')
    })
    .catch((error) => console.log(error))
}

module.exports = startMongoDB
