import DefaultTheme from 'vitepress/theme';
import './custom.css';

import YuanUI from '../../../dist/yuan-ui.es.js';
import '../../../dist/style.css';

const yuanComponents = [
  YuanUI.mButton,
  YuanUI.mInput,
  YuanUI.mTable,
  YuanUI.mSelect,
  YuanUI.mDropdown,
  YuanUI.mRadio,
  YuanUI.mCheckbox,
  YuanUI.mModal,
  YuanUI.mDrawer,
  YuanUI.mSwitch,
  YuanUI.mTree,
  YuanUI.mOptfile,
  YuanUI.mTextarea,
  YuanUI.mRow,
  YuanUI.mCol,
  YuanUI.mPagination,
  YuanUI.mDate,
  YuanUI.mBacktop,
  YuanUI.mCollapse,
  YuanUI.mCollapseItem,
  YuanUI.mMenu,
  YuanUI.mTabs,
  YuanUI.mSpace,
  YuanUI.mPopover,
  YuanUI.mProgress,
  YuanUI.mColorPicker,
  YuanUI.mBreadcrumb,
  YuanUI.mBadge,
  YuanUI.mDivider,
];

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    yuanComponents.forEach((component) => {
      if (component && component.name) {
        app.component(component.name, component);
      }
    });
  }
};
