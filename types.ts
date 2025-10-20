
export enum AppState {
  IDLE = 'IDLE',
  UPLOADING = 'UPLOADING',
  EDITING = 'EDITING',
  PROCESSING_REMOVE = 'PROCESSING_REMOVE',
  PROCESSING_ENHANCE = 'PROCESSING_ENHANCE',
  DONE = 'DONE',
  ERROR = 'ERROR'
}

export interface ImageData {
  original: string;
  edited: string | null;
  final: string | null;
  mimeType: string;
}
