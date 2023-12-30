import React, { useContext, useState } from "react";
import SideBar from "../SideBar";
import NavBarr from "../NavBarr";
import { Alert, Button, Checkbox, FormControlLabel, FormGroup, IconButton, Snackbar } from "@mui/material";

import { auth, storage, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { AuthContext } from "../context/AuthContext";
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
function Formulaire() {
  const [displayName, setdisplayName] = useState("");
  const [metiers, setMetiers] = useState("");
  const [competences, setCompetences] = useState("");
  const [lives, setLives] = useState("");
  const [city, setCity] = useState("");
  const [experience, setExperience] = useState("");
  const [disponibilites, setDisponibilites] = useState({
    jours:[],
    heures:[],
  });
  const [origine, setOrigine] = useState("");
  const [file, setFile] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");
  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const handleJourChange = (jour) => {
    setDisponibilites((prevDisponibilites) => {
      if (prevDisponibilites.jours.includes(jour)) {
        // Retirer le jour s'il est déjà dans la liste
        return {
          ...prevDisponibilites,
          jours: prevDisponibilites.jours.filter((j) => j !== jour),
        };
      } else {
        // Ajouter le jour s'il n'est pas dans la liste
        return {
          ...prevDisponibilites,
          jours: [...prevDisponibilites.jours, jour],
        };
      }
    });
  };
  

  const handleHeuresChange = (heure) => {
     setDisponibilites((prevDisponibilites) => {
  if(prevDisponibilites.heures.includes(heure)){
   return{
  ...prevDisponibilites,
  heures: prevDisponibilites.heures.filter((h)=>h!==heure)  
  }
}
else{
  return{
    ...prevDisponibilites,
    heures: [...prevDisponibilites.heures, heure]
  }
}
     })
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Créer une référence au dossier de stockage
      const storageRef = ref(storage, `profileImages/${auth.currentUser.uid}`);

      // Charger l'image dans le stockage
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Gérer la progression du téléchargement si nécessaire
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (uploadError) => {
          setError(uploadError.message);
          console.error("Error uploading image:", uploadError);
        },
        async () => {
          // Obtenir l'URL de téléchargement de l'image
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          // Ajout des informations à Firestore
          await setDoc(doc(db, "formulaireouvriers", auth.currentUser.uid), {
            uid: auth.currentUser.uid,
            displayName,
            metiers,
            competences,
            experience,
            lives,
            origine,
            disponibilites,
            city,
            photoURL: downloadURL,
          });
          setOpen(true);
          setMessage("Donnees inserees avec success");
          setColor("success");
          // Réinitialiser le formulaire après la soumission
          setdisplayName("");
          setMetiers("");
          setCity("");
          setLives("");
          setCompetences("");
          setExperience("");
          setOrigine("");
          setDisponibilites({ jours: [], heures: [] });

          setFile("");
          setError(null);
        }
      );
    } catch (error) {
      setOpen(true);

      setMessage("Erreur lors de l'ajout des donnees");
      setColor("error");
      setError(error.message);
      console.error("Error submitting form:", error);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        x
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <div className="wrapper">
        <div className="main">
          <main class="content">
            <div class="container-fluid p-0">
              <div class="mb-3">
                <h1 class="h3 d-inline align-middle">
                  Remplissez le formulaire
                </h1>
                <a
                  class="badge bg-dark text-white ms-2"
                  href="upgrade-to-pro.html"
                >
                  d'Inscription
                </a>
              </div>
              <form onSubmit={handleSubmit}>
                <div class="row">
                  <div class="col-12 col-lg-6">
                    <div class="card">
                      <div class="card-header">
                        <h5 class="card-title mb-0">Nom Complet</h5>
                      </div>
                      <div class="card-body">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Nom complet"
                          value={displayName}
                          onChange={(e) => setdisplayName(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div class="card">
                      <div class="card-header">
                        <h5 class="card-title mb-0">
                          Decrivez vous et donner vos competences
                        </h5>
                      </div>
                      <div class="card-body">
                        <textarea
                          class="form-control"
                          rows="2"
                          placeholder="Bref Resumer"
                          value={competences}
                          onChange={(e) => setCompetences(e.target.value)}
                          required
                        ></textarea>
                      </div>
                    </div>
                  

<div class="card">
  <div class="card-header">
    <h5 class="card-title mb-0">Disponibilités</h5>

  </div>
  <div class="card-body" >
  <div class="card-title mb-2 mt-2"> Jours disponibles:</div>
  <FormControlLabel
    control={
      <Checkbox
        checked={disponibilites.jours.includes("tous-les-jours")}
        onChange={() => handleJourChange("tous-les-jours")}
        value="tous-les-jours"
      />
    }
    label="Tous les jours"
  />
  <FormControlLabel
    control={
      <Checkbox
      {...label}
        checked={disponibilites.jours.includes("lundi")}
        onChange={() => handleJourChange("lundi")}
        value="lundi"
      />
    }
    label="Lundi"
  />
  <FormControlLabel
    control={
      <Checkbox
      {...label}
        checked={disponibilites.jours.includes("mardi")}
        onChange={() => handleJourChange("mardi")}
        value="mardi"
      />
    }
    label="Mardi"
  />
  <FormControlLabel
    control={
      <Checkbox
      {...label}
        checked={disponibilites.jours.includes("mercredi")}
        onChange={() => handleJourChange("mercredi")}
        value="mercredi"
      />
    }
    label="Mercredi"
  />
  <FormControlLabel
    control={
      <Checkbox
        checked={disponibilites.jours.includes("jeudi")}
        onChange={() => handleJourChange("jeudi")}
        value="jeudi"
      />
    }
    label="Jeudi"
  />
  <FormControlLabel
    control={
      <Checkbox
        checked={disponibilites.jours.includes("vendredi")}
        onChange={() => handleJourChange("vendredi")}
        value="vendredi"
      />
    }
    label="Vendredi"
  />
   <FormControlLabel
    control={
      <Checkbox
        checked={disponibilites.jours.includes("samedi")}
        onChange={() => handleJourChange("samedi")}
        value="samedi"
      />
    }
    label="Samedi"
  /> <FormControlLabel
  control={
    <Checkbox
      checked={disponibilites.jours.includes("dimanche")}
      onChange={() => handleJourChange("dimanche")}
      value="dimanche"
    />
  }
  label="Dimanche"
/>




<div className="card-title mb-2 mt-2">
Heures disponibles:
</div>
<FormControlLabel
    control={
      <Checkbox 
       checked={disponibilites.heures.includes("matin")}
      value="matin" onChange={()=>handleHeuresChange("matin")}/> }label="Matin"/>
     <FormControlLabel
    control={   <Checkbox checked={disponibilites.heures.includes("apres-midi")}  value="apres-midi" onChange={()=>handleHeuresChange("apres-midi")}/>}label="apres-midi"/>
    <FormControlLabel
    control={  <Checkbox checked={disponibilites.heures.includes("soir")}  value="soir" onChange={()=>handleHeuresChange("soir")} />}label="soir"/>
  
  </div>
</div>


                    <div class="card">
                      <div class="card-header">
                        <h5 class="card-title mb-0">Photo</h5>
                      </div>
                      <div class="card-body">
                        <input
                          class="form-control"
                          type="file"
                          placeholder="Inserer votre image "
                          onChange={(e) => setFile(e.target.files[0])}
                          required
                        />
                      </div>
                    </div>
                  </div>
                 
                  <div class="col-12 col-lg-6">
                    <div class="card">
                      <div class="card-header">
                        <h5 class="card-title mb-0">Metiers</h5>
                      </div>

                      <div class="card-body">
                        <select
                          class="form-select mb-3"
                          value={metiers}
                          onChange={(e) => setMetiers(e.target.value)}
                          required
                        >
                          <option disabled selected>
                            Choisissez votre métier
                          </option>
                          <option value="Femme_de_menage">
                            Femme de ménage
                          </option>
                          <option value="Mecanicien">Mécanicien</option>
                          <option value="Nounou">Nounou</option>
                          <option value="Tuteur_ou_tutrice_a_domicile">
                            Tuteur ou tutrice à domicile
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-header">
                        <h5 class="card-title mb-0">Experiences </h5>
                      </div>
                      <div class="card-body">
                        <input
                          class="form-control"
                          value={experience}
                          onChange={(e) => setExperience(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div class="card">
                      <div class="card-header">
                        <h5 class="card-title mb-0">Ville </h5>
                      </div>
                      <div class="card-body">
                        <input
                          class="form-control"
                          value={lives}
                          onChange={(e) => setLives(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-header">
                        <h5 class="card-title mb-0">Origine </h5>
                      </div>
                      <div class="card-body">
                        <input
                          class="form-control"
                          value={origine}
                          onChange={(e) => setOrigine(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div class="card">
                      <div class="card-header">
                        <h5 class="card-title mb-0">Cité </h5>
                      </div>
                      <div class="card-body">
                        <input
                          class="form-control"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-success">
                  Envoyer
                </button>
              </form>
              {open && (
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity={color}
                    sx={{ width: "100%" }}
                  >
                    {message}
                  </Alert>
                </Snackbar>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Formulaire;
