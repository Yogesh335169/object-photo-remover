
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const combineImageAndMask = (imageElement: HTMLImageElement, maskCanvas: HTMLCanvasElement): Promise<string> => {
    return new Promise((resolve) => {
        const outputCanvas = document.createElement('canvas');
        const ctx = outputCanvas.getContext('2d');
        if (!ctx) {
            return resolve('');
        }
        
        outputCanvas.width = imageElement.naturalWidth;
        outputCanvas.height = imageElement.naturalHeight;

        ctx.drawImage(imageElement, 0, 0, imageElement.naturalWidth, imageElement.naturalHeight);
        ctx.drawImage(maskCanvas, 0, 0, imageElement.naturalWidth, imageElement.naturalHeight);
        
        resolve(outputCanvas.toDataURL('image/png'));
    });
};
