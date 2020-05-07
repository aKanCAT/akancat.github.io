let sendButton = document.querySelector('button');

function send() {
    let name = document.querySelector('#nameValue').value;
    let phone = document.querySelector('#phoneValue').value;
    let demand = document.querySelector('#demandValue').value;

    console.log(name + ', ' + phone + ', ', demand);

    $.ajax({
        type: "get",
        url: "https://script.google.com/d/13rShyA2rY2P6ergcJcJFuOg2DuhHhs7-n6nOGi6FE8lLYcKIqSobC2PR/edit?uiv=2&mid=ACjPJvFseod2umJHL3y3OJdeKjGs1brsnVZVsBrCF9vSq-buIIK2ZWb7RCF4wYl7bqK5cSZgtI3oC_k8rt3wujFqSIPzOLNxto4Iz8gOCRRlVE6pjxkM8ve8DhASbdl5AlzT4Wp9IgPnjT2I0oeIl2_kenqbKfQY0HHSqRVWe0c26Ktcnrh3c7aJbnev&splash=yes",
        data: {
            "name": name,
            "phone": phone,
            "demand": demand
        },
        dataType: "JSON",
        success: function(response) {
            console.log(response);
            if (response == "成功") {
                alert("成功");
            }
        },
    });
};

sendButton.addEventListener('click', send);
