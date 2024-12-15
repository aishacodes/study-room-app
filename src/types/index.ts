import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactNode,
} from 'react';

export interface StudyRoom {
  id: string;
  name: string;
  lat: number;
  lng: number;
  location: string;
  capacity: number;
}
export type InputPropType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { label?: string; className?: string; error?: string };

export type ButtonPropType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  children?: ReactNode;
  variant?: 'destructive' | 'outline';
  error?: string;
  loading?: boolean;
  className?: string;
};
