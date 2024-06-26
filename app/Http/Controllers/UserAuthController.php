<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserAuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|min:8'
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()->all()
            ], 422); 
        }
    
        $registerUserData = $validator->validated();
    
        $user = User::create([
            'name' => $registerUserData['name'],
            'email' => $registerUserData['email'],
            'password' => Hash::make($registerUserData['password']),
        ]);
    
        return response()->json([
            'message' => 'User Created ',
            'user' => $registerUserData,
        ]);
    }
    
    public function login(Request $request)
    {
        $loginUserData = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|min:8'
        ]);
    
        $user = User::where('email', $loginUserData['email'])->first();
    
        if (!$user || !Hash::check($loginUserData['password'], $user->password)) {
            return response()->json([
                'errors' => ['Invalid Credentials']
            ], 401);
        }
    
        $token = $user->createToken($user->name . '-AuthToken')->plainTextToken;
    
        return response()->json([
            'access_token' => $token,
            'user' => $user,
        ]);
    }
    

    public function user(Request $request)
    {
       
        return $request->user();
    }
    public function logout()
    {
       
        $user = auth()->user();
       
        $user->tokens()->delete();

        return response()->json([
            "message" => "logged out"
        ]);
    }
}
