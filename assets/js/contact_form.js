$(".alert-dismissible .btn-close").on('click', function(e){
    $(this).parent().remove();
});

$("#contact-form").on('submit', function(e){
    e.preventDefault();

    let form_lang = $("#form-lang").attr("value");

    let success_msg_box = `
            <div class="alert alert-success alert-dismissible fade d-flex align-items-center" role="alert">
                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                <div class="notif-text">
                    A simple success alert—check it out!
                </div>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`;
    let failed_msg_box = `
            <div class="alert alert-danger alert-dismissible fade d-flex align-items-center" role="alert">
                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                <div class="notif-text">
                    A simple danger alert—check it out!
                </div>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`;

    let formErrorMessages_translated = function() {

        if(form_lang === "en"){
            return {
                name: "Please enter your name",
                email: "Please enter your email address",
                subject: "Please enter the message subject",
                message: "Please enter your message"
            }
        }
        if(form_lang === "de"){
            return {
                name: "Bitte geben Sie Ihren Namen ein",
                email: "Geben Sie bitte Ihre Email-Adresse ein",
                subject: "Bitte geben Sie den Betreff der Nachricht ein",
                message: "Bitte gib deine Nachricht ein"
            }
        }
        if(form_lang === "fr"){
            return {
                name: "S'il vous plaît entrez votre nom",
                email: "Veuillez saisir votre adresse e-mail",
                subject: "Veuillez saisir l'objet du message",
                message: "Veuillez entrer votre message"
            }
        }
        if(form_lang === "sw"){
            return {
                name: "Tafadhali weka jina lako",
                email: "Tafadhali weka barua pepe yako",
                subject: "Tafadhali ingiza mada ya ujumbe",
                message: "Tafadhali ingiza ujumbe wako"
            }
        }
    }();

    let thankYouMessage_Intl = function(name) {
        if(form_lang === "en"){
            return "Message sent. Thank you " + name + ", we will contact you shortly.";
        }
        if(form_lang === "de"){
            return "Nachricht gesendet. Danke " + name + ", Wir werden Sie in Kürze kontaktieren.";
        }
        if(form_lang === "fr"){
            return "Message envoyé. Merci " + name + ", nous vous contacterons sous peu.";
        }
        if(form_lang === "sw"){
            return "Ujumbe umetumwa. Asante " + name + ", tutawasiliana nawe hivi punde.";
        }
    }
    let failedMessage_Intl = function() {
        if(form_lang === "en"){
            return "Ooops! Something went wrong. Retry or come back later.";
        }
        if(form_lang === "de"){
            return "Ooops! Etwas ist schief gelaufen. Versuchen Sie es erneut oder kommen Sie später wieder.";
        }
        if(form_lang === "fr"){
            return "Ooops! Quelque chose s'est mal passé. Réessayez ou revenez plus tard.";
        }
        if(form_lang === "sw"){
            return "Ooops! Hitilafu fulani imetokea. Jaribu tena au urudi baadaye.";
        }
    }

    $(this).validate({
        rules: {
            name: {
                required: true,
                minlength: 3,
                normalizer: function(value) {
                    return $($.parseHTML(value)).text().trim();
                }
            },
            email: {
                required: true,
                email: true,
                normalizer: function(value) {
                    return $($.parseHTML(value)).text().trim();
                }
            },
            subject: {
                required: true,
                minlength: 3,
                normalizer: function(value) {
                    return $($.parseHTML(value)).text().trim();
                }
            },
            message: {
                required: true,
                minlength: 5,
                normalizer: function(value) {
                    return $($.parseHTML(value)).text().trim();
                }
            }
        },
        messages: formErrorMessages_translated,
        errorElement: "span",
        submitHandler: function(form) {
            let post_url = $(form).attr("action");
            let request_method = $(form).attr("method");
            let form_data1 = $(form).serializeJSON();
            // let form_data2 = JSON.stringify($(form).serializeArray());
            // let form_data2 = JSON.stringify($(form).serialize());
            // let form_data3 = $(form).serialize();

            /* console.log('Post URL: '+ post_url);
            console.log('Post method: '+ request_method); */
            /* console.log('Post data 1 : serializeJSON');
            console.log(form_data1); */
            /* console.log('Post data 2 : JSON.stringify & serializeArray');
            console.log(form_data2);
            console.log('Post data 3: '+ form_data3); */
            
            // Remove all Html tags. other method: .replace(/<(?:.|\n)*?>/gm, ''); 
            form_data1.name = form_data1.name.toString().replace(/(<([^>]+)>)/gi, "");
            form_data1.subject = form_data1.subject.toString().replace(/(<([^>]+)>)/gi, "");
            form_data1.message = form_data1.message.toString().replace(/(<([^>]+)>)/gi, "");
            
            // let personName = form_data1.name;

            $.ajax({
                url: post_url,
                dataType: 'json',
                type: request_method,
                // contentType: 'application/json;charset=UTF-8',
                data: form_data1,
                success: function( data, textStatus, jQxhr ){
                    $(form)[0].reset();
                    $('.form-submission-notification').append(success_msg_box);
                    if(data.responseType === 'success'){
                        $('.alert-success .notif-text').html( thankYouMessage_Intl(data.name) );
                        $('.alert-success').addClass('show');
                        console.log( data.response, textStatus, jQxhr );
                    }
                    if(data.responseType === 'failed'){
                        $('.form-submission-notification').append(failed_msg_box);
                        $('.alert-danger .notif-text').html( failedMessage_Intl() );
                        $('.alert-danger').addClass('show');
                        console.log( data.response, textStatus, jQxhr );
                    }
                },
                error: function( jqXhr, textStatus, errorThrown ){
                    $('.form-submission-notification').append(failed_msg_box);
                    $('.alert-danger .notif-text').html( errorThrown );
                    $('.alert-danger').addClass('show');
                    console.log( jqXhr, textStatus, errorThrown );
                }
            });
            
            /* .done(function(response) {
                $(form)[0].reset();
                $(".alert-success .notif-text").html(response);
                $(".alert-success").toggle("slow");
                console.log("Reponse serveur :"+ response);
            }); */

        }
    });
});
