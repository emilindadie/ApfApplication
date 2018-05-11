let Piece = require('../models/piece');
let StockPiece =  require('../models/stockPiece');
let Fresenius = require('../models/fresenius');
var db = require('../../config/database');
const mongoose = require('mongoose'),
	ObjectId = mongoose.Types.ObjectId;
let date = require('date-and-time');
const localStorage = require('localStorage');
const jwt = require('jsonwebtoken');
let Operation = require('../models/operation');
date.locale('fr');  // French
exports.getAllPieces = function(req, res) {
	Piece.find({}, null, {sort: '-createdDate'}, function(err, pieces) { 
		if (err)
		{
			res.json(500, err);
		}
		res.json(pieces);
	});
};

exports.getAllPiecesReparation = function(req, res) {
	let currentDate= date.format(new Date(), 'dddd D MMMM');
	let query = Piece.find({});
	query.where('quantity').gt(0);
	query.exec(function (err, pieces) {
		if (err)
		{
			res.send(err);
		}
		res.json({pieces: pieces, date: currentDate});
	});
};

exports.updatePiece = function(req, res) {
	let token = localStorage.getItem('jwtToken').substring(3);
	let decoded = jwt.verify(token, db.secret);

	let pieceId = req.body.id;
	let quantity = req.body.quantity;
	Piece.findById(pieceId, function (err, piece) {
		if (err) 
		{
			return next(new Error('Failed to load User'));
		}
		if (piece) 
		{
			let operation = new Operation();
			operation.operation_name = "Mise à jour de piece";
			operation.date=  date.format(new Date(), 'dddd D MMMM');
			operation.operator_name = decoded.data.firstName;
			if(piece.lot_number !=""){
				let qt = Number(piece.quantity) + Number(quantity);
				operation.content = "la quantité de la piece de référence "+piece.reference_name +" appartenant au lot n° "+piece.lot_number +": sa quantité est passé de "+piece.quantity
				+" a "+qt;
			}else{
				let qt = Number(piece.quantity) + Number(quantity);
				operation.content = "la quantité de la piece de référence "+piece.reference_name +": sa quantité est passé de "+piece.quantity
				+" a "+qt;
			}
			operation.save();
			piece.quantity = piece.quantity + Number(quantity);
			piece.save()
			.then(data => {
			res.json({data: data, status: true})
			})
			.catch(error => {res.json({data: error.errors, status: false})})
		} 
		else 
		{
			res.send(404, 'PIECES_NOT_FOUND')
		}
	});
}
exports.deletePiece = function(req, res) {
	let token = localStorage.getItem('jwtToken').substring(3);
	let decoded = jwt.verify(token, db.secret);
	let pieceId = req.body.id;
	Piece.findById(pieceId, function (err, piece) {
		if (err) 
		{
			return next(new Error('Failed to delete Piece'));
		}
		if (piece) 
		{
			piece.remove().then(data => {
				let operation = new Operation();
				operation.operation_name = "Suppression de pièce";
				operation.date=  date.format(new Date(), 'dddd D MMMM');
				operation.operator_name = decoded.data.firstName;
				operation.content = decoded.data.firstName +" a supprimé la pièce de reference : "+ piece.reference_name;
				operation.save();
				res.json({status: true});
			})
			.catch(error => {res.json({data: error.errors, status: false})})
		}
	})
}

exports.create_stock = function(request, response) {
	let token = localStorage.getItem('jwtToken').substring(3);
	let decoded = jwt.verify(token, db.secret);

	StockPiece.findOne({reference_name: request.body.reference_name, lot_number: request.body.lot_number})
	.then(data => {
			if(data){
				Piece.findOne({reference_name: request.body.reference_name, lot_number: request.body.lot_number}).then(data2 => {
					if(data2){
						let operation = new Operation();
					operation.operation_name = "Mise à jour de piece";
					operation.date=  date.format(new Date(), 'dddd D MMMM');
					operation.operator_name = decoded.data.firstName;
				
					let qt = Number(data2.quantity) + Number(request.body.quantity);
					operation.content = "la quantité de la piece de référence "+data2.reference_name +" appartenant au lot n° "+data2.lot_number +": sa quantité est passé de "+data2.quantity
					+" a " +qt;
					operation.save();
					data2.quantity = data2.quantity + Number(request.body.quantity);
						data2.save()
						.then(data => {
						//  request.session.user_id = data._id
						response.json({data: data, status: true})
						})
						.catch(error => {response.json({data: error.errors, status: false})})
					}
					else {
						var piece = new Piece();
						piece.reference_name = data.reference_name;
						piece._id = data._id;
						piece.lot_number = data.lot_number;
						piece.description = request.body.description;
						piece.quantity = Number(request.body.quantity);
						piece.min_quantity_level = Number(request.body.min_quantity_level);
						piece.save();

						let operation = new Operation();
						operation.operation_name = "Création d'une nouvelle pièce";
						operation.date=  date.format(new Date(), 'dddd D MMMM');
						operation.operator_name = decoded.data.firstName;
						if(request.body.lot_number != ""){
							operation.content = decoded.data.firstName +" a ajouter une nouvel piece de reference : "+data.reference_name +", appartenant au lot : "+data.lot_number +" dans le stock";
						}else{
							operation.content = decoded.data.firstName +" a ajouter une nouvel piece de reference : "+data.reference_name +" appartenant à aucun lot dans le stock";
						}
						operation.save().then(data => {
							//  request.session.user_id = data._id
							response.json({data: data, status: true})
							})
							.catch(error => {response.json({data: error.errors, status: false})})
					}
				});
					
			}else {
				var stockPiece = new StockPiece();
				stockPiece.reference_name = request.body.reference_name;
				stockPiece.lot_number = request.body.lot_number;
				stockPiece.description = request.body.description;
				stockPiece.quantity = Number(request.body.quantity);
				stockPiece.min_quantity_level = Number(request.body.min_quantity_level);
				
				stockPiece.save()
					.then(data => {
						
						var piece = new Piece();
						piece.reference_name = data.reference_name;
						piece._id = data._id;
						piece.lot_number = data.lot_number;
						piece.description = data.description;
						piece.quantity = Number(data.quantity);
						piece.min_quantity_level = Number(data.min_quantity_level);
						piece.save();
						let operation = new Operation();
						operation.operation_name = "Création d'une nouvelle pièce";
						operation.date=  date.format(new Date(), 'dddd D MMMM');
						operation.operator_name = decoded.data.firstName;
						if(request.body.lot_number != ""){
							operation.content = decoded.data.firstName +" a ajouter une nouvel piece de reference : "+data.reference_name +", appartenant au lot : "+data.lot_number +" dans le stock";
						}else{
							operation.content = decoded.data.firstName +" a ajouter une nouvel piece de reference : "+data.reference_name +" appartenant à aucun lot dans le stock";
						}
						operation.save().then(data2 => {
							//  request.session.user_id = data._id
							response.json({data: data2, status: true})
							})
							.catch(error => {response.json({data: error.errors, status: false})})
					
					}).catch(error => {response.json({data: error.errors, status: false})})
			}
		})
};



