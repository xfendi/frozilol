import React from "react";
import Loader from "@/components/global/loader";

import { IoIosClose } from "react-icons/io";

interface ModalProps {
  title: string;
  isOpen?: boolean;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose?: () => void;
  isSending?: boolean;
  content?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  title,
  isOpen,
  onSubmit,
  onClose,
  isSending,
  content,
}) => {
  return (
    <>
      <div className={`modal-bg ${isOpen ? "show" : ""}`}></div>
      <div className={`form-modal form__box ${isOpen ? "show" : ""}`}>
        <div className="form__top">
          <div className="form__top-text">
            <div className="form__top-title">{title}</div>
          </div>
          <button
            type="button"
            className="btn-opacity !p-0.5 !rounded-[8px]"
            onClick={onClose}
            title="Close modal"
          >
            <IoIosClose size={24} />
          </button>
        </div>
        <form onSubmit={onSubmit} className={`form ${!onSubmit && "!gap-0"}`}>
          {content}

          <div className="flex flex-row gap-[10px]">
            {onSubmit && (
              <button type="submit" className="btn-primary flex-1">
                {isSending ? <Loader white /> : <p>Submit</p>}
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Modal;
