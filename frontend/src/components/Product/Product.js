import React from 'react';
import './Product.css';
import * as img1 from '../../img/1.jpeg';
import * as imgLeft from '../../img/2.jpeg';
import * as imgRight from '../../img/3.jpeg';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import * as price from '../../img/12.png';
import Issue from '../Issue/Issue';

const Product = props => {
    let options = [{ value: 'one', label: 'S (34)' },
    { value: 'two', label: 'M' }]
    return (
        <div>
            <div className="product">
                <div className="gallery">
                    {/* <img className="left-img" src={imgLeft} width={300} height={450}/> */}
                    <img src={img1} width={400} height={640} />
                    <img className="right-img" src={imgRight} width={400} height={640} />
                </div>
                <div className="desc-div">
                    <div className="description">
                        <img src={price} width={450} height={410} />
                        {/* <div className="price">
                        <p className="price-label"><strong>Długa sukienka z koronki</strong></p>
                        <p className="price-label"><strong>699,00 zł</strong></p>
                        <Dropdown
                            options={options}
                            onChange={props.onSizeSelect}
                            value={options[0]}
                            placeholder="Select an option" />
                    </div> */}
                    </div>
                    <div className="question-div">
                        <p>Masz pytanie?</p>
                        <button className="open-modal-btn" onClick={props.openModalOnCLick}>Kliknij tu</button>
                        <p>lub powiedz "Mam pytanie"</p>
                    </div>
                </div>
            </div>
            <div className="description desc">
                <p>Długa koronkowa sukienka. Niska stójka z falistym brzegiem. Z tyłu wycięcie i kryty suwak na plecach. Motylkowy rękaw z falistym brzegiem. Odcinana talia, lekko rozszerzany asymetryczny dół z dłuższym tyłem. Z satynową podszewką.</p>
            </div>
        </div>
    )
}

export default Product;