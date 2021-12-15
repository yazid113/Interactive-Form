//Variable creation for each of the selected areas of the form
const $form = $('form')
const $nameField = $('#name')
const $emailField = $('#email')
const $jobRole = $('#title')
const $otherRole = $('#other-job-role').hide()
const $shirtDesign = $('#design')
const $colorChildren = $('#color').children()
const $regisActivities = $('#activities')
const $costActivities = $('#activities-cost')
const $payFormat = $('#payment')
const $payPal = $('#paypal').hide()
const $bitCoin = $('#bitcoin').hide()
const $creditCard = $('#credit-card')
const $cardNumber = $('#cc-num')
const $zipCode = $("#zip")
const $cvv = $('#cvv')
const checkbox = document.querySelectorAll('input[type="checkbox"]')
//Initalizatiom variables
let total = 0;
//The color form is disbled until the design is selected
$colorChildren.prop('disabled', true)
//Onload display credit card option
$payFormat.children().eq(1).attr('selected','selected')
//onload mouse is at the name field
$nameField.focus();

// Event listener to display the other role  box
$($jobRole).change(function(e) {
    if (e.target.value === 'other') {
        $otherRole.show()
    }
    else{
        $otherRole.hide()
    }
  });

//Event listener for color selection of T-shirt display
$($shirtDesign).change(function(e) {
    $colorChildren.prop('disabled', false)
    for (let i = 0; i < $colorChildren.length; i++) {
       const $dataTheme = $colorChildren.eq(i).attr('data-theme')
     if (e.target.value === $dataTheme) {
        $colorChildren.eq(i).show()
        $colorChildren.eq(i).attr('selected','selected')
    }
    else {
         $colorChildren.eq(i).hide()
         $colorChildren.eq(i).removeAttr('selected','selected')
     }  
    }
  });

//Event listener for the activities selection process verification and the
//total sum of the cost of each
$($regisActivities).change(function (e) {
    
    const dataCost = parseInt(e.target.getAttribute('data-cost'))
        if(e.target.checked){
            total = total + dataCost
            $costActivities.html(`Total: $${total}`)
            return total
           
        }
        else{
            total = total-dataCost;
            $costActivities.html(`Total: $${total}`)
            return total
        }
       
    
});
//Event listener for the the payment selection method
//Hides and show on the site depending on the users selection
$($payFormat).change(function(e) {
    if (e.target.value === 'bitcoin') {
        $bitCoin.show()
        $payPal.hide()
        $creditCard.hide()
    }
    else if(e.target.value === 'paypal'){
        $payPal.show()
        $bitCoin.hide()
        $creditCard.hide()
    }
    else{
        $payPal.hide()
        $bitCoin.hide()
        $creditCard.show()
    }
  });

//Validatio of each obligatory field need to submit the form
//Error or valid disply on the field depeding on each verification
$($form).submit(function (e) {
    const $nameValue = $nameField.val()
    const regexName = /^(?!\s*$)[-a-zA-Z0-9_:,.' ']{1,100}$/i
    const $emailValue = $emailField.val()
    const regexEmail = /^[^@]+@[^@.]+\.[a-z]+$/i
    const $cardValue = $cardNumber.val()
    const regexCardNumb = /^[0-9]{13,16}$/
    const regexZipCode = /^[0-9]{5}$/
    const regexCvv = /^[0-9]{3}$/
    if (!regexName.test($nameValue)) {
        $nameField.parent().addClass('not-valid')
        $nameField.parent().removeClass('valid')
        console.log($nameField.parent())
        e.preventDefault();
    }
    else{
        $nameField.parent().removeClass('not-valid')
        $nameField.parent().addClass('valid')
    }
    if (!regexEmail.test($emailValue)) {
        $emailField.parent().addClass('not-valid')
        $emailField.parent().removeClass('valid')
        e.preventDefault();
    }
    else{
        $emailField.parent().removeClass('not-valid')
        $emailField.parent().addClass('valid')
    }
    if(total === 0){
        $regisActivities.addClass('not-valid')
        $regisActivities.removeClass('valid')
        e.preventDefault()
    }
    else{
        $regisActivities.removeClass('not-valid')
        $regisActivities.addClass('valid')
    }
    if ($payFormat.val() === 'credit-card') {
            if (!regexCardNumb.test($cardValue)) {
                $cardNumber.parent().addClass('not-valid')
                $cardNumber.parent().removeClass('valid')
                e.preventDefault()
            }
            else{
                $cardNumber.parent().removeClass('not-valid')
                $cardNumber.parent().addClass('valid') 
            }
            if (!regexZipCode.test($zipCode.val())) {
                $zipCode.parent().addClass('not-valid')
                $zipCode.parent().removeClass('valid')
                e.preventDefault()
            }
            else{
                $zipCode.parent().removeClass('not-valid')
                $zipCode.parent().addClass('valid') 
            }
            if (!regexCvv.test($cvv.val())) {
                $cvv.parent().addClass('not-valid')
                $cvv.parent().removeClass('valid')
                e.preventDefault()
            }
            else{
                $cvv.parent().removeClass('not-valid')
                $cvv.parent().addClass('valid') 
            }
    }
});
//Accessibilty-focus or blur the activities section on selection
for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].addEventListener('focus',function(){
        checkbox[i].parentNode.classList.add('focus')
    })
    checkbox[i].addEventListener('blur',function(){
        checkbox[i].parentNode.classList.remove('focus')
    })
}