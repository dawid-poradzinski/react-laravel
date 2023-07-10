<?php

namespace Tests\Feature;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;



class ExampleTest extends TestCase
{

    use DatabaseTransactions;

    public function test_sql_connection()
    {
        $response = $this->get('http://localhost:8000/api/info/get/all');

        $this->assertEquals(200, $response->status());

    }

    public function test_creating_new_canal()
    {
        $info =
        [
            "name"=>"Sally",
            "amount"=>100,
        ];

        $response = $this->put('http://localhost:8000/api/info/put', $info)->assertJson(['name' => 'Sally', 'amount' => 100]);

        $this->assertEquals(201, $response->status());
        

    }

    public function test_updating_color_name_and_amount_of_created_info()
    {

        $info =
        [
            "name"=>"Sally",
            "amount"=>100,
        ];

        $response = $this->put('http://localhost:8000/api/info/put', $info);
        
        $id = $response->json()['id'];

        $info =
        [
            "name"=>"Facebook",
            "amount"=>999,
            "color"=>"#0000ff",
        ];

        $response = $this->put('http://localhost:8000/api/info/update/'.$id, $info)->assertJson(['id'=>$id,'name'=>'Facebook','amount'=>999,'color'=>"#0000ff"]);
    } 

    public function test_not_allowing_bad_data()
    {
        $info =
        [
            "name"=>"Sally",
            "amount"=>100,
        ];

        $response = $this->put('http://localhost:8000/api/info/put', $info);
        
        $id = $response->json()['id'];

        $info =
        [
            "name"=>"",
            "amount"=>-1,
            "color"=>"#0dasd000ff",
        ];

        $this->assertEquals(302, $this->put('http://localhost:8000/api/info/update/'.$id, $info)->status());
    }
}
