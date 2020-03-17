$(document).ready(function(){

    /* -------------------- populate country suggestion array ------------------- */
    var nameArray = [];
    /* ---------------------------- country variables --------------------------- */
    var homeCountry;
    var newCountry;
    /* ------------------------------ currency info ----------------------------- */
    var salary;
    var conversion;
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


    $('#current').autocomplete({
        minLength: 2,
        source: nameArray,
        select: function() //Upon selection of country () =>
        {   
            console.log($('#current').val()); //Print name of country to console
            homeCountry = $('#current').val(); 
        }
    });

    $('#newThing').autocomplete({
        minLength: 2,
        source: nameArray,
        select: function()
        {
            console.log($('#newThing').val());
            newCountry = $('#newThing').val();
        }
    });

    /* -------------------------------------------------------------------------- */
    /*                           CONVERT BUTTON FUNCTION                          */
    /* -------------------------------------------------------------------------- */
    $('#convert').click(event, function(){
        //If any of the required fields are empty:
        if($('#newThing').val() == '' || $('#current').val() == '' || $('#salary').val() == '')
        {
            //Fix this with a dropdown div next
            alert('busted');
        }
        //Else, make ajax calls to countries API to populate currency info
        else 
        {
            $.ajax(
            {
                url: countryAPI,
                dataType: 'json',
                method: 'get',
                data: 'none',
                success: function(data)
                {
                    //iterate through countries API JSON data
                    $.each(data, function(key, entry)
                    {   
                        //Populate currency info for homeCountry symbol and code
                        if(homeCountry == entry.name)
                        {
                            homeCode = entry.currencies[0].code;
                            homeSymbol = entry.currencies[0].symbol;
                            console.log(homeCode);
                        }

                        if(newCountry == entry.name)
                        {
                            newCode = entry.currencies[0].code;
                            newSymbol = entry.currencies[0].symbol;
                            console.log(newCode);
                        }
                    });
                }
                //error handling for misspelled or other
                //error: function(){
                   // $('#error').show("drop", {direction: "down" }, 400);
                
            });

            /*$.ajax(
                {
                    url: 'https://free.currconv.com/api/v7/convert?q=' + homeCode + '_' + newCode + '&compact=ultra&apiKey=0efe8ba1797af83c25f7',
                    dataType: 'json',
                    method: 'put',
                    data: 'none',
                    success: function(data)
                    {
                        console.log(homeCode + " " + newCode);
                        $.each(data, function(key, entry)
                        {
                            $('#baseCurrency').val(homeSymbol + "1.00 = " + newSymbol + entry.toFixed(2));
                            conversion = entry;
                            console.log(conversion);
                        });
                    }
                });*/
        }
    });


});