(async function fetchQuizz() {
    let response;
    let quizz;
    let questionCount = "4"; 
    try {
        response = await fetch('https://opentdb.com/api.php?amount='+ questionCount)
        quizz = await response.json();
        console.log(quizz.results);
        
    } catch (error) {
        console.log(error);
    }

    let i = 0;
    (function render() {
        if (i == questionCount) {
            document.querySelector(".thanks").textContent = "thank YOU :)"
            document.querySelector(".container").textContent = ""
        }
        let clickedAnswerClass;
        let correctAnswer;
        const answer0 = document.querySelector(".answer0")
        const answer1 = document.querySelector(".answer1")
        const answer2 = document.querySelector(".answer2")
        const answer3 = document.querySelector(".answer3")
        const type = quizz.results[i].type
        let randIndex;
        // console.log(type);
        if (type == "boolean") {            
            randIndex = random(0,1);
        } else {            
            randIndex = random(0,3);
        }
        const answers = [answer0,answer1,answer2,answer3];
        let answersIndex = [0,1,2,3];
        const question = document.querySelector(".question");
        question.textContent = quizz.results[i].question;
        
        
        //answers section ->
        
        if (type == "boolean") {
            if (randIndex) {
                answer0.textContent = quizz.results[i].correct_answer;
                answer1.textContent = quizz.results[i].incorrect_answers[0];            
            } else {
                answer1.textContent = quizz.results[i].correct_answer;
                answer0.textContent = quizz.results[i].incorrect_answers[0];                       
            }
        answer2.classList.add("answer-display-none")
        answer3.classList.add("answer-display-none")
        
        } else {
            
            answers[randIndex].textContent = quizz.results[i].correct_answer;
            correctAnswer = answersIndex.splice(randIndex,1);

            answers[answersIndex[0]].textContent = quizz.results[i].incorrect_answers[0];
            answers[answersIndex[1]].textContent = quizz.results[i].incorrect_answers[1];
            answers[answersIndex[2]].textContent = quizz.results[i].incorrect_answers[2];        
        }

        function random(min, max) {
            return Math.floor(Math.random() * (max - min + 1) ) + min;
        }
        
        function clickedAnswer (e) {
            let itemClicked = e.srcElement || e.target;   
            clickedAnswerClass = itemClicked.className;            
            console.log(i);
            
            // console.log(clickedAnswerClass + " == " + answers[randIndex].className);
            if (clickedAnswerClass == answers[randIndex].className) {
                answers[randIndex].classList.remove("idle-answer");
                answers[randIndex].classList.add("right-answer");
                document.querySelector(".answers-box").classList.add("not-clickable");
                console.log("Right Answer!!!");
                document.querySelector(".dot"+i).classList.add("dot-right")

                setTimeout(function() {
                    document.querySelector(".answers-box").classList.remove("not-clickable");
                    answers[randIndex].classList.remove("right-answer");
                    answers[randIndex].classList.add("idle-answer");
                    render()
                }, 1000);       
                i++;
                
            } else {
                console.log("wrong Answer!");
                itemClicked.classList.remove("idle-answer");
                itemClicked.classList.add("wrong-answer");
                document.querySelector(".dot"+i).classList.add("dot-wrong")
                document.querySelector(".answers-box").classList.add("not-clickable");
                setTimeout(function() {
                    document.querySelector(".answers-box").classList.remove("not-clickable");
                    itemClicked.classList.remove("wrong-answer");
                    itemClicked.classList.add("idle-answer");
                    render()
                }, 1000);       
                i++;
            }
            
        }
        window.clickedAnswer = clickedAnswer
    })()
    
})()