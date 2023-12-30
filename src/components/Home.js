import React from 'react';


import SideBar from './SideBar';
import NavBarr from './NavBarr';
import Footer from './Footer';
import Dashboard from './pages/Dashboard';

function Home() {
  return (
    <div className='wrapper'>
     <SideBar/>
     <div class="main">
      <NavBarr/>
      <main className='content'>
        <div className='container-fluid p-0'>
          <Dashboard/>
        </div>
      </main>
      <Footer/>
     </div>
    </div>
  );
}

export default Home;
