<?php
use router\Router;
use RedBeanPHP\R;

include __DIR__ . '/../vendor/autoload.php';

// setup database
R::setup( 'sqlite:./db/dbfile.db' );

$router = new Router();
$router->route('post-list', '/posts', function() {
    $result = [];
    $posts = R::find('post');
    /* @var $post RedBeanPHP\OODBBean */
    foreach($posts as $post) {
        $result[] = $post->export();
    }
    return json_encode($result);
});
// $router->route('root', '/', function() {
    
//     $post = R::dispense('post');
//     $post->title = "blogPost3";
//     $post->content = "Blog post contents3";
    
//     $comment1 = R::dispense('comment');
//     $comment1->comment = 'This is a nice comment';
//     $comment2 = R::dispense('comment');
//     $comment2->comment = 'This is also a nice comment';
//     $post->xownCommentList[] = $comment1;
//     $post->xownCommentList[] = $comment2;
    
//     R::store($post);
//     R::close();
    
//     echo "<h1>{$post->title}</h1>";
//     echo "<p>{$post->contents}</p>";
//     foreach ($post->ownCommentList as $comment) {echo $comment->comment . '<br />';}
// });

header('Content-Type: application/json');
echo $router->match($_SERVER['REQUEST_URI']);
