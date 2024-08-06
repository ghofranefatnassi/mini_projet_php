<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contacts;
class ContactsController extends Controller
{
    public function submitForm(Request $req)
    {
            $cont = new Contacts();
            $cont->name = $req->input('name');
            $cont->email = $req->input('email');
            $cont->phone = $req->input('phone');
            $cont->subject = $req->input('subject');
            $cont->message = $req->input('message');
            $cont->category = $req->input('category');
            $cont->save();
        return $cont;
    }
    public function getContacts()
    {
        return Contacts::all();
    }
}
