<?php

namespace Tests\Unit;

use App\Models\User;
use PHPUnit\Framework\TestCase;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Testing\RefreshDatabase;

class BusinessCardTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic unit test example.
     */
    public function test_create_business_card()
    {
        // Créer un utilisateur pour lequel nous allons créer une carte de visite
        $user = User::factory()->create();
    
        // Créer les données de la carte de visite en utilisant l'ID de l'utilisateur créé
        $cardData = [
            'name' => 'John Doe',
            'company' => 'Example Inc.',
            'title' => 'CEO',
            'user_id' => $user->id,
        ];
    
        // Envoyer une requête POST pour créer une nouvelle carte de visite
        $response = $this->postJson('/api/createBusinessCard', $cardData);
    
        // Vérifier que la création de la carte de visite a réussi (code de statut 201)
        $response->assertStatus(201);
    
        // Vérifier que la carte de visite a été correctement ajoutée à la base de données
        $this->assertTrue(
            DB::table('business_cards')->where($cardData)->exists(),
            'La carte de visite n\'a pas été ajoutée à la base de données.'
        );
    }
}
