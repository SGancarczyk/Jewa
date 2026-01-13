import { PlaceholderImage } from "../../support/OfferTemplate/PlaceholderImage";
import { useEffect, useRef, useState } from "react";
import './SelectedImagesDisplay.css';

export interface ImageItem {
    file: File;
    previewUrl: string;
}

interface SelectedImagesDisplayProps {
    selectedImages: ImageItem[];
    setSelectedImages: React.Dispatch<React.SetStateAction<ImageItem[]>>;
}

function SelectedImagesDisplay({ selectedImages, setSelectedImages }: SelectedImagesDisplayProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const MAX_IMAGES = 8;

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const newFiles = Array.from(event.target.files).slice(0, MAX_IMAGES - selectedImages.length);

            const newImages: ImageItem[] = newFiles.map(file => ({
                file: file,
                previewUrl: URL.createObjectURL(file)
            }));

            setSelectedImages(prevImages => [...prevImages, ...newImages]);
        }
        if (event.target) event.target.value = '';
    };

    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };

    const removeImage = (indexToRemove: number) => {
        setSelectedImages(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    return (
        <>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                multiple style={{ display: 'none' }}
                accept="image/png, image/jpeg, image/jpg"
            />

            <div className="selected-images-grid">
                {Array.from({ length: MAX_IMAGES }).map((_, index) => {
                    const image = selectedImages[index];
                    if (image) {
                        return <div key={index} className="seleced-image-container">
                            <img
                                className="selected-image-template"
                                src={image.previewUrl}
                                alt={`Selected ${index + 1}`}
                            />
                            <button
                                onClick={() => removeImage(index)}
                                className="remove-image-button"
                            >✕</button>
                        </div>
                    } else if (index === selectedImages.length) {
                        return (
                            <div
                                className="image-upload-button"
                                key={index}
                                onClick={triggerFileSelect}
                            >
                                <span className="image-upload-button-text">
                                    Dodaj zdjęcie
                                </span>
                            </div>
                        );
                    } else {
                        return <div key={index} className="seleced-image-container">
                            <PlaceholderImage
                                style={{width: '100%', height: '100%'}}
                                backgroundColor="#FFFFFF"
                                color="#333333"
                            />;
                        </div>
                    }

                })}
            </div>
        </>
    );
}

export default SelectedImagesDisplay;