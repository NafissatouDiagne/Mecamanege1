import * as React from 'react';
import List from '@mui/material/List';
import FiberManualRecordOutlinedIcon from '@mui/icons-material/FiberManualRecordOutlined';
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import Avatar from '@mui/material/Avatar';

import { Grid, Typography, ButtonBase, Divider, Badge } from '@mui/material';
import { Favorite, Mail } from '@mui/icons-material';
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Page1() {
  const [checked, setChecked] = React.useState([]);
  const [userMessage, setUserMessage] = React.useState([]);
  const { currentUser } = React.useContext(AuthContext);
  const [users, setUsers] = React.useState([]);
const navigate=useNavigate()
  React.useEffect(() => {
    // Récupérer la liste des utilisateurs
    const fetchUsers = async () => {
      const usersQuery = query(collection(db, 'users'));
      const usersSnapshot = await getDocs(usersQuery);
      const usersData = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    };

    // Récupérer les messages pour la conversation actuelle
    const fetchMessages = () => {
      try {
        // Générer un identifiant unique pour la conversation
        const selectedUid = currentUser.uid;

        const promises = users.map(async (user) => {
          const conversationId = [user.id, selectedUid].sort().join('_');
          const messagesQuery = query(collection(db, `conversations/${conversationId}/messages`));

          const messagesSnapshot = await getDocs(messagesQuery);

          const messages = messagesSnapshot.docs.map((messageDoc) => {
            const messageData = messageDoc.data();
            return {
              id: messageDoc.id,
              postId: messageData.postId || '',
              userId: messageData.userId || '',
              text: messageData.text || '',
              timestamp: messageData.timestamp || null,
              displayName: messageData.displayName || '',
              photoURL: messageData.photoURL || '',
              img: messageData.img || null,
            };
          });

          return {
            conversationId,
            messages,
          };
        });

        Promise.all(promises).then((results) => {
          setUserMessage(results.flatMap((result) => result.messages));
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUsers();
    fetchMessages();
  }, [currentUser, users]);
const handleClick=(select)=>{
navigate('/MessagePV' ,{state:{select}})
}
return (
  <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
    <div style={{ width: '100%', maxWidth: 500 }}>
 

      {users.map((select) => {
        // Filtrer les messages pour l'utilisateur actuel
        const userMessages = userMessage.filter((value) => value.userId === select.id);

        // Si l'utilisateur a des messages, triez-les par timestamp (dans l'ordre décroissant)
        if (userMessages.length > 0) {
          const sortedMessages = userMessages.sort((a, b) => b.timestamp - a.timestamp);
          const lastMessage = sortedMessages[0];

          return (
            <Grid container spacing={2} key={lastMessage.id}>
              {lastMessage.displayName !== currentUser.displayName && (
                <>
                  <Grid item>
                    <ButtonBase sx={{ width: 60, height: 60, borderRadius: '50%' }}>
                      <Avatar
                        src={lastMessage.photoURL}
                        style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                      />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={12} sm container onClick={() => handleClick(select)}>
                    <Grid item xs container direction="column" spacing={2} sx={{ minWidth: 0 }}>
                      <Grid item xs>
                        <Typography  gutterBottom variant="subtitle1" component="div">
                          {lastMessage.displayName}
                        </Typography>
                        <Typography variant="body2" gutterBottom style={{    display: '-webkit-box',  WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            WebkitLineClamp: 1, }}>
          
                          {lastMessage.text}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {/* Ajoutez votre logique ici pour le statut en ligne */}
                        </Typography>
                      </Grid>
                      <Grid item>
                        {/* Vos autres éléments de grille et composants */}
                      </Grid>
                      <Divider variant="inset" component="li" />
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" component="div">
                    <Badge color="secondary" badgeContent={99}>
  <Mail color='none' />
</Badge>
                    </Typography>
                  </Grid>
                </>
              )}
            </Grid>
          );
        }

        return null; // Si l'utilisateur n'a pas de messages, ne rien afficher
      })}
    </div>
  </List>
);
    }