import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft }  from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/logo.svg'

export default function Register(){
    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the hero"/>
                    <p>Faça seu cadastro, entre na plataforma e ajude 
                        pessoas a encontrarem os casos da sua ONG</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Home Page
                    </Link>
                </section>
                <form>
                    <input placeholder="Nome da ONG"/>
                    <input type="email" placeholder="E-mail"/>
                    <input placeholder="Whatsapp"/>

                    <div className="input-group">
                        <input placeholder="Cidade"/>
                        <input placeholder="UF" style={ { width: 80 }}/>
                    </div>
                    <button type="submit" className="button"> Cadastrar </button>
                </form>
            </div>
        </div>
    )

}