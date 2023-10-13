import express, { json } from 'express'
import cors from 'cors'
import { connect } from 'mongoose'
import { blogsRouter } from './controllers/blogs.js'
import { usersRouter } from './controllers/users.js'
import { errorHandler, requestLogger, tokenExtractor, unknownEndpoint, userExtractor } from './utilities/middleware.js'
import { MONGODB_URI } from "./utilities/config.js"
import { errorlogger, info } from './utilities/logger.js'
import { loginRouter } from './controllers/login.js'

import { testingRouter } from "./controllers/testing.js"

connect(MONGODB_URI).then(() => {
    info("Connected to MongoDB");
}).catch((err) => {
    errorlogger(err);
})
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
export const app = express()
console.log(cors(corsOptions));
app.use(cors())
app.use(json())
app.use(requestLogger)
app.use(tokenExtractor)
if (process.env.NODE_ENV === 'test') {
    app.use('/testing', testingRouter)
}
app.use('/blogs', userExtractor, blogsRouter)
app.use('/users', usersRouter)
app.use('/login', loginRouter)

app.use(unknownEndpoint)
app.use(errorHandler)
