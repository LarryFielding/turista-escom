#include "Jugador.h"
#include "Casilla.h"
#include <time.h>
#include <stdlib.h>
#include <stdio.h>
#include <iostream>
using namespace std;

Jugador::Jugador(int idd)
{
  id = idd;
  dinero = 1500;
  posicion = 1;
  carcel = 0;
  for (int i = 0; i < 40; ++i)
  {
    nprop[i] = 0;
  }
  deuda = 0;
  deudap = 0;
  deudat = 0;
  vivo = 1;
}

int Jugador::getCarcel()
{
  return carcel;
}

void Jugador::setCarcel(int car)
{
  carcel = car;
}


int Jugador::getNumprop()
{
  int ct = 0;
  for (int i = 0; i < 40; ++i)
  {
    if(nprop[i]==1)
      ct++;
  }
  return ct;
}

void Jugador::setNumprop(int numC, int val)
{
  nprop[numC]=val;
}

void Jugador::imprimirCas()
{
  cout<<"Eres dueño de las siguientes casillas"<<endl;
  for (int i = 0; i < 40; ++i)
  {
    if(nprop[i]==1)
    {
      cout<<"Casilla No. "<<i+1<<endl;
    }
  }
}

int Jugador::tirarREST(int dados)
{
  moverJugador(dados);
  return getPosicion();
}

int cont = 0;
void Jugador::tirar()
{
  int total;
  srand(time(NULL));
  int dadoA = rand();
  int dadoB = rand();
  dadoA = 1 + rand()%(7-1);
  dadoB = 1 + rand()%(7-1);
  dadoA = 1;
  dadoB= 1;
  cout<< dadoA<<endl;
  cout<< dadoB<<endl;
  if (dadoA == dadoB && cont<1)
  {
    cout<<"Tirada doble: "<<endl;
    total = dadoA + dadoB;
    cont++;
    moverJugador(total);
    tirar();

  }
  else
  {
    total = dadoA + dadoB;
    cont=0;
    moverJugador(total);
    //total = dadoA + dadoB;
  }
}

void Jugador::moverJugador(int numCasillas)
{
  setPosicion(numCasillas);
}


void Jugador::terminaTurno()
{

}


void Jugador::paga(float monto)
{
    dinero = dinero - monto;
}

void Jugador::recibe(float monto)
{
    dinero = dinero + monto;
}

void Jugador::setPosicion(int _posicion)
{
  posicion = posicion + _posicion;
  if(posicion >40)
  {
    posicion = posicion - 40;
  }
}

int Jugador::getPosicion()
{
  return posicion;
}

void Jugador::setId(int _id)
{
  id = _id;
}

int Jugador::getId()
{
  return id;
}

void Jugador::setDinero(float cantidad)
{
  dinero = dinero + cantidad;
}

float Jugador::getDinero()
{
  return dinero;
}
void Jugador::setDeudap(float _deudap) {
  deudap = _deudap;
}

void Jugador::setDeudat(float _deudat) {
  deudat = _deudat;
}

void Jugador::setDeuda(int _deuda) {
  deuda = _deuda;
}
int Jugador::getDeuda(){
  return deuda;
}
float Jugador::getDeudap(){
  return deudap;
}
float Jugador::getDeudat(){
  return deudat;
}

void Jugador::setVivo(int _vivo)
{
  vivo = _vivo;
}
int Jugador::getVivo()
{
  return vivo;
}
