<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Technician;

class TechnicianController extends Controller
{
    function addTech(Request $req)
    {
        $tech = new Technician();
        $tech->name = $req->input('name');
        $tech->phone = $req->input('phone');
        $tech->adress = $req->input('adress');
        $tech->zone = $req->input('zone');
        $tech->type=$req->input('type');
        $tech->price_15= $req->input('price_15');
        $tech->save();

        return $tech;
    }
    function listTech()
     {
        return Technician::all();
    }

    //delete technician
    public function deleteTech($id_tech)
{
    try {
        $technician = Technician::find($id_tech);

        if (!$technician) {
            return response()->json(['error' => 'Technician not found'], 404);
        }
        $technician->delete();

        return response()->json(['message' => 'Technician deleted successfully'], 200);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Failed to delete technician: ' . $e->getMessage()], 500);
    }
}

    function getTechCat($type)
    {
        return Technician::where('type', $type)->get();
    }

    function getTechCount()
    {
        $techCount = Technician::count();
        return response()->json(['techCount' => $techCount]);
    }

    public function updateOrder(Request $request, $id_ord)
    {
        try {
            // Find the order by its ID
            $order = Order::find($id_ord);
    
            // If the order doesn't exist, return a 404 error
            if (!$order) {
                return response()->json(['error' => 'Order not found'], 404);
            }
    
            // Update order details based on the request data
            $order->name_cli = $request->input('name_cli');
            $order->phone_cli = $request->input('phone_cli');
            $order->adress_cli = $request->input('adress_cli');
            $order->zone_cli = $request->input('zone_cli');
            $order->description = $request->input('description');
            $order->price = $request->input('price');
            $order->progress = $request->input('progress');
    
            // Check if the technician ID exists
            $id_tech = $request->input('technician');
            $technician = Technician::find($id_tech);
            if (!$technician) {
                return response()->json(['error' => 'Technician not found'], 404);
            }
    
            // Assign the technician to the order
            $order->technician = $id_tech;
    
            // Save the updated order
            $order->save();
    
            // Return a success message
            return response()->json(['message' => 'Order updated successfully'], 200);
        } catch (\Exception $e) {
            // Return a 500 error if an exception occurs
            return response()->json(['error' => 'Failed to update order: ' . $e->getMessage()], 500);
        }
    }

}
