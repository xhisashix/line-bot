require('dotenv').config()
const line = require('@line/bot-sdk')
const axios = require('axios')

const client = new line.Client({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
})
const userId = process.env.USER_ID

/**
 * send message to LINE
 * @param {*} message
 */
function sendMessage(message) {
  client
    .pushMessage(userId, message)
    .then(() => {
      console.log('success')
    })
    .catch((err) => {
      console.log(err)
    })
}

/**
 * create of message to Bot
 * @param {*} data
 */
function sendBot(data) {
  const message = data
  const sendMessages = []
  for (let i = 0; i < 5; i++) {
    sendMessages.push(message[i].node.title + '\n' + message[i].node.linkUrl+ '\n')
  }

  const messageString = []
  messageString.push({
    type: 'text',
    text: "【Qiitaのトレンド記事】\n" + sendMessages.join('\n'),
  })

  sendMessage(messageString)
}

/**
 * get data from Qiita
 */
async function getQiita() {
  const URL = 'https://qiita-api.vercel.app/api/trend'
  try {
    const response = await axios.get(URL)
    sendBot(response.data)
  } catch (error) {
    console.log(error)
  }
}

getQiita()
