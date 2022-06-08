import express from 'express'

const app = express()
const port = 3000

app.use(express.static('build'))

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})
