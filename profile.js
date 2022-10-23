function profile() {

    var A = window.localStorage.getItem("profile_pics")

    var ID = window.localStorage.getItem("myID")

    var numb = window.localStorage.getItem("my_phone")

    var pass = window.localStorage.getItem("my_pass")

    var use = window.localStorage.getItem("use")

    if (A == "" || A == null) {

        $(function() {
            $("#dialog2").dialog({
                modal: true,
                show: "puff",
                hide: "slide",
                title: "Upload Profile Picture",
            })
        })

    } else {

        if (A !== "" || A !== null) {
            console.log("profile picture is done")

            $(".elm").load(`INFO.html #${ID}.${numb}`)

            setTimeout(function() {
                $("#user_img").load(`img.html #${ID}.user_img`)
            }, 300);
        }

    }

    $("#dialog2").css({
        "background": "#6683AF",
        "color": "white",
    })

    $("button").css({
        "background": "black",
        "color": "white",
        "border-radius": "3vw",
        "border": "#A2A2A2 0.025em solid",
        "font-family": "Georgia",
        "font-style": "oblique",
        "font-size": "2em"
    })
}

$(document).ready(function() {
    $(".bit").click(function() {
        $("#myfile").click()
        window.localStorage.setItem("profile_pics", "done")
    })

    $("#myfile").change(function() {

        if (this.files && this.files[0]) {
            var ext = this.files[0].type
            var form = $("#fom")[0]
            var data = new FormData(form)

            let c = `${ext}`.split("")
            let d = c.indexOf("/")
            let e = `${ext}`
            let f = e.slice(d)
            let C = `${f}`.slice(1)
            console.log(C)

            var id = window.localStorage.getItem("myID")
            var pass = window.localStorage.getItem("my_pass")
            var phone = window.localStorage.getItem("my_phone")
            var use = window.localStorage.getItem("use")

            data.append("my_Id", `${id}`)
            data.append("my_numb", `${phone}`)
            data.append("my_pass", `${pass}`)
            data.append("use", `${use}`)
            data.append("type", `${C}`)

            $.ajax({
                type: "post",
                enctype: "multipart/form-data",
                url: "http://127.0.0.1:3500/upload",
                data: data,
                processData: false,
                contentType: false,
                success: function(mata) {
                    console.log("Photo sent successfully")
                },
            })

        }

    })

    $("#opom").click(function() {

        setTimeout(function() {
            window.open("profile.html")
            window.close()
        }, 700);
    })
})

profile()