<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOffersTable extends Migration
{
    const TABLE = 'offers';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create(self::TABLE, function (Blueprint $table) {
            $table->increments('id');

            $table->integer('ngo_id');

            $table->text('street')->nullable();
            $table->string('streetnumber', 500)->nullable();
            $table->string('streetnumberadditional')->nullable();
            $table->string('zip')->nullable();
            $table->string('city')->nullable();
            $table->float('latitude')->nullable();
            $table->float('longitude')->nullable();
            $table->integer('image_id')->nullable();

            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('website', 500)->nullable();

            $table->integer('age_from')->default(0)->nullable();
            $table->integer('age_to')->default(99)->nullable();

            $table->dateTime('valid_from')->nullable();
            $table->dateTime('valid_until')->nullable();

            $table->boolean('enabled')->default(false);

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop(self::TABLE);
    }
}
