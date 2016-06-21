# React-Redux-Laravel#

Boilerplate blog application for a Laravel JWT Backend and a React/Redux Front-End with Bootstrap 4.
Fork of [https://github.com/onerciller/react-redux-laravel](https://github.com/onerciller/react-redux-laravel)

* Laravel 5.2
* React
* Redux
* React-Router
* Babel 6
* Redux-Form
* Webpack

![screenshot](https://github.com/onerciller/react-redux-laravel/blob/master/public/img.png)

##Installation

### Laravel
```sh
$ composer update
```
Create ```.env``` file for you environment variables. (Look at ```.env.example for what you will need```)

Generate new app key: 
```sh 
$php artisan key:generate
```

Migrate database for users and posts tables
```sh
$ php artisan migrate 
```

### Install Front-End Requirements
```sh
$ cd client-app
$ npm install
```

### Run Back-End

```sh
$ php artisan serve
```


### Run Front-End

```sh
$ cd client-app
$ webpack -w
```

## Note that this is still very much a 'work in progress'

Basic functionality such as logging in and out has been implemented and other functionality is continuing to be developed.
 
