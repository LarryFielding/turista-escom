#include "mongoose.h"
#include "Juego.h"
#include <stdio.h>
#include <stdlib.h>
#include <iostream>

static const char *s_http_port = "8000";
Juego nuevoJuego(2);
int cambio = 0;
int casillaModificada = 0;

static void handle_buy(struct mg_connection *nc, struct http_message *hm) {
  
  char n1[10], n2[10];
  int res;

  /* Get form variables */
  mg_get_http_var(&hm->query_string, "casilla", n1, sizeof(n1));
  cout << "query casilla: " << n1 << endl;
  mg_get_http_var(&hm->query_string, "jugador", n2, sizeof(n2));
  cout << "query jugador: " << n2 << endl;

  /* Send headers */
  mg_printf(nc, "%s", "HTTP/1.1 200 OK\r\nTransfer-Encoding: chunked\r\n\r\n");

  /* Compute the result and send it back as a JSON object */
  res = nuevoJuego.comprarPropiedadREST(atoi(n1), 0, atoi(n2));
  cout << "resultado: " << res << endl;
  if (res == 1)
  {
    mg_printf_http_chunk(nc, "OK");
    casillaModificada = atoi(n1);
  }
  else
  {
    mg_printf_http_chunk(nc, "FAIL");
  }

  mg_send_http_chunk(nc, "", 0); /* Send empty chunk, the end of response */
}

static void handle_pay(struct mg_connection *nc, struct http_message *hm) {
  
  char n1[10], n2[10];
  int res;

  /* Get form variables */
  mg_get_http_var(&hm->query_string, "casilla", n1, sizeof(n1));
  cout << "query casilla: " << n1 << endl;
  mg_get_http_var(&hm->query_string, "jugador", n2, sizeof(n2));
  cout << "query jugador: " << n2 << endl;

  /* Send headers */
  mg_printf(nc, "%s", "HTTP/1.1 200 OK\r\nTransfer-Encoding: chunked\r\n\r\n");

  /* Compute the result and send it back as a JSON object */
  res = nuevoJuego.pagarRentaREST(atoi(n1), atoi(n2));
  cout << "resultado: " << res << endl;
  if (res == 1)
  {
    mg_printf_http_chunk(nc, "OK");
  }
  else
  {
    mg_printf_http_chunk(nc, "FAIL");
  }

  mg_send_http_chunk(nc, "", 0); /* Send empty chunk, the end of response */
}

static void handle_tirar(struct mg_connection *nc, struct http_message *hm) {
  
  char n1[10], n2[10];
  int res;

  /* Get form variables */
  mg_get_http_var(&hm->query_string, "dados", n1, sizeof(n1));
  cout << "query dados: " << n1 << endl;
  mg_get_http_var(&hm->query_string, "jugador", n2, sizeof(n2));
  cout << "query jugador: " << n2 << endl;

  /* Send headers */
  mg_printf(nc, "%s", "HTTP/1.1 200 OK\r\nTransfer-Encoding: chunked\r\n\r\n");

  /* Compute the result and send it back as a JSON object */
  res = nuevoJuego.turnoREST(atoi(n2), atoi(n1));
  cout << "resultado: " << res << endl;
  
  mg_printf_http_chunk(nc, "%d", res);

  mg_send_http_chunk(nc, "", 0); /* Send empty chunk, the end of response */
}

static void handle_get_player(struct mg_connection *nc, struct http_message *hm) {
  
  char n1[100], n2[100];
  double result;
  char *jugador;

  /* Get form variables */
  mg_get_http_var(&hm->query_string, "jugador", n1, sizeof(n1));
  cout << "query: " << n1 << endl;

  /* Send headers */
  mg_printf(nc, "%s", "HTTP/1.1 200 OK\r\nTransfer-Encoding: chunked\r\n\r\n");

  /* Compute the result and send it back as a JSON object */
  jugador = nuevoJuego.devuelveDatos(atoi(n1));
  cout << jugador << endl;
  mg_printf_http_chunk(nc, jugador);
  mg_send_http_chunk(nc, "", 0); /* Send empty chunk, the end of response */
}

static void handle_get_box(struct mg_connection *nc, struct http_message *hm) {
  
  char n1[100];
  double result;
  char *casilla;

  /* Get form variables */
  mg_get_http_var(&hm->query_string, "casilla", n1, sizeof(n1));
  cout << "query: " << n1 << endl;

  /* Send headers */
  mg_printf(nc, "%s", "HTTP/1.1 200 OK\r\nTransfer-Encoding: chunked\r\n\r\n");

  /* Compute the result and send it back as a JSON object */
  casilla = nuevoJuego.devuelveDatosCasilla(atoi(n1));
  cout << casilla << endl;
  mg_printf_http_chunk(nc, casilla);
  mg_send_http_chunk(nc, "", 0); /* Send empty chunk, the end of response */
}

static void ev_handler(struct mg_connection *nc, int ev, void *ev_data) {
  struct http_message *hm = (struct http_message *) ev_data;

  switch (ev) {
    case MG_EV_HTTP_REQUEST:
      if (mg_vcmp(&hm->uri, "/get_board_box") == 0) {
        handle_get_box(nc, hm);
      } else if (mg_vcmp(&hm->uri, "/comprar") == 0) {
        handle_buy(nc, hm);
        cambio = 1;
      } else if (mg_vcmp(&hm->uri, "/get_player") == 0){
        handle_get_player(nc, hm);
      } else if (mg_vcmp(&hm->uri, "/pagar") == 0) {
        handle_pay(nc, hm);
        cambio = 1;
      } else if (mg_vcmp(&hm->uri, "/tirar") == 0) {
        handle_tirar(nc, hm);
        cambio = 1;
      }
      break;
    case MG_EV_SSI_CALL:
      printf("¿Porque paso esto?\n");
      break;
    default:
      break;
  }
}

static void push_data_to_all_websocket_connections(struct mg_mgr *m) {
  struct mg_connection *c;
  int memory_usage = (double) rand() / RAND_MAX * 100.0;

  for (c = mg_next(m, NULL); c != NULL; c = mg_next(m, c)) {
    if (c->flags & MG_F_IS_WEBSOCKET) {
      mg_printf_websocket_frame(c, WEBSOCKET_OP_TEXT, "{\"data\": %d}", memory_usage);
    }
  }
}

static void push_board_data(struct mg_mgr *m, int casilla) {
  struct mg_connection *c;
  char * casillaInfo;
  casillaInfo = nuevoJuego.devuelveDatosCasilla(casilla);
  cout << casillaInfo << endl;

  for (c = mg_next(m, NULL); c != NULL; c = mg_next(m, c)) {
    if (c->flags & MG_F_IS_WEBSOCKET) {
      mg_printf_websocket_frame(c, WEBSOCKET_OP_TEXT, "{\"tipo\":\"casilla\", \"data\": %s}", casillaInfo);
    }
  }
}

static void push_player_data(struct mg_mgr *m, int player) {
  struct mg_connection *c;
  char * playerInfo;
  playerInfo = nuevoJuego.devuelveDatos(player);
  cout << playerInfo << endl;

  for (c = mg_next(m, NULL); c != NULL; c = mg_next(m, c)) {
    if (c->flags & MG_F_IS_WEBSOCKET) {
      mg_printf_websocket_frame(c, WEBSOCKET_OP_TEXT, "{\"tipo\":\"jugador\", \"data\": %s}", playerInfo);
    }
  }
}


int main(void) {
  struct mg_mgr mgr;
  struct mg_connection *nc;
  cs_stat_t st;

  mg_mgr_init(&mgr, NULL);
  
  nc = mg_bind(&mgr, s_http_port, ev_handler);
  if (nc == NULL) {
    fprintf(stderr, "Cannot bind to %s\n", s_http_port);
    exit(1);
  }

  // Set up HTTP server parameters
  mg_set_protocol_http_websocket(nc);
  /*
    s_http_server_opts.document_root = ".";  // Set up web root directory

    if (mg_stat(s_http_server_opts.document_root, &st) != 0) {
      fprintf(stderr, "%s", "Cannot find web_root directory, exiting\n");
      exit(1);
    }
  */

  printf("Starting web server on port %s\n", s_http_port);
  int flag = 1;
  for (;;) {
    static time_t last_time;
    time_t now = time(NULL);
    mg_mgr_poll(&mgr, 1000  );

    if (now - last_time > 0) {
      if (flag == cambio)
      {
        cout << "se envia actualizacion ------------" << endl;
        cambio = 0;
        push_player_data(&mgr, 0);
        push_player_data(&mgr, 1);
        if (casillaModificada != 0)
        {
          push_board_data(&mgr, casillaModificada);
          casillaModificada = 0;
        }
      }
      last_time = now;
    }
  }
  mg_mgr_free(&mgr);

  return 0;
}