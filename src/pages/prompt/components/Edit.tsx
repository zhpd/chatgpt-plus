import { useSiteContext } from '@/contexts/site'
import { Avatar, Button, Cascader, Checkbox, DatePicker, Form, Input, InputNumber, Popconfirm, Radio, Select, Space, Switch, theme as antdTheme, TreeSelect, Typography, Upload } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { usePromptContext } from '@/contexts'
import { Prompt } from '@/types/prompt'
import { useTranslation } from '@/locales'
import { nanoid } from 'nanoid'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

function Edit(props: { action: string; prompt?: Prompt }) {
  const router = useRouter()
  const { action, prompt } = props
  const { theme } = useSiteContext()
  const { t } = useTranslation()
  const { addPrompt, upPrompt, delPrompt } = usePromptContext()
  const { token } = antdTheme.useToken()
  const [form] = Form.useForm()

  useEffect(() => {
    // 重置表单
    form?.resetFields()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.action, props.prompt])

  const onFinish = (values: any) => {
    console.log('Success:', values, action)
    if (action == 'add') {
      // 新建
      const _prompt: Prompt = {
        uuid: nanoid(),
        ...values,
        dateTime: new Date().getTime().toString(),
      }
      addPrompt(_prompt)
    } else {
      // 编辑
      upPrompt(prompt?.uuid as string, values)
    }
  }
  const onReset = () => {
    form.resetFields()
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const deletePrompt = (uuid: string) => {
    // 从数据中删除
    delPrompt(uuid)
    console.log('delPrompt', uuid)
    router.push('/prompt')
  }
  return (
    <div style={{ flex: 1, paddingTop: '30', display: 'flex', flexDirection: 'column', overflow: 'auto', width: '100%' }}>
      <div
        style={{
          height: 64,
          // borderRight: `${theme === 'dark' ? 0 : 1}px solid ${token.colorBorder}`,
          paddingLeft: 20,
          paddingRight: 20,
          backgroundColor: theme == 'dark' ? token.colorBgContainer : '#fff',
          color: theme === 'dark' ? '#eee' : undefined,
          borderBottom: `1px solid ${theme == 'dark' ? '#424242' : '#e8e8e8'}`,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 9,
          right: 0,
          left: 0,
          padding: '16px',
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }}>
            <Typography.Paragraph style={{ fontSize: 16, width: '100%', fontWeight: 500, color: theme === 'dark' ? '#eee' : undefined, margin: 0 }}>
              {action == 'edit' ? t('prompt.editPrompt') : t('prompt.newPrompt')}
            </Typography.Paragraph>
          </div>
        </div>
        <Space>
          {action == 'edit' ? (
            <Popconfirm
              key="del"
              title="Delete the prompt"
              description="Are you sure to delete this prompt?"
              onConfirm={(e?: React.MouseEvent<HTMLElement>) => {
                deletePrompt(prompt?.uuid as string)
                return
              }}
              onCancel={(e?: React.MouseEvent<HTMLElement>) => {}}
              okText="Yes"
              cancelText="No"
            >
              <Button type={'default'} size="middle" style={{ marginLeft: 5, marginRight: 5 }} icon={<DeleteOutlined />}></Button>
            </Popconfirm>
          ) : null}
        </Space>
      </div>
      <Form
        labelCol={{ span: 6 }}
        style={{ marginTop: 20 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ type: 'text', private: true, self: true, ...prompt }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {/* <Form.Item label="类型" hidden name="type" valuePropName="type">
          <Radio.Group>
            <Radio value="text">文本</Radio>
          </Radio.Group>
        </Form.Item> */}
        <Form.Item label="名称" name="name" required>
          <Input />
        </Form.Item>
        <Form.Item label="描述" name="description" required>
          <Input />
        </Form.Item>
        <Form.Item label="提示语" name="prompt" required>
          <Input.TextArea rows={5} />
        </Form.Item>
        {/* <Form.Item label="Select">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item> */}
        {/* <Form.Item label="是否公开" name="private" valuePropName="private">
          <Switch />
        </Form.Item> */}
        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
            <Button type="text" htmlType="button" onClick={onReset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Edit
