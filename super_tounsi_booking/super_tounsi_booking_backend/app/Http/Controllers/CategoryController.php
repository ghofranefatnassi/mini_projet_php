<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
class CategoryController extends Controller
{
    function addCategory(Request $req) 
     {
        $cat = new Category();
        $cat->namecat = $req->input("namecat");
        $cat->save();
        return $cat;
    }
    function listcat() 
    {
        return Category::all();
    }
}
