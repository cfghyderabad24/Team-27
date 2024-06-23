const express=require("express")
const router=express.Router()
const student=require('../models/studentModel')
const Transaction=require('../models/transactionModel')

router.get('/getLine/:studentId',async(req,res)=>{
    const student_roll= parseInt(req.params.studentId, 10);
    const monthMapping = {
        "January": 0,
        "February": 1,
        "March": 2,
        "April": 3,
        "May": 4,
        "June": 5,
        "July": 6,
        "August": 7,
        "September": 8,
        "October": 9,
        "November": 10,
        "December": 11
    };
    function createReverseMonthMapping(mapping) {
        const reverseMapping = {};
        for (const [key, value] of Object.entries(mapping)) {
            reverseMapping[value] = key;
        }
        return reverseMapping;
    }
    
    const reverseMonthMapping = createReverseMonthMapping(monthMapping);

    const difficultyMapping={
        "emergent":1,
        "early":2,
        "progressive":3,
        "transitional":4,
        "fluent":5,
        "advanced":6,
      }
      function getPastSixMonths() {
        const months = [];
        const currentDate = new Date();
    
        for (let i = 0; i < 6; i++) {
            const monthIndex = (currentDate.getMonth() - i + 12) % 12;
            const year = currentDate.getFullYear() - Math.floor((currentDate.getMonth() - i) / 12);
            months.push({ month: monthIndex, year: year });
        }
    
        return months.reverse(); // Reverse to get in chronological order
    }
    
    async function getDataPerMonth(student_roll, month) {
        const year = new Date().getFullYear(); // Use current year
        const monthIndex = monthMapping[month];
        if (monthIndex === undefined) {
            throw new Error('Invalid month');
        }
    
        const startDate = new Date(year, monthIndex, 1);
        const endDate = new Date(year, monthIndex + 1, 1);
    
        const studentDetails = await student.findOne({ roll: student_roll });
        if (!studentDetails) {
            throw new Error("Student does not exist");
        }
    
        const totalBooks = await Transaction.countDocuments({
            student_roll: student_roll,
            taken_date: { $gte: startDate, $lt: endDate }
        });
    
        const lineChart = await Transaction.aggregate([
            {
                $match: {
                    student_roll: student_roll,
                    taken_date: { $gte: startDate, $lt: endDate }
                }
            },
            {
                $lookup: {
                    from: 'books',
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

        let totalDifficulty = 0;
        let totalCount = 0;
    
        lineChart.forEach(i => {
            
            const difficultyValue = difficultyMapping[i.difficultyLevel];
            totalDifficulty += difficultyValue * i.count;
            totalCount += i.count;
        });
        
        const averageDifficulty = totalCount > 0 ? (totalDifficulty / totalCount) : 0;
        // console.log(averageDifficulty)
        
        return averageDifficulty
    }
    try{
        // const averageDifficulty=await getDataPerMonth(123,"June")
        // console.log(averageDifficulty)
        // res.status(200).json({Difficulty:averageDifficulty})
        const pastSixMonths = getPastSixMonths();
        console.log(pastSixMonths)
        const averageDifficulties = {};

        for (const { month, year } of pastSixMonths) {
            const monthName = reverseMonthMapping[month];
            const averageDifficulty = await getDataPerMonth(student_roll, monthName);
            averageDifficulties[monthName] = averageDifficulty;
        }
        res.status(200).json(averageDifficulties)
    } catch(err){
        res.send(err)
    }
})

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