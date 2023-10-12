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
    origin: 'http://localhost:5173',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
export const app = express()
app.use(cors(corsOptions))
app.use(json())
app.use(requestLogger)
app.use(tokenExtractor)
if (process.env.NODE_ENV === 'test') {
    app.use('/api/testing', testingRouter)
}
app.use('/api/blogs', userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(unknownEndpoint)
app.use(errorHandler)
