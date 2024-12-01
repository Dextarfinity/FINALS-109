<?php 
use Illuminate\Support\Facades\Route;

Route::get('/{any}', function () {
    return view('app'); // Ensure this returns your main app view
})->where('any', '.*'); // Catch-all route
