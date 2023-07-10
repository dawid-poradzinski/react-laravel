<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\InfoController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::controller(InfoController::class)->group(function () {
    Route::get("/info/get/all", "index");
    Route::get("/info/sum", "sum");
    Route::delete("/info/delete/{info}", "destroy");
    Route::get("/info/get/single/{info}", "show");
    Route::put("/info/update/{info}", "update");
    Route::put("/info/put", "store");
});