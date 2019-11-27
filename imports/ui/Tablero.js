import React from 'react'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Dados from "../components/Dados";
import Casilla from "../components/Casilla";


const client = new W3CWebSocket('ws://127.0.0.1:8000');

export default class Tablero extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            flag: false,
            jugadores: [],
            casillas: [],
            idJugador: 0,
            colores: [],
            activa: false
        };

        this.moverJugador = this.moverJugador.bind(this);
        this.desactive = this.desactive.bind(this);
        this.getPlayerPosition = this.getPlayerPosition.bind(this);
    }

    componentDidMount() {
        client.onopen = () => {
            console.log('WebSocket Client Connected');
            for (let i = 1; i <= 40; i++) {
                Meteor.call('getBoard', i,(err, res) => {
                    if (err) {
                        console.log(err);
                    } else {
                        this.setState({casillas: [...this.state.casillas, res]}, () => {
                            if (i === 40) {
                                console.log(this.state);
                            }
                        });
                    }
                });
            }
            let usuario = prompt('¿Número de jugador (1/2): ');
            this.setState({
                idJugador: parseInt(usuario)
            }, () => {
                Meteor.call('getPlayer', 0,(err, res) => {
                    if (err) {
                        console.log(err);
                    } else {
                        this.setState({jugadores: [...this.state.jugadores, res]});
                        console.log(this.state);
                    }
                });
                Meteor.call('getPlayer', 1,(err, res) => {
                    if (err) {
                        console.log(err);
                    } else {
                        this.setState({jugadores: [...this.state.jugadores, res]});
                        console.log(this.state);
                    }
                });
            });
        };
        client.onmessage = (message) => {
            const info = JSON.parse(message.data);
            if (info.tipo === 'jugador') {
                const jugador = info.data;
                const tempArr = this.state.jugadores.filter(j => j.id !== jugador.id);
                this.setState({
                    jugadores: [...tempArr, jugador]
                }, () => console.log('se actualizaron jugadores: ', this.state));
            } else if (info.tipo === 'casilla') {
                const casilla = info.data;
                const tempArr = this.state.casillas.filter(c => c.Posicion !== casilla.Posicion);
                let c = [...tempArr, casilla];
                c.sort((a,b) => a.Posicion < b.Posicion ? -1 : 1);
                this.setState({
                    casillas: c
                }, () => console.log('se actualizaron casillas: ', this.state));
            }
        };
        // Estados de prueba:
        this.setState({
            colores: ['yellow', 'red', 'green', 'orange']
        });
    }

    getPlayerColor(casilla) {
        const index = this.state.jugadores.findIndex(j => j.posicion === casilla);
        if (index === -1) {
            return undefined;
        } else {
            return this.state.colores[index];
        }
    }

    getPlayerPosition(casilla) {
        const index = this.state.jugadores.findIndex(j => j.posicion === casilla);
        if (index === -1) {
            return undefined;
        } else {
            return this.state.jugadores[index].posicion;
        }
    }

    moverJugador(idJugador, dados) {
        /*
        this.setState(prevState => ({
            jugadores : prevState.jugadores.map(
                j => j.id === idJugador ? {...j, posicion: (j.posicion+dados)%40} : j),
            activa: true
        }), () => {
            console.log(this.state);
            console.log(this.state.jugadores[this.state.idJugador-1].posicion);
        });*/
        Meteor.call('tirar', idJugador, dados, (err, res) => {
            if (res) {
                this.setState({activa: true});
            }
        });
    }

    desactive() {
        this.setState({activa: false});
    }

    render() {
        return (
            <div>
                {this.state.casillas.length !== 40 ? undefined
                    : <div className="table">
                        <div className="board">
                            <div className="center">
                                <div className="community-chest-deck">
                                    <div className="ipn-logo"/>
                                    <div align="center">
                                        <button>Ver datos</button>
                                    </div>
                                </div>
                                <h1 className="title">TURISTA ESCOM</h1>
                                <div className="chance-deck">
                                    <div className="escom-logo"/>
                                    <div align="center">
                                        <Dados idJugador={this.state.idJugador} handler={this.moverJugador}/>
                                    </div>
                                </div>
                            </div>

                            {/*ESQUINA INFERIOR DERECHA*/}
                            <div className="space corner go">
                                <img src="/casillas/11.png" alt="Recursar"/>
                            </div>

                            {/* CASILLAS ABAJO */}
                            <div className="row horizontal-row bottom-row">
                                <Casilla imagen="/casillas/2.png"
                                         nombre="Mate-Discretas"
                                         color="light-blue"
                                         colorUsuario={this.state.casillas[2-1].Propietario > 0
                                             ? this.state.colores[this.state.casillas[2-1].Propietario-1]
                                             : this.getPlayerColor(2)}
                                         activa={this.state.activa && 2 === this.state.jugadores[this.state.idJugador-1].posicion}
                                         casilla={this.state.casillas[2-1]}
                                         idJugador={this.state.idJugador}
                                         rotacion="rotacion-90"
                                         handler={this.desactive}
                                         precio={this.state.casillas[2-1].Precio} numeroCasilla={2}/>

                                <Casilla imagen="/casillas/3.png"
                                         nombre="Mate-Discretas"
                                         color="light-blue"
                                         //colorUsuario={this.getPlayerColor(3)}
                                         colorUsuario={this.state.casillas[3-1].Propietario > 0
                                             ? this.state.colores[this.state.casillas[3-1].Propietario-1]
                                             : this.getPlayerColor(3)}
                                         activa={this.state.activa && 3 === this.state.jugadores[this.state.idJugador-1].posicion}
                                         casilla={this.state.casillas[3-1]}
                                         idJugador={this.state.idJugador}
                                         handler={this.desactive}
                                         precio={this.state.casillas[3-1].Precio} numeroCasilla={3}/>

                                <Casilla imagen="/casillas/4.png"
                                         nombre="Mate-Discretas"
                                         color="light-blue"
                                         //colorUsuario={this.getPlayerColor(4)}
                                         colorUsuario={this.state.casillas[4-1].Propietario > 0
                                             ? this.state.colores[this.state.casillas[4-1].Propietario-1]
                                             : this.getPlayerColor(4)}
                                         activa={this.state.activa && 4 === this.state.jugadores[this.state.idJugador-1].posicion}
                                         casilla={this.state.casillas[4-1]}
                                         idJugador={this.state.idJugador}
                                         handler={this.desactive}
                                         precio={this.state.casillas[4-1].Precio} numeroCasilla={4}/>

                                <Casilla imagen="/casillas/5.png"
                                         nombre="Mate-Discretas"
                                         color="light-blue"
                                         //colorUsuario={this.getPlayerColor(5)}
                                         colorUsuario={this.state.casillas[5-1].Propietario > 0
                                             ? this.state.colores[this.state.casillas[5-1].Propietario-1]
                                             : this.getPlayerColor(5)}
                                         activa={this.state.activa && 5 === this.state.jugadores[this.state.idJugador-1].posicion}
                                         casilla={this.state.casillas[5-1]}
                                         idJugador={this.state.idJugador}
                                         handler={this.desactive}
                                         precio={this.state.casillas[5-1].Precio} numeroCasilla={5}/>

                                <Casilla imagen="/casillas/6.png"
                                         nombre="Mate-Discretas"
                                         color="light-blue"
                                         //colorUsuario={this.getPlayerColor(6)}
                                         colorUsuario={this.state.casillas[6-1].Propietario > 0
                                             ? this.state.colores[this.state.casillas[6-1].Propietario-1]
                                             : this.getPlayerColor(6)}
                                         activa={this.state.activa && 6 === this.state.jugadores[this.state.idJugador-1].posicion}
                                         casilla={this.state.casillas[6-1]}
                                         idJugador={this.state.idJugador}
                                         handler={this.desactive}
                                         precio={this.state.casillas[6-1].Precio} numeroCasilla={6}/>

                                <Casilla imagen="/casillas/7.png"
                                         nombre="Mate-Discretas"
                                         color="light-blue"
                                         //colorUsuario={this.getPlayerColor(7)}
                                         colorUsuario={this.state.casillas[7-1].Propietario > 0
                                             ? this.state.colores[this.state.casillas[7-1].Propietario-1]
                                             : this.getPlayerColor(7)}
                                         activa={this.state.activa && 7 === this.state.jugadores[this.state.idJugador-1].posicion}
                                         casilla={this.state.casillas[7-1]}
                                         rotacion="rotacion-90"
                                         idJugador={this.state.idJugador}
                                         handler={this.desactive}
                                         precio={this.state.casillas[7-1].Precio} numeroCasilla={7}/>

                                <Casilla imagen="/casillas/8.png"
                                         color="light-blue"
                                         //colorUsuario={this.getPlayerColor(8)}
                                         colorUsuario={this.state.casillas[8-1].Propietario > 0
                                             ? this.state.colores[this.state.casillas[8-1].Propietario-1]
                                             : this.getPlayerColor(8)}
                                         activa={this.state.activa && 8 === this.state.jugadores[this.state.idJugador-1].posicion}
                                         casilla={this.state.casillas[8-1]}
                                         rotacion="rotacion-90"
                                         idJugador={this.state.idJugador}
                                         handler={this.desactive}
                                         precio={this.state.casillas[8-1].Precio} numeroCasilla={8}/>

                                <Casilla imagen="/casillas/9.png"
                                         color="light-blue"
                                         //colorUsuario={this.getPlayerColor(9)}
                                         colorUsuario={this.state.casillas[9-1].Propietario > 0
                                             ? this.state.colores[this.state.casillas[9-1].Propietario-1]
                                             : this.getPlayerColor(9)}
                                         activa={this.state.activa && 9 === this.state.jugadores[this.state.idJugador-1].posicion}
                                         casilla={this.state.casillas[9-1]}
                                         idJugador={this.state.idJugador}
                                         handler={this.desactive}
                                         precio={this.state.casillas[9-1].Precio} numeroCasilla={9}/>

                                <Casilla imagen="/casillas/10.png"
                                         color="light-blue"
                                         //colorUsuario={this.getPlayerColor(10)}
                                         colorUsuario={this.state.casillas[10-1].Propietario > 0
                                             ? this.state.colores[this.state.casillas[10-1].Propietario-1]
                                             : this.getPlayerColor(10)}
                                         activa={this.state.activa && 10 === this.state.jugadores[this.state.idJugador-1].posicion}
                                         casilla={this.state.casillas[10-1]}
                                         idJugador={this.state.idJugador}
                                         handler={this.desactive}
                                         precio={this.state.casillas[10-1].Precio} numeroCasilla={10}/>
                            </div>
                            {/* INICIO*/}
                            <div>
                                <img src="casillas/1.png" alt="Salida"/>
                            </div>

                            {/*CASILLAS IZQUIERDA*/}
                            <div className="row vertical-row left-row">
                                <Casilla imagen="/casillas/32.png"
                                         color="blanco"
                                         colorUsuario={this.state.casillas[32-1].Propietario > 0
                                             ? this.state.colores[this.state.casillas[32-1].Propietario-1]
                                             : this.getPlayerColor(32)}
                                         activa={this.state.activa && 32 === this.state.jugadores[this.state.idJugador-1].posicion}
                                         casilla={this.state.casillas[32-1]}
                                         idJugador={this.state.idJugador}
                                         handler={this.desactive}
                                         precio={this.state.casillas[32-1].Precio} numeroCasilla={32}/>
                                <Casilla imagen="/casillas/33.png"
                                         color="blanco"
                                         colorUsuario={this.state.casillas[33-1].Propietario > 0
                                             ? this.state.colores[this.state.casillas[33-1].Propietario-1]
                                             : this.getPlayerColor(33)}
                                         activa={this.state.activa && 33 === this.state.jugadores[this.state.idJugador-1].posicion}
                                         casilla={this.state.casillas[33-1]}
                                         idJugador={this.state.idJugador}
                                         handler={this.desactive}
                                         precio={this.state.casillas[33-1].Precio} numeroCasilla={33}/>
                                <Casilla imagen="/casillas/34.png"
                                         color="blanco"
                                         colorUsuario={this.state.casillas[34-1].Propietario > 0
                                             ? this.state.colores[this.state.casillas[34-1].Propietario-1]
                                             : this.getPlayerColor(34)}
                                         activa={this.state.activa && 34 === this.state.jugadores[this.state.idJugador-1].posicion}
                                         casilla={this.state.casillas[34-1]}
                                         idJugador={this.state.idJugador}
                                         handler={this.desactive}
                                         precio={this.state.casillas[34-1].Precio} numeroCasilla={34}/>
                                <Casilla imagen="/casillas/35.png"
                                         color="blanco"
                                         colorUsuario={this.state.casillas[35-1].Propietario > 0
                                             ? this.state.colores[this.state.casillas[35-1].Propietario-1]
                                             : this.getPlayerColor(35)}
                                         activa={this.state.activa && 35 === this.state.jugadores[this.state.idJugador-1].posicion}
                                         casilla={this.state.casillas[35-1]}
                                         idJugador={this.state.idJugador}
                                         handler={this.desactive}
                                         precio={this.state.casillas[35-1].Precio} numeroCasilla={35}/>
                                <Casilla imagen="/casillas/36.png"
                                         color="blanco"
                                         colorUsuario={this.state.casillas[36-1].Propietario > 0
                                             ? this.state.colores[this.state.casillas[36-1].Propietario-1]
                                             : this.getPlayerColor(36)}
                                         activa={this.state.activa && 36 === this.state.jugadores[this.state.idJugador-1].posicion}
                                         casilla={this.state.casillas[36-1]}
                                         idJugador={this.state.idJugador}
                                         handler={this.desactive}
                                         precio={this.state.casillas[36-1].Precio} numeroCasilla={36}/>
                                <Casilla imagen="/casillas/37.png"
                                         color="blanco"
                                         colorUsuario={this.state.casillas[37-1].Propietario > 0
                                             ? this.state.colores[this.state.casillas[37-1].Propietario-1]
                                             : this.getPlayerColor(37)}
                                         activa={this.state.activa && 37 === this.state.jugadores[this.state.idJugador-1].posicion}
                                         casilla={this.state.casillas[37-1]}
                                         idJugador={this.state.idJugador}
                                         handler={this.desactive}
                                         precio={this.state.casillas[37-1].Precio} numeroCasilla={37}/>
                                <Casilla imagen="/casillas/38.png"
                                         color="blanco"
                                         colorUsuario={this.state.casillas[38-1].Propietario > 0
                                             ? this.state.colores[this.state.casillas[38-1].Propietario-1]
                                             : this.getPlayerColor(38)}
                                         activa={this.state.activa && 38 === this.state.jugadores[this.state.idJugador-1].posicion}
                                         casilla={this.state.casillas[38-1]}
                                         idJugador={this.state.idJugador}
                                         handler={this.desactive}
                                         precio={this.state.casillas[38-1].Precio} numeroCasilla={38}/>
                                <Casilla imagen="/casillas/39.png"
                                         color="blanco"
                                         colorUsuario={this.state.casillas[39-1].Propietario > 0
                                             ? this.state.colores[this.state.casillas[39-1].Propietario-1]
                                             : this.getPlayerColor(39)}
                                         activa={this.state.activa && 39 === this.state.jugadores[this.state.idJugador-1].posicion}
                                         casilla={this.state.casillas[39-1]}
                                         idJugador={this.state.idJugador}
                                         handler={this.desactive}
                                         precio={this.state.casillas[39-1].Precio} numeroCasilla={39}/>
                                <Casilla imagen="/casillas/40.png"
                                         color="blanco"
                                         colorUsuario={this.state.casillas[40-1].Propietario > 0
                                             ? this.state.colores[this.state.casillas[40-1].Propietario-1]
                                             : this.getPlayerColor(40)}
                                         activa={this.state.activa && 40 === this.state.jugadores[this.state.idJugador-1].posicion}
                                         casilla={this.state.casillas[40-1]}
                                         idJugador={this.state.idJugador}
                                         handler={this.desactive}
                                         precio={this.state.casillas[40-1].Precio} numeroCasilla={40}/>
                            </div>

                            <div className="space corner free-parking rotacion-180">
                                <img src="/casillas/31.png" alt="Reprobado"/>
                            </div>
                            {/* CASILLAS ARRIBA */}
                            <div className="row horizontal-row top-row">
                                <Casilla imagen="/casillas/30.png"
                                         color="azul-escom"
                                         colorUsuario={this.state.casillas[30-1].Propietario > 0
                                             ? this.state.colores[this.state.casillas[30-1].Propietario-1]
                                             : this.getPlayerColor(30)}
                                         activa={this.state.activa && 30 === this.state.jugadores[this.state.idJugador-1].posicion}
                                         casilla={this.state.casillas[30-1]}
                                         idJugador={this.state.idJugador}
                                         handler={this.desactive}
                                         precio={this.state.casillas[30-1].Precio} numeroCasilla={30}/>
                                <Casilla imagen="/casillas/29.png"
                                         color="azul-escom"
                                         colorUsuario={this.state.casillas[29-1].Propietario > 0
                                             ? this.state.colores[this.state.casillas[29-1].Propietario-1]
                                             : this.getPlayerColor(29)}
                                         activa={this.state.activa && 29 === this.state.jugadores[this.state.idJugador-1].posicion}
                                         casilla={this.state.casillas[29-1]}
                                         idJugador={this.state.idJugador}
                                         handler={this.desactive}
                                         precio={this.state.casillas[29-1].Precio} numeroCasilla={29}/>
                                <Casilla imagen="/casillas/28.png"
                                         color="azul-escom"
                                         colorUsuario={this.state.casillas[28-1].Propietario > 0
                                             ? this.state.colores[this.state.casillas[28-1].Propietario-1]
                                             : this.getPlayerColor(28)}
                                         activa={this.state.activa && 28 === this.state.jugadores[this.state.idJugador-1].posicion}
                                         casilla={this.state.casillas[28-1]}
                                         idJugador={this.state.idJugador}
                                         handler={this.desactive}
                                         precio={this.state.casillas[28-1].Precio} numeroCasilla={28}/>
                                <Casilla imagen="/casillas/27.png"
                                         color="azul-escom"
                                         colorUsuario={this.state.casillas[27-1].Propietario > 0
                                             ? this.state.colores[this.state.casillas[27-1].Propietario-1]
                                             : this.getPlayerColor(27)}
                                         activa={this.state.activa && 27 === this.state.jugadores[this.state.idJugador-1].posicion}
                                         casilla={this.state.casillas[27-1]}
                                         idJugador={this.state.idJugador}
                                         handler={this.desactive}
                                         precio={this.state.casillas[27-1].Precio} numeroCasilla={27}/>
                                <Casilla imagen="/casillas/26.png"
                                         color="azul-escom"
                                         colorUsuario={this.state.casillas[26-1].Propietario > 0
                                             ? this.state.colores[this.state.casillas[26-1].Propietario-1]
                                             : this.getPlayerColor(26)}
                                         activa={this.state.activa && 26 === this.state.jugadores[this.state.idJugador-1].posicion}
                                         casilla={this.state.casillas[26-1]}
                                         idJugador={this.state.idJugador}
                                         handler={this.desactive}
                                         precio={this.state.casillas[26-1].Precio} numeroCasilla={26}/>
                                <Casilla imagen="/casillas/25.png"
                                         color="azul-escom"
                                         colorUsuario={this.state.casillas[25-1].Propietario > 0
                                             ? this.state.colores[this.state.casillas[25-1].Propietario-1]
                                             : this.getPlayerColor(25)}
                                         activa={this.state.activa && 25 === this.state.jugadores[this.state.idJugador-1].posicion}
                                         casilla={this.state.casillas[25-1]}
                                         idJugador={this.state.idJugador}
                                         handler={this.desactive}
                                         precio={this.state.casillas[25-1].Precio} numeroCasilla={25}/>
                                <Casilla imagen="/casillas/24.png"
                                         color="azul-escom"
                                         colorUsuario={this.state.casillas[24-1].Propietario > 0
                                             ? this.state.colores[this.state.casillas[24-1].Propietario-1]
                                             : this.getPlayerColor(24)}
                                         activa={this.state.activa && 24 === this.state.jugadores[this.state.idJugador-1].posicion}
                                         casilla={this.state.casillas[24-1]}
                                         idJugador={this.state.idJugador}
                                         handler={this.desactive}
                                         precio={this.state.casillas[24-1].Precio} numeroCasilla={24}/>
                                <Casilla imagen="/casillas/23.png"
                                         color="azul-escom"
                                         colorUsuario={this.state.casillas[23-1].Propietario > 0
                                             ? this.state.colores[this.state.casillas[23-1].Propietario-1]
                                             : this.getPlayerColor(23)}
                                         activa={this.state.activa && 23 === this.state.jugadores[this.state.idJugador-1].posicion}
                                         casilla={this.state.casillas[23-1]}
                                         idJugador={this.state.idJugador}
                                         handler={this.desactive}
                                         precio={this.state.casillas[23-1].Precio} numeroCasilla={23}/>
                                <Casilla imagen="/casillas/22.png"
                                         color="azul-escom"
                                         colorUsuario={this.state.casillas[22-1].Propietario > 0
                                             ? this.state.colores[this.state.casillas[22-1].Propietario-1]
                                             : this.getPlayerColor(22)}
                                         activa={this.state.activa && 22 === this.state.jugadores[this.state.idJugador-1].posicion}
                                         casilla={this.state.casillas[22-1]}
                                         idJugador={this.state.idJugador}
                                         handler={this.desactive}
                                         precio={this.state.casillas[22-1].Precio} numeroCasilla={22}/>
                            </div>

                            <div className="space corner go-to-jail rotacion-180">
                                <img src="/casillas/21.png" alt="Reprobado"/>
                            </div>
                            {/* CASILLAS DERECHA */}
                            <div className="row vertical-row right-row">
                                <Casilla imagen="/casillas/20.png"
                                         color="guinda"
                                         colorUsuario={this.state.casillas[20-1].Propietario > 0
                                             ? this.state.colores[this.state.casillas[20-1].Propietario-1]
                                             : this.getPlayerColor(20)}
                                         activa={this.state.activa && 20 === this.state.jugadores[this.state.idJugador-1].posicion}
                                         casilla={this.state.casillas[20-1]}
                                         idJugador={this.state.idJugador}
                                         handler={this.desactive}
                                         precio={this.state.casillas[20-1].Precio} numeroCasilla={20}/>
                                <Casilla imagen="/casillas/19.png"
                                         color="guinda"
                                         colorUsuario={this.state.casillas[19-1].Propietario > 0
                                             ? this.state.colores[this.state.casillas[19-1].Propietario-1]
                                             : this.getPlayerColor(19)}
                                         activa={this.state.activa && 19 === this.state.jugadores[this.state.idJugador-1].posicion}
                                         casilla={this.state.casillas[19-1]}
                                         idJugador={this.state.idJugador}
                                         handler={this.desactive}
                                         precio={this.state.casillas[19-1].Precio} numeroCasilla={19}/>
                                <Casilla imagen="/casillas/30.png"
                                         color="guinda"
                                         colorUsuario={this.state.casillas[18-1].Propietario > 0
                                             ? this.state.colores[this.state.casillas[18-1].Propietario-1]
                                             : this.getPlayerColor(18)}
                                         activa={this.state.activa && 18 === this.state.jugadores[this.state.idJugador-1].posicion}
                                         casilla={this.state.casillas[18-1]}
                                         idJugador={this.state.idJugador}
                                         handler={this.desactive}
                                         precio={this.state.casillas[18-1].Precio} numeroCasilla={18}/>
                                <Casilla imagen="/casillas/17.png"
                                         color="guinda"
                                         colorUsuario={this.state.casillas[17-1].Propietario > 0
                                             ? this.state.colores[this.state.casillas[17-1].Propietario-1]
                                             : this.getPlayerColor(17)}
                                         activa={this.state.activa && 17 === this.state.jugadores[this.state.idJugador-1].posicion}
                                         casilla={this.state.casillas[17-1]}
                                         idJugador={this.state.idJugador}
                                         handler={this.desactive}
                                         precio={this.state.casillas[17-1].Precio} numeroCasilla={17}/>
                                <Casilla imagen="/casillas/16.png"
                                         color="guinda"
                                         colorUsuario={this.state.casillas[16-1].Propietario > 0
                                             ? this.state.colores[this.state.casillas[16-1].Propietario-1]
                                             : this.getPlayerColor(16)}
                                         activa={this.state.activa && 16 === this.state.jugadores[this.state.idJugador-1].posicion}
                                         casilla={this.state.casillas[16-1]}
                                         idJugador={this.state.idJugador}
                                         handler={this.desactive}
                                         precio={this.state.casillas[16-1].Precio} numeroCasilla={16}/>
                                <Casilla imagen="/casillas/15.png"
                                         color="guinda"
                                         colorUsuario={this.state.casillas[15-1].Propietario > 0
                                             ? this.state.colores[this.state.casillas[15-1].Propietario-1]
                                             : this.getPlayerColor(15)}
                                         activa={this.state.activa && 15 === this.state.jugadores[this.state.idJugador-1].posicion}
                                         casilla={this.state.casillas[15-1]}
                                         idJugador={this.state.idJugador}
                                         handler={this.desactive}
                                         precio={this.state.casillas[15-1].Precio} numeroCasilla={15}/>
                                <Casilla imagen="/casillas/14.png"
                                         color="guinda"
                                         colorUsuario={this.state.casillas[14-1].Propietario > 0
                                             ? this.state.colores[this.state.casillas[14-1].Propietario-1]
                                             : this.getPlayerColor(14)}
                                         activa={this.state.activa && 14 === this.state.jugadores[this.state.idJugador-1].posicion}
                                         casilla={this.state.casillas[14-1]}
                                         idJugador={this.state.idJugador}
                                         handler={this.desactive}
                                         precio={this.state.casillas[14-1].Precio} numeroCasilla={14}/>
                                <Casilla imagen="/casillas/13.png"
                                         color="guinda"
                                         colorUsuario={this.state.casillas[13-1].Propietario > 0
                                             ? this.state.colores[this.state.casillas[13-1].Propietario-1]
                                             : this.getPlayerColor(13)}
                                         activa={this.state.activa && 13 === this.state.jugadores[this.state.idJugador-1].posicion}
                                         casilla={this.state.casillas[13-1]}
                                         idJugador={this.state.idJugador}
                                         handler={this.desactive}
                                         precio={this.state.casillas[13-1].Precio} numeroCasilla={13}/>
                                <Casilla imagen="/casillas/12.png"
                                         color="guinda"
                                         colorUsuario={this.state.casillas[12-1].Propietario > 0
                                             ? this.state.colores[this.state.casillas[12-1].Propietario-1]
                                             : this.getPlayerColor(12)}
                                         activa={this.state.activa && 12 === this.state.jugadores[this.state.idJugador-1].posicion}
                                         casilla={this.state.casillas[12-1]}
                                         idJugador={this.state.idJugador}
                                         handler={this.desactive}
                                         precio={this.state.casillas[12-1].Precio} numeroCasilla={12}/>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}
