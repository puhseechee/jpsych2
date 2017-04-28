jsPsych.plugins['turkid'] = (function(){

  var plugin = {};

  plugin.trial = function(display_element, trial){
    // allow variables as functions
    trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);
    
    // set default values for the parameters;
    trial.prompt = trial.prompt || '<div><span style="font-size:16px;"><span style="font-family:arial,helvetica,sans-serif;"><strong>Welcome!</strong></span></span></div> <div>&nbsp;</div> <span style="font-size:16px;"><span style="font-family:arial,helvetica,sans-serif;"><strong>Please enter your Amazon Mechanical Turk WorkerID.</strong><span style="color: rgb(51, 51, 51);">&nbsp;(Please see below for where you can find your WorkerID.) Your WorkerID starts with the letter A and has 12-14 &nbsp;letters or numbers. It is NOT your email address. If we do not have your correct WorkerID we will not be able to pay you. Thank you!</span></span></span>';
    
    // display and hide warning text for submitting things
    display_element.append('<div  align="center" class="ValidationError"><font color="red">Please answer this question.</font><br></div>');
    validerror = document.getElementsByClassName('ValidationError')[0];
    validerror.style.display = 'none';
    
    // display prompt
    if (trial.prompt !== "") {display_element.append('<div class="prompt" align="center">' + trial.prompt + "</div>");}
    
    // accept text input
    display_element.append('<br><div align="center"><input type="TEXT" autocomplete="off" id="turkid" data-runtime-textvalue="runtime.Value" style="background-repeat: repeat; background-image: none; background-position: 0% 0%; cursor: auto;"></div><br>');
    
    // Addendum
    display_element.append('<div align="center"> <span style="font-family: Helvetica, Arial, \'Lucida Grande\', sans-serif; font-size: 16px;">Note that your WorkerID can be found on your dashboard page:</span></div><br>');
    display_element.append('<div align="center"><img src="https://rawgit.com/puhseechee/jpsych2/jpsychadd/Graphic.png" border="0"></div>')
    
    // Submit button
    display_element.append('<br><div align="center"><button id="next" class="button">Submit Worker ID</button></div>');
    
    // make the button work
    $("#next").click(function() {
        trial.workerid = document.getElementById('turkid').value;
        
        if (trial.workerid !== '') {
            display_element.html(''); // clear the display
            jsPsych.finishTrial({workerid: trial.workerid}); // end
        } else {
            validerror.style.display = 'block';
        }
    });
  }

  return plugin;

})();