$(document).ready(function() {

    $(".btn").click(function() {

        var A = $("#msg").html()

        var B = window.localStorage.getItem("receiver")

        var C = window.localStorage.getItem("myID")

        var D = window.localStorage.getItem("room_name")

        var E = window.localStorage.getItem("my_phone")

        var j = window.localStorage.getItem("new")

        var k = window.localStorage.getItem("tag")

        if (A !== "" && j == "") {

            $.post("http://127.0.0.1:3500/messages", {
                msg: A,
                receiver: B,
                id: C,
                room_name: D,
                my_numb: E,
                tag: k,
            })

            $("#msg").html("")

            setTimeout(function() {
                displayChat()
            }, 1000);

        } else {

            if (A !== "" && j !== "") {

                $.post("http://127.0.0.1:3500/messages", {
                    msg: A,
                    receiver: B,
                    id: C,
                    room_name: D,
                    my_numb: E,
                    New: j,
                    tag: k,
                })

                $("#msg").html("")

                setTimeout(function() {
                    displayChat()
                }, 1000);

            }

        }

    })

})

function displayChat() {

    var A = window.localStorage.getItem("receiver")

    var B = window.localStorage.getItem("myID")

    var C = window.localStorage.getItem("room_name")

    if (A !== "") {
        if (B !== "") {
            if (C !== "") {
                var D = `${C}` + "_" + `${A}`

                window.localStorage.setItem("msg_load", D)

                setTimeout(function() {

                    var K = window.localStorage.getItem("msg_load")

                    $(".elm1").load(`MSG.html .${K}`)

                    setTimeout(function() {

                        document.getElementById("foc").scrollIntoView()

                        var k = $(".elm1").html()

                        if (k == "") {

                            window.localStorage.setItem("new", "yes")

                        } else {

                            if (k !== "") {
                                window.localStorage.setItem("new", "")
                            }

                        }

                    },
                        200);

                }, 700);

            }
        }
    }
}

function requestCheck() {

    var my_numb = window.localStorage.getItem("my_phone")

    $("#paste").load(`Request.html #${my_numb}.request`)

    setTimeout(function() {

        var k = $("#paste").html()

        if (k !== "") {

            $("#icom").css({
                "color": "blue",
            })

        } else {

            if (k == "") {
                $("#paste").html("You have no friend request")
            }

        }

    },
        700);

}

function acceptReq() {

    var k = window.localStorage.getItem("Request")

    var b = window.localStorage.getItem("sender")

    if (k == "") {} else {

        if (k !== "") {

            if (b !== "") {

                var my_numb = window.localStorage.getItem("my_phone")

                var Id = window.localStorage.getItem("myID")

                var sem = window.localStorage.getItem("sender_id")

                $("#pok").load(`img.html #${sem}.img`)

                setTimeout(function() {

                    var x = $("#pok").html()

                    console.log(x)

                    if (x !== "") {

                        $.post("http://127.0.0.1:3500/acceptReq", {
                            phone: my_numb,
                            ID: Id,
                            chat_room: k,
                            sender: b,
                            img: x,
                            senderId: sem,
                        })

                        setTimeout(function() {
                            myfriends()
                        }, 500);

                    } else {

                        if (x == "") {

                            var nx = "<i class='fa fa-user'></i>"

                            console.log(nx)

                            $.post("http://127.0.0.1:3500/acceptReq", {
                                phone: my_numb,
                                ID: Id,
                                chat_room: k,
                                sender: b,
                                img: nx,
                            })

                            setTimeout(function() {
                                myfriends()
                            }, 500);

                        }

                    }

                },
                    700);

            }

        }

    }

}

function displayReq() {

    setTimeout(function() {

        var k = $("#paste").html()

        if (k !== "" || k !== null) {

            $(function() {
                $("#paste").dialog({
                    modal: true,
                    hide: {
                        effect: 'blind',
                        duration: 500
                    },
                    show: {
                        effect: 'blind',
                        duration: 500
                    },
                    title: "Friend Request",
                })
            })

            $("#icom").css({
                "color": "white",
            })

        }

    },
        500)

    $("#paste").css({
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

function displayTV() {

    $(".elm").slideToggle(500)
    $(".elm2").slideToggle(500)
    $("#icod").slideToggle(500)

}

function createBlog() {

    $(function() {
        $("#blogForm").dialog({
            modal: true,
            hide: {
                effect: 'blind',
                duration: 500
            },
            show: {
                effect: 'blind',
                duration: 500
            },
        })
    })

    $("#blogForm").css({
        "background": "#282828",
        "color": "white",
        "font-family": "Georgia",
        "font-style": "oblique",
        "border-radius": "3vw",
        "border": "#ccc 0.025em solid",
    })

}

$(document).ready(function() {
    $("#joh").click(function() {
        $("#four").click()
    })

    $("#five").click(function() {
        var form = $("#fum")[0]
        var data = new FormData(form)

        var ID = [];
        for (var I = 0; I < 6; I++) {
            var b = Math.floor(Math.random()*6)
            ID.push(b)
        }

        var id = `${ID[0]}`+`${ID[1]}`+`${ID[2]}`+`${ID[3]}`+`${ID[4]}`+`${ID[5]}`
        var my_Id = window.localStorage.getItem("myID")
        data.append("my_Id", `${my_Id}`)
        data.append("id", `${id}`)

        if (form) {
            $.ajax({
                type: "post",
                enctype: "multipart/form-data",
                url: "http://127.0.0.1:3500/blog",
                data: data,
                processData: false,
                contentType: false,
                success: function(mata) {
                    console.log("Photo sent successfully")
                },
            })

            setTimeout(function() {
                $(".ui-icon-closethick").click()
                $("#one").val("")
                $("#two").val("")
                $("#three").val("")
                $("#type").val("")
                $("#four").val("")
            }, 500);

            window.localStorage.setItem("IsBlog", "yes")

        }

        setTimeout(function() {
            blog()
        },
            700);
    })

    $("#four").change(function() {
        if (this.files && this.files[0]) {
            var name = this.files[0].name
            $("#bolo").html(name + " as been chosen")
            document.getElementById("five").disabled = false
            document.getElementById("joh").disabled = true
        }
    })

})

function blog() {

    $(".elm3").load(`Blog.html .elm6`)

}

function blogOpen() {

    setTimeout(function() {

        var c = window.localStorage.getItem("b_load")
        var A = window.localStorage.getItem("Owner")

        $(".elm7").slideToggle(500)
        $(".elm5").slideToggle(500)
        $(".elm4").slideToggle(500)
        $(".elm3").slideToggle(500)

        setTimeout(function() {
            $(".elm7").load(`BlogInfo.html #${c}`)
        },
            500);

        setTimeout(function() {
            $(".elm8").load(`BlogPost.html #${A}`)
        },
            700);

    }, 500)
}

function blogMeg() {

    $(function() {
        $("#dialog7").dialog({
            modal: true,
            hide: {
                effect: 'blind',
                duration: 500
            },
            show: {
                effect: 'blind',
                duration: 500
            },
            title: "Message",
        })
    })

}

function blogJon() {

    $(function() {
        $("#blogJon").dialog({
            modal: true,
            hide: {
                effect: 'blind',
                duration: 500
            },
            show: {
                effect: 'blind',
                duration: 500
            },
            title: "Join",
        })
    })

}

$(document).ready(function() {

    $(".comf").click(function() {

        var A = window.localStorage.getItem("host")
        $("#paste1").load(`Blog.html #${A}.gog`)

        setTimeout(function() {

            var B = $(`#${A}.gog`).html()
            var C = window.localStorage.getItem("myID")
            var D = `<div class='elm7'> <div id='${C}' class='goh'> <b>${B}</b> </div> </div>`

            if (A !== C) {

                var E = $("#paste2").load(`Blog.html #${C}.goh`)

                setTimeout(function() {

                    var F = $(`#${C}.goh`).html()

                    if (B === F) {
                        $(".ham").html("*You already belongs to this page")

                        setTimeout(function() {
                            $('.ui-icon-closethick').click()
                        }, 1000);

                    } else {
                        if (B !== F) {
                            $.post("http://127.0.0.1:3500/blogJon", {
                                Jon: D,
                            })

                            window.localStorage.setItem("IsBlog", "yes")

                            $(".ui-icon-closethick").click()

                        }
                    }
                },
                    500)
            }

        },
            500);

    })

    $(".seth").click(function() {
        var A = $(".blogmsg").html()
        var B = window.localStorage.getItem("b_load")
        var C = window.localStorage.getItem("myID")
        var D = window.localStorage.getItem("my_phone")
        var E = window.localStorage.getItem("Blog")
        var F = window.localStorage.getItem("Owner")
        var G = window.localStorage.getItem("path")

        if (A !== "") {
            $.post("http://127.0.0.1:3500/blogmsg",
                {
                    msg: A,
                    to: B,
                    by: C,
                    num: D,
                    nam: E,
                    owner: F,
                    pics: G,
                })

            setTimeout(function() {
                $(".blogmsg").html("")
            },
                500);

            $(".ui-icon-closethick").click()

        }
    })
})

function BlogMsgDisplay() {

    $(".elm").slideToggle(500)

    $(".elm0").slideToggle(500)

    $("#icod").slideToggle(500)

    $(".bob").slideToggle(500)

    $("#uploadForm").slideToggle(50)

    var A = window.localStorage.getItem("chatter")
    var B = window.localStorage.getItem("Reced")

    $(".elm1").load(`BlogMsg.html #${A}.${B}`)

    var C = window.localStorage.getItem("myID")

    $("#paste").load(`FRIENDS.html #${C}.use`)

    setTimeout(function() {

        var D = $(`#${C}.use`).html()

        $("#container").append(`<div class='cog'> ${D} messages <i id='icam' onclick='BlogMsgHide()' class='fa fa-angle-down'><i> </div>`)

    }, 500);
}

function BlogMsgHide() {

    $(".elm").slideToggle(500)

    $(".elm0").slideToggle(500)

    $("#icod").slideToggle(500)

    $(".bob").slideToggle(500)

    $("#container").html("")

    $("#uploadForm").slideToggle(50)

    $(".elm1").html("")

}

function BlogSite() {

    $(".elm7").slideToggle(500)

    $(".elm5").slideToggle(500)

    $(".elm4").slideToggle(500)

    $(".elm3").slideToggle(500)

    $(".elm8").html("")

    $(".elm7").html("")

    window.localStorage.setItem("Owner", "")

}

function BlogPos() {

    $(".waps").slideToggle(500)

    $("#wasp.wasp").replaceWith('<button id="wasp" class="wasp" onclick="BlogPot()"> <i class="fa fa-close"></i> </button>')

}

function BlogPot() {

    $(".waps").slideToggle(500)

    $("#wasp.wasp").replaceWith('<button id="wasp" class="wasp" onclick="BlogPos()"> <i class="fa fa-plus"></i> </button>')

}

function blogVid() {

    var A = window.localStorage.getItem("IsBlog")

    if (A == "yes") {

        var B = window.localStorage.getItem("myID")

        var k = $("#paste").load(`Blog.html #${B}`)

        setTimeout(function() {

            var C = $("#paste").html()
            $(".fak").html(C)

            setTimeout(function() {
                $(".fak").dialog({
                    modal: true,
                    hide: {
                        effect: 'blind',
                        duration: 500
                    },
                    show: {
                        effect: 'blind',
                        duration: 500
                    },
                    title: "Your Pages",
                })

                $("#paste").html("")

                $(".fak").css({
                    "background": "#282828", "border": "#ccc 0.025em solid", "font-family": "Georgia", "font-style": "oblique", "color": "white", "font-size": "4vw", "border-radius": "3vw",
                })

            }, 100);

        }, 500);

    } else {

        if (A == "") {

            $(".fak").html(" <b> *You have not created or join any page <div> click create to create one now </div> <br> <button onclick='Cret()' class='comg'> <b> Create </b> </button> </b>")

            $(".fak").dialog({
                modal: true,
                hide: {
                    effect: 'blind',
                    duration: 500
                },
                show: {
                    effect: 'blind',
                    duration: 500
                },
                title: "Your Pages",
            })

            $("#paste").html("")

            $(".fak").css({
                "background": "#282828", "border": "#ccc 0.025em solid", "font-family": "Georgia", "font-style": "oblique", "color": "white", "font-size": "4vw", "border-radius": "3vw",
            })

        }

    }

}

function blogImg() {

    var A = window.localStorage.getItem("IsBlog")

    if (A == "yes") {

        var B = window.localStorage.getItem("myID")

        var k = $("#paste").load(`Blog.html #${B}`)

        setTimeout(function() {

            var C = $(`#paste`).html()
            $(".fak").html(C)

            setTimeout(function() {
                $(".fak").dialog({
                    modal: true,
                    hide: {
                        effect: 'blind',
                        duration: 500
                    },
                    show: {
                        effect: 'blind',
                        duration: 500
                    },
                    title: "Your Pages",
                })

                $(".fak").css({
                    "background": "#282828", "border": "#ccc 0.025em solid", "font-family": "Georgia", "font-style": "oblique", "color": "white", "font-size": "4vw", "border-radius": "3vw",
                })

            }, 100);

        }, 500);

    } else {

        if (A == "") {

            $(".fak").html(" <b> *You have not created or join any page <div> click create to create one now </div> <br> <button onclick='Cret()' class='comg'> <b> Create </b> </button> </b>")

            $(".fak").dialog({
                modal: true,
                hide: {
                    effect: 'blind',
                    duration: 500
                },
                show: {
                    effect: 'blind',
                    duration: 500
                },
                title: "Your Pages",
            })

            $(".fak").css({
                "background": "#282828", "border": "#ccc 0.025em solid", "font-family": "Georgia", "font-style": "oblique", "color": "white", "font-size": "4vw", "border-radius": "3vw",
            })

        }

    }

}

function blogFile() {

    var A = window.localStorage.getItem("file")

    if (A == "Image") {

        $("#blogImg").click()

        window.localStorage.setItem("file", "")

    }

    if (A == "Video") {

        $("#blogVid").click()

        window.localStorage.setItem("file", "")

    }

}

function Cret() {

    setTimeout(function() {
        $("#blogForm").dialog({
            modal: true,
            hide: {
                effect: 'blind',
                duration: 500
            },
            show: {
                effect: 'blind',
                duration: 500
            },
        })
    }, 500)

    $("#blogForm").css({
        "background": "#282828",
        "color": "white",
        "font-family": "Georgia",
        "font-style": "oblique",
        "border-radius": "3vw",
        "border": "#ccc 0.025em solid",
    })

    $(".ui-icon-closethick").click()

}

$(document).ready(function() {

    $("#blogImg").change(function() {

        if (this.files && this.files[0]) {

            $(".ui-icon-closethick").click()
            var reader = new FileReader()
            reader.onload = function(e) {
                $(".panel").html("<img class='output' /> <div style='padding:0.25em'> <div class='comt' contenteditable='true'></div> <button id='blogUpload' class='comts' onclick='blogUpload()'> <i class='fa fa-send'></i> </button> </div>")
                setTimeout(function() {
                    $(".output").attr("src", e.target.result)

                    $(".panel").dialog({
                        modal: true,
                        hide: {
                            effect: 'blind',
                            duration: 500
                        },
                        show: {
                            effect: 'blind',
                            duration: 500
                        },
                    })

                    $(".panel").css({
                        "background": "#282828",
                        "font-family": "Georgia",
                        "font-style": "oblique",
                        "border-radius": "2vw",
                        "border": "#ccc 0.025em solid",
                        "color": "white",
                    })
                }, 400);
            }
            reader.readAsDataURL(this.files[0])
        }

    })

    $("#blogVid").change(function() {

        if (this.files && this.files[0]) {

            $(".ui-icon-closethick").click()
            var reader = new FileReader()
            reader.onload = function(e) {
                $(".panel2").html("<iframe class='output2'></iframe> <div style='padding:0.25em'> <div class='comt' contenteditable='true'></div> <button id='blogUpload' class='comts' onclick='blogUploads()'> <i class='fa fa-send'></i> </button> </div>")
                setTimeout(function() {
                    $(".output2").attr("src", e.target.result)

                    $(".panel2").dialog({
                        modal: true,
                        hide: {
                            effect: 'blind',
                            duration: 500
                        },
                        show: {
                            effect: 'blind',
                            duration: 500
                        },
                    })

                    $(".panel2").css({
                        "background": "#282828",
                        "font-family": "Georgia",
                        "font-style": "oblique",
                        "border-radius": "2vw",
                        "border": "#ccc 0.025em solid",
                        "color": "white",
                    })
                }, 400);
            }
            reader.readAsDataURL(this.files[0])
        }

    })

})

function blogUpload() {

    var form = $("#blogForm1")[0]
    var data = new FormData(form)
    var A = $(".comt").html()
    var B = window.localStorage.getItem("Owner")
    var D = window.localStorage.getItem("my_nam")
    var E = window.localStorage.getItem("myID")
    $("#pald").load(`img.html #${E}.img`)

    setTimeout(function() {
        var C = $("#pald").html()

        if (A == "") {

            if (form) {

                data.append("own", `${B}`)
                data.append("img", `${C}`)
                data.append('nam', `${D}`)

                $.ajax({
                    type: "post",
                    enctype: "multipart/form-data",
                    url: "http://127.0.0.1:3500/blogFile",
                    data: data,
                    processData: false,
                    contentType: false,
                    success: function(mata) {
                        console.log("Photo sent successfully")
                    },
                })

                setTimeout(function() {
                    $(".ui-icon-closethick").click()
                    MyBlog()
                }, 400);

            } else {
                console.log("file not sent")
            }

        } else {
            if (A !== "") {

                if (form) {

                    data.append("blogmsg", A)
                    data.append("own", `${B}`)
                    data.append("img", `${C}`)
                    data.append('nam', `${D}`)

                    $.ajax({
                        type: "post",
                        enctype: "multipart/form-data",
                        url: "http://127.0.0.1:3500/blogFile",
                        data: data,
                        processData: false,
                        contentType: false,
                        success: function(mata) {
                            console.log("Photo sent successfully")
                        },
                    })

                    $(".comt").html("")
                    setTimeout(function() {
                        $(".ui-icon-closethick").click()
                        MyBlog()
                    }, 400);

                    console.log("file with msg sent")
                } else {
                    console.log("file not sent")
                }

            }
        }

    },
        700)

}

function blogUploads() {

    var form = $("#blogForm2")[0]
    var data = new FormData(form)
    var A = $(".comt").html()
    var B = window.localStorage.getItem("Owner")
    var D = window.localStorage.getItem('my_nam')
    var E = window.localStorage.getItem("myID")
    $("#pald").load(`img.html #${E}.img`)

    setTimeout(function() {
        var C = $("#pald").html()

        if (A == "") {

            if (form) {

                data.append("own", `${B}`)
                data.append("img", `${C}`)
                data.append('nam', `${D}`)

                $.ajax({
                    type: "post",
                    enctype: "multipart/form-data",
                    url: "http://127.0.0.1:3500/blogFile2",
                    data: data,
                    processData: false,
                    contentType: false,
                    success: function(mata) {
                        console.log("Photo sent successfully")
                    },
                })

                setTimeout(function() {
                    $(".ui-icon-closethick").click()
                    MyBlog()
                }, 400);

            } else {
                console.log("file not sent")
            }

        } else {
            if (A !== "") {

                if (form) {

                    data.append("blogmsg", A)
                    data.append("own", `${B}`)
                    data.append("img", `${C}`)
                    data.append('nam', `${D}`)

                    $.ajax({
                        type: "post",
                        enctype: "multipart/form-data",
                        url: "http://127.0.0.1:3500/blogFile2",
                        data: data,
                        processData: false,
                        contentType: false,
                        success: function(mata) {
                            console.log("Photo sent successfully")
                        },
                    })

                    $(".comt").html("")
                    setTimeout(function() {
                        $(".ui-icon-closethick").click()
                        MyBlog()
                    }, 400);

                    console.log("file with msg sent")
                } else {
                    console.log("file not sent")
                }

            }
        }

    },
        700)

}

function MyBlog() {

    var A = window.localStorage.getItem("Owner")

    setTimeout(function() {
        $(".elm8").load(`BlogPost.html #${A}.uplod`)
    },
        400);

}

requestCheck()