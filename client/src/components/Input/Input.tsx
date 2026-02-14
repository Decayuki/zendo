import React, { forwardRef } from "react";
import "./Input.css";
import clsx from "clsx";

type Variant = "default" | "error" | "success";
type Size = "sm" | "md" | "lg";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    variant?: Variant;
    inputSize?: Size;
    fullWidth?: boolean;
    onValueChange?: (value: string) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            error,
            helperText,
            variant = "default",
            inputSize = "md",
            fullWidth = false,
            onValueChange,
            className,
            ...props
        },
        ref
    ) => {
        const computedVariant = error ? "error" : variant;

        return (
            <div className={clsx("input-wrapper", { "full-width": fullWidth })}>
                {label && <label className="input-label">{label}</label>}

                <input
                    ref={ref}
                    className={clsx(
                        "input",
                        `input-${computedVariant}`,
                        `input-${inputSize}`,
                        className
                    )}
                    onChange={(e) => {
                        props.onChange?.(e);
                        onValueChange?.(e.target.value);
                    }}
                    {...props}
                />

                {error && <p className="input-error">{error}</p>}
                {!error && helperText && (
                    <p className="input-helper">{helperText}</p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";
