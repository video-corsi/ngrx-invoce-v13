export interface HttpStatus {
  reason: string | null;
  type: StatusType | null;
}

export type StatusType = 'success' | 'error';
