import React, { useState } from 'react';
import './Check.css';
import axios from 'axios'

const Check = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    studentId: '',
    bookTitle: '',
    bookId: '',
  });

  const [formValid, setFormValid] = useState(false); // State to track form validation
  const [errors, setErrors] = useState({
    studentName: '',
    studentId: '',
    bookTitle: '',
    bookId: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let isValid = true;
    let errorMsg = '';

    // Validation rules
    if (name === 'studentName') {
      isValid = /^[A-Za-z ]+$/.test(value);
      errorMsg = isValid ? '' : 'Please enter only alphabets and spaces';
    } else if (name === 'studentId' || name === 'bookId') {
      isValid = /^\d+$/.test(value);
      errorMsg = isValid ? '' : 'Please enter only numeric values';
    } else if (name === 'bookTitle') {
      isValid = /^[A-Za-z ]+$/.test(value);
      errorMsg = isValid ? '' : 'Please enter only alphabets and spaces';
    }

    setErrors({
      ...errors,
      [name]: errorMsg,
    });

    if (isValid) {
      setFormData({
        ...formData,
        [name]: value,
      });

      // Check if all fields are filled
      const isFormValid = Object.values(formData).every((field) => field.trim() !== '');
      setFormValid(isFormValid);
    }
  };

  const handleIssued = async(e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/transaction/checkout',{
      student_roll: formData.studentId,
      isbn: formData.bookId
    }).then(r=>{
      alert(r.data)
    }).catch(e=>{
      console.log(e)
      alert("Server Error")
    })
    setFormData({
      studentName: '',
      studentId: '',
      bookTitle: '',
      bookId: '',
    });
    setFormValid(false); // Reset form validation state after submission
    setErrors({
      studentName: '',
      studentId: '',
      bookTitle: '',
      bookId: '',
    });
  };
  const handleReturned = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Perform your check-in/check-out logic here
    axios.post('http://localhost:3000/transaction/checkin',{
      student_roll: formData.studentId,
      isbn: formData.bookId
    }).then(r=>{
      alert(r.data)
    }).catch(e=>{
      console.log(e)
      alert("Server Error")
    })
    axios.post('')
    setFormData({
      studentName: '',
      studentId: '',
      bookTitle: '',
      bookId: '',
    });
    setFormValid(false); // Reset form validation state after submission
    setErrors({
      studentName: '',
      studentId: '',
      bookTitle: '',
      bookId: '',
    });
  };

  return (
    <div className="container">
      <h2>Check-In / Check-Out</h2>
      <form>
        <div className="form-group">
          <label>Student Name</label>
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            pattern="[A-Za-z ]+"
            title="Please enter only alphabets and spaces"
            required
          />
          {errors.studentName && <p className="error">{errors.studentName}</p>}
        </div>
        <div className="form-group">
          <label>Student ID</label>
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            pattern="\d+"
            title="*Please enter only numeric values"
            required
          />
          {errors.studentId && <p className="error">{errors.studentId}</p>}
        </div>
        <div className="form-group">
          <label>Book Title</label>
          <input
            type="text"
            name="bookTitle"
            value={formData.bookTitle}
            onChange={handleChange}
            pattern="[A-Za-z ]+"
            title="Please enter only alphabets and spaces"
            required
          />
          {errors.bookTitle && <p className="error">{errors.bookTitle}</p>}
        </div>
        <div className="form-group">
          <label>Book ID</label>
          <input
            type="text"
            name="bookId"
            value={formData.bookId}
            onChange={handleChange}
            pattern="\d+"
            title="Please enter only numeric values"
            required
          />
          {errors.bookId && <p className="error">{errors.bookId}</p>}
        </div>
        <div className="button-checkin">
          <button type="submit" onClick={handleReturned} className="check-button" >
            Return
          </button>
          <button type="submit" onClick={handleIssued} className="check-button" >
            Issue
          </button>
        </div>
      </form>
    </div>
  );
};

export default Check;
