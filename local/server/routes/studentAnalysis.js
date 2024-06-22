const express=require("express")
const router=express.Router()
const student=require('../models/studentModel')
const Transaction=require('../models/transactionModel')

router.get('/getDetails/:studentId',async (req,res)=>{
    const student_roll= parseInt(req.params.studentId, 10);

    var studentDetails
    try{
        studentDetails=await student.findOne({
            roll:student_roll
        })
    } catch(err){
        console.log("Error finding student")
        res.send("Student doesnot exist")
        return
    }
    console.log(studentDetails)
    var totalBooks
    try {
        const result = await Transaction.countDocuments({student_roll:student_roll})
        console.log(result)
        totalBooks=result
        // res.status(200).send({ booksRead: result });
        
    } catch (err) {
        console.error('Error counting books read:', err);
        res.status(500).send('Internal server error.');
    }
    const details={
        studentName:studentDetails.name,
        studentId:studentDetails.roll,
        grade:studentDetails.grade,
        totalBooksCheckedOut:totalBooks
    }
    
});



module.exports=router