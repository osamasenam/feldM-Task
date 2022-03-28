import { useFetch } from '@vueuse/core'

export function getApi() {
  return useFetch('https://api.publicapis.org/entries').get().json()
}
