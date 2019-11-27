import {Meteor} from "meteor/meteor";

Meteor.methods({

    getBoard(casilla) {
        const httpResponse = HTTP.call(
            'GET',
            'http://localhost:8000/get_board_box',
            {
                params: { casilla: casilla }
            });
        console.log(httpResponse);
        if (httpResponse.statusCode === 200) {
            const casillas = JSON.parse(httpResponse.content);
            //console.log(casillas);
            return casillas;
        }
    },
    getPlayer(numJugador) {
        console.log('obteniendo jugador: ', numJugador);
        const httpResponse = HTTP.call(
            'GET',
            'http://localhost:8000/get_player',
            {
                params: { jugador: numJugador }
            });
        console.log(`${numJugador}: `,httpResponse);
        if (httpResponse.statusCode === 200) {
            const jugador = JSON.parse(httpResponse.content);
            //console.log(casillas);
            return jugador;
        }
    },
    comprar(casilla, jugador) {
        const httpResponse = HTTP.call(
            'GET',
            'http://localhost:8000/comprar',
            {
                params: { jugador: jugador, casilla: casilla }
            });
        console.log(httpResponse);
    },
    pagar(casilla, jugador) {
        const httpResponse = HTTP.call(
            'GET',
            'http://localhost:8000/pagar',
            {
                params: { jugador: jugador, casilla: casilla }
            });
        console.log(httpResponse);
    },
    tirar(jugador, dados) {
        const httpResponse = HTTP.call(
            'GET',
            'http://localhost:8000/tirar',
            {
                params: { jugador: jugador, dados: dados }
            });
        console.log(httpResponse);
        return httpResponse;
    }
});
