<?php
namespace auth;

interface ILoginProvider
{

    /**
     * Returns the logged in user
     *
     * @return \auth\user\Model_User the user model, or null when not logged in
     */
    public function getUser();

    /**
     * Signs in the user with supplied credentials
     *
     * @param string $username
     *            The username
     * @param string $password
     *            The plain text password
     *            
     * @return UserModel|false The usermodel when successfully logged in or false when the user could nog be found
     */
    public function login($username, $password);
}
