import { useSiteContext } from '@/contexts/site'
import {
  Avatar,
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Radio,
  Select,
  Space,
  Switch,
  theme as antdTheme,
  TreeSelect,
  Typography,
  Upload,
  Divider,
  Slider,
} from 'antd'
import { DeleteOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { usePromptContext } from '@/contexts'
import { Prompt } from '@/types/prompt'
import { useTranslation } from '@/locales'
import { uuidv4 } from '@/utils/uuid'
import { useEffect, useState } from 'react'
import { Model, ModelList } from '@/config/constant'
import { useRouter } from 'next/router'

function Edit(props: { action: string; page: boolean; prompt?: Prompt }) {
  // const router = useRouter()
  const { action, prompt, page = true } = props
  const { theme } = useSiteContext()
  const { t } = useTranslation()
  const { addPrompt, upPrompt, delPrompt } = usePromptContext()
  const { token } = antdTheme.useToken()
  const [initForm, setInitForm] = useState<any>({
    type: 'text',
    name: prompt?.name || '',
    context: prompt?.context || [
      {
        role: 'user',
        content: prompt?.prompt || '',
      },
    ],
    ...prompt,
  })
  const [form] = Form.useForm()

  useEffect(() => {
    // 重置表单
    form?.resetFields()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.action, props.prompt])

  const onFinish = (values: any) => {
    console.log('Success:', values, action)
    // if (action == 'add') {
    //   // 新建
    //   const _prompt: Prompt = {
    //     uuid: uuidv4(),
    //     ...values,
    //     datetime: new Date().getTime().toString(),
    //   }
    //   addPrompt(_prompt)
    // } else {
    //   // 编辑
    //   upPrompt(prompt?.uuid as string, values)
    // }
  }
  const onReset = () => {
    form.resetFields()
  }

  const deletePrompt = (uuid: string) => {
    // 从数据中删除
    delPrompt(uuid)
    console.log('delPrompt', uuid)
    // router.push('/prompt')
  }
  return (
    <div style={{ flex: 1, paddingTop: '30', display: 'flex', flexDirection: 'column', overflowX: 'hidden', width: '100%' }}>
      {page && (
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
                <Button type={'default'} size="middle" style={{ marginLeft: 5, marginRight: 5, color: token.colorError }} icon={<DeleteOutlined />}></Button>
              </Popconfirm>
            ) : null}
          </Space>
        </div>
      )}
      <Form form={form} labelCol={{ span: 6 }} style={{ marginTop: 20 }} wrapperCol={{ span: 14 }} labelAlign="right" layout="horizontal" initialValues={{ ...initForm }} onFinish={onFinish}>
        {/* <Form.Item label="类型" hidden name="type" valuePropName="type">
          <Radio.Group>
            <Radio value="text">文本</Radio>
          </Radio.Group>
        </Form.Item> */}
        <Form.Item label="名称" name="name" required>
          <Input />
        </Form.Item>
        <Form.Item label="介绍" name="intro" required>
          <Input />
        </Form.Item>
        <Form.Item label="提示语" required>
          <Form.List name="context">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <div key={field.key + index} style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'row', width: '100%', marginBottom: 10 }}>
                    <Form.Item {...field} name={[field.name, 'role']} noStyle rules={[{ required: true, message: 'Role is required' }]}>
                      <Select placeholder="Role" defaultValue={'user'} style={{ width: '170px', marginRight: 4 }}>
                        <Select.Option value="user">User</Select.Option>
                        <Select.Option value="assistant">Assistant</Select.Option>
                        <Select.Option value="system">System</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item {...field} label="Prompt" name={[field.name, 'content']} noStyle rules={[{ required: true, message: 'Prompt is required' }]}>
                      <Input.TextArea placeholder="Input Prompt" rows={4} style={{ width: '100%' }} />
                    </Form.Item>
                    <MinusCircleOutlined style={{ right: '-20px', position: 'absolute' }} onClick={() => remove(field.name)} />
                  </div>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Prompt
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>

        <Divider plain>{'model config'}</Divider>

        <Form.Item label={t('chat.option.model')} extra={t('chat.option.modelTip')} name="model">
          <Select defaultValue={Model['GPT-3.5-Turbo']}>
            {ModelList.map((item) => (
              <Select.Option key={item?.value} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label={t('chat.option.max_tokens')} extra={t('chat.option.max_tokensTip')} name="max_tokens">
          <InputNumber defaultValue={2000} min={0} max={2000} />
        </Form.Item>
        <Form.Item label={t('chat.option.top_p')} extra={t('chat.option.top_pTip')} name="top_p">
          <InputNumber defaultValue={1} min={0} max={1} step={0.1} />
        </Form.Item>
        <Form.Item label={t('chat.option.temperature')} extra={t('chat.option.temperatureTip')} name="temperature">
          <InputNumber defaultValue={0.5} min={0.0} max={0.9} step={0.1} />
        </Form.Item>
        <Form.Item label={t('chat.option.presence_penalty')} extra={t('chat.option.presence_penaltyTip')} name="presence_penalty">
          <InputNumber defaultValue={1} min={-2.0} max={2.0} step={1} />
        </Form.Item>
        <Form.Item label={t('chat.option.frequency_penalty')} extra={t('chat.option.frequency_penaltyTip')} name="frequency_penalty">
          <InputNumber defaultValue={1} min={-2.0} max={2.0} step={1} />
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
