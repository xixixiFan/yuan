import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import mButton from '../index.vue';

// ============================================
// 按功能分组（describe）
// ============================================
describe('Button Component', () => {
  
  // -----------------------------------------
  // 一个 it 只测一件事
  // -----------------------------------------
  
  // ========== 分组1：基础渲染 ==========
  describe('Rendering', () => {
    
    it('renders slot content correctly', () => {
      // Given-When-Then 模式
      // Given：准备数据
      const wrapper = mount(mButton, {
        slots: { default: '提交' }
      });
      // When：执行操作（挂载即渲染）
      // Then：断言结果
      expect(wrapper.text()).toBe('提交');
    });

    it('renders without slot content', () => {
      const wrapper = mount(mButton);
      // 空按钮应该也能渲染，不报错
      expect(wrapper.find('button').exists()).toBe(true);
    });
  });

  // ========== 分组2：Props 影响 ==========
  describe('Props', () => {
    
    it('applies type class', () => {
      const wrapper = mount(mButton, {
        props: { type: 'primary' }
      });
      // 测行为，不测具体样式值
      expect(wrapper.classes()).toContain('primary');
    });

    it('applies size class', () => {
      const wrapper = mount(mButton, {
        props: { size: 'small' }
      });
      expect(wrapper.classes()).toContain('small');
    });

    it('disables button when disabled is true', () => {
      const wrapper = mount(mButton, {
        props: { disabled: true }
      });
      // 验证 DOM 属性，而非视觉表现
      expect(wrapper.find('button').attributes('disabled')).toBeDefined();
    });

    it('shows loading state', () => {
      const wrapper = mount(mButton, {
        props: { 
          localing: true ,
          leftIcon: 'm-icon-edit'
        },
         slots: { default: '编辑'}
      });
      const icon = wrapper.find('i');
      expect(icon.classes()).toContain('yuan-icon-loading');  // 有旋转类
    });

    it('renders left icon', () => {
      const wrapper = mount(mButton, {
        props: { leftIcon: 'search' },
        slots: { default: '搜索' }
      });
      const icons = wrapper.findAll('i');
      // 左边第一个 i 标签
      expect(icons[0].classes()).toContain('search');
    });
  });

  // ========== 分组3：事件交互 ==========
  describe('Events', () => {
    
    it('emits click event when clicked', async () => {
      const wrapper = mount(mButton, {
        slots: { default: '点击' }
      });
      
      // 思想6：模拟用户操作
      await wrapper.find('button').trigger('click');
      
      // 验证事件被触发
      expect(wrapper.emitted('click')).toHaveLength(1);
    });

    it('does not emit click when disabled', async () => {
      const wrapper = mount(mButton, {
        props: { disabled: true }
      });
      
      await wrapper.find('button').trigger('click');
      
      // 思想7：反向测试（验证不该发生的事）
      expect(wrapper.emitted('click')).toBeFalsy();
    });

    it('does not emit click when loading', async () => {
      const wrapper = mount(mButton, {
        props: { loading: true }
      });
      
      await wrapper.find('button').trigger('click');
      
      expect(wrapper.emitted('click')).toBeFalsy();
    });
  });

  // ========== 分组4：边界条件 ==========
  describe('Edge Cases', () => {
    
    it('handles unknown type gracefully', () => {
      const wrapper = mount(mButton, {
        props: { type: 'unknown-type' }
      });
      // 应该回退到默认样式，不报错
      expect(wrapper.find('button').exists()).toBe(true);
    });

    it('handles both icons simultaneously', () => {
      const wrapper = mount(mButton, {
        props: { 
          leftIcon: 'star',
          rightIcon: 'arrow'
        },
        slots: { default: '收藏' }
      });
      const icons = wrapper.findAll('i');
      expect(icons).toHaveLength(2);
    });
  });
});