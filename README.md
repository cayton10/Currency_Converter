# Currency_Converter
HR tool for quickly viewing an employee's salary discrepancy between current and new home working country.

# APIs in Use:

<strong>https://restcountries.eu/</strong> is used to grab currency code and symbol information. This API is also called on pageload. The pageload ajax call is what populates the array of country names which backs up the suggestion <option's'> for text input fields. 

<strong>https://free.currencyconverterapi.com/</strong> gives our conversion values. You can check out the code for how this is implemented, if you're interested. However, if you plan to use any of this information, please get your own API key. 


# Styling

The logic for this thing only took a day to get working appropriately. The styling has taken some time, but I have learned quite a bit in the process. I've attempted to build the theme for this converter from the ground up using Bootstrap V.4.

## Error Handling

I attempted to animate bootstrap popovers for error handling. The native 'fadeIn()' animations seemed too vanilla for me and I wanted to create something that was inviting and visually pleasing. I wound up rigging the popovers with jQuery UI effects and simply setting the timer on {'bounce'} to 20 seconds. This is obviously a hack and not ideal, but it was the only way I could get the popovers to remain in place after the animation 'completes'. 

I'd appreciate any help on getting these animations to behave with appropriate and correct code. :)