export {};

interface SnapOptions {
  embedId: string;
  onSuccess?: (result: Record<string, unknown>) => void;
  onPending?: (result: Record<string, unknown>) => void;
  onError?: (result: Record<string, unknown>) => void;
  onClose?: () => void;
}

declare global {
  interface Window {
    snap: {
      embed: (token: string, options: SnapOptions) => void;
    };
  }
}