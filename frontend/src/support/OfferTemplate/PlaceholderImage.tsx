import './OfferTemplate.css';
import { Icon } from '../../Icons/Icon';

interface PlaceholderImageProps {
    backgroundColor?: string;
    iconColor?: string;
}

function PlaceholderImage({ backgroundColor="#cccccc", iconColor="#666666" }: PlaceholderImageProps) {
    return (
        <div className="empty-image" style={{backgroundColor}}>
            <Icon name="carEmptyImage" width={70} height={70} color={iconColor} />
            Brak Zdjęcia
        </div>
    );
}

export default PlaceholderImage;
