# the BigTrip project from HTMLAcademy's ECMAScript course, but rewritten in React, cause honestly that entire course is just a giant exercise in wheel reinventing

## design

offers: have to be unique within a type? could have same offer but diff 'levels' of it at diff prices?

event list/sublist component structure awkward, rethink

things like getting the blank event object, or getting the category of event type
should go somewhere they belong

in form:
makeRequest, isPending, error = useRequest()
isPending ? 'Saving...' : 'Save'
useEffect(add error indication class if error)
pass error callback to useRequest()?

// various combinations of urls/methods/request contents have to be mapped to actions the app is actually allowed to perform
// instead of a url, useRequest could accept a function returning a Promise

destination should update on datalist click, not just blur

managing the imperative charts from react is something else

getting event time should really be a method of the event class

// offers come in in a different shape, adjust

unfuck offerselector callbacks

## reqs

when event form is open, should sort/filter be locked?

check if sort by price should take offers into account

the new event button should not close the new event form, misread the reqs
open/close form as operations

// todo include offers in the event cost

1d 0h 5m should not drop hours, i guess

new event resets filter/sort

gonna be an issue with displaying event durations longer than a year
actually, even just longer than a month

// favourite independent of save

offline:
on failed request, set offline flag & update localstorage state instead
on successful request, if was offline, send localstorage state to server
