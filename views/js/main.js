$(function() {
    $(".test-string").mousedown(function() {
        this.originalPosition = $(this).offset();
    }).mouseup(function() {
        $(this).offset(this.originalPosition);
    });
});

$(function() {

    $(".draggable").draggable();

    $(".droppable").droppable({
        drop: function(event, ui) {
            var inputText = $(ui.draggable).text()
            var dropElement = $(this);
            $(this).find("textarea").val(inputText);
            dropFetch(dropElement,inputText);
        }
    });

    var dropFetch = function(dropElement,inputText) {
            fetch("/api/natural/"+dropElement.data("type"), {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
                },
                body: "text=" + inputText
            }).then(function(response) {
                return response.json();
            }).then(function(data) {
                console.log(data);
                dropElement.find('.response').text(JSON.stringify(data.stems));
            })
    }
});


$(function() {
  $('.text-input').keypress(function(e){
       if (e.keyCode == 13) {
           e.preventDefault();
           var enterElement = $(this);
           var inputText = $(this).val();
           enterFetch(enterElement,inputText);
          return false;
      }
  });

  var enterFetch = function(enterElement,inputText) {
      if (enterElement.data("type") === "stem") {
          fetch("/api/natural/stem", {
              method: "POST",
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
              },
              body: "text=" + inputText
          }).then(function(response) {
              return response.json();
          }).then(function(data) {
              console.log(data);
              enterElement.parent().closest('div').find('.response').text(JSON.stringify(data.stems));
          })
      }
  }
});
