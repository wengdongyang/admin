/** @format */
import type { FormItemProps } from 'ant-design-vue/lib/form';
// apis
// hooks
// utils
// stores
// mixins
// configs
// components
// 组件类型
export type ComponentName =
  | 'Input'
  | 'InputNumber'
  | 'Select'
  | 'DatePicker'
  | 'AutoComplete'
  | 'Cascader'
  | 'Checkbox'
  | 'Radio'
  | 'Switch'
  | 'TimePicker'
  | 'TreeSelect'
  | 'Wangeditor'
  | 'JsonEditor'
  | 'UploadImg'
  | 'UploadImgs'
  | 'UploadFile'
  | 'Custom';

export type IComponentProps = {};

export interface IAdminFormItem {
  component: ComponentName; // 组件类型
  formItemProps: FormItemProps & { name: string };
  componentProps: IComponentProps;
}

export interface IFormState {
  [key: string]: any;
}

export interface FormExpose {
  resetFields: () => void;
  setFieldsValue: (values: IFormState) => void;
  validate: () => void;
}
