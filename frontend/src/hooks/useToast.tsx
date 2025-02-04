import { Icons } from "@/components/server";
import { toast, ToastOptions } from "react-toastify";

const toastOptions: ToastOptions<unknown> = {
  position: "top-right",
  closeOnClick: true,
  hideProgressBar: false,
  closeButton: true,
  
  style: {
    backgroundColor: "var(--color-light)",
    color: "var(--color-dark)",
  },
};

const icons = (type: string) => {
  switch (type) {
    case "success":
      return <span style={{}}>{<Icons.CheckIcon size={28} color="var(--color-success)" />}</span>;
    case "error":
      return <span style={{}}>{<Icons.CancelIcon size={28} color="var(--color-error)" />}</span>;
    case "info":
      return <span style={{}}>{<Icons.InfoIcon size={28} color="var(--color-info)"/>}</span>;
    case "warning":
      return <span style={{}}>{<Icons.WarningIcon size={28} color="var(--color-warning)"/>}</span>;
    default:
      return undefined;
  }
};

const useToast = () => {
  return {
    success: (message: string) =>
      toast.success(message, { ...toastOptions, icon: icons("success") }),
    successCreate: (message = "Sikeres létrehozás.") =>
      toast.success(message, { ...toastOptions, icon: icons("success") }),
    successDelete: (message = "Sikeres törlés.") =>
      toast.success(message, { ...toastOptions, icon: icons("success") }),
    successModify: (message = "Sikeres módosítás.") =>
      toast.success(message, { ...toastOptions, icon: icons("success") }),
    successAdd: (message = "Sikeres hozzáadás.") =>
      toast.success(message, { ...toastOptions, icon: icons("success") }),
    successSend: (message = "Sikeres küldés.") =>
      toast.success(message, { ...toastOptions, icon: icons("success") }),
    successSave: (message = "Sikeres mentés.") =>
      toast.success(message, { ...toastOptions, icon: icons("success") }),
    errorCreate: (message = "Sikertelen létrehozás.") =>
      toast.error(message, { ...toastOptions, icon: icons("error") }),
    errorDelete: (message = "Sikertelen törlés.") =>
      toast.error(message, { ...toastOptions, icon: icons("error") }),
    errorModify: (message = "Sikertelen módosítás.") =>
      toast.error(message, { ...toastOptions, icon: icons("error") }),
    errorAdd: (message = "Sikertelen hozzáadás.") =>
      toast.error(message, { ...toastOptions, icon: icons("error") }),
    errorSend: (message = "Sikertelen küldés.") =>
      toast.error(message, { ...toastOptions, icon: icons("error") }),
    errorSave: (message = "Sikertelen mentés.") =>
      toast.error(message, { ...toastOptions, icon: icons("error") }),
    error: (message: string) =>
      toast.error(message, { ...toastOptions, icon: icons("error") }),
    info: (message?: string) =>
      toast.info(message, { ...toastOptions, icon: icons("info") }),
    warning: (message?: string) =>
      toast.warning(message, { ...toastOptions, icon: icons("warning") }),
  };
};

export default useToast;
