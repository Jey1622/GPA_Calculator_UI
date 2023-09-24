const NuSubEL=document.getElementById("subject")
const EnterBtn=document.getElementById("enter")
const tableEl=document.getElementById("table")
const outputEl=document.getElementById("output")
const calculateEl=document.getElementById("calculate")

refreshUI()
const handleEvent=()=>{
    const subjectsStr=NuSubEL.value;
    var subjectsNu=parseInt(subjectsStr)

    tableEl.innerHTML=`
    <tr>
        <th>
            <label>Credits</label>
        </th>
        <th>
        <label>Grade</label>
        </th>
    </tr>`

    for (let i = 0; i < subjectsNu; i++) {
        
        tableEl.innerHTML+=`
        <tr>
            <td>
                <select name="credit" class="credit">
                    <option >-- Select Credit--</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
            </td>
            <td>
                <select name="grade" class="grade">
                    <option >-- Select Grade--</option>
                    <option value="o">O</option>
                    <option value="a+">A+</option>
                    <option value="a">A</option>
                    <option value="b+">B+</option>
                    <option value="b">B</option>
                    <option value="u">U</option>
                </select>
            </td>
        </tr>`
        
    }
    refreshUI();
}

EnterBtn.addEventListener("click",handleEvent)
NuSubEL.addEventListener("keyup",(event)=>{
    if(event.key==="Enter"){
        handleEvent();
    }
})

const value={
    'o':10,
    'a+':9,
    'a':8,
    'b+':7,
    'b':6,
    'u':0
}

const handleCalculate=()=>{
    const creditValEl=document.getElementsByClassName("credit");
    const gradeValEl=document.getElementsByClassName("grade");

    var credit=[]
    var grade=[]

    
    for(let i=0;i<gradeValEl.length;i++){
        var gradeVal=gradeValEl[i].value;
        grade.push(gradeVal);
    }

    for(let i=0;i<creditValEl.length;i++){
        var creditNum=parseInt(creditValEl[i].value)
        credit.push(creditNum)
    }

    let mark=0
    for(let i=0;i<(grade.length && credit.length);i++){
  
        mark+=value[grade[i]]*credit[i];
    }
 
    let creditTot=0;
    for(let i=0;i<credit.length;i++){
        if(grade[i]=="u"){

            credit[i]=0
        }
        creditTot+=credit[i];
    }
    var gpa=mark/creditTot;

    outputEl.innerHTML=`<p>Your GPA is ${gpa}</p>`

}

function refreshUI(){
    if(tableEl.children.length > 0){
        calculateEl.hidden=false;
    }else{
        calculateEl.hidden=true;
    }
}

calculateEl.addEventListener("click",handleCalculate)
calculateEl.addEventListener("keyup",(event)=>{
    if(event.key==="Enter"){
        handleCalculate();
    }
})
