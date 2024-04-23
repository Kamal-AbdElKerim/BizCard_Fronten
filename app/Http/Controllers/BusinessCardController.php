<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Favorite;
use App\Models\BusinessCard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;


class BusinessCardController extends Controller
{

    public function getAllBusinessCards()
    {
        $user = Auth::user();
        
        // Fetch all business cards
        $businessCards = BusinessCard::latest()->get();
        
        // Fetch favorited business cards for the current user
        $favoritedBusinessCardIds = $user->favorites->pluck('business_card_id')->toArray();
        
        // Add favorited status to each business card
        foreach ($businessCards as $businessCard) {
            $businessCard->favorited = in_array($businessCard->id, $favoritedBusinessCardIds);
        }
        
        return response()->json(['business_cards' => $businessCards]);
    }
    
    


    public function createBusinessCard(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'company' => 'required|string',
            'title' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = Auth::user();

        $businessCard = new BusinessCard([
            'name' => $request->name,
            'company' => $request->company,
            'title' => $request->title,
            'user_id' => $user->id,
        ]);
        $businessCard->save();


        return response()->json(['message' => 'Business card created successfully', 'card' => $businessCard]);
    }



    public function updateBusinessCard(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'string',
            'company' => 'string',
            'title' => 'string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = Auth::user();

        $businessCard = BusinessCard::find($id);

        if (!$businessCard) {
            return response()->json(['message' => 'Business card not found'], 404);
        }

        if ($user->id !== $businessCard->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // police service

        // if ($request->user()->cannot('create', BusinessCard::class)) {
        //     return response()->json(['message' => 'Unauthorized'], 403);
        // }

        $businessCard->update($request->all());

        return response()->json(['message' => 'Business card updated successfully', 'card' => $businessCard]);
    }





    public function deleteBusinessCard($id)
    {
        $user = Auth::user();

        $businessCard = businessCard::find($id);


        if (!$businessCard) {
            return response()->json(['message' => 'Business card not found'], 404);
        }


        // police service

        if ($user->id !== $businessCard->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }



        $businessCard->delete();

        return response()->json(['message' => 'Business card deleted successfully']);
    }


    public function Favoris($cardId)
    {
        $user = Auth::user();

        // Check if the user has already favorited the card
        $favoris = Favorite::where('user_id', $user->id)
            ->where('business_card_id', $cardId)
            ->first();

        if ($favoris) {
            // If the card is already favorited, remove it from favorites
            $favoris->delete();
            return response()->json([
                'message' => 'Card removed from favorites',
                'isFavorited' => 0
            ]);
        } else {
            // If the card is not favorited, add it to favorites
            Favorite::create([
                'user_id' => $user->id,
                'business_card_id' => $cardId
            ]);
            return response()->json([
                'message' => 'Card added to favorites',
                'isFavorited' => 1
            ]);
        }
    }

   
}
