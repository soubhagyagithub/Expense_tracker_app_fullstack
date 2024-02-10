const User = require('../model/user');


exports.getExpense = async (req, res, next) => {
    try {
        const users =await User.findAll();
        res.status(201).json({allUsers: users})
        
    } catch (error) {
        console.log('Get user error',error);
        res.status(500).json({error: error})
    }
    
}

exports.addExpense = async (req, res, next) => {
    try {
        const amount = req.body.amount;
        const description = req.body.description;
        const catagory = req.body.category;

        const data = await User.create({ amount: amount, description: description, catagory: catagory });
        res.status(201).json({ newUserDetail: data });
    } catch (error) {
        console.error('Error adding expense:', error);
        res.status(500).json({ error: 'Error adding expense' });
    }   
}   

exports.deleteExpense = async (req, res, next) => {
    try {
        if (!req.params.id) {
            console.log('ID is missing');
            res.status(400).json({ error: 'ID is missing' });
        }

        const userId = req.params.id;
        await User.destroy({ where: { id: userId } });

        // Send a success response
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.updateExpense = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const updatedAmount = req.body.amount;
        const updatedDescription = req.body.description;
        const updatedCatagory = req.body.catagory-select;

        const user = await User.findByPk(userId);

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        // Update the user fields
        user.amount= updatedAmount || user.amount;
        user.description = updatedDescription || user.description;
        user.catagory = updatedCatagory || user.catagory-select;

        await user.save();

        console.log('Updated user');
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
