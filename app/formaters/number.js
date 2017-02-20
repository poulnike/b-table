/**
 * Created by Poulnike on 21.02.2017.
 */

// ======================
// number.js start
// ======================

function ftf__number (value){

    val = "" + value;

    if (val.indexOf(".") >= 0){

        var number_split = val.split('.');

        return '<span class="ftf__number_big">' + number_split[0] + '</span><span class="ftf__number_des">.' + number_split[1] + '</span>';

    } else {

        if (val == 0){
            return '<span class="ftf__number_big ftf__number_null">' + value + '</span><span class="ftf__number_des"></span>'
        } else {
            return '<span class="ftf__number_big">' + value + '</span><span class="ftf__number_des"></span>'
        }

    }
}

// ======================
// number.js end
// ======================