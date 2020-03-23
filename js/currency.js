/* -------------------------------------------------------------------------- */
/* Benjamin Cayton                                                            */
// 3.15.2020
// Program Description: Currency Converter is a tool built for HR professionals
// that move employees from one country to another. Individual state markets
// change constantly, so this tool keeps the HR professional from looking up
// up-to-date currency info, thus saving man hours. 
/* -------------------------------------------------------------------------- */

$(document).ready(function(){

    /* -------------------- populate country suggestion array ------------------- */
    var nameArray = [];
    /* ---------------------------- country variables --------------------------- */
    var homeCountry;
    var newCountry;
    /* ------------------------------ currency info ----------------------------- */
    var salary;
    var newSal;
    var conversion;
    var homeCode;
    var newCode;
    var homeSymbol;
    var newSymbol;

    $('[data-toggle="popover"]').popover();

    /* -------------------------------------------------------------------------- */
    /*                         fadeIn effects on page load                        */
    /* -------------------------------------------------------------------------- */

    //FadeIn effect for entire page
    $('body').hide(0).fadeIn(500);
    $('#title').hide(0).fadeIn(1250);

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

    /* ----------------------- add commas to salary input ----------------------- */

      
    //#current not the best id name, but had to beat Google's autofill in some way.
    $('#current').autocomplete({
        minLength: 2,
        source: nameArray,
        select: function() //Upon selection of country () =>
        {   
            console.log($('#current').val()); //Print name of country to console
            homeCountry = $('#current').val(); 
        }
    });
    //Enter / return keypress
    $('#current').keypress(function(event){
        //If enter button is pressed,
        if(event.keyCode === 13)
        {
            event.preventDefault();
            homeCountry = $('#current').val();
        }
    });
    //#newThing is even worse than current but.... circumvents Google's autofill
    $('#newThing').autocomplete({
        minLength: 2,
        source: nameArray,
        select: function()
        {
            console.log($('#newThing').val());
            newCountry = $('#newThing').val();
        }
    });

    //Enter / return keypress
    $('#newThing').keypress(function(event){
        //If enter button is pressed,
        if(event.keyCode === 13)
        {
            event.preventDefault();
            newCountry = $('#newThing').val();
        }
    });
    //If popover error exists, remove it after clicking in input field
    if($('input').next('popover:visible')){
         $('input').click(function()
            {
                $('input').popover('dispose');
                $('input').removeClass('invalid');
                $('#convert').removeAttr('disabled');
            })
        }

    //Button click presentation
    
    $('button').mousedown(function () {
        $(this).addClass('clicked', 100);
    });

    $('button').mouseup(function () { 
        $(this).removeClass('clicked', 100);
    });

    $('button').hover(function () {
        $(this).toggleClass('hover', 100);
    });

    /* -------------------------------------------------------------------------- */
    /*                           CONVERT BUTTON FUNCTION                          */
    /* -------------------------------------------------------------------------- */
    $('#convert').click(event, function(){
        //If any of the required fields are empty:
        if($('#newThing').val() == '' || $('#current').val() == '' || $('#salary').val() == '')
        {
            //Popover error handling for each <input> field
            if($('#current').val() == '')
            {   //Error handling mssg for current country input
                $('#current').popover(
                    {
                        title: 'Error',
                        content: 'Please enter a valid country.',
                        placement: 'bottom',
                        container: 'body',
                        animation: true
                    }
                ).popover('show');
                
                $('.popover').effect('bounce', {times:60}, 20000); 
                $('#current').addClass('invalid');
                $('#convert').attr('disabled', 'disabled');


            } else if($('#newThing').val() == '')
            {   //Error handling mssg for newCountry input
                $('#newThing').popover(
                    {
                        title: 'Error',
                        content: 'Please enter a valid country.',
                        placement: 'bottom'
                    }
                ).popover('show');
                $('.popover').effect('bounce', {times:60}, 20000);
                $('#newThing').addClass('invalid');
                $('#convert').attr('disabled', 'disabled');

            } else {
                
                $('#salary').popover(
                    {   //Error handling mssg for salary input
                        title: 'Error',
                        content: "Please enter an initial salary.",
                        placement: 'bottom'
                    }
                ).popover('show');
                $('.popover').effect('bounce', {times:60}, 20000)
                $('#salary').addClass('invalid');
                $('#convert').attr('disabled', 'disabled');
            }  
        }
        //Else, make ajax calls to countries API to populate currency info
        else 
        {   //Remove commas from salary input field
            salary = $('#salary').val().replace(/\,/g, '');
            //Parse salary string, convert to int
            salary = parseInt(salary);
            //Test value in console
            console.log(salary);
            homeCountry = $('#current').val();
            newCountry = $('#newThing').val();
            //Use .when.done operators to complete first ajax call / return required codes
            $.when(
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
                                if(homeSymbol == undefined)
                                {
                                    homeSymbol = homeCode;
                                }
                                console.log(homeCode);
                            }

                            if(newCountry == entry.name)
                            {
                                newCode = entry.currencies[0].code;
                                newSymbol = entry.currencies[0].symbol;
                                if(newSymbol == undefined)
                                {
                                    newSymbol = homeCode;
                                }
                                console.log(newCode);
                            }
                        });
                    }  
                })
                //.DONE perform empty () => containing second ajax call. 
                // Second call depends on first to construct appropriate url for conversion
            ).done(function(){
                $.ajax(
                    {
                        url: 'https://free.currconv.com/api/v7/convert?q=' + homeCode + '_' + newCode + '&compact=ultra&apiKey=0efe8ba1797af83c25f7',
                        dataType: 'json',
                        method: 'get',
                        data: 'none',
                        success: function(data)
                        {
                            //iterate free.currconv.com/api
                            $.each(data, function(key, entry)
                            {   //Base conversion output. Show appropriate currency symbols, etc.
                                $('#baseCurrency').val(homeSymbol + " 1.00 = " + newSymbol + ' ' + entry.toFixed(2));
                                conversion = entry;
                                newSal = conversion * salary;
                                $('#newSal').val(newSymbol + ' ' + newSal.toLocaleString('en-US', 
                                {
                                    'minimumFractionDigits':2,
                                    'maximumFractionDigits':2
                                }));
                            });
                            //Add home country name to salary information for clarity
                            $('#homeLocation').text(homeCountry);
                            //Add new country name to salaary information for clarity
                            $('#newLocation').text(newCountry);
                        },
                        //alert error(will change when polishing this turd)
                        error: function(){
                           alert('busted');
                        }
                    });
            });
        }
    });


    //Footer dynamic year update
    document.getElementById('copyrightYear').innerHTML = new Date().getFullYear();
});