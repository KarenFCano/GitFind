import React from 'react';
import { useState } from 'react';
import { Header } from '../../components/Header';
import './styles.css';
import background from '../../assets/background.png';
import ItemList from '../../components/ItemList';

function App() {

    const [username, setUsername] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [repos, setRepos] = useState(null);
    const [error, setError] = useState(null);

    const handleGetData = async () => {
        const userData = await fetch(`https://api.github.com/users/${username}`);
        const newUser = await userData.json();
        if (newUser.name) {
            const { avatar_url, name, bio, login } = newUser;
            setCurrentUser({ avatar_url, name, bio, login });
        }
        else {
            setError(newUser.message);
        }

        const reposData = await fetch(`https://api.github.com/users/${username}/repos`);
        const newRepos = await reposData.json();

        if (newRepos.length) {
            setRepos(newRepos);
        }
    }

    return (
        <div className="App">
            <Header />
            <div className="container">
                <img className="background" src={background} alt="background" />
                <div className="info">
                    <div>
                        <input
                            name="usuario"
                            placeholder="@username"
                            onChange={e => setUsername(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={handleGetData}
                        >
                            Buscar
                        </button>
                    </div>
                    {currentUser?.name ? (
                        <>
                            <div className="perfil">
                                <img
                                    src={currentUser.avatar_url}
                                    className="profile"
                                    alt="avatar"
                                />
                                <div>
                                    <h3>{currentUser.name}</h3>
                                    <span>{currentUser.login}</span>
                                    <p>{currentUser.bio}</p>
                                </div>
                            </div>
                            <hr />
                        </>
                    ) : 
                    error ? (
                        <h3 className='not-found'>Usuário não encontrado</h3>
                    ) : null}
                    {repos?.length ? (
                        <div>
                            <h4 className='repositorio'>Repositórios</h4>
                            {repos.map(repo => (
                                <ItemList
                                    title={repo.name}
                                    html_url= {repo.html_url}
                                    description={repo.description}
                                />
                            ))}
                        </div>

                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default App;
