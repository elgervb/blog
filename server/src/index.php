<?php
use router\Router;
use RedBeanPHP\R;

include __DIR__ . '/../vendor/autoload.php';

$router = new Router();

$router->route('root', '/', function() {
    R::setup( 'sqlite:dbfile.db' );
    R::debug( TRUE );
    
    $post = R::dispense('post');
    $post->title = "blogPost";
    $post->contents = "Blog post contents";
    
    $comment1 = R::dispense('comment');
    $comment1->comment = 'This is a nice comment';
    $comment2 = R::dispense('comment');
    $comment2->comment = 'This is also a nice comment';
    $post->xownCommentList[] = $comment1;
    $post->xownCommentList[] = $comment2;
    
    R::store($post);
    R::close();
    
    echo "<h1>{$post->title}</h1>";
    echo "<p>{$post->contents}</p>";
    foreach ($post->ownCommentList as $comment) {echo $comment->comment . '<br />';}
});
    
echo $router->match($_SERVER['REQUEST_URI']);
