import React from 'react'
import PropTypes from "prop-types";
import ReactTooltip from 'react-tooltip'
import Modal from "./Modal";
import {Button} from "@trendmicro/react-buttons";


class Casilla extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colorUsuario: '',
            casilla: undefined,
            modal: false
        }
    }

    componentDidMount() {
        console.log('entro en mount de casilla');
        this.setState({casilla: this.props.casilla, modal: this.props.activa, colorUsuario: this.props.colorUsuario},
            () => console.log(this.state));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.activa !== this.props.activa) {
            this.setState({casilla: this.props.casilla, modal: this.props.activa}, () => console.log(this.state));
        }
    }

    comprar() {
        console.log('llamo comprar');
        Meteor.call('comprar', this.props.numeroCasilla, this.props.idJugador, (err, resp) => {
            if (err) {
                console.log(err);
            } else {
                this.setState({colorUsuario: this.props.colorUsuario, modal: false}, ()=> this.props.handler());
            }
        });
    }

    pagar() {
        console.log('llamo pagar');
        Meteor.call('pagar', this.props.numeroCasilla, this.props.idJugador);
        this.setState({modal: false}, ()=> this.props.handler());
    }

    renderOptions() {
        if (this.state.casilla !== undefined) {
            if (this.state.casilla.Propietario === 0) {
                return (
                    <div>
                        <div>{`¿Desea comprar por: $${this.state.casilla.Precio}?`}</div>
                        <button onClick={() => this.comprar()}>Comprar</button>
                    </div>
                )
            } else if (this.state.casilla.Propietario !== this.props.idJugador) {
                return (
                    <div>
                        <button onClick={() => this.pagar()}>Pagar</button>
                    </div>
                )
            }
        } else {
            return (
                <div/>
            );
        }
    }

    render() {
        return (
            <div className="space property">
                    <div className="container"  data-tip={this.state.propietario}>
                        <ReactTooltip place="top" effect="solid" type="info"/>
                        {this.state.colorUsuario === undefined
                            ? <div className={`color-bar ${this.props.color}`}/>
                            : <div className={`color-bar ${this.state.colorUsuario}`}/>}
                        { this.props.rotacion === undefined
                            ? (<div className="image-container">
                                <img src={this.props.imagen} alt={this.props.nombre}/>
                            </div>)
                            : (<div className={`image-container ${this.props.rotacion}`}>
                                <img src={this.props.imagen} alt={this.props.nombre}/>
                            </div>)}
                        <div className="price">{`Precio: $${this.props.precio}`}</div>
                        <Modal show={this.state.modal}
                               onClick={() => this.setState({modal: false},() => this.props.handler())}>
                            <Modal.Header>
                                <Modal.Title>
                                    Elige operación
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="column">
                                    {this.renderOptions()}
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    btnStyle="primary"
                                    onClick={() => this.setState({modal: false},() => this.props.handler())}
                                >
                                    Realizar accion
                                </Button>
                                <Button
                                    btnStyle="default"
                                    onClick={() => this.setState({modal: false},() => this.props.handler())}
                                >
                                    Cancelar
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
            </div>
        )
    }
}

Casilla.propTypes = {
    imagen: PropTypes.string.isRequired,
    nombre: PropTypes.string,
    rotacion: PropTypes.string,
    color: PropTypes.string.isRequired,
    colorUsuario: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    numeroCasilla: PropTypes.number.isRequired,
    activa: PropTypes.bool.isRequired,
    casilla: PropTypes.object.isRequired,
    idJugador: PropTypes.number.isRequired
};

export default Casilla;
