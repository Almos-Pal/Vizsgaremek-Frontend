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
  const getMessage = (defaultMsg: string, field?: string) =>
    field ? `${field} sikeresen ${defaultMsg}.` : `${defaultMsg}.`;

  return {
    success: (message: string, field?: string) =>
      toast.success(getMessage(message, field), { ...toastOptions, icon: icons("success") }),
    successCreate: (message = "létrehozva", field?: string) =>
      toast.success(getMessage(message, field), { ...toastOptions, icon: icons("success") }),
    successDelete: (message = "törölve", field?: string) =>
      toast.success(getMessage(message, field), { ...toastOptions, icon: icons("success") }),
    successModify: (message = "módosítva", field?: string) =>
      toast.success(getMessage(message, field), { ...toastOptions, icon: icons("success") }),
    successAdd: (message = "hozzáadva", field?: string) =>
      toast.success(getMessage(message, field), { ...toastOptions, icon: icons("success") }),
    successSend: (message = "elküldve", field?: string) =>
      toast.success(getMessage(message, field), { ...toastOptions, icon: icons("success") }),
    successSave: (message = "elmentve", field?: string) =>
      toast.success(getMessage(message, field), { ...toastOptions, icon: icons("success") }),
    errorCreate: (message = "létrehozása sikertelen", field?: string) =>
      toast.error(getMessage(message, field), { ...toastOptions, icon: icons("error") }),
    errorDelete: (message = "törlése sikertelen", field?: string) =>
      toast.error(getMessage(message, field), { ...toastOptions, icon: icons("error") }),
    errorModify: (message = "módosítása sikertelen", field?: string) =>
      toast.error(getMessage(message, field), { ...toastOptions, icon: icons("error") }),
    errorAdd: (message = "hozzáadása sikertelen", field?: string) =>
      toast.error(getMessage(message, field), { ...toastOptions, icon: icons("error") }),
    errorSend: (message = "elküldése sikertelen", field?: string) =>
      toast.error(getMessage(message, field), { ...toastOptions, icon: icons("error") }),
    errorSave: (message = "mentése sikertelen", field?: string) =>
      toast.error(getMessage(message, field), { ...toastOptions, icon: icons("error") }),
    error: (message: string, field?: string) =>
      toast.error(getMessage(message, field), { ...toastOptions, icon: icons("error") }),
    info: (message?: string, field?: string) =>
      toast.info(getMessage(message || "", field), { ...toastOptions, icon: icons("info") }),
    warning: (message?: string, field?: string) =>
      toast.warning(getMessage(message || "", field), { ...toastOptions, icon: icons("warning") }),
  };
};


export default useToast;
