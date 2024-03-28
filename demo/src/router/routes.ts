import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/button',
    component: () => import('@/components/button/index.vue'),
  },
]

export default routes
