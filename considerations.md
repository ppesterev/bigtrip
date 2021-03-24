# the BigTrip project from HTMLAcademy's ECMAScript course, but rewritten in React, cause honestly that entire course is just a giant exercise in wheel reinventing

## design

offers: have to be unique within a type? could have same offer but diff 'levels' of it at diff prices?  
event list/sublist component structure awkward, rethink  
things like getting the blank event object, or getting the category of event type  
should go somewhere they belong  
destination should update on datalist click, not just blur  
managing the imperative charts from react is something else  
getting event time should really be a method of the event class

~~various combinations of urls/methods/request contents have to be mapped to actions the app is actually allowed to perform~~  
~~instead of a url, useRequest could accept a function returning a Promise~~  
~~offers come in in a different shape, adjust~~

## reqs

disable filter option when it's empty  
1d 0h 5m should not drop hours, i guess  
gonna be an issue with displaying event durations longer than a year  
actually, even just longer than a month

offline:  
on failed request, set offline flag & update localstorage state instead  
on successful request, if was offline, send localstorage state to server

~~check if sort by price should take offers into account~~ _guess so_  
~~when event form is open, should sort/filter be locked?~~ _guess not_  
~~the new event button should not close the new event form, misread the reqs~~  
~~open/close form as operations~~  
~~todo include offers in the event cost~~  
~~new event resets filter/sort~~  
~~favourite independent of save~~
