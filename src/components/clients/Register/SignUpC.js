import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react'
import { auth, db, storage } from '../../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';

function SignUpC() {

    const [displayName, setdisplayName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState("");
	const [color, setColor] = useState("");
	const [open, setOpen] = useState(false);
	const [file, setFile] = useState('')
	const [error, setError] = useState(false);
	const handleSubmit = async (e) => {
  
	  e.preventDefault()
	  try {
		
		const res = await createUserWithEmailAndPassword(auth, email, password, displayName);
		console.log('response:', res)
  
  
		// ...
  
  const storageRef = ref(storage, `profileImages/${res.user.uid}`);
  
  const uploadTask = uploadBytesResumable(storageRef, file);
  
  uploadTask.on('state_changed',
	(snapshot) => {
	  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
	  console.log('Upload is ' + progress + '% done');
	},
	(error) => {
	  setError(true);
	},
	async () => {
	  const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
  
	  // Mise à jour du profil avec l'URL de téléchargement
	  await updateProfile(res.user, {
		displayName,
		photoURL: downloadURL,
	  });
  
	  // Ajout des informations à Firestore
	  await setDoc(doc(db, "users", res.user.uid), {
		uid: res.user.uid,
		displayName,
		
		email,
		photoURL: downloadURL
	  });
	}
  );
  setdisplayName("");
  setEmail("")
  setFile("")
  setPassword("")
  setOpen(true)
  setMessage("Inscription reussie")
  setColor("success")
  // ...
  
	  }
	  catch (error) {
		setError(true)
		setOpen(true)
		setMessage("Verifier les donnees inserees")
		setColor("error")
		// ...
		console.log('setError:', error)

	  }
	}
	const handleClose = () => {
	
  setOpen(false)
  
	  setError(false)
	}


  return (
    <div className="text-center">
   
  <div className="p-5 bg-image" style={{
        backgroundImage: "url('https://mdbootstrap.com/img/new/textures/full/171.jpg')",
        backgroundPosition:'center',
        backgroundSize:'cover',
        height: "300px"}}
        ></div>


  <div className="card mx-6 mx-md-9 shadow-5-strong" style={{
        marginTop: "-100px",
        background: "hsla(0, 0%, 100%, 0.8)",
        backdropFilter: "blur(40px)"}}
        >
    <div className="card-body py-5 px-md-5">

      <div className="row d-flex justify-content-center">
        <div className="col-lg-8">
          <h2 className="fw-bold mb-5">Sign up now</h2>
          <form onSubmit={handleSubmit}>
        
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="form-outline">
                  <input type="text" id="form3Example1" className="form-control" value={displayName} onChange={(e)=>setdisplayName(e.target.value)}/>
                  <label className="form-label" for="form3Example1">Nom complet</label>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="form-outline">
                  <input type="file" id="form3Example2" className="form-control" onChange={(e)=>setFile(e.target.files[0])} />
                  <label className="form-label" for="form3Example2">Image</label>
                </div>
              </div>
            </div>

                    <div className="form-outline mb-4">
              <input type="email" id="form3Example3" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)}/>
              <label className="form-label" for="form3Example3">Email address</label>
            </div>

                       <div className="form-outline mb-4">
              <input type="password" id="form3Example4" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)}/>
              <label className="form-label" for="form3Example4">Password</label>
            </div>

                 

                      <button type="submit" className="btn btn-primary btn-block mb-4">
              Sign up
            </button>

            
            <div className="text-center">
              <p>si vous avez deja un compte :</p>
              <Link  to='/signinc' className="btn btn-link btn-floating mx-1">
               Sign In
              </Link>

             
            </div>
          </form>
        </div>
        {open   &&   <Snackbar
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
              </Snackbar>}
      </div>
    </div>
  </div>

    </div>
  )
}

export default SignUpC
