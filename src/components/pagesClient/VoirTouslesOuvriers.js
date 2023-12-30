import React, { useContext, useEffect, useState } from 'react'
import SideBar from '../SideBar'
import NavBarr from '../NavBarr'
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from '../../firebase';
import { AuthContext } from '../context/AuthContext';
import Footer from '../Footer';
import { Link } from 'react-router-dom';
import Profiles from '../pages/Profiles';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
function VoirTouslesOuvriers() {
    const [open1,setOpen1]=useState(true)
	const [open,setOpen]=useState(false)
    const [ouvriers,setOuvriers]=useState(null)
   
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const {currentUser}=useContext(AuthContext)
   const [selected,setSelected]=useState(null)

	useEffect(() => {
		const fetchData = async () => {
		  try {
			// Récupérer tous les documents de la collection "formulaireouvriers"
			const querySnapshot = await getDocs(collection(db, 'formulaireouvriers'));

			// Mettre à jour l'état avec les données récupérées
			const ouvriersData = [];
			querySnapshot.forEach((doc) => {
			  const data = doc.data();
			  ouvriersData.push({
				id: doc.id,
				uid:data.uid || '',
				displayName: data.displayName || '',
				metiers: data.metiers || '',
				competences: data.competences || '',
				photoURL: data.photoURL || '',
				lives: data.lives || '',
				city : data.city || '',
				experience: data.experience || '',
				origine: data.origine || '',
				disponibilites: data.disponibilites || {}
			  });
			});
			setOuvriers(ouvriersData);
		  } catch (error) {
			setError(error.message);
			console.error('Error fetching data:', error);
		  } finally {
			setLoading(false);
		  }
		};
	  
		// Appeler la fonction fetchData lors du montage du composant
		fetchData();
	  }, []); // Le tableau vide en tant que dépendance signifie que cela s'exécutera une seule fois lors du montage initial
	  
	if (loading) {
	  return <p>Chargement en cours...</p>;
	}
  
	if (error) {
	  return <p style={{ color: 'red' }}>Une erreur s'est produite : {error}</p>;
	}
/*    const handleSearch=async ()=>{
		
const q=query(collection(db,"users"),where("displayName","==",userName));

try{
const querySnapshot =await getDocs(q)
querySnapshot.forEach((doc)=>{
    setUser(doc.data)
});
}catch(err){
    setErr(true)
}
    }
    const handleKey=e=>{
        e.code === 'Enter' && handleSearch();
    }
*/
const handleSelected=(ouvrier)=>{
	setOpen(true)
	setOpen1(false)
setSelected(ouvrier)


}
  return (
    <div>
         <div className="wrapper">
		<SideBar/>
		<div className="main">
		<NavBarr/>
      <main className="content">
		{open1 && !open? (<>
<Grid container spacing={2} >
			{ouvriers.map((ouvrier)=>(
				 <Grid item key={ouvrier.id} xs={12} sm={6} md={4} lg={3}>
<Card sx={{ maxWidth: 345 }}>
<CardMedia
component="img"
alt="green iguana"
height="190"
image={ouvrier.photoURL}
style={{position:'static'}}
/>
<CardContent>
<Typography gutterBottom variant="h5" component="div">
{ouvrier.displayName}
</Typography>
<Typography variant="body2" color="text.secondary">
{ouvrier.competences}
</Typography>
</CardContent>
<CardActions>
<Button size="small">Share</Button>
<Button size="small" onClick={()=>handleSelected(ouvrier)}>Voir le profile</Button>
</CardActions>
</Card>
</Grid>


))}
</Grid>
	</>	):(
		<Profiles  selected={selected}/>
		)}		
				
			</main>
            </div>
            </div>
		

    </div>
  )
}

export default VoirTouslesOuvriers
