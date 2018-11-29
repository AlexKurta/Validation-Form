//форма
var formElements = document.forms.forma; 
// вывод ошибок
function createErrorText(input, text) {    
    $(input).css('border-color', 'red');
    $('<span></span>').insertAfter($(input)); 
    $(input).next().text(text).css('color', 'red').addClass('error');
}
//проверяем поле на пустоту
function isEmpty(input) {
    if (!input.value) {
        switch (input.name) {
            case 'sitename':
            case 'siteurl':
            case 'visitors':
            case 'email':
            case 'description':                       
                createErrorText(input, ' * Поле должно быть заполнено');                                                        
                break;                        
        }        
    } else return;
} 
//проверяем введено ли число
function isNumber(input) {
    if (input.name == 'visitors' && input.value) {
        if (input.value <= 0 || isNaN(input.value)) {            
            createErrorText(input, ' * В этом поле должно быть число');                                 
        } else return;
    } else return;
}

// проверяем радио
function radioCheck() {                 
    var check = [];                                                  
    for (let i = 0; i < formElements.payment.length; i++) {                    
        if (formElements.payment[i].checked) {
            check.push(1);
        }
    }   
    if (check.length == 0) {       
        createErrorText($('.radio').filter(':last'), ' * Нужно выбрать');
        $('.radio').filter(':last').css({'color': 'initial', 'border-color': 'initial'});                                    
    } else return;               
}
//проверяем поле e-mail
function isEmail(input) {
    if (input.name == 'email' && input.value) {
        const regExpEmail = /^.+@.+\.[a-z]{2,5}$/i;
        if (!regExpEmail.test(input.value)) {
            createErrorText(input, ' * email введен не верно');             
        } else return;
    } else return;
}
//проверяем урл
function isURL(input) {
    if (input.name == 'siteurl' && input.value) {  
        //урл целиком     
        const regExpURL = /^http(s)?:\/\/(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
        //урл для проверки IP
        const domainName = input.value.match(/(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}/g); 
        if (!regExpURL.test(input.value)) {
            createErrorText(input, ' * URL сайта введен не верно');                               
        } else {
            return new Promise( (resolve,reject) => {
                $.ajax("https://fe.it-academy.by/TestAjax3.php",
                    {
                        type: 'GET',
                        cache : false, 
                        dataType :'text',
                        context: this,                                    
                        data : {func:'GET_DOMAIN_IP', domain: domainName[0]},                                            
                        success: resolve,
                        error: reject
                    }
                );                
            })
            .then( response => {
                if (response == ''|| response == '104.239.213.7') {
                    console.log(response);                                           
                    createErrorText(input, ' * такого сайта не существует');                    
                } else {
                    console.log(response);                    
                }
            })
            .catch( error => {
                console.log("случилась ошибка: "+error);
            })
        } 
    }  else return false;                
}

//удаляем все ошибки
function removeValidation() {
    var errors = $('.error');    
        errors.prev().css('border-color','initial');                  
        errors.remove();                  
}
//отправка формы
forma.addEventListener('submit', function(event) {
    event.preventDefault();
    removeValidation();
    
    for (let i = 0; i < formElements.length; i++) {
        isEmpty(formElements[i]);
        isNumber(formElements[i]);
        isEmail(formElements[i]);
        isURL(formElements[i]);                
    } 
    radioCheck();
    let allErrors = $('.error');
    if (allErrors.length > 0) {       
        allErrors.eq(0).prev().focus();
        return;
    } else forma.submit();       
    
});
// потеря фокуса поля
forma.addEventListener('focusout', function(event) {                 
    var target = event.target;                
    errors = target.nextSibling;                             
    if (errors.tagName == 'SPAN') {
        errors.remove();
        target.style.borderColor = 'initial';        
    }                              
    isEmpty(target);
    isNumber(target); 
    isEmail(target);
    isURL(target);

    var a = formElements.payment[formElements.payment.length - 1].nextElementSibling;
    if (a.nextElementSibling.tagName == 'SPAN') {                    
        for (let i = 0; i < formElements.payment.length; i++) {                    
            if (formElements.payment[i].checked) {
                a.nextElementSibling.remove();
            }
        } 
    }                              
});            
