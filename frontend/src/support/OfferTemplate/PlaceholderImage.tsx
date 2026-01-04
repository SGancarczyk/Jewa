import './OfferTemplate.css';
import { Icon } from '../../Icons/Icon';

interface PlaceholderImageProps {
    backgroundColor?: string;
    color?: string;
    style?: React.CSSProperties;
}

export const PlaceholderImage = ({ backgroundColor="#cccccc", color="#666666", style }: PlaceholderImageProps) => {
    return (
        <div className="empty-image" style={{backgroundColor, color, ...style}}>
            <Icon name="carEmptyImage" width={70} height={70} color={color} />
            Brak Zdjęcia
        </div>
    );
}
