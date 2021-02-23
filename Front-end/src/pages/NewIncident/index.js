import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api'

import { FiArrowLeft } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg'
import './style.css'

function NewIncident(){

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();
    const ongId = localStorage.getItem('ongId')

    async function handleNewIncident(event){
        event.preventDefault();

        const data = {
            title,
            description,
            value
        }

        try {
            await api.post('/incidents', data, {
                headers: {
                    Authorization: ongId
                }
            })
            history.push('/profile')
        } catch (err) {
            alert('Não foi possível cadastrar um novo caso, tente novamente.');
        }
    }

    return(
        <>
            <div className="new-incident-container">
                <div className="content">
                    <section>
                        <img src={logoImg} alt="Be The Hero Logo"/>

                        <h1>Cadastrar novo caso</h1>
                        <p>Descreve os caso detalhadamente para encontrar um herói para resolver.</p>

                        <Link className="back-link" to="/profile">
                            <FiArrowLeft size={16} color="#EA2041" />
                            Voltar para Home
                        </Link>
                    </section>

                    <form onSubmit={handleNewIncident}>
                        <input placeholder="Titulo do Caso"
                            value={title} 
                            onChange={event => setTitle(event.target.value)}
                        />
                        <textarea 
                            placeholder="Descrição"
                            maxLength="200" 
                            value={description}
                            onChange={event => setDescription(event.target.value)}
                        />
                        <input
                            placeholder="Valor em reais" 
                            value={value}
                            onChange={event => setValue(event.target.value)}
                        />
                        <button className="button" type="submit">Cadastrar</button>
                    </form>
                </div>
            </div>        
        </>
    )
}

export default NewIncident