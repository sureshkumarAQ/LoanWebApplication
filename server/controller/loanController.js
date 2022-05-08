const { Loan, ModifyLoan } = require('../models/loanModel')
const { User } = require('../models/userModel')

module.exports = {
    applyNewLoan: async (req, res) => {
        try {
            const { id } = req.params
            const foundOneUser = await User.findById(id);


        } catch (err) {
            res.response(404).send('Something Went Wrong', err)
        }
    }

}