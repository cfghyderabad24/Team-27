import React, { useState } from 'react';
import './Check.css';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Perform your check-in/check-out logic here
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

  const issued = () => {
    alert("Book Issued Successfully");
  };

  const returned = () => {
    alert("Book returned Successfully");
  };

  return (
    <div className="container">
      <h2>Check-In / Check-Out</h2>
      <form onSubmit={handleSubmit}>
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
          <button type="submit" onClick={returned} className="check-button" disabled={!formValid}>
            CheckIn
          </button>
          <button type="submit" onClick={issued} className="check-button" disabled={!formValid}>
            CheckOut
          </button>
        </div>
      </form>
    </div>
  );
};

export default Check;
