<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;
use Illuminate\Support\Facades\Validator;


require base_path('vendor/autoload.php');

class MailController extends Controller
{
    public function sendMail(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'templateId' => 'required',
            'subject' => 'required',
            'body' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $validatedData = $validator->validated();

        $mail = new PHPMailer(true);

        try {
            $mail->SMTPDebug = 0;
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = env('MAIL_USERNAME');
            $mail->Password = env('MAIL_PASSWORD');
            $mail->SMTPSecure = 'tls';
            $mail->Port = 587;

            $mail->setFrom(env('MAIL_FROM_ADDRESS'), 'EmailTemplate');
            $mail->addAddress($validatedData['email']);
            $mail->addAttachment(public_path('/report.pdf'));
            $mail->isHTML(true);
            $mail->Subject = $validatedData['subject'];
            $mail->Body = $validatedData['body'];
            $mail->send();


            return response()->json(['message' => 'Mail has been sent successfully!'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Mail could not be sent. Error: ' . $mail->ErrorInfo], 500);
        }
    }
}
