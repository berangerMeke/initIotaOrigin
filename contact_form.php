<?php

$responseType = '';

function subject2_intl($language) {
    if($language == 'en'){
        return "IotaOrigin.de - Copy of your form submission";
    }
    if($language == 'de'){
        return "IotaOrigin.de - Kopie Ihrer Formularübermittlung";
    }
    if($language == 'fr'){
        return "IotaOrigin.de - Copie de votre soumission de formulaire";
    }
    if($language == 'sw'){
        return "IotaOrigin.de - Nakala ya uwasilishaji wa fomu yako";
    }
}

function message2_intl($language) {
    if($language == 'en'){
        return "Here is a copy of your message to IotaOrigin UG ";
    }
    if($language == 'de'){
        return "Hier ist eine Kopie Ihrer Nachricht an IotaOrigin UG ";
    }
    if($language == 'fr'){
        return "Voici une copie de votre message à IotaOrigin UG ";
    }
    if($language == 'sw'){
        return "Hapa kuna nakala ya ujumbe wako kwa IotaOrigin UG ";
    }
}


if (!empty($_POST)) {
    $form_data = json_encode($_POST, true);
    $data = json_decode($form_data);

    $lang = $data->lang;
    $name = strip_tags($data->name);
    $email = $data->email;
    $subject = strip_tags($data->subject);
    $message = strip_tags($data->message);


    $to = "hello@iotaorigin.de"; // this is your Email address: hello@iotaorigin.de
    $from = $email; // this is the sender's Email address
    $name = $name;
    $subject = "IotaOrigin.de - " . $subject;
    $subject2 = subject2_intl($lang);
    $message = $name . " wrote the following:" . "\n\n" . $message;
    $message2 = message2_intl($lang) . $name . "\n\n" . $message;

    $headers = "From:" . $from;
    $headers2 = "From:" . $to;

    if( mail($to, $subject, $message, $headers) && mail($from, $subject2, $message2, $headers2) ) {
        $responseType = 'success';
    }
    else {
        $responseType = 'failed';
    }

    echo json_encode(['responseType' => $responseType, 'name' => strip_tags($name)]);


    // mail($to,$subject,$message,$headers);
    // mail($from,$subject2,$message2,$headers2); // sends a copy of the message to the sender
    // echo "Mail Sent. Thank you " . $first_name . ", we will contact you shortly.";
    // You can also use header('Location: thank_you.php'); to redirect to another page.
    // You cannot use header and echo together. It's one or the other.
}
else {
    header("Location: https://iotaoriginug2.kathiopa.com/v1.0/");
}



