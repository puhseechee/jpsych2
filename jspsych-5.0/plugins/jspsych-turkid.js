jsPsych.plugins['turkid'] = (function(){

  var plugin = {};

  plugin.trial = function(display_element, trial){
    // allow variables as functions
    trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);
    
    // set default values for the parameters;
    trial.prompt = trial.prompt || '<div><span style="font-size:16px;"><span style="font-family:arial,helvetica,sans-serif;"><strong>Welcome!</strong></span></span></div> <div>&nbsp;</div> <span style="font-size:16px;"><span style="font-family:arial,helvetica,sans-serif;"><strong>Please enter your Amazon Mechanical Turk WorkerID.</strong><span style="color: rgb(51, 51, 51);">&nbsp;(Please see below for where you can find your WorkerID.) Your WorkerID starts with the letter A and has 12-14 &nbsp;letters or numbers. It is NOT your email address. If we do not have your correct WorkerID we will not be able to pay you. Thank you!</span></span></span>';
    
    // display prompt
    if (trial.prompt !== "") {display_element.append('<div class="prompt" align="center">' + trial.prompt + "</div>");}
    
    // accept text input
    display_element.append('<input type="TEXT" autocomplete="off" id="turkid" value="hello" data-runtime-textvalue="runtime.Value" style="background-repeat: repeat; background-image: none; background-position: 0% 0%; cursor: auto;">');
    
    // Addendum
    display_element.append('<span style="font-family: Helvetica, Arial, \'Lucida Grande\', sans-serif; font-size: 16px;">Note that your WorkerID can be found on your dashboard page:</span>');
    display_element.append('<div><img src="https://raw.githubusercontent.com/puhseechee/jpsych2/jpsychadd/jspsych-5.0/loading.gif" style="width: 144px; height: 144px;"></div>')
    
    // Submit button
    display_element.append('<button id="next" class="button" style="margin-left: 50%">Submit Worker ID</button>');
    
    // make the button work
    $("#next").click(function() {
        trial.workerid = document.getElementById('worker').value;
        
        if (trial.workerid !== '') {
            display_element.html(''); // clear the display
            jsPsych.finishTrial({workerid: trial.workerid}); // end
        } else {
            
        }
    });
  }

  return plugin;

})();