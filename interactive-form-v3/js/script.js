const $nameField = $('#name')
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
let total = 0;
$colorChildren.prop('disabled', true)
$payFormat.children().eq(1).attr('selected','selected')

// Focus input 'Name' on load
$(function() {
    $($nameField).focus();
  });

// Event listener to display the other role  box
$($jobRole).change(function(e) {
    if (e.target.value === 'other') {
        $otherRole.show()
        console.log(e.target.value)
    }
    else{
        $otherRole.hide()
    }
  });

//Event listener for color selection of T-shirt display
$($shirtDesign).change(function(e) {
    $colorChildren.prop('disabled', false)
    for (let i = 0; i < $colorChildren.length; i++) {

     if (e.target.value === 'js puns' && i > 3) {
        $colorChildren.eq(i).hide()
        console.log(e.target.value)
    }
    else if(e.target.value === 'heart js' && i > 0 && i <= 3){
        $colorChildren.eq(i).hide()
        console.log(e.target.value)
    }  
     else if (i === 0){
         for (let i = 1; i < $colorChildren.length; i++) {
            $colorChildren.eq(i).show()
             }
        
        }   
    }
    
  });

// Activities selected function
$($regisActivities).change(function (e) {
    
    const dataCost = parseInt(e.target.getAttribute('data-cost'))
   // console.log(e.target)
        if(e.target.checked){
            total = total + dataCost
            $costActivities.html(`Total: $${total}`)
            return $costActivities
           
        }
        else{
            total = total-dataCost;
            $costActivities.html(`Total: $${total}`)
            return $costActivities
        }
       
    
});
// Payment information function
$($payFormat).change(function(e) {
   console.log(e.target.value)
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
