<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class Task extends Model
{
    protected static function booted()
    {
        static::creating(function ($task) {
            $task->id = (string) Str::uuid();
            $task->user_id = Auth::id();
        });
    }

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'title',
        'description',
        'user_id',
    ];
}
