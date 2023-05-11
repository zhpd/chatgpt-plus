import { useTranslation } from '@/locales'

function Box(props: { children?: React.ReactElement; style?: React.CSSProperties }) {
  const { t } = useTranslation()

  return (
    <div style={{...props?.style}}>
      {props?.children}
    </div>
  )
}

export default Box
