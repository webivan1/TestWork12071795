<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        /** @var \App\Models\User $author */
        $author = \App\Models\User::factory()->createOne([
            'name' => 'John Test',
            'email' => 'admin@admin.com'
        ]);

        \App\Models\Post::factory(50)->create([
            'author_id' => $author->id
        ]);
    }
}
