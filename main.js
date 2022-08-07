require('dotenv').config()
const request = require('request')
const line = require('@line/bot-sdk')
const axios = require('axios')

const client = new line.Client({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
})

const userId = process.env.USER_ID

const message = {
  type: 'text',
  text: 'Hello World',
}

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

function sendBot(data) {
  const message = data
  const sendMessages = []
  for (let i = 0; i < 4; i++) {
    sendMessages.push({
      type: 'text',
      text: message[i].node.title + '\n' + message[i].node.linkUrl,
    })
  }
  sendMessage(sendMessages)
}

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
