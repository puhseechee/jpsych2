/**
 * jspsych-survey-multi-choice
 * a jspsych plugin for multiple choice survey questions
 *
 * Shane Martin
 *
 * documentation: docs.jspsych.org
 *
 */


jsPsych.plugins['survey-misc'] = (function() {

  var plugin = {};

  plugin.trial = function(display_element, trial) {

    var plugin_id_name = "jspsych-survey-multi-choice";
    var plugin_id_selector = '#' + plugin_id_name;
    var _join = function( /*args*/ ) {
      var arr = Array.prototype.slice.call(arguments, _join.length);
      return arr.join(separator = '-');
    }

    // trial defaults
    trial.preamble = typeof trial.preamble == 'undefined' ? "" : trial.preamble;
    trial.required = typeof trial.required == 'undefined' ? null : trial.required;
    trial.horizontal = typeof trial.required == 'undefined' ? false : trial.horizontal;

    // if any trial variables are functions
    // this evaluates the function and replaces
    // it with the output of the function
    trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);

    // form element
    var trial_form_id = _join(plugin_id_name, "form");
    display_element.append($('<form>', {
      "id": trial_form_id
    }));
    var $trial_form = $("#" + trial_form_id);

    // show preamble text
    var preamble_id_name = _join(plugin_id_name, 'preamble');
    $trial_form.append($('<div>', {
      "id": preamble_id_name,
      "class": preamble_id_name
    }));
    $('#' + preamble_id_name).html(trial.preamble);

    // add multiple-choice questions
    for (var i = 0; i < trial.questions.length; i++) {
      // create question container
      var question_classes = [_join(plugin_id_name, 'question')];
      if (trial.horizontal) {
        question_classes.push(_join(plugin_id_name, 'horizontal'));
      }

      $trial_form.append($('<div>', {
        "id": _join(plugin_id_name, i),
        "class": question_classes.join(' ')
      }));

      var question_selector = _join(plugin_id_selector, i);

      // add question text
      $(question_selector).append(
        '<p class="' + plugin_id_name + '-text survey-multi-choice">' + trial.questions[i] + '</p>'
      );

      // create option radio buttons
      for (var j = 0; j < trial.options[i].length; j++) {
        var option_id_name = _join(plugin_id_name, "option", i, j),
          option_id_selector = '#' + option_id_name;

        // add radio button container
        $(question_selector).append($('<div>', {
          "id": option_id_name,
          "class": _join(plugin_id_name, 'option')
        }));

        // add label and question text
        var option_label = '<label class="' + plugin_id_name + '-text">' + trial.options[i][j] + '</label>';
        $(option_id_selector).append(option_label);

        // create radio button
        var input_id_name = _join(plugin_id_name, 'response', i);
        $(option_id_selector + " label").prepend('<input type="radio" name="' + input_id_name + '" value="' + trial.options[i][j] + '">');
      }

      if (trial.required && trial.required[i]) {
        // add "question required" asterisk
        $(question_selector + " p").append("<span class='required'>*</span>")

        // add required property
        $(question_selector + " input:radio").prop("required", true);
      }
    }
    
    // append two text-based questions, too
    text = ["What is your age?", 'In which country do you reside?'];
    for (var i = 0; i < text.length; i++) {
        // create div
        display_element.append($('<div>', {
          "id": 'jspsych-survey-text-' + i,
          "class": 'jspsych-survey-text-question'
        }));
        
        // add question text
        $("#jspsych-survey-text-" + i).append('<p class="jspsych-survey-text">' + text[i] + '</p>');
        
        // add text box
        $("#jspsych-survey-text-" + i).append('<textarea name="#jspsych-survey-text-response-' + i + '" cols="' + 40 + '" rows="' + 1 + '"></textarea>');
    }

    // add submit button
    display_element.append('<br><div align="center"><button id="next" class="button">Submit</button></div>');
    
    // make sure questions are answered
    display_element.append('<div  align="center" class="ValidationError"><font color="red">You didn\'t answer some questions. Are you sure you want to continue?</font><br></div>');
    validerror = document.getElementsByClassName('ValidationError')[0];
    validerror.style.display = 'none';

    $("#next").click(function() {
        var isComplete = true;
        
        // measure response time
        var endTime = (new Date()).getTime();
        var response_time = endTime - startTime;
        
        // create object to hold responses
        var question_data = {};
        $("div." + plugin_id_name + "-question").each(function(index) {
          var id = "Q" + index;
          var val = $(this).find("input:radio:checked").val();
          console.log(val)
          if (val == '\\') { isComplete = false;}
          var obje = {};
          obje[id] = val;
          $.extend(question_data, obje);
        });
        
        // other stuff
        $("div.jspsych-survey-text-question").each(function(index) {
          number = index + trial.questions.length;
          var id = "Q" + number;
          var val = $(this).children('textarea').val();
          console.log(val)
          if (val == '\\') { isComplete = false;}
          var obje = {};
          obje[id] = val;
          $.extend(question_data, obje);
        });
        
        // validate for multiple choice
        if ($('input[type=radio]:checked').size() < trial.questions.length) { isComplete=false; }
        
        // validate for survey-text
        for (var i = 0; i < text.length; i++) {
          console.log(document.getElementById('jspsych-survey-text-response-' + i).value);
          if (document.getElementById('#jspsych-survey-text-response-' + i).value == ''){isComplete=false}
        }
        
        // don't finish if 
        if ((isComplete == false) && (validerror.style.display == 'none')) {
            validerror.style.display = 'block';
        } else {
            // save data
            var trial_data = {
              "rt": response_time,
              "responses": JSON.stringify(question_data)
            };
            
            display_element.html('');
            
            // next trial
            jsPsych.finishTrial(trial_data);
        }
    });

    var startTime = (new Date()).getTime();
  };

  return plugin;
})();
