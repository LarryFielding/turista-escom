turista: ws_server.cpp Juego.o Jugador.o Casilla.o mongoose.o
	g++ ws_server.cpp Juego.o Jugador.o Casilla.o mongoose.o -o turista
Juego.o: Juego.cpp Juego.h Jugador.o Casilla.o
	g++ Juego.cpp -c
Jugador.o: Jugador.cpp Jugador.h
	g++ Jugador.cpp -c
Casilla.o: Casilla.cpp Casilla.h
	g++ Casilla.cpp -c
mongoose.o: mongoose.c mongoose.h
	gcc mongoose.c -c
