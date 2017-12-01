function ShowPriceDetailCalendar(id, isNoPrice, td, day, itinerary) {
    if (isNoPrice == "False") {
        if (!$(id).hasClass("tooltips-active") && !$(td).hasClass("hidden-date")) { //Has not tooltips-active class and hidden-date
            if ($(id).children().length == 0) {
                $(id).empty();
                if (itinerary == "depart") {
                    $("#pnPriceDetailDepartContent" + day).clone().appendTo($(id));
                    $("#pnPriceDetailDepartColumn" + day).empty();
                } else {
                    $("#pnPriceDetailReturnContent" + day).clone().appendTo($(id));
                    $("#pnPriceDetailReturnColumn" + day).empty();
                }
            }
            var position = $(td).position();
            var height = $(id).height();
            $(id).offset({ top: position.top - (height / 2) + 25 });
            $(id).show();
        }
    }
}

function ShowPriceDetailColumn(id, isNoPrice, columnId, day, itinerary) {
    if (isNoPrice == "False") {
        if (!$(id).hasClass("tooltips-active") && !$(columnId).hasClass("baydep-chart-column-hidden-column")) { //Has not tooltips-active class and baydep-chart-column-hidden-column
            if ($(id).children().length == 0) {
                $(id).empty();
                if (itinerary == "depart") {
                    $("#pnPriceDetailDepartContent" + day).clone().appendTo($(id));
                    $("#pnPriceDetailDepartCalendar" + day).empty();
                } else {
                    $("#pnPriceDetailReturnContent" + day).clone().appendTo($(id));
                    $("#pnPriceDetailReturnCalendar" + day).empty();
                }
            }
            var position = $(columnId).position();
            var height = $(id).height();
            $(id).css("top", position.top - height - 20);
            $(id).show();
        }
    }
}

function OnSelectPriceCalendar(id, isNoPrice, td, itinerary, day) {
    if (isNoPrice == "False" && !$(td).hasClass("hidden-date")) {
        $(".selected-date." + itinerary).removeClass("selected-date");
        if ($(td).hasClass(itinerary)) $(td).addClass("selected-date");

        $(".tooltips-active." + itinerary).hide();
        $(".tooltips-active." + itinerary).removeClass("tooltips-active");

        $(id).show();
        $(id).addClass("tooltips-active");

        //Disable wrong date
        if (itinerary == "depart" && $("#hdfItinerary").val() == "2" && $("#hdfCurrentStartMonth").val() == $("#hdfCurrentEndMonth").val()) {
            $(".return").removeClass("hidden-date");
            $(".baydep-chart-column").removeClass("baydep-chart-column-hidden-column");

            for (var i = day - 1; i > 0; i--) {
                $(".tooltips-active.return").hide();
                $(".tooltips-active.return").removeClass("tooltips-active");

                var tdReturn = "#tdReturn" + i.toString();
                $(tdReturn).addClass("hidden-date");
                $(tdReturn).removeClass("selected-date");

                var columnReturn = "#columnReturn" + i.toString();
                $(columnReturn).addClass("baydep-chart-column-hidden-column");
                $(columnReturn).removeClass("selected-column");
            }
        }
    }
}

function OnSelectPriceColumn(id, isNoPrice, columnId, itinerary, day) {
    if (isNoPrice == "False" && !$(columnId).hasClass("baydep-chart-column-hidden-column")) {
        if ($(columnId).hasClass("selected-column")) {
            $(columnId).removeClass("selected-column");
        }
        else {
            $(".selected-column." + itinerary).removeClass("selected-column");
            $(columnId).addClass("selected-column");
        }

        if ($(id).css("display") == "none") {
            $(id).show();
        }
        else {
            $(".tooltips-active." + itinerary).hide();
            $(".tooltips-active." + itinerary).removeClass("tooltips-active");
            $(id).addClass("tooltips-active");
        }

        //Disable wrong date
        if (itinerary == "depart" && $("#hdfItinerary").val() == "2" && $("#hdfCurrentStartMonth").val() == $("#hdfCurrentEndMonth").val()) {
            $(".return").removeClass("hidden-date");
            $(".baydep-chart-column").removeClass("baydep-chart-column-hidden-column");

            for (var i = day - 1; i > 0; i--) {
                $(".tooltips-active.return").hide();
                $(".tooltips-active.return").removeClass("tooltips-active");

                var tdReturn = "#tdReturn" + i.toString();
                $(tdReturn).addClass("hidden-date");
                $(tdReturn).removeClass("selected-date");

                var columnReturn = "#columnReturn" + i.toString();
                $(columnReturn).addClass("baydep-chart-column-hidden-column");
                $(columnReturn).removeClass("selected-column");
            }
        }
    }
}

function HidePriceDetail(id) {
    if (!$(id).hasClass("tooltips-active")) { //Has not tooltips-active class
        $(id).hide();
    }
}

function ClosePriceDetailForm(id, itinerary) {
    if (itinerary == "depart") {
        $("#pnPriceDetailDepartColumn" + id).hide("fast", "");
        $("#pnPriceDetailDepartCalendar" + id).hide("fast", "");
    } else {
        $("#pnPriceDetailReturnColumn" + id).hide("fast", "");
        $("#pnPriceDetailReturnCalendar" + id).hide("fast", "");
    }
    
    $(".selected-date." + itinerary).removeClass("selected-date");
    $(".selected-column." + itinerary).removeClass("selected-column");
    $(".tooltips-active." + itinerary).removeClass("tooltips-active");
}

function ClosePriceDetailFormKeepSelected(id, itinerary) {
    var control = $("#" + id);
    $(control).hide("fast", "");
    $(".tooltips-active." + itinerary).removeClass("tooltips-active");
}


function SetPrice(priceAdt, priceChd, priceInf) {
    var adt = Number($("#lblAdt").text());
    var chd = Number($("#lblChd").text());
    var inf = Number($("#lblInf").text());

    //Set price for each passenger type
    $("#lblPriceAdt").text(format("#.##0,####", priceAdt));
    $("#lblPriceChd").text(format("#.##0,####", priceChd));
    $("#lblPriceInf").text(format("#.##0,####", priceInf));

    //Set total price for each passenger type
    $("#lblTotalPriceAdt").text(format("#.##0,####", adt * priceAdt));
    $("#lblTotalPriceChd").text(format("#.##0,####", chd * priceChd));
    $("#lblTotalPriceInf").text(format("#.##0,####", inf * priceInf));

    //Check visible CHD, INF
    if (chd > 0) {
        $("#trFareChild").show();
    }
    else {
        $("#trFareChild").hide();
    }

    if (inf > 0) {
        $("#trFareInfant").show();
    }
    else {
        $("#trFareInfant").hide();
    }

    //Grand total price
    var grandTotal = adt * priceAdt + chd * priceChd + inf * priceInf;
    $("#lblBasketGrandTotal").text(format("#.##0,####", grandTotal));
}

function SelectDepartFlight(controlName, value) {
    var control = $("#" + controlName.id);
    if (control != null) {
        //Fill basket detail                
        $("#lblDepartStartTime").text(control.attr("data-start-time"));
        $("#lblDepartStartDate").text(control.attr("data-start-date"));
        $("#lblDepartEndTime").text(control.attr("data-end-time"));
        $("#lblDepartEndDate").text(control.attr("data-end-date"));
        $("#lblDepartAirline").text(control.attr("data-airline-name"));
        $("#lblDepartFlightNumber").text(control.attr("data-flight-number"));
        $("#imgDepartAirline").attr("src", control.attr("data-airline-logo"));
        $("#pnBasketDepartFlight").show('blind');

        //Set depart price to hidden field
        $("#hdfFareAdtDepart").val(control.attr("data-price-adt"));
        $("#hdfFareChdDepart").val(control.attr("data-price-chd"));
        $("#hdfFareInfDepart").val(control.attr("data-price-inf"));

        //Get return price from hidden field
        var priceAdtDepart = Number($("#hdfFareAdtDepart").val());
        var priceChdDepart = Number($("#hdfFareChdDepart").val());
        var priceInfDepart = Number($("#hdfFareInfDepart").val());

        var priceAdtReturn = Number($("#hdfFareAdtReturn").val());
        var priceChdReturn = Number($("#hdfFareChdReturn").val());
        var priceInfReturn = Number($("#hdfFareInfReturn").val());

        //Calculate sum of depart price and return price
        var priceAdt = priceAdtDepart + priceAdtReturn;
        var priceChd = priceChdDepart + priceChdReturn;
        var priceInf = priceInfDepart + priceInfReturn;

        SetPrice(priceAdt, priceChd, priceInf);
        $("#hdfCacheDataIdDepart").val(value);
        $("#hdfFlightNumberDepart").val(control.attr("data-flight-number"));

        ClosePriceDetailFormKeepSelected(control.attr("data-price-popup-id"), "depart");
        ClosePriceDetailFormKeepSelected(control.attr("data-price-popup-column-id"), "depart");
        $("#hdfFlightPriceIdDepart").val(control.attr("data-price-day"));

        if ($("#hdfItinerary").val() == "2") {
            //Check return date
            var departDay = Number($("#hdfFlightPriceIdDepart").val());
            var returnDay = Number($("#hdfFlightPriceIdReturn").val());
            if (departDay > returnDay) {
                //Reset selected return flight
                $("#pnBasketReturnFlight").hide('blind');

                //Set return price to hidden field
                $("#hdfFareAdtReturn").val(0);
                $("#hdfFareChdReturn").val(0);
                $("#hdfFareInfReturn").val(0);

                //Get depart price from hidden field
                var priceAdtDepart = Number($("#hdfFareAdtDepart").val());
                var priceChdDepart = Number($("#hdfFareChdDepart").val());
                var priceInfDepart = Number($("#hdfFareInfDepart").val());

                var priceAdtReturn = Number($("#hdfFareAdtReturn").val());
                var priceChdReturn = Number($("#hdfFareChdReturn").val());
                var priceInfReturn = Number($("#hdfFareInfReturn").val());

                //Calculate sum of depart price and return price
                var priceAdt = priceAdtDepart + priceAdtReturn;
                var priceChd = priceChdDepart + priceChdReturn;
                var priceInf = priceInfDepart + priceInfReturn;

                SetPrice(priceAdt, priceChd, priceInf);
                $("#hdfCacheDataIdReturn").val("");
                $("#hdfFlightNumberReturn").val("");
            }
        }

        CheckVisibleContinueButton();
        GetBookUrl();
        if ($("#hdfItinerary").val() == "2") {
            ScrollToControlById('pnChartColumnReturn');
        }
        else {
            ScrollToControlById('Basket');
        }
    }
}

function SelectReturnFlight(controlName, value) {
    var control = $("#" + controlName.id);
    if (control != null) {
        //Fill basket details
        $("#lblReturnStartTime").text(control.attr("data-start-time"));
        $("#lblReturnStartDate").text(control.attr("data-start-date"));
        $("#lblReturnEndTime").text(control.attr("data-end-time"));
        $("#lblReturnEndDate").text(control.attr("data-end-date"));
        $("#lblReturnAirline").text(control.attr("data-airline-name"));
        $("#lblReturnFlightNumber").text(control.attr("data-flight-number"));
        $("#imgReturnAirline").attr("src", control.attr("data-airline-logo"));
        $("#pnBasketReturnFlight").show('blind');

        //Set return price to hidden field
        $("#hdfFareAdtReturn").val(control.attr("data-price-adt"));
        $("#hdfFareChdReturn").val(control.attr("data-price-chd"));
        $("#hdfFareInfReturn").val(control.attr("data-price-inf"));

        //Get depart price from hidden field
        var priceAdtDepart = Number($("#hdfFareAdtDepart").val());
        var priceChdDepart = Number($("#hdfFareChdDepart").val());
        var priceInfDepart = Number($("#hdfFareInfDepart").val());

        var priceAdtReturn = Number($("#hdfFareAdtReturn").val());
        var priceChdReturn = Number($("#hdfFareChdReturn").val());
        var priceInfReturn = Number($("#hdfFareInfReturn").val());

        //Calculate sum of depart price and return price
        var priceAdt = priceAdtDepart + priceAdtReturn;
        var priceChd = priceChdDepart + priceChdReturn;
        var priceInf = priceInfDepart + priceInfReturn;

        SetPrice(priceAdt, priceChd, priceInf);
        $("#hdfCacheDataIdReturn").val(value);
        $("#hdfFlightNumberReturn").val(control.attr("data-flight-number"));

        CheckVisibleContinueButton();
        ClosePriceDetailFormKeepSelected(control.attr("data-price-popup-id"), "return");
        ClosePriceDetailFormKeepSelected(control.attr("data-price-popup-column-id"), "return");
        $("#hdfFlightPriceIdReturn").val(control.attr("data-price-day"));
        GetBookUrl();
        ScrollToControlById('Basket');
    }
}

function CheckVisibleContinueButton() {
    if ($("#hdfItinerary").val() == "1") {
        var priceAdtDepart = Number($("#hdfFareAdtDepart").val());
        if (priceAdtDepart > 0) {
            $("#pnBtnContinueBasket").show('blind');
            $("#Basket").show('blind');
        }
        else {
            $("#pnBtnContinueBasket").hide('blind');
        }
    }
    else {
        var priceAdtDepart = Number($("#hdfFareAdtDepart").val());
        var priceAdtReturn = Number($("#hdfFareAdtReturn").val());
        if (priceAdtDepart > 0 || priceAdtReturn > 0) {
            $("#pnBtnContinueBasket").show('blind');
            $("#Basket").show('blind');
        }
        else {
            $("#pnBtnContinueBasket").hide('blind');
        }
    }
}

function GetBookUrl() {
    var adt = Number($("#lblAdt").text());
    var chd = Number($("#lblChd").text());
    var inf = Number($("#lblInf").text());
    var cacheDataIdDepart = $("#hdfCacheDataIdDepart").val();
    var flightNumberDepart = $("#hdfFlightNumberDepart").val();
    var cacheDataIdReturn = $("#hdfCacheDataIdReturn").val();
    var flightNumberReturn = $("#hdfFlightNumberReturn").val();
    var url = "";
    if (cacheDataIdDepart != "" && flightNumberDepart != "" && cacheDataIdReturn != "" && flightNumberReturn != "") {
        //Round trip
        url = "/domestic-book/depart-data-id/" + cacheDataIdDepart + "/depart-flight/" + flightNumberDepart + "/return-data-id/" + cacheDataIdReturn + "/return-flight/" + flightNumberReturn + "/adt/" + adt + "/chd/" + chd + "/inf/" + inf;
    }
    else {
        //One way
        if (cacheDataIdDepart != "" && flightNumberDepart != "") {
            //Depart
            url = "/domestic-book/depart-data-id/" + cacheDataIdDepart + "/depart-flight/" + flightNumberDepart + "/adt/" + adt + "/chd/" + chd + "/inf/" + inf;
        }
        else if (cacheDataIdReturn != "" && flightNumberReturn != "") {
            //Return
            url = "/domestic-book/depart-data-id/" + cacheDataIdReturn + "/depart-flight/" + flightNumberReturn + "/adt/" + adt + "/chd/" + chd + "/inf/" + inf;
        }
    }

    $("#lbtSelect").prop("href", url)
}

function RemoveDepartFlight() {
    //Reset selected return flight
    $("#pnBasketDepartFlight").hide("fast", "");

    //Set depart price to hidden field
    $("#hdfFareAdtDepart").val(0);
    $("#hdfFareChdDepart").val(0);
    $("#hdfFareInfDepart").val(0);

    //Get depart price from hidden field
    var priceAdtDepart = Number($("#hdfFareAdtDepart").val());
    var priceChdDepart = Number($("#hdfFareChdDepart").val());
    var priceInfDepart = Number($("#hdfFareInfDepart").val());

    var priceAdtReturn = Number($("#hdfFareAdtReturn").val());
    var priceChdReturn = Number($("#hdfFareChdReturn").val());
    var priceInfReturn = Number($("#hdfFareInfReturn").val());

    //Calculate sum of depart price and return price
    var priceAdt = priceAdtDepart + priceAdtReturn;
    var priceChd = priceChdDepart + priceChdReturn;
    var priceInf = priceInfDepart + priceInfReturn;

    SetPrice(priceAdt, priceChd, priceInf);
    $("#hdfCacheDataIdDepart").val("");
    $("#hdfFlightNumberDepart").val("");

    CheckVisibleContinueButton();
    GetBookUrl();
}

function RemoveReturnFlight() {
    //Reset selected return flight
    $("#pnBasketReturnFlight").hide("fast", "");

    //Set return price to hidden field
    $("#hdfFareAdtReturn").val(0);
    $("#hdfFareChdReturn").val(0);
    $("#hdfFareInfReturn").val(0);

    //Get depart price from hidden field
    var priceAdtDepart = Number($("#hdfFareAdtDepart").val());
    var priceChdDepart = Number($("#hdfFareChdDepart").val());
    var priceInfDepart = Number($("#hdfFareInfDepart").val());

    var priceAdtReturn = Number($("#hdfFareAdtReturn").val());
    var priceChdReturn = Number($("#hdfFareChdReturn").val());
    var priceInfReturn = Number($("#hdfFareInfReturn").val());

    //Calculate sum of depart price and return price
    var priceAdt = priceAdtDepart + priceAdtReturn;
    var priceChd = priceChdDepart + priceChdReturn;
    var priceInf = priceInfDepart + priceInfReturn;

    SetPrice(priceAdt, priceChd, priceInf);
    $("#hdfCacheDataIdReturn").val("");
    $("#hdfFlightNumberReturn").val("");

    CheckVisibleContinueButton();
    GetBookUrl();
}

function ScrollToControlById(controlId) {
    control = document.getElementById(controlId);
    var targetOffset = $(control).offset().top;
    jQuery('html,body').animate({ scrollTop: targetOffset - 20 }, 700);
}