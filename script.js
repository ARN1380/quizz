async function fetchQuizz() {
    const response = await fetch('https://opentdb.com/api.php?amount=4')
    const quizz = await response.json();
    test(quizz);
    console.log(quizz.results);
}
fetchQuizz();

function test (quizz) {
    const question = document.querySelector(".question");
    question.textContent = quizz.results[0].question;

    
    //answers section ->
    const type = quizz.results[0].type
    const answer0 = document.querySelector(".answer0")
    const answer1 = document.querySelector(".answer1")
    const answer2 = document.querySelector(".answer2")
    const answer3 = document.querySelector(".answer3")

    if (type == "boolean") {
        if (random(0,1)) {
            answer0.textContent = quizz.results[0].correct_answer;
            answer1.textContent = quizz.results[0].incorrect_answers[0];            
        } else {
            answer1.textContent = quizz.results[0].correct_answer;
            answer0.textContent = quizz.results[0].incorrect_answers[0];                       
        }
        answer2.classList.add("answer-display-none")
        answer3.classList.add("answer-display-none")
        
    } else {
        const answers = [answer0,answer1,answer2,answer3];
        const index = random(0,3);

        answers[index].textContent = quizz.results[0].correct_answer;
        // answers[index].classList.add("test");
        answers.splice(index,1)        
        answers[0].textContent = quizz.results[0].incorrect_answers[0];
        answers[1].textContent = quizz.results[0].incorrect_answers[1];
        answers[2].textContent = quizz.results[0].incorrect_answers[2];        
    }
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}


