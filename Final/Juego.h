#ifndef JUEGO_H_
#define JUEGO_H_

#include "Jugador.h"
#include "Casilla.h"
#include <vector>
#include <iterator>
#include <iostream>
using namespace std;

class Juego
{
  private:
    int numJugadores;
    int numCasillas;
    float reserva;
    int contador;
    vector<Jugador> player;
    vector<Casilla> tan;
  public:
    Juego(int);
    void menuP();
    void inicia();
    void turno();
    int turnoREST(int, int);
    void menu(int);
    void menuopc();
    int casillamarcada(int numC);
    char* devuelveDatos(int nump);
    char* devuelveDatosCasilla(int nump);

    void comprarPropiedad(int, int);
    int comprarPropiedadREST(int, int, int);
    void pagarRenta(int);
    int pagarRentaREST(int, int);
    void venderPropiedad();
    void pedirPuntos();

    void hipotecarPropiedad(int);
    void darPrestamo(int, int);
    void pagarPrestamo(int);


    //Tablero
    void Agregacasilla(int pos, char* nom, int pre, int est, int prop);
    void Cargardatos();
    void ObtieneCasillas(int);

};

#endif
