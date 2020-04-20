var Profile = require("./profile.js");
var renderer = require("./renderer.js")


//Handle HTTP route GET / and POST / i.e. Home
function home(req, res) {
    if (req.url === "/") {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        renderer.view("header",{},res)
        renderer.view("search",{},res)
        renderer.view("footer",{},res)
        res.end();
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
        renderer.view("header",{},res)
        
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
            renderer.view("profile",{},res) 
            renderer.view("footer",{},res)
            res.end();
        });

        // on error
        studentProfile.on("error", function(e){
            //show the error
            renderer.view("error",{},res);
            renderer.view("search",{},res) 
            renderer.view("footer",{},res)
            res.end();
        });

    }
}


module.exports.home = home;
module.exports.user = user; 