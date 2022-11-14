import { InjectionKey } from 'vue'
import { uuid } from '@0x-jerry/utils'

export interface OpNode<T = any> {
  id: string
  type: string
  data?: T
}

export type FlowStore = ReturnType<typeof createStore>

export const key = Symbol() as InjectionKey<FlowStore>

function createStore(opt?: { data: any }) {
  const data = reactive({
    stack: [] as OpNode[],
    ...opt,
  })

  return {
    data,
    create(type: string) {
      const node: OpNode = {
        id: uuid(),
        type,
      }

      data.stack.push(node)

      return node
    },
    get(id: string) {
      return data.stack.find((n) => n.id === id)
    },
    update<T = any>(id: string, data: T) {
      const o = this.get(id)
      if (o) {
        o.data = data
      }
    },
  }
}

export function provideFlowStore(...args: Parameters<typeof createStore>) {
  const store = createStore(...args)
  provide(key, store)

  return store
}

export function useFlowStore() {
  const store = inject(key, null)

  return store
}
