## An ebay like Proxy Bidding System 


#### ndtndt - NOT DUE TODAY, NOT DO TODAY 

  - Includes multiple system level service roles.
  - Options such as add/edit/delete, search, filter, bid, report etc. with an intuitive look.

Technology used:
 - Front-end - AngularJS
 - [Backend REST  - Python](https://github.com/NazimAmin/api.ndtndt)  
 - DB - SQL

## Build & development & Dependencies front-end

1. Clone `git clone https://github.com/NazimAmin/ndtndt` - 

2. Run `npm install` to install node_modules

3. Run `bower install` to install bower_components

4. Run `grunt ` for building and `grunt serve` for preview.

## Build & development & Dependencies backend

1. Clone `git clone https://github.com/JunXHuang/api.ndtndt` - 

2. Run `pip install -r requirement.txt`

3. Change database connection string in `ndtndt/ndtndt/ndtndt/__init__.py`

4. Run tablequery.sql, insertquery.sql, and trigger.sql to populate the database `ndtndt/db` 

5. Run `Python api.py`


####Logins 

-  Admin -  Username : `789-12-3456` , Pass: `666666`
-  Customer Rep - Username: `nazimamin`, Pass: `main1212`  or Username: `jun` , Pass: `main1212`  or create one by logging in as admin.
-  Customer - Username: `main` , Pass: `main`  or crate one your own! 

##### *Some of the options will not be visible to the newly created user. They will be visible based on user's activity*


## Contributors

Made with :hotsprings: by [@Nazim](http://github.com/nazimamin) [@Jun Huang](http://github.com/JunXHuang)





