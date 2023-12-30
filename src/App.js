import logo from './logo.svg';
import './App.css';
import SideBar from './components/SideBar';
import NavBarr from './components/NavBarr';
import Footer from './components/Footer';
import Dashboard from './components/pages/Dashboard';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AppBarr from './components/clients/AppBarr'
import SignUp from './components/register/SignUp';
import SignInD from './components/register/SignInD';
import Profiles from './components/pages/Profiles';
import { useContext } from 'react';
import { AuthContext } from './components/context/AuthContext';
import Clients from './components/pagesClient/Clients';
import Formulaire from './components/pagesClient/Formulaire';
import VoirTouslesOuvriers from './components/pagesClient/VoirTouslesOuvriers';
import SignIn from './components/clients/Register/SignIn';
import SignUpC from './components/clients/Register/SignUpC';
import Listes from './components/clients/Listes';
import MessagePrive from './components/clients/MessagePrive';
import HomeClient from './components/clients/HomeClient';
import MonProfiles from './components/clients/MonProfiles';

function App() {
const currentUser= useContext(AuthContext)

const ProtectedRoute = ({ children }) => {
  if (!currentUser) {
    // Si l'utilisateur n'est pas authentifié, rediriger vers "/signIn"
    return <Navigate to="/signInC" />;
  }

  // Si l'utilisateur est authentifié, afficher le contenu protégé
  return children;
};

  return (
   <BrowserRouter>
   <Routes>
    <Route path="/">
     
      <Route path='/HomeClient' element={<HomeClient/>}/>
      <Route index element={<ProtectedRoute>
        <AppBarr/>
           </ProtectedRoute>}/>
      <Route index element={<ProtectedRoute>
        <Home/>
           </ProtectedRoute>}/>
           <Route path='signInC' element={<SignIn/>}/>
           <Route path='MessagePV' element={<MessagePrive/>}/>
      <Route path='signUpC' element={<SignUpC/>}/>
      <Route path='signIn' element={<SignInD/>}/>
      <Route path='listes' element={<Listes/>}/>
      <Route path='signUp' element={<SignUp/>}/>
      <Route path='Profile' element={<Profiles/>}/>
      <Route path='MonProfile' element={<MonProfiles/>}/>
      <Route path='Dashboard' element={<Dashboard/>}/>
      <Route path='Client' element={<Clients/>}/>
      <Route path='Formulaire' element={<Formulaire/>}/>
      <Route path='Ouvriers' element={<VoirTouslesOuvriers/>}/>
    </Route>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
