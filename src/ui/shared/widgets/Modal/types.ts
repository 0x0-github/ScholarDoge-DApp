export interface ModalTheme {
    background: string;
    color: string;
}

export type Handler = () => void;

export interface InjectedProps {
    onDismiss?: Handler;
}
