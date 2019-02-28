# Front-end-exercise

Table of Contents

    About
    Getting Started
    Prerequisites
    Instructions
    Built With
    Authors


**About

This is a vanilla Js coding challenge with sessionStorage function


**Getting Started

Just open the index.html file with a Browser (Google Chrome is preferred)


**Prerequisites

Browser
Internet connection


**Instructions

This app is responsive. On devices with width < 850px the navigation menu is hidden and after 850px it gets fixed on the left of the screen.

The navigation menu gives three options to select from: 
    Customers
    Products
    Users
    
In the customers' page the data name, code and address are delivered through an XML Http Request. No interaction can be made with this page

In the products' page the data code and description are delivered through another XML Http Request. The user can select <u>only one</u> product and delete it by pressing the delete button on the top of the screen. The chosen product is being deleted and the list of products is rerendered with the deleted product missing. If more than one products are checked an alert modal will appear.

In the users' page the data code and name are delivered through aother XML Http Request.
The user can add new users just by pressing the add new button in order to fetch the new page with the form. Then he types in a code and a name and presses the button create. When confirmed, the new user gets added in the beginning of the users list. If not, the user returns back to the page. The user, by pressing the arrow next to the add user title of the form, can return to the users page.

All the data are being stored to the sessionStorage so that the user can have access to them during the session.


**Built With

HTML,
CSS,
JS,


**Authors

Chara Zogkou


**Starting Code

No starting code was provided



Copyright © 2019, Chara Zogkou
