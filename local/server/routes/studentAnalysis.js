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
    var barChart
    try {
        barChart = await Transaction.aggregate([
            {
                $match: {
                    student_roll: student_roll
                }
            },
            {
                $lookup: {
                    from: 'books', // The name of the books collection
                    localField: 'book_isbn',
                    foreignField: 'isbn',
                    as: 'bookDetails'
                }
            },
            {
                $unwind: '$bookDetails'
            },
            {
                $group: {
                    _id: '$bookDetails.difficultyLevel',
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    difficultyLevel: '$_id',
                    count: 1
                }
            }
        ]);
    } catch (err) {
        console.error('Error processing aggregation:', err);
        res.status(500).send('Internal server error.');
    }
    var barList={}
    barChart.map(i=>{
        barList[i["difficultyLevel"]]=i["count"]
    })

    var pieChart
    try {
        pieChart = await Transaction.aggregate([
            {
                $match: {
                    student_roll: student_roll
                }
            },
            {
                $lookup: {
                    from: 'books', // The name of the books collection
                    localField: 'book_isbn',
                    foreignField: 'isbn',
                    as: 'bookDetails'
                }
            },
            {
                $unwind: '$bookDetails'
            },
            {
                $group: {
                    _id: '$bookDetails.genre',
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    genre: '$_id',
                    count: 1
                }
            }
        ]);
    } catch (err) {
        console.error('Error processing aggregation:', err);
        res.status(500).send('Internal server error.');
    }
    var pieList={}
    pieChart.map(i=>{
        pieList[i["genre"]]=i["count"]
    })

    const response={
        details,
        barList,
        pieList
    }

    res.send(response)


});

router.get('/difficulty-level-count/:student_roll', async (req, res) => {
    const student_roll = parseInt(req.params.student_roll, 10); // Parse student_roll from the request params

    
});



module.exports=router