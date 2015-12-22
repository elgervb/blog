<?php
use router\Router;
use RedBeanPHP\R;
use http\HttpContext;
use handler\Handlers;
use handler\json\JsonHandler;
use handler\http\HttpStatusHandler;
use handler\json\Json;
use handler\http\HttpStatus;
use http\HttpSession;
use auth\service\HttpAuth;
use auth\provider\HtpasswdProvider;

include __DIR__ . '/../vendor/autoload.php';
include 'Model_Post.php';

// setup database
R::setup('sqlite:../db/dbfile.db');
// all dates in UTC timezone
date_default_timezone_set("UTC");
ini_set('date.timezone', 'UTC');

$router = new Router();
$auth = new HttpAuth(new HtpasswdProvider('../db/.htpasswd'), 'Posts admin');
$handlers = Handlers::get();
$handlers->add(new JsonHandler());
$handlers->add(new HttpStatusHandler());


/**
 * Fetch all posts
 *
 * @return Json array with all posts
 */
$router->route('posts-list', '/posts', function ()
{
    $result = [];
    $posts = R::find('post', ' isActive = 1 ORDER BY created DESC');
    /* @var $post RedBeanPHP\OODBBean */
    foreach ($posts as $post) {
        $result[] = $post->export();
    }
    return new Json($result);
})
/**
 * Fetch all drafts
 *
 * @return Json array with all drafts
 */
->route('drafts-list', '/posts/drafts', function () use ($auth)
{
    $auth->authenticate();
    
    $result = [];
    $drafts = R::find('post', ' isActive != 1 ORDER BY created DESC');
    /* @var $post RedBeanPHP\OODBBean */
    foreach ($drafts as $draft) {
        $result[] = $draft->export();
    }
    return new Json($result);
})
/**
 * Fetch a single post
 *
 * @return Json post object | HttpStatus 404 when no posts found
 */
->route('post', '/posts/:id', function ($id)
{
    $post = R::load('post', $id);
    
    if ($post->id) {
        $next = R::findOne('post', ' id > ? AND isactive = 1 ORDER BY id ASC', [
            $post->id
        ]);
        if ($next) {
            $post->next = $next->id;
        }
        
        $previous = R::findOne('post', ' id < ? AND isactive = 1 ORDER BY id DESC', [
            $post->id
        ]);
        if ($previous) {
            $post->previous = $previous->id;
        }
    } else {
        // no post found... give a 404
        return new HttpStatus(HttpStatus::STATUS_404_NOT_FOUND);
    }
    
    return new Json($post->export());
})
/**
 * Add a single post
 * 
 * @return Json the newly added post | HttpStatus 204 no content when no data available on http post
 */
->route('add-post', '/posts', function () use ($auth)
{
    $auth->authenticate();
    
    $post = R::dispense('post');
    
    $request = HttpContext::get()->getRequest();
    if ($request->hasPost('post')) {
        $post->title = $request->getPost('post', 'title');
        $post->summary = $request->getPost('post', 'summary');
        $post->isactive = $request->getPost('post', 'isactive');
        $post->content = $request->getPost('post', 'content');
        $post->controller = $request->getPost('post', 'controller');
        $post->slug = $request->getPost('post', 'slug');
        $post->created = R::isoDateTime(time());
        
        R::store($post);
    } else {
        return new HttpStatus(HttpStatus::STATUS_204_NO_CONTENT);
    }
    
    return new Json($post->export());
}, 'POST')
/**
 * Edit a single post
 * 
 * @return Json post object | HttpStatus 
 */
->route('edit-post', '/posts/:id', function ($id) use ($auth)
{
    $auth->authenticate();
    
    $post = R::load('post', $id);
    
    if ($post->id != $id) {
        return new HttpStatus(HttpStatus::STATUS_204_NO_CONTENT);
    }
    
    $request = HttpContext::get()->getRequest();
    if ($request->hasPost('post')) {
        $post->title = $request->getPost('post', 'title');
        $post->summary = $request->getPost('post', 'summary');
        $post->isactive = $request->getPost('post', 'isactive');
        $post->content = $request->getPost('post', 'content');
        $post->controller = $request->getPost('post', 'controller');
        $post->slug = $request->getPost('post', 'slug');
        R::store($post);
    }
    
    return new Json($post->export());
}, 'PUT');

$result = $router->match($_SERVER['REQUEST_URI'], $_SERVER['REQUEST_METHOD']);

$handler = $handlers->getHandler($result);

if ($handler) {
    $handler->handle($result);
} else {
    $error = new HttpStatus(404, ' ');
    $handler = $handlers->getHandler($error);
    $handler->handle($error);
}
