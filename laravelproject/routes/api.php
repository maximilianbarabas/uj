<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('Products', [ProductController::class, 'index']);


Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::post('/Products', [ProductController::class, 'add']);
    Route::put('/Products/{id}', [ProductController::class, 'update']);
    Route::delete('/Products/{id}', [ProductController::class, 'destroy']);     
    Route::get('/Products/{id}', [ProductController::class, 'show']);
    Route::post('/users/{id}', [UserController::class, 'logout']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
});


Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

