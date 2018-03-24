import React from 'react';
import { Button, Header, Icon, Modal, Checkbox, Form, TextArea, Feed } from 'semantic-ui-react';
import './Modal.css';

const categories = [
    "zapytanie o produkt",
    "reklamacja",
    "zwrot",
    "inne"
]

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const ModalRep = props => {
    return (
        <Modal open={props.isModalOpened}>
            <Modal.Header>
                <Feed>
                    <Feed.Label>
                        <img src='/assets/images/avatar/small/elliot.jpg' />
                    </Feed.Label>
                </Feed>
            </Modal.Header>
            <Modal.Content image scrolling>
                <Modal.Description>
                    <p>Wybierz kategorię</p>
                    <Checkbox label={capitalizeFirstLetter(categories[0])} value={categories[0]} checked={props.checked === categories[0]} onChange={props.handleCheckboxChanges} />
                    <Checkbox label={capitalizeFirstLetter(categories[1])} value={categories[1]} checked={props.checked === categories[1]} onChange={props.handleCheckboxChanges} />
                    <Checkbox label={capitalizeFirstLetter(categories[2])} value={categories[2]} checked={props.checked === categories[2]} onChange={props.handleCheckboxChanges} />
                    <Checkbox label={capitalizeFirstLetter(categories[3])} value={categories[3]} checked={props.checked === categories[3]} onChange={props.handleCheckboxChanges} />
                    <div className="text-area-div">
                        <Form>
                            <TextArea value={props.problemDescription} onChange={props.problemDescriptionChange} placeholder='Opowiedz nam więcej' style={{ minHeight: 100 }} />
                        </Form>
                    </div>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button primary onClick={props.proceedData}>
                    Proceed <Icon name='right chevron' />
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default ModalRep;
