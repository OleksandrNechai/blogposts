var GitHubApi = require("github");
var cheerio = require('cheerio');
var fs = require('fs');
var marked = require('marked');
var Entities = require('html-entities').XmlEntities;
var entities = new Entities();

var sourceFile = process.argv[2];

try {
    fs.accessSync(sourceFile, fs.F_OK);
} catch (e) {
    console.log(`File ${sourceFile} is not found.`);
    process.exit();
}

var github = new GitHubApi({
    // required
    version: "3.0.0",
    // optional
    debug: false,
    protocol: "https",
    //host: "api.github.com", // should be api.github.com for GitHub
    //pathPrefix: "/api/v3", // for some GHEs; none for GitHub
    timeout: 5000,
});
github.repos.getContent({
    headers: {
        "Accept": "application/vnd.github.html"
    },
    user: "OleksandrNechai",
    repo: 'blogposts',
    path: sourceFile
}, function(err, res) {
    $ = cheerio.load(res);
    var map = {};
    $('img').each(function() {
        map[$(this).attr('data-canonical-src')] = $(this).attr('src');
    });

    var source = fs.readFile(sourceFile, 'utf-8', function(err, source) {
        var code = marked(source);
        $ = cheerio.load(code);
        $('p').attr('style', 'text-align: justify;');
        $('pre code').replaceWith(function() { return $(this).contents(); });
        $('img').each(function() {
            var imageFromCloud = map[$(this).attr('src')];
            $(this).attr('src', imageFromCloud);
            $(this).wrap(`<a href="${imageFromCloud}" target="_blank"></a>`);
        });
        console.log(entities.decode($.html()));
    });

    //console.log(JSON.stringify(map));
});

