import React from "react";
import clsx from "clsx";
import "./Message.css";

type Variant = "default" | "warning" | "success" | "error";

interface MessageProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string; // rendu conditionnel donc optionnel
  variant?: Variant;
  className?: string;
}

export const Message: React.FC<MessageProps> = ({
  message,
  variant = "default",
  className,
  ...props
}) => {
  if (!message) return null; // ⚡ ne rien rendre si message vide

  return (
    <div
      className={clsx("message", `message-${variant}`, className)}
      role="alert"
      {...props}
    >
      {message}
    </div>
  );
};
