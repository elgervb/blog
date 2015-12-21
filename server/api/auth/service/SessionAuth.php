<?php
namespace auth\service;

use auth\IAuthService;
use auth\ILoginProvider;
use auth\user\Model_User;
use http\HttpContext;

class SessionAuth implements IAuthService
{

    const SESSION_USER = "SessionUser";

    /**
     *
     * @var ILoginProvider
     */
    private $provider;

    /**
     *
     * @var \http\HttpSession
     */
    private $session;

    /**
     * Constructor
     *
     * @param ILoginProvider $aProvider            
     */
    public function __construct(ILoginProvider $aProvider)
    {
        $this->provider = $aProvider;
        
        $this->session = HttpContext::get()->getSession();
        if (! $this->session->isStarted()) {
            $this->session->start();
        }
    }

    /**
     * (non-PHPdoc)
     *
     * @see \auth\IAuthService::getUser()
     */
    public function getUser()
    {
        $user = $this->session->get(self::SESSION_USER);
        if ($user && is_object($user)) {
            $id = $user->{Model_User::ID};
            // delegate to the provider, as the user could have been changed
            return $this->provider->getUser($id);
        }
        
        return null;
    }

    /**
     * (non-PHPdoc)
     *
     * @see \auth\IAuthService::isLoggedIn()
     */
    public function isLoggedIn()
    {
        return $this->session->exists(self::SESSION_USER);
    }

    /**
     * (non-PHPdoc)
     *
     * @see \auth\IAuthService::login()
     */
    public function login($username, $password)
    {
        $user = $this->provider->login($username, $password);
        if ($user) {
            $this->session->set(self::SESSION_USER, $user);
        }
        
        return $user;
    }

    /**
     * (non-PHPdoc)
     *
     * @see \auth\IAuthService::logout()
     */
    public function logout()
    {
        $this->session->remove(self::SESSION_USER);
        $this->session->destroy();
    }
}