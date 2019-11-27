#include "Juego.h"
#include <stdio.h>
#include <stdlib.h>
#include <iostream>

using namespace std;

int main(int argc, char* argv[])
{
  int numJugadores, x;

  cout << "Ingresa el numero de Jugadores: "<< endl;
  cin >> numJugadores;
  //Juego nuevoJuego[numJugadores];

  Juego nuevoJuego(numJugadores);

  //Jugador jugadores[numJugadores];

  cout << "Listo para iniciar: "<< endl;
  cin >> x;

  nuevoJuego.menuP();


  //Jugador prueba(5);
//  cout << "que jugador quieres saber: "<<endl;
//  cin >> x;
//  cout << "El jugador tiene: "<<jugadores[x].getDinero()<<endl;
  return 0;
}
