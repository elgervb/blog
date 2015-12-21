<?php
namespace auth\provider;

use auth\ILoginProvider;
use auth\user\Model_User;

/**
 * Login provider which gets username and (secure) password from .htpasswd file
 * This provider only supports users with name and password.
 * @author eaboxt
 *        
 */
class HtpasswdProvider implements ILoginProvider
{
    /**
     * all users from the .htpasswd file username => password (encrypted)
     * @var \ArrayObject
     */
    private $users;
    
    /**
     * The currently Logged in user
     * 
     * @var Model_User
     */
    private $currentUser;
    /**
     */
    public function __construct($htpasswdFile)
    {
        if (!is_file($htpasswdFile)) {
            throw new \Exception($htpasswdFile . ' is not a valid file');
        }
        $this->users = new \ArrayObject();
        $this->parseFile($htpasswdFile);
    }
    
    private function parseFile($htpasswdFile) {
        $contents = file_get_contents($htpasswdFile);
        
        if ($contents) {
            $lines = explode('\n', $contents);
            $index = 0;
            foreach ($lines as $line) {
                // each line should contain a : to seperate the user from the password
                $parts = explode(':', $line);
                if ($parts) {
                    $user = new \stdClass();
                    $user->id = $index++;
                    $user->username = $parts[0];
                    $user->password = $parts[1];
                    
                    $this->users->append($user);
                }
            }
        }
    }

    /**
     * (non-PHPdoc)
     *
     * @see \auth\ILoginProvider::getUser()
     */
    public function getUser()
    {
        return $this->currentUser;
    }

    /**
     * (non-PHPdoc)
     *
     * @see \auth\ILoginProvider::login()
     */
    public function login($username, $password)
    {
        foreach($this->users as $user) {
            if ($user->username === $username) {
                $securePwd = sha1($password);
                
                if ($user->password === $securePwd) {
                    return $user;
                }
            }
        }
    }
}
