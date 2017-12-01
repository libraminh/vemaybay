function Toggle(targetId, controlId) {
    if (document.getElementById) {
        target = document.getElementById(targetId);
        control = document.getElementById(controlId);
        if ($(target).is(':visible')) {
            $(control).addClass('details');
            $(control).removeClass('details_selected');
        }
        else {
            $(control).addClass('details_selected');
            $(control).removeClass('details');
        }
        $(target).toggle('blind');
    }
}

function ToggleFare(targetId, controlId) {
    if (document.getElementById) {
        target = document.getElementById(targetId);
        control = document.getElementById(controlId);
        if ($(target).is(':visible')) {
            $(control).addClass('details');
            $(control).removeClass('details_selected');
        }
        else {
            $(control).addClass('details_selected');
            $(control).removeClass('details');
        }
        $(target).toggle('blind');
    }
}

function SelectFlight(value, control) {
    var flight = document.getElementById(control);
    if (flight != null) {
        flight.value = value;
    }
}

$(function () {
    function FreezeSortBox() {
        var control = $('#SortBar');
        var footer = $('#CheapFlight').position();
        if ($(window).scrollTop() > 160 && $(window).scrollTop() < footer.top - 300) {
            control.addClass('FreezeBox');
            var width = $('#grid_9_left').width();
            control.width(width - 10);
        }
        else {
            control.removeClass('FreezeBox');
        }
    }
    $(window).scroll(FreezeSortBox);
    FreezeSortBox();
});

$(function () {
    function FreezeBasketBox() {
        var $cache = $('#Basket');
        var spliter = $('#Spliter').position();
        var footer = $('#CheapFlight').position();
        if ($(window).scrollTop() > spliter.top - 50 && $(window).scrollTop() < footer.top - 520) {
            $cache.addClass('FreezeBoxNoShadow');
            var width = $('#Filter').width();
            $cache.width(width);
        }
        else {
            $cache.removeClass('FreezeBoxNoShadow');
        }
    }
    $(window).scroll(FreezeBasketBox);
    FreezeBasketBox();
});

$(function () {
    //Toggle show filter button
    var currPosition = 0;
    $(window).scroll(function (event) {
        var filterStatus = $('#Filter').css('left');
        var filterHight = $('#pnShowFilter').css('height');
        if (filterStatus == '0px' && filterHight != '0px') {
            var position = $(this).scrollTop();
            if (position > currPosition) {
                if (position > 100) {
                    $("#pnShowFilter").addClass('hide');
                    $("#pnShowFilter").removeClass('show');
                }
            }
            else {
                if ($(window).scrollTop() < currPosition) {
                    $("#pnShowFilter").addClass('show');
                }
            }
            currPosition = position;
        }
    });
});


function ShowFlightDetail(detailId, summaryId) {
    if (document.getElementById) {
        summary = document.getElementById(summaryId);
        detail = document.getElementById(detailId);

        $(summary).css('display', 'none');
        $(detail).css('display', 'block')
    }
}

function HideFlightDetail(detailId, summaryId) {
    if (document.getElementById) {
        summary = document.getElementById(summaryId);
        detail = document.getElementById(detailId);

        $(summary).css('display', 'block');
        $(detail).css('display', 'none')
    }
}

function SwitchViewMode(mode) {
    if (mode == 'base') {
        $(".view-base-fare").show();
        $(".view-total-fare").hide();
    }
    else {
        $(".view-base-fare").hide();
        $(".view-total-fare").show();
    }
}

var strDepartSms = "";
var strReturnSms = "";
var strTotalPrice = "";

function SelectDepartFlight(controlName, flightId) {
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

        $("#hdfSelectedDepartFlt").val(flightId);
        $(".FlightItem.FlightItemActive1").removeClass("FlightItemActive1");
        $("#pnDepartItem" + flightId).addClass("FlightItem FlightItemActive1");

        CheckVisibleContinueButton();

        strDepartSms = "Chieu di "
            + control.attr("data-airline-name") + " "
            + control.attr("data-flight-number") + " "
            + control.attr("data-start-point") + "("
            + control.attr("data-start-time") + " "
            + control.attr("data-start-date-sort") + ") "
            + control.attr("data-end-point") + "("
            + control.attr("data-end-time") + " "
            + control.attr("data-end-date-sort") + "). ";

        GetSmsString();
        $("#pnSendSmsBox").show();
    }
}

function SelectReturnFlight(controlName, flightId) {
    var control = $("#" + controlName.id);
    if (control != null) {
        //Fill basket detail
        $("#lblReturnStartTime").text(control.attr("data-start-time"));
        $("#lblReturnStartDate").text(control.attr("data-start-date"));
        $("#lblReturnEndTime").text(control.attr("data-end-time"));
        $("#lblReturnEndDate").text(control.attr("data-end-date"));
        $("#lblReturnAirline").text(control.attr("data-airline-name"));
        $("#lblReturnFlightNumber").text(control.attr("data-flight-number"));
        $("#imgReturnAirline").attr("src", control.attr("data-airline-logo"));
        $("#pnBasketReturnFlight").show('blind');

        //Set depart price to hidden field
        $("#hdfFareAdtReturn").val(control.attr("data-price-adt"));
        $("#hdfFareChdReturn").val(control.attr("data-price-chd"));
        $("#hdfFareInfReturn").val(control.attr("data-price-inf"));

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

        $("#hdfSelectedReturnFlt").val(flightId);
        $(".FlightItem.FlightItemActive2").removeClass("FlightItemActive2");
        $("#pnReturnItem" + flightId).addClass("FlightItem FlightItemActive2");

        CheckVisibleContinueButton();
        
        strReturnSms = "Chieu ve "
            + control.attr("data-airline-name") + " "
            + control.attr("data-flight-number") + " "
            + control.attr("data-start-point") + "("
            + control.attr("data-start-time") + " "
            + control.attr("data-start-date-sort") + ") "
            + control.attr("data-end-point") + "("
            + control.attr("data-end-time") + " "
            + control.attr("data-end-date-sort") + "). ";

        GetSmsString();
        $("#pnSendSmsBox").show();
    }
}

function ChooseDepartFlight(controlName, flightId) {
    if ($("#hdfItineraryType").val() == "1") {
        return true;
    }
    else {
        SelectDepartFlight(controlName, flightId);
        ScrollToReturnFlight();
        return false;
    }
}

function ScrollToContinueButton(controlId) {
    control = document.getElementById(controlId);
    var targetOffset = $(control).offset().top;
    jQuery('html,body').animate({ scrollTop: targetOffset - 500 }, 700);
}

function ScrollToReturnFlight() {
    control = document.getElementById("SearchParamDomesticReturn");
    var targetOffset = $(control).offset().top;
    jQuery('html,body').animate({ scrollTop: targetOffset - 80 }, 700);
}

function SetPrice(priceAdt, priceChd, priceInf) {
    var adt = Number($("#lblTotalAdt1").text());
    var chd = Number($("#lblTotalChd1").text());
    var inf = Number($("#lblTotalInf1").text());

    //Set price for each passenger type
    $("#lblPriceAdt").text(format("#.##0,####", priceAdt));
    $("#lblPriceChd").text(format("#.##0,####", priceChd));
    $("#lblPriceInf").text(format("#.##0,####", priceInf));

    //Set total price for each passenger type
    $("#lblTotalPriceAdt").text(format("#.##0,####", adt * priceAdt));
    $("#lblTotalPriceChd").text(format("#.##0,####", chd * priceChd));
    $("#lblTotalPriceInf").text(format("#.##0,####", inf * priceInf));

    //Grand total price
    var grandTotal = adt * priceAdt + chd * priceChd + inf * priceInf;
    $("#lblBasketGrandTotal").text(format("#.##0,####", grandTotal));

    strTotalPrice = "Tong gia: " + format("#.##0,####", grandTotal);
}

function CheckVisibleContinueButton() {
    if ($("#hdfItinerary").val() == "1") {
        var priceAdtDepart = Number($("#hdfFareAdtDepart").val());
        if (priceAdtDepart > 0) {
            $("#owl").show('blind');
            $("#pnBtnContinueBasket").show('blind');
        }
        else {
            $("#owl").hide('blind');
            $("#pnBtnContinueBasket").hide('blind');
        }
    }
    else {
        var priceAdtDepart = Number($("#hdfFareAdtDepart").val());
        var priceChdReturn = Number($("#hdfFareAdtReturn").val());
        if (priceAdtDepart > 0 && priceChdReturn > 0) {
            $("#owl").show('blind');
            $("#pnBtnContinueBasket").show('blind');
        }
        else {
            $("#owl").hide('blind');
            $("#pnBtnContinueBasket").hide('blind');
        }
    }
}

function GetSmsString() {
    var strMessage = strDepartSms + strReturnSms + strTotalPrice;
    $("#txtSmsContent").val(strMessage);
    $("#lblCharacterCount").text(strMessage.length.toString());
}