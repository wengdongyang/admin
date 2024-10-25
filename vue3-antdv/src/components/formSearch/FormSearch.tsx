/** @format */

import styles from './FormSearch.less';

import * as lodash from 'lodash';
import { get, set } from '@vueuse/core';
import { defineComponent, nextTick, onMounted, ref } from 'vue';
// apis
// hooks
// utils
// types
import type { FormInstance } from 'ant-design-vue';
import type { SlotsType } from 'vue';
import type { IAdminFormItem, IField, IFormState, IValue } from './FormSearch.d';
// stores
// mixins
// configs
// components

const createDefaultValues = (formConfigs: IAdminFormItem[]): IFormState => {
  try {
    const defaultValues = {};
    formConfigs.forEach((formConfig) => {
      switch (formConfig.component) {
        case 'Input':
        case 'InputNumber':
          lodash.set(defaultValues, formConfig.field, formConfig.value || null);
          break;
        case 'Select':
          lodash.set(defaultValues, formConfig.field, formConfig.value || null);
          break;
        case 'DatePicker':
        case 'AutoComplete':
        case 'Cascader':
        case 'Checkbox':
        case 'Radio':
        case 'Switch':
        case 'TimePicker':
        case 'TreeSelect':
        case 'Wangeditor':
        case 'JsonEditor':
        case 'UploadImg':
        case 'UploadImgs':
        case 'UploadFile':
        case 'Custom':
        default:
          lodash.set(defaultValues, formConfig.field, formConfig.value || null);
          break;
      }
    });

    return defaultValues;
  } catch (error) {
    return {};
  }
};

interface IProps {
  formConfigs: IAdminFormItem[];
  initialValues?: IFormState;
  values: IFormState;
}
export default defineComponent(
  (props: IProps, { slots, emit, expose }) => {
    const formRef = ref<FormInstance>();
    const domRef = ref<HTMLDivElement>();

    const { formConfigs = [] } = props;
    const fieldsValues = ref<IFormState>({});

    const initFormState = () => {
      try {
        const nextFieldsValues = Object.assign({}, createDefaultValues(props.formConfigs), props.initialValues);
        set(fieldsValues, nextFieldsValues);
        emit('update:values', nextFieldsValues);
      } catch (error) {
        console.warn(error);
      }
    };

    const getFieldsValues = () => {
      try {
        return get(fieldsValues);
      } catch (error) {
        console.warn(error);
      }
    };

    const setFieldsValues = (nextFormState: IFormState) => {
      try {
        set(fieldsValues, nextFormState);
        emit('update:values', nextFormState);
      } catch (error) {
        console.warn(error);
      }
    };

    const resetFieldsValues = () => {
      try {
        const nextFieldsValues = Object.assign({}, createDefaultValues(props.formConfigs), props.initialValues);
        set(fieldsValues, nextFieldsValues);
        emit('update:values', nextFieldsValues);
      } catch (error) {
        console.warn(error);
      }
    };
    const getFieldValue = (field: string) => {
      try {
        return get(fieldsValues, field);
      } catch (error) {
        console.warn(error);
      }
    };
    const setFieldValue = (field: IField, value: IValue) => {
      try {
        const prevFieldsValues = get(fieldsValues);
        const nextFieldsValues = Object.assign({}, prevFieldsValues, { [field]: value });
        set(fieldsValues, nextFieldsValues);
        emit('update:values', nextFieldsValues);
      } catch (error) {
        console.warn(error);
      }
    };
    const validate = () => {};

    onMounted(async () => {
      await nextTick();
      await initFormState();
    });

    expose({ getFieldsValues, setFieldsValues, resetFieldsValues, getFieldValue, setFieldValue, validate });

    const renderFormItemInput = (formConfig: IAdminFormItem) => {
      const field = lodash.get(formConfig, 'field');
      return (
        <a-form-item class={styles['form-item']} {...formConfig.formItemProps} name={field}>
          <a-input
            class={styles['input']}
            {...formConfig.componentProps}
            value={getFieldValue(field)}
            onUpdate:value={(nextValue: any) => {
              setFieldValue(field, nextValue);
            }}
            allowClear
          />
        </a-form-item>
      );
    };
    const renderFormItemInputNumber = (formConfig: IAdminFormItem) => {
      const field = lodash.get(formConfig, 'field');
      return (
        <a-form-item class={styles['form-item']} {...formConfig.formItemProps} name={field}>
          <a-input-number
            class={styles['input-number']}
            {...formConfig.componentProps}
            value={getFieldValue(field)}
            onUpdate:value={(nextValue: any) => {
              setFieldValue(field, nextValue);
            }}
            allowClear
          />
        </a-form-item>
      );
    };
    const renderFormItemSelect = (formConfig: IAdminFormItem) => {
      const field = lodash.get(formConfig, 'field');
      return (
        <a-form-item class={styles['form-item']} {...formConfig.formItemProps} name={field}>
          <a-select
            class={styles['select']}
            {...formConfig.componentProps}
            getPopupContainer={() => get(domRef)}
            value={getFieldValue(field)}
            onUpdate:value={(nextValue: any) => {
              setFieldValue(field, nextValue);
            }}
            allowClear
          />
        </a-form-item>
      );
    };

    const renderFormItemDatePicker = (formConfig: IAdminFormItem) => {
      const field = lodash.get(formConfig, 'field');
      const format = lodash.get(formConfig, ['componentProps', 'format']) || 'YYYY-MM-DD';
      const valueFormat = lodash.get(formConfig, ['componentProps', 'valueFormat']);
      return (
        <a-form-item class={styles['form-item']} {...formConfig.formItemProps} name={field}>
          <a-date-picker
            class={styles['date-picker']}
            {...formConfig.componentProps}
            getPopupContainer={() => get(domRef)}
            value={getFieldValue(field)}
            onUpdate:value={(nextValue: any) => {
              setFieldValue(field, nextValue);
            }}
            format={format}
            valueFormat={valueFormat || format}
            allowClear
          />
        </a-form-item>
      );
    };

    const renderFormItemCustom = (formConfig: IAdminFormItem) => {
      const field = lodash.get(formConfig, 'field');
      return slots?.renderFormItem({ formState: get(fieldsValues), field });
    };

    return () => {
      return (
        <section class={styles['form-content']} ref={domRef}>
          <a-form ref={formRef} class={styles['form']} layout={'inline'} model={fieldsValues.value}>
            {formConfigs?.map((formConfig: IAdminFormItem) => {
              switch (formConfig.component) {
                case 'Input':
                  return renderFormItemInput(formConfig);
                case 'InputNumber':
                  return renderFormItemInputNumber(formConfig);
                case 'Select':
                  return renderFormItemSelect(formConfig);
                case 'DatePicker':
                  return renderFormItemDatePicker(formConfig);
                default:
                  return renderFormItemCustom(formConfig);
              }
            })}
            <a-form-item class={styles['form-item']}>
              <a-button type={'primary'} htmlType={'submit'}>
                搜索
              </a-button>
            </a-form-item>
            <a-form-item class={styles['form-item']}>
              <a-button type={'default'}>重置</a-button>
            </a-form-item>
          </a-form>
        </section>
      );
    };
  },
  {
    name: 'AdminFormInline',
    emits: ['update:values'],
    slots: Object as SlotsType<{ renderFormItem: { formState: IFormState; field: string } }>,
    props: {
      formConfigs: { type: Array, required: true, default: () => [] },
      values: { type: Object, required: true, default: () => {} },
      initialValues: { type: Object, required: false, default: () => {} },
    },
  },
);
