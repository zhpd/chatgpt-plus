import React from 'react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

export function getEmojiUrl(unified: string, style: string) {
  return `https://cdn.staticfile.org/emoji-datasource-apple/14.0.0/img/${style}/64/${unified}.png`
}

const EmojiPicker = (props: { onEmojiClick: (emoji: any) => void; theme: 'auto' | 'light' | 'dark'; style: 'native' | 'apple' | 'google' | 'facebook' }) => {
  return (
    <Picker
      theme={props.theme || 'auto'}
      data={data}
      onEmojiSelect={(emoji: any) => {
        // 返回emoji图片链接
        emoji.imageUrl = getEmojiUrl(emoji.unified, props.style || 'apple')
        console.log('onEmojiSelect', emoji)
        props.onEmojiClick(emoji)
      }}
    />
  )
}

export default EmojiPicker
