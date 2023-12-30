import React, { useContext, useEffect, useState } from "react";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { AuthContext } from "../context/AuthContext";
import { formatRelative } from "date-fns";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function Profiles(props) {
  const { selected } = props;
  const { currentUser } = useContext(AuthContext);
 const [clickedmessage,setClickedmessage]=useState(false)
  const navigate = useNavigate();

  const handleButtonClick = (select) => {
    setClickedmessage(true)
    // Naviguer vers la route "/MessagePV" avec les données passées
    navigate('/MessagePV', { state: { select,clickedmessage :true} });
    
  };
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showNotification,setShowNotification]=useState(false)
  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      const newCommentData = {
        postId: selected.id,
        userId: user.uid,
        text: newComment,
        timestamp: Timestamp.now(),
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
        unread: true, 
      };

      // Add the new comment to the current state
      setComments((prevComments) => [...prevComments, newCommentData]);

      // Add the new comment to the database
      await addDoc(collection(db, "comments"), newCommentData);

      setNewComment("");
      setShowNotification(true); // Set the flag to show the notification
    } catch (error) {
      console.log("Error", error);
    }
  };

  // Use effect to handle notification visibility
  useEffect(() => {
    if (showNotification) {
      const timeoutId = setTimeout(() => {
        setShowNotification(false);
      }, 5000); // Hide the notification after 5 seconds
      return () => clearTimeout(timeoutId);
    }
  }, [showNotification]);

  useEffect(() => {
    const fetchData = () => {
      try {
        const unsubscribe = onSnapshot(
          collection(db, "comments"),
          (querySnapshot) => {
            const commentsData = [];

            querySnapshot.forEach((doc) => {
              const data = doc.data();
              commentsData.push({
                id: doc.id,
                postId: data.postId || "",
                userId: data.userId || "",
                text: data.text || "",
                timestamp: data.timestamp || null,
                displayName: data.displayName || "",
                photoURL: data.photoURL || "",
              

              });
            });

            // Filter comments to show only those for the selected user
            const filteredComments = commentsData.filter(
              (comment) => comment.postId === selected.uid
            );

            setComments(filteredComments);
          }
        );

        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selected]);
  const markCommentAsRead = async (commentId) => {
    try {
      // Construisez la référence du document du commentaire
      const commentRef = doc(db, "comments", commentId);
  
      // Mettez à jour le champ `unread` à false
      await updateDoc(commentRef, { unread: false });
    } catch (error) {
      console.error("Error marking comment as read:", error);
    }
  };

  if (!selected) {
    return <p>Aucun ouvrier sélectionné</p>;
  }
  console.log("selected:", selected.disponibilites);

  return (
    <Container maxWidth="xl" sx={{ marginTop: 5 }}>
      <Grid container spacing={3}>
        <Grid item md={4} xl={3}>
          <Card>
            <CardHeader
              title='Details du profile '
              style={{textAlign:'center'}}
            />
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Avatar
                  src={selected.photoURL}
                  alt={selected.displayName}
                  sx={{ width: 128, height: 128, mb: 2 }}
                />
                <Typography variant="h5" component="div" mb={2}>
                  {selected.displayName}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {selected.metiers}
                </Typography>
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    href="#"
                  >
                    Follow
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={()=>handleButtonClick(selected)}
                  >
                    <span   data-feather="message-square"> Message</span>
                  </Button>
                </div>
              </Box>
            </CardContent>
            <Divider />
            <CardContent>
              <Typography variant="h6" mb={2}>
                Competences:
              </Typography>
              <Typography variant="body2">{selected.competences}</Typography>
            </CardContent>
            <Divider />
            <CardContent>
              <Typography variant="h6" mb={2}>
                 Experiences:
              </Typography>
              <Typography variant="body2">
             {selected.experience}
              </Typography>
            </CardContent>
            <Divider/>
            <CardContent>
  <Typography variant="h6" mb={2}>Disponibilités:</Typography>
  <Typography variant="body2">
  {selected.disponibilites ? (
    // Si disponibilites est défini, affichez les informations
    <>
      Jours disponibles: {selected.disponibilites.jours.join(', ')} <br />
      Heures disponibles: {selected.disponibilites.heures.join(', ')}
    </>
  ) : (
    // Sinon, affichez un message par défaut
    "Aucune information sur les disponibilités"
  )}
</Typography>

</CardContent>


            <CardContent>
              <Typography variant="h6" mb={2}>
                A propos:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText>
                    <span data-feather="home" className="feather-sm me-1"></span>{" "}
                    Habite à{" "}
                    <a href="#">
                      {selected.lives}, {selected.city}
                    </a>
                  </ListItemText>
                </ListItem>
               
                <ListItem>
                  <ListItemText>
                    <span
                      data-feather="map-pin"
                      className="feather-sm me-1"
                    ></span>{" "}
                    Origine <a href="#">{selected.origine}</a>
                  </ListItemText>
                </ListItem>
              </List>
            </CardContent>
            <Divider />
          
          </Card>
        </Grid>
        <Grid item md={8} xl={9} >
          <Card >
            <CardHeader title="Commentaires" />
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardContent style={{ flex: 1, overflowY: 'auto' }} >
              {comments
                .slice()
                .sort((a, b) => b.timestamp - a.timestamp)
                .map((comment) => (
                  <React.Fragment key={comment.id}>
                    <ListItem alignItems="flex-start"  onClick={() => markCommentAsRead (comment.id)}
        style={{ backgroundColor: comment.unread ? "#e6f7ff" : "inherit" }}>
                      <ListItemAvatar>
                        <Avatar
                          alt={comment.displayName}
                          src={comment.photoURL}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={comment.displayName}
                        secondary={
                          <>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                      {comment.text}   {"/ "}
                            </Typography>
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.secondary"
                            >
                                {formatRelative(
                  new Date(comment.timestamp.seconds * 1000), // Convert seconds to milliseconds
                  new Date()
                )} 
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
            {/*  <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt="Charles Hall"
                    src="assets/img/avatars/avatar.jpg"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary="Charles Hall"
                  secondary={
                    <>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        30m ago
                      </Typography>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                      >
                        Charles Hall posted something on Christina Mason's
                        timeline
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mb={1}>
                        Today 7:21 pm
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        className="border text-sm text-muted p-2 mt-1"
                      >
                        Etiam rhoncus. Maecenas tempus, tellus eget condimentum
                        rhoncus, sem quam semper libero, sit amet adipiscing sem
                        neque sed ipsum. Nam quam nunc, blandit vel, luctus
                        pulvinar, hendrerit id, lorem. Maecenas nec odio et ante
                        tincidunt tempus. Donec vitae sapien ut libero venenatis
                        faucibus. Nullam quis ante.
                      </Typography>
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        mt={1}
                      >
                        <i className="feather-sm" data-feather="heart"></i> Like
                      </Button>
                    </>
                  }
                />
              </ListItem>
              <Divider />
              {/* Ajoutez d'autres activités ici */}
              {/* ... */}
              <form onSubmit={handleAddComment} style={{padding:'16px',marginTop:'500px'}}>
                <TextField
                  fullWidth
                  placeholder="Ajouter un commentaire"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary">
                  Envoyer
                </Button>
              </form>
            </CardContent>
          </div>
          </Card>

        </Grid>
      </Grid>
      {showNotification && (
        <div
          style={{
            position: "fixed",
            bottom: 16,
            right: 16,
            backgroundColor: "#4CAF50",
            color: "white",
            padding: 16,
            borderRadius: 8,
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          New comment added!
        </div>
      )}
    </Container>
  );
}

export default Profiles;
