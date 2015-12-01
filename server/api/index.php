<?php
use router\Router;
use RedBeanPHP\R;

include __DIR__ . '/../vendor/autoload.php';

// setup database
R::setup( 'sqlite:./db/dbfile.db' );
date_default_timezone_set("UTC");
ini_set('date.timezone', 'UTC');

$router = new Router();


/**
 * Fetch all posts
 */
$router->route('posts-list', '/posts', function() {
    $result = [];
    $posts = R::find('post');
    /* @var $post RedBeanPHP\OODBBean */
    foreach($posts as $post) {
        $result[] = $post->export();
    }
    return json_encode($result);
})

/**
 * Fetch a single post
 */
->route('post', '/posts/:id', function($id) {
    $post = R::load( 'post', $id );
    return json_encode($post->export());
})

/**
 * Add a single post
 */
->route('add-post', '/posts', function() {
    $post = R::dispense('post');
    
    $data = json_decode(file_get_contents("php://input"), true);
    if ($data) {
        $post->title = $data['post']['title'];
        $post->summary = $data['post']['summary'];
        $post->content = $data['post']['content'];
        $post->controller = $data['post']['controller'];
        $post->created = R::isoDateTime(time());
        
        R::store($post);
    }
    
    return json_encode($post->export());
}, 'POST')
/**
 * Edit a single post
 */
->route('edit-post', '/posts/:id', function($id) {
    $post = R::load( 'post', $id );
    
    if ($post->id != $id) {
        return;
    }

    $data = json_decode(file_get_contents("php://input"), true);
    if ($data) {
        $post->title = $data['post']['title'];
        $post->summary = $data['post']['summary'];
        $post->content = $data['post']['content'];
        $post->controller = $data['post']['controller'];

        R::store($post);
    }

    return json_encode($post->export());
}, 'PUT');


header('Content-Type: application/json');
echo $router->match($_SERVER['REQUEST_URI'], $_SERVER['REQUEST_METHOD']);
