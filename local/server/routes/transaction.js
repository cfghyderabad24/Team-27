const express=require("express")
const router=express.Router()
const student=require('../models/studentModel')
const book=require('../models/bookModel')
const Transaction=require('../models/transactionModel')
const findTransaction=async(student_roll,isbn)=>{
    
    try{

        const transaction=await Transaction.findOne({
            student_roll,
            book_isbn:isbn,
            return_date:null
        })
        return transaction
    }catch(err){
        console.log("No record found " ,err)
        res.send("No record found")
    }
}
router.post('/checkin',async(req,res)=>{
    const student_roll=req.body.student_roll
    const isbn=req.body.isbn
    var transaction
    try{
        transaction=await findTransaction(student_roll,isbn)
        console.log(transaction)
        transaction.return_date = new Date();
        await transaction.save();

        const findBook = await book.findOne({ isbn });
        console.log(findBook)

        if (!findBook) {
            res.status(404).send('Book not found.');
            return;
        }

        findBook.quantity += 1;
        await findBook.save();

        res.status(200).send('Book checked in successfully.');
    }catch(err){
        console.log("error in check in " ,err)
        res.status(500)
    }

})

router.post('/checkout',async(req,res)=>{
    const student_roll=req.body.student_roll
    const isbn=req.body.isbn
    var findStudent, findBook
    try{
        console.log(student_roll)
        // const findStudent=await student.find()
        findStudent=await student.findOne({
            roll:student_roll
        })
        
    } catch(err) {
        console.log("Error finding student: ", err)
        res.send("Student not found.")
        return
    }
    const findExistingTransaction=await findTransaction(student_roll,isbn)
    console.log(findExistingTransaction)
    if(findExistingTransaction){
        res.send("Student has a copy already.")
        return
    }
    try{
        findBook=await book.findOne({
            isbn:isbn
        })
        if(findBook.quantity<0){
            res.send("Not enough books")
            return
        } 
        findBook.quantity-=1

        await findBook.save()
    }catch(err) {
        console.log("Error finding book: ", err)
        res.send("Book not found.")
        return
    }
    
    try{
        const transaction=new Transaction({student_roll,book_isbn:isbn,return_date:null})
        await transaction.save()
        res.send("Success creating transaction")
        return
    } catch (err){
        console.log("Error creating transaction: ", err)
        res.send("Error creating transaction")
        return

    }

    // res.send("ok")

})

module.exports=router