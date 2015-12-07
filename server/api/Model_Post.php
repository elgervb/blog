<?php

use RedBeanPHP\SimpleModel;
class Model_Post extends SimpleModel{
    
    public function update () {
        if ($this->bean->isActive === null) {
            $this->bean->isActive = false;
        }
    }
}