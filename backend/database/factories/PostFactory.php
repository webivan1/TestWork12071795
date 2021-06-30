<?php

namespace Database\Factories;

use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class PostFactory extends Factory
{
    /**
     * @var string
     */
    protected $model = Post::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->text(150),
            'preview_text' => $this->faker->text(255),
            'description' => $this->faker->text(800),
            'image' => 'images/' . $this->faker->image('public/storage/images', 250, 250, null, false),
        ];
    }
}
