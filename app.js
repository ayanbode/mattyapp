const express = require("express");

const path = require("path");

const fileUpload = require("express-fileupload");

const app = express();

const port = process.env.PORT || 3500;

const bodyparser = require("body-parser");

const url = require("url");

const fs = require("fs");

const cheerio = require("cheerio");

const request = require("request");

const util = require("util");

const urlencode = bodyparser.urlencoded({
    extended: true
})

app.use(express.json())

app.use(express.urlencoded({
    extended: true
}))

app.use(express.static("public"))

app.get("/", function(req, res) {
    res.send(__dirname + "/profile.html")
})

app.post("/upload", fileUpload({
    createParentPath: true,
}), function(req, res) {

    if (!req.files) {

        return res.status(400).send("No files Uploaded")

    }

    const file = req.files.myfile
    const ID = req.body.my_Id
    const my_numb = req.body.my_numb
    const pass = req.body.my_pass
    const use = req.body.use
    const type = req.body.type

    console.log(file)

    const fileName = file.name
    const filepath = __dirname + "/Profile/" + fileName + "." + type

    console.log(filepath)

    file.mv(filepath, (err) => {

        if (err) {
            return res.status(500).json({
                status: "Error", message: "There is an error uploading file"
            })
        } else {

            var data = `<img class='user_img' id='${ID}' src='${filepath}' />`

            fs.appendFile("img.html", data, "UTF-8", error => {
                if (error) {
                    throw error
                } else {
                    console.log("User profile image as been uploaded")
                }
            })

            var Data = `<img class='img' id='${my_numb}' src='${filepath}' />`

            var elem = `<div id='${ID}' class='friend'> <div class='${my_numb}' id='holder'> <div id="${my_numb}" class='img'> ${Data} </div> <div class='use' id='${my_numb}' onclick='window.localStorage.setItem("chat_room", "${my_numb}"), window.localStorage.setItem("room_name", "${pass}_${ID}")'> <br> ${use} </div> <div class='noty'></div> </div> </div>`

            var beta = `<div id='${my_numb}'> set </div>`

            fs.appendFile("protag.html",
                beta,
                "UTF-8",
                error => {
                    if (error) {
                        throw error
                    } else {
                        console.log("profile tag is settled")
                    }
                })

            fs.appendFile("Update.html",
                elem,
                "UTF-8",
                error => {
                    if (error) {
                        throw error
                    } else {
                        console.log("User profile as been updated")
                    }
                })

            var Dam = `<img id='${ID}' class='img' src='${filepath}' /> `

            fs.appendFile("img.html",
                Dam,
                "UTF-8",
                error => {
                    if (error) {
                        throw error
                    } else {
                        console.log("Done")
                    }
                })

        }

    })

    res.status(200).json({
        status: "sucess", message: "Profile pic as been settled"
    })

})

app.post("/messages", urlencode, function(req, res) {
    var msg = req.body.msg

    var rec = req.body.receiver

    var id = req.body.id

    var room = req.body.room_name

    var my_numb = req.body.my_numb

    var tag = req.body.tag

    var Data = `<div class='${room}_${rec}' id='msg_pad'> <div id='message' class='${tag}'>${msg}</div> <div id='foc' class='${room}_${rec}_foc'></div> </div>`

    var oil = "http://localhost:26543/storage/emulated/0/tile.html/node_modules/Reqprof.html"

    if (req.body.New) {

        request(oil, (err, response, body) => {
            if (err) throw new Error("Something went wrong")

            var $ = cheerio.load(body)

            var elem = $(`#holder.${my_numb}`)

            var data = `<div id='${rec}' class='request' name='${id}'> ${elem} </div>`

            fs.appendFile("Request.html", data, "UTF-8", error => {
                if (error) {
                    throw error
                } else {
                    console.log("Friend request as been sent")
                }
            })

            fs.appendFile("MSG.html",
                Data,
                "UTF-8",
                error => {
                    if (error) {
                        throw error
                    } else {
                        console.log("Message sent successfully")
                    }
                })


        })

    } else {
        if (!req.body.New) {

            fs.readFile("MSG.html", "UTF-8", function(err, data) {
                if (err) {
                    throw err
                }

                var rep = '<div></div>'
                var elem = `<div id='foc' class='${room}_${rec}_foc'></div>`

                var result = data.replace(elem, rep)

                fs.writeFile("MSG.html", result, function(err) {

                    if (err) {
                        throw err
                    } else {
                        console.log("Done & dusted")

                        fs.appendFile("MSG.html",
                            Data,
                            "UTF-8",
                            error => {
                                if (error) {
                                    throw error
                                } else {
                                    console.log("Message sent successfully")
                                }
                            })
                    }
                })
            })
        }
    }
})

app.post("/users", urlencode, function(req,
    res) {

    var full_name = req.body.full_name
    var U_name = req.body.U_name

    var ID = req.body.ID
    var pass = req.body.pass
    var phone = req.body.phone

    var Data = `<div id='${ID}' class='${phone}'> <div id='user_img'> </div> <br> <div class='name'> <br> Full Name: ${full_name}</div> <div class='Uname'> <br> Username: ${U_name}</div> <div class='phone'> <br> Phone Number: ${phone}</div> <div class='id'> <br> ID: ${ID}</div> </div>`

    fs.appendFile("INFO.html",
        Data,
        "UTF-8",
        error => {
            if (error) {
                throw error
            } else {
                console.log("User info as been settled")
            }
        })

    var data = `<div id='holder' class='${phone}'> <div class='img' id='${phone}'> <i class='fa fa-user'></i> </div> <div id='${phone}' class='use' onclick='window.localStorage.setItem("chat_room", "${phone}"), window.localStorage.setItem("room_name", "${pass}_${ID}")'> <br> <b>${U_name}</b></div> <div class='noty'></div> </div>`

    fs.appendFile("FLASH.html",
        data,
        "UTF-8",
        error => {
            if (error) {
                throw error
            } else {
                console.log("FLASH user info as been settled")
            }
        })

    var Gdata = `<div id='holder' class='${phone}'> <div class='imgic' id='${phone}'> <i class='fa fa-user'></i> </div> <div class='use'> <br> <b>${U_name}</b> </div> <div class='notty' onclick='window.localStorage.setItem("Request", "${pass}_${ID}"), window.localStorage.setItem("sender", "${U_name}"), window.localStorage.setItem("sender_id", "${ID}"), acceptReq()'> <br> respond </div> </div>`

    fs.appendFile("Reqprof.html",
        Gdata,
        "UTF-8",
        error => {
            if (error) {
                throw error
            } else {
                console.log("Request profile as been settled")
            }
        })


})

app.post("/myfriends", urlencode, function(req,
    res) {
    var my_friend = req.body.my_friend
    var ID = req.body.ID


    var urli = "http://localhost:26543/storage/emulated/0/tile.html/node_modules/protag.html"

    request(urli,
        (err, response, body) => {

            if (err) throw new Error("Something went wrong");

            var $ = cheerio.load(body)

            console.log(body)

            var tmpElement = $(`#${my_friend}`)

            if (tmpElement !== null) {

                var nep = "http://localhost:26543/storage/emulated/0/tile.html/node_modules/Update.html"

                request(nep, (err, response, body) => {

                    if (err) throw new Error("Something went wrong")

                    var $ = cheerio.load(body)

                    var daty = $(`#holder.${my_friend}`)

                    var data = `<div id='${ID}' class='friend'> ${daty} <br> </div>`

                    fs.appendFile(`FRIENDS.html`,
                        data,
                        "UTF-8",
                        error => {
                            if (error) {
                                throw error
                            } else {
                                console.log("FRIEND with profile pic as been added")
                            }
                        })
                })

            } else {

                if (tmpElement == null) {

                    var nap = "http://localhost:26543/storage/emulated/0/tile.html/node_modules/FLASH.html"

                    request(nap, (err, response, body) => {

                        var $ = cheerio.load(body)

                        var tip = $(`.${my_friend}`)

                        var pad = `<div id='${ID}' class='friend'> ${tip} <br> </div>`

                        fs.appendFile("FRIENDS.html", pad, "UTF-8", error => {

                            if (error) {
                                throw error
                            } else {

                                console.log("FRIEND without profile pic as been settled")

                            }

                        })
                    })

                }

            }

        })

})

app.post("/acceptReq", urlencode, function(req, res) {
    var phone = req.body.phone
    var ID = req.body.ID
    var chat_room = req.body.chat_room
    var sender = req.body.sender
    var img = req.body.img
    var senderId = req.body.senderId



    var elem = `<div id='${ID}' class='friend'> <div class='${phone}' id='holder'> <div id="${phone}" class='img'> ${img} </div> <div class='use' id='${phone}' onclick='window.localStorage.setItem("chat_room", "${phone}"), window.localStorage.setItem("room_name", "${chat_room}")'> <br> ${sender} </div> <div class='noty'></div> </div> <br> </div>`

    fs.appendFile("FRIENDS.html", elem, "UTF-8", error => {

        if (error) {
            throw error
        } else {
            console.log("Friend request with pics as been accepted")
        }

    })

    fs.readFile("Request.html",
        "UTF-8",
        function(err, data) {

            if (err) {
                throw err
            }

            var rep = `<div id='${phone}' class='request' name='${senderId}'>`

            var Eli = "<div class='accepted'>"

            var result = data.replace(rep, Eli)

            fs.writeFile("Request.html", result, "UTF-8", function(err) {

                if (err) {
                    throw err
                } else {
                    console.log("Request accepted")
                }

            })

        })

})

app.post("/msg_file", fileUpload({
    createParentPath: true,
}), function(req, res) {
    var file = req.files.file
    var type = req.body.type
    var tag = req.body.tag
    var room = req.body.room
    var rec = req.body.rec

    var fileName = file.name
    var pathdir = __dirname + "/msgFiles/" + fileName + "." + type

    file.mv(pathdir, (err) => {
        if (err) {
            throw err
        } else {

            if (type == "jpeg" || type == "jpg" || type == "png" || type == "gif") {

                let data = `<div class='${room}_${rec}' id='msg_pad'> <div id='messages' class='${tag}'> <img class='msg_img' src='${pathdir}' /> <div id='foc' class='${room}_${rec}_foc'></div> </div></div>`
                fs.appendFile("MSG.html", data, "UTF-8", error => {
                    if (error) {
                        throw error
                    } else {

                        fs.readFile("MSG.html", "UTF-8", function(err, data) {
                            if (err) {
                                throw err
                            }

                            var rep = '<div></div>'
                            var elem = `<div id='foc' class='${room}_${rec}_foc'></div>`

                            var result = data.replace(elem, rep)

                            fs.writeFile("MSG.html", result, function(err) {

                                if (err) {
                                    throw err
                                } else {
                                    console.log("Done & dusted")
                                }

                            })
                        })

                        console.log("Done")
                    }
                })

            } else {

                if (type == "mpeg" || type == "octet-stream") {

                    let fad = req.body.audi

                    let mata = `<div class='${room}_${rec}' id='msg_pad'> <div id='messages' class='${tag}'> <audio id='${fad}' class='msg_aud' src='${pathdir}' hidden></audio> <div class='aud_panel'> <div class='play' onclick='document.getElementById("${fad}").play(), audPlay(), window.localStorage.setItem("disk", ${fad})'>  <i class='fa fa-play'></i> </div> <div class='tape'> <div class='rotor' id='rot'></div> <div class='pon'> <div class='fals'></div>  <div class='fals1'></div> <div class='fals2'></div> <div class='fals3'></div> <div class='fals4'></div> </div> <div class='rotor'></div> </div> </div> </div> <div id='foc' class='${room}_${rec}_foc'></div> </div>`

                    fs.readFile("MSG.html", "UTF-8", function(err, data) {
                        if (err) {
                            throw err
                        }

                        var rep = '<div></div>'
                        var elem = `<div id='foc' class='${room}_${rec}_foc'></div>`

                        var result = data.replace(elem, rep)

                        fs.writeFile("MSG.html", result, function(err) {

                            if (err) {
                                throw err
                            } else {
                                console.log("Done & dusted")

                                fs.appendFile("MSG.html", mata, "UTF-8", error => {
                                    if (error) {
                                        throw error
                                    } else {
                                        console.log("Done")
                                    }
                                })

                            }

                        })
                    })

                } else {

                    if (type == "mp4") {

                        let mata = `<div class='${room}_${rec}' id='msg_pad'> <div id='messages' class='${tag}'> <video class='msg_vid' src='${pathdir}' controls></video> </div> <div id='foc' class='${room}_${rec}_foc'></div> </div>`

                        fs.readFile("MSG.html", "UTF-8", function(err, data) {
                            if (err) {
                                throw err
                            }

                            var rep = '<div></div>'
                            var elem = `<div id='foc' class='${room}_${rec}_foc'></div>`

                            var result = data.replace(elem, rep)

                            fs.writeFile("MSG.html", result, function(err) {

                                if (err) {
                                    throw err
                                } else {
                                    console.log("Done & dusted")

                                    fs.appendFile("MSG.html", mata, "UTF-8", error => {

                                        if (error) {
                                            throw error
                                        } else {
                                            console.log("Done")

                                        }
                                    })
                                }
                            })
                        })

                    }

                }

            }
        }
    })
})

app.post("/blog", fileUpload({
    createParentPath: true,
}), function(req, res) {

    var file = req.files.four
    var nam = req.body.one
    var type = req.body.type
    var mail = req.body.two
    var webs = req.body.three
    var ID = req.body.id
    var my_Id = req.body.my_Id

    var fileName = file.name
    var pathdir = __dirname + "/Page/" + fileName + ".jpg"
    var bat = `<div class='elm7'> <div id='${my_Id}' class='goh'> <div onclick='blogFile()'> <b> ${nam}</b> </div> </div> </div>`

    fs.appendFile("Blog.html", bat, "UTF-8", error => {
        if (error) {
            throw error
        } else {
            console.log("Done")
        }
    })

    file.mv(pathdir,
        (err) => {
            if (err) {
                throw err
            } else {

                if (!req.body.three) {
                    let data = `<div class='elm6'> <img class='zoj' src='${pathdir}' onclick='window.localStorage.setItem("b_load", "${ID}_${type}"), window.localStorage.setItem("Blog", "${nam}"), blogOpen(), window.localStorage.setItem("Owner", "${ID}"), window.localStorage.setItem("path", "${pathdir}")' /> <div id='${ID}' class='gog'> <div onclick='blogFile()'> <b> ${nam} </b> </div> </div> </div>`

                    let info = `<div class='blogOpen' id='${ID}_${type}'> <div id='icam' onclick='BlogSite()'> <i class='fa fa-angle-down'></i> </div> <div id='user_img'><img class='blog_img' src='${pathdir}' /></div> <div> Details </div> <div class='bab'> <div> ${nam}</div> This is a ${type}</div> <div class='bab'> <div> Email</div> ${mail}</div> <div class='bab'> <div>Website</div> <i class='fa fa-edit'></i> ${webs} </div> <b class='kam'> <a href='mailto:flashwave@gmail.com' class='bads'> <i class='fa fa-exclamation-triangle'></i> Report </a> </b> <b class="kam" onclick="blogMeg()"> <a class="bad"> <i class="fa fa-comment"></i> message </a> </b> <b class="kam" onclick='blogJon(), window.localStorage.setItem("host","${ID}")'> <a class="bads"> <i class="fa fa-plus"></i> join </a> </b> <div class='waps' hidden> <div onclick='blogVid(), window.localStorage.setItem("file","Video")'> <i class='fa fa-file-video-o'></i> </div> <br> <div onclick='blogImg(), window.localStorage.setItem("file","Image")'> <i class='fa fa-file-image-o'></i> </div> </div> <button id='wasp' class='wasp' onclick='BlogPos()'> <i class='fa fa-plus'></i> </button> <div class="elm8"></div></div>`

                    fs.appendFile("Blog.html", data, "UTF-8", error => {
                        if (error) {
                            throw error
                        } else {
                            console.log("Done")
                        }
                    })

                    fs.appendFile("BlogInfo.html",
                        info,
                        "UTF-8",
                        error => {
                            if (error) {
                                throw error
                            } else {
                                console.log("Done")
                            }
                        })

                } else {

                    let data = `<div class='elm6'> <img class='zoj' src='${pathdir}' onclick='window.localStorage.setItem("b_load", "${ID}_${type}"), window.localStorage.setItem("Blog", "${nam}"), blogOpen(), window.localStorage.setItem("Owner", "${ID}"), window.localStorage.setItem("path", "${pathdir}")' /> <div id='${ID}' class='gog'> <div onclick='blogFile()'> <b> ${nam} </b> </div> </div> </div>`

                    let info = `<div class='blogOpen' id='${ID}_${type}'> <div id='icam' onclick='BlogSite()'> <i class='fa fa-angle-down'></i> </div> <div id='user_img'><img class='blog_img' src='${pathdir}' /></div> <div> Details </div> <div class='bab'> <div> ${nam}</div> This is a ${type}</div> <div class='bab'> <div> Email</div> ${mail}</div> <div class='bab'> <div>Website</div> <i class='fa fa-edit'></i> ${webs} </div> <b class='kam'> <a href='mailto:flashwave@gmail.com' class='bads'> <i class='fa fa-exclamation-triangle'></i> Report </a> </b> <b class="kam" onclick="blogMeg()"> <a class="bad"> <i class="fa fa-comment"></i> message </a> </b> <b class="kam" onclick='blogJon(), window.localStorage.setItem("host", "${ID}")'> <a class="bads"> <i class="fa fa-plus"></i> join </a> </b> <div class='waps' hidden> <div onclick='blogVid(), window.localStorage.setItem("file","Video")'> <i class='fa fa-file-video-o'></i> </div> <br> <div onclick='blogImg(), window.localStorage.setItem("file","Image")'> <i class='fa fa-file-image-o'></i> </div> </div> <button id='wasp' class='wasp' onclick='BlogPos()'> <i class='fa fa-plus'></i> </button> <div class="elm8"></div></div>`

                    fs.appendFile("Blog.html", data, "UTF-8", error => {
                        if (error) {
                            throw error
                        } else {
                            console.log("Done")
                        }
                    })

                    fs.appendFile("BlogInfo.html",
                        info,
                        "UTF-8",
                        error => {
                            if (error) {
                                throw error
                            } else {
                                console.log("Done")
                            }
                        })

                }

            }
        })

})

app.post("/blogmsg", urlencode, function(req, res) {

    var msg = req.body.msg
    var to = req.body.to
    var by = req.body.by
    var num = req.body.num
    var nam = req.body.nam
    var own = req.body.owner
    var pics = req.body.pics

    var opl = "http://localhost:26543/storage/emulated/0/tile.html/node_modules/FRIENDS.html"

    var orl = "http://localhost:26543/storage/emulated/0/tile.html/node_modules/img.html"

    var mata = `<div id='${own}' class='friend'> <div class='${own}' id='holder'> <div class='img'> <img class='img' src='${pics}' /> </div> <div id='${own}' class='use' onclick='window.localStorage.setItem("chatter","${by}"), window.localStorage.setItem("Reced", "${to}"), BlogMsgDisplay()'> <br> <b>${nam}</b></div> <div class='noty'></div> </div> </div>`

    request(orl, (err,
        response,
        body) => {
        if (err) throw new Error("something went wrong")
        var $ = cheerio.load(body)
        var data = $(`#${by}.img`)

        var orli = "http://localhost:26543/storage/emulated/0/tile.html/node_modules/FLASH.html"

        request(orli, (err, response, body) => {
            if (err) throw new Error("Something went wrong")
            var $ = cheerio.load(body)
            var Data = $(`#${num}.use`).html()

            if (data !== "") {

                let meta = `<div id='${by}' class='${to}'> <div class='${num}' id='holder'> <div class='img'>${data}</div> <div class='use'>${Data}</div> </div> <div class='blgmsg'> <b>${msg}</b> </div> </div>`

                fs.appendFile("BlogMsg.html", meta, "UTF-8", error => {
                    if (error) {
                        throw error
                    } else {
                        console.log("Done")
                    }
                })

                request(opl,
                    (err, response, body) => {

                        if (err) throw new Error("Something went wrong")
                        var $ = cheerio.load(body)
                        var K = $(`#holder.${own}`)

                        if (K == "") {
                            fs.appendFile("FRIENDS.html", mata, "UTF-8", error => {
                                if (error) {
                                    throw error
                                } else {
                                    console.log("Done")
                                }
                            })
                        }
                    })

            } else {

                if (data == "") {

                    let meta = `<div id='${by}' class='${to}'> <div class='${num}' id='holder'> <div class='img'><i class='fa fa-user'></i></div> <div class='use'>${Data}</div> </div> <div class='blgmsg'> <b>${msg}</b> </div> </div>`

                    fs.appendFile("BlogMsg.html", meta, "UTF-8", error => {
                        if (error) {
                            throw error
                        } else {
                            console.log("Done")
                        }
                    })

                    request(opl,
                        (err, response, body) => {

                            if (err) throw new Error("Something went wrong")
                            var $ = cheerio.load(body)
                            var K = $(`#holder.${own}`)

                            if (K == "") {
                                fs.appendFile("FRIENDS.html", mata, "UTF-8", error => {
                                    if (error) {
                                        throw error
                                    } else {
                                        console.log("Done")
                                    }
                                })
                            }
                        })

                }

            }
        })
    })

})

app.post("/blogJon", urlencode, function(req, res) {

    var data = req.body.Jon

    fs.appendFile("Blog.html", data, "UTF-8", error => {
        if (error) {
            throw error
        } else {
            console.log("Done")
        }
    })

})

app.post("/blogFile", fileUpload({
    createParentPath: true,
}), function(req, res) {

    var file = req.files.blogImg
    var msg = req.body.blogmsg
    var own = req.body.own
    var img = req.body.img
    var nam = req.body.nam
    var fileName = file.name
    var pathdir = __dirname + "/Blog/" + fileName + ".jpg"
    file.mv(pathdir,
        (err) => {
            if (err) {
                throw err
            } else {
                console.log("blog post saved")
            }
        })

    if (!msg) {

        var data = `<div id='${own}' class='uplod'> <div class='sendee'> <div class='img'>${img}</div> <div class='use' onclick='window.localStorage.setItem("prof", "${own}"), Prof()'> <br> ${nam}</div> </div> <div> <img src='${pathdir}' class='blogpic' /> </div> <div class='blige'> <button class='cof'> <i class='fa fa-thumbs-up'></i> </button> <button class='cof'><i class='fa fa-comment'></i></button> <button class='cof'> <i class='fa fa-share'></i> </button> </div> </div>`

        fs.appendFile("BlogPost.html", data, "UTF-8", error => {
            if (error) {
                throw error
            } else {
                console.log("Done")
            }
        })
    } else {
        if (msg) {

            var data = `<div id='${own}' class='uplod'> <div class='sendee'> <div class='blab'> <div class='img'>${img}</div> <div class='use' onclick='window.localStorage.setItem("prof", "${own}"), Prof()'> <br> ${nam}</div> </div> <div class='blgsg'> ${msg}</div> </div> <div> <img src='${pathdir}' class='blogpic' /> </div> <div class='blige'> <button class='cof'> <i class='fa fa-thumbs-up'></i> </button> <button class='cof'><i class='fa fa-comment'></i></button> <button class='cof'> <i class='fa fa-share'></i> </button> </div> </div>`
            fs.appendFile("BlogPost.html", data, "UTF-8", error => {
                if (error) {
                    throw error
                } else {
                    console.log("Done")
                }
            })
        }
    }

})

app.post("/blogFile2", fileUpload({
    createParentPath: true,
}), function(req, res) {

    var file = req.files.blogImg
    var msg = req.body.blogmsg
    var own = req.body.own
    var img = req.body.img
    var nam = req.body.nam
    var fileName = file.name
    var pathdir = __dirname + "/Blog/" + fileName + ".mp4"
    file.mv(pathdir,
        (err) => {
            if (err) {
                throw err
            } else {
                console.log("blog post saved")
            }
        })

    if (!msg) {

        var data = `<div id='${own}' class='uplod'> <div class='sendee'> <div class='img'>${img}</div> <div class='use' onclick='window.localStorage.setItem("prof", "${own}"), Prof()'> <br> ${nam}</div> </div> <div> <img src='${pathdir}' class='blogpic' /> </div> <div class='blige'> <button class='cof'> <i class='fa fa-thumbs-up'></i> </button> <button class='cof'><i class='fa fa-comment'></i></button> <button class='cof'> <i class='fa fa-share'></i> </button> </div> </div>`

        fs.appendFile("BlogPost.html", data, "UTF-8", error => {
            if (error) {
                throw error
            } else {
                console.log("Done")
            }
        })
    } else {
        if (msg) {

            var data = `<div id='${own}' class='uplod'> <div class='sendee'> <div class='blab'> <div class='img'>${img}</div> <div class='use' onclick='window.localStorage.setItem("prof", "${own}"), Prof()'> <br> ${nam}</div> </div> <div class='blgsg'> ${msg}</div> </div> <div> <img src='${pathdir}' class='blogpic' /> </div> <div class='blige'> <button class='cof'> <i class='fa fa-thumbs-up'></i> </button> <button class='cof'><i class='fa fa-comment'></i></button> <button class='cof'> <i class='fa fa-share'></i> </button> </div> </div>`
            fs.appendFile("BlogPost.html", data, "UTF-8", error => {
                if (error) {
                    throw error
                } else {
                    console.log("Done")
                }
            })
        }
    }

})

var server = app.listen(port, function() {
    console.log("Server listening at http://127.0.0.1:3500")
})