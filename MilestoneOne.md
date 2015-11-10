# SWE 574 Software Development As A Team, Fall 2014 #
# Instructor: Suzan Üsküdarlı #











# Living History #
# Milestone I Summary #

### 17.11.2014 ###



















## Revision History ##

Revision	Date	Explanation
1.0	17.11.2014	Initial Milestone Contents










## Table of Contents ##


  * Revision History	2
  * Table of Contents	3
  * 1. Introduction	4
  * 2. Visualizing Memories	4
  * 3. Adding a Memory	4



## 1. Introduction ##

The purpose of this document is to explain the contents of the first milestone of “Living History” project.

1.	First milestone is focused on “Add and Show Memory on Client”
2.	10 Mockup Memories are created on “Client” for this purpose
3.	Demo is connected to database so no data persistence is present
4.	A mechanism of adding memory is implemented
5.	A mechanism of showing memory is implemented

Below are the steps of how to add and visualize memories.


## 2. Visualizing Memories ##

User will see the pins (geographical locations) that contain the submitted memories. On the right side location tags are present. “Add Location” and “Filter Memories” buttons are visible for user actions.


Figure 1: Living History at first glance


## 3. Adding a Memory ##

In order to add a memory user should either drop a pin (subject to change) or write a location name that will be auto-completed via Google Location API. Multiple locations may be created and the resulting location tag will appear on the right side of the screen. (Figure 2.)

User should select the previously entered location tag(s) to create a ığipş0u7 pü,
memory associated with the selected locations. (Figure 3.)

Figure 2: Add location for memory entry




Figure 3: Add memory for the selected location


After location tags are associated with the empty memory, user should click to “Add Memory to Location” button which will spawn a detail screen to be filled with the contents of the specific memory. (Figure 4.)








Figure 4: Detailed Memory Form


Finally, the memory contents are filled with the user input, and a green notification popup alerts the user of the successful transaction**. The new memory will then be displayed on the right hand side menu for the user to edit after the memory’s creation.**

**Error cases will be handled accordingly.**


Figure 5: Memory added for the selected location