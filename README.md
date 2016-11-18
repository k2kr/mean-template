# q-mean-template
Provides a template website for qualcomm web applications to be built using the MEAN stack.

## What is a MEAN stack?

Every web service or web application had the following components:

1. A client front end (usually javascript + jquery)
2. A web server backend (like ASP.NET, Linux, Python, etc...)
3. A database (Apache, Oracle, MySQL, etc...)
4. Other pieces which hook stuff together (like PHP)

There are many choices for each of these components. Collectively, they are called a stack.

Here is what the MEAN stack looks like:

* **M** - Mongo DB
* **E** - Express JS
* **A** - Angular JS
* **N** - Node JS

The MEAN stack is useful in that it unifies all parts of web development into a single language - javascript.
It's also very easy to learn and very flexible, with many libraries and packages available to build on.

## What's in the box?

Let's take a look at what features q-mean-template provides out of the box. 
If you are interested in any of these, using this template will save you lots of time.

1. Auto HTTPS redirect. This ensures all your web apps and services are secure end-to-end.
2. Token based user authentication. All session and authentication information are managed by JSON web tokens.
3. LDAP authentication. All your users can just use their Qualpass credentials to log in.
4. Simple routing for web services. Uses Express JS to define RESTful API routes.

Please note that any apps/services built from this template should be for qualcomm internal use only. Definitely talk to [ITCS](http://go/itcs)) if you want to publish this to production, and consult [OSRG](http://go/osrg) regarding external release processes.

## Why not use another web framework?

Django, Sails, Mean IO, and a whole bunch of other frameworks are available and certainly provide more features.
However, they take a lot of time to learn and are black-boxes of magical unicorn powers. q-mean-template provides
a minimal code base with all the guts open so that you can tinker it as you wish.

Also, this setup is cheap! No licenses needed for visual studio or other tools.

## Installation/Setup

Getting started is fairly straightforward and shouldn't take more than a few minutes.

### Before you Install:
Make sure you have the following:

1. Install [git](https://git-scm.com/)
  * It's a good idea to register an account with github.qualcomm.com while you're at it.
  * You need git to grab this code!
2. Install [nodejs](https://nodejs.org)
  * Node is the platform that your web server backend will execute on.
3. Install [mongo](https://www.mongodb.com/)
  * Add the mongo bin to your system path after you run the installer.
  * By default, mongo stores data in C:\data\db. If this folder doesn't exist on your machine, create it.
  
### Now the real Install:

1. Open a command prompt terminal.
2. CD to a directory where you want to install this.
3. Run the following commands:

```
> git clone https://github.qualcomm.com/kkumarra/q-mean-template
> cd q-mean-template
> npm install
```

## Running the web server:

1. To run the web server, just run the following commands from the root of the q-mean-template directory:

```
> start mongod
> node server.js
```

The first command starts the database.
The second command launches the server which then connects to the database.

2. You can navigate to http://localhost:8080 in your browser to see the site.
3. If you see a security error in the browser, mark it as an exception and continue. This is because for testing purposes, this template uses self-signed SSL certificates.
4. Use Postman or another REST client to tinker with the currently configured APIs. More documentation is on the way for how to scale this to fit your needs.
