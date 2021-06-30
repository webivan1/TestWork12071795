<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class PostFormRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::check();
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:150',
            'preview_text' => 'required|string|max:255',
            'description' => 'required|string',
//            'file' => [
//                'nullable',
//                'image',
//                'dimensions:min_width=100,min_height=100'
//            ]
        ];
    }
}
