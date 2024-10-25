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
export type IField = string;
export type IFields = IField[];
export type IValue = any;
export interface IAdminFormItem {
  component: ComponentName; // 组件类型

  formItemProps: FormItemProps;
  componentProps: IComponentProps;

  field: IField; // key
  value: IValue; // value
}
export interface IFormState {
  [key: IField]: IValue;
}

export interface FormExpose {
  // 获取所有的 fieldsValues
  getFieldsValues: () => IFormState;
  // 设置所有的 fieldsValues
  setFieldsValues: (nextFormState: IFormState) => void;
  // 重置所有的 fieldsValues
  resetFieldsValues: () => void;

  // 获取指定的 fieldValue
  getFieldValue: (field: IField) => IValue;
  // 设置指定的 fieldValue
  setFieldValue: (field: IField, value: IValue) => void;
  // 校验
  validate: () => void;
}
