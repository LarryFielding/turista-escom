import React from 'react'
import { Button } from './Buttons';
import Modal from './Modal';

export default class Dados extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dado1: 0,
            dado2: 0,
            face1: "&#x2680;",
            face2: "&#x2680;",
            rollCount: 1,
            isRolling: false,
            tirar: true,
            modal: false
        };
        this.tirarDados = this.tirarDados.bind(this);
        this.diceRoll = this.diceRoll.bind(this);
    };

    diceRoll() {
        let faceValue1 = this.generateRandomInt(0, 5);
        let faceValue2 = this.generateRandomInt(0, 5);
        this.setState({
            rollCount: this.state.rollCount - 1,
            isRolling: (this.state.rollCount > 0),
            dado1: faceValue1+1,
            dado2: faceValue2+1,
            face1: "&#x" + String(2680 + faceValue1) + ";",
            face2: "&#x" + String(2680 + faceValue2) + ";"
        }, () => {
            if (!this.state.isRolling) {
                const total = this.state.dado1 + this.state.dado2;
                this.setState({tirar: false});
                console.log(total);
                this.props.handler(this.props.idJugador, total);
            }
        });
    }

    tirarDados() {
        if (this.state.isRolling) {
            return;
        }
        let val = this.generateRandomInt(5,15);
        this.setState({rollCount: val});
        for (let i = 0; i <= val; i++){
            setTimeout(this.diceRoll, 250 * i);
        }
    }

    generateRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    render() {
        return (
            <div className="center__content">
                <button onClick={() => {
                    this.setState({modal: true, tirar: true})
                }}>
                    Tirar los dados
                </button>
                <Modal show={this.state.modal}
                       onClose={() => this.setState({modal: false})}>
                    <Modal.Header>
                        <Modal.Title>
                            Es tu turno
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row-general">
                            <div className="dado1" id="diceFace1" dangerouslySetInnerHTML={{__html: `${this.state.face1}`}}/>
                            <div className="dado2" id="diceFace2" dangerouslySetInnerHTML={{__html: `${this.state.face2}`}}/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            btnStyle="primary"
                            onClick={this.tirarDados}
                            disabled={!this.state.tirar}
                        >
                            Tirar
                        </Button>
                        <Button
                            btnStyle="default"
                            onClick={() => this.setState({modal: false})}
                            disabled={this.state.isRolling}
                        >
                            Salir
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
