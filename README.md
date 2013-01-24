
#olin.js #1 — homework, as completed by Rachel Bobbins
(original assignment described below)


**Due Jan 25**

After the first lesson you should know a little about git and heroku, and have started playing around with node in your console. In this homework, we're gonna go deeper with node and figure out what it's actually doing.

##Reading

Read [the node beginner book](http://thepaulbooth.com/NodeBeginnerBook). Remember, all the code can also be run in your console.

##Assignment

* Fork this repo to your own account
* Create the app that node beginner walks through and push it to heroku. This repo already has the Procfile and package.json files you'll need.
* Once it's on heroku, copy and paste the public link onto [this spreadsheet](https://docs.google.com/spreadsheet/ccc?key=0AjqGw-pw5UuudFhQSmJhZlRZWEhRTWcwYmxBVld6c1E#gid=0).

##FAQs
**I'm getting an application error when I go to my heroku site**

Does it work on your localhost? Does it work when you try ```node index.js``` on your own machine? If not, check the tutorial to see where you went wrong.

If everything works on your local machine but doesn't work on heroku, you can check the heroku logs by going into your homework's git folder and typing ```heroku logs```

If you get something like 

```
Error R11 (Bad bind) -> Process bound to port 8888, should be 25589 (see environment variable PORT)
```

It means you can't use port 8888 because Heroku is expecting your application to be on port 25589. Heroku is operating a ton of different web apps at the same time (probably on the same machines), so it can't save port 8888 just for you. Instead it opens up a random port for you and tells you to use it.

Alright, so you can just change 8888 to 25589 and push it again right?

Wrong. By the time you push that, Heroku will give you a different random port number. Unless you are extremely lucky, you will never randomly guess the correct port. 

Heroku uses an **[environment variable](http://en.wikipedia.org/wiki/Environment_variable)** to try to get your application to use the port that they've already set up.

Environment variables in node can be accessed through the ```process.env``` global. So in our case, we want to use the PORT variable to set our app to the right port. So everywhere you reference port 8888 we need to change it to be

```
process.env.PORT || 8888
```

This should be changed in server.js

This change uses the PORT environment variable if it's available (such as on Heroku) and defaults to 8888 when it's not available (such as on your machine).

Now add your change, commit it, and push it to heroku again and your app should be working.
