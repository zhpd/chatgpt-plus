# page - 页面工具

page 工具是为了方便打开侧栏、打开弹窗，可以全局调用，无需在每个页面单独设置侧栏和弹窗的组件，通过属性控制。可全局统一管理打开和关闭。

```tsx | pure
// 打开侧栏
const ref = page.showDrawer(<div>{'侧栏内容'}</div>, {
  title: '侧栏标题',
});
// 关闭侧栏
page.closeDrawer(ref);

// 打开弹窗
const ref = page.showModal(<div>{'弹窗内容'}</div>, {
  title: '弹窗标题',
});
// 关闭弹窗
page.closeModal(ref);
```

## 代码演示

### 打开侧栏

<code src="./demos/showDrawer.tsx" iframe="200px" title="打开侧栏" desc="通过工具直接打开侧栏，渲染内容" />

### 关闭侧栏

<code src="./demos/closeDrawer.tsx" iframe="200px" title="关闭侧栏" desc="可手动关闭打开的侧栏" />

### 打开弹窗

<code src="./demos/showModal.tsx" iframe="200px" title="打开弹窗" desc="通过工具直接打开弹窗，渲染内容" />

### 关闭弹窗

<code src="./demos/closeModal.tsx" iframe="200px" title="关闭弹窗" desc="可手动关闭打开的弹窗" />

## API

### showDrawer

> 打开侧栏的方法参数

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| component | 需要呈现的组件, 编辑组件设置 setFooter 属性，可将底部操作栏放置侧栏底部 | ReactNode |
| drawerProps | 侧栏的属性，可透传 Drawer[属性](https://ant.design/components/drawer-cn/) | object | - |

### closeDrawer

> 关闭侧栏的方法参数

| 参数 | 说明                                                   | 类型            | 默认值 |
| ---- | ------------------------------------------------------ | --------------- | ------ |
| ref  | 需要关闭组件的引用，留空则关闭全部打开的侧栏           | React.RefObject |
| node | 需要关闭组件的节点，留空则关闭全部打开的侧栏，[无动画] | Element         | -      |

### showModal

> 打开弹窗的方法参数

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| component | 需要呈现的组件, 编辑组件设置 setFooter 属性，可将底部操作栏放置弹窗底部 | ReactNode |
| modalProps | 弹窗的属性，可透传 Modal[属性](https://ant.design/components/modal-cn/) | object | - |

### closeModal

> 关闭弹窗的方法参数

| 参数 | 说明                                                   | 类型            | 默认值 |
| ---- | ------------------------------------------------------ | --------------- | ------ |
| ref  | 需要关闭组件的引用，留空则关闭全部打开的弹窗           | React.RefObject |
| node | 需要关闭组件的节点，留空则关闭全部打开的弹窗，[无动画] | Element         | -      |
