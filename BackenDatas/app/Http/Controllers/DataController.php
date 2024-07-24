<?php

namespace App\Http\Controllers;

use App\Models\EmailData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DataController extends Controller
{
    public function listAllData()
    {

        $listdata = EmailData::all(['id', 'templateId', 'subject', 'body'])->toArray();
        ; // This should return a collection of Content objects
        return response()->json($listdata);

    }
    public function addEmail(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'templateId' => 'required|string',
            'subject' => 'required|string',
            'body' => 'required',
        ], [
            'templateId.required' => 'RPT ID is required',
            'subject.required' => 'Subject is Required',
            'body.required' => 'Body is Required'
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $email = new EmailData;
        $email->templateId = $request->templateId;
        $email->subject = $request->subject;
        $email->body = $request->body;
        $email->save();

        return response()->json(['message' => 'Content saved successfully'], 200);
    }

    public function getEmail($id)
    {
        $getEmail = EmailData::find($id);

        if (!$getEmail) {
            return response()->json(['error' => 'Template not found'], 404);
        }

        return response()->json($getEmail);
    }

    public function updateEmail(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'templateId' => 'required|string',
            'subject' => 'required|string',
            'body' => 'required',
        ], [
            'templateId.required' => 'RPT ID is required',
            'subject.required' => 'Subject is Required',
            'body.required' => 'Body is Required'
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $email = EmailData::find($id);
        $email->templateId = $request->templateId;
        $email->subject = $request->subject;
        $email->body = $request->body;
        $email->save();

        return response()->json(['message' => 'Email Update successfully'], 200);
    }

    public function deleteEmail($id)
    {

        $email = EmailData::find($id);
        $email->delete();
        return response()->json(['message' => 'Email Delete successfully'], 200);
    }
}
