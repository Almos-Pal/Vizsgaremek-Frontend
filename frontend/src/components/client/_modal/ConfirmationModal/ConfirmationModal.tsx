
import ReactDOM from 'react-dom';
import Button from "../../Button/Button";

import Modal from "../../_modal/Modal/Modal";
import {Text} from "@/components/server";

interface ConfirmationModalProps {
    visible: boolean;
    title: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
    }

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  title,
  onConfirm,
  onCancel,
  confirmText = "Igen",
  cancelText = "Nem",
}) => {
  return (
    <Modal
      showCloseButton={false}
      visible={visible}
      title={title}
      onClose={onCancel}
    >
      <div className="flex flex-col gap-8 align-center justify-center text-center">
        
        <div className="flex gap-8 align-center justify-center mt-7">
          <Button
            type="button"
            onClick={onConfirm}
            color="primary"
            additionalClassName="w-32"
          >
            {confirmText}
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            color="secondary"
            additionalClassName="w-32"
          >
            {cancelText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;