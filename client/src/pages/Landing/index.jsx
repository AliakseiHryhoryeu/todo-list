import React from 'react'

import Header from '../../components/Header'
import Slider from '../../components/Slider'
import Footer from '../../components/Footer'
import { Link } from "react-router-dom"

import checkedImg from '../../assets/img/checked_1.svg';

import './Landing.scss'

export default function Landing() {
    return (
        <div className="Landing">
            <Header />
            <div className="main">
                <section className="home">
                    <div className="home__wrapper">
                        <div className="home__title">
                            Manage your task
                        </div>
                        <div className="home__subtitle">
                            To do list enable you to organize and prioritize your projects in a fun, flexible, and rewarding way. Let's started.
                        </div>
                        <div className="home__container">
                            <Link className="home__button" to="/registration">Get started</Link>
                            <a className="home__button" href="">Lets see how it work</a>

                        </div>

                    </div>

                </section>
                <section className="about">
                    <div className="about__wrapper">
                        <div className="about__title">
                            How it works?
                        </div>
                        <div className="about__subtitle">
                            <ul className="about__list">
                                <li className="about__item">
                                    <img src={checkedImg} alt="" />
                                    You can create, edit and delete to-do lists in which your tasks will be stored
                                </li>
                                <li className="about__item">
                                    <img src={checkedImg} alt="" />
                                    It is convenient to view, edit and delete tasks
                                </li>
                                <li className="about__item">
                                    <img src={checkedImg} alt="" />
                                    Completed tasks can be marked
                                </li>
                            </ul>
                        </div>
                        <div className="about__slider">
                            <Slider />
                        </div>
                        <Link className="about__button" to="/registration">Get started</Link>

                    
                    </div>
                </section>
            </div>

            <Footer />
        </div>
    )
}
