import toast from "react-hot-toast"
import { useToastStore } from "./toastStore"

export const showLoading = (message: string) => {
  return toast.loading(message)
}

export const replaceWithSuccess = (id: string, message: string) => {
  toast.success(message, { id })
}

export const replaceWithError = (id: string, message: string) => {
  toast.error(message, { id })
}

export const showSuccess = (message: string) => {
  toast.success(message)
}

export const showError = (message: string) => {
  toast.error(message)
}

export const showGlobalLoading = (message: string) => {
  const id = toast.loading(message || "Loading")
  useToastStore.getState().setLoadingId(id)
}

export const dismissGlobalLoading = () => {
  const { loadingId, setLoadingId } = useToastStore.getState()
  if (loadingId) {
    toast.dismiss(loadingId)
    setLoadingId(null)
  }
}