/// <reference types="react" />
import React from 'react';
export interface InputBoxProps {
    onConfirm?: (value: string) => void;
    title?: string;
    initialValue?: string;
    placeholder?: string;
    maxLength?: number;
    minLength?: number;
}