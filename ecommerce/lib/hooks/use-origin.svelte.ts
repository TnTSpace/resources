import { browser } from "$app/environment"
 
export class Origin {
  #origin: string = $state('')
  constructor() {
    this.#origin = this.getOrigin()

    $effect(() => {
      if (browser) {
        this.#origin = this.getOrigin()
      }
    })
  }

  get origin () {
    return this.#origin
  }

  getOrigin() {
    return typeof window !== 'undefined' && window.location.origin ? window.location.origin : ''
  }
}

export function useOrigin() {
  const or = new Origin()

  return { origin: or.origin }
}