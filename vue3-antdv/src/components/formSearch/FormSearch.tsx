/** @format */

import styles from './FormSearch.less';

import lodash from 'lodash';
import { get, set } from '@vueuse/core';
import { message, Form, FormItem, Input, Select } from 'ant-design-vue';
import { nextTick, onMounted, ref, reactive, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
// apis
// hooks
// utils
// types
import type { SlotsType } from 'vue';
import type { FormInstance } from 'ant-design-vue';
import type { IAdminFormItem, IFormState } from './FormSearch.d';
// stores
// mixins
// configs
// components

const createDefaultValues = (formConfigs: IAdminFormItem[]): IFormState => {
  try {
    const defaultValues = {};
    formConfigs.forEach((formConfig) => {
      lodash.set(defaultValues, formConfig.formItemProps.name, null);
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

    const { formConfigs = [], values = {}, initialValues = {} } = props;
    const formState = ref<IFormState>({});

    const initFormState = () => {
      try {
        if (values && !lodash.isEmpty(values)) {
          const nextFormState = values;
          formState.value = nextFormState;
          emit('update:values', nextFormState);
          return;
        }
        if (initialValues && !lodash.isEmpty(initialValues)) {
          const nextFormState = initialValues;
          formState.value = nextFormState;
          emit('update:values', nextFormState);
          return;
        }
        const nextFormState = createDefaultValues(formConfigs);
        formState.value = nextFormState;
        emit('update:values', nextFormState);
      } catch (error) {
        console.warn(error);
      }
    };

    const resetFields = () => {
      try {
        if (initialValues && !lodash.isEmpty(initialValues)) {
          const nextFormState = initialValues;
          formState.value = nextFormState;
          emit('update:values', nextFormState);
          return;
        }
        const nextFormState = createDefaultValues(formConfigs);
        formState.value = nextFormState;
        emit('update:values', nextFormState);
      } catch (error) {
        console.warn(error);
      }
    };

    const setFieldsValue = (values: IFormState) => {
      try {
        if (values && !lodash.isEmpty(values)) {
          const nextFormState = values;
          formState.value = nextFormState;
          emit('update:values', nextFormState);
        }
      } catch (error) {
        console.warn(error);
      }
    };

    const validate = () => {};

    onMounted(async () => {
      await nextTick();
      await initFormState();
    });

    expose({ resetFields, setFieldsValue, validate });

    const renderFormItemInput = (formConfig: IAdminFormItem) => {
      const name = lodash.get(formConfig, ['formItemProps', 'name']);
      return (
        <a-form-item class={styles['form-item']} {...formConfig.formItemProps} name={name}>
          <a-input
            class={styles['input']}
            {...formConfig.componentProps}
            value={formState.value[name]}
            onUpdate:value={(nextValue: any) => {
              formState.value[name] = nextValue;
            }}
            allowClear
          />
        </a-form-item>
      );
    };
    const renderFormItemInputNumber = (formConfig: IAdminFormItem) => {
      const name = lodash.get(formConfig, ['formItemProps', 'name']);
      return (
        <a-form-item class={styles['form-item']} {...formConfig.formItemProps} name={name}>
          <a-input-number
            class={styles['input-number']}
            {...formConfig.componentProps}
            value={formState.value[name]}
            onUpdate:value={(nextValue: any) => {
              formState.value[name] = nextValue;
            }}
            allowClear
          />
        </a-form-item>
      );
    };
    const renderFormItemSelect = (formConfig: IAdminFormItem) => {
      const name = lodash.get(formConfig, ['formItemProps', 'name']);
      return (
        <a-form-item class={styles['form-item']} {...formConfig.formItemProps} name={name}>
          <a-select
            class={styles['select']}
            {...formConfig.componentProps}
            getPopupContainer={() => domRef.value}
            value={formState.value[name]}
            onUpdate:value={(nextValue: any) => {
              formState.value[name] = nextValue;
            }}
            allowClear
          />
        </a-form-item>
      );
    };

    const renderFormItemDatePicker = (formConfig: IAdminFormItem) => {
      const name = lodash.get(formConfig, ['formItemProps', 'name']);
      const format = lodash.get(formConfig, ['componentProps', 'format']) || 'YYYY-MM-DD';
      const valueFormat = lodash.get(formConfig, ['componentProps', 'valueFormat']);
      return (
        <a-form-item class={styles['form-item']} {...formConfig.formItemProps} name={name}>
          <a-date-picker
            class={styles['date-picker']}
            {...formConfig.componentProps}
            getPopupContainer={() => domRef.value}
            value={formState.value[name]}
            onUpdate:value={(nextValue: any) => {
              formState.value[name] = nextValue;
            }}
            format={format}
            valueFormat={valueFormat || format}
            allowClear
          />
        </a-form-item>
      );
    };

    const renderFormItemCustom = (formConfig: IAdminFormItem) => {
      const name = lodash.get(formConfig, ['formItemProps', 'name']);
      return slots?.renderFormItem({ formState: formState.value, name });
    };

    return () => {
      return (
        <section class={styles['form-content']} ref={domRef}>
          <a-form ref={formRef} class={styles['form']} layout={'inline'} model={formState.value}>
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
    slots: Object as SlotsType<{ renderFormItem: { formState: IFormState; name: string } }>,
    props: {
      formConfigs: { type: Array, required: true, default: () => [] },
      values: { type: Object, required: true, default: () => {} },
      initialValues: { type: Object, required: false, default: () => {} },
    },
  },
);
