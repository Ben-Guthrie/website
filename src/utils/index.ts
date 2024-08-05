export function scrollToElement(id: string) {
  const element = document.getElementById(id)
  element?.scrollIntoView({
    block: 'start',
    behavior: 'smooth'
  })
}
