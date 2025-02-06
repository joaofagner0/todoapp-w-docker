<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return "OK";
});

Route::prefix('/auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
    Route::get('/self', [AuthController::class, 'self'])->middleware('auth:sanctum');
});

Route::prefix('/tasks')
    ->middleware('auth:sanctum')
    ->group(
        function () {
            Route::get('/', [TaskController::class, 'get']);
            Route::post('/', [TaskController::class, 'store']);
            Route::put('/{task}', [TaskController::class, 'update']);
            Route::delete('/{task}', [TaskController::class, 'destroy']);
        }
    );
