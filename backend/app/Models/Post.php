<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Storage;

/**
 * @property int $id
 * @property string $title
 * @property string $preview_text
 * @property string $description
 * @property string|null $image
 * @property int $author_id
 * @property User $author
 */
class Post extends Model
{
    use HasFactory;

    /**
     * @var string[]
     */
    protected $fillable = [
        'author_id',
        'title',
        'preview_text',
        'description',
        'image'
    ];

    public function setDescriptionAttribute(string $value): void
    {
        $this->attributes['description'] = clean($value);
    }

    public function getImageAttribute(): ?string
    {
        if (!empty($this->attributes['image'])) {
            return env('APP_URL') . Storage::url($this->attributes['image']);
        }
        return null;
    }

    public static function getList(User $user, int $perPage, array $params): LengthAwarePaginator
    {
        /** @var Builder $query */
        $query = self::where('author_id', $user->id);

        $query->search($params);
        $query->sort($params, 'created_at', 'desc');

        return $query->paginate($perPage, [
            'id', 'title', 'created_at', 'updated_at'
        ], 'page', $params['page'] ?? 1);
    }

    public function scopeSearch(Builder $builder, array $params)
    {
        empty($params['id']) ?: $builder->where('id', (int) $params['id']);
        empty($params['title']) ?: $builder->where('title', 'like', '%' . $params['title'] . '%');
    }

    public function scopeSort(Builder $builder, array $params, string $defaultColumn, string $defaultDirection = 'asc')
    {
        !empty($params['sort']) ?: $params['sort'] = $defaultColumn;
        !empty($params['sort_direction']) ?: $params['sort_direction'] = $defaultDirection;

        $builder->orderBy($params['sort'], $params['sort_direction']);
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public static function createOwnPost(
        User $user,
        string $title,
        string $previewText,
        string $desc,
        ?string $image = null
    ): self
    {
        $model = new Post();
        $model->author()->associate($user);
        $model->title = strip_tags($title);
        $model->preview_text = strip_tags($previewText);
        $model->description = $desc;
        !$image ?: $model->image = $image;

        if (!$model->save()) {
            throw new \DomainException('Error create a new post');
        }

        return $model;
    }

    public function updateOwnPost(string $title, string $previewText, string $desc, ?string $image = null): void
    {
        $this->title = strip_tags($title);
        $this->preview_text = strip_tags($previewText);
        $this->description = $desc;
        !$image ?: $this->image = $image;

        if (!$this->save()) {
            throw new \DomainException('Error update the post');
        }
    }
}
