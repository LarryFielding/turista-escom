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
            idJugador: 0
        };

        this.moverJugador = this.moverJugador.bind(this);
        this.getPlayerPosition = this.getPlayerPosition.bind(this);
    }

    componentDidMount() {
        client.onopen = () => {
            console.log('WebSocket Client Connected');
        };
        client.onmessage = (message) => {
            //console.log(message);
            this.setState({flag: !this.state.flag});
            //console.log('state:', this.state);
        };
        // Estados de prueba:
        this.setState({
            jugadores: [
                {id: 1, dinero: 1500, posicion: 1, carcel: false, nprop: 0, color: 0},
                {id: 2, dinero: 1500, posicion: 1, carcel: false, nprop: 0, color: 1}
            ],
            casillas: [
                {id: 1, propietario: 1},
                {id: 1, propietario: 0}
            ],
            colores: ['yellow', 'red', 'green', 'orange'],
            idJugador: 1
        });
    }

    getPlayerPosition(casilla) {
        const index = this.state.jugadores.findIndex(j => j.posicion === casilla);
        if (index === -1) {
            return undefined;
        } else {
            return this.state.colores[index];
        }
    }

    moverJugador(idJugador, dados) {
        this.setState(prevState => ({
            jugadores : prevState.jugadores.map(
                j => j.id === idJugador ? {...j, posicion: (j.posicion+dados)%40} : j)
        }));
    }


    render() {
        return (
            <div>
                <div className="table">
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
                                     colorUsuario={this.getPlayerPosition(2)}
                                     rotacion="rotacion-90"
                                     precio={3000} numeroCasilla={2}/>

                            <div className="space property">
                                <div className="container">
                                    {this.getPlayerPosition(3) === undefined
                                        ? <div className="color-bar light-blue"/>
                                        : <div className={`color-bar ${this.getPlayerPosition(3)}`}/>}
                                    <div className="image-container">
                                        <img src="/casillas/3.png" alt="Vectorial"/>
                                    </div>
                                    <div className="price">Precio $100</div>
                                </div>
                            </div>
                            <div className="space property">
                                <div className="container">
                                    {this.getPlayerPosition(4) === undefined
                                        ? <div className="color-bar light-blue"/>
                                        : <div className={`color-bar ${this.getPlayerPosition(4)}`}/>}
                                    <div className="image-container">
                                        <img src="/casillas/4.png" alt="Calculo"/>
                                    </div>
                                    <div className="price">Precio $100</div>
                                </div>
                            </div>
                            <div className="space property">
                                <div className="container">
                                    {this.getPlayerPosition(5) === undefined
                                        ? <div className="color-bar light-blue"/>
                                        : <div className={`color-bar ${this.getPlayerPosition(5)}`}/>}
                                    <div className="image-container">
                                        <img src="/casillas/5.png" alt="Algoritmia"/>
                                    </div>
                                    <div className="price">Precio $100</div>
                                </div>
                            </div>
                            <div className="space property">
                                <div className="container">
                                    {this.getPlayerPosition(6) === undefined
                                        ? <div className="color-bar light-blue"/>
                                        : <div className={`color-bar ${this.getPlayerPosition(6)}`}/>}
                                    <div className="image-container">
                                        <img src="/casillas/6.png" alt="Fisica"/>
                                    </div>
                                    <div className="price">Precio $100</div>
                                </div>
                            </div>
                            <div className="space property">
                                <div className="container">
                                    {this.getPlayerPosition(7) === undefined
                                        ? <div className="color-bar light-blue"/>
                                        : <div className={`color-bar ${this.getPlayerPosition(7)}`}/>}
                                    <div className="image-container rotacion-90">
                                        <img src="/casillas/7.png" alt="IES"/>
                                    </div>
                                    <div className="price">Precio $100</div>
                                </div>
                            </div>
                            <div className="space property">
                                <div className="container">
                                    {this.getPlayerPosition(8) === undefined
                                        ? <div className="color-bar light-blue"/>
                                        : <div className={`color-bar ${this.getPlayerPosition(8)}`}/>}
                                    <div className="image-container rotacion-90">
                                        <img src="/casillas/8.png" alt="Ecuaciones"/>
                                    </div>
                                    <div className="price">Precio $100</div>
                                </div>
                            </div>
                            <div className="space property">
                                <div className="container">
                                    {this.getPlayerPosition(9) === undefined
                                        ? <div className="color-bar light-blue"/>
                                        : <div className={`color-bar ${this.getPlayerPosition(9)}`}/>}
                                    <div className="image-container">
                                        <img src="/casillas/9.png" alt="Algebra-Lineal"/>
                                    </div>
                                    <div className="price">Precio $100</div>
                                </div>
                            </div>
                            <div className="space property">
                                <div className="container">
                                    {this.getPlayerPosition(10) === undefined
                                        ? <div className="color-bar light-blue"/>
                                        : <div className={`color-bar ${this.getPlayerPosition(10)}`}/>}
                                    <div className="image-container">
                                        <img src="/casillas/10.png" alt="Calculo-Aplicado"/>
                                    </div>
                                    <div className="price">Precio $100</div>
                                </div>
                            </div>
                        </div>
                        {/* INICIO*/}
                        <div>
                            <img src="casillas/1.png" alt="Salida"/>
                        </div>

                        {/*CASILLAS IZQUIERDA*/}
                        <div className="row vertical-row left-row">
                            <div className="space property">
                                <div className="container">
                                    <div className="color-bar"></div>
                                    <div className="image-container">
                                        <img src="/casillas/32.png" alt="Analisis-Algoritmos"/>
                                    </div>
                                    <div className="price">Precio $400</div>
                                </div>
                            </div>
                            <div className="space property">
                                <div className="container">
                                    <div className="color-bar"></div>
                                    <div className="image-container">
                                        <img src="/casillas/33.png" alt="Ingenieria-Software"/>
                                    </div>
                                    <div className="price">Precio $400</div>
                                </div>
                            </div>
                            <div className="space property">
                                <div className="container">
                                    <div className="color-bar"></div>
                                    <div className="image-container">
                                        <img src="/casillas/34.png" alt="Administracion-Proyectos"/>
                                    </div>
                                    <div className="price">Precio $400</div>
                                </div>
                            </div>
                            <div className="space property">
                                <div className="container">
                                    <div className="color-bar"></div>
                                    <div className="image-container">
                                        <img src="/casillas/35.png" alt="Teoria-Comunicaciones"/>
                                    </div>
                                    <div className="price">Precio $400</div>
                                </div>
                            </div>
                            <div className="space property">
                                <div className="container">
                                    <div className="color-bar"></div>
                                    <div className="image-container">
                                        <img src="/casillas/36.png" alt="Compiladores"/>
                                    </div>
                                    <div className="price">Precio $400</div>
                                </div>
                            </div>
                            <div className="space property">
                                <div className="container">
                                    <div className="color-bar"></div>
                                    <div className="image-container">
                                        <img src="/casillas/37.png" alt="Sistemas-Distribuidos"/>
                                    </div>
                                    <div className="price">Precio $400</div>
                                </div>
                            </div>
                            <div className="space property">
                                <div className="container">
                                    <div className="color-bar"></div>
                                    <div className="image-container">
                                        <img src="/casillas/38.png" alt="Electiva"/>
                                    </div>
                                    <div className="price">Precio $400</div>
                                </div>
                            </div>
                            <div className="space property">
                                <div className="container">
                                    <div className="color-bar"></div>
                                    <div className="image-container">
                                        <img src="/casillas/39.png" alt="Trabajo-terminal"/>
                                    </div>
                                    <div className="price">Precio $400</div>
                                </div>
                            </div>
                            <div className="space property">
                                <div className="container">
                                    <div className="color-bar"></div>
                                    <div className="image-container">
                                        <img src="/casillas/40.png" alt="Titulacion"/>
                                    </div>
                                    <div className="price">Precio $400</div>
                                </div>
                            </div>
                        </div>

                        <div className="space corner free-parking rotacion-180">
                            <img src="/casillas/31.png" alt="Reprobado"/>
                        </div>
                        {/* CASILLAS ARRIBA */}
                        <div className="row horizontal-row top-row">
                            <div className="space property">
                                <div className="container">
                                    <div className="color-bar azul-escom"></div>
                                    <div className="image-container">
                                        <img src="/casillas/30.png" alt="Arquitactura-de-computadoras"/>
                                    </div>
                                    <div className="price">Precio $300</div>
                                </div>
                            </div>
                            <div className="space property">
                                <div className="container">
                                    <div className="color-bar azul-escom"></div>
                                    <div className="image-container">
                                        <img src="/casillas/29.png" alt="Administracion-Financiera"/>
                                    </div>
                                    <div className="price">Precio $300</div>
                                </div>
                            </div>
                            <div className="space property">
                                <div className="container">
                                    <div className="color-bar azul-escom"></div>
                                    <div className="image-container">
                                        <img src="/casillas/28.png" alt="Web"/>
                                    </div>
                                    <div className="price">Precio $300</div>
                                </div>
                            </div>
                            <div className="space property">
                                <div className="container">
                                    <div className="color-bar azul-escom"></div>
                                    <div className="image-container">
                                        <img src="/casillas/27.png" alt="ADOO"/>
                                    </div>
                                    <div className="price">Precio $300</div>
                                </div>
                            </div>
                            <div className="space property">
                                <div className="container">
                                    <div className="color-bar azul-escom"></div>
                                    <div className="image-container">
                                        <img src="/casillas/26.png" alt="Sistemas-Operativos"/>
                                    </div>
                                    <div className="price">Precio $300</div>
                                </div>
                            </div>
                            <div className="space property">
                                <div className="container">
                                    <div className="color-bar azul-escom"></div>
                                    <div className="image-container">
                                        <img src="/casillas/25.png" alt="Probabilidad"/>
                                    </div>
                                    <div className="price">Precio $300</div>
                                </div>
                            </div>
                            <div className="space property">
                                <div className="container">
                                    <div className="color-bar azul-escom"></div>
                                    <div className="image-container">
                                        <img src="/casillas/24.png" alt="Digitales"/>
                                    </div>
                                    <div className="price">Precio $300</div>
                                </div>
                            </div>
                            <div className="space property">
                                <div className="container">
                                    <div className="color-bar azul-escom"></div>
                                    <div className="image-container">
                                        <img src="/casillas/23.png" alt="Redes-I"/>
                                    </div>
                                    <div className="price">Precio $300</div>
                                </div>
                            </div>
                            <div className="space property">
                                <div className="container">
                                    <div className="color-bar azul-escom"></div>
                                    <div className="image-container">
                                        <img src="/casillas/22.png" alt="Analogica"/>
                                    </div>
                                    <div className="price">Precio $300</div>
                                </div>
                            </div>
                        </div>

                        <div className="space corner go-to-jail rotacion-180">
                            <img src="/casillas/21.png" alt="Reprobado"/>
                        </div>
                        {/* CASILLAS DERECHA */}
                        <div className="row vertical-row right-row">
                            <div className="space property">
                                <div className="container">
                                    <div className="color-bar guinda"></div>
                                    <div className="image-container">
                                        <img src="/casillas/20.png" alt="POO"/>
                                    </div>
                                    <div className="price">Precio $200</div>
                                </div>
                            </div>
                            <div className="space property">
                                <div className="container">
                                    <div className="color-bar guinda"></div>
                                    <div className="image-container">
                                        <img src="/casillas/19.png" alt="Bases-de-datos"/>
                                    </div>
                                    <div className="price">Precio $200</div>
                                </div>
                            </div>
                            <div className="space property">
                                <div className="container">
                                    <div className="color-bar guinda"></div>
                                    <div className="image-container">
                                        <img src="/casillas/18.png" alt="Teoria-computacional"/>
                                    </div>
                                    <div className="price">Precio $200</div>
                                </div>
                            </div>
                            <div className="space property">
                                <div className="container">
                                    <div className="color-bar guinda"></div>
                                    <div className="image-container">
                                        <img src="/casillas/17.png" alt="FDD"/>
                                    </div>
                                    <div className="price">Precio $200</div>
                                </div>
                            </div>
                            <div className="space property">
                                <div className="container">
                                    <div className="color-bar guinda"></div>
                                    <div className="image-container">
                                        <img src="/casillas/16.png" alt="Economicos"/>
                                    </div>
                                    <div className="price">Precio $200</div>
                                </div>
                            </div>
                            <div className="space property">
                                <div className="container">
                                    <div className="color-bar guinda"></div>
                                    <div className="image-container">
                                        <img src="/casillas/15.png" alt="Avanzadas"/>
                                    </div>
                                    <div className="price">Precio $200</div>
                                </div>
                            </div>
                            <div className="space property">
                                <div className="container">
                                    <div className="color-bar guinda"></div>
                                    <div className="image-container">
                                        <img src="/casillas/14.png" alt="AFC"/>
                                    </div>
                                    <div className="price">Precio $200</div>
                                </div>
                            </div>
                            <div className="space property">
                                <div className="container">
                                    <div className="color-bar guinda"></div>
                                    <div className="image-container">
                                        <img src="/casillas/13.png" alt="COE"/>
                                    </div>
                                    <div className="price">Precio $200</div>
                                </div>
                            </div>
                            <div className="space property">
                                <div className="container">
                                    <div className="color-bar guinda"/>
                                    <div className="image-container">
                                        <img src="/casillas/12.png" alt="Estructuras-Datos"/>
                                    </div>
                                    <div className="price">Precio $200</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
