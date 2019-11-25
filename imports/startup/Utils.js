import moment from "moment";
import 'moment/locale/es';
import Colors from "../ui/Colors";

/**
 * Obtiene una cadena con el nombre completo del usuario.
 * @param user
 * @returns {string}
 */
export let getUserName = function (user) {
    return `${user.profile.nombre} 
    ${user.profile.apellidoPaterno} 
    ${user.profile.apellidoMaterno === undefined ? '' : user.profile.apellidoMaterno}`.toUpperCase();
};

/**
 * Imprime la fecha en el formato:
 *      martes, 5 de noviembre de 2019 23:43
 * @param date
 * @returns {string}
 */
export let printHourDate = function (date) {
    moment.locale('es');
    let dateHour = moment(date);
    return dateHour.format('LLLL');
};

export let printReportDate = function (date) {
    moment.locale('es');
    let dateHour = moment(date);
    return dateHour.format('D/MM/YYYY  HH:mm:ss a ');
};

export let getAge = function (dateString) {
    let fecha = moment(dateString, "DD-MM-YYYY");
    if (dateString) {
        return `,   ${moment().diff(fecha, 'years')} años`;
    } else {
        return '';
    }
};

export let setColor = function (tipo) {
    switch (tipo) {
        case "1": return Colors.cMedico;
        case "2": return Colors.cProteccionCivil;
        case "3": return Colors.cSeguridad;
        case "4": return Colors.cServiciosPublicos;
        default: return Colors.black;
    }
};
