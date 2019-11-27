#ifndef JUGADOR_H_
#define JUGADOR_H_

#include "Casilla.h"
class Jugador
{
private:
  int id;
  float dinero;
  int posicion;
  int carcel;
  int nprop[40];
  int deuda;
  float deudap;
  float deudat;
  int vivo;
public:
  Jugador(int);
  void tirar();
  int tirarREST(int);
  void moverJugador(int);
  void terminaTurno();

  int getCarcel();
  void setCarcel(int car);

  void paga(float);
  void recibe(float);

  void setPosicion(int);
  int getPosicion();

  void setId(int);
  int getId();

  void setDinero(float);
  float getDinero();

  void setNumprop(int, int);
  int getNumprop();
  void imprimirCas();

  void setDeudap(float);

  void setDeudat(float);
  void setVivo(int);
  int getVivo();
  void setDeuda(int);
  int getDeuda();
  float getDeudap();
  float getDeudat();

};

#endif
