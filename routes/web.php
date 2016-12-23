<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Slug route
Route::get('/{slug?}', function($slug){
    return $slug;
});


// Dashboard
Route::group([
                'prefix' => 'profile',
                'middleware' => 'auth'
              ], function(){

    Route::get('/{slug?}', function($s){ return 'profile / '.  $s; });


    Route::get('/user', function () { return 'dashboard user'; });
    Route::get('/settings', function(){ return 'settings'; });
});

// Posts News, and the sort of
Route::
