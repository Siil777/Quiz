let quizList = [];
let quizTotal = 2;
let quizCurrent = 0;

async function fetchData(){
    try{
        const response = await fetch('./json/quiz.json');
        if(!response.ok){
            throw new Error('fetch error')
        }
        const data = await response.json();
        quizTotal = Object.keys(data).length;
        quizList = Object.values(data);
        quizTotal = quizList.length;
        quizInterface();

        console.log(quizList);

    }catch (error) {
        console.error('error of fetching json data', error);
    }
}
fetchData();

function quizInterface(){
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';
    const currQuestion = quizList[quizCurrent];

    const topDiv = document.createElement('div');
    topDiv.id = `question${quizCurrent + 1}`;

    topDiv.textContent = currQuestion.quiz_question.quiz_text;
    topDiv.classList.add('text-style');

    const correctAnswer = currQuestion.correct_answer;

    const Question = currQuestion.quiz_answer.answer_types;
    for(let index=0; index < Object.keys(Question).length; index++){
        const type = Object.keys(Question)[index];
        const text = Question[type];

        const middleDiv = document.createElement('div');
        middleDiv.classList.add('mt-5','click')
        middleDiv.textContent = `${text}`;

        middleDiv.setAttribute('exact-data', text === correctAnswer ? '1' : '0' );

        topDiv.append(middleDiv);

        middleDiv.addEventListener('click',()=>{
            callBack(()=> console.log('element has been clicked'), middleDiv);
        })
    }
    quizContainer.appendChild(topDiv);
    quizContainer.addEventListener('click' , function (event){
        const li = event.target;
        if(li.classList.contains('click')){
            UpdateQuestion();
            nextQuestion();
        }
    })
}
function callBack(callback,element){
    const getItemFromLocalStorage = element.getAttribute('exact-data');
    const text = element.textContent.trim();
    console.log(`${text}/${getItemFromLocalStorage}`);

    callback();

}
function UpdateQuestion(){
    for(let di=0; di < quizCurrent; di++){
        const que = document.getElementById(`question${di}`);
        if (di){
            di.style.display = 'none';
        }
    }
    const currQuestion = document.getElementById(`question${quizCurrent + 1}`);
    if (currQuestion){
        currQuestion.style.display = 'block';
    }
}
function nextQuestion(){
    if(quizCurrent < quizTotal -1) {
        quizCurrent++;
        UpdateQuestion();
        quizInterface();
    }
}