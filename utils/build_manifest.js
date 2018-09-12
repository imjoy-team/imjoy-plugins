var fs = require('fs');
var path = require('path');
var process = require("process");
var pluginParser = require('./pluginParser');

var repository_dir = "./repository";
var manifest_path = "./manifest.json"
var repo_version = "0.2.0"
var uri_root = "https://raw.githubusercontent.com/oeway/ImJoy-Plugins/master/repository"

function parsePlugin(code){
  var pluginComp = pluginParser.parseComponent(code)
  if(pluginComp && pluginComp.config && pluginComp.config.length>0){
    var config = {}
    config = JSON.parse(pluginComp.config[0].content)
    return config;
  }
  else{
    return null;
  }
}

var plugin_configs = [];
// Loop through all the files in the temp directory
fs.readdir(repository_dir, function(err, files) {
  if (err) {
    console.error("Could not list the directory.", err);
    process.exit(1);
  }
  files.forEach(function(file, index) {
    var plugin_path = path.join(repository_dir, file);
    if (plugin_path.endsWith(".imjoy.html")){
        // console.log("reading '%s'...", plugin_path);
        var code = fs.readFileSync(plugin_path, "utf8");
        var config = parsePlugin(code);
        config.uri = file;
        plugin_configs.push(config);
        console.log('Adding plugin ====>', config.name);
    }

  });

  if(plugin_configs.length>0){
    console.log("Writing %s plugins into '%s'", plugin_configs.length, manifest_path);
    var repo_manifest = {version: repo_version, uri_root: uri_root, plugins: plugin_configs}
    var stream = fs.createWriteStream(manifest_path);
    stream.once('open', function(fd) {
      stream.write(JSON.stringify(repo_manifest,null,' '));
      stream.end();
    });
    console.log("manifest file updated!");
  }
  else{
    console.error('no plugin found.');
  }
});
