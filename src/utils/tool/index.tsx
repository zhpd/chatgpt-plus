/* eslint-disable react/display-name */
import { DrawerProps, ModalProps, Space } from 'antd'
import { Modal } from 'antd'
import { Drawer } from 'antd'
import { ReactNode, useRef } from 'react'
import { useImperativeHandle } from 'react'
import { useEffect } from 'react'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { nanoid } from 'nanoid'
import './index.less'

let global_drawer_nodes: HTMLDivElement[] = [],
  global_modal_nodes: HTMLDivElement[] = []

/**
 * 引用对象
 */
interface CommonRefObj {
  /** 渲染的节点node */
  node: Element
  /** 关闭方法 */
  close: () => void
}

// 侧栏属性
interface DrawerPr extends DrawerProps {
  ref: any
  node: Element
}
/**
 * 侧栏显示组件信息
 * @param params
 */
const RenderDrawer: React.FC<DrawerPr> = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    // 延迟加载显示
    setTimeout(() => {
      setVisible(true)
    }, 50)
  }, [])

  useImperativeHandle(ref, () => ({
    node: props.node,
    close: () => {
      setVisible(false)
    },
  }))
  return (
    <Drawer
      destroyOnClose={true}
      title={props?.title || ''}
      placement={props?.placement || 'right'}
      size={props?.size || 'large'}
      onClose={(e) => {
        setVisible(false)
        if (props?.onClose) {
          props.onClose(e)
        }
      }}
      {...props}
      visible={visible}
    >
      {props.children}
    </Drawer>
  )
})

/**
 * 全局侧栏显示方法
 * @param dom 渲染内容
 * @param drawerProps 侧栏属性
 * @return 返回引用ref，可以调用close方法关闭
 */
export function showDrawer(dom: ReactNode, drawerProps: DrawerProps): React.RefObject<CommonRefObj> {
  const ref = React.createRef<any>()
  const id = new Date().getTime()
  const node = document.createElement('div')
  node.setAttribute('id', '' + id)
  document.body.appendChild(node)
  if (!global_drawer_nodes) {
    global_drawer_nodes = []
  }
  const _nn: any = {
    node: node,
    ref: ref,
  }
  global_drawer_nodes.push(_nn)

  // 弹窗属性
  let _dom = dom
  let _drawerProps = {
    footerStyle: { display: 'flex', justifyContent: 'flex-end' },
    ...drawerProps,
  }
  // 获取组件属性
  if (React.isValidElement(_dom)) {
    // 获取属性
    console.log('获取组件属性', _dom?.props)
    // 设置底部按钮
    // @ts-ignore
    if (_dom?.props?.setFooter) {
      const targetId = '_' + nanoid()
      _dom = React.cloneElement(_dom, {
        // @ts-ignore
        submitTargetId: targetId,
      })
      if (_drawerProps?.footer) {
        if (Array.isArray(_drawerProps.footer)) {
          _drawerProps.footer.push(<span key={targetId} id={targetId} className="drawerFooterBtn" style={{ marginLeft: '10px' }} />)
        }
        if (React.isValidElement(_drawerProps.footer)) {
          _drawerProps.footer = [_drawerProps.footer, <span key={targetId} id={targetId} className="drawerFooterBtn" style={{ marginLeft: '10px' }} />]
        }
        // 循环添加key
        if (Array.isArray(_drawerProps.footer)) {
          _drawerProps.footer = _drawerProps.footer.map((item: any) => {
            if (React.isValidElement(item)) {
              return React.cloneElement(item, {
                key: nanoid(),
              })
            }
            return item
          })
        }
      } else {
        _drawerProps.footer = <span key={targetId} id={targetId} className="drawerFooterBtn" />
      }
    }
  }

  console.log('showDrawer _', _dom, _drawerProps)
  ReactDOM.render(
    <RenderDrawer ref={ref} node={node} {..._drawerProps}>
      {_dom}
    </RenderDrawer>,
    node
  )
  // const xx = ReactDOM.createPortal(<RenderDrawer {..._drawerProps}>{dom}</RenderDrawer>, document.body);
  // ReactDOM.render(<>{xx.children}</>, node);
  return ref
}

/**
 * 全局侧栏关闭
 * @param ref 关闭引用的组件|留空关闭全部引用的组件
 * @param node 关闭的节点|留空关闭全部节点
 */
export function closeDrawer(ref?: React.RefObject<CommonRefObj> | null, node?: Element | null) {
  if (!global_drawer_nodes) {
    global_drawer_nodes = []
  }
  if (!ref && !node) {
    // 全局清理
    global_drawer_nodes.map((item: any) => {
      if (item?.ref) {
        item.ref?.current?.close()
      } else {
        ReactDOM.unmountComponentAtNode(item?.node)
      }
    })
  } else {
    if (ref && ref.current) {
      ref?.current?.close()
    }
    if (node) {
      ReactDOM.unmountComponentAtNode(node)
    }
  }
}

// 弹窗属性
interface ModalPr extends ModalProps {
  ref: any
  node: Element
}
/**
 * 弹窗显示组件信息
 * @param params
 */
const RenderModal: React.FC<ModalPr> = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  const _ref = useRef<any>()
  useEffect(() => {
    // 延迟加载显示
    setTimeout(() => {
      setVisible(true)
    }, 50)
  }, [])

  useImperativeHandle(ref, () => ({
    node: props.node,
    close: () => {
      setVisible(false)
    },
  }))

  return (
    <Modal
      destroyOnClose={true}
      title={props?.title || ''}
      width={props?.width || 720}
      bodyStyle={{
        maxHeight: window.innerHeight / 1.5 + 'px',
        overflowY: 'auto',
        ...props?.bodyStyle,
      }}
      centered={true}
      onCancel={(e) => {
        setVisible(false)
        if (props?.onCancel) {
          props.onCancel(e)
        }
      }}
      onOk={(e) => {
        setVisible(false)
        if (props?.onOk) {
          props.onOk(e)
        }
      }}
      {...props}
      visible={visible}
    >
      {props.children}
    </Modal>
  )
})

/**
 * 全局弹窗显示方法
 * @param dom 渲染内容
 * @param modalProps 弹窗属性
 * @return 返回引用ref，可以调用close方法关闭
 */
export function showModal(dom: ReactNode, modalProps: ModalProps): React.RefObject<CommonRefObj> {
  const ref = React.createRef<any>()
  const id = new Date().getTime()
  const node = document.createElement('div')
  node.setAttribute('id', '' + id)
  document.body.appendChild(node)
  if (!global_modal_nodes) {
    global_modal_nodes = []
  }
  const _nn: any = {
    node: node,
    ref: ref,
  }
  global_modal_nodes.push(_nn)

  // 弹窗属性
  let _dom = dom
  let _modalProps = { ...modalProps }
  // 获取组件属性
  if (React.isValidElement(_dom)) {
    // 获取属性
    console.log('获取组件属性', _dom?.props)
    // 设置底部按钮
    // @ts-ignore
    if (_dom?.props?.setFooter) {
      const targetId = '_' + nanoid()
      _dom = React.cloneElement(_dom, {
        // @ts-ignore
        submitTargetId: targetId,
      })
      if (_modalProps?.footer) {
        if (Array.isArray(_modalProps.footer)) {
          _modalProps.footer.push(<span key={targetId} id={targetId} style={{ marginLeft: '10px' }} />)
        }
        if (React.isValidElement(_modalProps.footer)) {
          _modalProps.footer = [_modalProps.footer, <span key={targetId} id={targetId} style={{ marginLeft: '10px' }} />]
        }
        // 循环添加key
        if (Array.isArray(_modalProps.footer)) {
          _modalProps.footer = _modalProps.footer.map((item: any) => {
            if (React.isValidElement(item)) {
              return React.cloneElement(item, {
                key: nanoid(),
              })
            }
            return item
          })
        }
      } else {
        _modalProps.footer = <span key={targetId} id={targetId} />
      }
    }
  }

  console.log('showModal _', _dom, _modalProps)
  ReactDOM.render(
    <RenderModal ref={ref} node={node} {..._modalProps}>
      {_dom}
    </RenderModal>,
    node
  )
  // const xx = ReactDOM.createPortal(<RenderModal {..._modalProps}>{dom}</RenderModal>, document.body);
  // ReactDOM.render(<>{xx.children}</>, node);
  return ref
}

/**
 * 全局弹窗关闭
 * @param ref 关闭引用的组件|留空关闭全部引用的组件
 * @param node 关闭的节点|留空关闭全部节点
 */
export function closeModal(ref?: React.RefObject<CommonRefObj> | null, node?: Element | null) {
  if (!global_modal_nodes) {
    global_modal_nodes = []
  }
  if (!ref && !node) {
    // 全局清理
    global_modal_nodes.map((item: any) => {
      if (item?.ref) {
        item.ref?.current?.close()
      } else {
        ReactDOM.unmountComponentAtNode(item?.node)
      }
    })
  } else {
    if (ref && ref.current) {
      ref?.current?.close()
    }
    if (node) {
      ReactDOM.unmountComponentAtNode(node)
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  showDrawer,
  closeDrawer,
  showModal,
  closeModal,
}