export const createThumbnail = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const maxSize = 200;
            const scale = Math.min(maxSize / img.width, maxSize / img.height);
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;
            const ctx = canvas.getContext('2d');
            if (!ctx) return reject(new Error('Canvas context is null'));
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            canvas.toBlob(
                blob => {
                    if (blob) resolve(blob);
                    else reject(new Error('Failed to create thumbnail'));
                },
                'image/jpeg',
                0.7
            );
        };
        img.onerror = () => reject(new Error('Failed to load image'));
    });
};
