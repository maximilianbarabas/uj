<?php

namespace App\Http\Controllers;

use App\Models\product;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        return product::all();
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
        $p=new product();
        $p->name=$request->name;
        $p->category=$request->category;
        $p->brand=$request->brand;
        $p->description=$request->description;
        $p->price=$request->image;
        $p->save();
                // storage image
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
        $p=product::find($request->id);
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
            $products=product::where(function ($q) {
                $q->where('products.id', 'LIKE', '%'.session(key:'keys').'%')
                    ->orwhere('products.name', 'LIKE', '%'.session(key:'keys'). '%')
                    ->orwhere('products.price', 'LIKE', '%'.session(key:'keys'). '%')
                    ->orwhere('products.category', 'LIKE', '%'.session(key:'keys'). '%')
                    ->orwhere('products.brand', 'LIKE', '%'.session(key:'keys'). '%');
            })->select('products.*')->get();
            return response()->json(['products'=>$products]);

        }

}
