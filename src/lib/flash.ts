export type FlashType = "success" | "error"

interface FlashMessage {
  message: string
  type: FlashType
}

const FLASH_KEY = "app_flash"

export const setFlash = (type: FlashType, message: string) => {
  sessionStorage.setItem(
    FLASH_KEY,
    JSON.stringify({ type, message })
  )
}

export const consumeFlash = (): FlashMessage | null => {
  const raw = sessionStorage.getItem(FLASH_KEY)
  if (!raw) return null

  sessionStorage.removeItem(FLASH_KEY)
  return JSON.parse(raw)
}
