<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminConroller;
use App\Http\Controllers\TechnicianController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\ContactsController;
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::post('Signup',[AdminConroller::class,'Signup']);
Route::post('Login',[AdminConroller::class,'Login']);
Route::post('addTech',[TechnicianController::class,'addTech']);
Route::get('listTech',[TechnicianController::class,'listTech']);
Route::post('addCategory',[CategoryController::class,'addCategory']);
Route::get('listcat',[CategoryController::class,'listcat']);
Route::get('getAllUsers',[AdminConroller::class,'getAllUsers']);
Route::delete('deleteTech/{id_tech}', [TechnicianController::class, 'deleteTech']);
Route::post('addOrder',[OrdersController::class,'addOrder']);
Route::get('getTechCat/{type}',[TechnicianController::class,'getTechCat']);
Route::get('getUserCount',[AdminConroller::class,'getUserCount']);
Route::get('getTechCount',[TechnicianController::class,'getTechCount']);
Route::get('getOrderCount',[OrdersController::class,'getOrderCount']);
Route::get('getOrdersOfTheDay',[OrdersController::class,'getOrdersOfTheDay']);
Route::get('getAllOrder',[OrdersController::class,'getAllOrder']);
Route::put('cancelOrder/{id_ord}', [OrdersController::class, 'cancelOrder']);
Route::delete('deleteUser/{Id}', [AdminConroller::class, 'deleteUser']);
Route::put('updateTech/{id_tech}', [TechnicianController::class, 'updateTech']);
Route::put('updateUser/{Id}', [AdminConroller::class, 'updateUser']);
Route::put('updateOrder/{id_ord}', [OrdersController::class, 'updateOrder']);
Route::put('updateUserSettings/{Id}', [AdminConroller::class, 'updateUserSettings']);
Route::post('submitForm', [ContactsController::class, 'submitForm']);
Route::get('getContacts', [ContactsController::class, 'getContacts']);