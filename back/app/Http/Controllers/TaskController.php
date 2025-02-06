<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use App\Models\Task;
use App\Http\Requests\Task\StoreTaskRequest;
use App\Http\Requests\Task\UpdateTaskRequest;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function get(): JsonResponse
    {
        return response()->json([
            'data' => Auth::user()->tasks,
        ], Response::HTTP_OK);
    }
    public function store(StoreTaskRequest $request): JsonResponse
    {
        Task::create($request->only(['title', 'description']));

        return response()->json([
            'message' => 'Tarefa criada com sucesso.',
        ], Response::HTTP_OK);
    }

    public function update(Task $task, UpdateTaskRequest $request): JsonResponse
    {
        $task->update($request->only(['title', 'description']));

        return response()->json([
            'message' => 'Tarefa atualizada com sucesso.',
        ], Response::HTTP_OK);
    }

    public function destroy(Task $task): JsonResponse
    {
        $task->delete();

        return response()->json([
            'message' => 'Tarefa excluída com sucesso.',
        ], Response::HTTP_OK);
    }
}
