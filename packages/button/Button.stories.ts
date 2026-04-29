import type { Meta, StoryObj } from '@storybook/vue3';
import mButton from './index.vue';

const meta: Meta<typeof mButton> = {
  title: 'Components/Button',
  component: mButton,
  tags: ['autodocs'],
   argTypes: {
    // 基础类型
    type: {
      control: 'select',
      options: ['default', 'primary', 'success', 'danger', 'warning', 'dashed', 'text'],
    },
    // 尺寸
    size: {
      control: 'radio',
      options: ['large', 'medium', 'small', 'mini'],
    },
    // 布尔属性
    disabled: { control: 'boolean' },
    round: { control: 'boolean' },
    loading: { control: 'boolean' },
    // 图标
    leftIcon: { control: 'text' },   // 图标类名，如 "m-icon-edit"
    rightIcon: { control: 'text' },
    // 事件
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
//Controls 面板 会读取这里，生成 type 的下拉选择框,用户修改 Controls 后，新的值会作为参数传给 render函数
  args: {
    type: 'primary',
  },
  render: (args) => ({
    components: { mButton }, // 注册局部组件
    setup() {return { args }; },// 把 args 暴露给模板
    template: '<mButton v-bind="args">主要按钮</mButton>',
  }),
};

export const Success: Story = {
  args: {
    type: 'success',
  },
  render: (args) => ({
    components: { mButton },
    setup() {
      return { args };
    },
    template: '<mButton v-bind="args">成功按钮</mButton>',
  }),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    components: { mButton },
    setup() {
      return { args };
    },
    template: '<mButton v-bind="args">禁用按钮</mButton>',
  }),
};

export const Round: Story = {
  args: {
    round: true,
    type: 'primary',
  },
  render: (args) => ({
    components: { mButton },
    setup() {
      return { args };
    },
    template: '<mButton v-bind="args">圆角按钮</mButton>',
  }),
};

export const Loading: Story = {
  args: {
    loading: true,
  },
  render: (args) => ({
    components: { mButton },
    setup() {
      return { args };
    },
    template: '<mButton v-bind="args">加载中...</mButton>',
  }),
};