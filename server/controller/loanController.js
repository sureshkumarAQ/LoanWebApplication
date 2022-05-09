const { ApplyLoan, ModifyLoan } = require('../models/loanModel')
const { User } = require('../models/userModel')

exports.applyNewLoan = async (req, res) => {
    
    try {

        const userID = req.user._id;
        const loan = await new ApplyLoan({
            user:userID,
            loanAmount:req.body.loanAmount,
            tenure:req.body.tenure,
            interestRate:req.body.interestRate
        })
        // console.log(loan);
        await loan.save(loan).then(data=>{
            res.status(201).send(data)
            // res.redirect('/user/login');
        })
          
       } catch (error) {
        res.status(401).send(error.message);
       }

}

exports.acceptLoan = async(req,res)=>{

    try {
        const userID = req.user._id;
        const loanID = req.params.loanID;

        const loan = await ApplyLoan.findById(loanID);

        if(!loan)
        {
            res.status(201).send("No loan request with this ID");
        }


        await ApplyLoan.findOneAndUpdate(
            {
                _id:loanID
            }, 
            { 
                acceptanace: true ,
                usersWhoAccept:userID 
            },
        ).exec();
        
        res.status(200).send(loan);

    } catch (err) {
        res.status(400).send(err)
    }
}