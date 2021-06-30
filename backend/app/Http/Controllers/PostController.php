<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Requests\PostFormRequest;
use App\Http\Requests\PostSearchRequest;

class PostController extends Controller
{
    public function index(PostSearchRequest $request)
    {
        return Post::getList($request->user(), 5, $request->all());
    }

    public function store(PostFormRequest $request)
    {
        try {
            return [
                'status' => 'success',
                'post' => Post::createOwnPost(
                    $request->user(),
                    $request->input('title'),
                    $request->input('preview_text'),
                    $request->input('description')
                )
            ];
        } catch (\DomainException $e) {
            return [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
    }

    public function show(Request $request, Post $post)
    {
        if ($request->user()->cannot('show', $post)) {
            abort(403, 'Access denied');
        }

        return $post;
    }

    public function update(PostFormRequest $request, Post $post)
    {
        if ($request->user()->cannot('update', $post)) {
            abort(403, 'Access denied');
        }

        try {
            $post->updateOwnPost(
                $request->input('title'),
                $request->input('preview_text'),
                $request->input('description')
            );

            return [
                'status' => 'success',
                'post' => $post
            ];
        } catch (\DomainException $e) {
            return [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
    }

    public function destroy(Request $request, Post $post)
    {
        if ($request->user()->cannot('delete', $post)) {
            abort(403, 'Access denied');
        }

        return [
            'status' => $post->delete() ? 'success' : 'error'
        ];
    }
}
