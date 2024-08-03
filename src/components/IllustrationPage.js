import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/IllustrationPage.css";

function IllustrationPage(props) {
    const navigate = useNavigate();

    return (
        <div>
            <div class="illustration-main-container">
                <div className="illustration-container">
                    <h2>{props.heading}</h2>
                    <p>{props.subheading}</p>
                    <img src={props.img} alt="" />
                    {
                        props.btnText != null ? <button onClick={() => { navigate(props.btnNavigate) }}>{props.btnText}</button> : null
                    }
                </div>
            </div>
        </div>
    )
}

export default IllustrationPage;
