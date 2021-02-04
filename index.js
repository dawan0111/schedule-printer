const express = require("express")
const asyncHandler = require('express-async-handler')
const cors = require('cors')

const authController = require("./controllers/AuthController")
const printController = require("./controllers/PrintController")
const historyController = require("./controllers/HistoryController")
const { authMiddleware, authAdminMiddleware } = require("./middlewares/auth")

const app = express()

const whitelist = ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://192.168.219.104:3000']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(null, true)
      // callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post("/login", asyncHandler(authController.login))
app.get("/auth", authMiddleware, asyncHandler(authController.auth))
app.get("/auth/admins", authAdminMiddleware, asyncHandler(authController.getAdmins))
app.post("/auth/admins", authAdminMiddleware, asyncHandler(authController.createAdmin))
app.delete("/auth/admins/:userId", authAdminMiddleware, asyncHandler(authController.deleteAdmin))

app.get("/printers", asyncHandler(printController.get))
app.post("/printers", authAdminMiddleware, asyncHandler(printController.create))
app.delete("/printers/:printerId", authAdminMiddleware, asyncHandler(printController.delete))
app.put("/printers/:printerId", authAdminMiddleware, asyncHandler(printController.update))

app.get("/historys/ranking", asyncHandler(historyController.ranking))
app.get("/historys/:printerId", asyncHandler(historyController.get))
app.post("/historys", authMiddleware, asyncHandler(historyController.create))

app.get("*", (req, res) => {
  res.render("/public/index.html")
})

app.listen(4000, () => {
  console.log(`Example app listening at http://localhost:4000`)
})