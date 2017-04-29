jsPsych.plugins['survey-misc'] = (function(){

  var plugin = {};

  plugin.trial = function(display_element, trial){
    trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);
    
    // form element
    var trial_form_id = _join(plugin_id_name, "form");
    display_element.append($('<form>', {
      "id": trial_form_id
    }));
    var $trial_form = $("#" + trial_form_id);
    
    // add questions
    for (var i = 0; i < trial.questions.length; i++) {
      // create div
      display_element.append($('<div>', {
        "id": 'jspsych-survey-misc-' + i,
        "class": 'jspsych-survey-misc-question'
      }));

      // add question text
      $("#jspsych-survey-misc-" + i).append('<p class="jspsych-survey-misc">' + trial.questions[i] + '</p>');

      // if it's a text-based question, add text box
      if (trial.options[i].length == 0) {
        $("#jspsych-survey-text-" + i).append('<textarea name="#jspsych-survey-text-response-' + i + '" cols="' + trial.columns[i] + '" rows="' + trial.rows[i] + '"></textarea>');
      }
      // otherwise, it's multiple choice.
      else {
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
      }
    }
    
    // add submit button
    $trial_form.append($('<input>', {
      'type': 'submit',
      'id': plugin_id_name + '-next',
      'class': plugin_id_name + ' jspsych-btn',
      'value': 'Submit Answers'
    }));
    
    $trial_form.submit(function(event) {

      event.preventDefault();

      // measure response time
      var endTime = (new Date()).getTime();
      var response_time = endTime - startTime;

      // create object to hold responses
      var question_data = {};
      $("div." + plugin_id_name + "-question").each(function(index) {
        var id = "Q" + index;
        var val = $(this).find("input:radio:checked").val();
        var obje = {};
        obje[id] = val;
        $.extend(question_data, obje);
      });

      // save data
      var trial_data = {
        "rt": response_time,
        "responses": JSON.stringify(question_data)
      };

      display_element.html('');

      // next trial
      jsPsych.finishTrial(trial_data);
    });

    var startTime = (new Date()).getTime();
  }

  return plugin;

})();