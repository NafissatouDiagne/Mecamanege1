import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { v4 as uuid } from "uuid";
import { fr as frLocale } from 'date-fns/locale';  // Import the French locale

import {
  Avatar,
  Button,
  Divider,
  Input,
  InputBase,
  Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { auth, db, storage } from "../../firebase";
import { Timestamp, addDoc, collection, onSnapshot } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import { format, formatRelative } from "date-fns";
import { AttachFile } from "@mui/icons-material";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { AuthContext } from "../context/AuthContext";

export default function BottomAppBar() {
  const location = useLocation();
  const selected = location.state.select;
  const clicked = location.state.clickedmessage;
  console.log("slect:", selected);
  const [message, setMessage] = React.useState("");
  const [newComment, setNewComment] = React.useState("");
  const [showNotification, setShowNotification] = React.useState(false);
  const user = auth.currentUser;
  const [img, setImg] = React.useState(null);
  const { currentUser } = React.useContext(AuthContext);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImg(selectedFile);
  };
// ...

React.useEffect(() => {
  const fetchData = () => {
    try {
      // Generate a unique identifier for the conversation
      const conversationId = [user.uid, selected.uid].sort().join('_');

      const unsubscribe = onSnapshot(
        collection(db, `conversations/${conversationId}/messages`), // Use a unique identifier for the conversation
        (querySnapshot) => {
          const MessageData = [];

          querySnapshot.forEach((doc) => {
            const data = doc.data();
            MessageData.push({
              id: doc.id,
              postId: data.postId || "",
              userId: data.userId || "",
              text: data.text || "",
              timestamp: data.timestamp || null,
              displayName: data.displayName || "",
              photoURL: data.photoURL || "",
              img: data.img || null,
            });
          });

          setMessage(MessageData);
        }
      );

      return () => unsubscribe();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, [selected, user]);

const handleAddComment = async (e) => {
  e.preventDefault();
  if (img) {
    const storageRef = ref(storage, uuid());
    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on(
      (error) => {
        // TODO: Handle Error
      },
      async () => {
        try {
          // Generate the same unique identifier for the conversation
          const conversationId = [user.uid, selected.uid].sort().join('_');

          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const newCommentData = {
            postId: selected.id,
            userId: user.uid,
            text: newComment,
            timestamp: Timestamp.now(),
            displayName: user.displayName || "",
            photoURL: user.photoURL || "",
            img: downloadURL,
            unread: true,
          };

          // Use the same unique identifier for the conversation
          await addDoc(collection(db, `conversations/${conversationId}/messages`), newCommentData);

          setNewComment("");
          setImg(null);
          setShowNotification(true); // Set the flag to show the notification
        } catch (error) {
          console.log("Error", error);
        }
      }
    );
  } else {
    try {
      // Generate the same unique identifier for the conversation
      const conversationId = [user.uid, selected.uid].sort().join('_');

      const newCommentData = {
        postId: selected.id,
        userId: user.uid,
        text: newComment,
        timestamp: Timestamp.now(),
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
        unread: true,
      };

      // Use the same unique identifier for the conversation
      await addDoc(collection(db, `conversations/${conversationId}/messages`), newCommentData);

      setNewComment("");
      setShowNotification(true); // Set the flag to show the notification
    } catch (error) {
      console.log("Error", error);
    }
  }

};
{/*
React.useEffect(() => {
  // Émettre un son lors de la réception d'un message
  const audioElement = new Audio('/assets/mixkit-bubble-pop-up-alert-notification-2357.wav');
  audioElement.play();
}, [message]); // Effectue cette action une seule fois lors du montage du composant
*/}

return (
  <React.Fragment>
    <Box>
      <Typography
        variant="h5"
        gutterBottom
        component="div"
        sx={{ p: 1, pb: 0, backgroundColor: 'white', width: '100vw' }}
        position='fixed'
      >
        <img height={50} width={60} style={{paddingBottom:8}} src={selected.photoURL} alt="" /> {selected.displayName}
      </Typography>
      <Divider />
      {Array.isArray(message) && message.length > 0 ? (
        <div className="message">
          {Object.entries(
            message
              .slice()
              .sort((a, b) => a.timestamp - b.timestamp)
              .reduce((acc, msg) => {
                const today = new Date();
                const messageDate = new Date(msg.timestamp.seconds * 1000);

                if (
                  today.getDate() === messageDate.getDate() &&
                  today.getMonth() === messageDate.getMonth() &&
                  today.getFullYear() === messageDate.getFullYear()
                ) {
                  // Today's message
                  const dateKey = "Aujourd'hui";
                  if (!acc[dateKey]) {
                    acc[dateKey] = [];
                  }
                  acc[dateKey].push(msg);
                } else {
                  // Other days' messages
                  const dateKey = format(messageDate, "EEEE", { locale: frLocale });
                  if (!acc[dateKey]) {
                    acc[dateKey] = [];
                  }
                  acc[dateKey].push(msg);
                }

                return acc;
              }, {})
          ).map(([dateKey, messagesForDate]) => (
            <React.Fragment key={dateKey}>
              <div style={{ color: 'white', padding: '10px', backgroundColor: 'black' }}>{dateKey}</div>
              {Array.isArray(messagesForDate) ? (
                messagesForDate.map((msg) => (
                  <>
                  {msg.userId === auth.currentUser.uid ? (

                 
                  <div key={msg.id} className= "messagediv">
                    {msg.img && (
                      <div>
                        <img
                          src={msg.img}
                          alt="Attachment"
                          style={{ maxWidth: "100%", maxHeight: "100px" }}
                        />
                      </div>
                    )}
                    <div>
                      {msg.text}
                      <div>
                        <span className="time">
                          {format(new Date(msg.timestamp.seconds * 1000), "HH:mm")}
                          {clicked ? " ✓✓" : " ✓"}
                        </span>
                        <span className="status">
                          
                        </span>
                      </div>
                    </div>
                  </div>
                     ):(
                    <>
                    <div key={msg.id0} className="messageuser1">
                   {msg.img &&    <div>
                        <img
                        src={msg.img} alt=""
                        style={{ maxWidth: "100%", maxHeight: "100px" }}/>

                      </div>
                      }
                      <div>
                        {msg.text}
                      </div>
                      <div className="time">
                        <span>{format(new Date(msg.timestamp.seconds *1000), "HH:mm")}</span>
                      </div>
                    </div>
                    </>
                      )}
                </>))
             
              ) : (
                <div style={{ color: 'red' }}>Error: messagesForDate is not an array</div>
              )}
              
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div style={{ padding: '220px', color: 'white' }}>Aucun message</div>
      )}

    </Box>
    <div style={{ paddingBottom: '30px' }}>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "8px",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <form
          onSubmit={handleAddComment}
          style={{ width: "100%", display: "flex", alignItems: "center" }}
        >
          <InputBase
            type="text"
            placeholder="Écrivez un message"
            sx={{ flexGrow: 1, marginRight: "8px" }}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <label
            htmlFor="fileInput"
            style={{ cursor: "pointer", marginRight: "8px" }}
          >
            <AttachFile />
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="fileInput"
          />
          <Button variant="contained" type="submit" endIcon={<SendIcon />} />
        </form>
      </Paper>
    </div>
  </React.Fragment>
);

}
