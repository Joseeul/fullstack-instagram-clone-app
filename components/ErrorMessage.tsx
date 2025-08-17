import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";
import React, { useEffect } from "react";

type ErrorMessageProps = {
  message: any;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  const toast = useToast();

  useEffect(() => {
    if (!message) return;
    toast.show({
      placement: "bottom",
      duration: 3000,
      render: () => {
        return (
          <Toast action="error" variant="solid">
            <ToastTitle>Error!</ToastTitle>
            <ToastDescription>{message}</ToastDescription>
          </Toast>
        );
      },
    });
  }, [message]);

  return null;
};

export default ErrorMessage;
