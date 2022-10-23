function logInCheck() {

    var k = window.localStorage.getItem("Kog")

    if (k == "yes") {

        window.open("App_main.html")

        window.close()

    } else {
        if (k == "no") {
            window.open("App_sign.html")

            window.close()
        }
    }

}

$(document).ready(function() {

    $("#don").click(function() {

        var A = $("#full_name").val()

        var B = $("#U_name").val()

        var C = $("#pass").val()

        var D = $("#phone").val()

        var ID = [];
        for (var I = 0; I < 6; I++) {
            var b = Math.floor(Math.random()*6)
            ID.push(b)
        }

        var id = `${ID[0]}`+`${ID[1]}`+`${ID[2]}`+`${ID[3]}`+`${ID[4]}`+`${ID[5]}`

        window.localStorage.setItem("myID", id)
        window.localStorage.setItem("my_phone", D)
        window.localStorage.setItem("my_pass", C)
        window.localStorage.setItem("use", B)

        $.post("http://127.0.0.1:3500/users", {
            full_name: A,
            U_name: B,
            ID: id,
            pass: C,
            phone: D,
        })

        window.localStorage.setItem("Kog", "yes")

        window.open("App_main.html")

        window.close()

    })

})


logInCheck()