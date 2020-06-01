var mongoose = require('mongoose')
var Order = require('../models/order')
exports.getOrder = async (req, res)=> {
    const orders = await Order.find({})
    res.render('admin/order', {orders,user:req.user, title: 'Orders'})
}
exports.getAccount = async (req, res)=> {
    var d = new Date()
    var year = d.getFullYear() 
    const accounts = await Order.find({})
    const prices = await Order.getPrice()
    res.render('admin/account', {accounts,prices,user:req.user, title: 'Account'})
}
exports.getJobs = async (req, res)=> {
    const orders = await Order.find({})
    const jobs = orders.length
    const prices = await Order.getPrice()
    res.render('admin/index', {
        title: 'Admin', jobs, prices,user:req.user
    })
}
exports.info = async (req,res)=>{
    const order = await Order.find()
    const info = order.length
    res.render('admin/layout',{info,user:req.user})
}
exports.updateOrder = async (req, res)=>{
    const orders = await Order.findOne({_id: req.params.id})
    res.render('admin/updateForm',{
        orders,user:req.user, title:`${orders.name} order`
    })
}

exports.getJob = async (req, res)=> {
    const orders = await Order.find({})
    const jobs = orders.length
    const prices = await Order.getPrice()
    res.render('admin/copyIndex', {
       user:req.user, title: 'Admin', jobs, prices
    })
}
exports.sendUpdate = async (req,res)=>{
    var body = req.body
    var status = req.body.status
    var progress = req.body.progress
    var update = {status:status,progress:progress}
    const order = await Order.findOneAndUpdate({ _id: req.params.id }, {$set:{status}}, {
        new: true, // return the new store instead of the old one
        runValidators: true,
        upsert:true,
        returnOriginal:false,
        returnNewDocument:true
      }).exec()
      res.json([order,status,progress,body,req.body]);
      
    //   res.redirect(`/order`)
}