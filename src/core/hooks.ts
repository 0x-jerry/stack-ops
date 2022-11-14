export function useNodeContext<T extends {}>(defaultValue: T) {
  const ins = getCurrentInstance()

  const propsData = ins?.props.data || {}

  const data = reactive({
    ...defaultValue,
    ...propsData,
  })

  watch(
    data,
    (v) => {
      ins?.emit('update:value', v)
    },
    { deep: true },
  )

  return data
}
