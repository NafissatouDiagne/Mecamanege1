import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from '../../firebase'
import { doc, setDoc } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Button, IconButton, Snackbar,Alert } from '@mui/material';


function SignUp() {
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
      	<main class="d-flex w-100">
		<div class="container d-flex flex-column">
			<div class="row vh-100">
				<div class="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
					<div class="d-table-cell align-middle">

						<div class="text-center mt-4">
							<h1 class="h2">Get started</h1>
							<p class="lead">
								Start creating the best possible user experience for you customers.
							</p>
						</div>

						<div class="card">
							<div class="card-body">
								<div class="m-sm-3">
									<form onSubmit={handleSubmit}>
										<div class="mb-3">
											<label class="form-label">Full name</label>
											<input class="form-control form-control-lg" type="text" name="name" placeholder="Enter your name" value={displayName} onChange={(e)=>setdisplayName(e.target.value)} />
										</div>
										<div class="mb-3">
											<label class="form-label">Email</label>
											<input class="form-control form-control-lg" type="email" name="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)} />
										</div><div class="mb-3">
											<label class="form-label">Photo</label>
											<input class="form-control form-control-lg" type="file" name="file" placeholder="Enter your image"  onChange={(e)=>setFile(e.target.files[0])} />
										</div>
										<div class="mb-3">
											<label class="form-label">Password</label>
											<input class="form-control form-control-lg" type="password" name="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
										</div>
										<div class="d-grid gap-2 mt-3">
											<button class="btn btn-lg btn-primary" type='submit'> Sign up</button>
										</div>
									</form>
								</div>
							</div>
						</div>
						<div class="text-center mb-3">
							Already have account? <Link to='/signIn' href="pages-sign-in.html">Log In</Link>
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
	</main>

    </div>
  )
}

export default SignUp
