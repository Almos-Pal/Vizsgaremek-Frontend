import { useState } from "react";

const useModal = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const open = () => setVisible(true);
  const close = () => setVisible(false);
  const toggle = () => setVisible((current) => !current);

  return {
    visible,
    open,
    close,
    toggle,
  };
};

export default useModal;
