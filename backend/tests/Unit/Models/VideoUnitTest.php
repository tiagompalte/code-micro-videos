<?php

namespace Tests\Unit\Models;

use App\Models\Video;
use Illuminate\Database\Eloquent\SoftDeletes;
use Tests\TestCase;

class VideoUnitTest extends TestCase
{
    private $video;

    protected function setUp(): void
    {
        parent::setUp();
        $this->video = new Video();
    }
    public function testFillable()
    {
        $fillable = [
            'title',
            'description',
            'year_launched',
            'opened',
            'rating',
            'duration',
            'video_file',
            'thumb_file',
            'banner_file',
            'trailer_file'
        ];
        $this->assertEquals($fillable, $this->video->getFillable());
    }

    public function testTraits()
    {
        $trait = [
            SoftDeletes::class,
            \App\Models\Traits\Uuid::class,
            \App\Models\Traits\UploadFiles::class
        ];

        $genreTraits = array_keys(class_uses(Video::class));
        $this->assertEquals($trait, $genreTraits);
    }

    public function testCastsAttribute()
    {
        $cats = [
            'id' => 'string',
            'opened' => 'boolean',
            'year_launched' => 'integer',
            'duration'  => 'integer',
        ];

        $this->assertEquals($cats, $this->video->getCasts());
    }

    public function testDatesAttibuilte()
    {
        $fieldDate = [
            'created_at',
            'updated_at',
            'deleted_at'
        ];

        foreach ($fieldDate as $field){
            $this->assertContains($field, $this->video->getDates());
        }

        $this->assertCount(count($fieldDate), $this->video->getDates() );
    }

    public function testIncrementingAttribute()
    {
        $this->assertFalse($this->video->incrementing);
    }
}
