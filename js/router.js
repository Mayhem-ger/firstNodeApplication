var Profile = require("./profile.js");


//Handle HTTP route GET / and POST / i.e. Home
function home(req, res) {
    if (req.url === "/") {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.write("Header\n")
        res.write("Search\n") 
        res.end("Footer\n") 
    }
}

//if url == "/" && GET
    //show search
    //if url == "/" && POST
        //redirect /:username


//Handle HTTP route  GET /:username i.e. /chalkers
function user(req,res) {
//if url == "/..."
    var username = req.url.replace("/", "")
    if (username.length > 0) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.write("Header\n")
        
        //get json from Treehousse
        var studentProfile = new Profile(username);
        //on "end"
        studentProfile.on("end", function(profileJSON) {
            //show profile

            //Store the values which we need
            var values = {
                avatarURL: profileJSON.gravatar_url,
                username: profileJSON.profile_name,
                badges: profileJSON.badges.length, 
                javascript: profileJSON.points.JavaScript
            }
            //Simple response
            res.write(values.username+ " has " + values.badges + " and " + values.javascript + " points in JavaScript" +"\n") 
            res.end("Footer\n") 
        });

        // on error
        studentProfile.on("error", function(e){
            //show the error
            res.write(e.message + "\n");
            res.end("Footer\n") 
        });

    }
}


module.exports.home = home;
module.exports.user = user; 