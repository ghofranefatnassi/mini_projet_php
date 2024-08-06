<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Technician;
use Carbon\Carbon;

class OrdersController extends Controller
{
    function addOrder(Request $req)
    {
        try {
            $order = new Order();
            $order->name_cli = $req->input('name_cli');
            $order->phone_cli = $req->input('phone_cli');
            $order->adress_cli = $req->input('adress_cli');
            $order->zone_cli = $req->input('zone_cli');
            $order->description = $req->input('description');
            $order->price = $req->input('price');
            $id_tech = $req->input('technician');
            $technician = Technician::find($id_tech);
            if (!$technician) {
                return response()->json(['error' => 'Technician not found'], 404);
            }
            $order->technician = $id_tech;
            $order->progress=$req->input("progress");
            $order->save();
            
            return response()->json(['message' => 'Order created successfully', 'order' => $order], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create order: ' . $e->getMessage()], 500);
        }
    }
    public function updateOrder(Request $request, $id_ord)
{
    try {
        
        $order = Order::find($id_ord);

        if (!$order) {
            return response()->json(['error' => 'order not found'], 404);
        }

        $order->name_cli = $request->input('name_cli');
            $order->phone_cli = $request->input('phone_cli');
            $order->adress_cli = $request->input('adress_cli');
            $order->zone_cli = $request->input('zone_cli');
            $order->description = $request->input('description');
            $order->price = $request->input('price');
            $id_tech = $request->input('technician');
            $technician = Technician::find($id_tech);
            if (!$technician) {
                return response()->json(['error' => 'Technician not found'], 404);
            }
            $order->technician = $id_tech;
            $order->progress=$request->input("progress");
            $order->save();

        return response()->json(['message' => 'Order updated successfully'], 200);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Failed to update order: ' . $e->getMessage()], 500);
    }
}


    public function getOrdersOfTheDay()
    {
        // Get the current date
        $currentDate = Carbon::now()->toDateString();

        // Fetch orders of the current day
        $ordersOfTheDay = Order::whereDate('Date', $currentDate)->get();

        return response()->json(['ordersOfTheDay' => $ordersOfTheDay]);
    }
    function getAllOrder ()
    {
         return Order::all();
    }
    
    function getOrderCount()
    {
        $orderCount = Order::count();
        return response()->json(['orderCount' => $orderCount]);
    }
    public function cancelOrder($id_ord)
    {
        try {
            // Find the order by ID
            $order = Order::find($id_ord);

            // If the order does not exist, return an error response
            if (!$order) {
                return response()->json(['error' => 'Order not found'], 404);
            }

            // Update the progress to "Annuler"
            $order->progress = "Cancel";
            $order->save();

            return response()->json(['message' => 'Order progress updated to "Cancel"', 'order' => $order], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update order progress: ' . $e->getMessage()], 500);
        }
    }
}
