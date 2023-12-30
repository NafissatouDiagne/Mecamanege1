import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AuthContext } from '../context/AuthContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { Button, Grid } from '@mui/material';
import Profiles from '../pages/Profiles';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ListesOuvriers() {
    const [open1, setOpen1] = React.useState(true)
    const [open, setOpen] = React.useState(false)
    const [ouvriers, setOuvriers] = React.useState(null)
    const [expanded, setExpanded] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const { currentUser } = React.useContext(AuthContext)
    const [selected, setSelected] = React.useState(null)

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'formulaireouvriers'));
                const ouvriersData = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    ouvriersData.push({
                        id: doc.id,
                        uid: data.uid || '',
                        displayName: data.displayName || '',
                        metiers: data.metiers || '',
                        competences: data.competences || '',
                        photoURL: data.photoURL || '',
                        lives: data.lives || '',
                        city: data.city || '',
                        experience: data.experience || ''
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

        fetchData();
    }, []);

    if (loading) {
        return <p>Chargement en cours...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>Une erreur s'est produite : {error}</p>;
    }

    const handleSelected = (ouvrier) => {
        setOpen(true)
        setOpen1(false)
        setSelected(ouvrier)
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    

    return (
        <>
        {open1 && !open ?(
                  
<div className='page1' >
<div className='animeslistes'>
<div> 
        <h1 style={{paddingTop:'50px',paddingLeft:'50px',margin:0, color:'white',fontSize:'xx-large'}}>Retrouvez ici  </h1>
       <h3 style={{paddingTop:'-10px',paddingLeft:'50px',margin:0,color:'white',fontSize:'xx-large'}}>les meilleurs ouvriers
        </h3>  </div>
      <div style={{marginTop:'190px'}}></div>
            <Grid container spacing={2}>
            {ouvriers.map((ouvrier, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    R
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={ouvrier.displayName}
                            subheader={`Metier:${ouvrier.metiers}`}
                        />
                       <CardMedia
    component="img"
    style={{ height: '194px' ,objectFit:'cover',objectPosition: 'center top' }}
    image={ouvrier.photoURL}
    alt="Paella dish"
/>

                        <CardContent>
                            <Typography variant="body2" color="text.secondary" style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            WebkitLineClamp: 2, // Limite le nombre de lignes
        }}>
                                {ouvrier.competences}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                           <Button  onClick={()=>handleSelected(ouvrier)}>

                              Voir plus
                           </Button>
                          
                            
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
       </div></div> ):(
            <Profiles  selected={selected}/>
            )}</>
     
    );
}
