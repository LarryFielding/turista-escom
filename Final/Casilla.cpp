#include "Casilla.h"
#include <string.h>
#include <stdio.h>
#include <iostream>
using namespace std;


Casilla::Casilla(int pos, char* a,  int pre, int est, int propie)
{
	posicion = pos;
	int tam = strlen(a)+1;
	char aux[tam];
	strcpy(aux, a);
	nombre = new char[tam];
	strcpy(nombre, aux);
	precio = pre;
	estado = est;
	propietario = propie;
	puntos = 0;
}

void Casilla::Setprecio(int pre)
{
	precio = pre;
}

void Casilla::Setpropietario(int pro)
{
	propietario = pro;
}

void Casilla::Setestado(int est)
{
	estado = est;
}

char* Casilla::Getnombre()
{
	return nombre;
}

int Casilla::Getposicion()
{
	return posicion;
}

int Casilla::Getprecio()
{
	return precio;
}

int Casilla::Getestado()
{
	return estado;
}

int Casilla::Getpropietario()
{
	return propietario;
}	

void Casilla::Setpuntos(int pun)
{
	puntos = pun;
}

int Casilla::Getpuntos()
{
	return puntos;
}