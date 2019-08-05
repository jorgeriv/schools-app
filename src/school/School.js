import React from 'react';
import './School.css';

export default function School(props) {
    return (
    <div className="school">
        <h3>{props.school.name}</h3>
        <p>Rating:<span>{props.school.rating}</span></p>
        <p>Ranking:<span>{props.school.ranking}</span></p>
    </div>
    );
}