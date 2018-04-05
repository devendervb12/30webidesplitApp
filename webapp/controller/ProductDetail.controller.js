sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("smax.batch30.A3Z30SPLITAPP01.controller.ProductDetail", {

	onInit : function(){
		
		var oRouter = this.getOwnerComponent().getRouter();
		
		oRouter.getRoute("detail").attachPatternMatched(function(oEvent){
		
			var prodId = oEvent.getParameters().arguments.pid;
			
			this.getView().bindElement("/ProductSet('"+prodId+"')"); 
		}, this);
		
	},
	onCreate : function(){
		// dialog
		
		var odialog = new sap.m.Dialog({
			title : "Product Create",
			content : [
				
				new sap.m.Label({ text : "Product ID"}),
				new sap.m.Input(),
				new sap.m.Label({ text : "Name"}),
				new sap.m.Input(),
				new sap.m.Label({ text : "Category"}),
				new sap.m.Input(),
				new sap.m.Label({ text : "Supplier ID"}),
				new sap.m.Input()
			],
			buttons : [
				new sap.m.Button({ text : "Create and close", press : function(oEvent){
					//save the data in SAP
					var oModel = oEvent.getSource().getParent().getModel();
					
					var data = {
							ProductID : oEvent.getSource().getParent().getContent()[1].getValue(),
							Name : oEvent.getSource().getParent().getContent()[3].getValue(),
							Category :oEvent.getSource().getParent().getContent()[5].getValue()
						
					}
					
					oModel.create("/ProductSet", data, { 
						success : function(){
							sap.m.MessageToast.show("Data created");
						}, 
						error : function(){
							sap.m.MessageToast.show("Data not  created");
						}
						
					});
					
					
					oEvent.getSource().getParent().close();
					
				}})
				
			]
		});
		odialog.setModel(this.getOwnerComponent().getModel());
		odialog.open();
	},
	onUpdate : function(){
		// update name of the product
		// prodID, name
		var prodID = this.getView().byId("idprodID").getText();
		var productName = this.getView().byId("idprodName").getText();
		
		var odialog = new sap.m.Dialog({
			title : "Update Product Name",
			content : [
				new sap.m.Label({ text : "Product ID"}),
				new sap.m.Input({value : prodID, editable : false}),
				new sap.m.Label({ text : "Name"}),
				new sap.m.Input({value : productName})
			],
			buttons : [
				new sap.m.Button({ text : "Update and Close", press : function(oEvent){
					//Update
					var oModel = oEvent.getSource().getParent().getModel();
					
					var data = {
							Name : oEvent.getSource().getParent().getContent()[3].getValue() 
					}
					
					oModel.update("/ProductSet('"+prodID+"')", data, {
						success : function(){
							sap.m.MessageToast.show("Data Updated");
						},
						error : function(){
							sap.m.MessageToast.show("Data Not Updated");
						}
					})
					
					
					//close
					oEvent.getSource().getParent().close();
				}}),
				
				new sap.m.Button({ text : "Close", press : function(oEvent){
					oEvent.getSource().getParent().close();
				}})
			]
		});
		
		odialog.setModel(this.getOwnerComponent().getModel());
		odialog.open();
		
		
	},
	onDelete : function(){
		
		var oModel = this.getOwnerComponent().getModel();
		var prodID = this.getView().byId("idprodID").getText();
		
		oModel.remove("/ProductSet('"+prodID+"')", {
			success : function(){},
			error : function(){}
		});
	}

	});

});