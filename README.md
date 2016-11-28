# Chrome_Extension_Attendance
Chrome extension to get the hours remaining for a day

Motivation :

Suppose an employee has to work X hours per month. It would be handy to have a chrome extension which would show him how many hours 
he has spent for that particular day and how many hours are remaining for that month. This removes the confusion of calculating the
out time daily.


Baseline :

Chorme extension to show number of hours left for today.


Next steps:

1. As of now the code is able to get the page source by injecting a script into the source page that the user is viewing and
   retuning back to the popup.html [ 28 nov 2016]
2. Next, it has to parse the relevant information from the login page of the company.
3. Open and ask user if the tab is not present and navigate to that particular tab and get the source code.


Future steps:

1. How do we handle the authentication?
2. Graph to show the user his working hours for past month, year (may be)
3. To be added some more
