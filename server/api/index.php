<?php
use router\Router;
use RedBeanPHP\R;

include __DIR__ . '/../vendor/autoload.php';

// setup database
R::setup( 'sqlite:./db/dbfile.db' );

$router = new Router();

/**
 * Fetch all posts from the server
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
 * Fetch a single post from the server
 */
->route('post', '/posts/:id', function($id) {
    $post = R::load( 'post', $id );
    return json_encode($post->export());
});


header('Content-Type: application/json');
echo $router->match($_SERVER['REQUEST_URI']);
