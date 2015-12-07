<?php
use router\Router;
use RedBeanPHP\R;
use http\HttpContext;

include __DIR__ . '/../vendor/autoload.php';
include 'Model_Post.php';

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
    $posts = R::find('post', ' isActive = 1 ORDER BY created DESC');
    /* @var $post RedBeanPHP\OODBBean */
    foreach($posts as $post) {
        $result[] = $post->export();
    }
    return json_encode($result);
})

/**
 * Fetch all drafts
 */
->route('drafts-list', '/posts/drafts', function() {
    $result = [];
    $drafts = R::find('post', ' isActive = 0 ORDER BY created DESC');
    /* @var $post RedBeanPHP\OODBBean */
    foreach($drafts as $draft) {
        $result[] = $draft->export();
    }
    return json_encode($result);
})

/**
 * Fetch a single post
 */
->route('post', '/posts/:id', function($id) {
    $post = R::load( 'post', $id );
    
    if ($post->id) {
        $next = R::load('post', $post->id + 1);
        if ($next) {
            $post->next = $next->id;
        }
        
        $previous = R::load('post', $post->id - 1);
        if ($previous) {
            $post->previous = $previous->id;
        }
    } else {
        header("HTTP/1.0 404 Not Found");
        return;
    }
    
    return json_encode($post->export());
})

/**
 * Add a single post
 */
->route('add-post', '/posts', function() {
    $post = R::dispense('post');
    
    $request = HttpContext::get()->getRequest();
    if ($request->hasPost('post')) {
        $post->title = $request->getPost('post', 'title');
        $post->summary = $request->getPost('post', 'summary');
        $post->isactive = $request->getPost('post', 'isactive');
        $post->content = $request->getPost('post', 'content');
        $post->controller = $request->getPost('post', 'controller');
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

    $request = HttpContext::get()->getRequest();
    if ($request->hasPost('post')) {
        $post->title = $request->getPost('post', 'title');
        $post->summary = $request->getPost('post', 'summary');
        $post->isactive = $request->getPost('post', 'isactive');
        $post->content = $request->getPost('post', 'content');
        $post->controller = $request->getPost('post', 'controller');
        R::store($post);
    }

    return json_encode($post->export());
}, 'PUT');


header('Content-Type: application/json');
echo $router->match($_SERVER['REQUEST_URI'], $_SERVER['REQUEST_METHOD']);
