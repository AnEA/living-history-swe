# SWE 574 Software Development As A Team, Fall 2014 #
# Instructor: Suzan Üsküdarlı #











# Living History #
# Milestone I Summary #

# 17.11.2014 #


## Revision History ##

Revision:    1.0

Date:        17.11.2014

Explanation: Initial Milestone Contents



## Table of Contents ##


Revision History

Table of Contents

1. Introduction

2. Visualizing Memories

3. Adding a Memory



## 1. Introduction ##

The purpose of this document is to explain the contents of the first milestone of “Living History” project.

1.	First milestone is focused on “Add and Show Memory on Client”

2.	10 Mockup Memories are created on “Client” for this purpose

3.	Demo is connected to database so no data persistence is present

4.	A mechanism of adding memory is implemented

5.	A mechanism of showing memory is implemented

Below are the steps of adding and visualizing memories.


## 2. Visualizing Memories ##

User will see the pins (geographical locations) that contain the submitted memories. On the right side location tags are present. “Add Location” and “Filter Memories” buttons are visible for user actions.


## 3. Adding a Memory ##

In order to add a memory user should either drop a pin (subject to change) or write a location name that will be auto-completed via Google Location API. Multiple locations may be created and the resulting location tag will appear on the right side of the screen. (Figure 2.)

User should select the previously entered location tag(s) to create a memory associated with the selected locations. (Figure 3.)


After location tags are associated with the empty memory, user should click  “Add Memory to Location” button which will spawn a detail screen to be filled with the contents of the specific memory. (Figure 4.)


Finally, the memory contents are filled with the user input, and a green notification popup alerts the user of the successful transaction.
The new memory will then be displayed on the right hand side menu for the user to edit after the memory’s creation.

_Error cases will be handled accordingly._

