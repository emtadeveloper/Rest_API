//  وظبفه بارگزاری برنامه مارو داره بدون اطلاع از اتفاقات داخل برنامه
require('dotenv').config() //  هست رو برام بارگزاری کن env تمام اطلاعاتی که در
const bootApplication = require('./app')
bootApplication(process.env.APP_PORT)
