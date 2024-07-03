import { useState } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    loading: false,
    error: null,
    success: false,
  });

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setModalContent({ loading: false, error: null, success: false });
  };

  const setContent = (content) => setModalContent(content);

  return {
    isOpen,
    openModal,
    closeModal,
    modalContent,
    setContent,
  };
};

export default useModal;
