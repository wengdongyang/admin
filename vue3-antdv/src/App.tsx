import { RouterView } from 'vue-router'
import { ConfigProvider } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { defineComponent } from 'vue'
export default defineComponent(
  () => {
    return () => (
      <ConfigProvider locale={zhCN} input={{ autocomplete: 'off' }}>
        <RouterView />
      </ConfigProvider>
    )
  },
  { name: 'App' }
)
