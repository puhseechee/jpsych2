/**
 * jspsych-multirange-slider
 * a jspsych plugin for multirange sliders. 
 *
 * Jordan Gunn
 *
 * documentation: docs.jspsych.org
 *
 */

jsPsych.plugins["multirange-slider"] = (function() {

  var plugin = {};
  
  jsPsych.pluginAPI.registerPreload('similarity','single-stim', 'stimulus', 'image');

  plugin.trial = function(display_element, trial) {

    // set default values for parameters
    trial.prompt = trial.prompt || "";
    trial.is_html = (typeof trial.is_html == 'undefined') ? false : trial.is_html;
    trial.timing_stim = trial.timing_stim || -1; // not implemented yet
    trial.timing_response = trial.timing_response || -1; // not implemented yet
    trial.labels = (typeof trial.labels === 'undefined') ? ["Bad", "Good"] : trial.labels; // not implemented yet; possibly unnecessary
    trial.intervals = trial.intervals || 10;

    // allow variables as functions
    trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);
    
    // other global variables
    var choice = null;
    var handle = null;
    var choiceMade = false;
    var uncertaintyDirected = false;
    var uncertaintyLeft = false;
    var start = [0, 0, 0, trial.intervals, trial.intervals];
    var tooltips = [true, true, true, true, true];
    var connect = true;
    
    // display stimulus
    if (!trial.is_html) {
      display_element.append($('<img>', {
        src: trial.stimulus,
        id: 'jspsych-multirange-stimulus'
      }));
    } else {
      display_element.append($('<div>', {
        html: trial.stimulus,
        id: 'jspsych-multirange-stimulus'
      }));
    }
    
    //show prompt if there is one
    if (trial.prompt !== "") {
      display_element.append(trial.prompt);
    }
    
    // slider
    display_element.append('<div class="sliders" id="slider"></div>');
    var slider = document.getElementById('slider');

    noUiSlider.create(slider, {
      start: start,
      step: .1,
      margin: 0,
      connect: connect,
      behaviour: 'snap',
      tooltips: tooltips,
      range: {
        'min': [   0 ],
        'max': [ trial.intervals ]
      },
      animate: false,
      pips: {
        mode: 'count',
        values: trial.intervals+1
      }
    });
    
    // toggle all but the middle handle off
    slidervals = slider.getElementsByClassName('noUi-origin');
    for (i=0; i<5; i++){
      if (i!=2) {
        slidervals[i].setAttribute('disabled', true);
      }
    }
    
    // hide all the sliders
    slidervis = slider.getElementsByClassName('noUi-handle');
    for (i=0; i<5; i++){
      slidervis[i].style.display = 'none';
    }
    
    // hide all the connect bars
    sliderconnect = slider.getElementsByClassName('noUi-connect');
    for (i=0; i<3; i++){
      sliderconnect[i].style.background = '#FAFAFA';
    }
    //sliderconnect[1].style.background = '#FAFAFA'; // great for dragging left, besides initial set of choice
    //sliderconnect[2].style.background = '#FAFAFA'; // good for dragging right, besides initial set of choice
    
    // bind the "choice" setting function to the "set" event
    // bind the "uncertainty" setting function to the "slide" event
    slider.noUiSlider.on('set', setChoice);
    slider.noUiSlider.on('slide', setUncertainty);
    
    // function to set "choice" value
    function setChoice(){
      if (!choiceMade){
        choiceMade = true;
        choice = slider.noUiSlider.get()[2];
        slidervis[2].style.display = 'block';
      }
    }
    
    // function to set "uncertainty" value
    function setUncertainty(){
      handle = slider.noUiSlider.get()[2];
      slidervis[2].style.display = 'none';
      if (choiceMade) {
        if (uncertaintyDirected) {
          if (uncertaintyLeft) {
            slider.noUiSlider.set([choice-(handle-choice), choice, handle, trial.intervals, trial.intervals]);
          } else {
            slider.noUiSlider.set([0, 0, handle, choice, choice - (handle-choice)]);
          }
        } else {
          // if a choice has been made but uncertainty is undirected, direct it
          uncertaintyDirected = true;
          if (handle > choice) {
            uncertaintyLeft = true;
          }
          if (uncertaintyLeft) {
            slidervis[1].style.display = 'block';
            for (i=0; i<3; i++){
              sliderconnect[i].style.background = '#3FB8AF';
            }
            sliderconnect[2].style.background = '#FAFAFA';
          } else {
            slidervis[3].style.display = 'block';
            sliderconnect[2].style.background = '#3FB8AF';
          }
          setUncertainty();
        }
      }
    }
    
    // reset button
    display_element.append('<br></br><p></p>');
    display_element.append($('<button>', {
      'id': 'reset',
      'class': 'sim',
      'html': 'Reset'
    }));
    
    $("#reset").click(function() {
      choice = null;
      handle = null;
      slider.noUiSlider.set(start);
      choiceMade = false;
      uncertaintyDirected = false;
      uncertaintyLeft = false;
      // hide all the sliders
      for (i=0; i<5; i++){
        slidervis[i].style.display = 'none';
      }
      for (i=0; i<3; i++){
        sliderconnect[i].style.background = '#FAFAFA';
      }
    });
    
    // submit button
    display_element.append($('<button>', {
      'id': 'next',
      'class': 'sim',
      'html': 'Submit Answer'
    }));
    
    $("#next").click(function() {
      display_element.html(''); // clear the display

      // data saving
      var trialdata = {
        choice: choice,
        uncertainty: Math.abs(choice-handle)
      };

      jsPsych.finishTrial(trialdata);

    });
  };

  return plugin;
})();