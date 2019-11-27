#include "Juego.h"
#include "Casilla.h"
#include "Jugador.h"

#include <fstream>
#include <string.h>
#include <stdio.h>
#include <vector>
#include <iostream>

using namespace std;

Juego::Juego(int _numJugadores)
{
  numJugadores = _numJugadores;
  numCasillas = 40;
  reserva = 9999;
  contador = 0;
    for (int i = 0; i < numJugadores; ++i)
  {
    Jugador auxi(i+1);
    player.push_back(auxi);
  }
  Cargardatos();

}

void Juego::menuP()
{
  int start;
  cout << "*****************************************" << endl;
  cout<<"Bienvenido al turista mundial de ESCOM"<<endl;
  cout<<"El total de jugadores es: "<< numJugadores<< endl;
  cout<<"Reglas Basicas:"<<endl;
  cout<<"Cada Jugador inicia con $1500"<<endl;
  cout<<"Cada Jugador puede comprar tantas materias guste"<<endl;
  cout<<"Se pueden pedir puntos extras"<<endl;
  cout<<"Gana el jugador que no quede en bancarrota"<<endl;
  cout<<"Listo para comenzar? (1/0)"<<endl;
  cout << "*****************************************" << endl;
  cin >> start;
  if (start==1) {
    cout << "entro aqui" << endl;
    inicia();
  }
}

void Juego::inicia()
{
  turno();
}

char* Juego::devuelveDatosCasilla(int nump)
{
  cout << "entro en buscar datos de casilla " << nump << endl;
  nump = nump - 1;
  char *p = (char*)malloc(sizeof(char) * 300);
  if (p != NULL)
  {
    sprintf(p, "{\"Posicion\": %d, \"Nombre\": \"%s\", \"Precio\": %d, \"Estado\": %d, \"Propietario\": %d, \"Puntos\": %d}", tan[nump].Getposicion(),tan[nump].Getnombre(), tan[nump].Getprecio(), tan[nump].Getestado(), tan[nump].Getpropietario(), tan[nump].Getpuntos());
  }
  else
  {
    sprintf(p, "error");
  }
  return p;
}


char* Juego::devuelveDatos(int nump)
{
  char *p = (char*)malloc(sizeof(char) * 300);
  sprintf(p, "{\"id\": %d, \"dinero\": %f, \"posicion\": %d, \"carcel\": %d, \"propiedades\": %d, \"deuda(n)\": %d, \"deudaT\": %f, \"deudaP\": %f, \"vivo\": %d}", player[nump].getId(),player[nump].getDinero(), player[nump].getPosicion(), player[nump].getCarcel(), player[nump].getNumprop(), player[nump].getDeuda(), player[nump].getDeudat(), player[nump].getDeudap(), player[nump].getVivo());
  return p;
}

int Juego::turnoREST(int jugador, int dados)
{
  int posFinal = player[jugador-1].tirarREST(dados);
  return posFinal;
}

void Juego::turno()
{
  int i;
  cout << "entro turno" << endl;
  while(true)
  {
     pagarPrestamo(contador);

    if(player[contador].getVivo()==1){

      cout<<devuelveDatos(contador);

      int tirada;
      cout << "*****************************************" << endl;
      cout << "Turno del Jugador: " << player[contador].getId() << endl;
        cout << "El jugador " <<player[contador].getId() <<" tiene: "<<endl;
          cout<<"Dinero: "<<player[contador].getDinero()<< endl;
          cout<<"Posicion: "<<player[contador].getPosicion()<< endl;

          cout << "Listo para tirar: "<<endl;
          cin >>tirada;
          player[contador].tirar();
          cout << "El jugador " <<player[contador].getId() <<" ha tirado"<<endl;
          cout << "Ahora esta en la posicion: " <<player[contador].getPosicion() <<endl;
          if(casillamarcada(player[contador].getPosicion()) == 1)
          {
            cout<<devuelveDatosCasilla(player[contador].getPosicion())<<endl;
            menu(player[contador].getPosicion()-1);
            menuopc();
          }

    }else{
      cout<<"El jugador "<< player[contador].getId()<<" ya murio"<<endl;
    }
        contador++;

        if(contador == numJugadores)
        {
            contador = 0 ;
        }
  }
}

int Juego::casillamarcada(int numC)
{
  int ct = player[contador].getNumprop();
  int din = player[contador].getDinero();
	if(numC == 21)
	{
    cout<<"Para poder seguir jugando debes pagar una fianza de 10 por cada\npropiedad que tengas, en caso contrario tu juego se acaba"<<endl;
    ct = ct * 10;
    if(din>=ct)
    {
      player[contador].paga(ct);
      return 1;
    }
    else 
    {
      cout<<"No puedes pagar la fianza asi que tu juego termina hasta aqui"<<endl;
      player[contador].setVivo(0);
      return 0;
    }
	}
	else if(numC == 31)
	{
    cout<<"Para poder seguir jugando debes pagar una fianza de 20 por cada\npropiedad que tengas, en caso contrario tu juego se acaba"<<endl;
    ct = ct * 10;
    if(din>=ct)
    {
      player[contador].paga(ct);
      player[contador].moverJugador(20);
      return 1;
    }
    else 
    {
      cout<<"No puedes pagar la fianza asi que tu juego termina hasta aqui"<<endl;
      player[contador].setVivo(0);
      return 0;
    }

	}
  return 1;

}

void Juego::menuopc()
{
	int opc = 0;
	cout<<"Desea realizar alguna otra operacion\n1.-Comprar (casilla que tenga dueño),\n2.-Hipoteca\n3.-Pedir puntos extras\n4.-No"<<endl;
	cin>>opc;
	if(opc == 1)
	{
		venderPropiedad();
	}
  else if(opc==2)
  {
    hipotecarPropiedad(contador);
  }
  else if(opc==3)
  {
    pedirPuntos();
  }
}

void Juego::pedirPuntos()
{
  int nu, ed[3] = {25,100,200}, opc=0;
  int din = player[contador].getDinero();
  cout<<"A continuacion se explica como funciona los puntos extras"<<endl;
  cout<<"El costo de pedir 1 punto extra es 25"<<endl;
  cout<<"El costo de pedir 2 puntos extra es 100"<<endl;
  cout<<"El costo de pedir 3 puntos extra es 200"<<endl;
  cout<<"Cuantos puntos extras quieres agregar\n(cabe recalcar que el costo de la casilla aumentara de la misma manera)"<<endl;
  cin>>nu;
  if(din>=ed[nu-1])
  {
    player[contador].imprimirCas();
    cout<<"A que casilla desas agregarlos"<<endl;
    cin>>opc;
    if(tan[opc-1].Getpropietario()-1==contador && tan[opc-1].Getestado()!=3)
    {
      cout<<devuelveDatosCasilla(opc)<<endl;
      tan[opc-1].Setpuntos(nu);
      tan[opc-1].Setprecio(tan[opc-1].Getprecio()+ed[nu-1]);
      tan[opc-1].Setestado(3);
      cout<<devuelveDatosCasilla(opc)<<endl;
    }
    else
    {
      cout<<"Esa casilla ya tiene puntos extras"<<endl;
    }
  }
  else
  {
    cout<<"No cuentas con dinero suficiente"<<endl;
  }


}

void Juego::venderPropiedad()
  {
  	int nc, op1, op2;
  	cout<<"Cual propiedad desea que se le sea vendida"<<endl;
  	cin>>nc;
  	nc = nc - 1;
  	int var1 = tan[nc].Getpropietario(), var2 = player[contador].getId();
    int var3 = tan[nc].Getestado();
    if(var1 != 0 && var1 != var2 && var1 != -1)
  	{
  		cout<<"Jugador "<<var1<<" desea vender su propiedad? (1/0)"<<endl;
  		cin>>op1;
  		if(op1 == 1)
  		{

  			ObtieneCasillas(nc);
  			comprarPropiedad(nc, 1);
  			player[var1-1].recibe(tan[nc].Getprecio()*.9);
  			ObtieneCasillas(nc);
        player[var1-1].setNumprop(nc, 0);
        if(var3 == 2)
        {
        player[contador].setDeuda(player[var1-1].getDeuda());
        player[contador].setDeudap(player[var1-1].getDeudap());
        player[contador].setDeudat(player[var1-1].getDeudat());
        player[var1-1].setDeudat(0);
        player[var1-1].setDeudap(0);
        player[var1-1].setDeuda(0);
        }
  		}
  	}
    cout<<devuelveDatos(contador)<<endl;
    cout<<devuelveDatos(var1-1)<<endl;
  }

void Juego::menu(int numC)
{
  int opc=0;
  if(tan[numC].Getestado()==0)
  {
    cout<<"Desea comprar la propiedad? (1/0)"<<endl;
    cin>>opc;
    if(opc==1)
    {
    	comprarPropiedad(numC, 0);
    	cout<<"Has comprado la propiedad"<<endl;
    	cout<<"Tu dinero actual es "<<player[contador].getDinero()<<endl;
    }
   }
   else if(tan[numC].Getestado()==1)
   {
   		cout<<"Has caido a una casilla con dueño, ahora debes pagar una renta del 40\% del valor"<<endl;
   		pagarRenta(numC);
   }
}

void Juego::comprarPropiedad(int numC, int ch)
{
  if(ch!=1)
  {
    tan[numC].Setpropietario(player[contador].getId());
    tan[numC].Setestado(1);
    player[contador].paga(tan[numC].Getprecio());
    player[contador].setNumprop(numC, 1);
  }
  else
  {
    tan[numC].Setpropietario(player[contador].getId());
    tan[numC].Setestado(1);
    player[contador].paga(tan[numC].Getprecio()*.9);
    player[contador].setNumprop(numC, 1);
  }

}

int Juego::comprarPropiedadREST(int numC, int ch, int jugador)
{
  if(ch!=1)
  {
    tan[numC-1].Setpropietario(player[jugador-1].getId());
    tan[numC-1].Setestado(1);
    player[jugador-1].paga(tan[numC-1].Getprecio());
    player[jugador-1].setNumprop(numC-1, 1);
    return 1;
  }
  else
  {
    tan[numC-1].Setpropietario(player[jugador-1].getId());
    tan[numC-1].Setestado(1);
    player[jugador-1].paga(tan[numC-1].Getprecio()*.9);
    player[jugador-1].setNumprop(numC-1, 1);
    return 1;
  }

}

void Juego::pagarRenta(int numC)
{
  int var = tan[numC].Getpropietario()-1;
  float monto = tan[numC].Getprecio() * .40;
  player[contador].paga(monto);
  player[var].recibe(monto);
}

int Juego::pagarRentaREST(int numC, int jugador)
{
  int var = tan[numC-1].Getpropietario()-1;
  float monto = tan[numC-1].Getprecio() * .40;
  player[jugador-1].paga(monto);
  player[var].recibe(monto);
  return 1;
}

void Juego::hipotecarPropiedad(int deuda)
{
  int eleccion;
  if (player[contador].getNumprop()>0) {
    player[contador].imprimirCas();
    cout<<"Que casilla desea hipotecar:"<<endl;
    cin>>eleccion;
    if (tan[eleccion-1].Getpropietario()-1==contador && tan[eleccion-1].Getestado()!=2) {
        darPrestamo(deuda, eleccion-1);
        tan[eleccion-1].Setestado(2);
    }
  }


}
void Juego::darPrestamo(int _player, int _eleccion)
{
  float a = tan[_eleccion].Getprecio();
  float b = a *1.1;
  player[_player].recibe(a*.9);
  player[_player].setDeudat(a * 1.1);
  player[_player].setDeudap(b/5);
  player[_player].setDeuda(5);
  reserva = reserva - a*.9;
  cout<<devuelveDatos(_player);
  //RESERVA = RESERVA - casilla.Getprecio();
}

void Juego::pagarPrestamo(int x)
{
  int xx=0;
  int ww;
  for (ww=0;ww < 40; ww++) {
    if(tan[ww].Getpropietario()-1==x && tan[ww].Getestado()==2){
      xx=ww;
    }
  }
  int din=player[x].getDinero();
  int aux = player[x].getDeuda();
    if (aux>0) {
      if(din>=player[x].getDeudap()){

        player[x].paga(player[x].getDeudap());
        reserva = reserva + player[x].getDeudap();
        player[x].setDeuda(aux-1);

      }
      else{
        player[x].setVivo(0);
        cout<<"Ya no puedes continuar"<<endl;
      }

  }
  else{
     tan[xx].Setestado(1);
     player[x].setDeudap(0);
     player[x].setDeudat(0);
   }

}
//Tablero
void Juego::Agregacasilla(int pos, char* nom, int pre, int est, int prop)
{
	Casilla cas(pos,nom,pre,est,prop);
	tan.push_back(cas);
}

void Juego::Cargardatos()
{
	ifstream archivo_entrada("Turista.txt");
	string linea;
	int tam, ct = 2;
	char *paux, *aux, *p1, *p2, *p3, *p4, *p5;
	while(getline(archivo_entrada, linea))
	{
		tam = linea.length();
		char nueva[tam + 1];
		strcpy(nueva, linea.c_str());
		paux = strtok(nueva, ",");
		p1 = paux;

		while(paux != NULL)
        {
            paux = strtok(NULL, ",");
            if(ct == 2)
                p2 = paux;
            if(ct == 3)
                p3 = paux;
            if(ct == 4)
                p4 = paux;
            if(ct == 5)
                p5 = paux;
            ct++;
        }
        ct = 2;
		Agregacasilla(atoi(p1), p2, atoi(p3), atoi(p4), atoi(p5));
	}
}

void Juego::ObtieneCasillas(int x)
{
	cout<<tan[x].Getposicion()<<"-"<<tan[x].Getnombre()<<"-"<<tan[x].Getprecio()<<"-"<<tan[x].Getestado()<<"-"<<tan[x].Getpropietario()<<endl;
}
