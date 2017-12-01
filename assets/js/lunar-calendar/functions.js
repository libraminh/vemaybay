function jScript() {
    if ($("#lang").val() == "vi-VN") {
        $.datepickerlunar.setDefaults($.datepickerlunar.regional["vi-VN"]);
        var mdate = new Date();
        var depart = $("#txtDepartureDate").val();
        if (depart != "") {
            var dsplit = depart.split("index.html");
            mdate = new Date(dsplit[2], dsplit[1] - 1, dsplit[0]);
        }
        $("#txtDepartureDate").datepickerlunar({
            numberOfMonths: 2,
            minDate: "0",
            maxDate: "+1Y",
            showAnim: "",
            duration: 0,
            showButtonPanel: true,
            dateFormat: "dd/mm/yy",
            onSelect: function (selectedDate) {
                var dsplit = selectedDate.split("index.html");
                var m2date = new Date(dsplit[2], dsplit[1] - 1, dsplit[0]);
                $("#txtReturnDate").datepickerlunar("option", "minDate", m2date);
                if ($("#rdbRoundTrip").is(":checked")) {
                    setTimeout(function () {
                        $("#txtReturnDate").datepickerlunar('show');
                    }, 16);
                }
                else {
                    $("#txtReturnDate").val("---");
                }
            }
        });

        $("#txtReturnDate").datepickerlunar({
            numberOfMonths: 2,
            showButtonPanel: true,
            minDate: mdate,
            maxDate: "+1Y",
            showAnim: "",
            duration: 0,
            dateFormat: "dd/mm/yy",
            onSelect: function (selectedDate) {
                $("#lnkClearReturnDate").show();
                $("#rdbRoundTrip").prop('checked', true);
                $("#rdbOneWay").prop('checked', false);
            }
        });
    }
    else {
        $.datepicker.setDefaults($.datepicker.regional["en"]);
        $("#txtDepartureDate").datepicker({
            numberOfMonths: 2,
            minDate: "0",
            maxDate: "+1Y",
            showAnim: "",
            showButtonPanel: true,
            onSelect: function (selectedDate) {
                $("#txtReturnDate").datepicker("option", "minDate", selectedDate);
                if ($("#rdbRoundTrip").is(":checked")) {
                    setTimeout(function () {
                        $("#txtReturnDate").datepicker('show');
                    }, 16);
                }
                else {
                    $("#txtReturnDate").val("---");
                }
            }
        });

        $("#txtReturnDate").datepicker({
            numberOfMonths: 2,
            showButtonPanel: true,
            minDate: $("#txtDepartureDate").datepicker("getDate"),
            maxDate: "+1Y",
            showAnim: "",
            onSelect: function (selectedDate) {
                $("#lnkClearReturnDate").show();
                $("#rdbRoundTrip").prop('checked', true);
                $("#rdbOneWay").prop('checked', false);
            }
        });
    }

    $(document.body).mousedown(function (event) {
        var target = $(event.target);
        if (!target.parents().andSelf().is('#pnCity')) { // Clicked outside
            $('#pnCity').hide("fast", '');
        }
    });

    $(document).ready(function () {
        $("#txtStartPoint").autocomplete({
            source: function (request, response) {
                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    url: "/Controls/SearchCity.asmx/SearchAirportData",
                    data: "{searchParam:'" + $("#txtStartPoint").val() + "'}",
                    dataType: "json",
                    success: function (data) {
                        response(data.d);
                        $('#pnCity').hide();
                    }
                });
            },
            select: function (event, ui) {
                event.preventDefault();
                $('#hdfStartPoint').val(ui.item.AirportCode);
                $("#txtStartPoint").val(ui.item.AirportName);
                $("#hdfStartCountry").val(ui.item.CountryCode);
                $('#pnCity').hide();
                $("#txtEndPoint").val("");
                $("#txtEndPoint").focus();
                CheckTripType();
            },
            minLength: 1
        }).autocomplete("instance")._renderItem = function (ul, item) {
            return $("<li>")
              .append("<div><div class='autocomplete-list-airport-icon'><img alt='Airport' src='/Styles/Images/airport.png' height='30' /></div><div class='autocomplete-list-airport-content'>" + item.AirportName + "<br><span class='autocomplete-list-airport-city'>" + item.City + "</span></div><div class='clear'></div></div>")
              .appendTo(ul);
        };

        $("#txtEndPoint").autocomplete({
            source: function (request, response) {
                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    url: "/Controls/SearchCity.asmx/SearchAirportData",
                    data: "{searchParam:'" + $("#txtEndPoint").val() + "'}",
                    dataType: "json",
                    success: function (data) {
                        response(data.d);
                        $('#pnEndCity').hide();
                    }
                });
            },
            select: function (event, ui) {
                event.preventDefault();
                $('#hdfEndPoint').val(ui.item.AirportCode);
                $("#txtEndPoint").val(ui.item.AirportName);
                $("#hdfEndCountry").val(ui.item.CountryCode);
                $('#pnCity').hide();
                CheckTripType();

                if ($("hdfSearchMode").val() == "2") {
                    if ($("#lang").val() == "vi-VN") {
                        setTimeout(function () {
                            $("#txtDepartureDate").datepickerlunar('show');
                        }, 16);
                    } else {
                        $("#txtDepartureDate").datepicker('show');
                    }
                }
            },
            minLength: 1
        }).autocomplete("instance")._renderItem = function (ul, item) {
            return $("<li>")
              .append("<div><div class='autocomplete-list-airport-icon'><img alt='Airport' src='/Styles/Images/airport.png' height='30' /></div><div class='autocomplete-list-airport-content'>" + item.AirportName + "<br><span class='autocomplete-list-airport-city'>" + item.City + "</span></div><div class='clear'></div></div>")
              .appendTo(ul);
        };

        $('#btnCloseSelectCity').bind('click', function () {
            $('#pnCity').hide();
        });

        $("#txtStartPoint").bind('click', function () {
            $('#hdfSelectPointType').val("1");
            $('#lblPleaseSelect').text('Chọn thành phố, sân bay đi');
            $("#txtStartPoint").val("");
            $('#hdfStartPoint').val("");
            ShowSelectCityPanel($("#pnCity").get(), $("#pnControlHolderDepart").get());
            //ScrollToControl('bookingForm');
        });

        $("#txtEndPoint").bind('click', function () {
            $('#hdfSelectPointType').val("2");
            $('#lblPleaseSelect').text('Chọn thành phố, sân bay đến');
            $("#txtEndPoint").val("");
            $('#hdfEndPoint').val("");
            ShowSelectCityPanel($("#pnCity").get(), $("#pnControlHolderReturn").get());
            //ScrollToControl('bookingForm');
        });

        $(".list-point").on("click", "li", function () {
            var type = $('#hdfSelectPointType').val();
            var code = $(this).attr("airport-code");
            var country = $(this).attr("country-code");
            var name = $(this).attr("city-name") + " (" + $(this).attr("airport-code") + ")" + ", " + $(this).attr("country-name");
            if (type == "1") {
                $("#hdfStartPoint").val(code);
                $("#txtStartPoint").val(name);
                $("#hdfStartCountry").val(country);
            }
            else {
                $("#hdfEndPoint").val(code);
                $("#txtEndPoint").val(name);
                $("#hdfEndCountry").val(country);

                if ($("hdfSearchMode").val() == "1") {
                    if ($("#lang").val() == "vi-VN") {
                        setTimeout(function () {
                            $("#txtDepartureDate").datepickerlunar('show');
                        }, 16);
                    } else {
                        $("#txtDepartureDate").datepicker('show');
                    }
                }
            }

            $('#pnCity').hide();
            CheckTripType();
        });

        $("#pnSearchTab1").bind('click', function () {
            if ($("#hdfSearchMode").val() != "1") {
                $(".form-title").removeClass("active");
                $("#pnSearchTab1").addClass("active");
                $("#hdfSearchMode").val("1");

                //Toggle search mode
                $("#pnSearchByDay").show();
                $("#pnSearchByMonth").hide();
                $("#pnFilterAirlineForDate").show();
                $("#pnFilterAirlineForMonth").hide();
                CheckTripType();
            }
        });

        $("#pnSearchTab2").bind('click', function () {
            if ($("#hdfSearchMode").val() != "2") {
                $(".form-title").removeClass("active");
                $("#pnSearchTab2").addClass("active");
                $("#hdfSearchMode").val("2");

                //Toggle search mode
                $("#pnSearchByDay").hide();
                $("#pnSearchByMonth").show();
                $("#pnFilterAirlineForDate").hide();
                $("#pnFilterAirlineForMonth").show();
                CheckTripType();
            }
        });

        $("#pnSearchTab3").bind('click', function () {
            if ($("#hdfSearchMode").val() != "3") {
                $(".form-title").removeClass("active");
                $("#pnSearchTab3").addClass("active");
                $("#hdfSearchMode").val("3");
                window.location.href = "chu-de/khach-san.html";
            }
        });

        $("#pnSearchTab4").bind('click', function () {
            if ($("#hdfSearchMode").val() != "4") {
                $(".form-title").removeClass("active");
                $("#pnSearchTab4").addClass("active");
                $("#hdfSearchMode").val("4");
            }
        });
    });
}

function OnChangedDropDownMonth() {
    //Remove all option first
    $("#ddlEndMonth option").remove();

    //Append new option
    var index = $("#ddlStartMonth").find(":selected").index();
    for (var i = index; i < 12; i++) {
        var itemValue = $('#ddlStartMonth option').eq(i).val();
        var itemText = $('#ddlStartMonth option').eq(i).text();

        var option = new Option(itemText, itemValue);
        $("#ddlEndMonth").append($(option));
    }
}

function CheckTripType() {
    var startCountry = $('#hdfStartCountry').val();
    var endCountry = $('#hdfEndCountry').val();

    if (startCountry == 'VN' && endCountry == 'VN') {
        $('#pnReturnMonth').show();
        $('#pnDayRanger').hide();
        $('#pnFilterAirline').show();

        var rbSelected = $("#rdbRoundTrip").is(":checked");
        if (rbSelected) {
            $("#ddlEndMonth").removeAttr("disabled");
        }
        else {
            $("#ddlEndMonth").attr("disabled", "true");
        }
    }
    else {
        $('#pnReturnMonth').hide();
        $('#pnDayRanger').show();
        $('#pnFilterAirline').hide();

        var rbSelected = $("#rdbRoundTrip").is(":checked");
        if (rbSelected) {
            $("#ddlTripRange").removeAttr("disabled");
        }
        else {
            $("#ddlTripRange").attr("disabled", "true");
        }
    }
}

function ShowSelectCityPanel(control, parent) {
    var position = $(parent).position();
    $(control).css({ left: position.left });
    $(control).show();
}

function ScrollToControl(controlId) {
    control = document.getElementById(controlId);
    var targetOffset = $(control).offset().top;
    jQuery('html,body').animate({ scrollTop: targetOffset - 80 }, 700);
}

function ClearReturnDate() {
    $("#txtReturnDate").val("---");
    $("#lnkClearReturnDate").hide();
    $("#rdbRoundTrip").prop('checked', false);
    $("#rdbOneWay").prop('checked', true);
}
