console.log('Loaded!');

var button = document.getElementById('counter');

button.onclick = function() {
    
    // create a request object
    var request = new XMLHttpRequest();
    
    // capture the responce and store it in a vsriable
    request.onreadystatechange = function() {
        if(request.readystate === XMLHttpRequest.DONE) {
            // take some action
            if(request.status === 200) {
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
        }
    };
    // make the request
    request.open("GET","http://modimrugesh1910.imad.hasura-app.io/counter", true);
    request.send(null);
};

/*
// submit name
var submit = document.getElementById('submit_btn');
submit.onclick = function() {
    // make a request to the server and send the name
    
    // create a request object
    var request = new XMLHttpRequest();
    
    // Capture a list of names and render it as a list
    request.onreadystatechange = function() {
        if(request.readyState === XMLHttpRequest.DONE) {
            // take some action
            if(request.status === 200) {
                // capture a list of name and render it as a list  
                var names = request.responceText;     //['name1', 'name2', 'name3', 'name4'];
                names = JSON.parse(names);
                var list = '';
                for(var i=0;i<names.length;i++) {
                    list += '<li>' + names[i] + '</li>';
                }
                var ul = document.getElementById('namelist');
                ul.innerHTML = list;
            }
        }
        
    };
    // make the request
    var nameInput = document.getElementById('name');
    var name = nameInput.value;
    
    request.open('GET', 'http://modimrugesh1910.imad.hasura-app.io/submit-name?name='+name, true);
    request.send(null);
};
*/
// login javascript

$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
  var $this = $(this),
      label = $this.prev('label');

	  if (e.type === 'keyup') {
			if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
    	if( $this.val() === '' ) {
    		label.removeClass('active highlight'); 
			} else {
		    label.removeClass('highlight');   
			}   
    } else if (e.type === 'focus') {
      
      if( $this.val() === '' ) {
    		label.removeClass('highlight'); 
			} 
      else if( $this.val() !== '' ) {
		    label.addClass('highlight');
			}
    }

});

$('.tab a').on('click', function (e) {
  
  e.preventDefault();
  
  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');
  
  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();
  
  $(target).fadeIn(600);
  
});