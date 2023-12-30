import React from 'react'
import SideBar from '../SideBar'
import NavBarr from '../NavBarr'

function Clients() {
  return (
    <div>
     <div className="wrapper">
		<SideBar/>
		<div className="main">
		<NavBarr/>
      <main className="content">
				<div className="container-fluid p-0">

					<h1 className="h3 mb-3">Que rechercher vous? </h1>
                    <h2 className="h4 mb-3">Vous etes :</h2>

					<div className="row">
						<div className="col-6">
							<div className="card">
								<div className="card-header">
									<h5 className="card-title mb-0">Client pour mecanicien</h5>
								</div>
								<div className="card-body">
                                    <button class="btn btn-primary "> Voir plus</button>
								</div>
							</div>  
						</div>
                        <div className="col-6">
							<div className="card">
								<div className="card-header">
									<h5 className="card-title mb-0">Client pour femme de menage</h5>
								</div>
								<div className="card-body">
                                     <button class="btn btn-primary "> Voir plus</button>
								</div>
							</div>
						</div>
                        <div className="col-6">
							<div className="card">
								<div className="card-header">
									<h5 className="card-title mb-0">femme de menage </h5>
								</div>
								<div className="card-body">
                                <button class="btn btn-primary "> S'inscrire3
								</button>
								</div>
							</div>
						</div>
                        <div className="col-6">
							<div className="card">
								<div className="card-header">
									<h5 className="card-title mb-0">Ouvrier</h5>
								</div>
								<div className="card-body">
                                     <button class="btn btn-primary "> S'inscrire
									 </button>
								</div>
							</div>
						</div>
						<div className="col-6">
							<div className="card">
								<div className="card-header">
									<h5 className="card-title mb-0">Tuteur a domicile</h5>
								</div>
								<div className="card-body">
                                     <button class="btn btn-primary "> S'inscrire
									 </button>
								</div>
							</div>
						</div><div className="col-6">
							<div className="card">
								<div className="card-header">
									<h5 className="card-title mb-0">Nounous</h5>
								</div>
								<div className="card-body">
                                     <button class="btn btn-primary "> S'inscrire
									 </button>
								</div>
							</div>
						</div>
					</div>


				</div>
			</main>
             </div>
             </div>
    </div>
  )
}

export default Clients
