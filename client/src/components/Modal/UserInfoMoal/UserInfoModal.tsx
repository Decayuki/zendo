import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Button from "../../Button/Button";
import { setCredentials } from "../../../reducers/user";
import "./UserInfoModal.css";

interface UserInfosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserInfosModal = ({ isOpen, onClose }: UserInfosModalProps) => {
  const dispatch = useDispatch();
  // Récupération des infos et du token depuis Redux
  const { userInfo: user, token } = useSelector((state: any) => state.user);

  // États locaux pour permettre la modification
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // États locaux pour l'adresse
  const [address, setAddress] = useState({
    country: "",
    countryCode: "+33",
    phone: "",
    street: "",
    city: "",
    postalCode: "",
  });
  // On remplit les champs dès que la Modal s'ouvre ou que Redux change
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");

      // Optionnel : on pourrait ajouter ici un appel GET /api/address/:userId
      // pour pré-remplir l'adresse si elle existe déjà en base
    }
  }, [user, isOpen]);

  const handleSave = async () => {
    // 1. RÉCUPÉRATION DE L'ID (via Redux ou via Décodage du Token)
    let userId = user?._id;

    // Si l'id n'est pas dans l'objet user, on le décode du token
    if (!userId && token) {
      try {
        const decoded: any = jwtDecode(token);
        userId = decoded.id || decoded.userId || decoded.sub;
      } catch (e) {
        console.error("Erreur de décodage du token", e);
      }
    }

    // 2. VALIDATION
    if (!userId) {
      alert("Erreur : Impossible de récupérer votre identifiant.");
      return;
    }

    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      alert("Le prénom, le nom et l'adresse mail ne peuvent pas être vides.");
      return;
    }
    try {
      // 2. APPEL API : Mise à jour du Profil (PUT /api/users/:id)
      const userPromise = axios.put(
        `http://localhost:5001/api/users/${userId}`,
        {
          firstName,
          lastName,
          email,
        },
      );

      // 3. APPEL API : Enregistrement/Update Adresse (POST /api/address/save/:userId)
      // On n'envoie l'adresse que si les champs minimum sont remplis
      let addressPromise = Promise.resolve(null);
      if (address.street && address.city && address.phone) {
        addressPromise = axios.post(
          `http://localhost:5001/api/address/save/${userId}`,
          {
            phone: `${address.countryCode}${address.phone}`,
            street: address.street,
            postalCode: address.postalCode,
            city: address.city,
            country: address.country,
            addressType: "shipping", // Par défaut 
          },
        );
      }

      // Exécution des deux requêtes en parallèle
      const [userRes] = await Promise.all([userPromise, addressPromise]);

      // 4. MISE À JOUR REDUX : Pour que le reste du site voit les changements
      dispatch(
        setCredentials({
          user: userRes.data.user,
          token: token,
        }),
      );

      alert("Informations et adresse enregistrées avec succès !");
      onClose();
    } catch (error: any) {
      console.error("Erreur lors de la sauvegarde:", error);
      alert(
        error.response?.data?.message ||
          "Une erreur est survenue lors de l'enregistrement.",
      );
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content info-modal-container">
        <h2 className="modal-title">Informations personnelles</h2>
        <div className="info-section-wrapper">
          <div className="info-section">
            <h3>Mes informations</h3>
            <div className="input-group">
              <label>Prénom</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Votre prénom"
              />
            </div>
            <div className="input-group">
              <label>Nom</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Votre nom"
              />
            </div>
            <div className="input-group">
              <label>Adresse mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse mail"
              />
            </div>
          </div>

          <hr className="modal-divider" />

          <div className="info-section">
            <h3>Adresse</h3>

            <div className="input-group">
              <label>Pays</label>
              <input
                type="text"
                value={address.country}
                placeholder="Ex: France"
                onChange={(e) =>
                  setAddress({ ...address, country: e.target.value })
                }
              />
            </div>

            <div className="input-group">
              <label>Téléphone</label>
              <div className="phone-input-row">
                <select
                  value={address.countryCode}
                  onChange={(e) =>
                    setAddress({ ...address, countryCode: e.target.value })
                  }
                >
                  <option value="+33">+33 (FR)</option>
                  <option value="+32">+32 (BE)</option>
                  <option value="+41">+41 (CH)</option>
                </select>
                <input
                  type="tel"
                  value={address.phone}
                  placeholder="612345678"
                  onChange={(e) =>
                    setAddress({ ...address, phone: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="input-group">
              <label>Rue et numéro</label>
              <input
                type="text"
                value={address.street}
                placeholder="15 rue de la Paix"
                onChange={(e) =>
                  setAddress({ ...address, street: e.target.value })
                }
              />
            </div>

            <div className="input-row-flex">
              <div className="input-group half">
                <label>Ville</label>
                <input
                  type="text"
                  value={address.city}
                  placeholder="Paris"
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                />
              </div>
              <div className="input-group half">
                <label>Code Postal</label>
                <input
                  type="text"
                  value={address.postalCode}
                  placeholder="75000"
                  onChange={(e) =>
                    setAddress({ ...address, postalCode: e.target.value })
                  }
                />
              </div>
            </div>
            {/* BOUTONS FIXES EN BAS */}
            <div className="modal-actions">
              <Button variant="secondary" onClick={onClose}>
                Annuler
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Enregistrer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfosModal;
