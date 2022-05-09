const { ApplyLoan, ModifyLoan } = require('../models/loanModel')
const { User } = require('../models/userModel')

exports.homePage = async(req,res)=>{
    await ApplyLoan.find({acceptanace:false}).select('-_id -__v').populate('user',['username', 'lecs','maxLoanAmount'])
    .then(loan=>{
       res.status(200).send(loan)
     })
     .catch(err=>{
         res.status(500).send({
             message:err.message||"Some error occurred while creating a create operation"
         });
     });
}
