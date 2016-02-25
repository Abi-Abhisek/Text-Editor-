#Text-Editor

The user can access their any text related files on any device having wifi enability and web-browser. The user can host it on its laptop. 

#Dependencies
Express >=4.*.* 
  ejs>=
  fs>=5.*.*
  ejs>=0.0.0
  path>=5.*.*
  body-parser>=1.*.*

install dependencies using 
$ npm install

HOW to use ?

1. Clone this repo in the desired location and connect the host and the client devices using wifi hotspot or ethernet controller.
2. Go to the directory where it is saved and install necessary dependencies .[$ npm install]
3. run the server [ $  nodejs  editor.js]
4. see the wifi address of you device using [ $  ifconfig] 
5.  open the web browser of the client's device and type your wifi address:1234/
6.  they can access the files shared by your computer i.e files stored at store/
7. If a file is created / edited/ appended it reflects into the original file in store/

