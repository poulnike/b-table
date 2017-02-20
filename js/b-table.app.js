/*
* b-table design - Design table
* @version 0.0.1
* @link http://poulart.ru
* @copyright Poul Nike
* @license Released under the GPLv3 license.
*/
// ======================
// app.js start
// ======================
$(function () {

    var b_name = '.selectpicker';
    var b = $(b_name); // блок

    if (b.length) {

        b.selectpicker({

        });


    }

});

$(function() {
    var ft = FooTable.init(".footable3", {
        //var ft = $('.footable3').footable({
        "filtering": {
            "enabled": true
        },
        "columns": $.get('../../../json/columns.json'),
        "rows": $.get('../../../json/b_results.json')
    });

    // ft.columns.get('UF_USER_ID').visible = false;
    //ft.columns.get('UF_USER_ID').breakpoints = "md";
    var $UF_ITOGO__filter = $("#rb-net__filter-section_range-itogo");
    $UF_ITOGO__filter.ionRangeSlider({
        type: "double",
        grid: true,
        min: 0,
        max: 1000,
        from: 200,
        to: 800
    });
    $("#rb-net__filter-section_range-LGO").ionRangeSlider({
        type: "double",
        grid: true,
        min: 0,
        max: 1000,
        from: 200,
        to: 800
    });
    $("#rb-net__filter-section_range-NLO").ionRangeSlider({
        type: "double",
        grid: true,
        min: 0,
        max: 1000,
        from: 200,
        to: 800
    });
    $("#rb-net__filter-section_range-LO").ionRangeSlider({
        type: "double",
        grid: true,
        min: 0,
        max: 1000,
        from: 200,
        to: 800
    });



    var $net__table_settings = {
        jsonURL : "/json/columns.json",
        data: "",
        html: $(""),
        loaddata : function(){
            var self = this;
            var table = $('<table/>', {'class': 'rb-table__footable table'}); //.prependTo(self.$form)
            $.get( this.jsonURL, function( data ) {

                // собираем таблицу
                $.each(data, function(index, element) {
                    if (data[index].bigtitle){
                        var row = $('<tr/>', {'style':'width: 50%; display: block; float: left;'});
                        var chek = $('<input>', {'class':'js-switch-small rb-net__table-chek', 'type':'checkbox', 'checked':'checked'})
                            .on('change', this, self.columSetting);
                        row.append($('<td/>',{'style':'width: 55px;'}).append(chek));
                        row.append($('<td/>', {text: data[index].bigtitle}));
                        row.appendTo(table);
                    }

                });

                // включаем чекбоксы
                var small = Array.prototype.slice.call(document.querySelectorAll('.js-switch-small'));

                small.forEach(function(html) {
                    var switchery = new Switchery(html, { size: 'small' });
                });
            });

            // вставляем таблицу
            var target = $('.rb-net__table-settings');
            table.prependTo(target);

        },
        columSetting: function (e){
            if(!e.target.checked){
                console.log(e);
                ft.columns.get(e.data.name).breakpoints = "xs sm md lg";
                console.log(ft.columns.get(e.data.name));
            } else {
                //console.log("true");
                ft.columns.get(e.data.name).breakpoints = e.data.breakpoints;
                console.log(ft.columns.get(e.data.name));
            }
            ft.draw();

        }
    };




    $net__table_settings.loaddata();

    //ft.pageSize(30);
    //ft.draw();
    //console.log(ft.pageSize());
    $UF_ITOGO__filter.on("change", function () {
        var $this = $(this),
            value = $this.prop("value").split(";");

        console.log(value[0] + " - " + value[1]);
    });
    // ------------------------------------------------------------
    // Фильтр Итого
    //var $UF_ACTIVE__filter = $(".rb-net__filter-section_active input:checkbox");

    $UF_ITOGO__filter.on('change', function(){
        var filtering = FooTable.get('.footable3').use(FooTable.Filtering); // get the filtering component for the table
        var $this = $(this),
            value = $this.prop("value").split(";");
        //var active_array = $('.rb-net__filter-section_active input:checkbox:checked.rb-net__filter-chek_active').map(function () {
        //return this.value;
        //}).get(); // ["18", "55", "10"]

        if (value[0] > 0){
            filtering.addFilter('UF_ITOGO', '10', ['UF_ITOGO']);
            console.log(value[0]);
            //filter = active_array.join(' OR ');
            //filtering.addFilter('UF_ACTIVE', filter, ['UF_ACTIVE']);
        } else {
            //console.log("пустой");
            filtering.removeFilter('UF_ITOGO');
            //filter = null;
        }

        filtering.filter();
        //console.log(values);
    });

    // ------------------------------------------------------------
    // Фильтр Активности
    var $UF_ACTIVE__filter = $(".rb-net__filter-section_active input:checkbox");

    $UF_ACTIVE__filter.on('change', function(){
        var filtering = FooTable.get('.footable3').use(FooTable.Filtering); // get the filtering component for the table
        var active_array = $('.rb-net__filter-section_active input:checkbox:checked.rb-net__filter-chek_active').map(function () {
            return this.value;
        }).get(); // ["18", "55", "10"]
        if (active_array.length){
            console.log(active_array);
            filter = active_array.join(' OR ');
            filtering.addFilter('UF_ACTIVE', filter, ['UF_ACTIVE']);
        } else {
            //console.log("пустой");
            filtering.removeFilter('UF_ACTIVE');
            //filter = null;
        }

        filtering.filter();
        //console.log(values);
    });


    // ------------------------------------------------------------
    // Фильтр Статусов

    var $UF_STATUS__filter = $(".rb-net__filter-section_status .selectpicker");

    $UF_STATUS__filter.on('change', function(){
        var filtering = FooTable.get('.footable3').use(FooTable.Filtering), // get the filtering component for the table
            status_array = $UF_STATUS__filter.val();
        // get the value to filter by
        if ($UF_STATUS__filter.val()){
            filter = status_array.join(' OR ');
        } else {
            filter = null;
        }
        console.log(filter);
        if (filter === 'null'){ // if the value is "none" remove the filter
            filtering.removeFilter('UF_STATUS');
        } else { // otherwise add/update the filter.
            filtering.addFilter('UF_STATUS', filter, ['UF_STATUS']);
        }
        filtering.filter();
    });

    // ------------------------------------------------------------
    // Фильтр Уровней

    var $UF_LEVEL__filter = $(".rb-net__filter-section_levels .selectpicker");

    $UF_LEVEL__filter.on('change', function(){
        var filtering = FooTable.get('.footable3').use(FooTable.Filtering), // get the filtering component for the table
            filter_array = $UF_LEVEL__filter.val();
        // get the value to filter by
        if (filter_array === null) {
            filter = null;
        } else {
            filter = filter_array.join(' OR ');
        }
        console.log(filter);
        if (filter === 'null'){ // if the value is "none" remove the filter
            filtering.removeFilter('UF_LEVEL');
        } else { // otherwise add/update the filter.
            filtering.addFilter('UF_LEVEL', filter, ['UF_LEVEL']);
        }
        filtering.filter();
    });

    // ------------------------------------------------------------
    // Фильтр Квалификаций

    var $UF_SKILL__filter = $(".rb-net__filter-section_skill .selectpicker");

    $UF_SKILL__filter.on('change', function(){
        var UF_SKILL_filtering = FooTable.get('.footable3').use(FooTable.Filtering), // get the filtering component for the table
            skill_array = $UF_SKILL__filter.val();
        // get the value to filter by
        if (skill_array === null) {
            filter = null;
        } else {
            filter = skill_array.join(' OR ');
        }
        console.log(filter);
        if (filter === 'null'){ // if the value is "none" remove the filter
            UF_SKILL_filtering.removeFilter('UF_SKILL');
        } else { // otherwise add/update the filter.
            UF_SKILL_filtering.addFilter('UF_SKILL', filter, ['UF_SKILL']);
        }
        UF_SKILL_filtering.filter();
    });

    // ------------------------------------------------------------
    // Фильтр Активности

    var $UF_ACTIVE__filter = $(".rb-net__filter-section_active .rb-net__filter-active");

    $UF_ACTIVE__filter.on('change', function(){
        var UF_ACTIVE_filtering = FooTable.get('.footable3').use(FooTable.Filtering), // get the filtering component for the table
            active = $UF_ACTIVE__filter.val();

        if (active === null) {
            filter = null;
        } else {
            filter = active;
        }
        console.log(filter);
        if (filter === 'null'){ // if the value is "none" remove the filter
            UF_ACTIVE_filtering.removeFilter('UF_SKILL');
        } else { // otherwise add/update the filter.
            UF_ACTIVE_filtering.addFilter('UF_SKILL', filter, ['UF_SKILL']);
        }
        UF_ACTIVE_filtering.filter();
    });

});
function footable3__formater_number (value){

    val = ""+value;
    if (val.indexOf(".") >= 0){
        var number_split = val.split('.');
        return '<span class="rb-net__table-number_big">'+ number_split[0]+'</span><span class="rb-net__table-number_des">.'+ number_split[1]+'</span>';
        //console.log(val);
    } else {
        if (val == 0){
            console.log(val);
            return '<span class="rb-net__table-number_big rb-net__table-number_null">'+value+'</span><span class="rb-net__table-number_des"> </span>'
        } else {
            return '<span class="rb-net__table-number_big">'+value+'</span><span class="rb-net__table-number_des"> </span>'
        }

    }



    //if( >= 0){

    //};
    //return value;
    //var number_split = value.split('.');
    //
}
function footable3__formater_UF_SKILL (value){
    return '<span class="label" title="Квалификация: ' + value + '">К:' + value + '</span>';
}
function footable3__formater_UF_LEVEL (value){
    return '<span class="label" title="Уровень: ' + value + '">У:' + value + '</span>';
}

function footable3__formater_UF_ACTIVE(value) {
    switch (value) {
        case "Не активен":
            return '<i class="fa fa-circle text-danger" title="Не активный"></i>';
            break;
        case "Полуактивность":
            return '<i class="fa fa-circle text-warning" title="Полуактивность"></i>';
            break;
        case "Активность":
            return '<i class="fa fa-circle text-navy" title="Активный"></i>';
            break;
    }
}

function footable3__formater_UF_STATUS(value) {
    return '<span class="label" title="Статус: ' + value + '">' + value.substr(0, 1) + '</span>';
}

function footable3__formater_UF_FIO(value, options, row) {
    var splited = value.split(' ');
    var famil = splited[0]; // фамилия
    switch (row.UF_ACTIVE) {
        case "Не активен":
            var active = $('<i/>',{'class':'fa fa-circle text-danger', 'title':'Не активный'});
            break;
        case "Полуактивность":
            var active = $('<i/>',{'class':'fa fa-circle text-warning', 'title':'Полуактивность'});
            break;
        case "Активность":
            var active = $('<i/>',{'class':'fa fa-circle text-navy', 'title':'Активный'});
            break;
    }
    var user_button_group = $('<div/>', {'class': 'rb-user-button btn-group'}),

        user_button = ($('<a/>',{'class':'rb-user-button__main-link btn btn-default rb-rightsidebar__show'})
                .append(active)
                .append($('<span/>', {'text': ' '+famil}))
        ).appendTo(user_button_group),

        dropdown_toggle = ($('<button/>',{
                'class':'rb-user-button__dropdown-toggle btn btn-default dropdown-toggle',
                'type':"button",
                'data-toggle':'dropdown',
                'aria-haspopup':"true",
                "aria-expanded":"false"
            })
                .append($('<span/>',{'class': 'caret'}))
                .append($('<span/>',{'class': 'sr-only','text':'Toggle Dropdown'}))
        ).appendTo(user_button_group),

        dropdown = ($('<ul/>', {'class': 'dropdown-menu rb-user-button__dropdown-menu'})
                .append($('<li/>')
                    .append($('<a/>', {
                            'class': 'rb-user-button__card-link rb-rightsidebar__show',
                            'href':'#',
                            'data-rb-user-id': row.UF_USER_ID,
                            'text': 'Карточка'
                        }
                        )
                    )
                )
        ).appendTo(user_button_group);

    return user_button_group;
}

FooTable.Cell.prototype.format = function(value){
    //console.log(this.row.value);
    return this.column.formatter.call(this.column, value, this.ft.o, this.row.value);
};

// ======================
// app.js end
// ======================
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