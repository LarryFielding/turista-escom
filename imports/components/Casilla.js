import React from 'react'
import PropTypes from "prop-types";
import ReactTooltip from 'react-tooltip'


class Casilla extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            propietario: ''
        }
    }

    render() {
        return (
            <div className="space property">
                    <div className="container"  data-tip={this.state.propietario}>
                        <ReactTooltip place="top" effect="solid" type="info"/>
                        {this.props.colorUsuario === undefined
                            ? <div className={`color-bar ${this.props.color}`}/>
                            : <div className={`color-bar ${this.props.colorUsuario}`}/>}
                        { this.props.rotacion === undefined
                            ? (<div className="image-container">
                                <img src={this.props.imagen} alt={this.props.nombre}/>
                            </div>)
                            : (<div className={`image-container ${this.props.rotacion}`}>
                                <img src={this.props.imagen} alt={this.props.nombre}/>
                            </div>)}
                        <div className="price">{`Precio: $${this.props.precio}`}</div>
                    </div>
            </div>
        )
    }
}

Casilla.propTypes = {
    imagen: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    rotacion: PropTypes.string,
    color: PropTypes.string.isRequired,
    colorUsuario: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    numeroCasilla: PropTypes.number.isRequired
};

export default Casilla;
