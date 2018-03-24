import React from 'react';
import './Product.css';
import * as img1 from '../../img/1.jpeg';
import * as imgLeft from '../../img/2.jpeg';
import * as imgRight from '../../img/3.jpeg';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const Product = props => {
    let options=[{ value: 'one', label: 'S (34)' },
    { value: 'two', label: 'M' }]
    return (
        <div className="product">
            <div className="gallery">
                <img className="left-img" src={imgLeft} width={300} height={450}/>
                <img src={img1} width={400} height={600}/>
                <img className="right-img" src={imgRight} width={300} height={450}/>
            </div>
            <div className="line"></div>
            <div className="description">
                <div className="price">
                    <p className="price-label"><strong>699,00 zł</strong></p>
                    <Dropdown 
                    options={options} 
                    onChange={props.onSizeSelect} 
                    value={options[0]} 
                    placeholder="Select an option" />
                </div>
                <p>Długa koronkowa sukienka. Niska stójka z falistym brzegiem. Z tyłu wycięcie i kryty suwak na plecach. Motylkowy rękaw z falistym brzegiem. Odcinana talia, lekko rozszerzany asymetryczny dół z dłuższym tyłem. Z satynową podszewką.</p>
            </div>
        </div>
    )
}

export default Product;