import { useState } from 'react';
import './Projects.css';

const projects = [{
    id: 0,
    name: 'Pokemon Application',
    logo: '/pokemon.png',
    backgroundColor: 'bg-amber-400',
    links: {
        github: '#',
        hosted: '#',
    },
},
{
    id: 1,
    name: 'Bifrost Application',
    logo: '/bifrost.png',
    backgroundColor: 'bg-green-400',
    links: {
        github: '#',
        hosted: '#',
    },
},
{
    id: 2,
    name: 'Planet Visualizer Application',
    logo: '/planet.png',
    backgroundColor: 'bg-orange-400',
    links: {
        github: '#',
        hosted: '#',
    },
},];

function Projects(){
    return(
        <>
            <div className = 'projects py-20 px-6'>  
                <div className = 'projects__title pb-6 text-4xl font-bold text-center'>
                    My Recent Work
                </div>

                <div className = 'projects__subtitle pb-6 text-xl text-center font-light'>
                    Here are a few design projects I've worked on recently.
                </div>

                <div className = 'projects__list py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                    {
                        projects.map(project => {
                            return <div key = { project.id } className = 'mb-5'>
                                <div className = 'project flex m-3 h-60'>
                                    <div className = {'project__thumbnail flex justify-center items-center grow rounded-xl ' + project.backgroundColor}>
                                        <img className = 'w-24 h-24' src = { project.logo } alt = { project.name } />
                                    </div>
    
                                    <div className = 'project__links flex flex-col p-3 justify-center'>
                                        <a target = '_blank' href = { project.links.github}>
                                            <img className = 'w-6 h-6 my-3' src = '/github.png' alt = 'github' />
                                        </a>
    
                                        <a target = '_blank' href = { project.links.hosted }>
                                            <img className = 'w-6 h-6 my-3' src = '/web.png' alt = 'hosting' />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </> 
    );
}

export default Projects;