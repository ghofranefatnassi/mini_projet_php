<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
class AdminConroller extends Controller
{
    function Signup (Request $req)
    {
        $user = new User;
        $user->name = $req->input('name');
        $user->email = $req->input('email');
        $user->role= $req->input('role');
        $user->password =Hash::make ($req->input('password'));
        $user->save();
        
        return $user;
    }
    public function updateUser(Request $request, $Id)
    {
        try {
            $user = User::find($Id);
            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }
            $user->name = $request->input('name');
            $user->email = $request->input('email');
            $user->role = $request->input('role');
            $user->save();
            return response()->json(['message' => 'user updated successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update user: ' . $e->getMessage()], 500);
        }
    }
    function Login (Request $req)
    {
        $user = User::where('email',$req->email)->first();
        if (!$user || !Hash::check($req->password,$user->password))
        {
            return ["error"=>"Email or password is not matched"];
        }
        return $user;
    }
    function getAllUsers()
    {
        return User::all();
    }
     function getUserCount()
    {
        $userCount = User::count();
        return response()->json(['userCount' => $userCount]);
    }

    public function deleteUser($Id)
    {
        try {
            $user = User::find($Id);
    
            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }
            $user->delete();
    
            return response()->json(['message' => 'User deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete user: ' . $e->getMessage()], 500);
        }
    }
    public function updateUserSettings(Request $request, $Id)
{
    try {
        $user = User::find($Id);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->role = $request->input('role');
        
        // Check if password is provided and update if necessary
        if ($request->filled('password')) {
            $user->password = Hash::make($request->input('password'));
        }

        $user->save();

        return response()->json(['message' => 'User settings updated successfully'], 200);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Failed to update user settings: ' . $e->getMessage()], 500);
    }
}
   
}
