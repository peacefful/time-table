import router from '@/router'

export const outSystem = () => {
  localStorage.clear()
  router.push('/')
}
