import React, { useEffect, useState } from 'react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

export function getEmojiUrl(unified: string, style: string) {
  // return `https://cdn.staticfile.org/emoji-datasource-apple/14.0.0/img/${style}/64/${unified}.png`
  return `https://www.emojiall.com/images/120/${style}/${unified}.png`
}

const EmojiPicker = (props: { onEmojiClick: (emoji: any) => void; theme?: 'auto' | 'light' | 'dark'; style?: 'native' | 'apple' | 'google' | 'facebook' | 'microsoft' | 'bubble' }) => {
  const [style, setStyle] = useState(props.style || 'apple')
  useEffect(() => {
    console.log('EmojiPicker navigator', navigator)
    if (navigator?.platform?.indexOf('Win') !== -1) {
      // 当前为Windows系统
      setStyle('microsoft')
    } else {
      setStyle('apple')
    }
  }, [])

  useEffect(() => {
    if (props.style == 'native') {
      if (navigator?.platform?.indexOf('Win') !== -1) {
        // 当前为Windows系统
        setStyle('microsoft')
      } else {
        setStyle('apple')
      }
    } else {
      if (props.style) setStyle(props.style)
    }
  }, [props.style])

  return (
    <Picker
      theme={props.theme || 'auto'}
      data={data}
      onEmojiSelect={(emoji: any) => {
        // 返回emoji图片链接
        emoji.imageUrl = getEmojiUrl(emoji.unified, style || 'apple')
        console.log('onEmojiSelect', emoji)
        props.onEmojiClick(emoji)
      }}
    />
  )
}

export default EmojiPicker
