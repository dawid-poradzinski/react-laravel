<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Info;
use App\Http\Requests\StoreInfoRequest;
use App\Http\Requests\UpdateInfoRequest;
use App\Http\Resources\InfoResource;

class InfoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return InfoResource::collection(
            Info::query()->orderBy('amount', 'desc')->get()
        ) ;
    }

    public function sum()
    {
        $sum = Info::sum('amount');

        return response()->json(['sum' => $sum]);
    }

    /**
     * Store a newly created  resource in storage.
     */
    public function store(StoreInfoRequest $request)
    {
        $data = $request->validated();

        $string = "";
        for($i = 0; $i < 3; $i++) {
            $number = random_int(0,255);
            $string += $number.to_String();
            $data['color']->$string;
        }

        $info = Info::create($data);

        return response(new InfoResource($info), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Info $info)
    {
        return new InfoResource($info);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInfoRequest $request, Info $info)
    {
        $data = $request->validated();
        $info->update($data);

        return response(new InfoResponse($info), 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Info $info)
    {
        $info->delete();

        return response("", 204);
    }
}
