# Currency_Converter
HR tool for quickly viewing an employee's salary discrepancy between current and new home working country.

# APIs in Use:

<strong>https://restcountries.eu/</strong> is used to grab currency code and symbol information. This API is also called on pageload. The pageload ajax call is what populates the array of country names which backs up the suggestion <option's'> for text input fields. 

<strong>https://free.currencyconverterapi.com/</strong> gives our conversion values. You can check out the code for how this is implemented, if you're interested. However, if you plan to use any of this information, please get your own API key. 


