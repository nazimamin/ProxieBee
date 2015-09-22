# notduetodaynotdotoday
CSE305 - Auction project


CSE 305 -- Principles of Database Systems

Fall 2015

Requirements Specification for the Database Programming Project


## Introduction

In this project, you will design and implement a relational database system to support the operations of an on-line auction house. You will use HTML for the user interface, for the database server, and Java, Javascript, and JDBC for connectivity between the user interface and database server. The database server is accessible from the PCs in both the undergraduate and graduate Transaction Processing labs (Computer Science Building, Rooms 2114 and 1239), on which you will be given a MySQL account.

Please see the Transaction Processing Lab web site for general information about the Transaction lab and its policies, and the lab's MySQL web site for information on how to access MySQL in the Transaction lab and account information.

If you own a PC, you are encouraged to develop as much of the code as possible on your PC, to ease the congestion in the TP lab. For these purposes, I suggest you use SQL Server or MySQL Server.

SQL server is a relational database server produced by Microsoft, based on the ANSI SQL-92 standard. You can get a free copy of the SQL Server Developer Edition, for 2005 and 2008, from the Stony Brook DreamSpark, formerly known as the Microsoft Developer Network Academic Alliance (MSDNAA), web site.

For MySQL, you can download a copy of MySQL server from the MySQL web site. MySQL is a good RDBMS for learning SQL, has very low resource requirements, is open source, and has JDBC drivers. Also, it is SQL-99 compliant so it will be more in tune with ANSI SQL standards as opposed to SQL Server, which has some proprietary semantics embedded over the standard query language.

You are to work in teams of three. Many of you will form teams of three on your own. If not, do not worry. Please just be sure to attend class on a regular basis, and I will make sure that every student is placed in a team of three. Once you have joined a complete team, you and your teammates should choose a name for your team/company. E-mail the names of your team members and the name of your company to heekwon@cs.sunysb.edu as soon as possible. If you are unable to find a team to join, please let me know asap, and I will find one for you. 
Getting Started

Perhaps the most well known online auction web site is ebay.com. I suggest that you visit their web site to get an understanding of how a web site supporting online auctions is supposed to function. In particular, go to their help page and carefully take a look at the information provided. Pay special attention to their help topic on Proxy Bidding, where you can even practice bidding on eBay with their test auction.

I have also placed a Powerpoint tutorial on blackboard on how to connect to Sybase using Java and on how to develop the UI (User Interface) for your online trading system course project. You can find the tutorial in the Project Assignments subfolder of the Assignments folder. (You can also find the tutorial via the link associated with the announcement I recently posted on blackboard about the tutorial.)

To further help you with the project, a former TA has developed a prototypical database system for a University Registration system that closely resembles the student registration system used as a running example in the course textbook. You should consult this demo system as a guide for your project development. You can access the demo system, and the underlying source code, by following the links I placed in an announcement I recently posted on blackboard. As you experiment with the demo system, you should also start to become familiar with Java, Javascript, HTML, and JDBC on your own. I will lecture about JDBC (Chapter 8 of the course textbook) after the midterm. You might also want to buy the books about these languages recommended on the course homepage.

It is recommended that you regularly check the blackboard Project Assignments folder and the PROJECT ASSIGNMENTS web page for information on the course project. This page will be updated from time to time with important information on how to proceed with the project. 
CSE 305 Course Project Competition

This semester there will be a CSE 305 Course Project Competition in which the top-three finishing teams will receive award certificates. I am trying to find a corporate sponsor for this competition and will let you know when and if I succeed in doing so. So please do your best to produce a professional-looking online auction house that offers a full compliment of features and functionality, including at least those specified below. 
Project Specification

The basic idea behind your on-line auction house is that it will allow customers to use the web to browse/search the contents of your database (at least that part you want the customer to see) and to buy and sell various items over the web. Your web site should support the buying and selling of a variety of items, including jewelry, silverware, books, DVDs, and sport memorabilia. The site makes money by charging the both the buyer and seller a commission fee for each transaction executed. In these regards, it is a lot like the on-line auction web site eBay. So visit this site to get ideas as to what your system should look like.

Your database system must be based on the specifications and requirements that follow.

### 1 System Users

The users of your system will be the customers that buy and sell at your auction house, customer representatives who provide customer-related services, and the house's manager. You should assume that the computer knowledge of the users is limited (say, that of a typical AOL subscriber), and thus your system must be easy to access and operate.

### 2 Required Data

The data items required for the auction-house database can be classified into four categories: auctions, items, customers, and employees.

This classification does not imply any particular table arrangement. You are responsible for arranging the data items into tables, determining the relationships among tables and identifying the key attributes. In addition, you should include indices in your tables to speed up query processing. You should base your choice of indices on the type and expected frequency of the queries outlined in Section 3. Finally, you should specify and enforce integrity constraints on the data, including referential integrity constraints.

As I mentioned in class, you will first create an E-R diagram of your auction-house database system before developing your relational model. Details of this assignment will be forthcoming.

###### 2.1 Auction Data

This category of data should include the following items:

Auction ID
Item ID
Seller ID
Buyer ID
Opening Date/Time
Closing Date/Time
Minimum or Opening Bid
Closing Bid
Current Bid
Current High Bid
Reserve
Increment
Employee ID
Each auction is for a certain item in the auction house's database. The Seller establishes an opening data/time and closing date/time for the auction. An auctions may last 3, 5, or 7 days from the time the auction is opened.

Since this is an on-line auction house, the bidding rules governing an auction are a bit different than what you might expect. This is because bidders are obviously not expected to stay connected to the site for the duration of an auction. Instead, you are encouraged to bid the maximum amount you are willing to pay for an item, even on your first bid! Moreover, this amount is kept secret! If necessary, bids will be made on your behalf as other bidders increase the bid price, up to your maximum amount or the necessary preset bid increment to outbid other bidders.

All bidding is done in bid increments. An auction's bid increment is calculated by the system and changes with the current maximum bid. Click here to see how eBay calculates the bid increment.

To clarify the bidding process, let's consider an example. Suppose the opening bid on an item is $100 and the increment is $25. The seller stipulates what the opening or minimum bid is to be. Suppose now that Mary bids $500 on the item and she is the first person to make a bid on the item. Then the current bid will be posted as $100 although the system knows that the high bid so far is $500. Suppose John comes along and bids $250. Then the current bid will now be posted as $275 and Mary will be credited with this bid.

This is an example of a proxy bid, i.e., a bid made by the system on behalf of a user, and such bids are a key mechanism for making on-line auctions feasible. In this particular case, the system has outbid John by the bid increment on behalf of Mary. John decides that enough is enough and bids $600. John has succeeded in outbidding Mary, the current bid becomes $525, and the current maximum bid belongs to John at $600. As always, John's maximum bid is kept secret.

Auctions may also be run with a reserve price: the lowest price at which a seller is willing to sell an item. The reserve price is not disclosed to bidders. A seller might specify a reserve price if he is unsure of the real value of the item and would like to be able to refuse to sell the item if the market value is below a certain price. During an auction, an annotation should be displayed in the item information screen if the seller has specified a reserve price.

The seller specifies the reserve price when he lists an item. This price should be above the minimum bid price. The auction begins at the minimum bid price. When a bidder's maximum bid is equal to or greater than the reserve price, the item's current price will indicate that the reserve price has been met.

When an auction finishes the customer who placed the current high bid becomes the buyer. You can optionally implement a scheme where at the conclusion of an auction, the buyer and seller will be notified by e-mail. The auction house receives a fixed-percentage commission of 10% on every completed auction. A customer representative from the auction house oversees each auction.

To find out more about how the bidding works in an on-line auction house, you might want to consult the help menu at ebay.com.

###### 2.2 Item Data

This category of data should include the following items:

Item ID
Item Name
Item Type
Year Manufactured
Copies Sold
Amount in Stock
An item is the entity that is purchased or sold in an auction. The types of items in your database can be whatever you like. Standard ones are jewelry, silverware, books, DVDs, and sport memorabilia. You should keep track of the number of copies of the item sold and currently up for auction.

###### 2.3 Customer Data

The items required for this category include:

Customer ID
Last Name
First Name
Address
City
State
Zip Code
Telephone
E-mail Address
Credit Card Number
Items Sold
Items Purchased
Rating
A given customer may partake in any number of auctions, either as a buyer or as a seller. The customer's rating should reflect how trustworthy and reliable the customer is either as a buyer (pays the seller what he said he would) or as a seller (sends the buyer what he said he would).

###### 2.4 Employee Data

This category of data should include the following:

Social Security #
Last Name
First Name
Address
City
State
Zip Code
Telephone
Start Date
Hourly Rate
## 3 User-Level Transactions

  A database transaction can be viewed as a small program (written in the DML) that either updates or queries the database. Transactions that change the contents of the database must do so in a consistent manner. Moreover, transactions should not interfere with one another when running concurrently.

What follows is a breakdown of the user-level transactions that your database system should support. To make sure transactions maintain the integrity of the database, you must write them using the SQL transaction structuring capabilities (i.e., begin transaction, commit transaction, etc.).

###### 3.1 Manager-Level Transactions

The manager should be able to:

Add, Edit and Delete information for an employee
Obtain a sales report for a particular month
Produce a comprehensive listing of all items
Produce a list of sales by item name or by customer name
Produce a summary listing of revenue generated by a particular item, item type, or customer
Determine which customer representative generated most total revenue
Determine which customer generated most total revenue
Produce a Best-Sellers list of items
###### 3.2 Customer-Representative-Level Transactions

Customer Representatives should be able to:

Record a sale
Add, Edit and Delete information for a customer
Produce customer mailing lists
Produce a list of item suggestions for a given customer (based on that customer's past purchases)
###### 3.3 Customer-Level Transactions

The customer should be able to easily browse the auction house over the web and partake in auctions (as the buyer or seller). While the customer will not be permitted to access the database directly, the customer should be able to retrieve the following information.

A bid history for each auction
A history of all current and past auctions a customer has taken part in
Items sold by a given seller and corresponding auction info
Items available of a particular type and corresponding auction info
Items available with a particular keyword or set of keywords in the item name, and corresponding auction info
Best-Seller list
Personalized item suggestion list
Your database system should provide controlled access to the data by distinguishing between the different types of users: manager, customer representatives, and customers.

Customer Representatives should not be able to perform manage-level transactions; however, they should be able to read employee information, except for the hourly rate.
Customer Representatives should be able to record the receipt of an order from a customer.
A customer should not be allowed to access other customers' account information, or to any employee information. Also, as discussed above, high bids and reserves are kept private.

## 4 Utilities

In addition to the transactions described above, the system should provide facilities for:

Allowing the manager to add and delete users
Backing up the database files
A comprehensive Help facility, including a topic-driven pull-down Help menu

## 5 User Interface

HTML and its successors provide facilities for creating pop-up and pull-down menus, value lists, input/output forms, labels and customized reports. You should make use of all of these capabilities, and in the process come up with a system that caters to users with only limited computer knowledge. The information you provide to customers should look professional and inviting.

## 6 Documentation

You will be required to supplement your completed database implementation with a design document that contains information concerning your design criteria and decisions. The following is a list of some of the information you should include:

Entity-Relationship (E-R) Diagram of the complete database scheme
Lucid description of the relational database scheme for your online auction house, including a discussion of the reasoning behind your design decisions. Make clear how your design supports efficient query processing.
A list of all functional dependencies in the relational database scheme
Description of integrity constraints including referential integrity
You will also be required to submit a Users Guide that carefully explains how to use all aspects of the system. It should be understandable by non-computer experts. Be sure that the user interface (screen design, menu structure, etc.) is clearly explained.

## 7 Grading

You will be given three assignments: 1) produce an E-R and relational model of your system; 2) implement (in SQL) and execute all transactions described in the above project specification; and 3) implement (using Java, Javascript and JDBC) the final interactive system to support your online auction house system. The due date for the first assignment will be announced shortly; as for the the other two assignments, the due dates for all three assignments will be spaced roughly three weeks apart.

All documentation should be on-line. You will also be asked to hand-in hardcopies when assignments are due.

In order to evaluate your final system, you will be asked to present a 30-minute demo to myself or the TA. This will most likely happen during the last week of classes or shortly thereafter.

## 8 Collaboration Plan

As stated above, you will be working on the course project in in teams of three. A rough, three-way division of labor for the first project assignment is as follows:

Teammate 1 will focus item and auction data.
Teammate 2 will focus on proxy bidding.
Teammate 3 will focus on customer and employee data.
About this document ...


Scott Smolka 
Last Modified: Thu Sep 17 11:20:11 EDT 2015
