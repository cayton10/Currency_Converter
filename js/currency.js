$(document).ready(function(){

    /* -------------------- populate country suggestion array ------------------- */
    var nameArray = [];
    /* ---------------------------- country variables --------------------------- */
    var homeCountry;
    var newCountry;
    /* ------------------------------ currency info ----------------------------- */
    var salary;
    var homeCode;
    var newCode;
    var homeSymbol;
    var newSymbol;

    /* ------------------- restCountries API for ALL countries ------------------ */
              //Filter results for only what is needed for this application//
    const countryAPI = 'https://restcountries.eu/rest/v2/all?fields=name;currencies;capital'
   
    /* ------------------- Load country names for autosuggest ------------------- */
    $.getJSON(countryAPI, function(data){
        //Loop through country API JSON structure
        $.each(data, function (key, entry) {
            //There are some empty capital values for locales such as Antarctica
            if (entry.capital !== ''){
                nameArray.push(entry.name);
            }   //Populate suggestion array                                
        });
    });
    /* -------------------------------------------------------------------------- */
    /*                       AUTOCOMPLETE TEXT BOX FUNCTIONS                      */
    /* -------------------------------------------------------------------------- */
    /* -------------------------------------------------------------------------- */
    /*                    fix autocomplete suggestion box width                   */
    /* ------------------------------ pulled from: ------------------------------ */
    /*https://info.michael-simons.eu/2013/05/02/how-to-fix-jquery-uis-autocomplete-width/*/
    /* -------------------------------------------------------------------------- */
    $.extend($.ui.autocomplete.prototype.options, {
        open: function(event, ui) {
            $(this).autocomplete("widget").css({
                "width": ($(this).width() + "px")
            });
        }
    });


    $('#country').autocomplete({
        minLength: 2,
        source: nameArray,
        select: function() //Upon selection of country () =>
        {   
            $('#country').keyup(function (e) { 
                $('#country').attr("autocomplete = on");
            });
            console.log($('#country').val()); //Print name of country to console
            homeCountry = $('#country').val(); 
        }
    });

    $('#newCountry').autocomplete({
        minLength: 2,
        source: nameArray,
        select: function()
        {
            console.log($('#newCountry').val());
            newCountry = $('#newCountry').val();
        }
    });

    if($('input[autofill="off"]').val('')){
        $('input[autofill="off"]').disableAutofill();
    }
    


});