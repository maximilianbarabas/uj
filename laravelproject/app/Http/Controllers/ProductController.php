<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        return Product::all();
    }

    public function add(Request $request) 


    {
        $validator=Validator::make($request-all(),[
            'name'=>'required',
            'category'=>'required',
            'brand'=>'required',
            'description'=>'required',
            'image',
            'price'=>'required', 
        ]);
        if($validator->fails())
        {
            return response()->json(['error'=>$validator->errors()->all()], status: 409);
        }
        $p=new Product();
        $p->name=$request->name;
        $p->category=$request->category;
        $p->brand=$request->brand;
        $p->description=$request->description;
        $p->price=$request->image;
        $p->save();
                
                $url="http://localhost:8000/storage/";
                $file = $request->file( key: 'image');
                $extension = $file ->getClientOriginalExtension();
                $path = $request->file( key: 'image')->storeAs(path: 'proimages/', name: $p->id. '.'.$extension);
                $p->image=$path;
                $p->imgpath=$url.$path;
                $p->save();
    }

    public function update(Request $request)
    
    {
        $validator=Validator::make($request->all(), [
            'name'=>'required',
            'category'=>'required',
            'brand'=>'required',
            'description'=>'required',
            'image',
            'price'=>'required',
            'id'=>'required',
        ]);
        if($validator->fails())
        {
            return response()->json(['error'=>$validator->errors()->all()], status: 409);
        }
        $p=Product::find($request->id);
        $p->name=$request->name;
        $p->category=$request->category;
        $p->brand=$request->brand;
        $p->description=$request->description;
        $p->price=$request->price;
        $p->save();
            
            return response()->json(['message'=>"Product Successfully Updated"]);


    }
        public function destroy($id) 
        {

                return Product::destroy($id);

        }


        public function show(Request $request)
        {
            session(['keys'=>$request->keys]);
            $Products=Product::where(function ($q) {
                $q->where('Products.id', 'LIKE', '%'.session(key:'keys').'%')
                    ->orwhere('Products.name', 'LIKE', '%'.session(key:'keys'). '%')
                    ->orwhere('Products.price', 'LIKE', '%'.session(key:'keys'). '%')
                    ->orwhere('Products.category', 'LIKE', '%'.session(key:'keys'). '%')
                    ->orwhere('Products.brand', 'LIKE', '%'.session(key:'keys'). '%');
            })->select('Products.*')->get();
            return response()->json(['Products'=>$Products]);

        }

}
