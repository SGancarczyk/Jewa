import "./ProfileComp.css";
import star from "../../assets/star.png"
import { useNavigate } from "react-router-dom";

type ProfileCompProps = {
  image: string;
  title: string;
  localisation: string;
  logInfo: string;
  followersNumber: string;
  followingNumber: string;
};

function ProfileComp({
  image,
  title,
  localisation,
  logInfo,
  followersNumber,
  followingNumber,
}: ProfileCompProps) {
  const navigate = useNavigate();
  return (
    <div className="info-card">
      <img className="info-image" src={image} alt={title} />

      <div className="info-text">
        <h3>{title}</h3>
        <div className="opinions">
          <img src={star} alt="menu" className="star-image" />
          <img src={star} alt="menu" className="star-image" />
          <img src={star} alt="menu" className="star-image" />
          <img src={star} alt="menu" className="star-image" />
          <img src={star} alt="menu" className="star-image" />
          <p>1984 Opinie</p>
        </div>
        
        <h4>{localisation}</h4>
        <p>Ostatnie logowanie {logInfo}h temu</p>
        <p>Obserwujących: {followersNumber}, Obserwowanych: {followingNumber}</p>
      </div>

      <button className="press-button" onClick={
        () => navigate("/user/edit")
      }>
        Edytuj Profil
      </button>
    </div>
  );
}

export default ProfileComp;