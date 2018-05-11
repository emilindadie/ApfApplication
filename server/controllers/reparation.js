
const express = require('express');
const app = express();
const Reparation = require('../models/reparation');
const Fresenius = require('../models/fresenius');
const Piece = require('../models/piece');
const StockPiece = require('../models/stockPiece');
const User = require('../models/user');
const localStorage = require('localStorage');
const jwt = require('jsonwebtoken');
var db = require('../../config/database');
var Promise = require('promise');
let date = require('date-and-time');
var mongoose = require('mongoose'),
	ObjectId = mongoose.Types.ObjectId;
const Operation = require('../models/operation');
date.locale('fr');  // French

module.exports = {
    create_reparation: (request, response) => {
      Fresenius.findOne({device_number: request.body.device_number})
        .then(data => {
          if (data) {
            response.json({ status : false, error_type: "duplicate_device"});
          } else {
                let token = localStorage.getItem('jwtToken').substring(3);
                let decoded = jwt.verify(token, db.secret);
                let currentDate = new Date();
                let fresenius = new Fresenius();
                fresenius.client_name = request.body.client_name.toUpperCase();
                fresenius.bill_point = request.body.bill_point;
                fresenius.fresenius_date = date.format(new Date(), 'dddd D MMMM YYYY');
                fresenius.deliver_point = request.body.deliver_point;
                fresenius.client_code_number = request.body.client_code_number.toUpperCase();
                fresenius.sap_order_number = request.body.sap_order_number;
                fresenius.receipt_date = request.body.receipt_date;
                fresenius.fresenius_type = request.body.fresenius_type.toUpperCase();
                fresenius.device_number = request.body.device_number;
                fresenius.product_code =  request.body.product_code.toUpperCase();
                fresenius.bio_number = request.body.bio_number;
                fresenius.entry_number = request.body.entry_number;
                fresenius.declared_defect = request.body.declared_defect.toUpperCase();
                fresenius.defect_found = request.body.defect_found;

                let split = request.body.intervention.split(".");
                fresenius.interventionLine1 =  split[0];
                fresenius.interventionLine2 =  split[1];
                fresenius.interventionLine3 =  split[2];
                fresenius.past_time = request.body.past_time;
                let year = currentDate.getFullYear();
                let myDate = date.format(new Date(), 'dddd D MMMM YYYY');

                let splitDate = myDate.split(" ");

                let month ="";
                if(splitDate[2] == ("janvier")){
                    month = "01";
                }else if(splitDate[2] == "février"){
                    month = "02";
                }
                else if(splitDate[2] == "mars"){
                    month = "03";
                }
                else if(splitDate[2] == "avril"){
                    month = "04";
                }
                else if(splitDate[2] == "mai"){
                    month = "05";
                }
                else if(splitDate[2] == "juin"){
                    month = "06";
                }
                else if(splitDate[2] == "juillet"){
                    month = "07";
                }
                else if(splitDate[2] == "août"){
                    month = "08";
                }
                else if(splitDate[2] == "septembre"){
                    month = "09";
                }
                else if(splitDate[2] == "octobre"){
                    month = "10";
                }
                else if(splitDate[2] == "novembre"){
                    month = "11";
                }
                else {
                    month = "12";
                }

                fresenius.receipt_date = splitDate[1]+"."+month+"."+year;

                let piecesId = new Array();  
                    let piece_id1 = request.body.piece_reference_name1._id;
                
                    let piece_id2;
                    if(request.body.piece_reference_name2 != undefined){
                        piece_id2 = request.body.piece_reference_name2._id;
                    }

                    let piece_id3;
                    if(request.body.piece_reference_name3 != undefined){
                        piece_id3 = request.body.piece_reference_name3._id;
                    }

                    let piece_id4;
                    if(request.body.piece_reference_name4 != undefined){
                        piece_id4 = request.body.piece_reference_name4._id;
                    }

                    let piece_id5;
                    if(request.body.piece_reference_name5 != undefined){
                        piece_id5 = request.body.piece_reference_name5._id;
                    }

                    let piece_id6;
                    if(request.body.piece_reference_name6 != undefined){
                        piece_id6 = request.body.piece_reference_name6._id;
                    }

                    let piece_id7;
                    if(request.body.piece_reference_name7 != undefined){
                        piece_id7 = request.body.piece_reference_name7._id;
                    }

                    let piece_id8;
                    if(request.body.piece_reference_name8 != undefined){
                        piece_id8 = request.body.piece_reference_name8._id;
                    }
                    

                    let piece_id9;
                    if(request.body.piece_reference_name9 != undefined){
                        piece_id9 = request.body.piece_reference_name9._id;
                    }
                    
                    let piece_id10;
                    if(request.body.piece_reference_name10 != undefined){
                        piece_id10 = request.body.piece_reference_name10._id;
                    }
                    
                    let piece_id11;
                    if(request.body.piece_reference_name11 != undefined){
                        piece_id11 = request.body.piece_reference_name11._id;
                    }
            
                    let piece_id12;
                    if(request.body.piece_reference_name12 != undefined){
                        piece_id12 = request.body.piece_reference_name12._id;
                    }

                    let piece_id13;
                    if(request.body.piece_reference_name13 != undefined){
                        piece_id13 = request.body.piece_reference_name13._id;
                    }

                    let piece_id14;
                    if(request.body.piece_reference_name14 != undefined){
                        piece_id14 = request.body.piece_reference_name14._id;
                    }

                    let piece_id15;
                    if(request.body.piece_reference_name15 != undefined){
                        piece_id15 = request.body.piece_reference_name15._id;
                    }

                    let piece_id16;
                    if(request.body.piece_reference_name16 != undefined){
                        piece_id16 = request.body.piece_reference_name16._id;
                    }

                var promiseTab = Array();
                if(piece_id1 != undefined){
                    var promiseOne = new Promise(function(resolve, reject) {
                        Piece.findOne({_id: piece_id1})
                        .then(data => {
                        if (data) {
                            resolve(true);
                        } else {
                            reject(1);
                        }
                        })
                    });
                    promiseTab.push(promiseOne.catch(e => e));
                }
                
                if(piece_id2 != undefined){
                    var promiseTwo = new Promise(function(resolve, reject) {
                        Piece.findOne({_id: piece_id2})
                        .then(data => {
                        if (data) {
                            resolve(true);
                        } else {
                            reject(2);
                        }
                        })
                    });
                    promiseTab.push(promiseTwo.catch(e => e));
                }
                if(piece_id3 != undefined){
                    var promiseThree = new Promise(function(resolve, reject) {
                        Piece.findOne({_id: piece_id3})
                        .then(data => {
                        if (data) {
                            resolve(true);
                        } else {
                            reject(3);
                        }
                        })
                    });
                    promiseTab.push(promiseThree.catch(e => e));
                }
                if(piece_id4 != undefined){
                    var promiseFour = new Promise(function(resolve, reject) {
                        Piece.findOne({_id: piece_id4})
                        .then(data => {
                        if (data) {
                            resolve(true);
                        } else {
                            reject(4);
                        }
                        })
                    });
                    promiseTab.push(promiseFour.catch(e => e));
                }
                if(piece_id5 != undefined){
                    var promiseFive = new Promise(function(resolve, reject) {
                        Piece.findOne({_id: piece_id5})
                        .then(data => {
                        if (data) {
                            resolve(true);
                            //setTimeout(resolve, 100, true);
                        } else {
                            //setTimeout(reject, 100, 5);
                            reject(5);
                        }
                        })
                    });
                    promiseTab.push(promiseFive.catch(e => e));
                }
                if(piece_id6 != undefined){
                    var promiseSix = new Promise(function(resolve, reject) {
                        Piece.findOne({_id: piece_id6})
                        .then(data => {
                        if (data) {
                            resolve(true);
                        } else {
                            reject(6);
                        }
                        })
                    });
                    promiseTab.push(promiseSix.catch(e => e));
                }

                if(piece_id7 != undefined){
                    var promiseSeven = new Promise(function(resolve, reject) {
                        Piece.findOne({_id: piece_id7})
                        .then(data => {
                        if (data) {
                            resolve(true);
                        } else {
                            reject(7);
                        }
                        })
                    });
                    promiseTab.push(promiseSeven.catch(e => e));
                }
                if(piece_id8 != undefined){
                    var promiseHeight = new Promise(function(resolve, reject) {
                        Piece.findOne({_id: piece_id8})
                        .then(data => {
                        if (data) {
                            resolve(true);
                        } else {
                            reject(8);
                        }
                        })
                    });
                    promiseTab.push(promiseHeight.catch(e => e));
                }


                if(piece_id9 != undefined){
                    var promiseNine = new Promise(function(resolve, reject) {
                        Piece.findOne({_id: piece_id9})
                        .then(data => {
                        if (data) {
                            resolve(true);
                        } else {
                            reject(9);
                        }
                        })
                    });
                    promiseTab.push(promiseNine.catch(e => e));
                }

                if(piece_id10 != undefined){
                    var promiseTen = new Promise(function(resolve, reject) {
                        Piece.findOne({_id: piece_id10})
                        .then(data => {
                        if (data) {
                            resolve(true);
                        } else {
                            reject(10);
                        }
                        })
                    });
                    promiseTab.push(promiseTen.catch(e => e));
                }

                if(piece_id11 != undefined){
                    var promiseEleven = new Promise(function(resolve, reject) {
                        Piece.findOne({_id: piece_id11})
                        .then(data => {
                        if (data) {
                            resolve(true);
                        } else {
                            reject(11);
                        }
                        })
                    });
                    promiseTab.push(promiseEleven.catch(e => e));
                }

                if(piece_id12 != undefined){
                    var promiseTwelve = new Promise(function(resolve, reject) {
                        Piece.findOne({_id: piece_id12})
                        .then(data => {
                        if (data) {
                            resolve(true);
                        } else {
                            reject(12);
                        }
                        })
                    });
                    promiseTab.push(promiseTwelve.catch(e => e));
                }

                if(piece_id13 != undefined){
                    var promiseThirteen = new Promise(function(resolve, reject) {
                        Piece.findOne({_id: piece_id13})
                        .then(data => {
                        if (data) {
                            resolve(true);
                        } else {
                            reject(13);
                        }
                        })
                    });
                    promiseTab.push(promiseThirteen.catch(e => e));
                }

                if(piece_id14 != undefined){
                    var promiseFourteen = new Promise(function(resolve, reject) {
                        Piece.findOne({_id: piece_id14})
                        .then(data => {
                        if (data) {
                            resolve(true);
                        } else {
                            reject(14);
                        }
                        })
                    });
                    promiseTab.push(promiseFourteen.catch(e => e));
                }

                
                if(piece_id15 != undefined){
                    var promiseFiveteen = new Promise(function(resolve, reject) {
                        Piece.findOne({_id: piece_id15})
                        .then(data => {
                        if (data) {
                            resolve(true);
                        } else {
                            reject(15);
                        }
                        })
                    });
                    promiseTab.push(promiseFiveteen.catch(e => e));
                }

                if(piece_id16 != undefined){
                    var promiseSixteen = new Promise(function(resolve, reject) {
                        Piece.findOne({_id: piece_id16})
                        .then(data => {
                        if (data) {
                            resolve(true);
                        } else {
                            reject(16);
                        }
                        })
                    });
                    promiseTab.push(promiseSixteen.catch(e => e));
                }

                Promise.all(promiseTab).then(function(values) {
                    console.log(values);
                    let tmp = values;
                    let next = true;
                    let index = 0;
                    for(let i=0; i < tmp.length && next; i++){
                        if(tmp[i] !== true){
                            index = i+1;
                            next = false; 
                        }
                    }
                    
                    console.log(next);
                    console.log(index);
                    
                    if(next){      
                        var promise1 = new Promise(function(resolve, reject) {
                            Piece.findOne({_id: piece_id1})
                            .then(data => {
                            if (data) {
                                setTimeout(resolve, 100, data);
                            } else {
                                setTimeout(reject, 100, "error");
                            }
                            })    
                        });
            
                        var promise2 = new Promise(function(resolve, reject) {
                            Piece.findOne({_id: piece_id2})
                            .then(data => {
                            if (data) {
                                setTimeout(resolve, 100, data);
                            } else {
                                setTimeout(reject, 100, "error");
                            }
                            })    
                        });
                        var promise3 = new Promise(function(resolve, reject) {
                            Piece.findOne({_id: piece_id3})
                            .then(data => {
                            if (data) {
                               
                                setTimeout(resolve, 100, data);
                            } 
                            else {
                                setTimeout(reject, 100, "error");
                            }
                            })
                                    
                        });

                        var promise4 = new Promise(function(resolve, reject) {
                            Piece.findOne({_id: piece_id4})
                            .then(data => {
                            if (data) {
                                setTimeout(resolve, 100, data);
                            } 
                            else {
                                setTimeout(reject, 100, "error");
                            }
                            })
                                    
                        });

                        var promise5 = new Promise(function(resolve, reject) {
                            Piece.findOne({_id: piece_id5})
                            .then(data => {
                            if (data) {
                                setTimeout(resolve, 100, data);
                            } 
                            else {
                                setTimeout(reject, 100, "error");
                            }
                            })
                                    
                        });

                        var promise6 = new Promise(function(resolve, reject) {
                            Piece.findOne({_id: piece_id6})
                            .then(data => {
                            if (data) {
                                setTimeout(resolve, 100, data);
                            } 
                            else {
                                setTimeout(reject, 100, "error");
                            }
                            })
                                    
                        });

                        var promise7 = new Promise(function(resolve, reject) {
                            Piece.findOne({_id: piece_id7})
                            .then(data => {
                            if (data) {
                                setTimeout(resolve, 100, data);
                            } 
                            else {
                                setTimeout(reject, 100, "error");
                            }
                            })
                                    
                        });

                        var promise8 = new Promise(function(resolve, reject) {
                            Piece.findOne({_id: piece_id8})
                            .then(data => {
                            if (data) {
                                setTimeout(resolve, 100, data);
                            } 
                            else {
                                setTimeout(reject, 100, "error");
                            }
                            })
                        });

                        var promise9 = new Promise(function(resolve, reject) {
                            Piece.findOne({_id: piece_id9})
                            .then(data => {
                            if (data) {
                                setTimeout(resolve, 100, data);
                            } 
                            else {
                                setTimeout(reject, 100, "error");
                            }
                            })
                        });

                        
                        var promise10 = new Promise(function(resolve, reject) {
                            Piece.findOne({_id: piece_id10})
                            .then(data => {
                            if (data) {
                                setTimeout(resolve, 100, data);
                            } 
                            else {
                                setTimeout(reject, 100, "error");
                            }
                            })
                        });

                        
                        var promise11 = new Promise(function(resolve, reject) {
                            Piece.findOne({_id: piece_id11})
                            .then(data => {
                            if (data) {
                                setTimeout(resolve, 100, data);
                            } 
                            else {
                                setTimeout(reject, 100, "error");
                            }
                            })
                        });

                        
                        var promise12 = new Promise(function(resolve, reject) {
                            Piece.findOne({_id: piece_id12})
                            .then(data => {
                            if (data) {
                                setTimeout(resolve, 100, data);
                            } 
                            else {
                                setTimeout(reject, 100, "error");
                            }
                            })
                        });

                        
                        var promise13 = new Promise(function(resolve, reject) {
                            Piece.findOne({_id: piece_id13})
                            .then(data => {
                            if (data) {
                                setTimeout(resolve, 100, data);
                            } 
                            else {
                                setTimeout(reject, 100, "error");
                            }
                            })
                        });


                        var promise14 = new Promise(function(resolve, reject) {
                            Piece.findOne({_id: piece_id14})
                            .then(data => {
                            if (data) {
                                setTimeout(resolve, 100, data);
                            } 
                            else {
                                setTimeout(reject, 100, "error");
                            }
                            })
                        });

                        var promise15 = new Promise(function(resolve, reject) {
                            Piece.findOne({_id: piece_id15})
                            .then(data => {
                            if (data) {
                                setTimeout(resolve, 100, data);
                            } 
                            else {
                                setTimeout(reject, 100, "error");
                            }
                            })
                        });

                        var promise16 = new Promise(function(resolve, reject) {
                            Piece.findOne({_id: piece_id16})
                            .then(data => {
                            if (data) {
                                setTimeout(resolve, 100, data);
                            } 
                            else {
                                setTimeout(reject, 100, "error");
                            }
                            })
                        });
                    

                            let result = new Array();
                            Promise.all([promise1.catch(e => e),promise2.catch(e => e),promise3.catch(e => e), promise4.catch(e => e), promise5.catch(e => e), promise6.catch(e => e), promise7.catch(e => e), promise8.catch(e => e),promise9.catch(e => e),promise10.catch(e => e) ,promise11.catch(e => e),promise12.catch(e => e) ,promise13.catch(e => e) ,promise14.catch(e => e), promise15.catch(e => e), promise16.catch(e => e)]).then(function(values) {
                            console.log(values);
                            let next = true;
                            let tabId = new Array();
                            let badPiece = new Piece();


                            for(let i=0; i< values.length && next; i++){
                                if(values[i]._id){
                                    tabId[i] = values[i]._id;
                                }
                            }
                            let reduceArray = tabId.reduce( (piece, _id) => {
                                piece[_id] = (piece[_id] || 0) + 1 ;
                                return piece;
                              } , {});
    
                                console.log(reduceArray);
                                Object.keys(reduceArray).map(e => {
                                        for(let i=0; i< values.length && next; i++){
                                            if(values[i]._id){
                                                if(values[i].quantity - `${reduceArray[e]}` >= 0){
                                                    
                                                }else {
                                                    next = false;
                                                    badPiece = values[i];
                                                    console.log("next");  
                                                    console.log(next);  
                                                }
                                            }
                                        }

                                    }
                                );

                                console.log(next);
                            if(next){
                                Object.keys(reduceArray).map(e => 
                                    Piece.findById(ObjectId(`${e}`), function (err, piece) {
                                        if (err) 
                                        {
                                            return next(new Error('Failed to load Piece'));
                                        }
    
                                        if (piece) 
                                        {
                                            console.log("push");
                                            console.log(piece.quantity);
                                            piece.quantity = piece.quantity - `${reduceArray[e]}`;
                                            //Number(quantity)
                                            piece.save();
                                            console.log(piece.quantity);
                                        }
                                    })
                                );
                    
                                for(let i=0; i< values.length; i++){
                                    if(values[i]._id){
                                        fresenius.piece.push(values[i]._id);
    
                                    }
                                }
                                
                                
                                let operation = new Operation();
                                operation.operation_name = "Nouvelle réparation";
                                operation.date=  date.format(new Date(), 'dddd D MMMM');
                                operation.operator_name = decoded.data.firstName;
                                operation.content = decoded.data.firstName +" a réparé l'appareil de numero "+request.body.device_number;
                                operation.save();

                                fresenius.reparateur = decoded.data._id;
                                fresenius.save()
                                .then(data => {
                                response.json({data: data, success: true})
                                });
                            }else {
                                response.json({success: false, error_type: "quantity_unavailable", piece: badPiece});
                            }
                        })
                        .catch(err => console.log('Catch', err));
                    }
                 })
                 .catch(err => console.log('Catch', err));
            }

        })
    },

    all: (request, response) => {
        var promiseOne = new Promise(function(resolve, reject) {
           
            Fresenius.find({}).sort([['fresenius_date', 1]]).exec(function(err, freseniusz) {  
                if (err)
                {
                    res.json(500, err);
                }
                if (freseniusz) {
                    resolve(freseniusz);
                } else {
                    reject('error');
                }

            });
        
        });
        
        var promiseTwo = new Promise(function(resolve, reject) {
            Piece.find(function(err, pieces) {
                if (err)
                {
                    response.json(500, err);
                }
        
                if (pieces) {
                    let tabPieces = new Array();
                    for(let i = 0; i< pieces.length; i++){
                        if(pieces[i].quantity < pieces[i].min_quantity_level){
                            tabPieces.push(pieces[i]);
                        }
                    }
                   resolve(tabPieces);
                } 
            });
        })

        Promise.all([promiseOne.catch(e => e),promiseTwo.catch(e => e)]).then(function(values) {
            console.log(values[1]);
            response.json({fresenius: values[0], piecesNotifQuantity : values[1]});
        });
    },

    details : (request, response) => {
        var freseniusId = request.params.fresenius_id;
        Fresenius.findById(ObjectId(freseniusId), function (err, fresenius) {
            if (err) 
            {
                return next(new Error('Failed to load User'));
            }

            if (fresenius) 
            {

                var reparatorPromise = new Promise(function(resolve, reject) {
                    User.findById(ObjectId(fresenius.reparateur), function (err, user) {
                        if(err){
                            return next(new Error('Failed to load User who repared fresenius'));
                        }
                        if(user){
                            resolve(user);
                        }else {
                            reject("no user");
                        }
                    });
                });

                var testValidatorPromise = new Promise(function(resolve, reject) {
                    User.findById(ObjectId(fresenius.test_validator), function (err, user) {
                        if(err){
                            return next(new Error('Failed to load User who valid test fresenius'));
                        }
                        if(user){
                            resolve(user);
                        }else {
                            reject("no user");
                        }
                    });
                });

                var sendValidatorPromise = new Promise(function(resolve, reject) {
                    User.findById(ObjectId(fresenius.send_validator), function (err, user) {
                        if(err){
                            return next(new Error('Failed to load User who valid send fresenius'));
                        }
                        if(user){
                            resolve(user);
                        }else {
                            reject("no user");
                        }
                    });
                });

                var lastModificatorPromise = new Promise(function(resolve, reject) {
                    User.findById(ObjectId(fresenius.last_modificator), function (err, user) {
                        if(err){
                            return next(new Error('Failed to load User who did last modification'));
                        }
                        if(user){
                            resolve(user);
                        }else {
                            reject("no user");
                        }
                    });
                });
                /*
                var allPiecesPromise = new Promise(function(resolve, reject) {
                    let query = StockPiece.find({});
                    query.where('quantity').gt(0);
                    query.exec(function (err, pieces) {
                        if (err)
                        {
                            res.send(err);
                        }
                        if(pieces){
                            resolve(pieces);
                        }else{
                            reject("no pieces");
                        }
                    });
                });*/
    
                Promise.all([reparatorPromise.catch(e => e),testValidatorPromise.catch(e => e),sendValidatorPromise.catch(e => e), lastModificatorPromise.catch(e => e)]).then(function(values) {
                    console.log(values);
                    var allPiece = new Array();
                    allPiece = fresenius.piece;	
                    let i, j;
                    let piecesId = new Array();	
                    
                    for(i=0; i< allPiece.length; i++){
                        var piece = new StockPiece();
                        piece._id = allPiece[i];
                        piecesId.push(new mongoose.Types.ObjectId(piece._id));
                    }
                    
                    console.log("les pieces id");
                    console.log(piecesId);
                    StockPiece.find({
                        '_id': { $in: piecesId}
                    }, function(err, pieces){
                        if(err){
                            response.send(401, 'PIECES_NOT_FOUND');
                        }else {
                            let finalPieces = pieces;
                            console.log("les pieces object");
                            console.log(pieces);

                            //Envoie des donnée au front
                            for(var i = 0; i < finalPieces.length; i++){
                              finalPieces[i].quantity = 0;
                                for(var j = 0; j < piecesId.length; j++){
                                  if(finalPieces[i]._id.equals(piecesId[j])){
                                    console.log("final piece rentrer");
                                    finalPieces[i].quantity += 1;
                                  }else{
                                    console.log("no equals");
                                    console.log(finalPieces[i]._id);
                                    console.log(piecesId[j]);
                                  }
                                }
                              }

                                 
                            if(finalPieces.length >= 12 == false){
                                for(let i = finalPieces.length; i < 12; i++){
                                    let piece = new StockPiece();
                                    piece.lot_number = null;
                                    piece.quantity = null;
                                    piece.description = null;
                                    piece.reference_name = null;
                                    piece.min_quantity_level = null;
                                    finalPieces[i] = piece;
                                }
                            }
                            console.log("final piece total");
                            console.log(finalPieces);
                            response.send({status: true, fresenius: fresenius, pieces: finalPieces, reparator: values[0], test_validator: values[1], send_validator: values[2], last_modificator: values[3]});
                        }
                    });
                })
            } 
            else 
            {
                response.send(404, 'FRESENIUS_NOT_FOUND')
            }
        });
    },
    updateReparation: (request, response) => {
        if(request.body.requestName == "update-state"){
            let token = localStorage.getItem('jwtToken').substring(3);
            let decoded = jwt.verify(token, db.secret);
            let freseniusId = request.body.id;
            let newState = request.body.state;
            Fresenius.findOne({_id: freseniusId})
                .then(data => {
                if (data) {
                    data.status = newState;
                    if(newState == 'test validé'){
                        data.test_validator = decoded.data._id;
                        data.test_validation_date = date.format(new Date(), 'dddd D MMMM YYYY');

                        let operation = new Operation();
                        operation.operation_name = "Mise à jour du status d'un appareil";
                        operation.date=  date.format(new Date(), 'dddd D MMMM');
                        operation.operator_name = decoded.data.firstName;
                        operation.content = decoded.data.firstName +" a validé l'appareil de numéro : "+data.device_number;
                        operation.save();
                    }
                    else if(newState == 'test non validé'){
                        data.test_validator = undefined;
                        data.send_validator = undefined;
                        data.send_validation_date = undefined;
                        data.test_validation_date = undefined;
                        let operation = new Operation();
                        operation.operation_name = "Mise à jour du status d'un appareil";
                        operation.date=  date.format(new Date(), 'dddd D MMMM YYYY');
                        operation.operator_name = decoded.data.firstName;
                        operation.content = decoded.data.firstName +" a annulé la validation de l'appareil de numéro : "+data.device_number;
                        operation.save();
                    }
                    else {
                        data.send_validator = decoded.data._id;
                        data.send_validation_date = date.format(new Date(), 'dddd D MMMM YYYY');
                        let operation = new Operation();
                        operation.operation_name = "Mise à jour du status d'un appareil";
                        operation.date=  date.format(new Date(), 'dddd D MMMM YYYY');
                        operation.operator_name = decoded.data.firstName;
                        operation.content = decoded.data.firstName +" a completé l'appareil de numéro : "+data.device_number;
                        operation.save();
                    }
                    
                    data.save()
                    .then(data => {
                        response.json({data: data, status : true, message: "reparation mise a jour"});
                    });
                    
                }else {
                    response.json({status : false, message: "reparation non mise à jour"});
                }
            }) 

        }else{
            let token = localStorage.getItem('jwtToken').substring(3);
            let decoded = jwt.verify(token, db.secret);
            let freseniusId = request.body.id;
            
            let client_name = request.body.form.client_name;
            let bill_point = request.body.form.bill_point;
            let deliver_point = request.body.form.deliver_point;
            let client_code_number = request.body.form.client_code_number;
            let sap_order_number = request.body.form.sap_order_number;
            let receipt_date = request.body.form.receipt_date;
            let fresenius_type = request.body.form.fresenius_type;
            let product_code =  request.body.form.product_code;
            let declared_defect = request.body.form.declared_defect;
            let defect_found = request.body.form.defect_found;
            let intervention = request.body.form.intervention;
            let past_time = request.body.form.past_time;

            Fresenius.findById(ObjectId(freseniusId), function (err, fresenius) {
                if (err) 
                {
                    return next(new Error('Failed to load User'));
                }
    
                if (fresenius) 
                {
                    console.log(fresenius);
                    fresenius.client_name = client_name;
                    fresenius.bill_point = bill_point;
                    fresenius.deliver_point = deliver_point;
                    fresenius.client_code_number = client_code_number;
                    fresenius.receipt_date = receipt_date;
                    fresenius.sap_order_number = sap_order_number;
                    fresenius.fresenius_type = fresenius_type;
                    fresenius.product_code = product_code;
                    fresenius.declared_defect = declared_defect;
                    fresenius.defect_found = defect_found;
                    let split = intervention.split(".");
                    fresenius.interventionline1 = split[0];
                    fresenius.interventionLine2 = split[1];
                    fresenius.interventionLine3 = split[2];
                    fresenius.past_time = past_time;
                    fresenius.last_modificator = decoded.data._id;
                    fresenius.last_modification_date = date.format(new Date(), 'dddd D MMMM YYYY');
                    
                    let operation = new Operation();
                    operation.operation_name = "Mise à jour des informations d'un appareil";
                    operation.date=  date.format(new Date(), 'dddd D MMMM');
                    operation.operator_name = decoded.data.firstName;
                    operation.content = decoded.data.firstName +" a modifier les information de l'appareil de numéro : "+fresenius.device_number;
                    operation.save();
                    fresenius.save()
                    .then(data => {
                            response.json({status : true, message: "Modification éffectué"});
                    });
                }
            }); 
        }
    }
}


