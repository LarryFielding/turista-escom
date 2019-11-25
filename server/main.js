import { Meteor } from 'meteor/meteor';
import moment from "moment";
moment.locale('es');

Meteor.startup(() => {
  // code to run on server at startup
    let fecha = moment('2019-10-21 00:00:35.980Z');
    console.log(fecha.fromNow());

    Meteor.onConnection(function (connection) {
        console.log('Cliente conectado desde: ', connection.clientAddress);
    });

});
