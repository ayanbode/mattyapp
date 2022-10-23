$(document).ready(function() {

    $("#icod").click(function() {
        $("#dialog").dialog({
            modal: true,
            hide: {
                effect: 'blind',
                duration: 500
            },
            show: {
                effect: 'blind',
                duration: 500
            },
            title: "Add Friend",
        })

        $("#dialog").css({
            "color": "white",
            "background": "#282828",
            "font-family": "Georgia",
            "font-style": "oblique",
            "border": "#ccc 0.025em solid",
            "border-radius": "3vw",
        })
    })

})

function myfriends() {

    var A = window.localStorage.getItem("myID")

    $(".elm").load(`FRIENDS.html #${A}.friend`)

}

function sett() {

    $(function() {
        $("#dialog2").dialog({
            modal: true,
            hide: {
                effect: 'blind',
                duration: 500
            },
            show: {
                effect: 'blind',
                duration: 500
            },
            title: "Setting",
        })
    })

    $("#dialog2").css({
        "background": "#282828",
        "color": "white",
        "font-family": "Georgia",
        "font-style": "oblique",
        "overflow": "auto",
        "flex": "1 1 0",
        "position": "relative",
        "border-radius": "3vw",
        "border": "#ccc 0.025em solid",
    })

}

function startChat() {

    var k = window.localStorage.getItem("chat_room")

    if (k == "") {} else {

        if (k !== "") {

            var m = $(`.${k}`)

            $("#container").append(m)

            $(".elm").slideToggle(500)

            $(".elm0").slideToggle(500)

            $("#icod").slideToggle(500)

            $(".bob").slideToggle(500)

            window.localStorage.setItem("receiver", k)

            window.localStorage.setItem("chat_room", "")

            var x = $(`#${k}.use`).html()

            setTimeout(function() {

                $(".use").replaceWith("<div class='use'> </div> ")

                $(".noty").append("<br> <i class='fa fa-close' onclick='noty()'></i>")

                $(".use").append(x)

                displayChat()
            }, 700);

            var t = window.localStorage.getItem("my_phone")

            if (t == k) {

                window.localStorage.setItem("tag", "receiver")

            } else {

                if (t !== k) {

                    window.localStorage.setItem("tag", "sender")

                }

            }

        }

    }

    roll()

}

function roll() {

    setTimeout(function() {
        startChat()
    }, 500);

}

function noty() {

    $(".bob").slideToggle(500)
    $("#icod").slideToggle(500)
    $(".elm").slideToggle(500)
    $(".elm0").slideToggle(500)
    $("#container").html("")

    myfriends()

    window.localStorage.setItem("room_name", "")

    $('.elm1').html('')

}

function reck() {
    $("#file").click()
}

$(document).ready(function() {

    $("#file").change(function() {

        if (this.files && this.files[0]) {

            var ext = this.files[0].type
            console.log(ext)
            var form = $("#fom")[0]
            var data = new FormData(form)

            var A = window.localStorage.getItem("room_name")
            var B = window.localStorage.getItem("tag")
            var D = window.localStorage.getItem("receiver")

            let c = `${ext}`.split("")
            let d = c.indexOf("/")
            let e = `${ext}`
            let f = e.slice(d)
            let C = `${f}`.slice(1)
            console.log(C)

            if (C == "mpeg" || C == "octet-stream") {

                let g = window.localStorage.getItem('audo')
                g++
                window.localStorage.setItem("audo", g)

                data.append("room", `${A}`)
                data.append("tag", `${B}`)
                data.append("type", `${C}`)
                data.append("rec", `${D}`)
                data.append("audi", `audo${g}`)

                $.ajax({
                    type: "post",
                    enctype: "multipart/form-data",
                    url: "http://127.0.0.1:3500/msg_file",
                    data: data,
                    processData: false,
                    contentType: false,
                    success: function(mata) {
                        console.log("Photo sent successfully")
                    },
                })

                setTimeout(function() {
                    var k = window.localStorage.getItem("msg_load")

                    $(".elm1").load(`MSG.html .${k}`)
                }, 1000);


            } else {

                if (C == "mp4" || C == "jpeg" || C == "jpg" || C == "png" || C == "gif") {

                    data.append("room", `${A}`)
                    data.append("tag", `${B}`)
                    data.append("type", `${C}`)
                    data.append("rec", `${D}`)

                    $.ajax({
                        type: "post",
                        enctype: "multipart/form-data",
                        url: "http://127.0.0.1:3500/msg_file",
                        data: data,
                        processData: false,
                        contentType: false,
                        success: function(mata) {
                            console.log("Photo sent successfully")
                        },
                    })

                } else {
                    alert("File type not supported")
                }

            }

        }
    })

})

function audPlay() {

    document.getElementById("anime").href = "anime.css"

    var j = window.localStorage.getItem("disk")

    document.getElementById(`${j}`).play()

    $(`#${j}.play`).replaceWith(`<div id='${j}' class='pause' onclick='window.localStorage.setItem("disk", "${j}"), setTimeout(function() {audPause()}, 500)'> <i class='fa fa-pause'></i> </div>`)

}

function audPause() {

    document.getElementById("anime").href = ""

    var j = window.localStorage.getItem("disk")

    $(`#${j}.pause`).replaceWith(`<div id='${j}' class="play" onclick="window.localStorage.setItem('disk', '${j}'), setTimeout(function() {audPlay()}, 500)"> <i class="fa fa-play"></i> </div>`)

    document.getElementById(`${j}`).pause()
}

$(document).ready(function() {
    $("#fom").submit(function() {
        setTimeout(function() {

            var k = window.localStorage.getItem("msg_load")

            $(".elm1").load(`MSG.html .${k}`)

        }, 800);
    })
})

function addFriend() {
    var A = $("#user").val()

    if (A == "") {
        $("#add").html("Please enter friend's phone number")
    } else {
        if (A !== "") {
            var J = window.localStorage.getItem("myID")

            var Z = window.localStorage.getItem("my_phone")

            if (A !== Z) {

                $("#paste").load(`FLASH.html #${A}`)

                setTimeout(function() {

                    var teli = $("#paste").html()

                    if (teli !== "") {

                        $.post("http://127.0.0.1:3500/myfriends", {
                            my_friend: A,
                            ID: J,
                        })

                        $("#user").val("")

                        setTimeout(function() {
                            myfriends()
                            $(".ui-icon-closethick").click()
                        }, 700);

                        $(this).dialog("close")

                    } else {

                        if (teli == "") {
                            $("#add").html("<div style='text-align:center;'> <i style='font-size:3em;' class='fa fa-exclamation-triangle'></i> <br> Not found </div> ")
                            $("#user").val("")
                        }

                    }

                },
                    700)

            } else {

                if (A == Z) {
                    $("#add").html("This phone number belongs to you and this process cannot be completed <br>")

                    $("#user").val("")
                    setTimeout(function() {
                        $(".ui-icon-closethick").click()
                        $("#add").html("")
                    }, 1600);
                }

            }
        }
    }
}

myfriends()
startChat()