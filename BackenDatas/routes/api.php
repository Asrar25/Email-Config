<?php

use App\Http\Controllers\DataController;
use App\Http\Controllers\MailController;
use App\Mail\SendMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/listdata', [DataController::class, 'listAllData']);
Route::post('/saveEmail', [DataController::class, 'addEmail']);

Route::get('/getEmail/{id}', [DataController::class, 'getEmail']);
Route::put('/updateEmail/{id}',[DataController::class,'updateEmail']);

Route::delete('/deleteEmail/{id}', [DataController::class, 'deleteEmail']);

Route::post('/sendmail',[MailController::class,'sendMail']);

