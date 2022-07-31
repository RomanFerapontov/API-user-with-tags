import app from './config/app.js'
import * as dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 5555

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`)
})
