require('dotenv').config()
const request = require('request')
const line = require('@line/bot-sdk')

const client = new line.Client({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
})

const userId = process.env.USER_ID

const message = {
  type: 'text',
  text: 'Hello World!',
}

// client
//   .pushMessage(userId, getQiitaData)
//   .then(() => {
//     console.log('success')
//   })
//   .catch((err) => {
//     console.log(err)
//   })

const getQiitaData = () => {
  const URL = 'https://qiita-api.vercel.app/api/trend'
  request.get(
    {
      uri: URL,
      headers: { 'Content-type': 'application/json' },
      json: true,
    },
    (err, res, body) => {
      if (err) {
        console.log(err)
      } else {
        console.log(body)
      }
    }
  )
}

console.log(getQiitaData)
