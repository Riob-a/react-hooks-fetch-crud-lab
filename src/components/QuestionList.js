import React from "react";
import { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(()=> {
    fetch("http://localhost:4000/questions")
    .then((response)=> response.json())
    .then((questions)=> {
      setQuestions(questions);
    });
  }, []);

  function handleDelete(id) {
    fetch("http://localhost:4000/questions/${id}", {
      method: "DELETE",
    })
    .then((response)=> response.json())
    .then(()=> {
      const updatedQuestions= questions.filter((kuestion)=> kuestion.id !== id);
      setQuestions(updatedQuestions);
    });
  }

  function handleAnswers(id, correctIndex) {
    fetch("http://localhost:4000/questions/${id}", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",                
      },
      body: JSON.stringify({correctIndex}),
    }
  .then((response)=> response.json())
  .then((updatedQuestion)=> {
    const updatedQuestions = questions.map((kuestion)=> {
      if (kuestion.id === id) 
        return updatedQuestion;
    });
    setQuestions(updatedQuestions);
  }));
  }

  const questionItems = questions.map((kuestion)=> (
    <QuestionItem
    key={kuestion.id}
    question={kuestion}
    onDelete={handleDelete}
    onAnswers={handleAnswers}
    />
  ))
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
